images = ["hb t1 cy.png", "hb t2 cy.png", "hg t1 cn.png", "hg t2 cn.png",
					"hr t0 cn.png", "hr t0 cy.png", "hr t1 cn.png", "hr t1 cy.png"]
hairColours = ["red", "green", "blue"]
teethQuantities = ["0", "1", "2"]
crossEyed = ["true", "false"]

attributes = {}
attributes["hair"] = hairColours
attributes["crosseyed"] = crossEyed
attributes["teeth"] = teethQuantities

characters = []
names = ["wooba", "lil_timmy", "bob", "johnny", "spike", "kiki", "fred", "peter"]

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

// next turn!
function stepGame(){
	if (!ended){
		log("\n\n> Turn " + (turn+1))
		var playerIdx = turn % 2
		var opponentIdx = (turn+1) % 2
		var playerNum = playerIdx + 1
		var opponentNum = ((playerNum) % 2) + 1

	  // the player should ask the question that gives him most information
	  // and doesn't reveal his character to his enemy
		var question = players[playerIdx].askQuestion(knowledgeBase)
		log("\n  Player " + (playerIdx+1) + " asks:\n    \"" + question + "?\"")

		// Let each player answer the question in turn
		answer = players[opponentIdx].answerQuestion(question)
		log("\n  Player " + (opponentIdx+1) + " answers:\n    \"" + answer + "\"")
		knowledgeBase.addKnowledge(answer)

		answer = players[playerIdx].answerQuestion(question)
		log("\n  Player " + (playerIdx+1) + " answers:\n    \"" + answer + "\"")
		result = knowledgeBase.addKnowledge(answer)

    // update game view
		setView(knowledgeBase.knowledge);

		if (result){
			endGame()
			return
		}

		// Log all knowledge at once:
		//log("\n" + "Current knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"), 'knowledgeConsole')
		log("\nCurrent Knowledge:\n" + knowledgeBase.toString(), 'knowledgeConsole')

		// Update images for possible characters


		turn++
	}
}

// start game!
function resetGame(){
	ended = false
	document.getElementById("stepButton").disabled = false;
	clearlog('outConsole')
	clearlog('knowledgeConsole')

	var numChars = characters.length;
	knowledgeBase = new Knowledge(characters, attributes);

	char1 = characters[Math.floor((Math.random() * numChars - 1) + 1)];
	char2 = characters[Math.floor((Math.random() * numChars - 1) + 1)];

	p1 = new Player("p1", char1, random=true);
	p2 = new Player("p2", char2, random=true);
	players = [p1, p2];

	// update game view
	setView(knowledgeBase.knowledge);

	log("p1's avatar:    " + p1.getAvatar().name + "\n" + p1.getAvatar())
	log("\np2's avatar:    " + p2.getAvatar().name + "\n" + p2.getAvatar())
	log("________________")
	// console.log("\nGame rules:")
	// console.log(knowledgeBase.rules)
}

// stop game!
function endGame(){
	ended = true
	turn = 0
	log("________________")

	// Log the winner
	winner = whoWon(knowledgeBase.knowledge)
	loser = 3 - winner // switcheroo~
	if (winner == 0){
		console.warn("Warning: no one won according to function 'whoWon()' (images.js), but knowledge base found a winner!")
		log("\n\nWarning: no one won according to function 'whoWon()' (images.js), but knowledge base found a winner!")
	} else if (winner == 3){
		log("\nIt's a tie!")
	} else {
		//log("\nPlayer " + winner + " won!")
		log("\n  Player " + winner + " asks:\n    \"are you " + knowledgeBase.getLosingAvatar() + "?\"\n\n  Player " + loser + " answers:\n    \"yes\"\n\nPlayer " + winner + ", congratulations!")
	}

	log("\nFinal Knowledge:\n" + knowledgeBase.toString(), 'knowledgeConsole')
	//log("\n" + "Final knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"), 'knowledgeConsole')


	document.getElementById("stepButton").disabled = true;
}

// Jumps page to interactive game info
function help(){
	document.getElementById('help').scrollIntoView();
}

// outConsole logging
function log(s, cons='outConsole'){
	if (cons == 'knowledgeConsole'){
		clearlog('knowledgeConsole')
	}
	document.getElementById(cons).value += (s + "\n")
	document.getElementById(cons).scrollTop = document.getElementById(cons).scrollHeight
}

// clear a log
function clearlog(logId){
	document.getElementById(logId).value = "\n"
}
