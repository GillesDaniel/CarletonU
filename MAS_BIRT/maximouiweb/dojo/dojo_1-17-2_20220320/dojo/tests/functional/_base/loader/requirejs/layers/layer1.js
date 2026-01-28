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

//Example layer file.

define('alpha',
	['beta', 'gamma'],
	function (beta, gamma) {
		return {
			name: 'alpha',
			betaName: beta.name
		};
	}
);

define('beta',
	['gamma'],
	function (gamma) {
		return {
			name: 'beta',
			gammaName: gamma.name
		};
	}
);

define('gamma',
	['epsilon'],
	function (epsilon) {
		return {
			name: 'gamma',
			epsilonName: epsilon.name
		};
	}
);
