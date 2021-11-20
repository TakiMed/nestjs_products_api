"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_role_enum_1 = require("./user.role.enum");
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: user_role_enum_1.UserRole, required: true },
    salt: { type: String },
    sector: { type: user_role_enum_1.Sector, required: true },
});
class User extends mongoose.Document {
}
exports.User = User;
module.exports = mongoose.model('User', exports.UserSchema);
//# sourceMappingURL=users.model.js.map