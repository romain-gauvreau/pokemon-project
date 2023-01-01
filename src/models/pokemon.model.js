import { DataTypes, Model } from "sequelize";
import Database from "../config/database.js";
import Trainer from "./trainer.model.js";

class Pokemon extends Model {}

Pokemon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      defaultValue: "unknown",
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isChromatic: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "pokemons",
    timestamps: true,
  }
);

Pokemon.Trainer = Pokemon.belongsTo(Trainer, {
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

export default Pokemon;
