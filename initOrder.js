const orderDB = require('./orderDB.js');

const order = orderDB.getModel();

(async () => {
	2

	await order.deleteMany({});


	let currentOrder = await order.find({});

	console.log(currentOrder);

	process.exit();


})();
