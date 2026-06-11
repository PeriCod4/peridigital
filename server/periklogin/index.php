<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/auth.php';
require_login();

$file = cfg()['data_dir'] . '/projects.json';
$projects = read_json($file, []);
if (!is_array($projects)) $projects = [];

$msg = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['action'] ?? '') === 'delete') {
  csrf_check();
  $slug = (string) ($_POST['slug'] ?? '');
  $projects = array_values(array_filter($projects, fn($p) => ($p['slug'] ?? '') !== $slug));
  write_json_atomic($file, $projects);
  redirect('index.php?d=1');
}
if (isset($_GET['d'])) $msg = 'Proyecto eliminado.';
if (isset($_GET['s'])) $msg = 'Proyecto guardado.';

usort($projects, fn($a, $b) => ($a['order'] ?? 0) <=> ($b['order'] ?? 0));

layout_head('Proyectos');
layout_shell_open('index.php');

echo '<div class="topbar"><h1>Proyectos</h1><a class="btn" href="project-edit.php">+ Nuevo proyecto</a></div>';
if ($msg) flash($msg, 'ok');

if (!$projects) {
  echo '<p class="muted">Aún no hay proyectos. Crea el primero.</p>';
} else {
  echo '<div class="list">';
  foreach ($projects as $p) {
    $slug = (string) ($p['slug'] ?? '');
    $img = (string) ($p['image'] ?? '');
    echo '<div class="row">';
    echo '<div class="thumb">' . ($img ? '<img src="' . e($img) . '" alt="">' : '') . '</div>';
    echo '<div class="rowmain"><strong>' . e($p['title'] ?? $slug) . '</strong>';
    echo '<div class="chips">';
    foreach (($p['servicios'] ?? []) as $s) echo '<span class="chip svc">' . e($s) . '</span>';
    foreach (($p['tags'] ?? []) as $t) echo '<span class="chip">' . e($t) . '</span>';
    echo '</div></div>';
    echo '<div class="rowact">';
    if (($p['published'] ?? true) === false) echo '<span class="chip off">oculto</span>';
    echo '<a class="btn ghost" href="project-edit.php?slug=' . urlencode($slug) . '">Editar</a>';
    echo '<form method="post" onsubmit="return confirm(\'¿Eliminar este proyecto?\')">';
    echo '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
    echo '<input type="hidden" name="action" value="delete"><input type="hidden" name="slug" value="' . e($slug) . '">';
    echo '<button class="btn danger" type="submit">Eliminar</button></form>';
    echo '</div></div>';
  }
  echo '</div>';
}

layout_shell_close();
