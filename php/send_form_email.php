<?php
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "davidfdesousa@gmail.com";
    $email_subject = "Seu assunto de e-mail";
 
    function died($error) {
        // your error code can go here
        echo "Lamentamos, mas houve erro (s) encontrado (s) com o formulário que você enviou. ";
        echo "Esses erros aparecem abaixo.<br /><br />";
        echo $error."<br /><br />";
        echo "Por favor, volte e corrija esses erros.<br /><br />";
        die();
    }
 
 
    // validation expected data exists
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('Lamentamos, mas parece haver um problema com o formulário que você enviou.');       
    }
 
     
 
    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
  if(!preg_match($email_exp,$email_from)) {
    $error_message .= 'O endereço de e-mail que você inseriu não parece ser válido.<br />';
  }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
  if(!preg_match($string_exp,$first_name)) {
    $error_message .= 'O primeiro nome que você inseriu não parece ser válido.<br />';
  }
 
  if(!preg_match($string_exp,$last_name)) {
    $error_message .= 'O sobrenome que você inseriu não parece ser válido.<br />';
  }
 
  if(strlen($comments) < 2) {
    $error_message .= 'Os comentários que você inseriu não parecem ser válidos.<br />';
  }
 
  if(strlen($error_message) > 0) {
    died($error_message);
  }
 
    $email_message = "Detalhes do formulário abaixo.\n\n";
 
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
     
 
    $email_message .= "Nome: ".clean_string($first_name)."\n";
    $email_message .= "Sobrenome: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Celular: ".clean_string($telephone)."\n";
    $email_message .= "Comentarios: ".clean_string($comments)."\n";
 
// create email headers
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers);  
?>
 
<!-- include your own success html here -->

Obrigado por entrar em contato! Responderei em Breve.
 
<?php
 
}
?>