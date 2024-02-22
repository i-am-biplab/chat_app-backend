const express = require("express");
const router = express.Router();
const sqldb = require("../db/conn");

router.post("/", (req, res) => {
    const channel = req.body.channel;

    if (!channel) {
        return res.status(400).json({ error: "channel cannot be passed empty" });
    }
    else if (channel != "sci" && channel != "arts") {
        return res.status(400).json({ error: "channel provided does not exist" });
    }

    const fetchDataQuery = "SELECT id, username, msg FROM messages WHERE channel = ?";
    const value = [channel];
    sqldb.query(fetchDataQuery, value, (err, results) => {
        if (err) {
            console.error("Error executing MySQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json({"messages": results });
    });
});

router.post("/sendchat", (req, res) => {
    const uname = req.body.uname;
    const channel = req.body.channel;
    const msg = req.body.msg;

    if (!uname || !channel || !msg) {
        return res.status(400).json({ error: "Required fields cannot be passed empty" });
    }

    const insertProductQuery = "INSERT INTO messages (username, channel, msg) VALUES (?, ?, ?)";
    const values = [uname, channel, msg];

    sqldb.query(insertProductQuery, values, (err, results) => {
        if (err) {
            console.error("Error executing MySQL query:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(201).json({"isadded": true, "message": "Chat sent successfully" });
    });
});

module.exports = router;