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
