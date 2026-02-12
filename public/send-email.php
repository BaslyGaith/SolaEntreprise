<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// Configuration
$to = "contact@entreprisesola.fr"; // Email de réception
$from = "noreply@entreprisesola.fr"; // Email d'envoi (doit être valide sur le serveur)

// Récupération des données
$fullName = $_POST['fullName'] ?? 'Inconnu';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$description = $_POST['projectDescription'] ?? '';

$subject = "Nouveau Devis - Site Web: $fullName";

// Boundary pour les pièces jointes
$boundary = md5(time());

// En-têtes
$headers = "From: $from\r\n";
if (!empty($email)) {
    $headers .= "Reply-To: $email\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Corps du message
$bodyText = "Une nouvelle demande de devis a été reçue via le site web.\n\n";
$bodyText .= "Nom: $fullName\n";
$bodyText .= "Téléphone: $phone\n";
$bodyText .= "Email: $email\n";
$bodyText .= "Description du projet:\n$description\n";

$message = "--$boundary\r\n";
$message .= "Content-Type: text/plain; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$message .= $bodyText . "\r\n";

// Gestion des pièces jointes
if (isset($_FILES['images']) && is_array($_FILES['images']['name'])) {
    $count = count($_FILES['images']['name']);
    for ($i = 0; $i < $count; $i++) {
        if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
            $fileName = $_FILES['images']['name'][$i];
            $fileTmp = $_FILES['images']['tmp_name'][$i];
            $fileType = $_FILES['images']['type'][$i];
            
            // Lire le contenu du fichier
            $content = file_get_contents($fileTmp);
            $contentEncoded = chunk_split(base64_encode($content));
            
            $message .= "--$boundary\r\n";
            $message .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
            $message .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
            $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
            $message .= $contentEncoded . "\r\n";
        }
    }
}

$message .= "--$boundary--";

// Envoi de l'email
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true, "message" => "Devis envoyé avec succès"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Erreur lors de l'envoi de l'email"]);
}
?>
