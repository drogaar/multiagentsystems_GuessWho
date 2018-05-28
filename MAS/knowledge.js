class Knowledge {

	constructor(attributes) {
		this.knowledge = [];
		this.rules = this.generateBaseKnowledge(attributes);
	}


	// Adds knowledge to the knowledge base and tries to prove new facts and characters from this
	add(agent, other, knowledge){
		// TODO: add "K[agent](knowledge)"
		// TODO: add K[other](K[agent](knowledge))
		// TODO: with rules, add more knowledge
	}

	// Check for a character if it is consistent with the knowledge
	checkCharacter(char, knowledge) {
		// TODO.
	}

	// Validates whether each character can be proven or refuted with set of knowledge
	validateCharacters(knowledge, characters){
		// TODO.
	}


	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes){
		// TODO.
	}

	// Returns knowledge either as subset for an agent or as a whole
	getKnowledge(agent=null){
		if(agent==null){
			return this.knowledge.toString()
		}
		else{
			// TODO: take subset of knowledge

		}
	}


	toString(){
		return String(this.knowledge)
	}

}
