<?php 
$email = $_POST['email'];
$name = $_POST['name'];
//$subject = $_POST['subject'];
$message = $_POST['message'];
	if (isset($_POST['email'])) {
		$ourMail = "cuentanos@xpresaweb.com"; //Insert your email address here
        $pre_messagebody_info = "";
		echo $email." - ".$name." - ".$subject." - ".$message;
		$headers = 'MIME-Version: 1.0' . "\r\n";
        $headers.= 'Content-type: text/html; charset=UTF-8' . "\r\n";
        $headers.= "From: ".$email."\r\n";
		$pre_messagebody_info.="<strong>Name</strong>" . ": " . $name . "<br />";
        $pre_messagebody_info.="<strong>E-mail</strong>" . ": " . $email . "<br />";
        if (empty($_POST['subject']) ) {
			$subject = "Website Contact Form";
		} else {
			$subject = $_POST['subject'];
		}
        $after_message = "\r\n<br />--------------------------------------------------------------------------------------------------\r\n<br /> This mail was sent via contact form";

        if (mail($ourMail, $subject, $pre_messagebody_info .= $category . "<strong>Message</strong>" . ": " . $message .$after_message, $headers)) {
       //	if(mail($ourMail,$subject,$message,$headers)){
            $result = "success";
        } else {
            $result = "server_fail";
        }
        echo json_encode($result);
        exit;
	}else{
		echo "Vacio :c";
	}
 ?>