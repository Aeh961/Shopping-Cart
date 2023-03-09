const itemsDB = require('./itemsDB.js');

const item = itemsDB.getModel();

(async () => {
	2

	await item.deleteMany({});

	let item1 = new item({
		itemName: 'Apple', description: 'Red', price: 1, quantity: 10, imageUrl: '/images/apple.jpg',
	});

	let item2 = new item({
		itemName: 'Banana', description: 'Yellow', price: 3, quantity: 15, imageUrl: '/images/banana.jpeg',
	});

	let item3 = new item({
		itemName: 'Lettuce', description: 'Organic lettuce', price: 2, quantity: 20, imageUrl: '/images/lettuce.jpg',
	});

	let item4 = new item({
		itemName: 'Cheese', description: 'Blue Cheese', price: 5, quantity: 100, imageUrl: '/images/cheese.jpg',
	});
	let item5 = new item({
		itemName: 'Eggplant', description: 'Organic', price: 2, quantity: 100, imageUrl: '/images/eggplant.jpg',
	});
	let item6 = new item({
		itemName: 'Mango', description: 'Yellow', price: 4, quantity: 100, imageUrl: '/images/mango.jpg',
	});
	let item7 = new item({
		itemName: 'Onion', description: 'Green Onion', price: 3, quantity: 100, imageUrl: '/images/onion.jpg',
	});
	let item8 = new item({
		itemName: 'Wine', description: 'Malbec', price: 15, quantity: 100, imageUrl: '/images/wine.jpg',
	});
	let item9 = new item({
		itemName: 'Coffee', description: 'Decaf', price: 6, quantity: 100, imageUrl: '/images/coffee.jpg',
	});
	let item10 = new item({
		itemName: 'Beer', description: 'IPA', price: 22, quantity: 100, imageUrl: '/images/beer.jpg',
	});


	await Promise.all([
		item1.save(),
		item2.save(),
		item3.save(),
		item4.save(),
		item5.save(),
		item6.save(),
		item7.save(),
		item8.save(),
		item9.save(),
		item10.save(),
	]);

	let currentItem = await item.find({});

	console.log(currentItem);

	process.exit();


})();
