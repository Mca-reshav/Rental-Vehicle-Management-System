const express = require("express");
const vehiclesRoutes = express.Router();
const mw = require("../middlewares/main.mw");
const { validate, _404, role, webAuth,upload } = mw.one;
vehiclesRoutes.use(mw.global);

const vehicleController = require("../modules/vehicle.controller");
const vehicleValidator = require("../validators/vehicle.validator");
const { roleType } = require("../utils/constants.utils");

const admin = Object.keys(roleType)[0];
const user = Object.keys(roleType)[1];

const routes = [
  {
    method: "get",
    path: "/listAll",
    middlewares: [webAuth, role(user), validate(vehicleValidator.getList)],
    handler: vehicleController.listAll,
  },
  // {
  //   method: "get",
  //   path: "/list/:vehicleId",
  //   middlewares: [webAuth, role(user), validate(vehicleValidator.getList)],
  //   handler: vehicleController.list,
  // },
  {//upload.single('image'),
    method: "post",
    path: "/add",
    middlewares: [webAuth, role(admin), validate(vehicleValidator.add)],
    handler: vehicleController.add,
  },
  {
    method: "put",
    path: "/edit/:vehicleId",
    middlewares: [webAuth, role(admin), validate(vehicleValidator.edit)],
    handler: vehicleController.edit,
  },
  {
    method: "delete",
    path: "/remove/:vehicleId",
    middlewares: [webAuth, role(admin), validate(vehicleValidator.remove)],
    handler: vehicleController.remove,
  },
  {
    method: "put",
    path: "/toggleStatus",
    middlewares: [webAuth, role(admin), validate(vehicleValidator.toggle)],
    handler: vehicleController.toggleStatus,
  },
];

routes.forEach(({ method, path, middlewares, handler }) => {
  vehiclesRoutes[method](path, ...middlewares, handler);
});

vehiclesRoutes.use("**", _404);
module.exports = vehiclesRoutes;
