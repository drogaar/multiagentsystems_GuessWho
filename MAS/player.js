class Player{
	constructor(name, avatar){
		this.name = name
		this.avatar = avatar
	}

	getAvatar(){
		return this.avatar
	}

	// Come up with a question to ask the other player
	askQuestion(){
		// TODO: ask smarter question
		return "hair:red"
	}

	// Answer a question
	answerQuestion(ownKnowledge, question) {
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
