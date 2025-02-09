const { generateVehicleID } = require("../services/common.service");
const {
  find,
  create,
  pagination,
  deleteOne,
  updateOne,
  findOne
} = require("../services/mongo.service");
const { error, log } = require("../services/response.service");
const { vehicle, user } = require("../utils/messages.utils");
const { roleType, vehicleStatus } = require("../utils/constants.utils");
const encryptService = require('../services/encrypt.service');
const moment = require('moment');

exports.add = async (req, res) => {
  try {
    const vehicleId = generateVehicleID();
    const { name, model } = req.body;
    const isExist = await find({
      model: "VehicleRVMS",
      query: { name: name, model: model },
      attributes: ["vehicleId"],
    });
    if (isExist[0]?.vehicleId)
      return res.json(log(false, vehicle.ALREADY_EXIST));

    const insertNew = await create({
      model: "VehicleRVMS",
      data: {
        vehicleId: vehicleId,
        ...req.body,
        filename: req.file?.originalname ||'',
        imageBase64: req.file?.buffer || '',
        createdBy: req.user?.userId,
      },
    });
    if (!insertNew) return res.json(log(false, vehicle.ADD_ERROR));
    return res.json(log(true, vehicle.ADD_SUCCESS));
  } catch (err) {
    error(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const vehicleId = req.params?.vehicleId;
    const isExist = await find({
      model: "VehicleRVMS",
      query: {vehicleId: vehicleId},
      attributes: ["name"]
    });
    if (!isExist[0]?.name) return res.json(log(false, vehicle.REMOVE_ERROR));

    const removeProduct = await deleteOne({
      model: "VehicleRVMS",
      query: { vehicleId: vehicleId}
    });
    if (removeProduct?.deletedCount == 1) return res.json(log(true, vehicle.REMOVE_SUCCESS));
    return res.json(log(false, user.FAILED));
  } catch (err) {
    error(err)
  }
};

exports.edit = async (req, res) => {
  try {
    const vehicleId = req.params?.vehicleId;
    const isExist = await find({
      model: "VehicleRVMS",
      query: {vehicleId: vehicleId},
      attributes: ["name"]
    });
    if (!isExist[0]?.name) return res.json(log(false, vehicle.EDIT_ERROR));    
    const updateProduct = await updateOne({
      model: "VehicleRVMS",
      query: { vehicleId: vehicleId},
      data: {...req.body}
    });
    if (updateProduct) return res.json(log(true, vehicle.EDIT_SUCCESS));
    return res.json(log(false, user.FAILED));
  } catch (err) {
    error(err)
  }
};

exports.listAll = async (req, res) => {
  try {
    const { searchText, page, limit,search, sortField, sortOrder } = req.query;
    const isAdmin = req.user.role == Object.keys(roleType)[0];
    let conditionalAttributes = ["vehicleId", "model", "name", "rentalPrice", "status","imageBase64"];
    if (isAdmin) conditionalAttributes.push("createdBy", "createdAt");

    const getData = await pagination({
      model: "VehicleRVMS",
      query: isAdmin,
      attributes: conditionalAttributes,
      sort: [sortField],
      searchFields: ["model", "name", "vehicleId"],
      defaultSort: ["createdAt"],
      searchText: searchText || search || "",
      page: page,
      limit: limit,
      excludeAttribute: ["_id"],
    });
    
    if (!getData) return res.json(log(false, vehicle.LIST_ALL_ERROR));
    return res.json(log(true, vehicle.LIST_ALL_SUCCESS, getData));
  } catch (err) {
    error(err);
  }
};

exports.toggleStatus = async (req, res) => {
  try {
    const adminId = req.user.userId;
    const { password, vehicleId } = req.body;

    const isExist = await findOne({
      model: "UserRVMS",
      query: { userId: adminId },
      attributes: ["password"],
    });

    if (!isExist?.password) return res.json(log(false, user.FAILED));
    const checkPwd = await encryptService.comparePassword(
      password,
      isExist.password
    );
    if (!checkPwd) return res.json(log(false, user.WRONG_PASSWORD));

    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getStatus = await findOne({
      model: "VehicleRVMS",
      query: { vehicleId: String(vehicleId).trim() },
      attributes: ["status"],
    });

    if (!getStatus?.status) return res.json(log(false, vehicle.NOT_FOUND));

    const toggleData = await updateOne({
      model: "VehicleRVMS",
      query: { vehicleId: String(vehicleId).trim() },
      data: {
        updatedAt: current,
        status: getStatus.status == Object.keys(vehicleStatus)[0]
          ? Object.keys(vehicleStatus)[1]
          : Object.keys(vehicleStatus)[0],
      },
    });

    if (toggleData) return res.json(log(true, vehicle.TOGGLE_STATUS));
    return res.json(log(false, vehicle.TOGGLE_FAILED));
  } catch (err) {
    error(err);
  }
};