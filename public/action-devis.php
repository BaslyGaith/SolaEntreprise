<?php
header("Content-Type: application/json");

// Destinataires
$to = "bmohamedgaith@gmail.com";
$from = "contact@entreprisesolacouverture.fr";

// Données du POST
$name = $_POST['fullName'] ?? 'Inconnu';
$phone = $_POST['phone'] ?? 'Non fourni';
$email = $_POST['email'] ?? 'Non fourni';
$desc = $_POST['projectDescription'] ?? 'Aucune description';

$subject = "🏠 Nouveau Devis : " . $name;
$boundary = md5(time());

// En-têtes pour les mails avec pièces jointes
$headers = "From: Entreprise SOLA <$from>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Corps du message (HTML)
$message = "--$boundary\r\n";
$message .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";

$message .= "
<!DOCTYPE html>
<html lang='fr'>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
    <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;'>
        <div style='background-color: #0f172a; color: white; padding: 20px; text-align: center;'>
            <h1 style='margin: 0;'>Entreprise SOLA</h1>
        </div>
        <div style='padding: 20px;'>
            <h2 style='color: #1e293b;'>Nouvelle Demande de Devis</h2>
            <hr style='border: 0; border-top: 1px solid #eee;'>
            <p><strong>Client :</strong> $name</p>
            <p><strong>Téléphone :</strong> $phone</p>
            <p><strong>Email :</strong> $email</p>
            <div style='background: #f8fafc; padding: 15px; border-radius: 5px; margin-top: 15px;'>
                <p><strong>Description du projet :</strong></p>
                <p style='white-space: pre-wrap;'>$desc</p>
            </div>
        </div>
        <div style='text-align: center; padding: 20px; font-size: 12px; color: #999;'>
            Envoyé depuis le site entreprisesolacouverture.fr
        </div>
    </div>
</body>
</html>\r\n";

// Gestion des images
foreach ($_FILES as $file) {
    if ($file['error'] == UPLOAD_ERR_OK) {
        $filename = $file['name'];
        $temp_name = $file['tmp_name'];
        $content = file_get_contents($temp_name);
        $encoded_content = chunk_split(base64_encode($content));

        $message .= "--$boundary\r\n";
        $message .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
        $message .= "Content-Transfer-Encoding: base64\r\n";
        $message .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
        $message .= $encoded_content . "\r\n";
    }
}

$message .= "--$boundary--";

// Envoi
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Erreur lors de l'envoi de l'email."]);
}
?>
