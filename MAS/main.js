var p1 = new Player();

images = ["hb t2 cy.PNG", "hg t1 cn.PNG", "hr t0 cy.PNG", "hr t1 cn.PNG"];
hair_colours = ["red", "green", "blue"]
teeth_quantities = [0, 1, 2]
crosseyed = [true, false]

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

console.log(p1.get_character());
console.log(p2.get_character());
