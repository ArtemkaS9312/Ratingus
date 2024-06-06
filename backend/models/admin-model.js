const { Pool } = require('pg');

const AdminSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('Admins', AdminSchema);