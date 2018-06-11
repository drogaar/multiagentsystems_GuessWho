// Populate the images on site with the chosen characters
function setImages(playerIdx = 0){
	maxChars = 3;
	for (var idx = 0; idx < Math.min(characters.length, maxChars); ++idx){
		char = characters[idx];
		charname = char2str(char);
		pname = "p" + String(playerIdx) + "_";

		// if(players[playerIdx].possibleCharacters.indexOf(char) == -1)
		if(true)
			charname = charname.substr(0, charname.length-4) + "_ded.jpg";

		document.getElementById(pname + "char" + String(idx+1)).src = "./res/" + charname;
	}
}

// Return the name of a character-image based on a given character
function char2str(char){
	var charname = "";
	charname += "h" + char.hair.substr(0,1) + " ";
	charname += "t" + String(char.teeth).substr(0,1) + " ";
	charname += char.crosseyed == "true" ? "cy" : "cn";
	return charname + ".PNG";
}

// Return a character based on the name of a character-image
function str2char(str, name){
	var hair_dict = {"r":"red", "g":"green", "b":"blue"};

	var attrib_hair = hair_dict[str.substr(1,1)];
	var attrib_teeth = parseInt(str.substr(4,1));
	var attrib_cross = str.substr(7,1) == "y" ? "true" : "false";

	return new Character(attrib_hair, attrib_cross, attrib_teeth, name);
}
