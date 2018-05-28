class Knowledge {

	constructor() {
		this.knowledge = [];
		this.rules = this.generateBaseKnowledge(attributes, characters);
	}


	// Adds knowledge to the knowledge base and tries to prove new facts and characters from this
	addKnowledge(player, knowledge){
		var playerNum = player + 1 // Note the difference between 'playerNum' and 'player'
		var opponentNum = ((player) % 2) + 1

		// Rephrase knowledge and add what can be proven for the player
		var pre = this.knows(playerNum, knowledge)
		var post = this.prove(playerNum, pre)
		for (var i=0; i<post.length; ){
			if (!this.knowledge.includes(post[i])){
				this.knowledge.push(post[i])
			}
		}
		if (!this.knowledge.includes(pre)){
			this.knowledge.push(pre)
		}

		// TODO: add K[other](K[agent](knowledge))
		// TODO: with rules, add more knowledge
	}

	// Adds to the knowledge base using latest information
	prove(playerNum, pre){
		// TODO: make recursive
		var post = []
		// TODO: figure out how the function should look based on what addKnowledge should do -->
		// prove things that you know the opponent knows using K[player](K[opponent](...))???
		return post
	}

	// Returns the string for someone knowing something (e.g. K1(p1.hair:red))
	knows(player, knowledge){
		return "K" + player + "(" + knowledge + ")"
	}

	// Returns string format for character attributes
	generateCharInfo(attributes) {
		return ("hair:" + attributes[0] + " ^ " + "crosseyed:" + attributes[1]
			+ " ^ " + "teeth:" + attributes[2] + "->" + attributes[3]);

	}
	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes, characters){
		var baseKnowledge = [];

		for (var attribute in attributes) {
			var k = attribute + ":" + attributes[attribute][0];
			for (var i = 1; i < attributes[attribute].length; i++) {
				k += " v " + attribute + ":" + attributes[attribute][i];
			}
			baseKnowledge.push(k);
		}

		for (var attribute in attributes) {
			for (var i = 0; i < attributes[attribute].length; i++) {
				for (var j = 0; j < attributes[attribute].length; j++) {
					if (i != j) {
						baseKnowledge.push(
							attribute + ":" + attributes[attribute][i] +
							" -> !" + attribute + ":" + attributes[attribute][j])
					}
				}
			}
		}

		// TODO: not hair green and not hair blue implies hair red
		// TODO: add/fix parentheses: (a ^ b) -> !c

		for (var character in characters) {
			baseKnowledge.push(this.generateCharInfo(characters[character].getAttributes()));
		}

		//console.log(baseKnowledge)
		return baseKnowledge;
	}



	// Returns knowledge either as subset for an agent or as a whole
	getKnowledge(player=null){
		if(player==null){
			return this.knowledge.toString()
		}
		else{
			// TODO: take subset of knowledge
			var subset = []
			for (var i=0; i<this.knowledge.length; i++){
				var k = this.knowledge[i]
				if(k.startsWith("K"+player+"(")){
					k = k.substring(k.lastIndexOf("(")+1,k.lastIndexOf(")"))
					//console.log("  Found: " + k)
					subset.push(k)
				}
			}
			return subset
		}
	}

	// String representation should not include implications, since that's too much
	toString(){
		return String(this.knowledge)
	}

}
