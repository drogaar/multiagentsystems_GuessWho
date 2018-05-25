class Player{
	constructor(characters, own_char, attributes){
		this.own_character = own_char;
		this.characters;
		this.knowledge = new Knowledge(characters, attributes);

		console.log("Knowledge: " + this.knowledge)
	}

	getCharacter(){
		return this.own_character;
	}

	// adds a string of knowledge to the player's knowledge base
	addKnowledge(k){
		this.knowledge.add(k)
	}

}
