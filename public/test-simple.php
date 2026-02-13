<?php
// Test simple pour vérifier que PHP fonctionne
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

echo json_encode([
    "status" => "success",
    "message" => "PHP fonctionne correctement",
    "php_version" => phpversion(),
    "server" => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown',
    "method" => $_SERVER['REQUEST_METHOD'],
    "timestamp" => date('Y-m-d H:i:s')
]);
?>
