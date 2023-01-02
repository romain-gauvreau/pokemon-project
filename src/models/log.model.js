import { DataTypes, Model } from "sequelize";
import Database from "../config/database.js";

class Log extends Model {}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    responseTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "logs",
    timestamps: false,
  }
);
export default Log;
