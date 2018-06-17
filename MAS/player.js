class Player{
	constructor(name, avatar, random=true){
		this.name = name
		this.avatar = avatar
		this.random = random
	}

	getAvatar(){
		return this.avatar
	}

	// Come up with a question to ask the other player
	askQuestion(knowledge){
		// TODO: ask smarter question
		var questions = ["hair:red", "hair:green", "hair:blue", "teeth:0", "teeth:1", "teeth:2", "crosseyed:true", "crosseyed:false"];
		if (this.random) {
			return questions[Math.floor(Math.random()*questions.length)];
		}
		else {
			if (this.name == "p1") {
				var opponent = "p2"
			}
			else {
				var opponent = "p1"
			}
			var opponentKnowledge = knowledge.getKnowledge(opponent)
			var possibleChars = knowledge.getPossibleCharacters(opponent)

			var bestScore = 0
			var bestScoreQ = 0

			for (var i in questions){
				var question = questions[i]
				var score = 0
				// console.log("QUESTION: " + question)

				var knowledgeCopy = new Knowledge()
				var knowledgeCopyNot = new Knowledge()
				var knowledgeCopySelf = new Knowledge

				knowledgeCopy.knowledge = knowledge.knowledge.slice()
				knowledgeCopyNot.knowledge = knowledge.knowledge.slice()
				knowledgeCopySelf.knowledge = knowledge.knowledge.slice()

				if (knowledgeCopy.knowledge.indexOf("!" + opponent + "." + question) == -1 && knowledgeCopy.knowledge.indexOf(opponent + "." + question) == -1) {
					knowledgeCopy.addKnowledge(opponent + "." + question, false)
					if (!knowledgeCopy.checkConsistency(false)) {
						score = -9999999999
					}
				} else {
					score = -9999999999
				}

				if (knowledgeCopyNot.knowledge.indexOf(opponent + "." + question) == -1 && knowledgeCopyNot.knowledge.indexOf("!" + opponent + "." + question) == -1) {
					knowledgeCopyNot.addKnowledge("!" + opponent + "." + question, false)
					if (!knowledgeCopyNot.checkConsistency(false)) {
						score = -9999999999
					}
				} else {
					score = -9999999999
				}

				knowledgeCopySelf.addKnowledge(this.answerQuestion(question), false)

				var opponentLeft1 = knowledgeCopy.getPossibleCharacters(opponent).length
				var opponentLeft2 = knowledgeCopyNot.getPossibleCharacters(opponent).length
				var playerLeft = knowledgeCopySelf.getPossibleCharacters(this.name).length

				score += playerLeft - Math.abs(opponentLeft1 - opponentLeft2)
				//console.log("QUESTION: " + question + " SCORE: " + score)
				if (score > bestScore) {
					bestScore = score
					bestScoreQ = i
				}
			}

			return questions[bestScoreQ]
		}
	}

	// Answer a question
	answerQuestion(question) {
		var property = question.split(":")[0]
		var value = question.split(":")[1]
		return (this.avatar[property] != value ? "!" : "") + this.name + "." + question

		// if (this.ownCharacter[questionSplit[0]] == questionSplit[1]) {
		// 	return question
		// } else {
		// 	return ("!" + question)
		// }
	}
}
