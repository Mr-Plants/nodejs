var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cainiao'
})

connection.connect();

// 查询所有数据
var sql1 = 'SELECT * FROM websites';
connection.query(sql1, function (error, results, fields) {
    if (error) throw error;
    console.dir(results);
    // console.log(fields);
});
// 插入一条数据
var sql2 = 'INSERT INTO websites (Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', 23453, 'CN'];
connection.query(sql2, addSqlParams, (error, res) => {
    console.log(res)
})



connection.end();
