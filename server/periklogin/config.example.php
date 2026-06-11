<?php
// EJEMPLO. El panel NO usa este fichero para credenciales.
// Las credenciales se crean visitando /periklogin/setup.php la primera vez y se
// guardan en config.local.php (gitignored). Si quieres regenerarlas, borra
// config.local.php del servidor y vuelve a entrar en /periklogin/setup.php.
//
// config.php (versionado) solo define rutas. No hay secretos en el repo.
return [
  'user' => 'admin',
  'pass_hash' => 'se-genera-en-setup.php',
];
