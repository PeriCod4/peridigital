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

    $record = [
      'slug' => $slug,
      'title' => $title,
      'image' => $image,
      'servicios' => $servicios,
      'tags' => $tags,
      'description' => trim($_POST['description'] ?? ''),
      'url' => $url,
      'body' => trim($_POST['body'] ?? ''),
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
      'description' => $_POST['description'] ?? '', 'url' => $_POST['url'] ?? '', 'body' => $_POST['body'] ?? '',
      'published' => isset($_POST['published']), 'order' => $_POST['order'] ?? 0,
      'gallery' => $_POST['keep_gallery'] ?? [],
    ];
  }
}

$isNew = $current === null;
$v = $current ?? ['slug'=>'','title'=>'','image'=>'','servicios'=>[],'tags'=>[],'description'=>'','url'=>'','body'=>'','published'=>true,'order'=>0,'gallery'=>[]];

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

  <label>Contenido dinámico / caso de estudio <small>HTML opcional: párrafos, subtítulos, etc.</small><textarea name="body" rows="8"><?= e($v['body'] ?? '') ?></textarea></label>

  <div class="grid2">
    <label>Orden<input type="number" name="order" value="<?= e((string) ($v['order'] ?? 0)) ?>"></label>
    <label class="check inline"><input type="checkbox" name="published" <?= ($v['published'] ?? true) ? 'checked' : '' ?>> Publicado</label>
  </div>

  <button class="btn" type="submit">Guardar proyecto</button>
</form>
<?php
layout_shell_close();
