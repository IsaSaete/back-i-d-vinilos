import { Router } from "express";
import VinylController from "../controller/VinylController.js";
import Vinyl from "../model/vinyl.js";
import validateVinylId from "../../server/middleware/handleValidateId/handleValidateId.js";

const vinylRouter = Router();

const vinylController = new VinylController(Vinyl);

vinylRouter.get("/", vinylController.getVinylsPage);

vinylRouter.patch(
  "/toggle-owned/:vinylId",
  validateVinylId,
  vinylController.toggleVinylOwner,
);

export default vinylRouter;
