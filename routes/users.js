var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function(req, res) {
  console.log(req.headers)

  let jwt2 = jwt.sign("hello", "asdasdasdasdasdasdasdasdasdasd")
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Set-Cookie myAgainJwt");
  // res.setHeader("myAgainJwt", jwt2);
  res.cookie("myAgainJwt2", jwt2, {sameSite: "none", secure:true})

  res.json({"message": 'respond with a resource'});
});

module.exports = router;
