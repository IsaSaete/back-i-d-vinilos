import { Router } from "express";
import VinylController from "../controller/VinylController.js";
import Vinyl from "../model/vinyl.js";

const vinylRouter = Router();

const vinylController = new VinylController(Vinyl);

vinylRouter.get("/", vinylController.getVinylsPage);

vinylRouter.patch(
  "/add-to-collection/:vinylId",
  vinylController.addVinylToCollection,
);

export default vinylRouter;
