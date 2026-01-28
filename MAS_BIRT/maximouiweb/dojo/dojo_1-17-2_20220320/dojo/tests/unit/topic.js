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

define([
	'intern!object',
	'intern/chai!assert',
	'dojo/aspect',
	'../../topic'
], function (registerSuite, assert, aspect, topic) {
	var aspectHandle,
		subscriptionHandles = [];

	registerSuite({
		name: 'dojo/topic',

		setup: function () {
			aspectHandle = aspect.after(topic, 'subscribe', function (handle) {
				subscriptionHandles.push(handle);
				return handle;
			});
		},

		teardown: function () {
			aspectHandle.remove();
		},

		afterEach: function () {
			while (subscriptionHandles.length > 0) {
				subscriptionHandles.pop().remove();
			}
		},

		'.subscribe and .publish': function () {
			var listenerCallCount = 0,
				expectedArgument;

			topic.subscribe('/test/foo', function (event) {
				assert.strictEqual(event, expectedArgument);
				listenerCallCount++;
			});

			expectedArgument = 'bar';
			topic.publish('/test/foo', expectedArgument);
			assert.strictEqual(listenerCallCount, 1);

			expectedArgument = 'baz';
			topic.publish('/test/foo', expectedArgument);
			assert.strictEqual(listenerCallCount, 2);
		},

		'unsubscribing': function () {
			var listenerCalled = false;

			var handle = topic.subscribe('/test/foo', function () {
				listenerCalled = true;
			});
			handle.remove();

			topic.publish('/test/foo', 'bar');
			assert.isFalse(listenerCalled);
		},

		'publish argument arity': function () {
			var publishArguments = [ '/test/topic' ],
				actualArguments;

			topic.subscribe('/test/topic', function () {
				actualArguments = Array.prototype.slice.call(arguments);
			});

			for (var i = 0; i <= 5; ++i) {
				if (i > 0) {
					publishArguments.push({ value: 'value-' + i });
				}

				topic.publish.apply(topic, publishArguments);
				assert.equal(actualArguments.length, i);
				assert.deepEqual(actualArguments, publishArguments.slice(1));
			}
		}
	});
});
