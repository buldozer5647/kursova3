$(function() {
    $(".input-submit").on("click", function(event) {
        event.preventDefault();

        $(".error_message").remove();

        var email = $(".email-input");
        var password = $(".password-input");

        console.log(email.val());
        if (isValidEmail(email.val())) console.log("Send to server1!");
        else email.parent().append("<p class='error_message' style='color: red;'>Type correct email!</p>");

        if (isValidPassword(password.val())) console.log("Send to server2!");
        else password.parent().append("<p class='error_message' style='color: red;'>Type correct password!</p>");
    });
});

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isValidPassword(psswrd) {
    if (psswrd.length < 6) return false
    var regex = /^[a-z0-9]+$/;
    return regex.test(psswrd);
}
