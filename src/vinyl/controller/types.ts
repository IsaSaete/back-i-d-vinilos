import { NextFunction, Request, Response } from "express";
import { Vinyl, VinylStructure } from "../types.js";

export interface VinylControllerStructure {
  getVinylsPage: (req: VinylRequest, res: VinylsResponse) => Promise<void>;
  toggleVinylOwner: (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ) => Promise<void>;
  deleteVinyl: (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ) => Promise<void>;
  addVinyl: (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type VinylQuery = { page: string };

export type VinylParams = { vinylId: string };

export type VinylBody = { vinyl: Vinyl };

export type VinylRequest = Request<
  VinylParams,
  Record<string, unknown>,
  VinylBody,
  VinylQuery
>;

export type VinylsResponse = Response<VinylsBodyResponse>;

export type VinylResponse = Response<VinylBodyResponse>;

export type VinylBodyResponse = {
  vinyl: VinylStructure;
};

export type VinylsBodyResponse = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};
