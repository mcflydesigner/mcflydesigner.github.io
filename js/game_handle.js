/*
	* This file is connected to the main page.
	* Here are a lot of different functions and methods for the game handler
*/


var game = -1; //R -> E or E -> R
var currDict = ""; //User dictionary
var gameWork = false; //If the user is in the game, he can press 'enter' and 'shift' in the game
var countword = 9; //Position in the word list
var position = 1; //User have already known words
var allelem = 0; //All words + words where an user makes mistakes 
var beforeend = false; //Preparing for the end of the game
var imgend = ""; //If an user finishes the task, he will see it on last page

//R -> E
var rstart = [];
var rwords = [];
let rcoll = new Map();
let rpfs = new Map();

//E -> R
var estart = [];
var ewords = [];
let ecoll = new Map();
let epfs = new Map();


//Input keys from the user's keyboard
addEventListener("keydown", function(event) {
	switch(event.keyCode) {
		case 13:
			if(gameWork) select_handler();
		break;

		case 16:
			if(gameWork) know_word();
		break;
	}
});



//=============================================================
//Russian -> English
//=============================================================
//Initialize all data from JSON file
function set_data_re(datajson) {
	data = JSON.parse(datajson);

	for(var i = 0; i < data.words.length; i++) {
		window.estart.push(data.words[i][1][0]);
		ecoll.set(data.words[i][1][0], data.words[i][0]);
		var pofs = data.words[i][2];
		switch(pofs) {
			case "verb":
			pofs = ["гл."];
			break;

			case "noun":
			pofs = ["сущ."];
			break;

			case "adj.":
			pofs = ["прил."];
			break;

			case "adv.":
			pofs = ["нар."];
			break;

			case "num.":
			pofs = ["чис."];
			break;

			case "phrase":
			pofs = ["фраза"];
			break;

			default:
			pofs = ["не опр."];
			break;
		}

		epfs.set(data.words[i][1][0], pofs);
	}

	estart.sort(compareRandom);

	//Only ten words are in the list
	if(estart.length >= 10) window.ewords = window.estart.slice(0, 10);
	else window.ewords = window.estart.slice(0, estart.length);

	allelem = estart.length;
}

//Start game
function start_game_re() {
	game = 0;
	document.getElementById("header").style.display = "none";
	document.getElementById("main").style.display = "none";
	document.getElementById("select_game").style.display = "none";
	document.getElementById("word").style.fontWeight = "100";
	$("#faq").fadeOut(1000);
	$("#game").fadeIn(1000);

	set_word_re();
}

//Button "check"
function game_handle_re() {
	var right_answer = ecoll.get(ewords[0]);
	var flag = false;

	if(document.getElementById("us_answer").value.toLowerCase().trim() == right_answer.toLowerCase()) {
		flag = true;
		ewords.push(ewords[0]);
		ewords.shift();
		ewords.sort(compareRandom);
		document.getElementById("us_answer").style.background = "#57CE79";
		document.getElementById("us_answer").style.border = "1px solid #57CE79";
		document.getElementById("us_answer").style.color = "#fff";


		setTimeout(function () {
			set_word_re();
		}, 1500);
	}

	if(!flag) {
		//alert("false");
		//handle mistake
		document.getElementById("us_answer").value = ecoll.get(ewords[0]);
		document.getElementById("us_answer").style.background = "#D63C3C";
		document.getElementById("us_answer").style.border = "1px solid #D63C3C";
		document.getElementById("us_answer").style.color = "#fff";

		ewords.push(ewords[0]);
		allelem += 1;

		setTimeout(function () {
			set_word_re();
		}, 2000);
	} 
}

//Change the word
function set_word_re() {
	//Restart game
	gameWork = true;
	//the end of the list
	if(beforeend) {
		document.getElementById("game").style.display = "none";
		gameWork = false;
		document.getElementById("img_dictionary").src = "https://mcflydesigner.github.io/" + imgend;
		document.body.style.background = "#8E2DE2"; 
		document.body.style.background = "webkit-linear-gradient(to right, #4A00E0, #8E2DE2)";
		document.body.style.background = "linear-gradient(to right, #4A00E0, #8E2DE2)"; 
		document.getElementById("end_text").innerHTML = "You have successfully completed the task \"" + currDict + "\"!";
		$("#end").fadeIn(1000);
		$("#img_dictionary").fadeIn(2000);
	}

	if(position == allelem) {
		beforeend = true;
	}

	document.getElementById("us_answer").focus();
	document.getElementById("us_answer").click();

	document.getElementById("lingvo").href = "https://www.lingvolive.com/ru-ru/translate/en-ru/" + ecoll.get(ewords[0]);
	document.getElementById("forvo").href = "https://ru.forvo.com/word/" + ecoll.get(ewords[0]) + "/#en/";
	document.getElementById("reverso").href = "https://context.reverso.net/перевод/английский-русский/" + ecoll.get(ewords[0]);

	document.getElementById("word").innerHTML = ewords[0];
	document.getElementById("pfs").innerHTML = "(" + epfs.get(ewords[0]) + ")";
	document.getElementById("us_answer").style.background = "none";
	document.getElementById("us_answer").style.border = "1px solid black";
	document.getElementById("us_answer").style.color = "black";
	document.getElementById("us_answer").value = "";
	document.getElementById("counter").innerHTML = position + "/" + allelem;
}

//Button "know"
function know_word() {
	if(game == 1) {
		document.getElementById("us_answer").style.background = "#57CE79";
		document.getElementById("us_answer").style.border = "1px solid #57CE79";
		document.getElementById("us_answer").style.color = "#fff";
		document.getElementById("us_answer").value = rcoll.get(rwords[0]).join(",");
		setTimeout(function () {
			set_word_er();
		}, 1500);
		rwords.shift();
		rwords.sort(compareRandom);
		position++;
		if(rstart[countword + 1] != null && rwords.length < 10) {
			countword++;
			rwords.push(rstart[countword]);
		}
	} else {
		document.getElementById("us_answer").value = ecoll.get(ewords[0]);
		document.getElementById("us_answer").style.background = "#57CE79";
		document.getElementById("us_answer").style.border = "1px solid #57CE79";
		document.getElementById("us_answer").style.color = "#fff";

		setTimeout(function () {
			set_word_re();
		}, 1500);
		ewords.shift();
		position++;

		ewords.sort(compareRandom);
		if(estart[countword + 1] != null && ewords.length < 10) {
			countword++;
			ewords.push(estart[countword]);
		}
	}
}




//=============================================================
//Enlgish -> Russian
//=============================================================
//Initialize all data from JSON file
function set_data_er(datajson) {
	game = 1;
	data = JSON.parse(datajson);

	for(var i = 0; i < data.words.length; i++) {
		window.rstart.push(data.words[i][0]);
		rcoll.set(data.words[i][0], data.words[i][1]);
		rpfs.set(data.words[i][0], data.words[i][2]);
	}

	rstart.sort(compareRandom);

	//Only ten words are in the list
	if(rstart.length >= 10) window.rwords = window.rstart.slice(0, 10);
	else window.rwords = window.rstart.slice(0, rstart.length);

	allelem = rstart.length;
}

//Start game
function start_game_er() {
	document.getElementById("header").style.display = "none";
	document.getElementById("main").style.display = "none";
	document.getElementById("select_game").style.display = "none";
	$("#faq").fadeOut(1000);
	$("#game").fadeIn(1000);
	set_word_er();
}

//Button "check"
function game_handle_er() {
	var right_answers = rcoll.get(rwords[0]);
	var flag = false;

	for(var i = 0; i < right_answers.length; i++) {
		if(document.getElementById("us_answer").value.toLowerCase().trim() == right_answers[i].toLowerCase()) {
			flag = true;

			document.getElementById("us_answer").value = rcoll.get(rwords[0]).join(",");
			document.getElementById("us_answer").style.background = "#57CE79";
			document.getElementById("us_answer").style.border = "1px solid #57CE79";
			document.getElementById("us_answer").style.color = "#fff";

			rwords.push(rwords[0]);
			rwords.shift();
			rwords.sort(compareRandom);

			setTimeout(function () {
				set_word_er();
			}, 1500);

			break;
		}
	}

	if(!flag) {
		//alert("false");
		//handle a mistake
		document.getElementById("us_answer").value = rcoll.get(rwords[0]).join(",");
		document.getElementById("us_answer").style.background = "#D63C3C";
		document.getElementById("us_answer").style.border = "1px solid #D63C3C";
		document.getElementById("us_answer").style.color = "#fff";

		rwords.push(rwords[0]);
		allelem += 1;

		setTimeout(function () {
			set_word_er();
		}, 2000);
	} 
}

//Change the word
function set_word_er() {
	gameWork = true;
	//the end of the list
	if(beforeend) {
		document.getElementById("game").style.display = "none";
		gameWork = false;
		document.getElementById("img_dictionary").src = "https://mcflydesigner.github.io/" + imgend;
		document.body.style.background = "#8E2DE2"; 
		document.body.style.background = "webkit-linear-gradient(to right, #4A00E0, #8E2DE2)";
		document.body.style.background = "linear-gradient(to right, #4A00E0, #8E2DE2)"; 
		document.getElementById("end_text").innerHTML = "You have successfully completed the task \"" + currDict + "\"!";
		$("#end").fadeIn(1000);
		$("#img_dictionary").fadeIn(2000);
	}

	if(position == allelem) {
		beforeend = true;
	}

	document.getElementById("us_answer").focus();
	document.getElementById("us_answer").click();

	document.getElementById("lingvo").href = "https://www.lingvolive.com/ru-ru/translate/en-ru/" + rwords[0];
	document.getElementById("forvo").href = "https://ru.forvo.com/word/" + rwords[0] + "/#en/";
	document.getElementById("reverso").href = "https://context.reverso.net/перевод/английский-русский/" + rwords[0];

	document.getElementById("word").innerHTML = rwords[0];
	document.getElementById("pfs").innerHTML = "(" + rpfs.get(rwords[0]) + ")";
	document.getElementById("us_answer").style.background = "none";
	document.getElementById("us_answer").style.border = "1px solid black";
	document.getElementById("us_answer").style.color = "black";
	document.getElementById("us_answer").value = "";
	document.getElementById("counter").innerHTML = position + "/" + allelem;
}
