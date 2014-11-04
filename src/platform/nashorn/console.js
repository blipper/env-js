
/**
 * Writes message to system out.
 *
 * @param {Object} message
 */
(function(){
	
/**
 * Prints stack trace of current execution point
 */
Envjs.trace = function(){try {throw new Error();} catch (e) { e.printStackTrace(); } };
	
Envjs.log = function(msg){
	java.lang.System.out.println(msg);
	try {
	jmlog.info(msg);
	}
	catch (e) {
		java.lang.System.out.println(e);		
	}
};

Envjs.lineSource = function(e){
    return e&&Object.prototype.toString.call(e)=="[object Error]"?e.lineNumber:"(line ?)";
};

var $in, log; 
Envjs.readConsole = function(){
	log = log||Envjs.logger('Envjs.Nashorn');
	$in = $in||new java.io.BufferedReader(
		new java.io.InputStreamReader(java.lang.System['in'])
	);
	return  $in.readLine()+'';
};
Envjs.prompt = function(){
  	java.lang.System.out.print(Envjs.CURSOR+' '); 
	java.lang.System.out.flush();
};

}());

