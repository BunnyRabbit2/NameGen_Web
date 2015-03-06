var firstPairs = {};
var normalPairs = {};
var fixes = {};

function loadDatasetWords(textFileName)
{
    $.get(textFileName, function(data) {
        data = data.toLowerCase();
        var datasetWords = data.split(' ');

        datasetWords.forEach(function(word) {
            word = word.toLowerCase();
        });
    });
};

function buildDatasetWordPairs(words) {
    if(DEBUG) { console.log("BUILDING PAIRS"); }

    for(var i = 0; i < words.length; i++) {
        var word = words[i].trim();

        if(word == "") { continue; }
        if(word.length == 1) { continue; }
        if(word.length == 2) {
            word = word + " ";

            addPairToDictionary(firstPairs, word.substr(0,3));
        }

        word = word + " ";

        var pairing;

        pairing = word.substr(0,3);

        addPairToDictionary(firstPairs,pairing);

        for (var i2 = 0; i2 < word.length - 2; i2++)
        {
            pairing = word.substr(i2,3);

            addPairToDictionary(normalPairs,pairing);
        }
    }

    fixes["prefixes"] = [];
    fixes["suffixes"] = [];

    var limit = words.length / 10;
    var found = 0;
    var fixLength = randomIntFromInterval(0,4);

    while (found < limit)
    {
        var fix;
        var prefix = false;
        var word = words[randomIntFromInterval(0,words.length - 1)];

        if (fixLength > word.length)
            continue;

        if (randomIntFromInterval(1,3) == 3)
        {
            fix = word.substr(0, fixLength);
            prefix = true;
        }
        else
        {
            fix = word.substr(word.length - fixLength);
        }

        if(/[aeiouy]/i.test(fix)) {
            found++;
            if(prefix) {
                fixes["prefixes"].push(fix);
            }
            else {
                fixes["suffixes"].push(fix);
            }
        }
    }
}

function addPairToDictionary(dictionary, pairing)
{
    var pair = pairing.substr(0,2);
    var nextLetter = pairing.substr(2,1);

    if(dictionary[pair] != null) {
        if($.inArray(nextLetter,dictionary[pair]) == -1) {
            dictionary[pair].push(nextLetter);
        }
    }
    else {
        dictionary[pair] = [];
        dictionary[pair].push(nextLetter);
    }
}