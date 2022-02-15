var express = require('express');
var router = express.Router();
var Book = require("../models/book");


router.get( '/', ( req, res )=>{
    res.render( "books" )
} )

router.get( '/new', ( req, res )=>{
    res.render( "addBooks" );
} )

router.post( '/', ( req, res, next )=>{
    //* capture the data and save in database
    Book.create( req.body, ( err, data )=>{
        //* deal with err
        if ( err ) return next( err );
    } );
    //* send response
    res.redirect( '/books' );
} )


module.exports = router;