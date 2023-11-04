$(function() {
    var name = $(".name-input");
    var nickname = $(".nickname-input");
    var birth = $(".birth-input");
    var email = $(".email-input");
    var password = $(".password-input");

    birth.attr("max", new Date().toISOString().split('T')[0]);
    
    $(".input-submit").on("click", function(event) {
        event.preventDefault();

        $(".error_message").remove();

        var validName = false;
        var validNickname = false;
        var validEmail = false;
        var validPassword = false;

        // console.log(`
        //     ${name.val()}
        //     ${nickname.val()}
        //     ${birth.val()}
        //     ${email.val()}
        //     ${password.val()}
        //     `);

        if (isValidName(name.val())) validName = true;
        else name.parent().append("<p class='error_message'>Type correct name!</p>");
       
        if (isValidNickName(nickname.val())) validNickname = true;
        else nickname.parent().append("<p class='error_message'>Type correct nickname!</p>");
            
        if (isValidEmail(email.val())) validEmail = true;
        else email.parent().append("<p class='error_message'>Type correct email!</p>");    
        
        if (isValidPassword(password.val())) validPassword = true;
        else password.parent().append("<p class='error_message'>Password should have at least 6 characters only with letters and numbers!</p>");
    
        if (validName && validNickname && validEmail && validPassword) {

        }
    });
});

function isValidName(name) {
    if (name.length > 50) return false;
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

function isValidNickName(nickname) {
    if (nickname.length > 20) return false;
    var regex = /^[A-Za-z0-9]+$/;
    return regex.test(nickname);
}

function isValidEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isValidPassword(psswrd) {
    if (psswrd.length < 6) return false
    var regex = /^[a-z0-9]+$/;
    return regex.test(psswrd);
}
