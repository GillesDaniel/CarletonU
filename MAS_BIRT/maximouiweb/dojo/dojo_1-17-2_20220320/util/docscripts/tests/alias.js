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

// one would expect this to work. 
dojo.provide("util.docscripts.tests.alias");
(function(_dojo){

    dojo.sampleFunction = function(a, b, c){
        // summary: WTF
        return ""; // String
    }
    
})(dojo); // (this.dojo) works
