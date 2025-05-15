import { NextFunction, Request, Response } from "express";
import { VinylStructure } from "../types.js";

export interface VinylControllerStructure {
  getVinylsPage: (req: VinylRequest, res: VinylResponse) => Promise<void>;

  toggleVinylOwner: (
    req: VinylRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

  deleteVinyl: (
    req: VinylRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
}

export type VinylQuery = { page: string };

export type VinylParams = { vinylId: string };

export type VinylRequest = Request<
  VinylParams,
  Record<string, unknown>,
  Record<string, unknown>,
  VinylQuery
>;

export type VinylBodyResponse = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};

export type VinylResponse = Response<VinylBodyResponse>;
