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
function MyClass(){
    this.foo = function(argument1, argument2){
            var mytest = test;
			return mytest;
    }
    this.bar = function(){}
}
var test = "data";

result = new MyClass().foo();
})();
