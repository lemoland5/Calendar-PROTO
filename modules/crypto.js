const crypto = require ('crypto');   

    //SHA256 HASH
const hash = input => {
    return crypto.createHash('sha256').update(input).digest('hex');
}

    //EXP
module.exports = {
    hash
}
