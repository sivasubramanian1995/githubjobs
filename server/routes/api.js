var express = require('express');
var router = express.Router();

const positions = require('../controller/positionsController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/jobs/sync', positions.sync);
router.get('/jobs', positions.getData);
router.get('/db', positions.db);

module.exports = router;
