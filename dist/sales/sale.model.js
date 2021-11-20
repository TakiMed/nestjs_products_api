"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_enum_1 = require("./../users/user.role.enum");
const mongoose = require("mongoose");
exports.SaleSchema = new mongoose.Schema({
    productId: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    sector: { type: user_role_enum_1.Sector },
    date: { type: Date }
});
class Sale extends mongoose.Document {
}
exports.Sale = Sale;
module.exports = mongoose.model('Sale', exports.SaleSchema);
//# sourceMappingURL=sale.model.js.map