import express from "express";
import { profile } from "../controllers/profile.controller.js";

const profileRouter = express.Router();

profileRouter.get("/:username", profile);

export default profileRouter;
