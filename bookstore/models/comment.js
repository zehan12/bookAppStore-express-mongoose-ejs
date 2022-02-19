//? we are applying refrencing approach 

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    content: { type: String, require: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", require: true }
}, { timestamps: true } );

var Comment = mongoose.model( 'Comment', commentSchema );

module.exports = Comment;