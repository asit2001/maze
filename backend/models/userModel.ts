import { Schema, model } from "mongoose";
import Joi from "joi";
import { User } from "../src/type";

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export function userValidation(obj:any){
  let schema = Joi.object<User>({
      name:Joi.string().min(3).required(),
      email:Joi.string().email().required(),
      password :Joi.string().required(),
  })
  return schema.validate(obj);
}
export default model("user", userSchema);
