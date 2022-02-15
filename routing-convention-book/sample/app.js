var express = require("express");
var app = express();
var path = require("path");
var mongoose = require("mongoose");
var Book = require('./models/books');

mongoose.connect( "mongodb://localhost/sample", (err)=>{
    console.log( err ? err : "connected : true" );
} )


app.set( "view engine", "ejs" );
app.set( "views", path.join( __dirname, "views" ) );

app.use( express.json() );
app.use( express.urlencoded() );

//studne new Get request
app.get( "/books/new", ( req, res )=>{
    res.render("formpage.ejs")
} )

//books Post request
app.post( "/books", ( req, res )=>{
    console.log(req.body);
    Book.create( req.body, ( err, book )=>{
        console.log( err, book );
    } );
    res.send(`${req.body.name} is added successfully`);
} );

// display all books
app.get( "/books", ( req, res )=>{
    Book.find( {}, (err,book)=>{console.log(err);
        let list = book.reduce((acc,cv)=>{
            console.log(cv.name);
            acc.push(cv.name)
            return acc
        },[])
        console.log(list)
        res.render( "bookslist", {list:list} )
    }) 
} );

// display particular book
app.get( "/books/:id", ( req, res, next )=>{
    var id = req.params.id;

    Book.find({"name":id},(err,book)=>{
        console.log(err,book[0].name)
        var name = { name:book[0].name, about:`${id} is good` };
        res.render( "bookDetails", {name: name}  );
    })
} );


app.use( ( req, res, next )=>{
    res.send("Page Not Found");
} );

app.listen( 3000, ()=>{
    console.log("server listening on port 3000");
} );

