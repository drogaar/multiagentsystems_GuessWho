class Player{
	constructor(characters, own_char, attributes){
		this.own_character = own_char;
		this.characters
		this.knowledge = new Knowledge(attributes); // Note: a list of possibilities for the opponent's character is implicitly found in the knowledge base
	}

	get_character(){
		return this.own_character;
	}

	// adds a string of knowledge to the player's knowledge base
	add_knowledge(k){
		knowledge.add(k)
	}

}
