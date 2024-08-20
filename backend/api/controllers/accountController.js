const connection = require('../../configs/database');

exports.loginAccountController = (req, res) => {
    const { id, role } = req.user;
    const nameTable = role + 's';
    let reqInfo;

    if (role === 'courier') {
        reqInfo = 'role, name_courier AS name, last_name_courier AS last_name, email_courier, tel_rus_courier, tel_use_courier, zelle_courier, card_withdrawal_courier, image';
    } else if (role === 'customer') {
        reqInfo = 'role, email_customer, tel_rus_customer, tel_use_customer, image';
    }
    const sql = `
    SELECT ${reqInfo} 
    FROM ${nameTable} 
    WHERE id = ?`;
    connection.query(sql, [id], (error, result) => {
        if (error) return res.status(500).send({ error: error });
        res.json({ user: result[0] });
    });
}

exports.updateAccountController = (req, res) => {
    const { id, role } = req.user;
    const { key, value } = req.body;

    const sqlUpdateDb = `
    UPDATE ${role}s 
    SET  ${key}_${role}=?
    WHERE id = ?`;
    connection.query(sqlUpdateDb, [value, id], (error, result) => {
        if (error) return res.status(500).json({ error: error });
        if (result.affectedRows > 0) {
            res.json({ update: true });
        }
    });
}

exports.logoutAccountController = (req, res) => {
    const { id, role } = req.user;
    console.log(id, role);

    const sqlGetIdToken = `
        SELECT token_id 
        FROM ${role}s
        WHERE id = ?`;

    connection.query(sqlGetIdToken, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ logout: false });
        }
        if (result.length > 0) {
            const token_id = result[0].token_id;

            const sqlUpdateIdToken = `
                UPDATE ${role}s
                SET token_id = NULL
                WHERE id = ?`;

            connection.query(sqlUpdateIdToken, [id], (error, result) => {
                console.log(error);

                if (error) {
                    return res.status(500).json({ logout: false });
                }
                if (result) {
                    const sqlDeleteToken = `
                        DELETE FROM tokens
                        WHERE id = ?`;

                    connection.query(sqlDeleteToken, [token_id], (error, result) => {
                        if (error) return res.status(500).json({ logout: false });
                        if (result) {
                            res.json({ logout: true, url: '/' });
                        }
                    });
                }
            });
        } else {
            res.status(400).json({ logout: false, message: 'User not found' });
        }
    });
}

exports.deleteAccountController = (req, res) => {
    const { id, role } = req.user;

    const sqlUpdateChats = ` 
    UPDATE chats
    SET ${role}_id = NULL
    WHERE ${role}_id = ?`

    connection.query(sqlUpdateChats, [id], (error, result) => {
        console.log(error);
        if (error) return res.status(500).json({ delete: false });

        const sqlUpdateOrders = ` 
        UPDATE orders
        SET ${role}_id = NULL
        WHERE ${role}_id = ?`

        connection.query(sqlUpdateOrders, [id], (error, result) => {
            console.log(error);
            if (error) return res.status(500).json({ delete: false });

            const sqlDelete = `
            DELETE c, t 
            FROM couriers c
            JOIN tokens t ON c.token_id = t.id 
            WHERE c.id = ?;`

            connection.query(sqlDelete, [id], (error, result) => {
                if (error) return res.status(500).json({ delete: false });
                if (result.affectedRows === 0) return res.status(200).json({ delete: false });
                res.json({ delete: true, url: '/' });
            });
        });
    });
}

exports.updateVerificatoinPassportAccountController = (req, res) => {
    const { id, role, name } = req.query;

    const sqlPassportUpdateStatus = `
    UPDATE ${role}s 
    SET passport_checked_courier=1
    WHERE id=? AND  passport_checked_courier=0`;
    connection.query(sqlPassportUpdateStatus, [id], (error, result) => {
        if (error) return res.status(500).json({ error: error });
        if (result.affectedRows > 0) {
            res.json({ name: name, update: true });
        } else {
            res.json({ name: name, update: false });
        }
    });
}

exports.uploadsFileAccountController = (req, res) => {
    res.sendFile(req.filePath);
}

exports.deleteInfoAccountController = (req, res) => {
    if (req.deletedFilePath) {
        req.json({ delete: true });
    }
}