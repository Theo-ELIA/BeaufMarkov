var markovBeauf = function(nbBeauferie,corpusPath) {

	Markov = require('markov-strings');
	fs = require('fs');

	fs.readFile('../corpus/' + corpusPath,'utf8',function(err,data) {

		if(err) {
			return console.log(err);
		}
		data = data.split('\n');

		data.forEach(function (array,index,array) {
			array[index] = array[index].replace(/"/g,'');
			array[index] = array[index].replace(/«/g,'');
			array[index] = array[index].replace(/»/g,'');
			array[index] = array[index].trim();
		});
		// console.log(data);
		const markov = new Markov(data);
		markov.buildCorpusSync();
		for(let i = 0; i < nbBeauferie; i++) {
			const result = markov.generateSentenceSync();
			console.log(result.string);
			//console.log(result.refs);
		}
	});

}

markovBeauf(5);