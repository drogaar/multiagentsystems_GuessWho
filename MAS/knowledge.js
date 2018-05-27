class Knowledge {

	constructor(characters, attributes, name) {
		this.knowledge = this.generateBaseKnowledge(attributes);
		this.name = name
		// make character knowledge from character attributes
		this.characters = []
		for (var i=0; i<characters.length; i++){
			var character = []
			character.push("hair:" + characters[i].hair)
			character.push("crosseyed:" + characters[i].crosseyed)
			character.push("teeth:" + characters[i].teeth_quantity)
			this.characters.push(character)
		}
	}


	// Adds knowledge to the knowledge base and tries to prove new facts and characters from this
	add(k, depth=0){
		console.log("  ".repeat(depth), "ADDED KNOWLEDGE", k)
		for (var i=0; i<this.knowledge.length; i++){
			var piece = this.knowledge[i]
			if (piece.includes(" -> ")) { // Implication found!
				//console.log("  ".repeat(depth), "IMPLICATION", piece)
				if (k == this.knowledge[i].split(" -> ")[0]) { // Modus ponens applies; add more knowledge!
					var post = this.knowledge[i].split(" -> ")[1]
					console.log("  ".repeat(depth), "MODUS PONENS", k, "YIELDS", post)
					this.add(post, depth+1)
				}
				var post = this.knowledge[i].split(" -> ")[1]
			} else if (depth==0) { // propositional atom found!
				console.log("K("+this.name+")", this.knowledge[i])
			}
		}
		// Add the new knowledge to the KB
		this.knowledge.push(k) // add the knowledge
		//console.log("K("+this.name+")", k) TODO: fix the fact that this print yields duplicate prints (note that the knowledge base is just fine, it's literally just an issue with printing) -- without this statement it just doesn't print the new knowledge until the next addition.

		// Update knowledge about opponent's potential characters
		return this.validateCharacters(this.knowledge, this.characters)
	}

	// Check for a character if it is consistent with the knowledge
	checkCharacter(char, knowledge) {
		for (var j = 0; j < char.length; j++) {
			var attribute = char[j];
			if (!knowledge.includes(attribute)) {
				return false
			}
		}
		return true
	}

	// Validates whether each character can be proven or refuted with set of knowledge
	validateCharacters(knowledge, characters){
		for (var i=0; i<this.characters.length; i++){
			char = this.characters[i];
			if (this.checkCharacter(char, knowledge)) {
				console.log("char found: " + char)
				return char
			}
			// TODO: afterwards, check whether all char characteristics have been refuted in the knowledge (so we can cross off the char)
		}
		return null // TODO.
	}


	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes){

		// TODO: missing type of knowledge:   <<  !hair:blue ^ !hair:green -> hair:red  >>

		var base_knowledge = [];
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
		return base_knowledge
	}


	toString(){
		return String(this.knowledge)
	}

}
