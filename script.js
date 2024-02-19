var products = [
  { name: 'Espresso', smallPrice: '2.50', largePrice: '3.50' },
  { name: 'DoubleEspresso', smallPrice: '3.00', largePrice: '4.00' },
  { name: 'Latte', smallPrice: '4.00', largePrice: '5.00' },
  { name: 'Lungo', smallPrice: '2.50', largePrice: '3.50' },
  { name: 'Americano', smallPrice: '3.00', largePrice: '4.00' },
  { name: 'CocaCola', smallPrice: '1.50', largePrice: '2.00' },
  { name: 'Fanta', smallPrice: '1.50', largePrice: '2.00' },
  { name: 'Sprite', smallPrice: '1.50', largePrice: '2.00' },
  { name: 'Burger', smallPrice: '5.00', largePrice: '4.50' },
  { name: 'Salad', smallPrice: '4.00', largePrice: '3.50' },
  { name: 'Toast', smallPrice: '3.50', largePrice: '3.00' },
];

function toggleCategory(categoryId) {
  var categories = document.querySelectorAll('.category');
  categories.forEach(function (category) {
    if (category.id === categoryId) {
      category.classList.toggle('show');
      fadeInProducts(category);
    } else {
      category.classList.remove('show');
    }
  });
}

function fadeInProducts(category) {
  var products = category.querySelectorAll('.product');
  products.forEach(function (product) {
    product.style.animation = 'fadeInProduct 0.5s ease-in-out forwards';
  });
}

function goToUpdatePage() {
  document.getElementById('updatePage').style.display = 'block';
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('updateForm').style.display = 'none';
  document.getElementById('updatePageText').style.display = 'none';
  document.getElementById('saveChangesButton').style.display = 'none';
  document.getElementById('returnToMenuButton').style.display = 'none';
  document.getElementById('returnToFirstPageButton').style.display = 'none';

  // Generate update form dynamically
  var updateFormContainer = document.getElementById('updateFormContainer');
  updateFormContainer.innerHTML = '';
  products.forEach(function (product) {
    var updateForm = document.createElement('div');
    updateForm.innerHTML = `
      <label for="${product.name}Small">${product.name} Small:</label>
      <input type="text" id="${product.name}Small" name="${product.name}Small" value="${product.smallPrice}"><br>
      <label for="${product.name}Large">${product.name} Large:</label>
      <input type="text" id="${product.name}Large" name="${product.name}Large" value="${product.largePrice}"><br>
    `;
    updateFormContainer.appendChild(updateForm);

    // Add a hide button for each product on the second page
    var hideButton = document.createElement('button');
    hideButton.textContent = 'Hide';
    hideButton.onclick = function () {
      toggleVisibility(product);
    };
    updateFormContainer.appendChild(hideButton);
  });

  fadeInProducts(category, true); // Pass 'true' to indicate it's the first page
}

function toggleVisibility(product) {
  // Toggle the visibility of the product on the first page
  var productRow = document.getElementById(product.name);
  productRow.style.display = (productRow.style.display === 'none' || productRow.style.display === '') ? 'table-row' : 'none';
}

function updatePrices() {
  products.forEach(function (product) {
    var smallPrice = document.getElementById(product.name + 'Small').value;
    var largePrice = document.getElementById(product.name + 'Large').value;

    // Update prices in the product array
    product.smallPrice = smallPrice;
    product.largePrice = largePrice;

    // Update prices in the displayed menu
    var smallPriceCell = document.querySelector(`#${product.name} td:nth-child(2)`);
    var largePriceCell = document.querySelector(`#${product.name} td:nth-child(3)`);

    smallPriceCell.textContent = '$' + smallPrice;
    largePriceCell.textContent = '$' + largePrice;
  });

  alert('Prices updated successfully!');
  document.getElementById('returnToMenuButton').style.display = 'block';
  document.getElementById('returnToFirstPageButton').style.display = 'none';
  document.getElementById('saveChangesButton').style.display = 'none';
  document.getElementById('updateForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('updatePage').style.display = 'none';

  // Trigger click on the "Coffee" category to go back to the first page
  toggleCategory('coffee');
}

function goToFirstPage() {
  document.getElementById('updatePage').style.display = 'none';
  document.getElementById('saveChangesButton').style.display = 'none';
  document.getElementById('returnToMenuButton').style.display = 'none';
  document.getElementById('returnToFirstPageButton').style.display = 'none';
  document.getElementById('updateForm').style.display = 'none';
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('updatePageText').style.display = 'none';
}

// Add the login function
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Replace 'your_username' and 'your_password' with the actual credentials
  if (username === 'tasos' && password === 12345') {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('updateForm').style.display = 'block';
    document.getElementById('saveChangesButton').style.display = 'block';
    document.getElementById('updatePageText').style.display = 'block';
    document.getElementById('returnToMenuButton').style.display = 'block';
    document.getElementById('returnToFirstPageButton').style.display = 'block';
  } else {
    alert('Invalid username or password. Please try again.');
  }
}
