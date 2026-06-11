<?php
declare(strict_types=1);

function cfg(): array {
  static $c = null;
  if ($c === null) $c = require __DIR__ . '/config.php';
  return $c;
}

function start_session(): void {
  if (session_status() === PHP_SESSION_ACTIVE) return;
  session_name('pdadmin');
  session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/admin',
    'secure' => !empty($_SERVER['HTTPS']),
    'httponly' => true,
    'samesite' => 'Lax',
  ]);
  session_start();
}

function e(?string $s): string {
  return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

function csrf_token(): string {
  start_session();
  if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
  return $_SESSION['csrf'];
}

function csrf_check(): void {
  start_session();
  $t = $_POST['csrf'] ?? '';
  if (!is_string($t) || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $t)) {
    http_response_code(400);
    exit('Petición inválida (CSRF).');
  }
}

function read_json(string $file, $default) {
  if (!is_file($file)) return $default;
  $d = json_decode((string) file_get_contents($file), true);
  return $d === null ? $default : $d;
}

function write_json_atomic(string $file, $data): bool {
  $dir = dirname($file);
  if (!is_dir($dir)) @mkdir($dir, 0755, true);
  $tmp = $file . '.' . bin2hex(random_bytes(6)) . '.tmp';
  $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
  if ($json === false) return false;
  if (@file_put_contents($tmp, $json, LOCK_EX) === false) return false;
  return @rename($tmp, $file);
}

function slugify(string $s): string {
  $s = strtolower(trim($s));
  $s = strtr($s, ['á'=>'a','é'=>'e','í'=>'i','ó'=>'o','ú'=>'u','ñ'=>'n','ü'=>'u','à'=>'a','è'=>'e']);
  $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
  return trim($s, '-');
}

function redirect(string $to): void {
  header('Location: ' . $to);
  exit;
}

// Sube una imagen de $_FILES[$key] a uploads/$subdir y devuelve su URL pública,
// o null si no se subió nada. Lanza en error de validación.
function save_upload(string $key, string $subdir): ?string {
  if (empty($_FILES[$key]) || ($_FILES[$key]['error'] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) {
    return null;
  }
  $f = $_FILES[$key];
  if ($f['error'] !== UPLOAD_ERR_OK) throw new RuntimeException('Error al subir la imagen.');
  if ($f['size'] > 6 * 1024 * 1024) throw new RuntimeException('Imagen demasiado grande (máx 6 MB).');
  $finfo = new finfo(FILEINFO_MIME_TYPE);
  $mime = $finfo->file($f['tmp_name']);
  $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
  if (!isset($allowed[$mime])) throw new RuntimeException('Formato no permitido (usa JPG, PNG, WEBP o GIF).');
  $ext = $allowed[$mime];
  $subdir = preg_replace('/[^a-z]/', '', $subdir) ?? 'misc';
  $dir = cfg()['uploads_dir'] . '/' . $subdir;
  if (!is_dir($dir)) @mkdir($dir, 0755, true);
  $name = bin2hex(random_bytes(8)) . '.' . $ext;
  if (!move_uploaded_file($f['tmp_name'], $dir . '/' . $name)) {
    throw new RuntimeException('No se pudo guardar la imagen (permisos).');
  }
  return cfg()['uploads_url'] . '/' . $subdir . '/' . $name;
}

// ---- Layout ----
function layout_head(string $title): void {
  $t = e($title);
  echo <<<HTML
<!doctype html>
<html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>$t · PeriDigital admin</title>
<link rel="stylesheet" href="styles.css">
</head><body>
HTML;
}

function layout_shell_open(string $active): void {
  $nav = [
    'index.php' => ['Proyectos', '🗂️'],
    'article-images.php' => ['Imágenes de artículos', '🖼️'],
  ];
  echo '<div class="layout"><aside class="sidebar"><div class="brand">Peri<span>Digital</span><small>admin</small></div><nav>';
  foreach ($nav as $href => [$label, $icon]) {
    $cls = ($active === $href) ? ' class="on"' : '';
    echo '<a href="' . e($href) . '"' . $cls . '><span>' . $icon . '</span>' . e($label) . '</a>';
  }
  echo '</nav><a class="logout" href="logout.php">Cerrar sesión</a></aside><main class="content">';
}

function layout_shell_close(): void {
  echo '</main></div></body></html>';
}

function flash(string $msg, string $type = 'ok'): void {
  echo '<div class="flash ' . e($type) . '">' . e($msg) . '</div>';
}
