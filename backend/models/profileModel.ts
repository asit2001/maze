import { Schema, model } from "mongoose";
import Joi from "joi";
import { userProfile } from "../src/type";

const ProfileSchema = new Schema<userProfile>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  profession:{
    type:String,
    required:true
  },
  twitter:{
    type:String,
    required:true
  }
});

export function profileValidation(obj:any){
  let schema = Joi.object<userProfile>({
      name:Joi.string().min(3).required(),
      email:Joi.string().email().required(),
      github :Joi.string().uri().required(),
      twitter :Joi.string().uri().required(),
      profession :Joi.string().required(),
  })
  return schema.validate(obj);
}
export default model("profile", ProfileSchema);
