require('dotenv').config()
require('express-async-errors')



const express= require('express')
const app= express()


const mainRouter=require('./routes/main.js')
const notFoundMiddleware=require('./middleware/not-found.js')
const errorMiddleware=require('./middleware/error-handler.js')


app.use(express.static('./public'))
app.use(express.json())


app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)



const port=process.env.PORT || 3000


const start=async()=>{
    try {
        app.listen(port,console.log(`Server is Listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()