class Character {
	constructor(hair, crosseyed, teeth_quantity) {
		this.hair = hair
		this.crosseyed = crosseyed
		this.teeth_quantity = teeth_quantity
	}
}


class Player {
	constructor(character) {
		this.character = character;

	}

	get_character() {
		return this.character;
	}

}

var p1 = new Player();


hair_colours = ["red", "green", "blue"]
crosseyed = [true, false]
teeth_quantities = [0, 1, 2]

characters = [];

for(var i = 0; i < hair_colours.length; i++){
	for(var j = 0; j < crosseyed.length; j++){
		for(var k = 0; k < teeth_quantities.length; k++){
			char = new Character(hair_colours[i], crosseyed[j], teeth_quantities[k]);
			characters.push(char)
		}
	}
}

function setImages(){
	function char2str(char){
		charname = "";
		charname += "h" + char.hair.substr(0,1) + " ";
		charname += "t" + str(char.teeth_quantity).substr(0,1) + " ";
		charname += char.crosseyed ? "cy" : "cn";
		return charname;
	}

	for (var idx = 0; idx != characters.length; ++idx){
		char = characters[idx];
		charname = char2str(char);
		document.getElementById("char" + str(id)).src = "./res/" + charname;
	}
}

console.log(characters)

num_chars = characters.length;

char1 = Math.floor((Math.random() * num_chars - 1) + 1);
char2 = Math.floor((Math.random() * num_chars - 1) + 1);

console.log(char1);
console.log(char2);

var p1 = new Player(characters[char1]);
var p2 = new Player(characters[char2]);

console.log(p1.get_character());
console.log(p2.get_character());
