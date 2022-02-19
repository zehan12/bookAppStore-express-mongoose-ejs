var express = require('express');
var router = express.Router();
var Book = require("../models/book");
var Comment = require("../models/comment");


router.get( '/', ( req, res )=>{
    //* fetch list of books from database it display all
    Book.find( {}, ( err, books ) => {
        //* if err pass it to error handler
        if ( err ) return next( err );
        //* render data on ejs with dynamic data
        res.render( "books", { books: books } );
    } );
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
} );

router.get( '/:id', ( req, res, next ) => {
    var id = req.params.id;
    Book.findById( id, ( err, book ) => {
        if ( err ) return next( err );
        res.render( 'bookDetails', { book: book } )
    } );
} );

router.put( '/:id/edit', ( req, res, next ) => {
    //* find book details 
    var id = req.params.id;
    Book.findById( id, ( err, book ) => {
        if ( err ) return next( err );
        res.render( 'editBookForm', { book: book } )
    } );
    //* render a update form
} );

router.post( '/:id', ( req, res, next ) => {
    //* capture update data
    //* using id find the book and update it with data comming from the form
    var id = req.params.id;
    Book.findByIdAndUpdate( id, req.body, ( err, updatedBook ) => {
        if ( err ) return next( err );
        res.redirect( '/books/' + id );
    } );
} );

router.get( '/:id/delete', ( req, res, next ) => {
    var id = req.params.id;
    Book.findByIdAndDelete( id, ( err, book ) => {
        if ( err ) return next( err );
        res.redirect( '/books' );
    } )
} );

//? comment routes

//! add comment
router.post( '/:id/comments', ( req, res, next ) => {
    //* adding book id into comment
    var id = req.params.id;
    req.body.BookId = id;
    Comment.create( req.body, ( err, comment ) => {
        if ( err ) return next( err );
        res.redirect( '/books/' + id );
    } )

} );

module.exports = router;