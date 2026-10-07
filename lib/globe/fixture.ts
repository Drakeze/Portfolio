import type { Signature } from "@/lib/types/signature"

// Positions pre-computed for uniform sphere coverage — 6 latitude bands × 9 longitude slices.
// lat/lon in decimal degrees.
export const SIGNATURE_FIXTURE: Signature[] = [
  // Band 1 — ~70°N
  { id: "s01", name: "Maya",    location: "Oslo",       lat:  70.0, lon:    0.0 },
  { id: "s02", name: "Sven",    location: "Stockholm",  lat:  70.0, lon:   40.0 },
  { id: "s03", name: "Priya",   location: "Helsinki",   lat:  70.0, lon:   80.0 },
  { id: "s04", name: "Kenji",   location: "Reykjavik",  lat:  70.0, lon:  120.0 },
  { id: "s05", name: "Astrid",  location: "Tromsø",     lat:  70.0, lon:  160.0 },
  { id: "s06", name: "Lena",    location: "Anchorage",  lat:  70.0, lon: -160.0 },
  { id: "s07", name: "Dmitri",  location: "Norilsk",    lat:  70.0, lon: -120.0 },
  { id: "s08", name: "Ingrid",  location: "Fairbanks",  lat:  70.0, lon:  -80.0 },
  { id: "s09", name: "Taavi",   location: "Tallinn",    lat:  70.0, lon:  -40.0 },

  // Band 2 — ~45°N
  { id: "s10", name: "Devon",   location: "London",     lat:  45.0, lon:    0.0 },
  { id: "s11", name: "Chiara",  location: "Milan",      lat:  45.0, lon:   40.0 },
  { id: "s12", name: "Yuki",    location: "Tokyo",      lat:  45.0, lon:   80.0 },
  { id: "s13", name: "Amir",    location: "Tehran",     lat:  45.0, lon:  120.0 },
  { id: "s14", name: "Zara",    location: "Almaty",     lat:  45.0, lon:  160.0 },
  { id: "s15", name: "Oliver",  location: "Berlin",     lat:  45.0, lon: -160.0 },
  { id: "s16", name: "Nadia",   location: "Montreal",   lat:  45.0, lon: -120.0 },
  { id: "s17", name: "James",   location: "New York",   lat:  45.0, lon:  -80.0 },
  { id: "s18", name: "Sofia",   location: "Lisbon",     lat:  45.0, lon:  -40.0 },

  // Band 3 — ~20°N
  { id: "s19", name: "Rohan",   location: "Mumbai",     lat:  20.0, lon:    0.0 },
  { id: "s20", name: "Emeka",   location: "Lagos",      lat:  20.0, lon:   40.0 },
  { id: "s21", name: "Sakura",  location: "Bangkok",    lat:  20.0, lon:   80.0 },
  { id: "s22", name: "Tariq",   location: "Riyadh",     lat:  20.0, lon:  120.0 },
  { id: "s23", name: "Lin",     location: "Chengdu",    lat:  20.0, lon:  160.0 },
  { id: "s24", name: "Fatima",  location: "Casablanca", lat:  20.0, lon: -160.0 },
  { id: "s25", name: "Carlos",  location: "Mexico City",lat:  20.0, lon: -120.0 },
  { id: "s26", name: "Anthony", location: "Los Angeles",lat:  20.0, lon:  -80.0 },
  { id: "s27", name: "Layla",   location: "Dubai",      lat:  20.0, lon:  -40.0 },

  // Band 4 — ~−5°
  { id: "s28", name: "Kwame",   location: "Accra",        lat:  -5.0, lon:    0.0 },
  { id: "s29", name: "Isabela", location: "Nairobi",      lat:  -5.0, lon:   40.0 },
  { id: "s30", name: "Marcus",  location: "Singapore",    lat:  -5.0, lon:   80.0 },
  { id: "s31", name: "Hana",    location: "Jakarta",      lat:  -5.0, lon:  120.0 },
  { id: "s32", name: "Tomás",   location: "Bogotá",       lat:  -5.0, lon:  160.0 },
  { id: "s33", name: "Nia",     location: "Kampala",      lat:  -5.0, lon: -160.0 },
  { id: "s34", name: "Diego",   location: "Medellín",     lat:  -5.0, lon: -120.0 },
  { id: "s35", name: "Amara",   location: "Kinshasa",     lat:  -5.0, lon:  -80.0 },
  { id: "s36", name: "Wei",     location: "Kuala Lumpur", lat:  -5.0, lon:  -40.0 },

  // Band 5 — ~−30°
  { id: "s37", name: "Lucas",     location: "São Paulo",      lat: -30.0, lon:    0.0 },
  { id: "s38", name: "Nomvula",   location: "Johannesburg",   lat: -30.0, lon:   40.0 },
  { id: "s39", name: "Chloe",     location: "Sydney",         lat: -30.0, lon:   80.0 },
  { id: "s40", name: "Mateus",    location: "Buenos Aires",   lat: -30.0, lon:  120.0 },
  { id: "s41", name: "Zanele",    location: "Cape Town",      lat: -30.0, lon:  160.0 },
  { id: "s42", name: "Valentina", location: "Santiago",       lat: -30.0, lon: -160.0 },
  { id: "s43", name: "Ravi",      location: "Perth",          lat: -30.0, lon: -120.0 },
  { id: "s44", name: "Elena",     location: "Melbourne",      lat: -30.0, lon:  -80.0 },
  { id: "s45", name: "Hugo",      location: "Montevideo",     lat: -30.0, lon:  -40.0 },

  // Band 6 — ~−55°
  { id: "s46", name: "Finn",   location: "Ushuaia",         lat: -55.0, lon:    0.0 },
  { id: "s47", name: "Rosa",   location: "Punta Arenas",    lat: -55.0, lon:   40.0 },
  { id: "s48", name: "Bjorn",                               lat: -55.0, lon:   80.0 },
  { id: "s49", name: "Miriam",                              lat: -55.0, lon:  120.0 },
  { id: "s50", name: "Kiri",   location: "Invercargill",    lat: -55.0, lon:  160.0 },
  { id: "s51", name: "Soren",                               lat: -55.0, lon: -160.0 },
  { id: "s52", name: "Pilar",                               lat: -55.0, lon: -120.0 },
  { id: "s53", name: "Luca",                                lat: -55.0, lon:  -80.0 },
  { id: "s54", name: "Tove",                                lat: -55.0, lon:  -40.0 },
]
