const express = require("express");

const usersRoutes = require("./user.routes");
const vehiclesRoutes = require("./vehicle.routes");

const router = express.Router();

router.use("/user", usersRoutes);
router.use("/vehicle", vehiclesRoutes);

module.exports = router;
