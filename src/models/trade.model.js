import { DataTypes, Model } from "sequelize";
import Database from "../config/database.js";
import Trainer from "./trainer.model.js";
import Pokemon from "./pokemon.model.js";

class Trade extends Model {}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    sequelize: Database,
    modelName: "trades",
    timestamps: true,
  }
);

Trade.belongsTo(Trainer, {
  foreignKey: "sellerId",
  as: "seller",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});
Trade.belongsTo(Trainer, {
  foreignKey: "buyerId",
  as: "buyer",
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

Trade.Pokemon = Trade.belongsTo(Pokemon, {
  onDelete: "NO ACTION",
  onUpdate: "CASCADE",
});

export default Trade;
