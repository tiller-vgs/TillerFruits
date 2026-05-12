import {
  adjectiveList,
  verbList,
  fruitOrAnimal,
} from "../data/displaynameData";

import { prisma } from "../lib/db";

export default async function generateRandomDisplayName() {
  let displayName: string;
  let existingDisplayName = null;

  //loops until it finds a unique display name that doesnt exist in the database already.
  //while(existingDisplayName) is true, it will keep generating a new display name and checking if it exists in the database until it finds one that doesnt exist.
  do {
    const randomAdjective =
      adjectiveList[Math.floor(Math.random() * adjectiveList.length)];

    const randomVerb = verbList[Math.floor(Math.random() * verbList.length)];

    const randomFruitOrAnimal =
      fruitOrAnimal[Math.floor(Math.random() * fruitOrAnimal.length)];

    displayName = `${randomAdjective}-${randomVerb}-${randomFruitOrAnimal}`;

    existingDisplayName = await prisma.file.findFirst({
      where: {
        displayName: displayName,
      },
    });
    console.log(
      `Generated display name: ${displayName}, Existing display name: ${existingDisplayName?.displayName}`,
    );
  } while (existingDisplayName);

  return displayName;
}
