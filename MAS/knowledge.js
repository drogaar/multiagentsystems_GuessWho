class Knowledge {

	constructor(characters) {
		this.knowledge = ["hair:red->!hair:green", "hair:red->!hair:blue"];
		this.characters = []
		for var i=0; i<this.knowledge.length; i++){ // make character knowledge from character attributes
			character = []
			character.push(characters[i].hair)
		}
		console.log(characters)
	}

	// Adds knowledge to the knowledge base and tries to prove characters from this
	add_knowledge(k){
		// TODO: try to prove new things with new knowledge
		//for (var i=0; i<this.knowledge.length; i++){

		//}

		this.knowledge.push(k); // add the knowledge

		// TODO: return possible characters
	}

	generate_base_knowledge(attributes){
		base_knowledge = [];
		for (var attribute in attributes) {
			for (var i = 0; i < attributes[attribute].length; i++) {
				for (var j = 0; j < attributes[attribute].length; j++) {
					if (i != j) {
						base_knowledge.push(
							attribute + ":" + attributes[attribute][i] +
							"->!" + attribute + ":" + attributes[attribute][j])
					}
				}
			}
		}
		return base_knowledge
	}

}
