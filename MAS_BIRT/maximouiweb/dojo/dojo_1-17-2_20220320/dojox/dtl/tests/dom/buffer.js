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

dojo.provide("dojox.dtl.tests.dom.buffer");

dojo.require("dojox.dtl.dom");
dojo.require("dojox.dtl.Context");
dojo.require("dojox.dtl.tests.dom.util");

doh.register("dojox.dtl.dom.buffer",
	[
		function test_insertion_order_text(t){
			var dd = dojox.dtl;

			var context = new dd.Context({
				first: false,
				last: false
			});

			var template = new dd.DomTemplate("<div>{% if first %}first{% endif %}middle{% if last %}last{% endif %}</div>");
			t.is("<div>middle</div>", dd.tests.dom.util.render(template, context));

			context.first = true;
			t.is("<div>firstmiddle</div>", dd.tests.dom.util.render(template, context));

			context.first = false;
			context.last = true;
			t.is("<div>middlelast</div>", dd.tests.dom.util.render(template, context));

			context.first = true;
			t.is("<div>firstmiddlelast</div>", dd.tests.dom.util.render(template, context));
		}
	]
);
