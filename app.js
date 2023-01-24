const express = require("express");
const bodyParser = require("body-parser");
const koneksi = require("./config/database");
const app = express();
const PORT = process.env.PORT || 5000;

// log server
app.listen(PORT, () => {
  console.log(`Server berjalan pada port: ${PORT}`);
});

// setting body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// create data
app.post("/api/identitas", (req, res) => {
  // penampungan data
  const data = { ...req.body };
  const SQlquery = "INSERT INTO identitas SET ?";

  // runing query
  koneksi.query(SQlquery, data, (err, rows, field) => {
    // penampungan error
    if (err) {
      return res
        .status(500)
        .json({ massage: "gagal menginsert data", error: err });
    }

    res.status(200).json({ success: true, massage: "data berhasil di insert" });
  });
});

// reading data
app.get("/api/identitas", (req, res) => {
  const SQlquery = "SELECT * FROM identitas";

  koneksi.query(SQlquery, (err, rows, filed) => {
    if (err) {
      return res
        .status(500)
        .json({ massage: "something when wrong", error: err });
    }
    res.status(200).json({ success: true, data: rows });
  });
});

// mengupdate data
app.put("/api/identitas/:id", (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM identitas WHERE id = ?";
  const queryUpdate = "UPDATE identitas SET ? WHERE id = ? ";

  // jalankan query
  koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    // log error
    if (err) {
      return res
        .status(500)
        .json({ massage: "Data Wasn't Founded", error: err });
    }

    // if successfully
    if (rows.length) {
      // fungsi update
      koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
        // log error
        if (err) {
          return res
            .status(500)
            .json({ massage: "Failed Updated", error: err });
        }
        res.status(200).json({ massage: "Update Successfully", success: true });
      });
    } else {
      return res
        .status(404)
        .json({ massage: "Data Wasn't Found", success: false });
    }
  });
});

// delete data
app.delete("/api/identitas/:id", (req, res) => {
  const data = { ...req.body };
  const querySearch = "SELECT * FROM identitas WHERE id = ?";
  const queryDelete = "DELETE FROM identitas WHERE id = ?";
  // jalankan query search
  koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    // log error
    if (err) {
      return res.status(500).json({
        massage: "data not found",
        error: err,
      });
    }
    // jika berhasil jalankan ini
    if (rows.length) {
      // delete fungsi
      koneksi.query(queryDelete, req.params.id, (err, rows, field) => {
        //log erorr
        if (err) {
          return res.status(500).json({
            massage: "failed to delete data",
            error: err,
          });
        }
        res.status(200).json({
          massage: "data berhasil di hapus",
          success: true,
        });
      });
    } else {
      return res.status(404).json({
        massage: "data tidak ditemukan ",
        success: false,
      });
    }
  });
});
