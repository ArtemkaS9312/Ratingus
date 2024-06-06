const { Pool } = require('pg');

const TokenSchema = new Schema({
    admin: {type: Schema.Types.ObjectId, ref: 'Admins'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', AdminSchema);