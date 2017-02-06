// gets a new object ( the architecture allows us to not have to use the 'new' keyword here)
var f = F$('Subash', 'Basnet');

// use our chainable methods
f.greet().setLang('fn').greet(true);

// let's use our object on the click or the login button
$('#login').click(function(){
    
    // create a new 'myFrame' object ( let's  pretend we know the name from the login)
    var loginGrtr = F$('Subash', 'Basnet');
    
    // hide the login on the screen
    $('#logindiv').hide();
    
    // fire off an HTML greeting, passing the '#greeting' as the selector and the choosen language, and the welcome  as well
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting',true).log();
})