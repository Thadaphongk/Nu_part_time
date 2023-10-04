const express = require('express');
const server = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const PORT = 3000;

// ตั้งค่า Session สำหรับระบบ
server.use(expressSession({
    secret: 'NYTHEKEN.com',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// ตั้งค่าการ Parse ตัวแปรเมื่อ Client ส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false,limit: '950MB' }));
server.use(bodyParser.json({limit: '950MB'}));


// Allow content
server.use('/api/uploads', express.static(`${__dirname}/uploads/jobs`));
server.use('/api/uploads', express.static(`${__dirname}/uploads/jobss`));
server.use('/api/uploads', express.static(`${__dirname}/uploads/apply`));
// สร้าง Custom function
server.use(require('./configs/middleware'));
// เรียกใช้งาน routes
server.use('/api',require('./routes'));

server.get('*', (req, res) => {
    res.end(`<h1>Backend server is startd.</h1>`);
});

server.listen(PORT, () => console.log(`Server is started, Port ${PORT}.`))


