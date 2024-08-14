import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/user', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            pass: req.body.pass
        }
    })
    res.status(201).json(req.body)
})

app.post('/cart', async (req, res) => {
    await prisma.cart.create({
        data: {
            product_name: req.body.product_name,
            price: req.body.price,
            quantity: req.body.quantity,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.get('/user', async (req, res) => {
    const user = await prisma.user.findMany()
    res.status(200).json(user)
})
app.get('/cart', async (req, res) => {
    const cart = await prisma.cart.findMany()
    res.status(200).json(cart)
})

app.put('/cart/:id', async (req, res) => {
    await prisma.cart.update({
        where: {
            id: req.params.id
        },
        data: {
            product_name: req.body.product_name,
            price: req.body.price,
            quantity: req.body.quantity,
            email: req.body.email
        }
    })
    res.status(201).json(req.body)
})

app.delete('/cart/:id', async (req, res) => {
    await prisma.cart.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "User deleted"})
})

const PORT = 5000;
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})