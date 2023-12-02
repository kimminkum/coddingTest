const express = require("express");
var cors = require("cors");
const mysql = require("mysql"); // mysql 모듈 로드
const app = express();
const ports = 3000;
//ing new database2 ingdddd my sql ing
app.use(cors());

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.get("/dog", function(req, res) {
  res.send("<h1>강아지</h1>");
});

app.get("/cat", function(req, res) {
  res.json({ 고양이: "야옹" });
});

app.get("/sound/:name", (req, res) => {
  // const p = req.params; > const { name } = req.params; 앞것보다 이렇게 쓰는게 더 좋다.
  // 이렇게 쓰는 이유는 req.params가  {name = dog}{name:dog} 이런식으로 값이 들어오니까 바로 name에 할당된다.
  // const p 처럼 하면 p.name 이런식으로 사용해야 해서 코드가 좀 더 길어진다. name 키값
  const { name } = req.params;
  console.log(name);

  if (name == "dog") {
    res.json({ sound: "멍멍" });
  } else if (name == "cat") {
    res.json({ sound: "야옹" });
  } else if (name == "pig") {
    res.json({ sound: "꿀꿀" });
  } else {
    res.json({ sound: " 알수없음" });
  }
});

// get: params, query
app.get("/user/:id", function(req, res) {
  const b = req.params;
  console.log(b);
  console.log(b.id);

  const q = req.query;
  console.log(q);
  console.log(q.q);
  console.log(q.name);
  console.log(q.age);

  res.json({ userid: b.id });
});

// post: params, body
app.use(express.json());
app.post("/user/:id", (req, res) => {
  const b = req.params;
  console.log(b);
  const q = req.body;
  console.log(q);

  res.send({ message: "Hello World!" });
});

app.listen(ports, () => {
  console.log(`Example app listening on port ${port}`);
});

const conn = {
  // mysql 접속 설정
  host: "127.0.0.1",
  port: ports,
  user: "root",
  password: "mysql 워크벤치 설치할때 설정한 비밀번호",
  database: "test"
};

let connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect(); // DB 접속

let sql =
  "INSERT INTO `members` (`username`,`password`) VALUES ('test','test');";

connection.query(sql, function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

sql = "SELECT * FROM MEMBERS";

connection.query(sql, function(err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end(); // DB 접속 종료
