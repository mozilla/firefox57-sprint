/* Try to detect FF version */
function detectBrowser() {
	var ECMAScriptStatus = "!",
	    ecmaVersion = 6,
	    userAgent = navigator.userAgent;

if (navigator.userAgent.search(/Firefox/) > -1) {
	var ffVersion = userAgent.split("Firefox/") [1],
	    ffVersion = ffVersion.split(" ") [0],
	    ffVersion = ffVersion.split(".") [0];
	if (ffVersion < 44) {
		ECMAScriptStatus = " and hasn't full support of ECMAScript 2015 :(";
		ecmaVersion = 5;
	}		
	console.log("Your browser is Firefox " + ffVersion + ECMAScriptStatus);
}
else {
	console.log('Your browser is not Firefox.');
}
return ecmaVersion;
}
/* End to try to detect FF version */