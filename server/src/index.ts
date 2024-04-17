import { PrismaClient } from "@prisma/client"
import express, { response } from "express"
import cors from "cors"
import jwt from 'jsonwebtoken'
import SECRET_KEY from "./config"
import { authMiddleware, AuthRequest } from './middleware';

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;
    
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password
            }
        });

        const token = jwt.sign({ id: newUser.id }, SECRET_KEY);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "User Creation Failed" });
    }
});

app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user || user.password !== password) {
            return res.status(404).json({
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ id: user.id }, SECRET_KEY);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.post("/user/todo", authMiddleware, async (req:AuthRequest, res) => {
    const { title, description } = req.body;
    const userId = req.id;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const response = await prisma.todo.create({
            data: {
                title,
                description,
                user: {
                    connect:{
                        id: user.id
                    }
                }
            }
        });

        res.status(201).json({ message: "Todo created successfully", response });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/bulk",authMiddleware, async (req:AuthRequest, res) => {
    const response = await prisma.todo.findMany({
        where:{
            userId: req.id
        },
        orderBy: {
    id: 'asc', // Sort by ID in ascending order
  }
    })
    res.status(200).json(response)
})

app.delete("/user/todo",authMiddleware, async (req, res) => {
    try{
        const response = await prisma.todo.deleteMany({
            where:{
                done: true
            }
        })
        res.status(200).send(response)
    }
    catch (e){
        res.json({
            "error": e
        })
    }

})

app.put("/user/todo", authMiddleware, async (req, res) => {
    try{
        const { id } = req.body
        const _id = parseInt(id)
        const response = await prisma.todo.update({
            where:{
                id: _id
            },
            data:{
                done: true
            }
        })
        res.status(200).send(response)
    }
    catch (e){
        res.json({
            message: "Internal Server Error"
        })
    }

})

app.put("/user/todo/update", authMiddleware, async (req, res) => {
    try{
        const { id, title } = req.body
        const _id = parseInt(id)
        const response = await prisma.todo.update({
            where:{
                id: _id
            },
            data:{
                title: title
            }
        })
        res.status(200).send(response)
    }
    catch (e){
        res.json({
            message: "Internal Server Error"
        })
    }
})

app.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"))