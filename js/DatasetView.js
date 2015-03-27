function loadDatasetWordsIntoDiv(textFileName) {
    $.get(textFileName, function(data) {
        data = data.toLowerCase();
        var words = data.split(' ');

        outputWordsToDiv(words);
        document.getElementById('word-list-header').className = "row";
        buildDatasetWordPairs(words);
        outputPairsToDiv(dataset.firstPairs, dataset.normalPairs);
        document.getElementById('pair-list-header').className = "row";
        outputFixesToDiv(dataset.fixes);
        document.getElementById('fix-list-header').className = "row";
    });
}

function outputWordsToDiv(words)
{
    var htmlstring = "";

    htmlstring = htmlstring + "<div class=\"col-md-12\">";
    htmlstring = htmlstring + "<ul class=\"list-inline\">\n";

    words.forEach(function(word) {
        word = word.toLowerCase();
        htmlstring = htmlstring + "<li>" + word.toTitleCase() + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";

    document.getElementById("datasetwords").innerHTML = htmlstring;
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
    htmlstring = htmlstring + "<li class=\"list-group-item active\">";
    htmlstring = htmlstring + "<h4 class=\"list-group-item-heading\">Prefixes</h4>";
    htmlstring = htmlstring + "</li>";

    $.each(fixes["prefixes"], function(index,prefix) {
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + prefix + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";
    htmlstring = htmlstring + "<div class=\"col-md-6\">";
    htmlstring = htmlstring + "<ul class=\"list-group\">\n";
    htmlstring = htmlstring + "<li class=\"list-group-item active\">";
    htmlstring = htmlstring + "<h4 class=\"list-group-item-heading\">Suffixes</h4>";
    htmlstring = htmlstring + "</li>";

    $.each(fixes["suffixes"], function(index,suffix) {
        htmlstring = htmlstring + "<li class=\"list-group-item\">" + suffix + "</li>";
    });

    htmlstring = htmlstring + "</ul>\n";
    htmlstring = htmlstring + "</div>";

    document.getElementById("datasetfixes").innerHTML = htmlstring;
}

function populateDatasetSelectBox()
{
    $.get("content/datasets/datasets.txt", function(data) {
        // data = data.toTitleCase();

        var datasets = data.split('\n');
        var select = document.getElementById("dataset-select");

        var opt = document.createElement("option");
        opt.value = "null";
        opt.textContent = "Select Dataset to View";
        select.appendChild(opt);

        datasets.forEach(function(dataset) {
            var opt = document.createElement("option");
            opt.value = "content/datasets/" + dataset + ".txt";
            opt.textContent = dataset;
            select.appendChild(opt);
        });

        select.selectedIndex = 0;

        select.onchange = function () {
            loadDatasetWordsIntoDiv(select.options[select.selectedIndex].value);
        };
    })
}