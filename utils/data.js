const userSeeds = [
  "BlueStar99",
  "TechGuru23",
  "SunnySideUp88",
  "GuitarHero7",
  "PizzaLover42",
  "AdventureSeeker19",
  "BookWorm55",
  "FitnessFreak33",
  "StarryNight77",
  "CoffeeAddict25",
  "MusicMaestro11",
  "NatureLover63",
  "Fashionista28",
  "FoodieExplorer72",
  "MovieBuff44",
  "BeachBum14",
  "ArtisticSoul37",
  "HikingEnthusiast20",
  "PetLover84",
  "ScienceGeek51",
];

const thoughtSeeds = [
  "The only way to do great work is to love what you do.",
  "In three words, I can sum up everything I've learned about life: it goes on.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "In the middle of every difficulty lies opportunity.",
  "Life is what happens when you're busy making other plans.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "The best way to predict the future is to create it.",
  "Don't watch the clock; do what it does. Keep going.",
  "The only thing we have to fear is fear itself.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only impossible journey is the one you never begin.",
  "Life is really simple, but we insist on making it complicated.",
  "The biggest risk is not taking any risk. In a world that is changing quickly, the only strategy that is guaranteed to fail is not taking risks.",
  "The purpose of our lives is to be happy.",
  "The journey of a thousand miles begins with one step.",
  "Your time is limited, don't waste it living someone else's life.",
  "You miss 100% of the shots you don't take.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The only person you are destined to become is the person you decide to be.",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      username: getRandomArrItem(userSeeds),
    });
  }
  return results;
};

const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thought: getRandomArrItem(thoughtSeeds),
      });
    }
    return results;
  };
  

module.exports = { getRandomUsername, getRandomThought };
