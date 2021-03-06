const mongoose = require('mongoose')

mongoose.connect(process.env.PROD_MONGODB_URL, {
    // mongoose.connect(process.env.DEV_MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(result => {
    console.log('Database connected')
}).catch(error => {
    console.log('Failed to connect to database')
})
