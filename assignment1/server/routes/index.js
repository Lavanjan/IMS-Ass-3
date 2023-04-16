var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:num1/add/:num2',(req,res)=>{
  a = parseInt(req.params.num1) + parseInt(req.params.num2)
  sum = ''+a
  res.send(sum)
})


module.exports = router;
