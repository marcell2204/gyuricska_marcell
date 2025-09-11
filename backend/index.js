const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
app.use(cors());              

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3307,
    database:"kozutak"
}); 

app.get("/", (req, res) => {
    res.send("Fut a backend!");
})
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.get("/regiok", (req, res) => {
    const sql = "SELECT * FROM `regiok`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  

app.get("/gregiok", (req, res) => {
    const sql = "SELECT * FROM `regiok` WHERE regionev LIKE '%g%'";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  
app.get("/sorrend", (req, res) => {
    const sql = "SELECT regionev FROM `regiok` GROUP BY regionev DESC";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  

app.get("/hossz", (req, res) => {
    const sql = "SELECT MAX(hossz) FROM `kozutak_hossza`";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})  

app.delete("/torles", (req,res) =>{
    const sql = "DELETE FROM `regiok` WHERE RID = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if(err) return res.json(err);
        return res.json(result)
    })
});