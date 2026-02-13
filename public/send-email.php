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
$apiKey = "re_BeeU2vrT_36HPbT49wRnzqXmBAQdNuDRD";
$to = "bmohamedgaith@gmail.com"; // Email de réception
$from = "onboarding@resend.dev"; // Email d'envoi par défaut pour Resend (ou domaine configuré)

// Récupération des données
$fullName = $_POST['fullName'] ?? 'Inconnu';
$email = $_POST['email'] ?? '';
$phone = $_POST['phone'] ?? '';
$description = $_POST['projectDescription'] ?? '';

$subject = "Nouveau Devis - Site Web: $fullName";

// Corps du message HTML pour Resend
$htmlContent = "
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom:</strong> $fullName</p>
    <p><strong>Téléphone:</strong> $phone</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Description du projet:</strong></p>
    <p>" . nl2br(htmlspecialchars($description)) . "</p>
";

// Préparation des pièces jointes pour Resend (format base64)
$attachments = [];
if (isset($_FILES['images']) && is_array($_FILES['images']['name'])) {
    $count = count($_FILES['images']['name']);
    for ($i = 0; $i < $count; $i++) {
        if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
            $fileName = $_FILES['images']['name'][$i];
            $fileTmp = $_FILES['images']['tmp_name'][$i];
            
            $content = file_get_contents($fileTmp);
            $attachments[] = [
                'filename' => $fileName,
                'content' => base64_encode($content)
            ];
        }
    }
}

// Construction du payload pour l'API Resend
$data = [
    'from' => "Entreprise SOLA <$from>",
    'to' => [$to],
    'subject' => $subject,
    'html' => $htmlContent,
    'reply_to' => $email ? $email : $to, // Si pas d'email client, répondre au destinataire
];

if (!empty($attachments)) {
    $data['attachments'] = $attachments;
}

// Envoi via cURL à l'API Resend
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["success" => true, "message" => "Devis envoyé avec succès"]);
} else {
    http_response_code(500);
    echo json_encode([
        "error" => "Erreur lors de l'envoi de l'email",
        "details" => json_decode($response, true),
        "curl_error" => $curlError
    ]);
}
?>
