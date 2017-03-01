var markovBeauf = function(nbBeauferie,corpusPath) {

	Markov = require('markov-strings');
	fs = require('fs');

	fs.readFile('./corpus/' + corpusPath,'utf8',function(err,data) {

		if(err) {
			return console.log(err);
		}
		data = data.split('\n');

		data.forEach(function (array,index,array) {
			array[index] = array[index].replace(/"/g,'');
			array[index] = array[index].replace(/«/g,'');
			array[index] = array[index].replace(/»/g,'');
			array[index] = array[index].replace(/“/g,'');
			array[index] = array[index].replace(/”/g,'');
			array[index] = array[index].trim();
		});
		// console.log(data);
		const markov = new Markov(data,{ stateSize : 3,  minWords : 6, minScorePerWord : 10 });
		markov.buildCorpusSync();
		for(let i = 0; i < nbBeauferie; i++) {
			const result = markov.generateSentenceSync();
			console.log(result.string);
			console.log("Score : " + result.score);
			console.log('Réferences :')
			result.refs.forEach( (reference) => {
				console.log(reference);
			});
			console.log('\n');
		}
	});

}

module.exports =  { markovBeauf };