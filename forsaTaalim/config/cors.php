<?php

return [
    'paths' => ['api/*', 'login/google/callback'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000','http://127.0.0.1:8000'], 
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'expose_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];