
const moment = require('moment');

const isDate = (value) => {
    if (!value) {
        return false;// sino existe esto le dice a expressValidator que el campo no es correcto y la validación va a fallar
    }

    //moment indica si es una fecha correcta o no.
    const fecha = moment(value);
    if (fecha.isValid()) { //isValid función propia de moment
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}