const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    country: { type: String },
    display_name: { type: String },
    followers: { type: String },
    type: { type: String }
}, { versionKey: false, timestamps: true });

const User = mongoose.model('Users', userSchema);

module.exports = User;