var mysql = require('mysql');
let urlBd = process.env.CLEARDB_DATABASE_URL;
let user = urlBd.substring(8,22);
let password = urlBd.substring(23,31);
//create a connection
var connection = mysql.createConnection({
	host:'us-cdbr-iron-east-01.cleardb.net',
	user: user,
	password: password,
	database:'heroku_97cf472f3f1b796'
});


module.exports = function(){
	return connection;
}