import {Request,Response} from "express";
import profileModel,{profileValidation} from "../models/profileModel";
import { userProfile } from "../src/type";

export  async function getProfile(req:Request,res:Response) {
    try {
        const profiles = await profileModel.find({});
        res.json(profiles)
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }

}
export  async function addProfile(req:Request,res:Response) {
    try {
        const {email,github,name,profession,twitter} = req.body as userProfile
        const validation = profileValidation({email,github,name,profession,twitter});
        if (validation.error) {
            return res.status(400).json({error:validation.error.message})
        }

        const profiles = await profileModel.create({email,github,name,profession,twitter});
        res.status(201).json(profiles)
    } catch (error) {
        res.status(500).json({error:"internal server error"});
    }

}