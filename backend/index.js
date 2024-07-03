const express = require('express');
const app = express();
const PORT = 3003;
const router = require('./api/routers/userRouter');

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Прослушка ${PORT} порта`);
});