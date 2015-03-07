$(document).ready(initialise());

function initialise() {
    $.get("content/datasets/datasets.txt", function(data) {
        // data = data.toTitleCase();

        var datasets = data.split('\n');
        var select = document.getElementById("dataset-select");

        var opt = document.createElement("option");
        opt.value = "null";
        opt.textContent = "Select Dataset to Generate From";
        select.appendChild(opt);

        datasets.forEach(function(dataset) {
            var opt = document.createElement("option");
            opt.value = "content/datasets/" + dataset + ".txt";
            opt.textContent = dataset;
            select.appendChild(opt);
        });

        select.selectedIndex = 0;

        select.onchange = function () {
            loadDatasetWords(select.options[select.selectedIndex].value);
        };

        $('#clear-button').click(function(){ $('#name-box').empty() });

        $('#generate-button').click(function(){ generateNames(1); });
        $('#generate-six-button').click(function(){ generateNames(6); });

        $('#name-max').selectedIndex = 2;
    })
}

function generateNames(numberToGenerate)
{
    var nameBox = document.getElementById("name-box");

    var minS = document.getElementById("name-min");
    var maxS = document.getElementById("name-max");

    var minLength = parseInt(minS.options[minS.selectedIndex].value);
    var maxLength = parseInt(maxS.options[maxS.selectedIndex].value);

    if(maxLength < minLength) { maxLength = minLength; }

    for(var i = 0; i < numberToGenerate; i++)
    {
        var newName = generateName(minLength,maxLength);

        if(newName !== "") {
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(newName.toTitleCase()));
            div.setAttribute("class", "col-md-2 panel panel-default text-center");
            nameBox.appendChild(div);
        }
        else {
            i--;
        }
    }
}

function generateName(minLength, maxLength)
{
    var newName = randomPropertyName(firstPairs);

    var wordComplete = false;
    var wordLength = randomIntFromInterval(minLength,maxLength);

    while(!wordComplete)
    {
        var size = normalPairs[newName.substr(newName.length - 2)].length;
        var nextChar = normalPairs[newName.substr(newName.length - 2)][randomIntFromInterval(0,size-1)];

        newName = newName + nextChar;

        if(newName.length == wordLength)
        {
            wordComplete = true;
        }

        if (nextChar == " ") {
            if (newName.length > minLength + 1)
                wordComplete = true;
            else
                return "";
        }

        if (wordComplete) {
            if (randomIntFromInterval(1, 3) == 3) {
                if (randomIntFromInterval(1, 2) == 1) {
                    newName = addPrefix(newName);
                }
                else {
                    newName = addSuffix(newName);
                }
            }
        }
    }

    return newName;
}

function addPrefix(nameIn)
{
    var chopToFit = false;
    var prefixSize = fixes["prefixes"].length;
    var prefix = fixes["prefixes"][randomIntFromInterval(0,prefixSize-1)];
    var wordOut = "";

    if (/[aeiouy]$/i.test(nameIn))
        chopToFit = true;

    if (/^[aeiouy]/i.test(nameIn) && chopToFit)
        wordOut = prefix + nameIn.substr(1);
    else
        wordOut = prefix + nameIn;

    return wordOut;
}

function addSuffix(nameIn)
{
    var chopToFit = false;
    var suffixSize = fixes["suffixes"].length;
    var suffix = fixes["prefixes"][randomIntFromInterval(0,suffixSize-1)];
    var wordOut = "";

    if (/^[aeiouy]/i.test(nameIn))
        chopToFit = true;

    if (/[aeiouy]$/i.test(nameIn) && chopToFit)
        wordOut = suffix + nameIn.substr(0, nameIn.length - 1);
    else
        wordOut = suffix + nameIn;

    return wordOut;
}