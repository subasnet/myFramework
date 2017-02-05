(function(global, $){
    
    var myFrame = function(firstName, lastName, language){
        return new myFrame.init(firstName, lastName, language);
    }
    
    myFrame.prototype = {};
    
    // function constructor
    myFrame.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }
    
    myFrame.init.prototype = myFrame.prototype;
    
    // globally global.myFrame and F$ refer to myFrame of this function
    global.myFrame = global.F$ = myFrame;
    
}(window, jQuery));