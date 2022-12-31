import { DataTypes, Model } from "sequelize";
import Database from "../config/database.js";

class Trainer extends Model {}

Trainer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    login: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(150),
      defaultValue: "trainer",
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "trainers",
    timestamps: true,
  }
);

export default Trainer;
