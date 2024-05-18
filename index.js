import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "newdb",
  password: "sql123",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("login/signup.ejs");
});

app.get("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.get("/login", (req, res) => {
  res.render("login/login.ejs");
});

// user/main.ejs
// staff/Staff_MainScreen.ejs

app.post("/login", (req, res) => {
  res.render("login/login.ejs");
});

app.post("/dologin", async (req, res) => {
  const username = req.body.username;
  const matkhau = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const dbpassword = user.matkhau;
      if (matkhau === dbpassword) {
        res.render("user/main.ejs", {
          username: user.username,
          email: user.email,
          hovaten: user.hovaten,
          sdt: user.sodienthoai,
        });
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/confirmchange", (req, res) => {
  res.render("user/confirmchange.ejs");
});

app.post("/dosignup", async (req, res) => {
  const hovaten = req.body.hovaten;
  const username = req.body.username;
  const email = req.body.email;
  const matkhau = req.body.matkhau;
  const sodienthoai = req.body.sodienthoai;

  const result = await db.query(
    "INSERT INTO users (username, hovaten, email, matkhau, sodienthoai) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [username, hovaten, email, matkhau, sodienthoai]
  );

  res.redirect("/login");
});

app.post("/signup", (req, res) => {
  res.render("login/signup.ejs");
});

app.post("/tiepnhansanh", (req, res) => {
  res.render("staff/lobby.ejs");
});

app.post("/thongtin", (req, res) => {
  res.render("staff/thongtin.ejs");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
