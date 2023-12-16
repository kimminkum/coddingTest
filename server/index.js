const express = require("express");
const app = express();
const mysql = require("mysql");
const PORT = process.env.port || 8000;
const cors = require("cors");
const bodyParser = require("body-parser");

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "kmk1234",
  database: "bbs"
});

app.get("/", (req, res) => {
  const sqlQuery = `SELECT * FROM BOARD;`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});
app.get("/list", (req, res) => {
  const sqlQuery =
    "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, REGISTER_DATETIME FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/insert", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;

  const sqlQuery = `INSERT INTO BOARD (BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?, ?, 'happyDay');`;
  db.query(sqlQuery, [title, content], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/update", (req, res) => {
  let title = req.body.title;
  let content = req.body.content;
  let id = req.body.id;

  const sqlQuery = `UPDATE BOARD SET BOARD_TITLE=?, BOARD_CONTENT=? WHERE BOARD_ID = ${id};`;
  db.query(sqlQuery, [title, content], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/delete", (req, res) => {
  const id = req.body.boardIdList;

  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID IN (${id});`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/detail", (req, res) => {
  const id = req.body.id;
  const sqlQuery = `SELECT BOARD_ID, BOARD_TITLE, BOARD_CONTENT FROM BOARD WHERE BOARD_ID=${id}`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
