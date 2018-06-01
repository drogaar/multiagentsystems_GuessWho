class Character {
	constructor(hairColour, crossEyed, teethQuantity, name) {
		this.hair = hairColour
		this.crosseyed = crossEyed
		this.teeth = teethQuantity
		this.name = name
	}

	getAttributes() {
		return [this.hair, this.crosseyed, this.teeth, this.name]
	}

	toString() {
		//return this.name + ": " + ", ".join()
		return this.name + this.getAttributes()
	}

}
