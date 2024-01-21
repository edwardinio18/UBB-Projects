<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once 'db.php';

$action = '';
if (isset($_GET['action'])) {
    $action = $_GET['action'];
}

// Get categories
if ($action === 'getCategories') {
    $query = "SELECT DISTINCT name FROM categories";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($categories);
}

// Get products by category
if ($action === 'getProductsByCategory') {
    $category = $_GET['category'];
    $query = "SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = :category)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':category', $category);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
}

// Get products by page
if ($action === 'getProductsByPage') {
    $page = $_GET['page'];
    $limit = 4;
    $offset = ($page - 1) * $limit;
    $category = $_GET['category']; // Added category parameter
    $query = "SELECT * FROM products WHERE category_id = (SELECT id FROM categories WHERE name = :category) LIMIT $limit OFFSET $offset";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':category', $category);
    $stmt->execute();
    $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($products);
}

// Add to cart
if ($action === 'addToCart') {
    $productId = $_GET['productId'];
    addToCart($conn, $productId);
    $cartItems = getCartItems($conn);
    echo json_encode($cartItems);
}

// Clear cart
if ($action === 'clearCart') {
    clearCart($conn);
    $cartItems = getCartItems($conn);
    echo json_encode($cartItems);
}

// Helper function to add a product to the cart
function addToCart($conn, $productId)
{
    // Check if the product already exists in the cart
    $cartItemId = getCartItemByProductId($conn, $productId);

    if ($cartItemId !== null) {
        // Increment the quantity of the existing cart item
        $query = "UPDATE cart_items SET quantity = quantity + 1 WHERE id = :cartItemId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':cartItemId', $cartItemId);
        $stmt->execute();
    } else {
        // Add the product to the cart
        $query = "INSERT INTO cart_items (product_id, quantity) VALUES (:productId, 1)";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':productId', $productId);
        $stmt->execute();
    }
}

// Helper function to retrieve the cart item ID by product ID
function getCartItemByProductId($conn, $productId)
{
    $query = "SELECT id FROM cart_items WHERE product_id = :productId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':productId', $productId);
    $stmt->execute();
    $cartItem = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($cartItem !== false) {
        return $cartItem['id'];
    }

    return null;
}

// Helper function to clear the cart
function clearCart($conn)
{
    $query = "DELETE FROM cart_items";
    $stmt = $conn->prepare($query);
    $stmt->execute();
}

// Retrieve cart items
if ($action === 'getCartItems') {
    $cartItems = getCartItems($conn);
    echo json_encode($cartItems);
}

// Helper function to retrieve cart items
function getCartItems($conn)
{
    $query = "SELECT c.id AS id, p.id AS product_id, p.name, p.description, p.price, c.quantity
    FROM cart_items c
    JOIN products p ON c.product_id = p.id
    ";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $cartItems = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $cartItems;
}

// Remove from cart
if ($action === 'removeFromCart') {
    $cartItemId = $_GET['cartItemId'];

    // Delete from cart_items table
    $query = "DELETE FROM cart_items WHERE id = :cartItemId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':cartItemId', $cartItemId);
    $stmt->execute();

    $cartItems = getCartItems($conn);
    echo json_encode($cartItems);
}

// Update cart item quantity
if ($action === 'updateCartItemQuantity') {
    $cartItemId = $_GET['cartItemId'];
    $quantity = $_GET['quantity'];

    // Delete the product if the quantity is zero
    if ($quantity == 0) {
        $query = "DELETE FROM cart_items WHERE id = :cartItemId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':cartItemId', $cartItemId);
        $stmt->execute();
    } else {
        // Update cart_items table
        $query = "UPDATE cart_items SET quantity = :quantity WHERE id = :cartItemId";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':quantity', $quantity);
        $stmt->bindParam(':cartItemId', $cartItemId);
        $stmt->execute();
    }

    $cartItems = getCartItems($conn);
    echo json_encode($cartItems);
}

// Get total pages for pagination
if ($action === 'getTotalPages') {
    $category = $_GET['category']; // Include the category parameter
    $query = "SELECT COUNT(*) AS total FROM products";

    // Include the category condition if a category is selected
    if (!empty($category)) {
        $query .= " WHERE category_id = (SELECT id FROM categories WHERE name = :category)";
    }

    $stmt = $conn->prepare($query);
    $stmt->bindParam(':category', $category);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    $totalPages = ceil($result['total'] / 4);
    echo $totalPages;
}
