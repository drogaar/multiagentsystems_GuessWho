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
		var randomQuestions = ["hair:red", "hair:green", "hair:blue", "teeth:0", "teeth:1", "teeth:2", "crosseyed:true", "crosseyed:false"]
		return randomQuestions[Math.floor(Math.random()*randomQuestions.length)]
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
