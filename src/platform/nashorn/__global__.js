/*
 * Envjs @VERSION@
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

var __context__ = Packages.jdk.nashorn.internal.runtime.Context.getContext();

var Envjs = Envjs || 
	require('envjs/platform/core').Envjs;
	require('local_settings');

Envjs.platform       = "Nashorn";
Envjs.revision       = "1.7.0.rc2";
Envjs.argv = [];
if(__argv__ && __argv__.length){
	for(var i = 0; i < __argv__.length; i++){
		Envjs.argv[i] = __argv__[i];
	}
}

Envjs.exit = function(){
	console.log("Exiting!");
	java.lang.System.exit(0);
};

// Loads the Mozilla Compatible Functions
// Used throughout 
load("nashorn:mozilla_compat.js");

