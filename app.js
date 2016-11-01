$(function() {
	handleSubmit();
});

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

function removePunc(text) {
	var punc = /[^\w\s]/g;
	var noPunc = text.replace(punc,"");
	return noPunc;
};

function countWords(text) {
	if (text==="") {
		return 0;
	};
	var prev;
	var current=text[0];
	var whiteSpace = /\s/g;
	count=0;
	for (var i=1; i<text.length; i++) {
		prev=current;
		current=text[i];
		if (whiteSpace.test(current) && !whiteSpace.test(prev)) {
			count++;
		};
	};
	if (!whiteSpace.test(current)) {
		count++;
	};
	return count;
};

function countUnique(text) {
	var wordArray = removePunc(text).toLowerCase().split(" ");
	var count=0;
	for (var i=0; i<wordArray.length-1; i++) {
		var duplicate=false;
		for (var j=i+1; j<wordArray.length; j++) {
			if (wordArray[i]===wordArray[j]) {
				duplicate=true;
				break;
			};
		};
		if (!duplicate) {
			count++;
			duplicate=false;
		};
	};
	return ++count;
};

function calcAveWord(text, words) {
	var nonWord = /\W/g;
	var processedText=text.replace(nonWord, "");
	return processedText.length/words;
};

function calcAveSentence(text, words) {
	var sentences = text.split(/[.!?]/);
	var numSentences = sentences.length;
	var totalWords = 0;
	for (var i=0; i<sentences.length; i++) {
		if (sentences[i]==="") {
			numSentences--;
		}
	}
	return words/numSentences;
}

function display(words, uniqueWords, aveWord, aveSentence) {
	$("dl").removeClass("hidden");
	$(".wordCount").text(words);
	$(".uniqueCount").text(uniqueWords);
	$(".aveWord").text(aveWord.toFixed(2)+" characters");
	$(".aveSentence").text(aveSentence.toFixed(2)+" words");
};