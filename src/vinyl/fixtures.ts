import { VinylStructure } from "./types.js";

export const strangeWeather: VinylStructure = {
  _id: "1",
  title: "Strange Weather, Isn't It?",
  artist: "!!! (Chk Chk Chk)",
  country: "USA",
  releaseDate: new Date("2010-08-23"),
  genre: "Dance-punk",
  format: '12"',
  coverImageUrl: "https://example.com/strange-weather.jpg",
  styles: ["Indie Dance", "Alternative Dance"],
  purchasedAt: "Rough Trade NYC",
  notes:
    "El álbum fue grabado en Berlín y se inspira en la escena club local. La banda incorpora elementos de punk con estructuras bailables, ofreciendo una experiencia que difiere de los cánones típicos del rock alternativo estadounidense. La crítica lo recibió con opiniones mixtas, pero se volvió un favorito en pistas de baile alternativas.",
  isOwned: true,
};

export const lp5: VinylStructure = {
  _id: "2",
  title: "LP5",
  artist: "Apparat",
  country: "Germany",
  releaseDate: new Date("2019-03-22"),
  genre: "Electronic",
  format: '12"',
  coverImageUrl: "https://example.com/apparat-lp5.jpg",
  styles: ["Ambient", "Techno", "Experimental"],
  notes:
    "Apparat explora una atmósfera introspectiva donde los sintetizadores se mezclan con cuerdas clásicas. Es un disco que requiere una escucha atenta y revela matices emocionales en cada reproducción.",
  isOwned: false,
};

export const spiritOfEden: VinylStructure = {
  _id: "3",
  title: "Spirit of Eden",
  artist: "Talk Talk",
  country: "UK",
  releaseDate: new Date("1988-09-12"),
  genre: "Post-rock",
  format: '12"',
  coverImageUrl: "https://example.com/spirit-of-eden.jpg",
  styles: ["Art Rock", "Experimental"],
  purchasedAt: "Discogs",
  notes:
    "Considerado precursor del post-rock, este disco marcó una ruptura con el pop comercial. La banda optó por la improvisación y la grabación analógica, creando un sonido orgánico, profundo y complejo que desafía las estructuras convencionales.",
  isOwned: true,
};

export const inColour: VinylStructure = {
  _id: "4",
  title: "In Colour",
  artist: "Jamie xx",
  country: "UK",
  releaseDate: new Date("2015-05-29"),
  genre: "Electronic",
  format: '12"',
  coverImageUrl: "https://example.com/in-colour.jpg",
  styles: ["UK Garage", "Future Bass"],
  isOwned: false,
};

export const fromDeewee: VinylStructure = {
  _id: "5",
  title: "From Deewee",
  artist: "Soulwax",
  country: "Belgium",
  releaseDate: new Date("2017-03-24"),
  genre: "Electro Rock",
  format: '12"',
  coverImageUrl: "https://example.com/from-deewee.jpg",
  styles: ["Synth-pop", "Techno Rock"],
  purchasedAt: "Vinyl Dreams, San Francisco",
  isOwned: true,
};

export const minimalNation: VinylStructure = {
  _id: "6",
  title: "Minimal Nation",
  artist: "Robert Hood",
  country: "USA",
  releaseDate: new Date("1994-05-01"),
  genre: "Techno",
  format: '12"',
  coverImageUrl: "https://example.com/minimal-nation.jpg",
  styles: ["Minimal Techno"],
  notes:
    "Un pilar del techno de Detroit, 'Minimal Nation' cambió el paradigma al demostrar que menos puede ser más. Robert Hood eliminó adornos superfluos y se centró en pulsos repetitivos, dando paso a un nuevo lenguaje sonoro.",
  isOwned: true,
};

export const hissingOfSummerLawns: VinylStructure = {
  _id: "7",
  title: "The Hissing of Summer Lawns",
  artist: "Joni Mitchell",
  country: "Canada",
  releaseDate: new Date("1975-11-01"),
  genre: "Jazz Fusion",
  format: '12"',
  coverImageUrl: "https://example.com/joni-hissing.jpg",
  styles: ["Art Pop", "Folk Jazz"],
  isOwned: false,
};

export const rispah: VinylStructure = {
  _id: "8",
  title: "Rispah",
  artist: "The Invisible",
  country: "UK",
  releaseDate: new Date("2012-06-11"),
  genre: "Alternative",
  format: '12"',
  coverImageUrl: "https://example.com/rispah.jpg",
  styles: ["Electronic Soul", "Ambient Rock"],
  notes:
    "Inspirado en el duelo personal del vocalista, este álbum mezcla sonidos espirituales con atmósferas densas. Fue producido por Richard File (ex-UNKLE), y destaca por sus capas sutiles de sintetizadores y percusiones africanas.",
  isOwned: true,
};

export const innocenceAndDecadence: VinylStructure = {
  _id: "9",
  title: "Innocence & Decadence",
  artist: "Graveyard",
  country: "Sweden",
  releaseDate: new Date("2015-09-25"),
  genre: "Psychedelic Rock",
  format: '7"',
  coverImageUrl: "https://example.com/graveyard.jpg",
  styles: ["Hard Rock", "Blues Rock"],
  purchasedAt: "Festival de Roskilde",
  isOwned: false,
};

export const theCaretaker: VinylStructure = {
  _id: "10",
  title: "The Caretaker",
  artist: "Leyland Kirby",
  country: "UK",
  releaseDate: new Date("2002-09-01"),
  genre: "Ambient",
  format: '7"',
  coverImageUrl: "https://example.com/the-caretaker.jpg",
  styles: ["Hauntology", "Ambient", "Sound Collage"],
  notes:
    "Inspirado en la película 'The Shining', este proyecto reutiliza grabaciones de salón de los años 20 y 30, distorsionadas como si fueran recuerdos degradados por el tiempo. El resultado es inquietante y profundamente evocador.",
  isOwned: true,
};

export const awakeningsLive: VinylStructure = {
  _id: "11",
  title: "Awakenings Live",
  artist: "Speedy J",
  country: "Netherlands",
  releaseDate: new Date("2008-04-14"),
  genre: "Techno",
  format: '12"',
  coverImageUrl: "https://example.com/awakenings-live.jpg",
  styles: ["Industrial Techno", "Live Techno"],
  purchasedAt: "Clone Records, Rotterdam",
  notes:
    "Grabado en directo durante el icónico festival Awakenings, este disco captura la crudeza del techno en vivo.",
  isOwned: true,
};

export const internalEmpire: VinylStructure = {
  _id: "12",
  title: "Internal Empire",
  artist: "Robert Hood",
  country: "USA",
  releaseDate: new Date("1994-09-01"),
  genre: "Minimal Techno",
  format: '7"',
  coverImageUrl: "https://example.com/internal-empire.jpg",
  styles: ["Detroit Techno", "Minimal"],
  notes:
    "Con 'Internal Empire', Robert Hood reafirma su papel como pionero del minimal techno. A diferencia de sus obras más industriales, aquí opta por una precisión quirúrgica en beats y un uso casi espiritual del espacio sonoro. Considerado una obra esencial para entender el ADN del techno moderno.",
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
