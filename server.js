
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

const multer = require('multer'); 
const upload = multer({dest: './upload'}) //사용자의 파일이 업로드가 되는 공간 설정



app.get('/api/Customers', (req, res) => {

connection.query(

    'SELECT * FROM CUSTOMER WHERE isDeleted = 0', //고객 데이터를 불러올때는 삭제되지 않은 데이터만 가져와야함

   

(err, rows, fields) => {

res.send(rows);

}

)

});


app.use('/image', express.static('./upload'));

 //업로드라는 이름의 폴더를 사용자가 직접 접근해서 확인할 수 있게 express.static으로 공유하게 해줌 사용자의 입장에서는 이미지로 업로드 하는데 우리 서버에서는 업로드로
//multer가 자동으로 이름 겹치지 않게 할당해 줌.
app.post('/api/Customers', upload.single('image'), (req, res) => {

    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?,now(),0)';
    
    let image = '/image/' + req.file.filename;
    
    let name = req.body.name;
    
    let birthday = req.body.birthday;
    
    let gender = req.body.gender;
    
    let job = req.body.job;
    
    let params = [image, name, birthday, gender, job];
    
    connection.query(sql, params,
    
    (err, rows, fields) => {
    
    res.send(rows);
    
    }
    
    )
    
    });
    
    
    app.delete('/api/customers/:id', (req, res) => {
        let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?'; //쿼리로 데이터 날림
        let params = [req.params.id]; //실제 데이터 선택 
        connection.query(sql, params,
        (err, rows, fields) => {
        res.send(rows);
        }
        )
        });
        

app.listen(port, () => console.log(`Listening on port ${port}`));



