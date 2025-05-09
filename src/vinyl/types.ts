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

export type GetVinylsResponseBody = {
  vinyls: VinylStructure[];
  vinylsTotal: number;
};
