
const fs = require('fs'); //파일에 접근할 수 있는 권한
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json'); //파일을 읽어올 수 있도록

const conf = JSON.parse(data);//해당환경설정 데이터를 파싱해서 가져옴

const mysql = require('mysql');



const connection = mysql.createConnection({

host: conf.host,

user: conf.user,

password: conf.password,

port: conf.port,

database: conf.database

});

connection.connect();



app.get('/api/Customers', (req, res) => {

connection.query(

'SELECT * FROM CUSTOMER',

(err, rows, fields) => {

res.send(rows);

}

)

});



app.listen(port, () => console.log(`Listening on port ${port}`));



