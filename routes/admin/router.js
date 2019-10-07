module.exports = app => {
    const express = require('express')
    const router = express.Router()

    app.use(require('cors')())
    app.use(express.json())

    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        }
        const models = await req.Model.find().setOptions(queryOptions)
        res.send(models)
    })
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            status: 0
        })
    })
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../uploads'
    })
    app.post('/admin/api/rest/upload', upload.single('file'), (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)

    })

    app.post('/admin/api/rest/login', async (req, res) => {
        const{username,password}=req.body;
        const User=require('../../models/User')
        const user= await User.findOne({
            username:username
        })
        if(!user){
            return res.status(422).send({
                message:'用户不存在'
            })
        }
        
        

        
    })

    app.use('/admin/api/rest/:resource', (req, res, next) => {
        let modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}