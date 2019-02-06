var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Attendance',{useNewUrlParser: true});

mongoose.connection.once('open',()=>{
	console.log("connection is sucess");
}).on('error',()=>{
	console.log("connecction error");
});

var Attendance = mongoose.model('Attendance',{
	subjectName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	present: {
		type: Number,
		default: 0
	},
	absence: {
		type: Number,
		default: 0
	},
});

var event = mongoose.model('Event',{
	subjectName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	event: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	date: {
		type: Number,
		required: true
	},
	month: {
		type: Number,
		required: true,
	}
});


module.exports = {
	mongoose,
	Attendance,
	event
};
