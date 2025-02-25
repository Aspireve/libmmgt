"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

<<<<<<< HEAD
<<<<<<< HEAD
const API_URL = "https://api.fake-rest.refine.dev";
=======
const API_URL = "http://localhost:3030/books/";
>>>>>>> f64be2de61d1dd2b933b69d6a182b3ebf0286468
=======
const API_URL = "http://localhost:3030/books/";
>>>>>>> 60b038955ef2b043cdf5e23d1ef78898770b2620

export const dataProvider = dataProviderSimpleRest(API_URL);
