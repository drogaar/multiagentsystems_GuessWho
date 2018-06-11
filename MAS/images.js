function arrContains(arr, element){
	for(var i=0; i != arr.length; ++i)
		if(arr[i] === element)
			return true;
	return false;
}

// Populate the images on site with the chosen characters
function setImages(playerIdx = 0, database){
	maxChars = 3;
	for (var idx = 0; idx < Math.min(characters.length, maxChars); ++idx){
		char = characters[idx];
		charname = char2str(char);
		pname = "p" + String(playerIdx) + "_";

    // proposition: either lil_timmy, peter or ..
		var propositiontrue = "p" + playerIdx.toString() + "." + char.name;
		var propositionfalse = "p" + playerIdx.toString() + ".!" + char.name;

    // form image name
		charname = "notfound.jpg";
		if(arrContains(database.getKnowledge(playerIdx), propositiontrue))
			console.log("check prop: " + proposition);
			charname = charname.substr(0, charname.length);
		if(arrContains(database.getKnowledge(playerIdx), propositionfalse))
			console.log("check prop: " + propositionfalse);
			charname = charname.substr(0, charname.length-4) + "_ded.jpg";

		console.log("charname: " + charname);
		document.getElementById(pname + "char" + String(idx+1)).src = "./res/" + charname;
	}
}

// Return the name of a character-image based on a given character
function char2str(char){
	var charname = "";
	charname += "h" + char.hair.substr(0,1) + " ";
	charname += "t" + String(char.teeth).substr(0,1) + " ";
	charname += char.crosseyed == "true" ? "cy" : "cn";
	return charname + ".jpg";
}

function str2char(str, name){
	// Return a character based on the name of a character-image
	var hair_dict = {"r":"red", "g":"green", "b":"blue"};

	var attrib_hair = hair_dict[str.substr(1,1)];
	var attrib_teeth = parseInt(str.substr(4,1));
	var attrib_cross = str.substr(7,1) == "y" ? "true" : "false";

	return new Character(attrib_hair, attrib_cross, attrib_teeth, name);
}
