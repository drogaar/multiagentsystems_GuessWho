var p1 = new Player();

images = ["hb t2 cy.jpg", "hg t1 cn.jpg", "hr t0 cy.jpg", "hr t1 cn.jpg"];
hair_colours = ["red", "green", "blue"]
teeth_quantities = [0, 1, 2]
crosseyed = [true, false]

var attributes = {}
attributes.hair = hair_colours
attributes.crosseyed = crosseyed
attributes.teeth = teeth_quantities


characters = [];
for (var idx = 0; idx < images.length; ++idx){
	characters.push(str2char(images[idx]));
}

setImages(0);
setImages(1);

console.log(characters)

num_chars = characters.length;

char1 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];
char2 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];

var p1 = new Player(characters, char1, attributes);
var p2 = new Player(characters, char2, attributes);

console.log(p1.getCharacter());
console.log(p2.getCharacter());
