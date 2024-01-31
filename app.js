import express from 'express'
import cors from 'cors'
import FormRouter from './Routes/FormRoutes.js'
import UserRouter from './Routes/UserRoutes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/form', FormRouter)
app.use('/', UserRouter)

app.listen(5000, ()=>{
    console.log('Server running on port 5000')
})