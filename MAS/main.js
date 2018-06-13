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
var ended = false // whether the game has ended

// Start game
resetGame()


// TODO: for debugging only
stepGame()



// next turn!
function stepGame(){
	if (!ended){
		log("\n_____________ GAME STEP _____________")
		var playerIdx = turn % 2
		var opponentIdx = (turn+1) % 2
		var playerNum = playerIdx + 1
		var opponentNum = ((playerNum) % 2) + 1

	  // the player should ask the question that gives him most information
	  // and doesn't reveal his character to his enemy
		var question = players[playerIdx].askQuestion(knowledgeBase)
		log("Player " + (playerIdx+1) + " asks:\n  " + question + "?\n")


		// TODO: check if the question is a name. If so, the game is over :-)
		// (if a human player is added, it needs another check to see if it is actually in the KB)


		// Let each player answer the question in turn
		answer = players[opponentIdx].answerQuestion(question)
		log(players[opponentIdx].name + " answers:\n  " + answer)
		knowledgeBase.addKnowledge(answer)

		answer = players[playerIdx].answerQuestion(question)
		log(players[playerIdx].name + " answers:\n  " + answer)
		result = knowledgeBase.addKnowledge(answer)

		setImages(0, knowledgeBase);
		setImages(1, knowledgeBase);
		
		if (result){
			endGame()
			return
		}

		// Log who knows what:
		// console.log("\n")
		// console.log(players[playerIdx].name + " knows: ")
		// console.log(knowledgeBase.getKnowledge(playerIdx+1))
		// console.log("\n")
		// console.log(players[opponentIdx].name + " knows: ")
		// console.log(knowledgeBase.getKnowledge(opponentIdx+1))
		// console.log("\n")

		// Log all knowledge at once:
		log("\nCurrent Knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"))

		// Update images for possible characters


		turn++
	}
}

// start game!
function resetGame(){
	ended = false
	clearlog()

	var numChars = characters.length;
	knowledgeBase = new Knowledge(characters, attributes);

  // Update images for possible characters
	setImages(0, knowledgeBase);
	setImages(1, knowledgeBase);

	char1 = characters[Math.floor((Math.random() * numChars - 1) + 1)];
	char2 = characters[Math.floor((Math.random() * numChars - 1) + 1)];

	p1 = new Player("p1", char1, true);
	p2 = new Player("p2", char2, true);
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

	log("p1's Avatar:\n" + p1.getAvatar())
	log("\np2's Avatar:\n" + p2.getAvatar())
	// console.log("\nGame rules:")
	// console.log(knowledgeBase.rules)
}

// stop game!
function endGame(){
	log("The game has ended!")
	log("\nCurrent Knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"))
	log("\n_____________________________________")
	ended = true
}

// Jumps page to interactive game info
function help(){
	document.getElementById('help').scrollIntoView();
}

// outConsole logging
function log(s){
	document.getElementById('outConsole').value += (s + "\n")
	document.getElementById("outConsole").scrollTop = document.getElementById("outConsole").scrollHeight
}

function clearlog(){
	document.getElementById('outConsole').value = ""
}
