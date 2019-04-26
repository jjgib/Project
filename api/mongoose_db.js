var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/jobportal',{useNewUrlParser:true});

module.exports = {
    mongoose:mongoose
}