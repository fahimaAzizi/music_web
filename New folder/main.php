<!-- login.php -->
<?php
$email = $_POST['email'];
$password = $_POST['password'];

if (strpos($email, '@gmail.com') !== false && !empty($password)) {
    // Redirect to the second page if valid
    header('Location: second.html');
    exit();
} else {
    // Show an error if invalid
    echo 'Invalid Gmail or password. <a href="index.html">Go back</a>';
}
?>
