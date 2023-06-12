const express = require("express");
const user = require("../../models/user");
let router = express.Router();
router.post("/api/users", async function (req, res) {
  let record = new user(req.body);
  await record.save();
  res.send(record);
});

router.put("/api/users/:id", async function (req, res) {
  //   return res.send(req.body);
  let record = await user.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(record);
});
router.delete("/api/users/:id", async function (req, res) {
  let record = await user.findByIdAndDelete(req.params.id);
  res.send("Done");
});
router.get("/api/users/:id", async function (req, res) {
  let record = await user.findById(req.params.id);
  res.send(record);
});
router.get("/api/users", async function (req, res) {
  let records = await user.find();
  res.send(records);
});

module.exports = router;