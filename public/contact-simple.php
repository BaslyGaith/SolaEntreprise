<?php
/**
 * Formulaire de contact - Version compatible LWS
 * Permissions recommandées: CHMOD 644
 */

// Headers de sécurité
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Gestion des requêtes OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Vérifier que c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Méthode non autorisée"]);
    exit;
}

// Configuration email
$destinataire = "bmohamedgaith@gmail.com";
$expediteur = "contact@entreprisesolacouverture.fr";

// Récupération et nettoyage des données
$nom = isset($_POST['nom']) ? strip_tags(trim($_POST['nom'])) : '';
$telephone = isset($_POST['tel']) ? strip_tags(trim($_POST['tel'])) : '';
$email = isset($_POST['mail']) ? filter_var(trim($_POST['mail']), FILTER_SANITIZE_EMAIL) : '';
$projet = isset($_POST['projet']) ? strip_tags(trim($_POST['projet'])) : '';

// Validation basique
if (empty($nom) || empty($telephone)) {
    echo json_encode([
        "success" => false,
        "error" => "Le nom et le téléphone sont obligatoires"
    ]);
    exit;
}

// Validation email si fourni
if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "error" => "L'adresse email n'est pas valide"
    ]);
    exit;
}

// Préparation du sujet
$sujet = "Nouveau Devis - " . $nom;

// Construction du message HTML
$message = "<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0f172a; color: white; padding: 20px; text-align: center; }
        .content { background: #f8f9fa; padding: 20px; margin: 20px 0; }
        .field { margin: 15px 0; padding: 10px; background: white; border-left: 4px solid #3b82f6; }
        .label { font-size: 11px; color: #666; text-transform: uppercase; font-weight: bold; }
        .value { font-size: 16px; color: #0f172a; margin-top: 5px; }
        .footer { text-align: center; color: #999; font-size: 12px; padding: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>ENTREPRISE SOLA</h1>
            <p>Nouvelle demande de devis</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Client</div>
                <div class='value'>" . htmlspecialchars($nom) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Téléphone</div>
                <div class='value'>" . htmlspecialchars($telephone) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email</div>
                <div class='value'>" . htmlspecialchars($email ?: 'Non fourni') . "</div>
            </div>
            <div class='field'>
                <div class='label'>Description du projet</div>
                <div class='value'>" . nl2br(htmlspecialchars($projet)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>© " . date('Y') . " Entreprise SOLA - Tous droits réservés</p>
            <p>Message envoyé depuis entreprisesolacouverture.fr</p>
        </div>
    </div>
</body>
</html>";

// Headers email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Entreprise SOLA <" . $expediteur . ">\r\n";

if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: " . $email . "\r\n";
}

// Tentative d'envoi
$envoi = @mail($destinataire, $sujet, $message, $headers);

if ($envoi) {
    echo json_encode([
        "success" => true,
        "message" => "Votre demande a été envoyée avec succès. Nous vous contacterons sous 24h."
    ]);
} else {
    // Log pour debug (optionnel)
    error_log("Erreur envoi email pour: " . $nom . " (" . $email . ")");
    
    echo json_encode([
        "success" => false,
        "error" => "Impossible d'envoyer le message. Veuillez nous contacter au 07 67 19 02 80."
    ]);
}
?>
