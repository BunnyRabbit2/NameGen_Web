/**
 * Code taken from http://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
 *
 * Original code by Geoffrey Booth
 */

String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless
    // they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words such as initialisms or acronyms should be left uppercase
    uppers = ['Id', 'Tv'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var randomProperty = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

var randomPropertyName = function (obj) {
    var keys = Object.keys(obj)
    return keys[ keys.length * Math.random() << 0];
};

function getBootstrapThemeName()
{
    var links = document.getElementsByTagName('link');

    var themeLink;

    for(var i = 0; i < links.length; i++)
    {
        if(links[i].getAttribute('href').indexOf('.bootstrap') > -1) {
            themeLink = links[i].getAttribute('href');
            break;
        }
    }

    if(themeLink) {
        var start = themeLink.indexOf('css/') + 4;
        var end = themeLink.indexOf('.bootstrap');

        var themeName = themeLink.substr(start, end - start);
    }

    return themeName.toTitleCase();
};