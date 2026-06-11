<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/auth.php';
start_session();

$creds = current_creds();
$err = '';
$done = false;

if (!$creds && $_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $u = trim($_POST['user'] ?? '');
  $p = (string) ($_POST['pass'] ?? '');
  if (strlen($u) < 3 || strlen($p) < 8) {
    $err = 'El usuario debe tener ≥3 caracteres y la contraseña ≥8.';
  } else {
    $hash = password_hash($p, PASSWORD_DEFAULT);
    $php = "<?php\nreturn " . var_export(['user' => $u, 'pass_hash' => $hash], true) . ";\n";
    if (@file_put_contents(cfg()['creds_file'], $php, LOCK_EX) !== false) {
      $done = true;
    } else {
      $err = 'No se pudo escribir config.local.php. Da permisos de escritura a la carpeta /admin.';
    }
  }
}

layout_head('Configuración');
echo '<div class="auth">';
echo '<div class="brand center">Peri<span>Digital</span><small>admin</small></div>';
if ($creds) {
  flash('El panel ya está configurado. Ve al inicio de sesión.', 'ok');
  echo '<a class="btn" href="login.php">Iniciar sesión →</a>';
} elseif ($done) {
  flash('¡Listo! Credenciales creadas. Por seguridad, borra setup.php del servidor.', 'ok');
  echo '<a class="btn" href="login.php">Iniciar sesión →</a>';
} else {
  if ($err) flash($err, 'err');
  echo '<h1>Primer acceso</h1><p class="muted">Crea tu usuario y contraseña de administrador.</p>';
  echo '<form method="post" class="card">';
  echo '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
  echo '<label>Usuario<input name="user" required minlength="3" autocomplete="username"></label>';
  echo '<label>Contraseña<input type="password" name="pass" required minlength="8" autocomplete="new-password"></label>';
  echo '<button class="btn" type="submit">Crear acceso</button>';
  echo '</form>';
}
echo '</div></body></html>';
