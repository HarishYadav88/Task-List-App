var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:admin$123@ds127506.mlab.com:27506/studentdb', ['tasks']);

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");    
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Get all task
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Post
router.post('/task', function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            'error': 'Bad Data'
        })
    } else{
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        })
    }
});

//Update single task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var taskUpdate = {
        isDone: task.isDone,
        title: task.title
    };

    if(!taskUpdate){
        res.status(400);
        res.json({
            'error': 'Bad Data'
        })
    } else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, taskUpdate, {},function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }

    
});

//Delete single task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router;