<?php 
header("Content-type: text/html; charset=UTF-8");
require_once("../vendor/autoload.php");

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

$emailTo = !empty($_POST['email']) ? $_POST['email'] : 'me@agkovalev.com';

$postNotEmpty = ( !empty( $_POST ) ) ? true : false;
if( $postNotEmpty ){

	$error = false;

	if ( !ValidateEmail( $emailTo ) ){
		$error = 'Email введен неправильно!';
	}

	if ( !$error ) {
		$mail = new PHPMailer();
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 2;
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';
		//Set the hostname of the mail server
		$mail->Host = "smtp.gmail.com";
		//Set the SMTP port number - likely to be 25, 465 or 587
		$mail->Port = 465;
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		$mail->SMTPSecure = 'ssl';
		//Username to use for SMTP authentication
		$mail->Username = "account@gmail.com";
		//Password to use for SMTP authentication
		$mail->Password = "Password";
		//Set who the message is to be sent from
		$mail->setFrom( CONTACT_FORM, 'TEST css3btngen' );
		//Set an alternative reply-to address
		// $mail->addReplyTo('replyto@example.com', 'First Last');
		//Set who the message is to be sent to
		$mail->addAddress( $emailTo, 'Dear user');
		//Set the subject line
		$mail->Subject = 'PHPMailer TEST css3btngen';
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->msgHTML( file_get_contents('send.html'), dirname(__FILE__) );
		//Replace the plain text body with one created manually
		$mail->AltBody = 'This is a plain-text message body';
		//Attach an image file
		// $mail->addAttachment('images/phpmailer_mini.png');

		//send the message, check for errors
		if ( !$mail->send() ) {
			echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
			echo "Message sent!";
		}
	}
	else {
		echo '<div class="bg-danger">'.$error.'</div>';
	}

}