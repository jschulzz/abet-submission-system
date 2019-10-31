const User = require('../models/User')

module.exports.new = async (username) => {
	if(username === ""){
        throw new Error('User must have username')
    }
    let user = await User.query().where('linkblue_username', username)
    if (user.length !== 0) {
        throw new Error('User already exists')
    }
    let new_user = await User.query().insert({linkblue_username: username})

    return new_user

}

module.exports.get = async (username) => {
    if(username === ""){
        throw new Error('User must have username')
    }
    let user = await User.query().where('linkblue_username', username)
    if (user.length === 0) {
        throw new Error('User does not exists')
    }

    return user
}