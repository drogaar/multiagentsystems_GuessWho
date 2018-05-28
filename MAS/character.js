class Character {
	constructor(hair, crosseyed, teeth_quantity, name) {
		this.hair = hair
		this.crosseyed = crosseyed
		this.teeth_quantity = teeth_quantity
		this.name = name
	}

	getAttributes() {
		return [this.hair, this.crosseyed, this.teeth_quantity, this.name]
	}

}
