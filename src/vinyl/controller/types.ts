import { NextFunction, Request, Response } from "express";
import { VinylData, VinylStructure } from "../types.js";

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
  getVinylById: (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ) => Promise<void>;
  updateVinyl: (
    req: VinylRequest,
    res: VinylResponse,
    next: NextFunction,
  ) => Promise<void>;
}

export type VinylQuery = { page: string };

export type VinylParams = { vinylId: string };

export type VinylBody = { vinyl: VinylStructure };

export type VinylRequest = Request<
  VinylParams,
  Record<string, unknown>,
  VinylBody,
  VinylQuery
>;

export type VinylsResponse = Response<VinylsBodyResponse>;

export type VinylResponse = Response<VinylBodyResponse>;

export type NewVinylBody = { vinyl: VinylData };

export type NewVinylRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  NewVinylBody,
  Record<string, unknown>
>;

export type VinylBodyResponse = {
  vinyl: VinylStructure;
};

export type VinylsBodyResponse = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};

export type ValidateIdRequest = Request<
  VinylParams,
  Record<string, unknown>,
  Record<string, unknown>,
  Record<string, unknown>
>;
