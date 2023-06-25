
const { response } = require('express');
const { validationResult } = require('express-validator');

// next callback - es una función que tengo que llamar si todo se ejecuta correctamente, 
//el next hace que pase al siguiente middleware
const validarCampos = (req, res = response, next) => {

    //  manejo de errores
    const errors = validationResult(req);
    // si hay errores
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next(); // sino hay error llamamos el next()

}

module.exports = {
    validarCampos
}