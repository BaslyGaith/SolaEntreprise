<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method Not Allowed"]);
    exit;
}

// Configuration
$to = "entreprisesola76@gmail.com";
$from = "contact@entreprisesolacouverture.fr";

// Get form data
$nom = isset($_POST['nom']) ? htmlspecialchars($_POST['nom']) : 'Inconnu';
$tel = isset($_POST['tel']) ? htmlspecialchars($_POST['tel']) : 'Non fourni';
$mail = isset($_POST['mail']) ? htmlspecialchars($_POST['mail']) : 'Non fourni';
$projet = isset($_POST['projet']) ? htmlspecialchars($_POST['projet']) : 'Aucune description';

// Email subject
$subject = "🏠 Nouveau Devis - " . $nom;
$boundary = md5(time());

// Email headers
$headers = "From: Entreprise SOLA <$from>\r\n";
if ($mail !== 'Non fourni' && filter_var($mail, FILTER_VALIDATE_EMAIL)) {
    $headers .= "Reply-To: $mail\r\n";
}
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

// Email body - HTML part
$body = "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";

$body .= "<!DOCTYPE html>
<html lang='fr'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
</head>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f6f9fc; margin: 0; padding: 0;'>
    <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #f6f9fc; padding: 20px 0;'>
        <tr>
            <td align='center'>
                <table width='600' cellpadding='0' cellspacing='0' style='background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);'>
                    <!-- Header -->
                    <tr>
                        <td style='background-color: #0f172a; padding: 30px; text-align: center;'>
                            <h1 style='color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: 2px;'>ENTREPRISE SOLA</h1>
                            <p style='color: #94a3b8; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;'>COUVERTURE & TOITURE</p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style='padding: 40px;'>
                            <h2 style='color: #0f172a; font-size: 22px; margin: 0 0 20px 0; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;'>📋 Nouvelle Demande de Devis</h2>
                            
                            <p style='color: #64748b; margin: 0 0 30px 0; font-size: 14px;'>Une nouvelle demande de devis a été soumise via le formulaire de contact du site web.</p>
                            
                            <!-- Client Info -->
                            <table width='100%' cellpadding='0' cellspacing='0' style='margin-bottom: 20px;'>
                                <tr>
                                    <td style='background-color: #f8fafc; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 10px;'>
                                        <p style='margin: 0 0 5px 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;'>👤 Client</p>
                                        <p style='margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;'>$nom</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <table width='100%' cellpadding='0' cellspacing='0' style='margin-bottom: 20px;'>
                                <tr>
                                    <td width='50%' style='padding-right: 10px;'>
                                        <div style='background-color: #f8fafc; padding: 15px; border-left: 4px solid #10b981; height: 100%;'>
                                            <p style='margin: 0 0 5px 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;'>📞 Téléphone</p>
                                            <p style='margin: 0; font-size: 16px; color: #0f172a; font-weight: 600;'>$tel</p>
                                        </div>
                                    </td>
                                    <td width='50%' style='padding-left: 10px;'>
                                        <div style='background-color: #f8fafc; padding: 15px; border-left: 4px solid #f59e0b; height: 100%;'>
                                            <p style='margin: 0 0 5px 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;'>✉️ Email</p>
                                            <p style='margin: 0; font-size: 14px; color: #0f172a; font-weight: 600; word-break: break-all;'>$mail</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Project Description -->
                            <table width='100%' cellpadding='0' cellspacing='0' style='margin-top: 20px;'>
                                <tr>
                                    <td style='background-color: #eff6ff; padding: 20px; border-radius: 8px; border: 1px solid #bfdbfe;'>
                                        <p style='margin: 0 0 10px 0; font-size: 11px; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;'>📝 Description du Projet</p>
                                        <p style='margin: 0; font-size: 15px; color: #1e293b; line-height: 1.6; white-space: pre-wrap;'>$projet</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style='background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;'>
                            <p style='margin: 0; font-size: 12px; color: #94a3b8;'>
                                © " . date('Y') . " Entreprise SOLA - Tous droits réservés<br>
                                <span style='font-size: 11px;'>Ce message a été généré automatiquement depuis entreprisesolacouverture.fr</span>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>\r\n";

// Handle file attachments
$hasAttachments = false;
foreach ($_FILES as $fileKey => $file) {
    if (isset($file['error']) && $file['error'] === UPLOAD_ERR_OK) {
        $hasAttachments = true;
        $filename = basename($file['name']);
        $content = file_get_contents($file['tmp_name']);
        $encoded_content = chunk_split(base64_encode($content));
        
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"$filename\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
        $body .= $encoded_content . "\r\n";
    }
}

$body .= "--$boundary--";

// Send email
$mailSent = @mail($to, $subject, $body, $headers);

if ($mailSent) {
    echo json_encode([
        "success" => true,
        "message" => "Votre demande de devis a été envoyée avec succès. Nous vous contacterons sous 24h."
    ]);
} else {
    // Log error for debugging (optional)
    error_log("Mail sending failed for: $nom ($mail)");
    
    echo json_encode([
        "success" => false,
        "error" => "Impossible d'envoyer l'email. Veuillez réessayer ou nous contacter directement au 07 67 19 02 80."
    ]);
}
?>
