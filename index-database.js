const express=require("express");
const mysql=require("mysql");
const path=require('path');
const app=express();
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sem-4-project'
})
db.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("MYSQL connected");
    }
});
const publicdirectory=path.join(__dirname,'public');
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));
app.use(express.static(publicdirectory));
console.log(__dirname);
app.set('view engine','hbs');
app.listen(5500,()=>{
    console.log("sever started");
})