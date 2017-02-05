(function(global, $){
    
    var myFrame = function(firstName, lastName, language){
        return new myFrame.init(firstName, lastName, language);
    }
    
    var supportedLangs = ['en', 'fn'];
    
    var greetings = {
        en: 'Hi',
        fn: 'Hei'
    };
    
    var formalGreetings ={
        en: 'Hello',
        fn: 'Terve'
    };
    
    var logMessages ={
        en: 'Loggen in.',
        fn: 'Kirjautunut sisään.'
    };
    
    myFrame.prototype = {
        
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            if (supportedLangs.indexOf(this.language)=== -1){
                throw "Invalid language.";
            }
        },
        
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName(); 
        },
        
        greet: function(formal){
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if(formal){
                msg = this.formalGreeting();
            }
            else {
                msg = this.greeting();
            }
            
            if(console){
                console.log(msg);
            }
            
            // 'this' refers to calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            return this;
        },
        
        setLang: function(lang){
            this.language = lang;
            this.validate();
            return this;
        },
        
        HTMLGreeting: function(selector, formal){
            
            if(!$){
                throw 'jQuery not loaded';
            }
            
            if(!selector){
                throw 'Missing jQuery slector';
            }
            
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting;
            }
            
            $(selector).html(msg);
            
            return this;
        }
    };
    
    // function constructor
    myFrame.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }
    
    // it makes sure that object created with myFrame.init has access to all myFrame.prototype properties and methods
    myFrame.init.prototype = myFrame.prototype;
    
    // globally global.myFrame and F$ refer to myFrame of this function
    global.myFrame = global.F$ = myFrame;
    
}(window, jQuery));