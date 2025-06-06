import { VinylData, VinylStructure } from "./types.js";

export const strangeWeather: VinylStructure = {
  _id: "a3f9d7c2e5b8147ad09c3e1f",
  title: "Strange Weather, Isn't It?",
  artist: "!!! (Chk Chk Chk)",
  country: "USA",
  releaseDate: new Date("2010-08-23"),
  genre: "Dance-punk",
  format: "12''",
  coverImageUrl: "https://example.com/strange-weather.jpg",
  styles: ["Indie Dance", "Alternative Dance"],
  purchasedAt: "Rough Trade NYC",
  notes:
    "El álbum fue grabado en Berlín y se inspira en la escena club local. La banda incorpora elementos de punk con estructuras bailables, ofreciendo una experiencia que difiere de los cánones típicos del rock alternativo estadounidense. La crítica lo recibió con opiniones mixtas, pero se volvió un favorito en pistas de baile alternativas.",
  isOwned: true,
};

export const lp5: VinylStructure = {
  _id: "c8e4f2a7b93d01e7a6c5d319",
  title: "LP5",
  artist: "Apparat",
  country: "Germany",
  releaseDate: new Date("2019-03-22"),
  genre: "Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/apparat-lp5.jpg",
  styles: ["Ambient", "Techno", "Experimental"],
  notes:
    "Apparat explora una atmósfera introspectiva donde los sintetizadores se mezclan con cuerdas clásicas. Es un disco que requiere una escucha atenta y revela matices emocionales en cada reproducción.",
  isOwned: false,
};

export const spiritOfEden: VinylStructure = {
  _id: "1d3a8c7e9b04f6c2e718a4b5",
  title: "Spirit of Eden",
  artist: "Talk Talk",
  country: "UK",
  releaseDate: new Date("1988-09-12"),
  genre: "Post-rock",
  format: "12''",
  coverImageUrl: "https://example.com/spirit-of-eden.jpg",
  styles: ["Art Rock", "Experimental"],
  purchasedAt: "Discogs",
  notes:
    "Considerado precursor del post-rock, este disco marcó una ruptura con el pop comercial. La banda optó por la improvisación y la grabación analógica, creando un sonido orgánico, profundo y complejo que desafía las estructuras convencionales.",
  isOwned: true,
};

export const newSpiritOfEden: VinylStructure = {
  _id: "1d3a8c7e9b04f6c2e718a4b5",
  title: "Spirit of Eden",
  artist: "Talk Talk",
  country: "UK",
  releaseDate: new Date("1988-09-12"),
  genre: "Post-rock",
  format: "12''",
  coverImageUrl: "https://example.com/spirit-of-eden.jpg",
  styles: ["Art Rock", "Experimental"],
  purchasedAt: "Discogs",
  notes:
    "El sonido experimental y la negativa por parte de Mark Hollis para promocionar el material, causó conflictos legales entre la banda y su sello discográfico EMI.",
  isOwned: true,
};

export const inColour: VinylStructure = {
  _id: "f7b13e4c8a6d9c05e3b7218a",
  title: "In Colour",
  artist: "Jamie xx",
  country: "UK",
  releaseDate: new Date("2015-05-29"),
  genre: "Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/in-colour.jpg",
  styles: ["UK Garage", "Future Bass"],
  isOwned: true,
};

export const inColourNotOwned: VinylStructure = {
  _id: "f7b13e4c8a6d9c05e3b7218a",
  title: "In Colour",
  artist: "Jamie xx",
  country: "UK",
  releaseDate: new Date("2015-05-29"),
  genre: "Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/in-colour.jpg",
  styles: ["UK Garage", "Future Bass"],
  isOwned: false,
};

export const fromDeewee: VinylStructure = {
  _id: "2c9e7d4f1a8b03c6d4e17f39",
  title: "From Deewee",
  artist: "Soulwax",
  country: "Belgium",
  releaseDate: new Date("2017-03-24"),
  genre: "Electro Rock",
  format: "12''",
  coverImageUrl: "https://example.com/from-deewee.jpg",
  styles: ["Synth-pop", "Techno Rock"],
  purchasedAt: "Vinyl Dreams, San Francisco",
  isOwned: true,
};

export const fromDeeweeNotOwned: VinylStructure = {
  _id: "2c9e7d4f1a8b03c6d4e17f39",
  title: "From Deewee",
  artist: "Soulwax",
  country: "Belgium",
  releaseDate: new Date("2017-03-24"),
  genre: "Electro Rock",
  format: "12''",
  coverImageUrl: "https://example.com/from-deewee.jpg",
  styles: ["Synth-pop", "Techno Rock"],
  purchasedAt: "Vinyl Dreams, San Francisco",
  isOwned: false,
};

export const minimalNation: VinylStructure = {
  _id: "b04f6a3d9e7c2f81c5a7931e",
  title: "Minimal Nation",
  artist: "Robert Hood",
  country: "USA",
  releaseDate: new Date("1994-05-01"),
  genre: "Techno",
  format: "12''",
  coverImageUrl: "https://example.com/minimal-nation.jpg",
  styles: ["Minimal Techno"],
  notes:
    "Un pilar del techno de Detroit, 'Minimal Nation' cambió el paradigma al demostrar que menos puede ser más. Robert Hood eliminó adornos superfluos y se centró en pulsos repetitivos, dando paso a un nuevo lenguaje sonoro.",
  isOwned: true,
};

export const hissingOfSummerLawns: VinylStructure = {
  _id: "d13a6f2e4b8c09a7f3e51c7d",
  title: "The Hissing of Summer Lawns",
  artist: "Joni Mitchell",
  country: "Canada",
  releaseDate: new Date("1975-11-01"),
  genre: "Jazz Fusion",
  format: "12''",
  coverImageUrl: "https://example.com/joni-hissing.jpg",
  styles: ["Art Pop", "Folk Jazz"],
  isOwned: false,
};

export const rispah: VinylStructure = {
  _id: "9f8d7b3a2e4c1f06a7c395e1",
  title: "Rispah",
  artist: "The Invisible",
  country: "UK",
  releaseDate: new Date("2012-06-11"),
  genre: "Alternative",
  format: "12''",
  coverImageUrl: "https://example.com/rispah.jpg",
  styles: ["Electronic Soul", "Ambient Rock"],
  notes:
    "Inspirado en el duelo personal del vocalista, este álbum mezcla sonidos espirituales con atmósferas densas. Fue producido por Richard File (ex-UNKLE), y destaca por sus capas sutiles de sintetizadores y percusiones africanas.",
  isOwned: true,
};

export const innocenceAndDecadence: VinylStructure = {
  _id: "e7c13a9d5b0f2c48a193e6b0",
  title: "Innocence & Decadence",
  artist: "Graveyard",
  country: "Sweden",
  releaseDate: new Date("2015-09-25"),
  genre: "Psychedelic Rock",
  format: "7''",
  coverImageUrl: "https://example.com/graveyard.jpg",
  styles: ["Hard Rock", "Blues Rock"],
  purchasedAt: "Festival de Roskilde",
  isOwned: false,
};

export const theCaretaker: VinylStructure = {
  _id: "3f92c7b5d1e04a8f6c7e39ad",
  title: "The Caretaker",
  artist: "Leyland Kirby",
  country: "UK",
  releaseDate: new Date("2002-09-01"),
  genre: "Ambient",
  format: "7''",
  coverImageUrl: "https://example.com/the-caretaker.jpg",
  styles: ["Hauntology", "Ambient", "Sound Collage"],
  notes:
    "Inspirado en la película 'The Shining', este proyecto reutiliza grabaciones de salón de los años 20 y 30, distorsionadas como si fueran recuerdos degradados por el tiempo. El resultado es inquietante y profundamente evocador.",
  isOwned: true,
};

export const awakeningsLive: VinylStructure = {
  _id: "a91d3b6e2c7f0485e9b31cf7",
  title: "Awakenings Live",
  artist: "Speedy J",
  country: "Netherlands",
  releaseDate: new Date("2008-04-14"),
  genre: "Techno",
  format: "12''",
  coverImageUrl: "https://example.com/awakenings-live.jpg",
  styles: ["Industrial Techno", "Live Techno"],
  purchasedAt: "Clone Records, Rotterdam",
  notes:
    "Grabado en directo durante el icónico festival Awakenings, este disco captura la crudeza del techno en vivo.",
  isOwned: true,
};

export const internalEmpire: VinylStructure = {
  _id: "7d5e3a9c0f8b24c1e6a937b2",
  title: "Internal Empire",
  artist: "Robert Hood",
  country: "USA",
  releaseDate: new Date("1994-09-01"),
  genre: "Minimal Techno",
  format: "7''",
  coverImageUrl: "https://example.com/internal-empire.jpg",
  styles: ["Detroit Techno", "Minimal"],
  notes:
    "Con 'Internal Empire', Robert Hood reafirma su papel como pionero del minimal techno. A diferencia de sus obras más industriales, aquí opta por una precisión quirúrgica en beats y un uso casi espiritual del espacio sonoro. Considerado una obra esencial para entender el ADN del techno moderno.",
  isOwned: false,
};

export const marineroDeLuces: VinylStructure = {
  _id: "f3c9a7b2e6d0",
  title: "Marinero de Luces",
  artist: "Isabel Pantoja",
  country: "España",
  releaseDate: new Date("1985-04-10"),
  genre: "Copla",
  format: "7''",
  coverImageUrl: "https://example.com/marinero-de-luces.jpg",
  styles: ["Copla", "Canción Española"],
  notes:
    "Con 'Marinero de Luces', Isabel Pantoja marcó un antes y un después en su carrera.",
  isOwned: false,
};

export const vinylsFixtures: VinylStructure[] = [
  strangeWeather,
  lp5,
  spiritOfEden,
  inColour,
  fromDeewee,
  minimalNation,
  hissingOfSummerLawns,
  rispah,
  innocenceAndDecadence,
  theCaretaker,
  awakeningsLive,
  internalEmpire,
];

export const leftism: VinylStructure = {
  _id: "8f4a2b9d1c7e4f3a9b2d567e",
  title: "Leftism",
  artist: "Leftfield",
  country: "UK",
  releaseDate: new Date("1995-11-20"),
  genre: "Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/leftfield-leftism.jpg",
  styles: ["Progressive House", "Techno", "Electronica"],
  notes:
    "Con 'Leftism', Leftfield redefine la música electrónica de los 90 con su mezcla innovadora de house progresivo y techno.",
  isOwned: false,
};

export const leftismVinyl: VinylData = {
  title: "Leftism",
  artist: "Leftfield",
  country: "UK",
  releaseDate: new Date("1995-11-20"),
  genre: "Electronic",
  format: "12''",
  coverImageUrl: "https://example.com/leftfield-leftism.jpg",
  styles: ["Progressive House", "Techno", "Electronica"],
  notes:
    "Con 'Leftism', Leftfield redefine la música electrónica de los 90 con su mezcla innovadora de house progresivo y techno.",
  isOwned: false,
};

export const fromDeeweeVinyl: VinylData = {
  title: "From Deewee",
  artist: "Soulwax",
  country: "Belgium",
  releaseDate: new Date("2017-03-24"),
  genre: "Electro Rock",
  format: "12''",
  coverImageUrl: "https://example.com/from-deewee.jpg",
  styles: ["Synth-pop", "Techno Rock"],
  purchasedAt: "Vinyl Dreams, San Francisco",
  isOwned: true,
};

export const dileAlSol: VinylStructure = {
  _id: "8f4a2b9d1c7e4f3a9b2d567f",
  title: "Dile al sol",
  artist: "La Oreja de Van Gogh",
  country: "Spain",
  releaseDate: new Date("1998-05-18"),
  genre: "Pop Rock",
  format: "12''",
  coverImageUrl:
    "https://upload.wikimedia.org/wikipedia/en/5/5e/Dile_al_sol.jpg",
  styles: ["Pop", "Soft Rock", "Latin Pop"],
  purchasedAt: "Discos Tesla, Madrid",
  notes: "Álbum debut con tintes nostálgicos y melodías pegadizas.",
  isOwned: true,
};
