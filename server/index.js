const express = require("express");
const path = require("path");
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

app.put("/update/:id", (req, res) => {
  console.log("start");
  let title = req.body.title;
  let content = req.body.content;
  let id = req.params.id;

  const sqlQuery = `UPDATE BOARD SET BOARD_TITLE=?, BOARD_CONTENT=? WHERE BOARD_ID = ?;`;
  db.query(sqlQuery, [title, content, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sqlQuery = `DELETE FROM BOARD WHERE BOARD_ID = ${id};`;
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error deleting post:", err);
      console.log("none server");
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    console.log("Post deleted successfully");
    console.log("none end");
    res.json({ message: "Post deleted successfully" });
  });
});

app.post("/detail", (req, res) => {
  const id = req.body.boardIdList;
  const sqlQuery = `SELECT BOARD_TITLE, BOARD_CONTENT FROM BOARD WHERE BOARD_ID=${id}`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// cr clear
app.post("/redet", (req, res) => {
  const id = req.body.id;
  const redet = req.body.redet;

  const sqlQuery = `INSERT INTO redet (redet_content, BOARD_ID) VALUES (?, ?);`;

  db.query(sqlQuery, [redet, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.post("/comment", (req, res) => {
  const id = req.body.boardIdList;
  const sqlQuery = `SELECT redet_content FROM redet WHERE BOARD_ID=${id};`;

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
