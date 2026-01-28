/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

result = "";

(function() {
    CallMe = function(callback) {
        callback();
    };

    var say_hello_twice = function() {
        say_hello();

        CallMe(function(){
            say_hello();
        });
    };

    var say_hello = function() {
        result += 'hello world';
    };

    say_hello_twice();
})();
