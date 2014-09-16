<?php 
header("Content-type: text/html; charset=UTF-8");
require_once("../vendor/autoload.php");

// $mail = new PHPMailer();

// var_dump($mail);

define("CONTACT_FORM", 'kovalev.agk@gmail.com');
 
function ValidateEmail($value){
	$regex = '/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i';

	if($value == '') { 
		return false;
	} else {
		$string = preg_replace($regex, '', $value);
	}

	return empty($string) ? true : false;
}

$post = (!empty($_POST)) ? true : false;

if($post){

	$name = stripslashes($_POST['name']);
	$phone = stripslashes($_POST['phone']);
	$email = stripslashes($_POST['email']);
	$subject = 'Заявка';
	$error = '';    
	$message = '
		<html>
				<head>
						<title>Заявка</title>
				</head>
				<body>
						<p>Имя: '.$name.'</p>
						<p>Телефон : '.$phone.'</p> 
						<p>Email : '.$email.'</p>
				</body>
		</html>';

	if (!ValidateEmail($email)){
		$error = 'Email введен неправильно!';
	}

	if(!$error){
		$mail = mail(CONTACT_FORM, $subject, $message,
			 "From: ".$name." <".$email.">\r\n"
			."Reply-To: ".$email."\r\n"
			."Content-type: text/html; charset=utf-8 \r\n"
			."X-Mailer: PHP/" . phpversion());

		if($mail){
			echo 'OK';
		}
	}else{
		echo '<div class="bg-danger">'.$error.'</div>';
	}

}