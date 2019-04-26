const express = require('express');
var bodyParser = require('body-parser');
const passport = require('passport'); 

var {mongoose} = require('./mongoose_db');
var User = require('./userModels'); 
var {Jobs} = require('./jobModels');
var {JobField} = require('./jobFieldModels');

var app = express();
app.use(bodyParser.json());

// For CORS,Pgm Line no 12 to 29
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Fetch data
app.get('/getjobs',(req,res)=>{
    Jobs.find().then( (data)=>{
        res.send(data);
    }, (error)=>{
        res.status(400).send("Error happened "+error);
    })
});


//Create
app.post('/save',(req,res)=>{
    var jobs = new Jobs(
        {
            jobTitle : req.body.jobTitle,
            jobDescription : req.body.jobDescription,
            companyName : req.body.companyName,
            jobLocation : req.body.jobLocation,
            jobField : req.body.jobField,
            employmentType : req.body.employmentType
        }
    );
    jobs.save().then( (doc)=>{
        res.send(doc);
    }, (error)=>{
        res.status(400).send(error);
    })
});

//Find by Id
app.get('/view/:jobId',(req,res)=>{
    var id = req.params.jobId;
    Jobs.findById(id)
    .then( (result)=>{
        if(result){
            res.send(result);
        }
        else {
            res.status(404).json({message:'No valid entry found for provided ID'});
        }
    })
    .catch( (e)=>{
        res.status(500).json( {error: e} );
    });
});

//Update
app.put('/update/:jobId',(req,res)=>{
    /*if(!ObjectId.isValid(req.params.jobId))
        return res.status(400).send(`No records with given id : ${req.params.jobId}`);*/

    var id = req.params.jobId;
    var jobdetails = {
        jobTitle : req.body.jobTitle,
            jobDescription : req.body.jobDescription,
            companyName : req.body.companyName,
            jobLocation : req.body.jobLocation,
            jobField : req.body.jobField,
            employmentType : req.body.employmentType
    };
    // var jobdetails = {};
    // for (const ops of req.body){
    //     jobdetails[ops.propName] = ops.value;
    // }

    Jobs.findByIdAndUpdate(id,{ $set:jobdetails },{ new:true })
    .then( (result)=>{
        res.send(result);
    })
    .catch( (err)=>{
        console.log('Error in job update : '+JSON.stringify(err, undefined, 2));
    });
});

//Delete
app.delete('/delete/:jobId',(req,res)=>{
    /*if(!ObjectId.isValid(req.params.jobId))
        return res.status(400).send(`No records with given id : ${req.params.jobId}`);*/

    var id = req.params.jobId;
    //Jobs.remove({ _id: id})
    Jobs.findByIdAndRemove(id)
    .then( (result)=>{
        //res.status(200).json(result)
        let status = {
            deleteStatus : "success"
        }
        res.send(status);
    })
    .catch( (err)=>{
        console.log('Error in job delete : '+JSON.stringify(err, undefined, 2));
    });
});

app.get('/getjobfields', (req,res)=>{
    JobField.find().then( (data)=>{
        res.send(data);
    }, (error)=>{
        res.status(400).send("Error happened "+error);
    });
});
app.post('/savefield',(req,res)=>{
    var fieldDetails = new JobField( {
        jobField : req.body.jobField
    });
    fieldDetails.save().then( (doc)=>{
        res.send(doc);
    }, (error)=>{
        res.status(400).send(error);
    });
});
app.put('/jobfieldupdate/:jId',(req,res)=>{

    var id = req.params.jId;
    var jobfields = {
        jobField : req.body.jobField
    };

    JobField.findByIdAndUpdate(id,{ $set:jobfields },{ new:true })
    .then( (result)=>{
        res.send(result);
    })
    .catch( (err)=>{
        console.log('Error in job update : '+JSON.stringify(err, undefined, 2));
    });
});
app.delete('/deletejobfield/:jId', (req,res)=>{
    var id = req.params.jId;
    JobField.findByIdAndRemove(id).then( (res)=>{
        let status = {
            deleteStatus : "success"
        }
        res.send(status);
    })
    .catch( (err)=>{
        console.log('Error in job delete : '+JSON.stringify(err, undefined, 2));
    });
});

app.post('/register', (req,res)=>{
    
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        username:req.body.username,
        password:req.body.password
    });
    
    User.addUser(newUser, (err,user)=>{
        if(err){
            res.json({success:false,msg:"Failed to register user"});
        }
        else {
            res.json({success:true,msg:"User registered"});
        }
    })
    
});

app.listen(3000,()=>{
    console.log('Server started successfully at port 3000');
});