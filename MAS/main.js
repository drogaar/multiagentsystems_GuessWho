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


stepGame()




// next turn!
function stepGame(){
	var player = players[turn % 2];

  // the player should ask the question that gives him most information
  // and doesn't reveal his character to his enemy
	var announcement = player.askQuestion();

	for (var playerIdx = 0; playerIdx < players.length; ++playerIdx){
    // asking the question gives information to both players and should
    // update the logics in the database.
		player.updateData(announcement);

    // Each player should update his, and his opponents list of characters
		// based on the knowledge they have.
		player.updateCharacters();
	}

	turn++;
}

// new game!
function resetGame(){
  // uses global scope for now
	var num_chars = characters.length;

	char1 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];
	char2 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];

	p1 = new Player("P1", characters, char1, attributes);
	p2 = new Player("P2", characters, char2, attributes);
	players = [p1, p2];
}
