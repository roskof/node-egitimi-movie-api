const mongoose=require('mongoose')

module.exports=()=>{
    mongoose.connect('mongodb://movie_user:abcd1234@ds133353.mlab.com:33353/movie-api',{ useNewUrlParser: true })
    mongoose.connection.on('open',()=>{
        console.log('MongoDB: Connected.')
    })
    mongoose.connection.on('error',(err)=>{
        console.log('MongoDB: Error', err)
    })
}