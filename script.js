const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let j = 1;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.setAttribute('id', j);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    j++;
  }
}

let clickCount = 0;

function handleCardClick(event) {
  
  // you can use event.target to see which element was clicked
  if (!event.target.classList.contains('flipped')){
    event.target.classList.add('flipped');
    clickCount++;
  } else {
    event.target.classList.remove("flipped");
    if (clickCount > 0) {
      clickCount--;
    }
  }
  
  if (clickCount === 2) {
    console.log('I have clicked twice!');
    clickCount = 0;
    event.preventDefault();

    // looping through all the cards and determinining which ones stay flipped
    let cards = gameContainer.getElementsByTagName('div');
    console.log(`card count: ${cards.length}`);

    let guess1;
    let guess2;
    let guess1Id;
    let guess2Id;

    for (let i = 0; i < cards.length; i++) {
      //console.log(`card.className: ${card.className}`);
      
      if (!guess1 && cards[i].classList.contains('flipped')) {
        guess1 = cards[i].className;
        guess1Id = i;
      } else if (!guess2 && cards[i].classList.contains('flipped')) {
        guess2 = cards[i].className;
        guess2Id = i;
      }
    }
    if (guess1 === guess2) {
      console.log('match!!');
      console.log(`guess1Id: ${guess1Id}`);
      console.log(`guess2Id: ${guess2Id}`);

      for (let j = 0; j < cards.length; j++) {

        if (j === guess1Id || j === guess2Id) {
          console.log('match 2');
          cards[j].classList.add('matched');
          cards[j].classList.remove('flipped');
        }
      }

    } else {
      console.log('NO match!');
      for (let k = 0; k < cards.length; k++) {

        if (cards[k].classList.contains('flipped')) {
          setTimeout(() => {
            cards[k].classList.remove('flipped');
          }, 1000);
        }
      }
    }
  }
}

// Part Three - Gotchas
// Make sure this works only if you click on two different cards — clicking the same card twice shouldn’t
// count as a match!) - CHECK
// Make sure that you can not click too quickly and guess more than two cards at a time. - CHECK

// Further Study
// Add a button that when clicked will start the game
// Add a button that when clicked will restart the game once it has ended
// For every guess made, increment a score variable and display the score while the game is played
// Store the lowest-scoring game in local storage, so that players can see a record of the best game
// played.
// Allow for any number of cards to appear
// Instead of hard-coding colors, try something different like random colors or even images!

// when the DOM loads
createDivsForColors(shuffledColors);