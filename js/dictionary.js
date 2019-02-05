/* 
	* This file is connected to main page
	* Send POST request to file with a dictionary
	* !JSON! 
*/

//We get all words from a dictionary
//Dictionary is a JSON file
var jsonFile = new XMLHttpRequest();
var url = "https://mcflydesigner.github.io/words/";

//Initialize all words from JSON file
jsonFile.onreadystatechange = function() {
	if (jsonFile.readyState == 4 && jsonFile.status == 200) {
  		//alert(jsonFile.responseText);
  		set_data_er(jsonFile.responseText);
  		set_data_re(jsonFile.responseText);
  	}
  }

//View all dictionaries for user
function select_dictionary(dictionary) {
	switch(dictionary) {
		case "100 basic verbs":
			currDict = "100 basic verbs";
			window.url += "100_verbs.json";
			window.imgend = document.getElementById("img_dict_100verbs").getAttribute('src');
		break;

		case "100 basic adjectives":
			currDict = "100 basic adjectives";
			window.url += "100_adjectives.json";
			window.imgend = document.getElementById("img_dict_100adj").getAttribute('src');
		break;

		case "100 basic nouns":
			currDict = "100 basic nouns";
			window.url += "100_nouns.json";
			window.imgend = document.getElementById("img_dict_100nouns").getAttribute('src');
		break;

		case "everyday things":
			currDict = "Everyday things";
			window.url += "everyday_things.json";
			window.imgend = document.getElementById("img_everyday_things").getAttribute('src');
		break;

		case "business":
			currDict = "business";
			window.url += "business.json";
			window.imgend = document.getElementById("img_business").getAttribute('src');
		break;

		case "body":
			currDict = "human body parts";
			window.url += "body.json";
			window.imgend = document.getElementById("img_body").getAttribute('src');
		break;

		case "appearance":
			currDict = "appearance and character";
			window.url += "appearance.json";
			window.imgend = document.getElementById("img_appearance").getAttribute('src');
		break;
			
		case "english_tomorrow":
			currDict = "tomorrow's English";
			window.url += "english_tomorrow.json";
			window.imgend = document.getElementById("img_appearance").getAttribute('src');
		break;
			
		case "homework":
			currDict = "homework";
			window.url += "homework.json";
			window.imgend = document.getElementById("img_appearance").getAttribute('src');
		break;

		default:
			currDict = "none";
			alert("Словарика еще нет :)");
		break;
	}

	jsonFile.open("GET",url,true);
	jsonFile.send();
	view_games();
}
