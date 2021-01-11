var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookie = require('cookie');

/* GET users listing. */
router.get('/', function(req, res) {

  let jwt2 = jwt.sign("hello", "asdasdasdasdasdasdasdasdasdasd");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", true);
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie");
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  res.setHeader('Set-Cookie', cookie.serialize('myAgainJwt2', jwt2, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week,
    sameSite:"none",
    secure:true
  }));

  res.json({
    "message": "WHAT IS in main user"
  })


  // res.cookie("myAgainJwt2", jwt2, {httpOnly:true, sameSite:"none", secure:true}).json({"message": 'respond with a resource'});
});

router.get('/nextUser', function(req, res) {
  if(req.headers.cookie){
    console.log("it makes sense");
  } else {
    console.log("it doesnot makes sense");
  }

});

router.get('/logout', function(req, res) {
  res.cookie("myAgainJwt2", "").json({"message": 'respond with a resource'});

});

router.get('/hello', function(req, res) {
  // res.cookie("myAgainJwt2", "").json({"message": 'respond with a resource'});
  res.json({
    "message": "WHAT IS UP"
  })

});

module.exports = router;
