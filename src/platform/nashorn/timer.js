
(function(){

var log = Envjs.logger('Envjs.Timer.Nashorn');

/*
public static Object spawn(Context cx, Scriptable thisObj, Object[] args,
                          Function funObj)
{
   Scriptable scope = funObj.getParentScope();
   Runner runner;
   if (args.length != 0 && args[0] instanceof Function) {
       Object[] newArgs = null;
       if (args.length > 1 && args[1] instanceof Scriptable) {
           newArgs = cx.getElements((Scriptable) args[1]);
       }
       if (newArgs == null) { newArgs = ScriptRuntime.emptyArgs; }
       runner = new Runner(scope, (Function) args[0], newArgs);
   } else if (args.length != 0 && args[0] instanceof Script) {
       runner = new Runner(scope, (Script) args[0]);
   } else {
       throw reportRuntimeError("msg.spawn.args");
   }
   runner.factory = cx.getFactory();	
   Thread thread = new Thread(runner);
   thread.start();
   return thread;
}
*/
// Does not support arguments at this time
var spawn = function(fn) {
	thread = new Thread(addition);
	thread.start();
	return thread;
} ;


/**
 * Nashron provides a very succinct 'sync' via the mozilla_compat.js
 * @param {Function} fn
 */
try{
    Envjs.sync = sync;
    Envjs.spawn = spawn;
    console.log("sync and spawn are available");
	//print('sync and spawn are available');
} catch(e){	
	//print('sync and spawn are not available : ' + e);
    //sync unavailable on AppEngine
    Envjs.sync = function(fn){
        console.log('Threadless platform, sync is safe');
        return fn;
    };

    Envjs.spawn = function(fn){
        console.log('Threadless platform, spawn shares main thread.');
        return fn();
    };
};


/**
 * sleep thread for specified duration
 * @param {Object} milliseconds
 */
Envjs.sleep = function(milliseconds){
    try{
        return java.lang.Thread.sleep(milliseconds);
    }catch(e){
        console.log('Threadless platform, cannots sleep.');
    }
};

/**
 * provides callback hook for when the system exits
 * Not supported
 */
Envjs.onExit = function(callback){
    console.log('onExit not supported.');
    try {
        throw new Error();
    } catch (e) {
    	console.log(e.stack)
        console.log(e.lineNumber)
        console.log(e.columnNumber)
        console.log(e.fileName)
    }    
};

}());