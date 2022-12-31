import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
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
    birthdate: {
      type: DataTypes.DATE,
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

Trainer.beforeCreate(async (trainer, options) => {
  trainer.password = await bcrypt.hash(trainer.password, 8);
});

export default Trainer;
