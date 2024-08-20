const jwt = require('jsonwebtoken');
const connection = require('../configs/database');

const socketHandler = (io) => {
    io.on('connection', async (socket) => {
        const token = socket.handshake.query.token;
        const item_id = socket.handshake.query.item_id;

        if (token) {
            const verifyToken = (token) => {
                return new Promise((resolve, reject) => {
                    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
                        if (error) return reject(error);
                        resolve(user);
                    });
                });
            }

            try {
                const user = await verifyToken(token);
                if (user) {
                    const room = await getRoom(user, item_id);
                    console.log('Пользователь ' + user.id + ' подключился к комнате ' + room);

                    socket.join(room);
                    socket.emit('joinRoom', room);

                    const messageData = await getMessage(user, item_id);
                    socket.emit('messageData', { room, message: messageData });

                    socket.on('message', async ({ room, message }) => {
                        console.log(message + ' из комнаты ' + room);
                        const message_id = await addMessageDb(user, room, message);
                        io.to(room).emit('message', { id: message_id, content: message, sender_id: user.id });
                    });
                }
            } catch (error) {
                console.log(error);
                socket.disconnect();
            }
        }
    });
};

const getRoom = async (user, item_id) => {
    return new Promise((resolve, reject) => {
        const getId = `
        SELECT id
        FROM chats
        WHERE ${user.role}_id = ? AND item_id = ?`;

        connection.query(getId, [user.id, item_id], (error, result) => {
            if (error) return reject(error);
            if (result && result[0]) {
                return resolve(result[0].id)
            } else {
                return reject(null);
            }
        });
    });
}

const getMessage = (user, item_id) => {
    return new Promise((resolve, reject) => {
        const sqlGetChatsId = `
        SELECT id
        FROM chats
        WHERE ${user.role}_id = ? AND item_id = ?`;

        connection.query(sqlGetChatsId, [user.id, item_id], (error, result) => {
            if (error) reject(error);
            if (result) {
                const sqlGetMessage = `
                SELECT id, content, sender_id
                FROM messages
                WHERE chat_id = ?`;
                connection.query(sqlGetMessage, [result[0].id], (error, result) => {
                    if (result) {
                        return resolve(result);
                    }
                    else {
                        return reject(error);
                    }
                });
            }
        });
    })
}

const addMessageDb = (user, room, message) => {
    return new Promise((resolve, reject) => {
        const sqlAddMessage = `
        INSERT INTO messages
        (chat_id, sender_id, content)
        VALUES (?,?,?)`;

        connection.query(sqlAddMessage, [room, user.id, message], (error, result) => {
            if (error) return reject(error);
            if (result.affectedRows > 0) {
                const sqlGetIdMessage = `
                SELECT id, sender_id
                FROM messages
                WHERE chat_id = ? AND sender_id = ? AND content = ?
                ORDER BY created_at DESC LIMIT 1`

                connection.query(sqlGetIdMessage, [room, user.id, message], (error, result) => {
                    if (error) return reject(error);
                    if (result && result[0]) {
                        console.log(result);

                        return resolve(result[0].id);
                    } else {
                        return reject(null);
                    }
                });
            }
        });
    });
}

module.exports = socketHandler