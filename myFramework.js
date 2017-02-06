(function(global, $){
    
    // 'new' an object
    var myFrame = function(firstName, lastName, language){
        return new myFrame.init(firstName, lastName, language);
    }
    
    // hidden within the scope of the IIFE (immediately-invoked function expression) and never directly accessible
    var supportedLangs = ['en', 'fn'];
    
    // informal greetings
    var greetings = {
        en: 'Hi',
        fn: 'Hei'
    };
    
    // formal greetings
    var formalGreetings ={
        en: 'Hello',
        fn: 'Terve'
    };
    
    // logger messages
    var logMessages ={
        en: 'Loggen in.',
        fn: 'Kirjautunut sisään.'
    };
    
    // prototype holds methods ( to save memory space )
    myFrame.prototype = {
        
        // 'this' refers to the calling object at execution time
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language)=== -1){
                throw "Invalid language.";
            }
        },
        
        // retrive messages from object by referring to properties using [] syntax
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreeting: function(){
            return formalGreetings[this.language] + ', ' + this.fullName(); 
        },
        
        // chainable methods return their own containing object
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
            
            // make chainable
            return this;
        },
        
        setLang: function(lang){
            
            // set the language
            this.language = lang;
            
            // validate
            this.validate();
            
            // make chainable
            return this;
        },
        
        HTMLGreeting: function(selector, formal){
            
            if(!$){
                throw 'jQuery not loaded';
            }
            
            if(!selector){
                throw 'Missing jQuery slector';
            }
            
            // determine the message
            var msg;
            if(formal){
                msg = this.formalGreeting();
            }
            else{
                msg = this.greeting;
            }
            
            // inject the message in the choosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }
    };
    
    // actual object is created here allowing us to 'new' an object without calling 'new', function constructor
    myFrame.init = function(firstName, lastName, language){
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
    }
    
    // it makes sure that object created with myFrame.init has access to all myFrame.prototype properties and methods
    // trick borrowed from jQuery so we don't have to use the 'new' keyword
    myFrame.init.prototype = myFrame.prototype;
    
    // attach our myFrame to the global object, and provide a shorthand '$F' for ease 
    global.myFrame = global.$F = myFrame;
    
}(window, jQuery));