<?php
// Configuración NO secreta (versionada). Las credenciales se crean con setup.php
// y se guardan en config.local.php (gitignored; al ser un .php que solo "return",
// no es descargable como texto).
$ROOT = dirname(__DIR__); // .../public_html
return [
  'data_dir'    => $ROOT . '/data',
  'uploads_dir' => $ROOT . '/uploads',
  'uploads_url' => '/uploads',
  'creds_file'  => __DIR__ . '/config.local.php',
];
