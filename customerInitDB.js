const customerDB = require('./customerDB.js');

const customer = customerDB.getModel();

(async () => {
	2

	await customer.deleteMany({});

	let customer1 = new customer({
		firstName: 'John',
		lastName: 'smith'
	});

	let customer2 = new customer({
		firstName: 'Mary',
		lastName: 'smith'
	});

	let customer3 = new customer({
		firstName: 'Joe',
		lastName: 'smith'
	});


	await Promise.all([
		customer1.save(),
		customer2.save(),
		customer3.save(),

	]);

	let currentCustomer = await customer.find({});

	console.log(currentCustomer);

	process.exit();


})();