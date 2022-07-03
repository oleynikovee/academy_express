const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.status(200);
    res.end('Hi,there are a lot of books,use /books to show it \n');
});
//books apies
const showBooks=require('./books/books.js');
app.use('/books',showBooks);
//error handling
const errorHandler=(err,req,res,next)=>{
    if(err.status){
        return res.status(err.status).json({message:err.message});
    }
    res.sendStatus(500);
}
app.listen(port,()=>console.log('Server listening on http://localhost:'+port));