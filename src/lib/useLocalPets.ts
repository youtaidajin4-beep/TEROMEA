"use client";

import { useEffect, useState } from "react";
import { getClientPetsSnapshot, subscribeLocalPets } from "./localPets";

export function useLocalPets() {
  const [allPets, setAllPets] = useState(() => getClientPetsSnapshot());

  useEffect(() => {
    return subscribeLocalPets(() => {
      setAllPets(getClientPetsSnapshot());
    });
  }, []);

  return allPets;
}
