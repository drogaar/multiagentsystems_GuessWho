images = ["hb t2 cy.jpg", "hg t1 cn.jpg", "hr t0 cy.jpg", "hr t1 cn.jpg"]
hairColours = ["red", "green", "blue"]
teethQuantities = ["0", "1", "2"]
crossEyed = ["true", "false"]

attributes = {}
attributes["hair"] = hairColours
attributes["crosseyed"] = crossEyed
attributes["teeth"] = teethQuantities

characters = []
names = ["lil_timmy", "bob", "peter", "fred"]

// Define possible characters, based on which ones we have drawings for
for (var i = 0; i < images.length; i++){
	characters.push(str2char(images[i], names[i]))
}

var turn = 0
var players = []
var knowledgeBase

// Start game
resetGame()


// TODO: for debugging only
stepGame()



// next turn!
function stepGame(){
	console.log("\n_____________ GAME STEP _____________")
	var playerIdx = turn % 2
	var opponentIdx = (turn+1) % 2
	var playerNum = playerIdx + 1
	var opponentNum = ((playerNum) % 2) + 1

  // the player should ask the question that gives him most information
  // and doesn't reveal his character to his enemy
	var question = players[playerIdx].askQuestion()
	console.log("Player " + (playerIdx+1) + " asks: " + question)


	// TODO: check if the question is a name. If so, the game is over :-)
	// (if a human player is added, it needs another check to see if it is actually in the KB)


	// Let each player answer the question in turn
	console.log("\n\n")
	answer = players[opponentIdx].answerQuestion(knowledgeBase.getKnowledge(opponentIdx), question)
	console.log("  " + players[opponentIdx].name + " answers: " + answer)
	knowledgeBase.addKnowledge(answer)

	console.log("\n\n")
	answer = players[playerIdx].answerQuestion(knowledgeBase.getKnowledge(playerIdx), question)
	console.log("  " + players[playerIdx].name + " answers: " + answer)
	knowledgeBase.addKnowledge(answer)

	// Log who knows what:
	// console.log("\n")
	// console.log(players[playerIdx].name + " knows: ")
	// console.log(knowledgeBase.getKnowledge(playerIdx+1))
	// console.log("\n")
	// console.log(players[opponentIdx].name + " knows: ")
	// console.log(knowledgeBase.getKnowledge(opponentIdx+1))
	// console.log("\n")

	// Log all knowledge at once:
	console.log("\nCurrent Knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"))

	turn++
}

// start game!
function resetGame(){
	var numChars = characters.length;
	knowledgeBase = new Knowledge(characters, attributes);

  // Update images for possible characters
	setImages(0, knowledgeBase);
	setImages(1, knowledgeBase);

	char1 = characters[Math.floor((Math.random() * numChars - 1) + 1)];
	char2 = characters[Math.floor((Math.random() * numChars - 1) + 1)];

	p1 = new Player("p1", char1);
	p2 = new Player("p2", char2);
	players = [p1, p2];


	// The following lines of code contain player knowledge about their own character. Took me a while to realize it is actually irrelevant for proving things.
	// I just spent an hour on this so I can't delete it right now :(
	// TODO: would actually be better to put this in the knowledge base anyway for answering questions, as opposed to checking the avatar attribute of a player since it is knowledge that should be represented in the KB.

	// add players' knowledge to KB
	// knowledgeBase.addKnowledge(0, "p1.hair:"+ p1.avatar.hair)
	// knowledgeBase.addKnowledge(0, "p1.crosseyed:"+ p1.avatar.crosseyed)
	// knowledgeBase.addKnowledge(0, "p1.teeth:"+ p1.avatar.teeth)
	// knowledgeBase.addKnowledge(0, "p1." + p1.avatar.name)
	//
	// knowledgeBase.addKnowledge(1, "p2.hair:"+ p2.avatar.hair)
	// knowledgeBase.addKnowledge(1, "p2.crosseyed:"+ p2.avatar.crosseyed)
	// knowledgeBase.addKnowledge(1, "p2.teeth:"+ p2.avatar.teeth)
	// knowledgeBase.addKnowledge(1, "p2." + p2.avatar.name)

	console.log("p1's Avatar:", p1.getAvatar())
	console.log("p2's Avatar:", p2.getAvatar())
	console.log("\nGame rules:")
	console.log(knowledgeBase.rules)
}

// Jumps page to interactive game info
function help(){
	document.getElementById('help').scrollIntoView();
}
