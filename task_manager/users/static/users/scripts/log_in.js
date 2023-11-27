$(function() {
    $(".input-submit").on("click", function(event) {
        event.preventDefault();

        $(".error_message").remove();

        var email = $(".username-input");
        var password = $(".password-input");

        console.log(email.val());
        if (isValidNickName(email.val())) console.log("Send to server1!");
        else email.parent().append("<p class='error_message' style='color: red;'>Type correct username!</p>");

        if (isValidPassword(password.val())) console.log("Send to server2!");
        else password.parent().append("<p class='error_message' style='color: red;'>Type correct password!</p>");
    });
});

function isValidNickName(nickname) {
    if (nickname.length > 20) return false;
    var regex = /^[A-Za-z0-9]+$/;
    return regex.test(nickname);
}

function isValidPassword(psswrd) {
    if (psswrd.length < 6) return false
    var regex = /^[a-z0-9]+$/;
    return regex.test(psswrd);
}
