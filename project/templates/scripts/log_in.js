$(function() {
    $(".input-submit").on("click", function(event) {
        event.preventDefault();

        $(".error_message").remove();

        var email = $(".email-input");
        var password = $(".password-input");

        console.log(email.val());
        if (isEmail(email.val())) {
            console.log("Send to server!");
        } else {
            email.parent().append("<p class='error_message' style='color: red;'>Type correct email!</p>");
        }
    });
});

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}