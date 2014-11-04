/*
 * Envjs nashorn-env.1.3.pre03
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


/*
 * Envjs nashorn-env.1.3.pre03 
 * Pure JavaScript Browser Environment
 * By John Resig <http://ejohn.org/> and the Envjs Team
 * Copyright 2008-2010 John Resig, under the MIT License
 */

//CLOSURE_START
(function(){






function __accessorDescriptor__(field, fun)
{
  var desc = { enumerable: true, configurable: true };
  desc[field] = fun;
  return desc;
}

/**
 * @author john resig
 */
// Helper method for extending one object with another.
function __extend__(a,b) {
    for ( var i in b ) {
        if(b.hasOwnProperty(i)){
          var pd = Object.getOwnPropertyDescriptor(b, i);
          var g = pd.get;
          var s = pd.set;
            if ( g || s ) {
                if ( g ) { Object.defineProperty(a, i, __accessorDescriptor__("get",g)); }
                if ( s ) { Object.defineProperty(a, i, __accessorDescriptor__("set",s)); }
            } else {
                a[i] = b[i];
            }
        }
    } 
    return a;
}

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


(function(){

var log = Envjs.logger('Envjs.HTML.Nashorn');


Envjs.eval = function(context, source, name){
    __context__.eval(context, source, null, name, false);
};

}());	
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
 * @param {Function} f		n
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

(function(){

var log = Envjs.logger('Envjs.Window.Nashorn');

//Since we're running in rhino I guess we can safely assume
//java is 'enabled'.  I'm sure this requires more thought
//than I've given it here
Envjs.javaEnabled = true;

Envjs.homedir        = java.lang.System.getProperty("user.home");
Envjs.tmpdir         = java.lang.System.getProperty("java.io.tmpdir");
Envjs.os_name        = java.lang.System.getProperty("os.name");
Envjs.os_arch        = java.lang.System.getProperty("os.arch");
Envjs.os_version     = java.lang.System.getProperty("os.version");
Envjs.lang           = java.lang.System.getProperty("user.lang");


Envjs.gc = function(){ };

/**
 * Makes an object window-like by proxying object accessors
 * @param {Object} scope
 * @param {Object} parent
 */
Envjs.proxy = function(scope, parent) {
    try{
        if(scope+'' == '[object global]'){
            return scope;
        }else{
            return  __context__.createGlobal();
        }
    }catch(e){
        console.log('failed to init standard objects %s %s \n%s', scope, parent, e);
    }

};

}());
(function(){

var log = Envjs.logger('Envjs.XMLHttpRequest.Nashorn');

/**
 * Get 'Current Working Directory'
 */
Envjs.getcwd = function() {
    return java.lang.System.getProperty('user.dir');
}


/**
 * Used to write to a local file
 * @param {Object} text
 * @param {Object} url
 */
Envjs.writeToFile = function(text, url){
    //Envjs.debug("writing text to url : " + url);
    var out = new java.io.FileWriter(
        new java.io.File(
            new java.net.URI(url.toString())));
    out.write( text, 0, text.length );
    out.flush();
    out.close();
};

/**
 * Used to write to a local file
 * @param {Object} text
 * @param {Object} suffix
 */
Envjs.writeToTempFile = function(text, suffix){
    //console.log("writing text to temp url : %s");
    // Create temp file.
    var temp = java.io.File.createTempFile("envjs-tmp", suffix);

    // Delete temp file when program exits.
    temp.deleteOnExit();

    // Write to temp file
    var out = new java.io.FileWriter(temp);
    out.write(text, 0, text.length);
    out.close();
    return temp.getAbsolutePath().toString()+'';
};


/**
 * Used to read the contents of a local file
 * @param {Object} url
 */
Envjs.readFromFile = function( url ){
	if(typeof url == 'string')
    	url = Envjs.uri(url);
    //console.log("reading from url : %s", url);
    var fileReader = new java.io.FileReader(
        new java.io.File( 
            new java.net.URI( url )));
            
    var stringwriter = new java.io.StringWriter(),
        buffer = java.lang.reflect.Array.newInstance(java.lang.Character.TYPE, 1024),
        length;

    while ((length = fileReader.read(buffer, 0, 1024)) != -1) {
        stringwriter.write(buffer, 0, length);
    }

    stringwriter.close();
    return stringwriter.toString()+"";
};
    

/**
 * Used to delete a local file
 * @param {Object} url
 */
Envjs.deleteFile = function(url){
    var file = new java.io.File( new java.net.URI( url ) );
    file["delete"]();
};

/**
 * establishes connection and calls responsehandler
 * @param {Object} xhr
 * @param {Object} responseHandler
 * @param {Object} data
 */
Envjs.connection = function(xhr, responseHandler, data){
    var url = new java.net.URL(xhr.url),
        connection,
        header,
        outstream,
        buffer,
        length,
        binary = false,
        name, value,
        contentEncoding,
        instream,
        responseXML,
        i;
    
        
    if ( /^file\:/.test(url) ) {
        Envjs.localXHR(url, xhr, connection, data);
    } else {
        connection = url.openConnection();
        //handle redirects manually since cookie support sucks out of the box
        //connection.setFollowRedirects(false);
        connection.setRequestMethod( xhr.method );

        // Add headers to Java connection
        for (header in xhr.headers){
            connection.addRequestProperty(header+'', xhr.headers[header]+'');
        }
        connection.addRequestProperty("Accept-Encoding", 'gzip');

        //write data to output stream if required
		//TODO: if they have set the request header for a chunked
		//request body, implement a chunked output stream
        if(data){
            if(data instanceof Document){
                if ( xhr.method == "PUT" || xhr.method == "POST" ) {
                    connection.setDoOutput(true);
                    outstream = connection.getOutputStream(),
                    xml = (new XMLSerializer()).serializeToString(data);
                    buffer = new java.lang.String(xml).getBytes('UTF-8');
                    outstream.write(buffer, 0, buffer.length);
                    outstream.close();
                }
            }else if(data.length&&data.length>0){
                if ( xhr.method == "PUT" || xhr.method == "POST" ) {
                    connection.setDoOutput(true);
                    outstream = connection.getOutputStream();
                    buffer = new java.lang.String(data).getBytes('UTF-8');
                    outstream.write(buffer, 0, buffer.length);
                    outstream.close();
                }
            }
            connection.connect();
        }else{
            connection.connect();
        }
    }

    if(connection){
        try{
            length = connection.getHeaderFields().size();
            // Stick the response headers into responseHeaders
            for (i = 0; i < length; i++) {
                name = connection.getHeaderFieldKey(i);
                value = connection.getHeaderField(i);
                if (name)
                    xhr.responseHeaders[name+''] = value+'';
            }
        }catch(e){
            console.log('failed to load response headers \n%s',e);
        }

        xhr.readyState = 4;
        xhr.status = parseInt(connection.responseCode,10) || undefined;
        xhr.statusText = connection.responseMessage || "";

        contentEncoding = connection.getContentEncoding() || "utf-8";
        instream = null;
        responseXML = null;
        
        try{
            //console.log('contentEncoding %s', contentEncoding);
            if( contentEncoding.equalsIgnoreCase("gzip") ||
                contentEncoding.equalsIgnoreCase("decompress")){
                //zipped content
                binary = true;
                outstream = new java.io.ByteArrayOutputStream();
                buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
                instream = new java.util.zip.GZIPInputStream(connection.getInputStream())
            }else{
                //this is a text file
                outstream = new java.io.StringWriter();
                buffer = java.lang.reflect.Array.newInstance(java.lang.Character.TYPE, 1024);
                instream = new java.io.InputStreamReader(connection.getInputStream());
            }
        }catch(e){
            if (connection.getResponseCode() == 404){
                console.log('failed to open connection stream \n %s %s',
                            e.toString(), e);
            }else{
                console.log('failed to open connection stream \n %s %s',
                            e.toString(), e);
            }
            instream = connection.getErrorStream();
        }

        while ((length = instream.read(buffer, 0, 1024)) != -1) {
            outstream.write(buffer, 0, length);
        }

        outstream.close();
        instream.close();
        
        if(binary){
            xhr.responseText = new java.lang.String(outstream.toByteArray(), 'UTF-8')+'';
        }else{
            xhr.responseText = outstream.toString()+'';
        }

    }
    if(responseHandler){
        //console.log('calling ajax response handler');
        if(!xhr.async){
			responseHandler();
		}else{
		    //console.log('synchronizing ajax response handler via setTimeout');
			setTimeout(responseHandler, 1);
		}
    }
};

}());

/**
 * @author john resig & the envjs team
 * @uri http://www.envjs.com/
 * @copyright 2008-2010
 * @license MIT
 */
//CLOSURE_END
}());
