export interface VinylStructure {
  _id: string;
  title: string;
  artist: string;
  country: string;
  releaseYear: Date;
  genre: string;
  format: string;
  coverImageUrl: string;
  style?: string[];
  purchasedAt?: string;
  notes?: string;
  owned: boolean;
}

export type VinylDto = Omit<VinylStructure, "_id" | "releaseYear"> & {
  releaseYear: string;
};

export type GetVinylsResponseBody = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};
