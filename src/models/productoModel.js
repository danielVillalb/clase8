const mongoose = require("mongoose");

require("dotenv").config();

const ProductoSchema = new mongoose.Schema(
  {
    nombre: String,
    precio: String,
  },
  { collection: "productos" }
);

const Producto = mongoose.model("Producto", ProductoSchema);

module.exports = Producto;
