// check if an array contains given element
function arrContains(arr, element){
	for(var i=0; i < arr.length; ++i)
		if(arr[i] === element)
			return true;
	return false;
}

// 0: noone won. 1: player 1 won. 2: player 2 won. 3:both players won.
function whoWon(knowledge){
	var playerWhoWon = 0;

	for(var playerIdx = 0; playerIdx != players.length; ++playerIdx)
		for(let char of characters){
			var provenCharacter = "p" + (playerIdx + 1).toString() + "." + char.name;
			if(arrContains(knowledge, provenCharacter)){
				// someone already won. It is a tie.
				if(playerWhoWon != 0)
					return 3;

        // If an avatar is proven, the opposing player wins
				playerWhoWon = 3 - playerIdx + 1;
			}
		}

	return playerWhoWon;
}

// Populate the images for a player with the possible characters
function setPlayerImages(playerIdx = 0, knowledge){
	for (var idx = 0; idx < characters.length; ++idx){
		char = characters[idx];
		charname = char2str(char);
		elementName = "p" + String(playerIdx) + "_char" + String(idx+1);

    // proposition: either p1.lil_timmy, p1.!peter or ..
		var notPossible = "!p" + (playerIdx + 1).toString() + "." + char.name;

    // image name, depending on whether this character is still possible
		charname = charname.substr(0, charname.length);
		if(arrContains(knowledge, notPossible))
			charname = charname.substr(0, charname.length-4) + "_ded.jpg";

    // Draw proper characters and add border if its the players chosen avatar
		document.getElementById(elementName).src = "./res/" + charname;
		if(char === players[playerIdx].getAvatar()){
			document.getElementById(elementName).style.border = "1px solid rgb(0,0,0)";
			document.getElementById(elementName).style.borderRadius = "25%";
		}
		else
			document.getElementById(elementName).style.border = "";
	}
}

// update the game view
function setView(knowledge){
	// show proper characters/avatars.
	for(var playerIdx = 0; playerIdx != players.length; ++playerIdx)
		setPlayerImages(playerIdx, knowledge)

	// change field as someone won
	winningPlayer = whoWon(knowledge);
	if(!winningPlayer)
		document.getElementById("arena").style.backgroundImage = "url(./res/bg.jpg)";

	else if (winningPlayer == 3)
		document.getElementById("arena").style.backgroundImage = "url(./res/bg_tie.jpg)";

	else if (winningPlayer){
		var bg_string = './res/bg_win' + winningPlayer + '.jpg';
		document.getElementById("arena").style.backgroundImage = "url(" + bg_string + ")";
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
