const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT //we are using process.env.port becoz we need to deploy it to herokubundleRenderer.renderToStream

const multer = require('multer')

const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload  a word document'))
        }

        cb(undefined, true)
    }
})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

//
//without middleware:      new request   ->    run route handler 
//
//
//with middleware:        new request  ->   do something   ->  run route handler
//

// app.use((req, res, next)=>{
//     res.status(503).send('Site is currently down. Check back soon!')
//     next()
// })

app.use(express.json()) //automatically parses the json into objects.
app.use(userRouter) //route handler
app.use(taskRouter) //routte handler

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const jwt = require('jsonwebtoken')

// const myFunction = async ()=> {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse',{ expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token,'thisismynewcourse')
//     console.log(data)
// }

// myFunction()