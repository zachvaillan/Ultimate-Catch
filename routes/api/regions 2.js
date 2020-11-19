const express = require("express");
const router = express.Router();
const Region = require("../../models/Region")
// ObjectID = require('mongodb').ObjectID
router.get("/test", (req, res) => res.json({ msg: "This is the posts route" }));

router.get("/", (req, res) => {
    Region
        .find()
        .then(regions => res.json(regions))
        .catch(err => res.status(400).json(err));
});


module.exports = router;
