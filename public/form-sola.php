<?php
header("Content-Type: application/json");

// Destinataire
$to = "bmohamedgaith@gmail.com";
$from = "contact@entreprisesolacouverture.fr";

// Données
$nom = $_POST['nom'] ?? 'Inconnu';
$tel = $_POST['tel'] ?? '-';
$mail = $_POST['mail'] ?? '-';
$projet = $_POST['projet'] ?? '-';

$subject = "Devis Sola - " . $nom;
$sep = md5(time());

// Headers
$headers = "From: Entreprise sola <$from>\r\n";
$headers .= "Reply-To: $mail\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$sep\"\r\n";

// Corps
$body = "--$sep\r\n";
$body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n\r\n";
$body .= "<h2>Nouveau Devis</h2>
<p><b>Nom:</b> $nom</p>
<p><b>Tel:</b> $tel</p>
<p><b>Mail:</b> $mail</p>
<p><b>Projet:</b><br>$projet</p>\r\n";

// PJ
foreach ($_FILES as $f) {
    if ($f['error'] == 0) {
        $body .= "--$sep\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"" . $f['name'] . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment\r\n\r\n";
        $body .= chunk_split(base64_encode(file_get_contents($f['tmp_name']))) . "\r\n";
    }
}
$body .= "--$sep--";

// Envoi
if (mail($to, $subject, $body, $headers)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Erreur serveur local"]);
}
?>
