import { Router } from "express";
import { addProfile,getProfile} from "../controllers/profileController";
import { auth } from "../middleware/authMiddleware";

const profileRouter = Router();
profileRouter.get("/",auth, getProfile);
profileRouter.post("/",auth,addProfile);
export default profileRouter;