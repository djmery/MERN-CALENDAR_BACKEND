const { response } = require('express');
const bcrypt = require('bcryptjs');
//response para la ayuda del intelligence y me muestre tipado de la response
const User = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    //console.log(req.body);
    const { email, password } = req.body;

    try {
        //findOne - busca enla BBDD si ya existe ese mail
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        user = new User(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generar JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // confirmar los passwords
        const validarPassword = bcrypt.compareSync(password, user.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }


        // Generar nuestro JWT
        const token = await generarJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const revalidarToken = async (req, res = response) => {

    const { uid, name } = req;

    //generar nuevo JWT
    const token = await generarJWT(uid, name);

    res.json({
        ok: true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}