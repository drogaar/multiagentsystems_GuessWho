class Knowledge {

	constructor() {
		this.knowledge = [];
		this.rules = this.generateBaseKnowledge(attributes, characters);
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

	generateAgentInfo(attributes) {
		return ("hair:" + attributes[0] + "&" + "crosseyed:" + attributes[1]
			+ "&" + "teeth:" + attributes[2] + "->" + attributes[3]);

	}
	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes, characters){
		var base_knowledge = [];
		
		for (var attribute in attributes) {
			var k = attribute + ":" + attributes[attribute][0];
			for (var i = 1; i < attributes[attribute].length; i++) {
				k += "|" + attribute + ":" + attributes[attribute][i];
			}
			base_knowledge.push(k);
		}

		for (var attribute in attributes) {
			for (var i = 0; i < attributes[attribute].length; i++) {
				for (var j = 0; j < attributes[attribute].length; j++) {
					if (i != j) {
						base_knowledge.push(
							attribute + ":" + attributes[attribute][i] +
							" -> !" + attribute + ":" + attributes[attribute][j])
					}
				}
			}
		}

		// TODO: not hair green and not hair blue implies hair red

		for (var character in characters) {
			base_knowledge.push(this.generateAgentInfo(characters[character].getAttributes()));
		}

		console.log(base_knowledge)
		return base_knowledge;
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
