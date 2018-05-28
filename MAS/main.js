images = ["hb t2 cy.jpg", "hg t1 cn.jpg", "hr t0 cy.jpg", "hr t1 cn.jpg"];
hair_colours = ["red", "green", "blue"]
teeth_quantities = [0, 1, 2]
crosseyed = [true, false]

var attributes = {}
attributes["hair"] = hair_colours
attributes["crosseyed"] = crosseyed
attributes["teeth"] = teeth_quantities

characters = [];
for (var idx = 0; idx < images.length; ++idx){
	characters.push(str2char(images[idx]));
}

var turn = 0;
var players = [];

setImages(0);
setImages(1);

// Start game
resetGame();

console.log("P1's Avatar:", p1.getCharacter());
console.log("P2's Avatar:", p2.getCharacter());


// console.log("P1's Knowledge:", p1.getKnowledge());
//
// console.log("\nLet's add 'hair:red' for the opponent's avatar!")
// p1.addKnowledge("hair:red"); // NOTE: 'addKnowledge' can only add atoms like hair:red -- no implications or anything else
//
// console.log("\nNow let's add 'crosseyed:false' for the opponent's avatar!")
// p1.addKnowledge("crosseyed:false");
//
// console.log("\nNow let's add 'teeth:1' for the opponent's avatar!")
// p1.addKnowledge("teeth:1");


// TODO: removeme
stepGame()



// next turn!
function stepGame(){
	var playerIdx = turn % 2
	var opponentIdx = (turn+1) % 2

  // the player should ask the question that gives him most information
  // and doesn't reveal his character to his enemy
	//var querySelector('query') = player.askQuestion();
	var question = players[playerIdx].askQuestion()
	console.log("Player " + (playerIdx+1) + " asks: " + question)

	// TODO: check if the question is a name -- if so, the game is over :-)

	// Let each player answer the question in turn
	knowledge.addKnowledge(opponentIdx, players[opponentIdx].answerQuestion(knowledge.getKnowledge(playerIdx), question))
	knowledge.addKnowledge(playerIdx, players[playerIdx].answerQuestion(question))

	// Next turn!
	turn++
}

// new game!
function resetGame(){
  // uses global scope for now
	var num_chars = characters.length;
	var knowledge = new Knowledge(characters, attributes)

	char1 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];
	char2 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];

	p1 = new Player("P1", char1);
	p2 = new Player("P2", char2);
	players = [p1, p2];
}
