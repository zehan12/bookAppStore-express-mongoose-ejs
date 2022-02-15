var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    author: String
}, { timestamps: true } );

var Book = mongoose.model( "Book", bookSchema );
module.exports = Book;