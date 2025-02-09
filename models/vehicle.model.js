const { mongoose } = require("../database/mongo.conn");
const { getCurrentTimeStamp } = require("../services/common.service");
const { vehicleStatus } = require("../utils/constants.utils");

const vehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  rentalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type:String,
    required: true,
    enum: Object.keys(vehicleStatus),
    default: Object.keys(vehicleStatus)[0]
  },
  filename: {
    type: String, 
    required: false,
  },
  imageBase64: {
    type: Buffer,
    required: false,
  },
  createdBy: {
    type: String,
    required: false,
    allowNull: false,
  },
  updatedBy: {
    type: String,
    required: false,
    allowNull: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: getCurrentTimeStamp(),
  },
  updatedAt: {
    type: String,
    default: getCurrentTimeStamp(),
  }
});

vehicleSchema.pre("save", function (next) {
  this.updatedAt = getCurrentTimeStamp();
  next();
});

exports.VehicleRVMS = mongoose.model("VehicleRVMS", vehicleSchema);
