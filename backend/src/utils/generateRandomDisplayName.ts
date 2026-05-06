import {
  adjectiveList,
  verbList,
  fruitOrAnimal,
} from "../data/displaynameData";

export default function generateRandomDisplayName() {
  const randomAdjective =
    adjectiveList[Math.floor(Math.random() * adjectiveList.length)];
  const randomVerb = verbList[Math.floor(Math.random() * verbList.length)];
  const randomFruitOrAnimal =
    fruitOrAnimal[Math.floor(Math.random() * fruitOrAnimal.length)];

  const displayName = `${randomAdjective}-${randomVerb}-${randomFruitOrAnimal}`;
  return displayName;
}
