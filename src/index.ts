import { PrismaClient } from '@prisma/client'
import express from 'express'


const prisma = new PrismaClient()

const app = express()

app.use(express.json())

const prefix = (host: string) => {
    return host.split(".")[0]
}

app.get('/', (req, res) => {
    res.send('Hello Nodejs Typescript Prisma World!')
})

app.get('/api/v1/products', async (req, res) => {
    const products = await prisma[`${prefix(req.headers.host)}Product`].findMany()
    res.send(products)
})

app.post('/api/v1/products', async (req, res) => {
    const product = await prisma[`${prefix(req.headers.host)}Product`].create({
        data: {
            title: req.body.title,
            price: req.body.price,
        }
    })
    res.send(product)
})

app.listen(8001)