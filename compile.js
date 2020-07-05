const path = require('path');
const fs = require('fs');
const solc = require('solc');

const helloWorldPath = path.resolve(__dirname, 'contracts', 'HelloWorld.sol');
const source = fs.readFileSync(helloWorldPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':HelloWorld'];