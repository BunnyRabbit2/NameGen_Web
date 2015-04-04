# BunnyNameGenWeb

A name generator web app

## What is this and why make it?
This name generator will build new words using rules generated from a file containing sample words inside a minmum and maximum given to it. The words produced can look a bit strange and nothing like the sample text sometimes but are generally similar enough to be useful.

I enjoyed using [Christopher Pounds website](http://generators.christopherpound.com/) to generate names when I needed one for a tabletop RPG or to name a legendary character or piece of equipment when designing my own Magic: The Gathering cards but they didn't update fast enough for my liking.

Thankfully he has his scripts up and using those I wrote the C# WinForms version of the name generator which proved to be helpful. Later on I wanted to be able to use it on my phone and give it out in an easier manner and a wep app seemed the best way.

## How does it work?
The script takes each word and puts the first pair of characters into an array and associates it with the following letter. It then does this for each subsequent pair until it reaches the end of the word. By the end of processing the dataset file each pair of letters has one or more following letters associated with it and a list of first pairs.

The script then generates some suffixes and prefixes by randomly chopping the end or start of some randomly chosen words and stores them in an array.

To begin generation, a random length between the min and max and then picks a random first pair. A random next letter associated with that pair is added to the word and the new next pair in the word is used to find the next letter in the same manner. This continues until the length of the word is at the previously randomly chosen length.

Roughly a third of the words generated will have a random prefix or suffix added to the word and the if the word still fits inside the minimum and maximum lengths it is returned. If it isn't, the word without the prefix/suffix is returned instead.