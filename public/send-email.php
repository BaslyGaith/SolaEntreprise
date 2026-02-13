<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Activer le rapport d'erreurs pour le debug
error_reporting(E_ALL);
ini_set('display_errors', 0);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit;
}

// CONFIGURATION
$apiKey = "re_Ps8xKKNb_PZfqi6ssSdnmo9UrDBE5odB5";
$to = "bmohamedgaith@gmail.com";
$from = "onboarding@resend.dev"; // Email autorisé par Resend pour les tests

// RÉCUPÉRATION DES DONNÉES
$fullName = $_POST['fullName'] ?? 'Inconnu';
$email = $_POST['email'] ?? 'Non fourni';
$phone = $_POST['phone'] ?? 'Non fourni';
$description = $_POST['projectDescription'] ?? 'Aucune description';

$subject = "🏠 Nouveau Devis - $fullName";

// TEMPLATE HTML (Généré par React Email)
$htmlContent = '
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="fr">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  </head>
  <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Ubuntu,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em;background-color:#ffffff;margin:0 auto;padding:20px 0 48px;margin-bottom:64px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="background-color:#0f172a;padding:32px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <h1 style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.025em;margin:0;text-transform:uppercase">SOLA ENTREPRISE</h1>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 48px">
              <tbody>
                <tr>
                  <td>
                    <h2 style="color:#1e293b;font-size:20px;font-weight:700;margin-bottom:16px">Nouveau Devis Reçu</h2>
                    <p style="font-size:16px;line-height:26px;margin:16px 0;color:#475569">Une nouvelle demande de devis a été soumise via le formulaire de contact du site web.</p>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e2e8f0;margin:20px 0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:16px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:12px;line-height:24px;margin:0 0 4px;color:#94a3b8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">Client</p>
                            <p style="font-size:16px;line-height:24px;margin:0;color:#1e293b;font-weight:500">'.$fullName.'</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:16px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:12px;line-height:24px;margin:0 0 4px;color:#94a3b8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">Email</p>
                            <p style="font-size:16px;line-height:24px;margin:0;color:#1e293b;font-weight:500">'.$email.'</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:16px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:12px;line-height:24px;margin:0 0 4px;color:#94a3b8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">Téléphone</p>
                            <p style="font-size:16px;line-height:24px;margin:0;color:#1e293b;font-weight:500">'.$phone.'</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e2e8f0;margin:20px 0" />
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-bottom:16px">
                      <tbody>
                        <tr>
                          <td>
                            <p style="font-size:12px;line-height:24px;margin:0 0 4px;color:#94a3b8;font-weight:700;letter-spacing:0.05em;text-transform:uppercase">Description du Projet</p>
                            <p style="font-size:14px;line-height:24px;margin:0;color:#475569;font-style:italic;background-color:#f8fafc;padding:16px;border-radius:8px;border:1px solid #e2e8f0">'.nl2br(htmlspecialchars($description)).'</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:12px;line-height:24px;margin:16px 0;color:#94a3b8;text-align:center;padding:0 48px">© 2026 Sola Entreprise. Tous droits réservés.<br />Ce message a été généré automatiquement par le site web.</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
';

// PIÈCES JOINTES
$attachments = [];
if (isset($_FILES['images']) && is_array($_FILES['images']['name'])) {
    $count = count($_FILES['images']['name']);
    for ($i = 0; $i < $count; $i++) {
        if ($_FILES['images']['error'][$i] === UPLOAD_ERR_OK) {
            $attachments[] = [
                'filename' => $_FILES['images']['name'][$i],
                'content' => base64_encode(file_get_contents($_FILES['images']['tmp_name'][$i]))
            ];
        }
    }
}

// PRÉPARATION DU PAYLOAD
$payload = [
    'from' => "Entreprise SOLA <$from>",
    'to' => [$to],
    'subject' => $subject,
    'html' => $htmlContent,
    'reply_to' => $email !== 'Non fourni' ? $email : $to,
];

if (!empty($attachments)) {
    $payload['attachments'] = $attachments;
}

// ENVOI VIA CURL
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $apiKey,
    'Content-Type: application/json',
]);
// Désactiver la vérification SSL si le serveur LWS a des certificats obsolètes
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["success" => true, "message" => "Devis envoyé avec succès"]);
} else {
    $errorData = json_decode($response, true);
    http_response_code(500);
    echo json_encode([
        "success" => false, 
        "error" => "Erreur API Resend (Code $httpCode)", 
        "details" => $errorData,
        "curl_error" => $curlError
    ]);
}
?>
