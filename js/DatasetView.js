var DEBUG = true;

function loadDatasetWordsIntoDiv(textFileName, divId) {
    $.get(textFileName, function(data) {
        data = data.toLowerCase();
        var words = data.split(' ');

        var htmlstring = "";

        words.forEach(function(word) {
            word = word.toLowerCase();
            htmlstring = htmlstring + "<div class=\"col-md-1\">" + word.toTitleCase() + "</div>";
        });

        document.getElementById(divId).innerHTML = htmlstring;

        buildDatasetWordPairs(words);
    });
}

function buildDatasetWordPairs(words) {
    if(DEBUG) { console.log("BUILDING PAIRS"); }

    var firstPairs = {};
    var normalPairs = {};
    var fixes = {};

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

    outputPairsToDiv(firstPairs,normalPairs);

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

    outputFixesToDiv(fixes);
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

function outputPairsToDiv(firstPairs, normalPairs)
{
    var htmlstring = "";

    htmlstring = htmlstring + "<div class=\"col-md-6\">";
    htmlstring = htmlstring + "<ul class=\"list-group\">\n";

    $.each(firstPairs, function(key, value) {
        // console.log( "The first pair is '" + key + "' and the next letter is '" + value + "'" );
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + "First Pair: " + key + "<br /> Next Letters: " + value + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";
    htmlstring = htmlstring + "<div class=\"col-md-6\">";
    htmlstring = htmlstring + "<ul class=\"list-group\">\n";

    $.each(normalPairs, function(key, value) {
        // console.log( "The normal pair is '" + key + "' and the next letter is '" + value + "'" );
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + "Normal Pair: " + key + "<br /> Next Letters: " + value + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";

    document.getElementById("datasetpairs").innerHTML = htmlstring;
}

function outputFixesToDiv(fixes)
{
    var htmlstring = "";

    htmlstring = htmlstring + "<div class=\"col-md-6\">";
    htmlstring = htmlstring + "<ul class=\"list-group\">\n";

    $.each(fixes["prefixes"], function(index,prefix) {
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + prefix + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";
    htmlstring = htmlstring + "<div class=\"col-md-6\">";
    htmlstring = htmlstring + "<ul class=\"list-group\">\n";

    $.each(fixes["suffixes"], function(index,suffix) {
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + suffix + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";

    document.getElementById("datasetfixes").innerHTML = htmlstring;
}