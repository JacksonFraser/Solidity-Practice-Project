const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const provider = ganache.provider();
const web3 = new Web3(provider, null, OPTIONS);
const { interface, bytecode} = require('../compile');

let accounts;
let helloWorld;
const INITIAL_MESSAGE = 'Hello World!';
const UPDATED_MESSAGE = 'Changing the initial message';
beforeEach(async () => {
	//Get a list of all accounts 
	accounts = await web3.eth.getAccounts();
		

	//use an account to deploy the contract
	helloWorld = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ 
			data: bytecode, 
			arguments: [INITIAL_MESSAGE] 
		})
		.send({ 
			from: accounts[0], 
			gas: '1000000' 
		});
});

describe('HelloWorld', () => {

	it('Deploys a contract', () => {
		assert.ok(helloWorld.options.address);
	});

	it('Has a dafault message', async() => {
		const message = await helloWorld.methods.message().call();
		assert.equal(message, INITIAL_MESSAGE);
	});

	it('Can change the message', async() => {
		await helloWorld.methods.setMessage(UPDATED_MESSAGE)
		.send({ 
			from: accounts[0]
		});
		const message = await helloWorld.methods.message().call();
		assert.equal(message, UPDATED_MESSAGE);
	});

});