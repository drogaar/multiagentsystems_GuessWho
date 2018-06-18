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
var consoleText = {"QnA": "", "commonKnowledge": "", "agentKnowledge": "", "gameRules":""}

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
		setView(knowledgeBase.knowledge)

		if (result){
			endGame()
			return
		}

		// Log the knowledge
		log(knowledgeBase.getCommonKnowledge(), "commonKnowledge")
		log(knowledgeBase.getAgentKnowledge(players), "agentKnowledge")

		turn++
	}
}

// start game!
function resetGame(p1Random=true, p2Random=false){
	ended = false
	turn = 0
	document.getElementById("stepButton").disabled = false
	clearlog()

	var numChars = characters.length
	knowledgeBase = new Knowledge(characters, attributes)

	char1 = characters[Math.floor((Math.random() * numChars - 1) + 1)]
	char2 = characters[Math.floor((Math.random() * numChars - 1) + 1)]

	p1 = new Player("p1", char1, random=p1Random)
	p2 = new Player("p2", char2, random=p2Random)

	players = [p1, p2]

	// update game view
	setView(knowledgeBase.knowledge)

	log("p1's avatar:    " + p1.getAvatar().name + "\n" + p1.getAvatar())
	log("\np2's avatar:    " + p2.getAvatar().name + "\n" + p2.getAvatar())
	log("________________")

	log("There is no common knowledge yet.", "commonKnowledge")
	log(knowledgeBase.getAgentKnowledge(players), "agentKnowledge")
  log((knowledgeBase.rules).join("\n\n"), "gameRules")
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
		console.warn("Warning: no one won according to function 'whoWon()' (images.js), but knowledge base found a winner... :T")
		log("\n\nWarning: no one won according to function 'whoWon()' (images.js), but knowledge base found a winner... :T")
	} else if (winner == 3){
		log("\nIt's a tie!")
	} else {
		//log("\nPlayer " + winner + " won!")
		log("\n  Player " + winner + " asks:\n    \"are you " + knowledgeBase.getLosingAvatar() + "?\"\n\n  Player " + loser + " answers:\n    \"yes\"\n\nPlayer " + winner + ", congratulations!")
	}

	log("\nFinal common knowledge:\n" + knowledgeBase.getCommonKnowledge(), 'commonKnowledge')
	log("\nFinal agent knowledge:\n" + knowledgeBase.getAgentKnowledge(players), 'agentKnowledge')
	//log("\n" + "Final knowledge:\n\n" + knowledgeBase.knowledge.sort().join("\n"), 'knowledgeConsole')


	document.getElementById("stepButton").disabled = true
}

function playManyGames() {
	var smartWins = 0
	var randomWins = 0
	var ties = 0
	var defaultN = 20

	n = parseInt(document.getElementById("nGames").value) || defaultN
	document.getElementById("simulationOutput").value = "now testing..."

	for (var i = 1; i <= n; i++) {
		document.getElementById("simulationOutput").value = (i + " / " + n)

		// Because player 1 always start, make a random player the smart one
		if (Math.random() > 0.5) {
			p1Random = true
			p2Random = false
		} else {
			p1Random = false
			p2Random = true
		}
		resetGame(p1Random, p2Random)

		while (!ended) {
			stepGame()
		}
		// console.log("Winner: " + winner)
		switch(winner) {
			case 1:
				if (!p1Random) {
					smartWins++
				} else {
					randomWins++
				}
				break
			case 2:
				if (!p2Random) {
					smartWins++
				} else {
					randomWins++
				}
				break
			case 3:
				ties++
				break
		}
	}
	document.getElementById("simulationOutput").value = "Smart won " + smartWins + "/" + n + "; Random won " + randomWins + "/" + n + "; Ties: " + ties + "/" + n;
	// document.getElementById("simulationOutput").value = "Smart won " + smartWins + "/" + n + " Random won " + smartWins + "/" + n + " Ties: " + ties "/" + n;
	//console.log("Smart wins: " + smartWins + "\nRandom wins: " + randomWins + "\nTies: " + ties)
	return [smartWins, randomWins, ties]
}

// Jumps page to interactive game info
function help(){
	document.getElementById('help').scrollIntoView()
}

// A text or radio button change will update the console
function consoleChange(){
	var cons = 0
	consoles = ["QnA", "commonKnowledge", "agentKnowledge", "gameRules"]
	for (var i in consoles){
		if (document.getElementById(consoles[i]).checked){
			document.getElementById("console").value = consoleText[consoles[i]]
		}
	}
	document.getElementById("console").scrollTop = document.getElementById("console").scrollHeight
}

// console logging
function log(s, consoleName="QnA"){
	if (consoleName != "QnA"){
		clearlog(consoleName)
	}
	consoleText[consoleName] += (s + "\n")
	consoleChange()
}

// console clearing
function clearlog(consoleName=null){
	if (consoleName == null){
		clearlog("QnA")
		clearlog("commonKnowledge")
		clearlog("agentKnowledge")
	}
	consoleText[consoleName] = "\n"
	consoleChange()
}
