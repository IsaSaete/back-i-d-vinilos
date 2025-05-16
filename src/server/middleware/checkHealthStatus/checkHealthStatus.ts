import { Request, Response } from "express";
import statusCodes from "../../../globals/statusCode.js";

const checkHealthStatus = (_req: Request, res: Response): void => {
  res.status(statusCodes.OK).json({ message: "pong" });
};

export default checkHealthStatus;
