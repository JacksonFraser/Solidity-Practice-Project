const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};

const web3 = new Web3(ganache.provider(), null, OPTIONS);
const { interface, bytecode} = require('../compile');

let accounts;
let helloWorld;

beforeEach(async () => {
	//Get a list of all accounts 
	accounts = await web3.eth.getAccounts();
		

	//use an account to deploy the contract
	helloWorld = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ 
			data: bytecode, 
			arguments: ['Hello World!'] 
		})
		.send({ from: accounts[0], gas: '1000000' });
});

describe('HelloWorld', () => {
	it('Deploys a contract', () => {
		console.log(helloWorld);
	});
});



/*class Car {
	park() {
		return 'stopped';
	}

	drive() {
		return 'vroom';
	}
} 

describe('Car',() => {
	it('can park',() => {
		const car = new Car();
		assert.equal(car.park(), 'stopped');
	});
});*/