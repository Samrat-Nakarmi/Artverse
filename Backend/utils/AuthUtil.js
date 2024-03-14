const bcrypt = require('bcrypt')

async function compare_password (password, hash){
    const result = await bcrypt.compare(password, hash)
    return result
}

async function get_hash(password){
    const hash = await bcrypt.hash(password, 10)
    return hash
}

module.exports = {get_hash, compare_password}