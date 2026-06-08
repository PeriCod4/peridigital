<?php
// Endpoint de contacto para el formulario (se sirve desde el Hostinger en producción).
// El front estático hace POST aquí con FormData.
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$hp      = trim($_POST['website'] ?? ''); // honeypot anti-spam

if ($hp !== '' || $name === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'validation']);
    exit;
}

$to      = 'pablocamperosub@gmail.com';
$from    = 'pablo@camperodigital.com'; // remitente: buzón real del dominio (Hostinger lo exige)
$subject = 'Contacto web: ' . mb_substr($name, 0, 80);
$body    = "Nombre: $name\nEmail: $email\n\nMensaje:\n$message\n";
$headers = 'From: Campero Digital <' . $from . '>' . "\r\n" .
           'Reply-To: ' . $email . "\r\n" .
           'MIME-Version: 1.0' . "\r\n" .
           'Content-Type: text/plain; charset=utf-8';

// 5º parámetro: remitente de sobre (-f), necesario en muchos hostings (Hostinger).
$sent = @mail($to, $subject, $body, $headers, '-f ' . $from);

echo json_encode(['ok' => (bool) $sent]);
