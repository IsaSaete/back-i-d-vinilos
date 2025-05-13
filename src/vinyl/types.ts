export interface VinylStructure {
  _id: string;
  title: string;
  artist: string;
  country: string;
  releaseDate: Date;
  genre: string;
  format: string;
  coverImageUrl: string;
  styles?: string[];
  purchasedAt?: string;
  notes?: string;
  isOwned: boolean;
}

export type VinylDto = Omit<VinylStructure, "_id">;

export interface GetVinylsResponseBody {
  vinyls: VinylStructure[];
  vinylsTotal: number;
}

export interface ResponseBodyVinyl {
  vinyl: VinylStructure;
}

export interface ResponsBodyError {
  error: string;
}
