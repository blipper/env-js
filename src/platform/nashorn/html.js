
(function(){

var log = Envjs.logger('Envjs.HTML.Nashorn');


Envjs.eval = function(context, source, name){
    __context__.eval(context, source, null, name, false);
};

}());	