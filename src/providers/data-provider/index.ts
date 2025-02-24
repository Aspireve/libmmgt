"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

<<<<<<< HEAD
const API_URL = "https://api.fake-rest.refine.dev";
=======
const API_URL = "http://localhost:3030/books/";
>>>>>>> f64be2de61d1dd2b933b69d6a182b3ebf0286468

export const dataProvider = dataProviderSimpleRest(API_URL);
