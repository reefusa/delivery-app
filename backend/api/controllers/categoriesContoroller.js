const connection = require('../../configs/database');

exports.getCategoriesContoroller = (req, res) => {
    const { lng } = req.query; 
    const dollarExchangeRate = 90;

    const formatCurrency = {
            'ru': (amount) => amount.toLocaleString('ru-RU', {
                style: 'currency', currency: 'RUB',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0 }),
            'en': (amount) => amount.toLocaleString('en-US', {
                style: 'currency', currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0 }),
        }

    const сurrency = formatCurrency[lng];

    const sql = 'SELECT * FROM categories';
    connection.query(sql, (error, result) => {
        if (error) return res.status(500).json({ error : error });
        if (result.length !== 0) { 

            const categories = result.map(el => {
                if (el.min_sum.trim() !== '') {
                    const updateMinSum = lng === 'ru' ? +el.min_sum * dollarExchangeRate : +el.min_sum;
                    return {
                        ...el,
                        min_sum: сurrency(updateMinSum)                        
                    }
                } else {
                    return el;
                }
            });

        // console.log(categories);

            res.json({ categories : categories });
        }
    });
}