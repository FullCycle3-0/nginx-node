const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const dbConfig = {
	'host': 'db',
	'database': 'nodedb',
	'user': 'root',
	'password': 'root'
}

const insertPeopleInDb = async(mysql, dbConfig) => {
    const conn = mysql.createConnection(dbConfig);
    let sql = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL auto_increment, name VARCHAR(255), PRIMARY KEY(id))`;
    conn.query(sql);
    sql = `INSERT INTO people (name) values ('Caco'), ('José'), ('João')`;
    result = await conn.promise().query(sql);
    conn.end();
    return result;
}

const fetchPeopleFromDb = async(mysql, dbConfig) => {
    const conn = mysql.createConnection(dbConfig);
    const sql = `SELECT name FROM people;`;
    const result = await conn.promise().query(sql);
    conn.end()
    return result[0];
}

const formatHtml = (people) => {
    let peopleHtmlList = '';
    people.forEach((person) => {
        peopleHtmlList += `<li>${person.name}</li>`;
    });
    let html = `
        <h1>Full Cycle Rocks!</h1>
        <h2>Pessoas</h2>
        <ul>
            ${peopleHtmlList}
        </ul>
        `;
    return html;
}

app.listen(port, () => {
    console.log('Running in port ' + port);
});

insertPeopleInDb(mysql, dbConfig)
    .then(() => {
        fetchPeopleFromDb(mysql, dbConfig)
            .then((people) => {
                html = formatHtml(people);
                app.get('/', (req, res) => {
                    res.send(html);
                });
            })
            .catch((err) => {
                    console.log(err);
            });
    })
    .catch((errr) => {
        console.log(err);
    });
