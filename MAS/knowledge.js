class Knowledge {

	constructor() {
		this.knowledge = []
		this.rules = this.generateBaseKnowledge(attributes, characters)
	}


	// Adds knowledge to the knowledge base and tries to prove new facts from this
	// knowledge is like "!p1.hair:red"
	addKnowledge(knowledge, warnConsole=true){
		// Add the initial piece of knowledge
		if (!this.knowledge.includes(knowledge)){
			this.knowledge.push(knowledge)
		}

		var negation = false // truth value of input knowledge; used for separation
		var avatar = knowledge.split(".")[0] + "."
		if (knowledge.includes('!')){
			negation = !negation
			avatar = avatar.substring(1, avatar.length)
		}
		var bareKnowledge = knowledge.split(".")[1]
		var toProve = (negation ? '!' : '') + bareKnowledge

		// Prove and add new knowledge
		var newKnowledge = this.prove(toProve, avatar) // prove e.g. '!crosseyed:true'
		for (var i in newKnowledge){
			var k = newKnowledge[i] // e.g. '!hair:red'

			if (k.includes('!')){ // proved item contains a negation: place it appropriately before the avatar indicator
				k = k.replace('!', '')
				k = '!' + avatar +  k
			} else { // no negation: simply place avatar before item
				k = avatar + k
			}

			//console.log("    proven: " + knowledge + " -> " + k)

			// Add the new piece of knowledge
			if (!this.knowledge.includes(k)){
				this.addKnowledge(k)
			}
		}
		this.checkConsistency(warnConsole)
		return this.checkEndGame()
	}

	// Adds to the knowledge base using latest piece of knowledge
	// Assumes that everything that could have been proven has been proven, except for the new piece of knowledge (recursive nature using addKnowledge() keeps this assumption true)
	// <k> is a proposition ['hair:red', 'bob', ...]; <start> is the initial part of the proposition ['K1(', 'K1K2(', ...]
	prove(k, avatar){
		var newKnowledge = []
		for (var i in this.rules){
			var rule = this.rules[i]
			var antecedent = rule.split(" -> ")[0]
			var consequent = rule.split(" -> ")[1]

			// only check rules where the consequent are not yet in the knowledge base
			if (!this.knowledge.includes(avatar + consequent)){

				// check conjunction
				if (antecedent.includes(" ^ ")){
					var conjuncts = antecedent.split(" ^ ")
					var satisfied = true // whether all conjuncts are satisfied in the knowledge base
					// loop through the conjuncts
					for (var j in conjuncts){
						var conjunct = conjuncts[j].replace('(', '').replace(')', '')
						// loop through all knowledge items
						for (var l in this.knowledge){
							var subSatisfied = false // whether a single conjunct is satisfied
							var item = this.knowledge[l] // e.g. '!p2.hair:red'

							// if item matches conjunct and truth value ('!') matches, then it is found
							// TODO: fix potential issues with the following:

							// change '!p2.hair:red' to '!hair:red'
							var avatarCheck = null
							if (item[0]=='!'){
								avatarCheck = item.substring(1, 4)
								item = '!' + item.split('.')[1]
							} else {
								avatarCheck = item.substring(0, 3)
								item = item.split('.')[1]
							}

							if (avatar == avatarCheck && item == conjunct){
								//console.log("      found true: " + conjunct)
								subSatisfied = true
								break
							}
						}
						// conjunction is not satisfied if any conjunct is not satisfied
						if (!subSatisfied){
							satisfied = false
							break
						}
					}
					if (satisfied){
						//console.log("Satisfied: " + rule)
						newKnowledge.push(consequent)
					}

				// Check simple implication
				} else {
					if (k == antecedent){
						newKnowledge.push(consequent)
					}
				}
			}
		}
		return newKnowledge
	}

	checkEndGame(){
		for (var i in this.knowledge){
			if (!this.knowledge[i].includes(':') && !this.knowledge[i].includes('!')){
				return true
			}
		}
		return false
	}

	// Returns the first avatar that has been proven (requires the game to not be a tie)
	getLosingAvatar(){
		for (var i in this.knowledge){
			// losing avatar found when a char is found and it is not a negation
			if (!this.knowledge[i].includes(':') && !this.knowledge[i].includes('!'))
				return this.knowledge[i].split('.')[1]
		}
		return null // no winning character found
	}

	// Prints a warning as soon as the knowledge base contains a contradiction
	checkConsistency(warnConsole=false){
		for (var i in this.knowledge){
			var a = [this.knowledge[i]]
			if (a.toString().includes('!')){
				a[0] = a[0].replace('!', '')
				a.push(true)
			} else {
				a.push(false)
			}
			for (var j in this.knowledge){
				var b = [this.knowledge[j]]
				if (b.toString().includes('!')){
					b[0] = b[0].replace('!', '')
					b.push(true)
				} else {
					b.push(false)
				}
				if (a[0] == b[0] && a[1] != b[1]){
					if (warnConsole){
						console.warn("WARNING: contradiction in KB.\n" + this.knowledge[i] + "\n" + this.knowledge[j])
					}
					return false
				}
			}
		}
		return true
	}

	// Returns string format for character attributes
	generateCharInfo(attributes) {
		return ("(hair:" + attributes[0] + " ^ " + "crosseyed:" + attributes[1]
			+ " ^ " + "teeth:" + attributes[2] + ") -> " + attributes[3])
	}

	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes, characters){
		var baseKnowledge = []

		// Attribute implies not other attributes
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

		// not attribute1 implies attribute2
		for (var attribute in attributes) {
			for (var i = 0; i < attributes[attribute].length; i++) {
				var temp_str = ""
				for (var j = 0; j < attributes[attribute].length; j++) {
					if (i != j) {
						temp_str += "!" + attribute + ":" + attributes[attribute][j] + " ^ "
					}
				}
				// remove last and
				temp_str = temp_str.substring(0, temp_str.length - 3)
				// add parentheses
				if (attributes[attribute].length > 2) {
					temp_str = "(" + temp_str + ")"
				}
				temp_str += " -> " + attribute + ":" + attributes[attribute][i]
				baseKnowledge.push(temp_str)
			}
		}

		// hair:red and crosseyed:true and teeth:0 implies peter
		for (var character in characters) {
			baseKnowledge.push(this.generateCharInfo(characters[character].getAttributes()))
		}

		// Not hair:red -> not bob
		for (var character in characters) {
			attributes = characters[character].getAttributes()
			baseKnowledge.push("!hair:" + attributes[0] + " -> !" + attributes[3])
			baseKnowledge.push("!crosseyed:" + attributes[1] + " -> !" + attributes[3])
			baseKnowledge.push("!teeth:" + attributes[2] + " -> !" + attributes[3])
		}

		// not char1 and not char2 and not char3 implies char4
		for (var i = 0; i < characters.length; i++) {
			var temp_str = ""
			for (var j = 0; j < characters.length; j++) {
				if (i != j) {
					temp_str += "!" + characters[j].getAttributes()[3] + " ^ "
				}
			}
			// remove last and
			temp_str = temp_str.substring(0, temp_str.length - 3)
			// add parentheses
			temp_str = "(" + temp_str + ")"
			temp_str += " -> " + characters[i].getAttributes()[3]
			baseKnowledge.push(temp_str)
		}

		return baseKnowledge
	}

	// Returns knowledge either as subset for an agent or as a whole
	getKnowledge(player=null){
		if (player==null) {
			return this.knowledge
		}
		else {
			var subset = []
			for (var i in this.knowledge) {
				if (this.knowledge[i].includes(player)) {
					subset.push(this.knowledge[i])
				}
			}
			return subset
		}
	}

	// Get the characters which have not been refuted
	getPossibleCharacters(player) {
		var possibleChars = [];
		for (var i in characters) {
			if (this.knowledge.indexOf("!" + player + "." + characters[i]["name"]) < 0) {
				possibleChars.push(characters[i])
			}
		}
		return possibleChars
	}

	// Get printable agent knowledge
	getAgentKnowledge(){
		var agentKnowledge = []
		for (var i in this.knowledge){
			var k = this.knowledge[i]
			agentKnowledge.push("K1(" + k + ")")
			agentKnowledge.push("K2(" + k + ")")
			agentKnowledge.push("K1(K2(" + k + "))")
			agentKnowledge.push("K2(K1(" + k + "))")
		}
		return agentKnowledge.sort().join("\n")
	}

	// Get printable common knowledge
	getCommonKnowledge(){
		//sorted: return this.knowledge.sort().join("\n")
		return this.knowledge.join("\n")
	}

	// Print only the obtained knowledge, not the rules / implications
	toString(){
		return this.knowledge.sort().join("\n")

		// alternative representation (CNF of the above):
		//return this.knowledge.join(" ^ ")


	}

}
