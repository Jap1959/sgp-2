const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sem-4-project'
});
exports.addreview = async (req, res) => {
    const Mobile = req.query;
    const val = Mobile.Mobile;
    const resreview=[];
    const resimg=[];
    db.query('Select * FROM reviews where Mobile_no=?;',[val], async (error, results) => {
        // console.log(results);
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            let i=0;
            results.forEach(async (elment)=>{
                const Name=elment.Name;
                const review=elment.review;
                resreview.push({Name,review});
            })
        }
    })
    db.query('Select * FROM imageusers where Mobile_no=?;',[val], async (error, results) => {
        // console.log(results);
        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            let i=0;
            results.forEach(async (elment)=>{
                const img1=elment.image;
                resimg.push(img1);
            })
        }
    })
    db.query('Select * FROM userdetail where Mobile_no=?;', [val], async (erorr, results) => {
        // console.log(results);
        if (erorr) {
            console.log(erorr)
        }
        if (results.length > 0) {
            // console.log(results);
            // console.log(resreview);
            return res.render('description',{
                Name:results[0].Name,
                address:results[0].address,
                Mobile:results[0].Mobile_no,
                results:resreview,
                resimage1:resimg[0],
                resimage2:resimg[1]
            });
        }

    });
    
}
exports.search=async (req,res)=>{
    const {search}=req.body;
    const resdata=[];
    db.query('Select * FROM userdetail where address=? or Name=? or Mobile_no=?' ,[search,search,search],async (erorr, results) => {
        if (erorr) {
            console.log(erorr)
        }
        if (results!=0) {

            results.forEach(async (elment)=>{
                 const image=elment.image;
                 const Name=elment.Name;
                 const address=elment.address;
                 const Mobile=elment.Mobile_no;
                 resdata.push({image,Name,address,Mobile});

            });
             if(resdata!=NULL){
            res.render('/explore',{results:resdata});
             }
             else{
                res.render('/explore',{message:'No results'});
             }
        }
        else{
           res.render('/explore',{message:'No results'});
        }

    });
}
exports.data = async (req, res) => {
   
      
    db.query('Select * FROM userdetail', async (erorr, results) => {
        if (erorr) {
            console.log(erorr)
        }
        if (results.length > 0) {
            let i=0;
            const data = []
            results.forEach(async (row) => {
                const address = row.address
                const Name = row.Name
                const Mobile = row.Mobile_no
                const image=row.image
                console.log(image);
                data.push({
                    address,image, Name, Mobile
                })
            })
            console.log(data);
            res.json(data);
        }

    });
}
