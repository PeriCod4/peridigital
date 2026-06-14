<?php
declare(strict_types=1);
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/auth.php';
require_login();

const SERVICES = [
  'diseno-web' => 'Diseño web & Ecommerce',
  'soluciones-digitales' => 'Soluciones digitales',
  'crm-automatizacion' => 'CRM & Automatización',
  'paid-media' => 'Paid Media',
  'seo' => 'SEO',
  'analitica-datos' => 'Analítica & Data',
  'creacion-de-marca' => 'Creación de marca',
  'mantenimiento-web' => 'Mantenimiento web',
  'accesibilidad-web' => 'Accesibilidad web',
];

$file = cfg()['data_dir'] . '/projects.json';
$projects = read_json($file, []);
if (!is_array($projects)) $projects = [];

$editSlug = isset($_GET['slug']) ? (string) $_GET['slug'] : '';
$current = null;
foreach ($projects as $p) if (($p['slug'] ?? '') === $editSlug) $current = $p;

$err = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  csrf_check();
  try {
    $title = trim($_POST['title'] ?? '');
    if ($title === '') throw new RuntimeException('El título es obligatorio.');
    $slug = slugify(($_POST['slug'] ?? '') !== '' ? $_POST['slug'] : $title);
    if ($slug === '') throw new RuntimeException('Slug inválido.');

    $origSlug = (string) ($_POST['orig_slug'] ?? '');
    // colisión de slug (solo si cambia y choca con otro)
    foreach ($projects as $p) {
      if (($p['slug'] ?? '') === $slug && $slug !== $origSlug) {
        throw new RuntimeException('Ya existe un proyecto con ese slug.');
      }
    }

    $servicios = array_values(array_intersect(array_keys(SERVICES), $_POST['servicios'] ?? []));
    $tags = array_values(array_filter(array_map('trim', explode(',', $_POST['tags'] ?? ''))));

    // imagen: nueva subida o se conserva la actual
    $image = save_upload('image_file', 'proyectos') ?? (string) ($_POST['current_image'] ?? '');

    // galería: subir hasta 4 nuevas + conservar las existentes marcadas
    $gallery = [];
    foreach ((array) ($_POST['keep_gallery'] ?? []) as $g) if (is_string($g) && $g !== '') $gallery[] = $g;
    for ($i = 0; $i < 4; $i++) {
      $u = save_upload("gallery_$i", 'proyectos');
      if ($u) $gallery[] = $u;
    }

    $order = (int) ($_POST['order'] ?? 0);
    if ($order === 0) {
      $max = 0;
      foreach ($projects as $p) $max = max($max, (int) ($p['order'] ?? 0));
      $order = $max + 1;
    }

    $url = trim($_POST['url'] ?? '');
    if ($url !== '' && !preg_match('#^https?://#i', $url)) $url = 'https://' . $url;
    if ($url !== '' && !filter_var($url, FILTER_VALIDATE_URL)) throw new RuntimeException('La URL de la web no es válida.');

    // Bloques de contenido dinámico (repetidor). Se respeta el orden recibido.
    $blocks = [];
    foreach ((array) ($_POST['blocks'] ?? []) as $idx => $b) {
      if (!is_array($b)) continue;
      $type = (string) ($b['type'] ?? '');
      if ($type === 'heading') {
        $t = trim($b['text'] ?? '');
        if ($t !== '') $blocks[] = ['type' => 'heading', 'text' => $t];
      } elseif ($type === 'text') {
        $h = trim($b['html'] ?? '');
        if ($h !== '') $blocks[] = ['type' => 'text', 'html' => $h];
      } elseif ($type === 'quote') {
        $t = trim($b['text'] ?? '');
        if ($t !== '') $blocks[] = ['type' => 'quote', 'text' => $t, 'author' => trim($b['author'] ?? '')];
      } elseif ($type === 'image') {
        $u = save_upload("bfile_$idx", 'proyectos') ?? trim($b['image'] ?? '');
        if ($u !== '') $blocks[] = ['type' => 'image', 'url' => $u, 'alt' => trim($b['alt'] ?? ''), 'caption' => trim($b['caption'] ?? '')];
      } elseif ($type === 'image_text') {
        $u = save_upload("bfile_$idx", 'proyectos') ?? trim($b['image'] ?? '');
        $h = trim($b['html'] ?? '');
        if ($u !== '' || $h !== '') {
          $blocks[] = ['type' => 'image_text', 'url' => $u, 'alt' => trim($b['alt'] ?? ''), 'html' => $h, 'side' => (($b['side'] ?? 'left') === 'right' ? 'right' : 'left')];
        }
      }
    }

    $record = [
      'slug' => $slug,
      'title' => $title,
      'image' => $image,
      'servicios' => $servicios,
      'tags' => $tags,
      'description' => trim($_POST['description'] ?? ''),
      'url' => $url,
      'blocks' => $blocks,
      'gallery' => $gallery,
      'published' => isset($_POST['published']),
      'order' => $order,
    ];

    // upsert por origSlug (edición) o por slug (alta)
    $replaced = false;
    foreach ($projects as $i => $p) {
      if (($p['slug'] ?? '') === ($origSlug !== '' ? $origSlug : $slug)) {
        $projects[$i] = $record;
        $replaced = true;
        break;
      }
    }
    if (!$replaced) $projects[] = $record;

    if (!write_json_atomic($file, $projects)) throw new RuntimeException('No se pudo guardar (permisos de /data).');
    redirect('index.php?s=1');
  } catch (Throwable $ex) {
    $err = $ex->getMessage();
    // re-pintar con lo enviado
    $current = [
      'slug' => $_POST['slug'] ?? '', 'title' => $_POST['title'] ?? '',
      'image' => $_POST['current_image'] ?? '', 'servicios' => $_POST['servicios'] ?? [],
      'tags' => array_filter(array_map('trim', explode(',', $_POST['tags'] ?? ''))),
      'description' => $_POST['description'] ?? '', 'url' => $_POST['url'] ?? '',
      'blocks' => array_values(array_map(static function ($b) {
        $b = (array) $b;
        if (isset($b['image']) && !isset($b['url'])) $b['url'] = $b['image'];
        return $b;
      }, (array) ($_POST['blocks'] ?? []))),
      'published' => isset($_POST['published']), 'order' => $_POST['order'] ?? 0,
      'gallery' => $_POST['keep_gallery'] ?? [],
    ];
  }
}

$isNew = $current === null;
$v = $current ?? ['slug'=>'','title'=>'','image'=>'','servicios'=>[],'tags'=>[],'description'=>'','url'=>'','blocks'=>[],'body'=>'','published'=>true,'order'=>0,'gallery'=>[]];

layout_head($isNew ? 'Nuevo proyecto' : 'Editar proyecto');
layout_shell_open('index.php');

echo '<div class="topbar"><h1>' . ($isNew ? 'Nuevo proyecto' : 'Editar proyecto') . '</h1><a class="btn ghost" href="index.php">← Volver</a></div>';
if ($err) flash($err, 'err');

$svc = (array) ($v['servicios'] ?? []);
?>
<form method="post" enctype="multipart/form-data" class="card form">
  <input type="hidden" name="csrf" value="<?= e(csrf_token()) ?>">
  <input type="hidden" name="orig_slug" value="<?= e($editSlug) ?>">
  <input type="hidden" name="current_image" value="<?= e($v['image']) ?>">

  <label>Título<input name="title" required value="<?= e($v['title']) ?>"></label>
  <label>Slug (URL) <small>déjalo vacío para generarlo del título</small>
    <input name="slug" value="<?= e($v['slug']) ?>" placeholder="se-genera-solo"></label>

  <label>Descripción<textarea name="description" rows="4"><?= e($v['description']) ?></textarea></label>

  <label>Enlace a la web del proyecto <small>opcional (ej. https://cliente.com)</small>
    <input type="url" name="url" value="<?= e($v['url'] ?? '') ?>" placeholder="https://…"></label>

  <fieldset><legend>Servicios (filtro de la página)</legend>
    <div class="checks">
    <?php foreach (SERVICES as $s => $label): ?>
      <label class="check"><input type="checkbox" name="servicios[]" value="<?= e($s) ?>" <?= in_array($s, $svc, true) ? 'checked' : '' ?>> <?= e($label) ?></label>
    <?php endforeach; ?>
    </div>
  </fieldset>

  <label>Tags <small>separados por comas (ej. Moda, Ecommerce, Sistema de Reservas)</small>
    <input name="tags" value="<?= e(implode(', ', (array) ($v['tags'] ?? []))) ?>"></label>

  <label>Imagen / logo principal
    <div class="imgrow">
      <div class="curimg"><?php if (!empty($v['image'])): ?><img src="<?= e($v['image']) ?>" alt=""><span>actual</span><?php else: ?><span class="muted small">sin imagen</span><?php endif; ?></div>
      <input type="file" name="image_file" accept="image/*">
    </div>
    <small class="muted">Sube una imagen para reemplazar la actual.</small>
  </label>

  <fieldset><legend>Galería (opcional)</legend>
    <?php $gal = array_values(array_filter((array) ($v['gallery'] ?? []))); ?>
    <?php if ($gal): ?>
      <div class="gallerythumbs">
      <?php foreach ($gal as $g): ?>
        <label class="gthumb"><img src="<?= e($g) ?>" alt=""><span><input type="checkbox" name="keep_gallery[]" value="<?= e($g) ?>" checked> conservar</span></label>
      <?php endforeach; ?>
      </div>
    <?php endif; ?>
    <small class="muted">Añadir imágenes nuevas:</small>
    <div class="grid2">
      <input type="file" name="gallery_0" accept="image/*">
      <input type="file" name="gallery_1" accept="image/*">
      <input type="file" name="gallery_2" accept="image/*">
      <input type="file" name="gallery_3" accept="image/*">
    </div>
  </fieldset>

  <fieldset>
    <legend>Contenido dinámico (bloques)</legend>
    <p class="muted small">Añade bloques en el orden que quieras: encabezado, texto, imagen, imagen+texto o cita. Puedes reordenarlos (↑ ↓) y borrarlos (✕).</p>
    <div id="blocks"></div>
    <div class="blockadd">
      <button type="button" class="btn ghost" data-add="heading">+ Encabezado</button>
      <button type="button" class="btn ghost" data-add="text">+ Texto</button>
      <button type="button" class="btn ghost" data-add="image">+ Imagen</button>
      <button type="button" class="btn ghost" data-add="image_text">+ Imagen + texto</button>
      <button type="button" class="btn ghost" data-add="quote">+ Cita</button>
    </div>
  </fieldset>

  <div class="grid2">
    <label>Orden<input type="number" name="order" value="<?= e((string) ($v['order'] ?? 0)) ?>"></label>
    <label class="check inline"><input type="checkbox" name="published" <?= ($v['published'] ?? true) ? 'checked' : '' ?>> Publicado</label>
  </div>

  <button class="btn" type="submit">Guardar proyecto</button>
</form>

<script>
window.__BLOCKS__ = <?= json_encode(array_values((array) ($v['blocks'] ?? [])), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?>;
(function () {
  var wrap = document.getElementById('blocks');
  if (!wrap) return;
  var idx = 0;
  function esc(s) { return (s == null ? '' : String(s)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  var LABELS = { heading: 'Encabezado', text: 'Texto', image: 'Imagen', image_text: 'Imagen + texto', quote: 'Cita' };
  function imgField(i, d) {
    var url = d.url || d.image || '';
    return '<div class="imgrow"><div class="curimg">' + (url ? '<img src="' + esc(url) + '" alt="">' : '<span class="muted small">sin imagen</span>') + '</div><input type="file" name="bfile_' + i + '" accept="image/*"></div>' +
      '<input type="hidden" name="blocks[' + i + '][image]" value="' + esc(url) + '">';
  }
  var FIELDS = {
    heading: function (i, d) { return '<label>Encabezado<input name="blocks[' + i + '][text]" value="' + esc(d.text) + '"></label>'; },
    text: function (i, d) { return '<label>Texto (HTML)<textarea name="blocks[' + i + '][html]" rows="4">' + esc(d.html) + '</textarea></label>'; },
    quote: function (i, d) { return '<label>Cita<textarea name="blocks[' + i + '][text]" rows="2">' + esc(d.text) + '</textarea></label><label>Autor<input name="blocks[' + i + '][author]" value="' + esc(d.author) + '"></label>'; },
    image: function (i, d) { return imgField(i, d) + '<label>Texto alternativo<input name="blocks[' + i + '][alt]" value="' + esc(d.alt) + '"></label><label>Pie de foto<input name="blocks[' + i + '][caption]" value="' + esc(d.caption) + '"></label>'; },
    image_text: function (i, d) { return imgField(i, d) + '<label>Texto (HTML)<textarea name="blocks[' + i + '][html]" rows="4">' + esc(d.html) + '</textarea></label><label>Lado de la imagen<select name="blocks[' + i + '][side]"><option value="left"' + (d.side !== 'right' ? ' selected' : '') + '>Izquierda</option><option value="right"' + (d.side === 'right' ? ' selected' : '') + '>Derecha</option></select></label>'; }
  };
  function card(type, d) {
    d = d || {};
    var i = idx++;
    var el = document.createElement('div');
    el.className = 'block-card';
    el.innerHTML =
      '<div class="block-head"><span class="chip svc">' + (LABELS[type] || type) + '</span>' +
      '<div class="block-actions"><button type="button" data-mv="up" title="Subir">↑</button><button type="button" data-mv="down" title="Bajar">↓</button><button type="button" data-rm title="Eliminar">✕</button></div></div>' +
      '<input type="hidden" name="blocks[' + i + '][type]" value="' + type + '">' +
      '<div class="block-fields">' + (FIELDS[type] ? FIELDS[type](i, d) : '') + '</div>';
    return el;
  }
  wrap.addEventListener('click', function (e) {
    var btn = e.target.closest('button'); if (!btn) return;
    var c = e.target.closest('.block-card'); if (!c) return;
    if (btn.hasAttribute('data-rm')) { c.remove(); }
    else if (btn.getAttribute('data-mv') === 'up') { var p = c.previousElementSibling; if (p) wrap.insertBefore(c, p); }
    else if (btn.getAttribute('data-mv') === 'down') { var n = c.nextElementSibling; if (n) wrap.insertBefore(n, c); }
  });
  document.querySelectorAll('[data-add]').forEach(function (b) {
    b.addEventListener('click', function () { wrap.appendChild(card(b.getAttribute('data-add'))); });
  });
  (window.__BLOCKS__ || []).forEach(function (d) { if (d && d.type && FIELDS[d.type]) wrap.appendChild(card(d.type, d)); });
})();
</script>
<?php
layout_shell_close();
