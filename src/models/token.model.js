import { DataTypes, Model } from "sequelize";
import Database from "../config/database.js";
import Trainer from "./trainer.model.js";

class Token extends Model {}

Token.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "tokens",
    timestamps: true,
  }
);

Token.Trainer = Token.belongsTo(Trainer);

export default Token;
