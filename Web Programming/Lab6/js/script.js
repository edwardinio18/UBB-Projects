$(document).ready(function () {
  var currentPage = 1;
  var totalPages = 0;
  var selectedCategory = ""; // Track the selected category

  // Fetch categories on page load
  $.ajax({
    url: "php/api.php",
    type: "GET",
    data: { action: "getCategories" },
    success: function (response) {
      var categories = JSON.parse(response);
      displayCategories(categories);
    },
    error: function () {
      alert("Failed to fetch categories.");
    },
  });

  // Display categories
  function displayCategories(categories) {
    var categoryLinks = "";
    for (var i = 0; i < categories.length; i++) {
      categoryLinks +=
        '<a href="#" class="category-link" data-category="' +
        categories[i] +
        '">' +
        categories[i] +
        "</a>";
    }
    $("#categories").html(categoryLinks);
  }

  // Load products by category
  $(document).on("click", ".category-link", function () {
    selectedCategory = $(this).data("category"); // Store the selected category
    currentPage = 1; // Reset the current page when a category is clicked
    loadProductsByPage(currentPage);
  });

  // Display products
  function displayProducts(products) {
    showPagination();
    var productHtml = "";
    for (var i = 0; i < products.length; i++) {
      productHtml +=
        '<div class="product">' +
        "<h3>" +
        products[i].name +
        "</h3>" +
        "<p>" +
        products[i].description +
        "</p>" +
        "<p>Price: $" +
        products[i].price +
        "</p>" +
        '<button class="add-to-cart" data-product-id="' +
        products[i].id +
        '">Add to Cart</button>' +
        "</div>";
    }
    $("#products").html(productHtml);

    // Update pagination
    updatePagination();
  }

  $(document).on("click", "#prevPage", function () {
    if (currentPage > 1) {
      currentPage--;
      loadProductsByPage(currentPage);
      updatePaginationButtons();
    }
  });

  $(document).on("click", "#nextPage", function () {
    if (currentPage < totalPages) {
      currentPage++;
      loadProductsByPage(currentPage);
      updatePaginationButtons();
    }
  });

  // Add to cart
  $(document).on("click", ".add-to-cart", function () {
    var productId = $(this).data("product-id");
    $.ajax({
      url: "php/api.php",
      type: "GET",
      data: { action: "addToCart", productId: productId },
      success: function (response) {
        var cartItems = JSON.parse(response);
        displayCartItems(cartItems);
      },
      error: function (error) {
        console.log("Failed to add item to cart. Error: " + error);
      },
    });
  });

  // Clear cart
  $("#clearCart").on("click", function () {
    $.ajax({
      url: "php/api.php",
      type: "GET",
      data: { action: "clearCart" },
      success: function (response) {
        var cartItems = JSON.parse(response);
        displayCartItems(cartItems);
      },
      error: function (error) {
        alert("Failed to clear cart. Error: " + error);
      },
    });
  });

  // Display cart items
  function displayCartItems(cartItems) {
    var cartHtml = "";
    var totalQuantity = 0;
    var totalPrice = 0;

    for (var i = 0; i < cartItems.length; i++) {
      var itemHtml =
        '<li class="cart-item">' +
        cartItems[i].name +
        ' - Quantity: <input type="number" min="0" value="' +
        cartItems[i].quantity +
        '" class="quantity-input">' +
        '<button class="edit-item" data-cart-item-id="' +
        cartItems[i].id +
        '">Edit</button>' +
        ' <button class="delete-item" data-cart-item-id="' +
        cartItems[i].id +
        '">Delete</button>' +
        "</li>";
      cartHtml += itemHtml;

      totalQuantity += cartItems[i].quantity;
      totalPrice += parseFloat(cartItems[i].price) * cartItems[i].quantity;
    }

    // Add total quantity and total price to the cart
    cartHtml +=
      '<div class="cart-summary">' +
      '<li class="cart-total">Total Quantity: <span class="cart-quantity">' +
      totalQuantity +
      "</span></li>" +
      '<li class="cart-total">Total Price: $<span class="cart-price">' +
      totalPrice.toFixed(2) +
      "</span></li>" +
      "</div>";

    $("#cartItems").html(cartHtml);

    // Disable clear cart button if the cart is empty
    if (cartItems.length === 0) {
      $("#clearCart").prop("disabled", true);
    } else {
      $("#clearCart").prop("disabled", false);
    }
  }

  $.ajax({
    url: "php/api.php",
    type: "GET",
    data: { action: "getCartItems" },
    success: function (response) {
      var cartItems = JSON.parse(response);
      displayCartItems(cartItems);
    },
    error: function (error) {
      console.log("Failed to fetch cart items. Error: " + error);
    },
  });

  // Load products by page
  function loadProductsByPage(page) {
    $.ajax({
      url: "php/api.php",
      type: "GET",
      data: {
        action: "getProductsByPage",
        page: page,
        category: selectedCategory,
      }, // Include the selected category
      success: function (response) {
        var products = JSON.parse(response);
        displayProducts(products);
      },
      error: function () {
        alert("Failed to fetch products.");
      },
    });
  }

  // Helper function to show pagination
  function showPagination() {
    $("#pagination").show();
  }

  // Helper function to update pagination
  function updatePagination() {
    $.ajax({
      url: "php/api.php",
      type: "GET",
      data: { action: "getTotalPages", category: selectedCategory }, // Include the selected category
      success: function (response) {
        totalPages = parseInt(response);
        updatePaginationButtons();
      },
      error: function () {
        alert("Failed to fetch total pages.");
      },
    });
  }

  // Helper function to update pagination buttons state
  function updatePaginationButtons() {
    if (currentPage === 1) {
      $("#prevPage").prop("disabled", true);
    } else {
      $("#prevPage").prop("disabled", false);
    }

    if (currentPage === totalPages) {
      $("#nextPage").prop("disabled", true);
    } else {
      $("#nextPage").prop("disabled", false);
    }

    $("#page_display").text(currentPage + " / " + totalPages); // Update the page display
  }

  $(document).on("click", ".delete-item", function () {
    var cartItemId = $(this).data("cart-item-id");
    // Send an AJAX request to remove the item from the cart
    $.ajax({
      url: "php/api.php",
      type: "GET",
      data: { action: "removeFromCart", cartItemId: cartItemId },
      success: function (response) {
        var cartItems = JSON.parse(response);
        displayCartItems(cartItems);
      },
      error: function (error) {
        console.log("Failed to remove item from cart. Error: " + error);
      },
    });
  });

  $(document).on("click", ".edit-item", function () {
    var cartItemId = $(this).data("cart-item-id");
    var newQuantity = $(this).siblings(".quantity-input").val();

    if (newQuantity < 0) {
      $("#quantity_error").text("Quantity must be greater than 0");
      $("#quantity_error").show();
      setTimeout(function () {
        $("#quantity_error").hide();
      }, 3000);
    } else {
      $.ajax({
        url: "php/api.php",
        type: "GET",
        data: {
          action: "updateCartItemQuantity",
          cartItemId: cartItemId,
          quantity: newQuantity,
        },
        success: function (response) {
          var cartItems = JSON.parse(response);
          displayCartItems(cartItems);
        },
        error: function (error) {
          console.log("Failed to update cart item quantity. Error: " + error);
        },
      });
    }
  });
});
