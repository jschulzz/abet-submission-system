const User = require('../models/User')

module.exports.new = async ({
	username
}) => {
	if(username == ""){
        throw new Error("User must have username")
    }
    let user = await User.query().where('linkblue_username', username)
    if (user !== null) {
        throw new Error('user already exists')
    }
    let new_user = await User.query().insert({linkblue_username: username})

    return new_user

}