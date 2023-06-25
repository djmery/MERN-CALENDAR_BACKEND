
const jwt = require('jsonwebtoken');

//la función deberia recibir lo que yo tengo que colocar como payload en mi token el uid y name
const generarJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name };
        //aquí generarmos el token, ponemos nuestra private key secret_jwt_seed, palabra secreta para firmar mis token
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });

    });

}

module.exports = {
    generarJWT
}