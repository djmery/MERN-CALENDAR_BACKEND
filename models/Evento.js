const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    //El usuario que creó el registro
    user: {
        type: Schema.Types.ObjectId, // le dice a mongoose que va a hacer una referencia
        ref: 'User', // la referencia al user que es el nombre del otro schema.
        required: true
    }

});

EventoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject(); //referencia a todo el objeto que se esta serializando y puedo extraer el _id y __v y todo lo demás va a estar almaceado en object
    object.id = _id; // quiero que se llame id en lugar de _id
    return object;
});

module.exports = model('Evento', EventoSchema);