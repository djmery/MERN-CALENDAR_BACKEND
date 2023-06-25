
/*
    Rutas de eventos / Events
    host + '/api/events

*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');


const router = Router();

// Todas tienen que pasar por la validación del JWT
// cualquier petición que se encuentre justo debajo de esto va a tener que tener su token, todas las peticiones deben pasar por validarJWT
// es lo mismo que poner router.get('/', validarJWT, getEventos);
// Si queremos que alguna ruta fuera pública por ejemplo getEventos moveríamos router.use(validarJWT) debajo de router.get('/', getEventos)
// En este caso son todas privadas
router.use(validarJWT);

// Obtener Eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

//Actualizar Evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;



