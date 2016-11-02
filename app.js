// Completed 10/31/16, refactored 11/2/16
$(function() {
	handleSubmit();
});

// Event listener and main organization point.
// Calls other methods to calculate and display.
function handleSubmit() {
	$("form").submit(function(event) {
		event.preventDefault();
		var text = $(this).find("textarea").val();
		var words = countWords(text);
		var uniqueWords = countUnique(text);
		var aveWord = calcAveWord(text, words);
		var aveSentence = calcAveSentence(text, words);
		display(words, uniqueWords, aveWord, aveSentence);
	});
};

// Removing punctuation is necessary for counting unique words,
// so that "this" is not a different word from "this."
function removePunc(text) {
	var punc = /[^\w\s]/g;
	var noPunc = text.replace(punc,"");
	return noPunc;
};

function countWords(text) {
	var wordArray = text.toLowerCase().split(" ");
	return wordArray.length;
};

function countUnique(text) {
	var wordArray = removePunc(text).toLowerCase().split(" ");
	var used=[wordArray[0]];
	for (var i=0; i<wordArray.length-1; i++) {
		for (var j=0; j<used.length; j++) {
			if (wordArray[i]===used[j]) {
				break;
			} else if (j===used.length-1) {
				used.push(wordArray[i]);
			};
		};
	};
	return used.length;
};

function calcAveWord(text, words) {
	var nonWord = /\W/g;
	var processedText=text.replace(nonWord, "");
	return processedText.length/words;
};

function calcAveSentence(text, words) {
	var sentences = text.split(/[.!?]/);
	var numSentences = sentences.length;
	for (var i=0; i<sentences.length; i++) {
		if (sentences[i]==="") {
			numSentences--;
		};
	};
	return words/numSentences;
}

function display(words, uniqueWords, aveWord, aveSentence) {
	$("dl").removeClass("hidden");
	$(".wordCount").text(words);
	$(".uniqueCount").text(uniqueWords);
	$(".aveWord").text(aveWord.toFixed(2)+" characters");
	$(".aveSentence").text(aveSentence.toFixed(2)+" words");
};