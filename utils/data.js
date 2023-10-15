const userSeeds = [

];

const thoughtSeeds = [

];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            username: getRandomArrItem(userSeeds),
            thoughts: getRandomArrItem(thoughtSeeds)
        });
    }
    return results;
};



module.exports = { getRandomUsername, getRandomThought }