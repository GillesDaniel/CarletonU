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

define([], function(){
	var
		count = 0,
		max = 10,
		queue = [];
	return {
		release:function(){
			if(queue.length){
				(queue.shift())();
			}else{
				count--;
			}
		},
		enqueue:function(proc){
			if(count<max){
				count++;
				proc();
			}else{
				queue.push(proc);
			}
		}
	};
});
