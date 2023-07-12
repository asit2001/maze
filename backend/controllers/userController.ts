import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import userModel, { userValidation } from "../models/userModel";
import { compare, hash } from "bcryptjs";
import { User } from "../src/type";

export async function registerUser(req: Request, res: Response) {
  let { email, password, name } = req.body as User;

  try {
    const validate = userValidation({ name, email, password });
    if (validate.error)
      return res.status(400).json({ message: validate.error.message });

    if (await userModel.exists({ email: email })) {
      return res.status(400).json({ error: "email already exist" });
    }
    let hashPassword = await hash(password, Number(process.env.HASH_ROUND));
    let user = await userModel.create({ name, email, password: hashPassword });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: "internal server error" });
  }
}

export async function userLogin(req: Request, res: Response) {
  let { number, password } = req.body;

  try {
    let user = await userModel.findOne({ number: number });
    if (!user)
      return res.status(404).json({ error: "invalid number or password" });

    let isValid = await compare(password, user.password);
    if (!isValid)
      return res.status(404).json({ error: "invalid number or password" });
    let token = sign(
      { user_id: user.id, name: user.name },
      process.env.JWT_SECRET
    );
    res.cookie("jwtToken", token, {
      sameSite: "none",
      secure: true,
    });
    res.json({ name: user.name, number });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
