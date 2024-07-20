exports.verificationController = (req, res) => {
    // console.log(req.body);
    // if (req.body === '1111111111') {
    //     res.status(200).send(true);
    // } else {
    //     res.status(200).send(false);
    // }
    // Middleware токена jwt 
    const jwt = require('jsonwebtoken');

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
}