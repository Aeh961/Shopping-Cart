var express = require('express');
var router = express.Router();

// other modules
var homePage = require("./homePage")
var customerItems =require("./displayCustomerItems");
var login = require("./adminLog")
var itemsOrCustomer = require("./itemsOrcustomer")
var customerPage = require("./customers")
var customerOrder = require("./addToOrder")
var displayCustomerOrders = require("./displayCustomerOrders")
var displayItems 	= require("./displayitems");
var addItem			= require("./addItem");
var saveItem 			= require("./saveItem");
var editItems 			= require("./editItem");
var saveAfterEdit 	= require("./saveAfterEdit");
var deleteItem		= require("./deleteItem");
var deleteItemAfterConfirm 		= require("./deleteItemAfterConfirm");
var newCustomer = require("./newCustomer");
var saveNewCustomer = require("./saveNewCustomer");
var adminOrderDisplay = require("./adminOptionDisplay");

var adminNewCustomer = require("./adminNewCustomer");
var adminSaveNewCustomer = require("./adminSaveNewCustomer");


var removeItemFromOrder = require("./removeItemFromOrder")

var updateItemInOrder = require("./updateItemInOrder")
var getStock = require('./getStock')
var getStockItem = require('./getStockItem')
var getStockItemByPrice = require('./getStockItemByPrice')



// router specs

router.get('/', function(req, res, next) {
  res.redirect('/homePage');
});

router.get('/api/stock', getStock)
router.get('/api/stock/:itemName', getStockItem)
router.get('/api/stock/byprice/:min/:max', getStockItemByPrice)



router.get('/Orders/:customerId/items/:itemId/remove',  removeItemFromOrder)
router.post('/Orders/:customerId/items/:itemId/update',    updateItemInOrder)


router.get('/adminLogin',    login)
router.get('/homePage',          homePage)
router.get('/items', 						displayItems);

router.post('/customer/:customerId/items', customerOrder);
router.get('/customer/:customerId/Order', displayCustomerOrders)
router.get('/adminCustomerView', adminOrderDisplay)

router.get('/customerView', customerPage);
router.get('/customerView/add', newCustomer);
router.post('/customerView/add', saveNewCustomer);


router.get('/adminCustomerView/add', adminNewCustomer);
router.post('/adminCustomerView/add', adminSaveNewCustomer);




router.get('/customerItems',     customerOrder)

router.get('/itemsOrCustomers',     itemsOrCustomer)
router.get('/customer/:customerId/items',       customerItems)

router.get('/items/add/', 				addItem);
router.post('/items/add', 			saveItem);

router.get('/items/edit/:id', 	editItems);
router.post('/items/edit/', 	saveAfterEdit);

router.get('/items/delete/:id', deleteItem);
router.post('/items/delete', deleteItemAfterConfirm);



module.exports = router;
