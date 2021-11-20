"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_enum_1 = require("./../users/user.role.enum");
const mongoose = require("mongoose");
exports.ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgUrl: { type: String, required: false },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sector: { type: user_role_enum_1.Sector }
});
class Product extends mongoose.Document {
}
exports.Product = Product;
module.exports = mongoose.model('Product', exports.ProductSchema);
//# sourceMappingURL=product.models.js.map