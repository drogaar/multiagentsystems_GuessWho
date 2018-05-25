images = ["hb t2 cy.PNG", "hg t1 cn.PNG", "hr t0 cy.PNG", "hr t1 cn.PNG"];
hair_colours = ["red", "green", "blue"]
teeth_quantities = [0, 1, 2]
crosseyed = [true, false]

var attributes = {}
attributes["hair"] = hair_colours
attributes["crosseyed"] = crosseyed
attributes["teeth"] = teeth_quantities

characters = [];
for (var idx = 0; idx < images.length; ++idx){
	characters.push(str2char(images[idx]));
}

setImages(0);
setImages(1);

num_chars = characters.length;

char1 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];
char2 = characters[Math.floor((Math.random() * num_chars - 1) + 1)];

var p1 = new Player("P1", characters, char1, attributes);
var p2 = new Player("P2", characters, char2, attributes);

console.log("P1's Avatar:", p1.getCharacter());
console.log("P2's Avatar:", p2.getCharacter());



// TODO: see 'Knowledge' class' 'generateBaseKnowledge()' method and its TODO and add the missing knowledge



// Testing part of the script:
console.log("P1's Knowledge:", p1.getKnowledge());

console.log("\nLet's add 'hair:red' for the opponent's avatar!")
p1.addKnowledge("hair:red"); // NOTE: 'addKnowledge' can only add atoms like hair:red -- no implications or anything else

console.log("\nNow let's add 'crosseyed:false' for the opponent's avatar!")
p1.addKnowledge("crosseyed:false");
