// authController.js
const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const express = require('express');
const app=express();
const bcrypt=require('bcryptjs');
const session = require("express-session");
const cookieParser=require('cookie-parser');
// app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sem-4-project'
})
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true
}));
exports.singup=async (req,res)=>{
    console.log(req.body);
    const{Name,Mobile,password,confirmpassword,address}=req.body;
    const{image}=req.body;
    console.log(image);
    if(Mobile.length!=10){
        return res.render("sinuppage",{
            message:'Enter valid number',
         });
    }
     db.query('Select Mobile_no  FROM userdetail where Mobile_no=?',[Mobile],(erorr,results)=>{
        console.log(results);
           if(erorr){
            console.log(erorr)
           }
           if(results.length>0){
             return res.render("sinuppage",{
                message:'This Mobile no already in use'
             });
           }
           else if(password!=confirmpassword){
            return res.render("sinuppage",{
                message:'confirm password does not match'
             });
           }
     });
      
     let hashedpass= await bcrypt.hash(password,8);
     console.log(hashedpass);
     if(image[0]==null){
     db.query('INSERT INTO userdetail SET?',{Name:Name,Mobile_no:Mobile,image:image[0],password: hashedpass,address: address},(error,results)=>{
         if(error){
            console.log(error);
         }
         else{
            let i=0;
            image.forEach(async (elment)=>{
                db.query('INSERT INTO imageusers SET?',{Mobile_no: Mobile,image:image[i]},(error,results)=>{
                    if(error){
                       console.log(error);
                    }
                });
                i++;
            })
            return res.render('index');
            
         }
     });
    }
    else{
        db.query('INSERT INTO userdetail SET?',{Name:Name,Mobile_no:Mobile,image:image,password: hashedpass,address: address},(error,results)=>{
            if(error){
               console.log(error);
            }
            else{
            //    let i=0;
            //    image.forEach(async (elment)=>{
                   db.query('INSERT INTO imageusers SET?',{Mobile_no: Mobile,image:image},(error,results)=>{
                       if(error){
                          console.log(error);
                       }
                   });
                //    i++;
            //    })
               return res.render('index');
               
            }
        });
    }
 
}
exports.login=async (req,res)=>{
    const{Mobile_no,password}=req.body;
    console.log(Mobile_no);
    db.query('Select password FROM userdetail where Mobile_no=?',[Mobile_no],async (erorr,results)=>{
           if(erorr){
            console.log(erorr)
           }
           if(results.length>0){
            results.forEach(async (row) => {
                const isMatch = await bcrypt.compare(password, row.password);
                if(isMatch){
                    return res.render('index-logout');
                }
                else
                return res.render("login",{
                    message:'password is not correct'
                 });
              });
            
           }
     });
}
exports.resetpassword=async (req,res)=>{
    const {Mobile,password}=req.body;
     console.log(Mobile);
     console.log(password);
     let hashedpass= await bcrypt.hash(password,8);
     console.log(hashedpass);
    db.query('update userdetail set password=? where Mobile_no=?',[hashedpass,Mobile],async (erorr,results)=>{
        console.log(results);
        if(erorr){
         console.log(erorr)
        }
        if(results.changedRows==1){
         res.render('login',{message:'Password reset sucesssfully'});
        }
  });
}
exports.addreview=async (req,res)=>{
    const { Mobile, Name, message } = req.body;
    console.log(Mobile);
  const values = [Mobile, Name, message];
    db.query('insert into reviews (Mobile_no, Name, review) values(?,?,?)',values,async (erorr,results)=>{
        if(erorr){
         console.log(erorr);
        }
        if(results!=0){
            res.redirect(`/description?Mobile=${Mobile}`);
        }
  });

}
exports.userlogined = async (req, res) => {
    
      return res.render('index');
  };
