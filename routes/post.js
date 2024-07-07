const express = require("express");
const post = express.Router();
const postData = require("../schema/postData");
const authData=require('../schema/authData')

// post.post('/post/:id',async(req,res)=>{
//     var dt=req.body
//     dt.id=req.params.id
//     let id=req.params.id
//     await postData.create(dt,(err,data)=>{
//         if (err){
//             return err;
//         }
//         else{
//             // const {id:pass,...rest}=data;
//             console.log(data);
//             res.status(200).json(data)
//         }
//     })
//     let userData=await authData.findById(id);
//     userData.posts.push(req.body)
//     userData.save()
// })

post.post('/post/:id',async (req,res)=>{
    let data=req.body
    let id=req.params.id
    let data2={...data}
    data.id=id
    // console.log(data2);
    
    let userData=await authData.findById(id)
    let postLen=userData.posts.length
    data2.id=postLen
    // console.log("userData");
    // console.log(userData);
    // console.log("data2");
    // console.log(data2);
    userData.posts.push(data2)
    userData.save()
    // userData.posts.push(data2,async(err,data2)=>{
    //     console.log(await data2);
    //     if(err){
    //         return err
    //     }else{
    //         userData.save()
    //         res.status(200).json(data2)
    //     }
    // })

    data.id2=postLen
    await postData.create(data,(err,data)=>{
        if (err){
            return err;
        }
        else{
            res.status(200).json(data)
        }
    })


})

post.get('/feed',(req,res)=>{

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    postData.find(req.body,(err,data)=>{
        if (err){
            return err
        }
        else{
            data=shuffleArray(data)
            console.log(data)
            res.status(200).json(data)
        }
    })
})

post.post('/like/:id',async(req,res)=>{
    let data=await postData.findById(req.params.id)
    console.log(data);
    data.likes=data.likes+1
    data.save()
    let id=data.id
    let userData=await authData.findById(id)
    console.log(userData.posts)
    res.status(200).json(data)
})

module.exports=post