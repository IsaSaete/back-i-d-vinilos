import { model, Schema } from "mongoose";
import { VinylStructure } from "../types.js";

const vinylSchema = new Schema<VinylStructure>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  country: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  format: { type: String, enum: ['12"', '7"'], required: true },
  coverImageUrl: { type: String, required: true },
  style: { type: [String], maxlength: 3 },
  purchasedAt: { type: String },
  notes: { type: String },
  owned: { type: Boolean, default: false },
});

const Vinyl = model("Vinyl", vinylSchema, "vinilos");

export default Vinyl;
