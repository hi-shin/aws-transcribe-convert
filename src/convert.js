"use strict";
var fs = require('fs');
var Transcript = require('./transcript').Transcript;
var source = JSON.parse(fs.readFileSync('sample.json'));
var transcript = new Transcript(source.results.items);
fs.writeFileSync('sample.txt', transcript.batches.map(JSON.stringify).join('\n'));
