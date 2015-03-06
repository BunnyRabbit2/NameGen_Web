var DEBUG = true;

function loadDatasetWordsIntoDiv(textFileName, divId) {
        var htmlstring = "";

    $.get(textFileName, function(data) {
        data = data.toLowerCase();
        var words = data.split(' ');

        words.forEach(function(word) {
            word = word.toLowerCase();
            htmlstring = htmlstring + "<div class=\"col-md-1\">" + word.toTitleCase() + "</div>";
        });

        document.getElementById(divId).innerHTML = htmlstring;

        buildDatasetWordPairs(words);
        outputPairsToDiv(firstPairs,normalPairs);
        outputFixesToDiv(fixes);
    });
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