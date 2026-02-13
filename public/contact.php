<?php
// Désactiver l'affichage des erreurs pour éviter de polluer le JSON
error_reporting(0);
ini_set('display_errors', 0);

// Headers obligatoires
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Gestion OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Vérifier POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo '{"success":false,"error":"Méthode non autorisée"}';
    exit(0);
}

// Récupération des données
$nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$tel = isset($_POST['tel']) ? trim($_POST['tel']) : '';
$mail = isset($_POST['mail']) ? trim($_POST['mail']) : '';
$projet = isset($_POST['projet']) ? trim($_POST['projet']) : '';

// Validation
if (empty($nom) || empty($tel)) {
    echo '{"success":false,"error":"Nom et téléphone requis"}';
    exit(0);
}

// Configuration
$destinataire = "entreprisesola76@gmail.com";
$sujet = "Nouveau Devis - " . $nom;

// Message simple
$message = "NOUVEAU DEVIS\n\n";
$message .= "Nom: " . $nom . "\n";
$message .= "Téléphone: " . $tel . "\n";
$message .= "Email: " . ($mail ? $mail : 'Non fourni') . "\n";
$message .= "Projet: " . $projet . "\n";

// Headers
$headers = "From: contact@entreprisesolacouverture.fr\r\n";
if ($mail) {
    $headers .= "Reply-To: " . $mail . "\r\n";
}

// Envoi
$resultat = @mail($destinataire, $sujet, $message, $headers);

// Réponse
if ($resultat) {
    echo '{"success":true,"message":"Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h."}';
} else {
    echo '{"success":false,"error":"Impossible d\'envoyer le message. Contactez-nous au 07 67 19 02 80."}';
}

exit(0);
?>
