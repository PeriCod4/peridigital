<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';

function current_creds(): ?array {
  $f = cfg()['creds_file'];
  if (!is_file($f)) return null;
  $c = require $f;
  return (is_array($c) && !empty($c['user']) && !empty($c['pass_hash'])) ? $c : null;
}

function is_logged_in(): bool {
  start_session();
  return !empty($_SESSION['uid']);
}

function require_login(): void {
  if (!is_logged_in()) redirect('login.php');
}
