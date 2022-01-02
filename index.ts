import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express()
app.use(express.json())

const prisma = new PrismaClient()
app.get('/', async (req,res)=>{
    const users = await prisma.user.findMany()
    res.json(users)
})
app.get('/byid/:id', async (req,res)=>{
    const id = req.params.id;
    const users = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    res.json(users)
})
app.post('/', async (req,res)=>{
    const {username,password}=req.body;
    const user = await prisma.user.create({
        data:{
            username:username,
            password:password,
        }
    });
    res.json(user)
})
// app.post('/createusermany', async (req,res)=>{
//     const {userlist}=req.body;
//     const users = await prisma.user.create({
//         data:userlist()
//     });
//     res.json(users)
// })
app.put('/', async (req,res)=>{
    const {id,username}=req.body
    const updateUser = await prisma.user.update({
        where:{
            id:id,
        },
        data:{
            username:username,
        }
    })
    res.json(updateUser)
})
app.delete('/:id',async (req,res)=>{
    const id = req.params.id;
    const deleteUser = await prisma.user.delete({
        where:{
            id:Number(id),
        }
    });
    res.json(deleteUser)
})
app.listen(3001,()=>{
    console.log('Server running at http://localhost:3001')
})