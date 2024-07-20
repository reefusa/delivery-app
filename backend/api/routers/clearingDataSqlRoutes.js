const express = require('express');
const clearingDataSqlRoutes = express.Router();
const connection = require('../../configs/database');

clearingDataSqlRoutes.post('/delete', (req, res) => {
    const { table } = req.body;
    connection.query(`DELETE FROM ${table}`, (error) => {
        if (error) return res.json(`Не удлось очистить ${table}, ошибка: ${error}`);
        res.json(`${table} была успешно очищенна`);
    });
});

module.exports = clearingDataSqlRoutes;