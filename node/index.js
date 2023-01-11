const express = require('express');
const app = express();
const port = 3000;

const config = {
	'host': 'db',
	'database': 'nodedb',
	'user': 'root',
	'password': 'root'
}
const mysql = require('mysql2');
const conn = mysql.createConnection(config);
const sql = `INSERT INTO people(name) values('Caco')`;
conn.query(sql);
conn.end();

app.get('/', (req, res) => {
	res.send('<h1>Hello Express</h1>');
});

app.listen(port, () => {
	console.log('Running in port ' + port);
})
