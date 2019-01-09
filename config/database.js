var mysql = require('mysql');
//create a connection
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'root',
	database:'login'
});


module.exports = function(){
	return connection;
}