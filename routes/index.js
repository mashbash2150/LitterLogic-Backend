const { Router } = require('express');
const router = Router();
const controllers=require('../controllers')

router.get('/', (req, res) => res.send('This is HOME'))
router.get('/users', controllers.getUsers)
router.get('/cats', controllers.getCats)
router.get('/triggers', controllers.getTriggers)
router.get('/users/:id', controllers.getUserWithCats)
router.get('/cats/:id', controllers.getCatWithTriggers)
router.get('/triggers/:id', controllers.getTriggerById)


module.exports = router;