var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res, next) {
  let jwt2 = jwt.sign("hello", "asdasdasdasdasdasdasdasdasdasd")
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie myAgainJwt");
  res.setHeader("myAgainJwt", jwt2);
  res.cookie("myAgainJwt", jwt2, {sameSite: 'lax', path: "/"})
  console.log(res.headers);
  res.json({message: 'respond with a resource',
  myAgainJwt: res.cookie});
});

module.exports = router;
