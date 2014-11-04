

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
