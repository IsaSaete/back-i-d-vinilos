import { Router } from "express";
import VinylController from "../controller/VinylController.js";
import Vinyl from "../model/vinyl.js";

const vinylRouter = Router();

const vinylController = new VinylController(Vinyl);

vinylRouter.get("/", vinylController.getVinylsPage);

export default vinylRouter;
