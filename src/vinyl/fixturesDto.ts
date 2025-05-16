import { VinylDto } from "./types.js";

export const silentShout: VinylDto = {
  title: "Silent Shout",
  artist: "The Knife",
  country: "Sweden",
  releaseDate: new Date("2006-09-01"),
  genre: "Electro",
  format: "12''",
  coverImageUrl: "https://example.com/silent-shout.jpg",
  styles: ["Synth-pop", "Darkwave"],
  purchasedAt: "Amoeba Music, LA",
  notes:
    "Este álbum marcó un giro oscuro y experimental en el dúo sueco, alejándose de lo pop. ",
  isOwned: true,
};

export const mentalGroove: VinylDto = {
  title: "Mental Groove Classics",
  artist: "Various Artists",
  country: "Switzerland",
  releaseDate: new Date("1998-04-06"),
  genre: "Techno",
  format: "12''",
  coverImageUrl: "https://example.com/mental-groove.jpg",
  styles: ["Dub Techno", "Ambient Techno"],
  purchasedAt: "Mental Groove Records, Ginebra",
  notes:
    "Una recopilación de rarezas y joyas techno suizo que muestra la diversidad y profundidad de la escena.",
  isOwned: true,
};

export const mutant: VinylDto = {
  title: "Mutant",
  artist: "Arca",
  country: "Venezuela",
  releaseDate: new Date("2015-01-06"),
  genre: "Experimental Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/mutant-arca.jpg",
  styles: ["Avant-Garde", "Deconstructed Club"],
  notes:
    "Sus sonidos rotos y atmósferas inestables lo han consolidado como una figura clave del nuevo sonido latino experimental.",
  isOwned: true,
};
