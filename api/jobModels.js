var mongoose = require('mongoose');
var Jobs = mongoose.model('Jobs', {
    jobTitle:{
        type:String,
        required: true
    },
    jobDescription:{
        type:String
    },
    companyName :{
        type:String
    },
    jobLocation:{
        type:String
    },
    jobField:{
        type:String
    },
    employmentType:{
        type:String
    },
    createdDate:{
       type:Date,
       default: Date.now 
    }
});

module.exports = {Jobs}