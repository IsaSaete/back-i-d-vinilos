import { Request, Response } from "express";

export interface VinylControllerStructure {
  getVinylsPage: (req: VinylRequest, res: Response) => Promise<void>;
}

export type VinylQuery = { page: string };

export type VinylParams = { vinylId: string };

export type VinylRequest = Request<
  VinylParams,
  Record<string, unknown>,
  Record<string, unknown>,
  VinylQuery
>;
