var express = require('express');
const { models } = require('mongoose');
var router = express.Router();

router.get( '/', ( req, res )=>{
    res.render("index");
} );



module.exports = router;