const fs = require('fs');
const Transcript = require('./transcript').Transcript;

const source = JSON.parse(fs.readFileSync('sample.json'));
const transcript = new Transcript(source.results.items)

fs.writeFileSync('sample.txt', transcript.batches.map(JSON.stringify).join('\n'));