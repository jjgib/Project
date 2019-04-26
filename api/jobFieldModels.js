var mongoose = require('mongoose');
var JobField = mongoose.model('jobfields',{
    jobField:{
        type:String,
        required: true
    }
});

module.exports = {JobField}