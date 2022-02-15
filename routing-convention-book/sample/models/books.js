var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    name: String
})

var Book = mongoose.model( "Book", bookSchema );

module.exports = Book;