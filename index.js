const express=require('express')
const app=express()
app.use('/uploads',express.static(__dirname+'/uploads'))

require('./routes/admin/router')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})