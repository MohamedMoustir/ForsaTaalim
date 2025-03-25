<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // Remplacez par votre origine frontend
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'expose_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];