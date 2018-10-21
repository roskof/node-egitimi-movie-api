const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true,'`{PATH}` alanı zorunludur.'],
        maxlength: [15,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: [3,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.']
    },
    category: {
        type: String,
        maxlength: [30,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: [3,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.']
    },
    country: {
        type: String,
        maxlength: [30,'`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: [3,'`{PATH}` alanı (`{VALUE}`), ({MINLENGTH}) karakterden büyük olmalıdır.']
    },
    year: {
      type: Date,
      max: [2040,'`{PATH}` alanı (`{VALUE}`), ({MAX}) karakterden küçük olmalıdır.'],
      min: [1071,'`{PATH}` alanı (`{VALUE}`), ({MIN}) karakterden büyük olmalıdır.']  
    },
    imdb_score: {
        type: Number,
        max: 10,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    director_id: mongoose.Types.ObjectId
})

module.exports=mongoose.model('movie',MovieSchema)