class Player{
	constructor(name, characters, own_char, attributes){
		this.name = name
		this.own_character = own_char
		this.characters = characters
		this.knowledge = new Knowledge(characters, attributes, name)
	}

	getCharacter(){
		return this.own_character
	}

	getKnowledge(){
		return this.knowledge
	}

	// adds a string of knowledge to the player's knowledge base
	addKnowledge(k){
		this.knowledge.add(k)
	}

}
