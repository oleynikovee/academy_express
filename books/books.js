const router=require('express').Router();
const fs=require('fs');

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
        result===""?res.json("Такого элемента не существует"):res.json(result);
    }catch(err){
        next(err);
    }
});

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
        result===""?res.json("Такого элемента не существует"):res.json(result);
    }catch(err){
        next(err);
    }
});

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

router.put('/:id/review',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                let reviews=JSON.parse(JSON.stringify(element.review));
                reviews.push(req.body.review);
                element.review=reviews;
            }
        });
        writeInJson(data);
        res.end('changed')
    }catch(err){
        next(err);
    }
});

router.put('/:id/title',(req,res,next)=>{
    try{
        let json=require('../books.json');
        let data=JSON.parse(JSON.stringify(json));
        console.log(req.body);
        data.forEach(element => {
            if(element.id.toString()===req.params.id){
                element.title=req.body.title;
            }
        });
        writeInJson(data);
        res.end('changed')
    }catch(err){
        next(err);
    }
});

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


function sortById(arr) {
    arr.sort((a, b) => a.age > b.age ? -1 : 1);
}

function writeInJson(data){
    let result=JSON.stringify(data);
    fs.writeFile("books.json",result, 'utf8', function (err) {
        if (err) {
            next(err);
        }
    });
}

module.exports=router;