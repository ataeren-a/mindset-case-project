const { sign } = require('jsonwebtoken');

const expiresIn = '24h';

function generateToken(data) {
    const payload = { data: data };
    const options = { expiresIn: data.expires_in || expiresIn };
    return sign(payload, process.env.JWT_SECRET_KEY, options);
}

module.exports = {
    generateToken,
    
}