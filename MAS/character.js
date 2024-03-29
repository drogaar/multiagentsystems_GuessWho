class Character {
	constructor(hairColour, crossEyed, teethQuantity, name) {
		this.hair				= hairColour
		this.crosseyed	= crossEyed
		this.teeth			= teethQuantity
		this.name				= name
	}

	getAttributes() {
		return [this.hair, this.crosseyed, this.teeth, this.name]
	}

	toString() {
		//return this.name + ": " + ", ".join()
		return "(" + "hair:"+this.hair + ", crosseyed:"+this.crosseyed + ", teeth:"+this.teeth + ")"
	}

	equal(character){
		return 	this.hair				== character.hairColour			&&
						this.crosseyed	== character.crossEyed			&&
						this.teeth			== character.teethQuantity	&&
						this.name				== character.name;
	}

}
