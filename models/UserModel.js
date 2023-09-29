const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true
      },
      picture: String,
    username: String,
    email: String,
    password: String,
    facebook: String,
    file: String
})

const UserModel = mongoose.model('ich_users', UserSchema)

module.exports = UserModel;



