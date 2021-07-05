const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const criterioSchema = new Schema({
    descripcion: { type: String },
    total: { type: Number }
}, { versionKey: false, timestamps: true });

const Criterio = mongoose.model('Criterio', criterioSchema);

module.exports = Criterio;