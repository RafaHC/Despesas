var mysql = require('mysql');
//create a connection
var connection = mysql.createConnection({
	host:'us-cdbr-iron-east-01.cleardb.net',
	user:'b7a1699b0ba87e',
	password:'40a63db8',
	database:'heroku_97cf472f3f1b796'
});


module.exports = function(){
	return connection;
}