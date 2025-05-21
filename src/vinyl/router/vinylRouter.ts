import { Router } from "express";
import VinylController from "../controller/VinylController.js";
import Vinyl from "../model/vinyl.js";
import validateVinylId from "../../server/middleware/handleValidateId/handleValidateId.js";

const vinylRouter = Router();

const vinylController = new VinylController(Vinyl);

vinylRouter.get("/", vinylController.getVinylsPage);

vinylRouter.get("/:vinylId", validateVinylId, vinylController.getVinylById);

vinylRouter.patch(
  "/toggle-owned/:vinylId",
  validateVinylId,
  vinylController.toggleVinylOwner,
);

vinylRouter.delete("/:vinylId", validateVinylId, vinylController.deleteVinyl);

vinylRouter.post("/", vinylController.addVinyl);

export default vinylRouter;
