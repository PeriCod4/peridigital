<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/auth.php';
start_session();

if (is_logged_in()) redirect('index.php');
$creds = current_creds();
if (!$creds) redirect('setup.php');

$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $u = trim($_POST['user'] ?? '');
  $p = (string) ($_POST['pass'] ?? '');
  if (hash_equals($creds['user'], $u) && password_verify($p, $creds['pass_hash'])) {
    session_regenerate_id(true);
    $_SESSION['uid'] = $u;
    redirect('index.php');
  }
  usleep(400000);
  $err = 'Usuario o contraseña incorrectos.';
}

layout_head('Entrar');
echo '<div class="auth">';
echo '<div class="brand center">Peri<span>Digital</span><small>admin</small></div>';
if ($err) flash($err, 'err');
echo '<form method="post" class="card">';
echo '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
echo '<label>Usuario<input name="user" required autocomplete="username"></label>';
echo '<label>Contraseña<input type="password" name="pass" required autocomplete="current-password"></label>';
echo '<button class="btn" type="submit">Entrar</button>';
echo '</form></div></body></html>';
