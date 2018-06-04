class Knowledge {

	constructor() {
		this.knowledge = [];
		this.rules = this.generateBaseKnowledge(attributes, characters);
	}


	// Adds knowledge to the knowledge base and tries to prove new facts and characters from this
	// knowledge is like "K1K2(p1.hair:red)"
	addKnowledge(knowledge){

		// Add the initial piece of knowledge
		if (!this.knowledge.includes(knowledge)){
			this.knowledge.push(knowledge)
		}

		// Prove new knowledge for the agents
		var start = knowledge.substring(0, knowledge.lastIndexOf('(')+1) // start of logical string: ['K1(', 'K2K1(']
		var avatar = knowledge.substring(knowledge.lastIndexOf('(')+1, knowledge.indexOf('.')+1) // avatar in logical string: ['p1.', '!p2.']
		var bareKnowledge = knowledge.substring(knowledge.lastIndexOf(".")+1, knowledge.indexOf(")")); // the bare knowledge: [hair:red, bob, !crosseyed:true]
		var end = knowledge.substring(knowledge.indexOf(')'), knowledge.length) // end of logical string [')', '))']

		// Prove and add new knowledge
		var newKnowledge = this.prove((avatar[0]=='!' ? '!' : '') + bareKnowledge, start) // prove e.g. '!crosseyed:true'
		for (var i in newKnowledge){
			var k = newKnowledge[i] // e.g. 'crosseyed:false'
			//console.log("    newly proven: " + k)

			// Put the proved proposition back into a logical string
			if (k[0] == '!'){ // e.g. '!hair:blue'
				if (avatar[0] == '!'){ // e.g. '!p2.!hair:blue'
					k = (start + avatar + k + end).replace('!', '') // remove double negation
				} else { // e.g. p1.!hair:blue
					k = start + '!' + avatar + k.replace('!', '') + end // change position of the negation
				}
			} else {
				k = start + avatar.replace('!', '') + k + end
			}
			// Add the new piece of knowledge
			if (!this.knowledge.includes(k)){
				this.addKnowledge(k)
			}
		}
		this.checkConsistency()
	}

	// Adds to the knowledge base using latest piece of knowledge
	// Assumes that everything that could have been proven has been proven, except for the new piece of knowledge (recursive nature using addKnowledge() keeps this assumption true)
	// <k> is a proposition ['hair:red', 'bob', ...]; <start> is the initial part of the proposition ['K1(', 'K1K2(', ...]
	prove(k, start){
		var newKnowledge = []
		for (var i in this.rules){
			var rule = this.rules[i]
			var antecedent = rule.split(" -> ")[0]
			var consequent = rule.split(" -> ")[1]

			// Check conjunction
			if (antecedent.includes(" ^ ")){
				var conjuncts = antecedent.split(" ^ ")
				var satisfied = true // whether all conjuncts are satisfied in the knowledge base
				// loop through the conjuncts
				for (var j in conjuncts){
					var conjunct = conjuncts[j].replace('(', '').replace(')', '')
					// loop through all knowledge items
					for (var l in this.knowledge){
						var subSatisfied = false // whether a single conjunct is satisfied
						var item = this.knowledge[l] // e.g. 'K1(!p2.hair:red)'
						if (item.startsWith(start)) { // item is knowledge of the appropriate player
							var stripped = (item.includes('!') ? '!' : '') + item.substring(item.indexOf('.')+1, item.indexOf(')')) // turn 'K1(!p2.hair:red)' into '!hair:red'
							if (stripped == conjunct){
								subSatisfied = true
								break
							}
						}
					}
					// conjunction is not satisfied if any conjunct is not satisfied
					if (!subSatisfied){
						satisfied = false
						break
					}
				}
				if (satisfied){
					newKnowledge.push(consequent)
				}

			// Check simple implication
			} else {
				if (k == antecedent){
					newKnowledge.push(consequent)
				}
			}
		}
		return newKnowledge
	}

	// Prints a warning as soon as the knowledge base contains a contradiction
	checkConsistency(){
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
				//console.log(a + "   " + b)
				if (a[0] == b[0] && a[1] != b[1]){
					console.warn("WARNING: contradiction in KB.\n" + this.knowledge[i] + "\n" + this.knowledge[j])
				}
			}
		}
	}

	// Returns string format for character attributes
	generateCharInfo(attributes) {
		return ("(hair:" + attributes[0] + " ^ " + "crosseyed:" + attributes[1]
			+ " ^ " + "teeth:" + attributes[2] + ") -> " + attributes[3]);
	}

	// Returns the knowledge that corresponds with the set of rules for the game
	generateBaseKnowledge(attributes, characters){
		var baseKnowledge = [];

		// All possibilites with disjunction -- unused, for now
		// for (var attribute in attributes) {
		// 	var k = attribute + ":" + attributes[attribute][0];
		// 	for (var i = 1; i < attributes[attribute].length; i++) {
		// 		k += " v " + attribute + ":" + attributes[attribute][i];
		// 	}
		// 	baseKnowledge.push(k);
		// }

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
				var temp_str = "";
				for (var j = 0; j < attributes[attribute].length; j++) {
					if (i != j) {
						temp_str += "!" + attribute + ":" + attributes[attribute][j] + " ^ ";
					}
				}
				// remove last and
				temp_str = temp_str.substring(0, temp_str.length - 3);
				// add parentheses
				if (attributes[attribute].length > 2) {
					temp_str = "(" + temp_str + ")"
				}
				temp_str += " -> " + attribute + ":" + attributes[attribute][i];
				baseKnowledge.push(temp_str)
			}
		}

		// hair:red and crosseyed:true and teeth:0 implies peter
		for (var character in characters) {
			baseKnowledge.push(this.generateCharInfo(characters[character].getAttributes()));
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
			var temp_str = "";
			for (var j = 0; j < characters.length; j++) {
				if (i != j) {
					temp_str += "!" + characters[j].getAttributes()[3] + " ^ "
				}
			}
			// remove last and
			temp_str = temp_str.substring(0, temp_str.length - 3);
			// add parentheses
			temp_str = "(" + temp_str + ")"
			temp_str += " -> " + characters[i].getAttributes()[3]
			baseKnowledge.push(temp_str)
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

	// Print only the obtained knowledge, not the rules / implications
	toString(){
		return this.knowledge.join(" ^ ")
	}

}
