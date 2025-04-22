<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login/*', 'auth/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000', 'http://127.0.0.1:8000', 'http://localhost:5173'], // Add any other origins you're using
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, 
];