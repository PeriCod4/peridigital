<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/auth.php';
require_login();

$indexFile = cfg()['data_dir'] . '/articles-index.json';   // read-only (build)
$overFile  = cfg()['data_dir'] . '/article-images.json';   // admin-owned

$articles = read_json($indexFile, []);
if (!is_array($articles)) $articles = [];
$overrides = read_json($overFile, []);
if (!is_array($overrides)) $overrides = [];

$msg = '';
$err = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  $slug = (string) ($_POST['slug'] ?? '');
  $action = (string) ($_POST['action'] ?? '');
  // validar que el slug existe en el índice
  $known = false;
  foreach ($articles as $a) if (($a['slug'] ?? '') === $slug) $known = true;
  if (!$known) {
    $err = 'Artículo desconocido.';
  } elseif ($action === 'clear') {
    unset($overrides[$slug]);
    write_json_atomic($overFile, $overrides);
    redirect('article-images.php?c=1#' . urlencode($slug));
  } elseif ($action === 'set') {
    try {
      $url = save_upload('image_file', 'articulos');
      if (!$url) throw new RuntimeException('Selecciona una imagen.');
      $overrides[$slug] = $url;
      write_json_atomic($overFile, $overrides);
      redirect('article-images.php?s=1#' . urlencode($slug));
    } catch (Throwable $ex) {
      $err = $ex->getMessage();
    }
  }
}
if (isset($_GET['s'])) $msg = 'Imagen guardada.';
if (isset($_GET['c'])) $msg = 'Imagen quitada.';

layout_head('Imágenes de artículos');
layout_shell_open('article-images.php');

echo '<div class="topbar"><h1>Imágenes de artículos</h1></div>';
echo '<p class="muted">Añade o cambia la imagen destacada de cada artículo. Se ve al instante en la web (el og:image se actualiza para Google en el siguiente despliegue).</p>';
if ($msg) flash($msg, 'ok');
if ($err) flash($err, 'err');

echo '<input class="search" id="q" type="search" placeholder="Buscar artículo…" oninput="filterRows()">';
echo '<div class="list" id="rows">';
foreach ($articles as $a) {
  $slug = (string) ($a['slug'] ?? '');
  $title = (string) ($a['title'] ?? $slug);
  $over = $overrides[$slug] ?? '';
  $build = (string) ($a['coverUrl'] ?? '');
  $currentUrl = $over !== '' ? $over : $build;
  $srcLabel = $over !== '' ? 'editada' : ($build !== '' ? 'del build' : 'sin imagen');
  echo '<div class="row" id="' . e($slug) . '" data-t="' . e(mb_strtolower($title)) . '">';
  echo '<div class="thumb">' . ($currentUrl ? '<img src="' . e($currentUrl) . '" alt="" loading="lazy">' : '<span class="muted small">sin imagen</span>') . '</div>';
  echo '<div class="rowmain"><strong>' . e($title) . '</strong><div class="muted small">/' . e($slug) . '/ · <span class="chip">' . e($srcLabel) . '</span></div></div>';
  echo '<form class="rowact" method="post" enctype="multipart/form-data">';
  echo '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
  echo '<input type="hidden" name="slug" value="' . e($slug) . '">';
  echo '<input type="hidden" name="action" value="set">';
  echo '<input type="file" name="image_file" accept="image/*" required>';
  echo '<button class="btn" type="submit">Guardar</button>';
  if ($over) {
    echo '</form><form method="post" class="inlineform"><input type="hidden" name="csrf" value="' . e(csrf_token()) . '"><input type="hidden" name="slug" value="' . e($slug) . '"><input type="hidden" name="action" value="clear"><button class="btn danger" type="submit">Quitar</button></form>';
  } else {
    echo '</form>';
  }
  echo '</div>';
}
echo '</div>';
?>
<script>
function filterRows(){
  var q=document.getElementById('q').value.toLowerCase();
  document.querySelectorAll('#rows .row').forEach(function(r){
    r.style.display = r.getAttribute('data-t').indexOf(q)>=0 ? '' : 'none';
  });
}
</script>
<?php
layout_shell_close();
