const router=require('express').Router();
const fs=require('fs');
// Get list of all books
router.get('/',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        sortById(data);
        res.json(data);
    }catch(err){
        next(err);
    }
});
//Get book by id
router.get('/:id',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        sortById(data);
        let result="";
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                result=element;
            }
        });
        result===""?res.json("Такого елемента не існує"):res.json(result);
    }catch(err){
        next(err);
    }
});
//Get reviews of books by id of books
router.get('/:id/review',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        sortById(data);
        let result="";
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                result=element.review;
            }
        });
        result===""?res.json("Такого елемента не існує"):res.json(result);
    }catch(err){
        next(err);
    }
});
//Create book
router.post('/',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        data.push(req.body);
        writeInJson(data);
        res.end("Added");
    }catch(err){
        next(err);
    }
});
//Update review by id of book
router.put('/:id/review',(req,res,next)=>{
    let result="Такої книги не існує";
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                let reviews=JSON.parse(JSON.stringify(element.review));
                reviews.push(req.body.review);
                element.review=reviews;
                result="Changed";
            }
        });
        writeInJson(data);
        res.end(result)
    }catch(err){
        next(err);
    }
});
//Update title by id of book
router.put('/:id/title',(req,res,next)=>{
    try{
        let result="Такої книги не існує";
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                element.title=req.body.title;
            }
            result="Changed";
        });
        writeInJson(data);
        res.end(result);
    }catch(err){
        next(err);
    }
});
//Delete review by id of review using id of book
router.delete('/:id/review/:reviewID',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                let reviews=JSON.parse(JSON.stringify(element.review));
                let findItem=()=>{
                    for(let i=0;i<reviews.length;i++){
                        if(reviews[i].id.toString()===req.params.reviewID){
                            return i;
                        }
                    }
                }
                reviews.splice(findItem, 1);
                element.review=reviews;
            }
        });
        writeInJson(data);
        res.end('changed')
    }catch(err){
        next(err);
    }
});
//Delete one of books
router.delete('/:id',(req,res,next)=>{
    let result ="Такої книги не існує"
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        for(let i=0;i<data.length;i++){
            if(data[i].id.toString()===req.params.id){
                data.splice(i, 1);
                result="Deleted"
            }
        }
        writeInJson(data);
        res.end(result);
    }catch(err){
        next(err);
    }
});
//sort array of book
function sortById(arr) {
    arr.sort((a, b) => a.age > b.age ? -1 : 1);
}
//write into JSON file
function writeInJson(data){
    let result=JSON.stringify(data);
    fs.writeFile("books.json",result, 'utf8', function (err) {
        if (err) {
            next(err);
        }
    });
}

module.exports=router;
