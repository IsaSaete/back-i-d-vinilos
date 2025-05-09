export interface VinylStructure {
  _id: string;
  title: string;
  artist: string;
  country: string;
  releaseDate: Date;
  genre: string;
  format: string;
  coverImageUrl: string;
  style?: string[];
  purchasedAt?: string;
  notes?: string;
  owned: boolean;
}

export type VinylDto = Omit<VinylStructure, "_id">;

export type GetVinylsResponseBody = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};
