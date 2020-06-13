import { UserRole, Sector } from './user.role.enum';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: UserRole, required: true },
  salt: { type: String },
  sector: { type: Sector, required: true },
  /*products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
      }]*/
});

export class User extends mongoose.Document {
  _id: string;

  username: string;

  password: string;

  role: UserRole;

  salt: string;

  sector: Sector;
}

module.exports  =  mongoose.model('User', UserSchema);
