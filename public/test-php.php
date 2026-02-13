<?php
header("Content-Type: application/json");
echo json_encode([
    "status" => "ok",
    "php_version" => phpversion(),
    "curl_enabled" => function_exists('curl_init'),
    "server" => $_SERVER['SERVER_SOFTWARE'] ?? 'unknown'
]);
?>
