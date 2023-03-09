function addItem(){
    window.location.href = '/items/add';
}

function newCustomer(){
  window.location.href='/customerView/add'

}
function newAdminCustomer(){
  window.location.href='/adminCustomerView/add'

}



function cancelAdd(){
    window.location.href = '/items';
}

function cancelDelete(){
    window.location.href = '/items';
}
function admin() {

  window.location.href='/adminLogIn';
}


document.addEventListener('DOMContentLoaded', () => {
  itemsOrCustomer();
});
function itemsOrCustomer() {
  const expectedUsername = "myUsername";
  const expectedPassword = "myPassword";
  
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const loginForm = document.querySelector('form');
  
  if (!usernameInput || !passwordInput || !loginForm) {
    console.log("Could not find necessary elements on the page.");
    return;
  }
  
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const username = usernameInput.value;
    const password = passwordInput.value;
    
    if (username === expectedUsername && password === expectedPassword) {
      window.location.href = '/itemsOrCustomers';
    } else {
      console.log("Invalid username or password. Please try again.");
    }
    
    return false;
  });
}

function itemsView() {

    window.location.href = '/items';
 
}
function adminViewOrder() {
  window.location.href = '/adminCustomerView';
  }





function customer(){
    window.location.href = '/customerView';
}


function customerDisplayOrder(customerId) {
  window.location.href = `/customer/${customerId}/order`;
}

function customerDisplayItems(customerId) {
  window.location.href = `/customer/${customerId}/items`;
}



