const multer = require('multer');
const path = require('path');
const fs = require('fs');
const connection = require('../configs/database');
const { error } = require('console');

exports.fileHandlerMiddlewares = (req, res, next) => {
    if ((req.body.name_courier !== '' && req.body.last_name_courier !== '') || (req.body.name !== '' && req.body.origin !== '' && req.body.destination !== '')) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                let uploadPath;;

                if (req.body.name_courier) {
                    const { last_name_courier, name_courier } = req.body;
                    uploadPath = path.join(__dirname, `../uploads/couriers/${last_name_courier}_${name_courier}`);
                } if (req.body.origin && req.body.destination) {
                    uploadPath = path.join(__dirname, `../uploads/item`);
                }
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                let nameFile;

                if (file.fieldname === 'imageFace') {
                    nameFile = `юзерпик_${req.body.name_courier}.${file.mimetype.split('/')[1]}`
                }
                if (file.fieldname === 'imagePassport') {
                    nameFile = `паспорт_${req.body.name_courier}.${file.mimetype.split('/')[1]}`
                } if (file.fieldname === 'imageItem') {
                    const { id } = req.user;
                    const { name } = req.body;;

                    const getCurrentDate = () => {
                        const date = new Date();
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');

                        return `${year}-${month}-${day}`;
                    };
                    nameFile = `${id}_${name}_${getCurrentDate()}.${file.mimetype.split('/')[1]}`;
                }
                cb(null, nameFile);
            }
        });

        const upload = multer({ storage })

        const fileUploadMiddleware = upload.fields([
            { name: 'imageFace', maxCount: 1 },
            { name: 'imagePassport', maxCount: 10 },
            { name: 'imageItem', maxCount: 1 },
        ]);

        fileUploadMiddleware(req, res, async (err) => {
            if (err) {
                return res.status(400).send(err.message);
            }
            next();
        });
    }
}

exports.parseFormDataMiddleware = (req, res, next) => {
    const upload = multer();
    upload.none()(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: 'Ошибка при парсинге данных формы' });
        }
        next();
    });
};

exports.checUserkFileExistsMiddlewares = (req, res, next) => {
    const fileType = req.params.type;
    const fileName = req.params.filename;

    if (req.user) {
        if (['courier', 'customer'].includes(fileType)) {
            const { id, role } = req.user;
            const sqlGetFolder = `
            SELECT name_${role} AS name, last_name_${role} AS last_name 
            FROM ${role}s 
            WHERE id=? AND role=?`

            connection.query(sqlGetFolder, [id, role], (error, result) => {
                if (result.length > 0) {
                    const { name, last_name } = result[0];
                    const nameFolder = `${last_name}_${name}`;
                    const filePath = path.join(__dirname, '../uploads', fileType, nameFolder, fileName);

                    req.filePath = filePath;

                    fs.access(filePath, fs.constants.F_OK, (err) => {
                        if (err) {
                            return res.status(404).send({ file: false });
                        }
                        next();
                    });
                }
            });
        }
        if (['item'].includes(fileType)) {
            const filePath = path.join(__dirname, '../uploads/item/', fileName);

            req.filePath = filePath;

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return res.status(404).send({ file: false });
                }
                next();
            });
        }
    } else res.status(401).json({ verify: false });
};

exports.deleteFileMiddleware = async (req, res, next) => {
    const name = req.params.name;
    const last_name = req.params.last_name;

    if (req.user && name && last_name) {
        const baseFilePath = path.join(__dirname, '../uploads/couriers', `${last_name}_${name}`, `паспорт_${name}`);
        const extensions = ['.jpg', '.png', '.pdf', '.webp', '.jpeg'];

        const findFileWithExtension = async (baseFilePath, extensions) => {
            for (const ext of extensions) {
                const filePath = baseFilePath + ext;
                try {
                    await fs.promises.access(filePath);
                    return filePath;
                } catch (err) {
                    console.log(err);
                }
            }
            return null;
        };

        const filePath = await findFileWithExtension(baseFilePath, extensions);

        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Ошибка при удалении файла:', err);
                    return res.status(500).json({ error: err });
                }
                console.log('Файл успешно удален:', filePath);
                req.deletedFilePath = filePath;
                next();
            });
        } else {
            return res.status(404).json({ error: error });
        }
    } else {
        return res.status(400).json({ error: error });
    }
};