

 // Module dependencies


const express = require('express');
const hbs = require('hbs');
const path = require("path");
const http = require("http");
const socketIO = require('socket.io');
var app = express();

//all environments

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
var server = http.createServer(app);


var {mongoos} = require("./db/attendanceModel.js");
var {Attendance} = require("./db/attendanceModel.js");
var {event} = require("./db/attendanceModel.js");



var io = socketIO(server);

io.on('connection',(socket)=>{
  Attendance.find().then((todos)=>{
      socket.emit('allSub',todos);
        },(e)=>{
              console.log('not working')
    });
    
  socket.on('presub',(obj)=>{
       eventReg(obj,'Present');
     Attendance.findOneAndUpdate({subjectName:obj},{$inc:{present: +1}},{new:true},(err,doc)=>{
      socket.emit('updatedSubject',doc);
        if (err) {
        console.log("something went wrong");
      }
     });
    });

    socket.on('abssub',(obj)=>{
        eventReg(obj,'Absence');
       Attendance.findOneAndUpdate({subjectName:obj},{$inc:{absence: +1}},{new:true},(err,doc)=>{
        socket.emit('updatedSubject',doc);
        if (err) {
            console.log("something went wrong");
        }
       });
    });

    socket.on('addsubject',(obj)=>{
      Attendance.save().then((obj)=>{
          console.log("saved")
        },(e)=>{
          console.log('Unable to save subject');
        });
    })
});

var d = new Date();

function eventReg(obj,event1){
    var event2 = new event({
        subjectName: obj,
        event: event1,
        date: d.getDate(),
        month: d.getMonth()
    });
    event2.save().then((doc)=>{
         console.log('saved todo', doc);
        },(e)=>{
         console.log('Unable to save todo');
        });
};
//developement only

app.get('/',(req,res)=>{
	res.render('attend');
});

app.get('/fallout',(req,res)=>{
  res.render('fallout');
});


app.get('/addsubject',(req,res)=>{
  res.render('subject');
});




server.listen(3000,()=>{
	console.log("server is running on 3000 ")
});

module.exports = {server};
