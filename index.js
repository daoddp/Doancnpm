import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "QLTC",
  password: "23062004",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Staff_LobbyReception
// Staff_MainScreen

app.get("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/main", async (req, res) => {
  res.render("user/main.ejs");
});

app.get("/login", (req, res) => {
  res.render("login/login.ejs");
});

// staff thay doi quy dinh

// app.get("/", (req, res) => {
//   res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs");
// });

app.post("/thaydoiquydinh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/loaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/ca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/monan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/dichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/thamso", async (req, res) => {
  try {
    const apdungquydinhphatQuery = await db.query("SELECT giatri FROM thamso WHERE tenthamso = 'ApDungQuyDinhPhat'");
    const tiletienphatQuery = await db.query("SELECT giatri FROM thamso WHERE tenthamso = 'TileTienPhat'");
    const tiletiendatcocQuery = await db.query("SELECT giatri FROM thamso WHERE tenthamso = 'TiLeTienDatCoc'");
    const apdungquydinhphat = apdungquydinhphatQuery.rows[0].giatri;
    const tiletienphat = tiletienphatQuery.rows[0].giatri;
    const tiletiendatcoc = tiletiendatcocQuery.rows[0].giatri;
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo.ejs", { 
      tilephat: tiletienphat,
      quydinhphat: apdungquydinhphat === 1 ? true : false,
      tiletiendatcoc: tiletiendatcoc
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/themloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Them.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoaloaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Xoa.ejs", { 
      table: table.rows,
      MLS: MLS.rows 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/sualoaisanh", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM loaisanh");
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh_Sua.ejs", { 
      table: table.rows,
      MLS: MLS.rows 
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Them.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query("SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Xoa.ejs", {table: table.rows, MC: MC.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suaca", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM ca");
    const MC = await db.query("SELECT maca FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa_Sua.ejs", {table: table.rows, MC: MC.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themmonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Them.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query("SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Xoa.ejs", {table: table.rows, MMA: MMA.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suamonan", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM monan");
    const MMA = await db.query("SELECT mamonan FROM monan WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn_Sua.ejs", {table: table.rows, MMA: MMA.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themdichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Them.ejs", {table: table.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query("SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Xoa.ejs", {table: table.rows, MDV: MDV.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suadichvu", async (req, res) => {
  try {
    const table = await db.query("SELECT * FROM dichvu");
    const MDV = await db.query("SELECT madichvu FROM dichvu WHERE tinhtrang = 'Còn phục vụ'");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu_Sua.ejs", {table: table.rows, MDV: MDV.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themloaisanhngay", async (req, res) => {
  try {
    const MLS = await db.query("SELECT maloaisanh FROM loaisanh");
    const maloaisanh = req.body.maloaisanh.trim();
    const tenloaisanh = req.body.tenloaisanh.trim();
    const dongiabantoithieu = req.body.dongiabantoithieu;
    if (dongiabantoithieu < 0) {
      res.send("Đơn giá bàn tối thiểu phải là số không âm!")
    }
    else {
      const maloaisanhExists = MLS.rows.some(row => row.maloaisanh.trim() === maloaisanh);
      if (maloaisanhExists) {
        res.send("Mã loại sảnh đã tồn tại");
      } else {
          await db.query("INSERT INTO loaisanh (maloaisanh, tenloaisanh, dongiabantoithieu, tinhtrang) VALUES ($1, $2, $3, $4)", [maloaisanh, tenloaisanh, dongiabantoithieu, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM loaisanh");
          res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/xoaloaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    await db.query("UPDATE loaisanh SET tinhtrang = 'Ngưng phục vụ' WHERE maloaisanh = $1", [maloaisanh]);
    const updatedTable = await db.query("SELECT * FROM loaisanh");
    res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/sualoaisanhngay", async (req, res) => {
  try {
    const maloaisanh = req.body.maloaisanh;
    const tenloaisanh = req.body.tenloaisanh;
    const dongiabantoithieu = req.body.dongiabantoithieu;
    if (dongiabantoithieu < 0) {
      res.send("Đơn giá bàn tối thiểu phải là số không âm!");
    } else {
      await db.query("UPDATE loaisanh SET tenloaisanh = $1, dongiabantoithieu = $2 WHERE maloaisanh = $3", [tenloaisanh, dongiabantoithieu, maloaisanh]);
      const updatedTable = await db.query("SELECT * FROM loaisanh");
      res.render("staff/thaydoiquydinh/thaydoisanh/ThayDoiLoaiSanh.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/themcangay", async (req, res) => {
  try {
    const allCa = await db.query("SELECT * FROM ca");
    const allCaAvb = await db.query("SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    const maca = req.body.maca.trim();
    const tenca = req.body.tenca.trim();
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    if (giobatdau >= gioketthuc) {
      res.send("Giờ bắt đầu và giờ kết thúc không hợp lệ!");
      return;
    }
    const overlapCa = allCaAvb.rows.some(ca => (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) || (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc));
    if (overlapCa) {
      res.send("Ca mới trùng với một ca đã tồn tại!");
      return;
    }
    const macaExists = allCa.rows.some(row => row.maca.trim() === maca);
    if (macaExists) {
      res.send("Mã ca đã tồn tại");
      return;
    } 
    await db.query("INSERT INTO ca (maca, tenca, giobatdau, gioketthuc, tinhtrang) VALUES ($1, $2, $3, $4, $5)", [maca, tenca, giobatdau, gioketthuc, 'Còn phục vụ']);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/xoacangay", async (req, res) => {
  try {
    const maca = req.body.maca;
    await db.query("UPDATE ca SET tinhtrang = 'Ngưng phục vụ' WHERE maca = $1", [maca]);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suacangay", async (req, res) => {
  try {
    const allCaAvb = await db.query("SELECT * FROM ca WHERE tinhtrang = 'Còn phục vụ'");
    const maca = req.body.maca;
    const tenca = req.body.tenca;
    const giobatdau = req.body.giobatdau;
    const gioketthuc = req.body.gioketthuc;
    if (giobatdau >= gioketthuc) {
      res.send("Giờ bắt đầu và giờ kết thúc không hợp lệ!");
      return;
    }
    const overlapCa = allCaAvb.rows.some(ca => (giobatdau >= ca.giobatdau && giobatdau < ca.gioketthuc) || (gioketthuc > ca.giobatdau && gioketthuc <= ca.gioketthuc));
    if (overlapCa) {
      res.send("Ca mới trùng với một ca đã tồn tại!");
      return;
    }
    await db.query("UPDATE ca SET tenca = $1, giobatdau = $2, gioketthuc = $3 WHERE maca = $4", [tenca, giobatdau, gioketthuc, maca]);
    const updatedTable = await db.query("SELECT * FROM ca");
    res.render("staff/thaydoiquydinh/thaydoica/ThayDoiCa.ejs", { table: updatedTable.rows });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themmonanngay", async (req, res) => {
  try {
    const MMA = await db.query("SELECT mamonan FROM monan");
    const mamonan = req.body.mamonan.trim();
    const tenmonan = req.body.tenmonan.trim();
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res.send("Đơn giá món ăn phải là số không âm!")
    }
    else {
      const mamonanExists = MMA.rows.some(row => row.mamonan.trim() === mamonan);
      if (mamonanExists) {
        res.send("Mã món ăn đã tồn tại");
      } else {
          await db.query("INSERT INTO monan (mamonan, tenmonan, dongia, tinhtrang) VALUES ($1, $2, $3, $4)", [mamonan, tenmonan, dongia, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM monan");
          res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    await db.query("UPDATE monan SET tinhtrang = 'Ngưng phục vụ' WHERE mamonan = $1", [mamonan]);
    const updatedTable = await db.query("SELECT * FROM monan");
    res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suamonanngay", async (req, res) => {
  try {
    const mamonan = req.body.mamonan;
    const tenmonan = req.body.tenmonan;
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res.send("Đơn giá món ăn phải là số không âm!")
    }
    else {
      await db.query("UPDATE monan SET tenmonan = $1, dongia = $2 WHERE mamonan = $3", [tenmonan, dongia, mamonan]);
      const updatedTable = await db.query("SELECT * FROM monan");
      res.render("staff/thaydoiquydinh/thaydoimonan/ThayDoiMonAn.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/themdichvungay", async (req, res) => {
  try {
    const MDV = await db.query("SELECT madichvu FROM dichvu");
    const madichvu = req.body.madichvu.trim();
    const tendichvu = req.body.tendichvu.trim();
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res.send("Đơn giá dịch vụ phải là số không âm!")
    }
    else {
      const madichvuExists = MDV.rows.some(row => row.madichvu.trim() === madichvu);
      if (madichvuExists) {
        res.send("Mã dịch vụ đã tồn tại");
      } else {
          await db.query("INSERT INTO dichvu (madichvu, tendichvu, dongia, tinhtrang) VALUES ($1, $2, $3, $4)", [madichvu, tendichvu, dongia, 'Còn phục vụ']);

          const updatedTable = await db.query("SELECT * FROM dichvu");
          res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", { table: updatedTable.rows });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/xoadichvungay", async (req, res) => {
  try {
    const madichvu = req.body.madichvu;
    await db.query("UPDATE dichvu SET tinhtrang = 'Ngưng phục vụ' WHERE madichvu = $1", [madichvu]);
    const updatedTable = await db.query("SELECT * FROM dichvu");
    res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoiDichVu.ejs", { table: updatedTable.rows});
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/suadichvungay", async (req, res) => {
  try {
    const madichvu = req.body.madichvu;
    const tendichvu = req.body.tendichvu;
    const dongia = req.body.dongia;
    if (dongia < 0) {
      res.send("Đơn giá dịch vụ phải là số không âm!")
    }
    else {
      await db.query("UPDATE dichvu SET tendichvu = $1, dongia = $2 WHERE madichvu = $3", [tendichvu, dongia, madichvu]);
      const updatedTable = await db.query("SELECT * FROM dichvu");
      res.render("staff/thaydoiquydinh/thaydoidichvu/ThayDoidichVu.ejs", { table: updatedTable.rows });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/thaydoithamso", async (req, res) => {
  try {
    const apDungQuyDinhPhat = req.body.quydinhphat === 'true' ? 1 : 0;
    const tiLeTienPhat = parseFloat(req.body.tilephat);
    const tiLeTienDatCoc = parseFloat(req.body.tiletiendatcoc);
    if (tiLeTienPhat < 0) {
      res.send("Tỉ lệ tiền phạt phải là số không âm!")
      return;
    }
    if (tiLeTienDatCoc < 0 || tiLeTienDatCoc > 1) {
      res.send("Tỉ lệ tiền đặt cọc phải là số không âm và không lớn hơn 1!")
      return;
    }
    await db.query("UPDATE thamso SET giatri = $1 WHERE tenthamso = 'TileTienPhat'", [tiLeTienPhat]);
    await db.query("UPDATE thamso SET giatri = $1 WHERE tenthamso = 'ApDungQuyDinhPhat'", [apDungQuyDinhPhat]);
    await db.query("UPDATE thamso SET giatri = $1 WHERE tenthamso = 'TiLeTienDatCoc'", [tiLeTienDatCoc]);
    res.render("staff/thaydoiquydinh/thamso/ThayDoiThamSo_Sua.ejs");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});



// end staff thay doi quy dinh

// staff lobby

app.post("/updatelobby", async (req, res) => {
  res.render("staff/lobby/updatelobby.ejs");
});

app.post("/deletelobby", async (req, res) => {
  res.render("staff/lobby/deletelobby.ejs");
});

app.post("/createlobby", async (req, res) => {
  res.render("staff/lobby/createlobby.ejs");
});

app.post("/xacnhanxoasanh", async (req, res) => {
  res.render("staff/lobby/deletelobbydone.ejs");
});

// end staff lobby

// staff
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
          name: user.username,
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

  res.render("login/login.ejs");
});

app.post("/signup", (req, res) => {
  res.render("login/signup.ejs");
});

app.post("/tiepnhansanh", (req, res) => {
  res.render("staff/lobby/lobby.ejs");
});

app.post("/tracuu", (req, res) => {
  res.render("staff/tracuu/Staff_LookUp.ejs");
});

app.post("/lapbaocao", (req, res) => {
  res.render("staff/baocao/Staff_MonthlyReport.ejs");
});

let table_data = [
  {
    code: "HD01",
    order_number: "P001",
    lobby: "Bạch Kim I",
    booking_date: "10/3/2024",
    eating_date: "20/4/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD02",
    order_number: "P002",
    lobby: "Bạch Kim II",
    booking_date: "15/3/2024",
    eating_date: "22/4/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD03",
    order_number: "P003",
    lobby: "Bạch Kim III",
    booking_date: "10/4/2024",
    eating_date: "24/4/2024",
    status: "Đã thanh toán",
  },
  {
    code: "HD04",
    order_number: "P004",
    lobby: "Tinh Anh I",
    booking_date: "29/4/2024",
    eating_date: "15/5/2024",
    status: "Chưa thanh toán",
  },
  {
    code: "HD05",
    order_number: "P005",
    lobby: "Ruby I",
    booking_date: "10/5/2024",
    eating_date: "1/6/2024",
    status: "Đã thanh toán",
  },
];
app.post("/laphoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill.ejs", {
    table_data: table_data,
  });
});

app.post("/chitiethoadon", (req, res) => {
  res.render("staff/hoadon/Staff_ListBill_Unpaid.ejs", {
    table_data: table_data,
  });
});

app.post("/thongtin", (req, res) => {
  res.render("staff/staffinfo.ejs");
});

app.post("/adminmain", async (req, res) => {
  res.render("admin/main.ejs");
});

app.post("/deleteuser", async (req, res) => {
  res.render("admin/deleteuser.ejs");
});

app.post("/deleteuserdone", async (req, res) => {
  res.render("admin/deleteuserdone.ejs");
});

app.post("/updateuser", async (req, res) => {
  res.render("admin/updateuser.ejs");
});

app.post("/createuser", async (req, res) => {
  res.render("admin/createuser.ejs");
});

// user

app.post("/userinfo", async (req, res) => {
  res.render("user/main.ejs");
});

app.post("/dattiec", async (req, res) => {
  res.render("user/dattiec/dattiec.ejs");
});

app.post("/userthemmonan", async (req, res) => {
  res.render("user/dattiec/themmonan.ejs");
});

app.post("/userthemdichvu", async (req, res) => {
  res.render("user/dattiec/themdichvu.ejs");
});

app.post("/usertracuu", async (req, res) => {
  res.render("user/tracuu/UserLookUp.ejs");
});

app.post("/logout", async (req, res) => {
  res.render("login/login.ejs");
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
