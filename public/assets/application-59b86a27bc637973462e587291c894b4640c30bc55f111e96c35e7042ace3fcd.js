/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.2",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if(function(t,e){"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){function n(t){var e=t.length,n=oe.type(t);return"function"===n||oe.isWindow(t)?!1:1===t.nodeType&&e?!0:"array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t}function i(t,e,n){if(oe.isFunction(e))return oe.grep(t,function(t,i){return!!e.call(t,i,t)!==n});if(e.nodeType)return oe.grep(t,function(t){return t===e!==n});if("string"==typeof e){if(de.test(e))return oe.filter(e,t,n);e=oe.filter(e,t)}return oe.grep(t,function(t){return oe.inArray(t,e)>=0!==n})}function o(t,e){do t=t[e];while(t&&1!==t.nodeType);return t}function s(t){var e=xe[t]={};return oe.each(t.match(be)||[],function(t,n){e[n]=!0}),e}function r(){fe.addEventListener?(fe.removeEventListener("DOMContentLoaded",a,!1),t.removeEventListener("load",a,!1)):(fe.detachEvent("onreadystatechange",a),t.detachEvent("onload",a))}function a(){(fe.addEventListener||"load"===event.type||"complete"===fe.readyState)&&(r(),oe.ready())}function l(t,e,n){if(void 0===n&&1===t.nodeType){var i="data-"+e.replace(ke,"-$1").toLowerCase();if(n=t.getAttribute(i),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:Te.test(n)?oe.parseJSON(n):n}catch(o){}oe.data(t,e,n)}else n=void 0}return n}function h(t){var e;for(e in t)if(("data"!==e||!oe.isEmptyObject(t[e]))&&"toJSON"!==e)return!1;return!0}function c(t,e,n,i){if(oe.acceptData(t)){var o,s,r=oe.expando,a=t.nodeType,l=a?oe.cache:t,h=a?t[r]:t[r]&&r;if(h&&l[h]&&(i||l[h].data)||void 0!==n||"string"!=typeof e)return h||(h=a?t[r]=Y.pop()||oe.guid++:r),l[h]||(l[h]=a?{}:{toJSON:oe.noop}),("object"==typeof e||"function"==typeof e)&&(i?l[h]=oe.extend(l[h],e):l[h].data=oe.extend(l[h].data,e)),s=l[h],i||(s.data||(s.data={}),s=s.data),void 0!==n&&(s[oe.camelCase(e)]=n),"string"==typeof e?(o=s[e],null==o&&(o=s[oe.camelCase(e)])):o=s,o}}function u(t,e,n){if(oe.acceptData(t)){var i,o,s=t.nodeType,r=s?oe.cache:t,a=s?t[oe.expando]:oe.expando;if(r[a]){if(e&&(i=n?r[a]:r[a].data)){oe.isArray(e)?e=e.concat(oe.map(e,oe.camelCase)):e in i?e=[e]:(e=oe.camelCase(e),e=e in i?[e]:e.split(" ")),o=e.length;for(;o--;)delete i[e[o]];if(n?!h(i):!oe.isEmptyObject(i))return}(n||(delete r[a].data,h(r[a])))&&(s?oe.cleanData([t],!0):ne.deleteExpando||r!=r.window?delete r[a]:r[a]=null)}}}function d(){return!0}function p(){return!1}function f(){try{return fe.activeElement}catch(t){}}function g(t){var e=Oe.split("|"),n=t.createDocumentFragment();if(n.createElement)for(;e.length;)n.createElement(e.pop());return n}function m(t,e){var n,i,o=0,s=typeof t.getElementsByTagName!==Se?t.getElementsByTagName(e||"*"):typeof t.querySelectorAll!==Se?t.querySelectorAll(e||"*"):void 0;if(!s)for(s=[],n=t.childNodes||t;null!=(i=n[o]);o++)!e||oe.nodeName(i,e)?s.push(i):oe.merge(s,m(i,e));return void 0===e||e&&oe.nodeName(t,e)?oe.merge([t],s):s}function v(t){Ne.test(t.type)&&(t.defaultChecked=t.checked)}function y(t,e){return oe.nodeName(t,"table")&&oe.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t}function b(t){return t.type=(null!==oe.find.attr(t,"type"))+"/"+t.type,t}function x(t){var e=Ue.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function w(t,e){for(var n,i=0;null!=(n=t[i]);i++)oe._data(n,"globalEval",!e||oe._data(e[i],"globalEval"))}function C(t,e){if(1===e.nodeType&&oe.hasData(t)){var n,i,o,s=oe._data(t),r=oe._data(e,s),a=s.events;if(a){delete r.handle,r.events={};for(n in a)for(i=0,o=a[n].length;o>i;i++)oe.event.add(e,n,a[n][i])}r.data&&(r.data=oe.extend({},r.data))}}function S(t,e){var n,i,o;if(1===e.nodeType){if(n=e.nodeName.toLowerCase(),!ne.noCloneEvent&&e[oe.expando]){o=oe._data(e);for(i in o.events)oe.removeEvent(e,i,o.handle);e.removeAttribute(oe.expando)}"script"===n&&e.text!==t.text?(b(e).text=t.text,x(e)):"object"===n?(e.parentNode&&(e.outerHTML=t.outerHTML),ne.html5Clone&&t.innerHTML&&!oe.trim(e.innerHTML)&&(e.innerHTML=t.innerHTML)):"input"===n&&Ne.test(t.type)?(e.defaultChecked=e.checked=t.checked,e.value!==t.value&&(e.value=t.value)):"option"===n?e.defaultSelected=e.selected=t.defaultSelected:("input"===n||"textarea"===n)&&(e.defaultValue=t.defaultValue)}}function T(e,n){var i,o=oe(n.createElement(e)).appendTo(n.body),s=t.getDefaultComputedStyle&&(i=t.getDefaultComputedStyle(o[0]))?i.display:oe.css(o[0],"display");return o.detach(),s}function k(t){var e=fe,n=Ke[t];return n||(n=T(t,e),"none"!==n&&n||(Ze=(Ze||oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=(Ze[0].contentWindow||Ze[0].contentDocument).document,e.write(),e.close(),n=T(t,e),Ze.detach()),Ke[t]=n),n}function E(t,e){return{get:function(){var n=t();if(null!=n)return n?void delete this.get:(this.get=e).apply(this,arguments)}}}function A(t,e){if(e in t)return e;for(var n=e.charAt(0).toUpperCase()+e.slice(1),i=e,o=pn.length;o--;)if(e=pn[o]+n,e in t)return e;return i}function L(t,e){for(var n,i,o,s=[],r=0,a=t.length;a>r;r++)i=t[r],i.style&&(s[r]=oe._data(i,"olddisplay"),n=i.style.display,e?(s[r]||"none"!==n||(i.style.display=""),""===i.style.display&&Le(i)&&(s[r]=oe._data(i,"olddisplay",k(i.nodeName)))):(o=Le(i),(n&&"none"!==n||!o)&&oe._data(i,"olddisplay",o?n:oe.css(i,"display"))));for(r=0;a>r;r++)i=t[r],i.style&&(e&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=e?s[r]||"":"none"));return t}function P(t,e,n){var i=hn.exec(e);return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):e}function N(t,e,n,i,o){for(var s=n===(i?"border":"content")?4:"width"===e?1:0,r=0;4>s;s+=2)"margin"===n&&(r+=oe.css(t,n+Ae[s],!0,o)),i?("content"===n&&(r-=oe.css(t,"padding"+Ae[s],!0,o)),"margin"!==n&&(r-=oe.css(t,"border"+Ae[s]+"Width",!0,o))):(r+=oe.css(t,"padding"+Ae[s],!0,o),"padding"!==n&&(r+=oe.css(t,"border"+Ae[s]+"Width",!0,o)));return r}function D(t,e,n){var i=!0,o="width"===e?t.offsetWidth:t.offsetHeight,s=tn(t),r=ne.boxSizing&&"border-box"===oe.css(t,"boxSizing",!1,s);if(0>=o||null==o){if(o=en(t,e,s),(0>o||null==o)&&(o=t.style[e]),on.test(o))return o;i=r&&(ne.boxSizingReliable()||o===t.style[e]),o=parseFloat(o)||0}return o+N(t,e,n||(r?"border":"content"),i,s)+"px"}function R(t,e,n,i,o){return new R.prototype.init(t,e,n,i,o)}function F(){return setTimeout(function(){fn=void 0}),fn=oe.now()}function $(t,e){var n,i={height:t},o=0;for(e=e?1:0;4>o;o+=2-e)n=Ae[o],i["margin"+n]=i["padding"+n]=t;return e&&(i.opacity=i.width=t),i}function I(t,e,n){for(var i,o=(xn[e]||[]).concat(xn["*"]),s=0,r=o.length;r>s;s++)if(i=o[s].call(n,e,t))return i}function O(t,e,n){var i,o,s,r,a,l,h,c,u=this,d={},p=t.style,f=t.nodeType&&Le(t),g=oe._data(t,"fxshow");n.queue||(a=oe._queueHooks(t,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,u.always(function(){u.always(function(){a.unqueued--,oe.queue(t,"fx").length||a.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],h=oe.css(t,"display"),c="none"===h?oe._data(t,"olddisplay")||k(t.nodeName):h,"inline"===c&&"none"===oe.css(t,"float")&&(ne.inlineBlockNeedsLayout&&"inline"!==k(t.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",ne.shrinkWrapBlocks()||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(i in e)if(o=e[i],mn.exec(o)){if(delete e[i],s=s||"toggle"===o,o===(f?"hide":"show")){if("show"!==o||!g||void 0===g[i])continue;f=!0}d[i]=g&&g[i]||oe.style(t,i)}else h=void 0;if(oe.isEmptyObject(d))"inline"===("none"===h?k(t.nodeName):h)&&(p.display=h);else{g?"hidden"in g&&(f=g.hidden):g=oe._data(t,"fxshow",{}),s&&(g.hidden=!f),f?oe(t).show():u.done(function(){oe(t).hide()}),u.done(function(){var e;oe._removeData(t,"fxshow");for(e in d)oe.style(t,e,d[e])});for(i in d)r=I(f?g[i]:0,i,u),i in g||(g[i]=r.start,f&&(r.end=r.start,r.start="width"===i||"height"===i?1:0))}}function M(t,e){var n,i,o,s,r;for(n in t)if(i=oe.camelCase(n),o=e[i],s=t[n],oe.isArray(s)&&(o=s[1],s=t[n]=s[0]),n!==i&&(t[i]=s,delete t[n]),r=oe.cssHooks[i],r&&"expand"in r){s=r.expand(s),delete t[i];for(n in s)n in t||(t[n]=s[n],e[n]=o)}else e[i]=o}function j(t,e,n){var i,o,s=0,r=bn.length,a=oe.Deferred().always(function(){delete l.elem}),l=function(){if(o)return!1;for(var e=fn||F(),n=Math.max(0,h.startTime+h.duration-e),i=n/h.duration||0,s=1-i,r=0,l=h.tweens.length;l>r;r++)h.tweens[r].run(s);return a.notifyWith(t,[h,s,n]),1>s&&l?n:(a.resolveWith(t,[h]),!1)},h=a.promise({elem:t,props:oe.extend({},e),opts:oe.extend(!0,{specialEasing:{}},n),originalProperties:e,originalOptions:n,startTime:fn||F(),duration:n.duration,tweens:[],createTween:function(e,n){var i=oe.Tween(t,h.opts,e,n,h.opts.specialEasing[e]||h.opts.easing);return h.tweens.push(i),i},stop:function(e){var n=0,i=e?h.tweens.length:0;if(o)return this;for(o=!0;i>n;n++)h.tweens[n].run(1);return e?a.resolveWith(t,[h,e]):a.rejectWith(t,[h,e]),this}}),c=h.props;for(M(c,h.opts.specialEasing);r>s;s++)if(i=bn[s].call(h,t,c,h.opts))return i;return oe.map(c,I,h),oe.isFunction(h.opts.start)&&h.opts.start.call(t,h),oe.fx.timer(oe.extend(l,{elem:t,anim:h,queue:h.opts.queue})),h.progress(h.opts.progress).done(h.opts.done,h.opts.complete).fail(h.opts.fail).always(h.opts.always)}function H(t){return function(e,n){"string"!=typeof e&&(n=e,e="*");var i,o=0,s=e.toLowerCase().match(be)||[];if(oe.isFunction(n))for(;i=s[o++];)"+"===i.charAt(0)?(i=i.slice(1)||"*",(t[i]=t[i]||[]).unshift(n)):(t[i]=t[i]||[]).push(n)}}function W(t,e,n,i){function o(a){var l;return s[a]=!0,oe.each(t[a]||[],function(t,a){var h=a(e,n,i);return"string"!=typeof h||r||s[h]?r?!(l=h):void 0:(e.dataTypes.unshift(h),o(h),!1)}),l}var s={},r=t===qn;return o(e.dataTypes[0])||!s["*"]&&o("*")}function _(t,e){var n,i,o=oe.ajaxSettings.flatOptions||{};for(i in e)void 0!==e[i]&&((o[i]?t:n||(n={}))[i]=e[i]);return n&&oe.extend(!0,t,n),t}function B(t,e,n){for(var i,o,s,r,a=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===o&&(o=t.mimeType||e.getResponseHeader("Content-Type"));if(o)for(r in a)if(a[r]&&a[r].test(o)){l.unshift(r);break}if(l[0]in n)s=l[0];else{for(r in n){if(!l[0]||t.converters[r+" "+l[0]]){s=r;break}i||(i=r)}s=s||i}return s?(s!==l[0]&&l.unshift(s),n[s]):void 0}function z(t,e,n,i){var o,s,r,a,l,h={},c=t.dataTypes.slice();if(c[1])for(r in t.converters)h[r.toLowerCase()]=t.converters[r];for(s=c.shift();s;)if(t.responseFields[s]&&(n[t.responseFields[s]]=e),!l&&i&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=s,s=c.shift())if("*"===s)s=l;else if("*"!==l&&l!==s){if(r=h[l+" "+s]||h["* "+s],!r)for(o in h)if(a=o.split(" "),a[1]===s&&(r=h[l+" "+a[0]]||h["* "+a[0]])){r===!0?r=h[o]:h[o]!==!0&&(s=a[0],c.unshift(a[1]));break}if(r!==!0)if(r&&t["throws"])e=r(e);else try{e=r(e)}catch(u){return{state:"parsererror",error:r?u:"No conversion from "+l+" to "+s}}}return{state:"success",data:e}}function q(t,e,n,i){var o;if(oe.isArray(e))oe.each(e,function(e,o){n||Yn.test(t)?i(t,o):q(t+"["+("object"==typeof o?e:"")+"]",o,n,i)});else if(n||"object"!==oe.type(e))i(t,e);else for(o in e)q(t+"["+o+"]",e[o],n,i)}function X(){try{return new t.XMLHttpRequest}catch(e){}}function V(){try{return new t.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}function U(t){return oe.isWindow(t)?t:9===t.nodeType?t.defaultView||t.parentWindow:!1}var Y=[],Q=Y.slice,G=Y.concat,J=Y.push,Z=Y.indexOf,K={},te=K.toString,ee=K.hasOwnProperty,ne={},ie="1.11.2",oe=function(t,e){return new oe.fn.init(t,e)},se=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,re=/^-ms-/,ae=/-([\da-z])/gi,le=function(t,e){return e.toUpperCase()};oe.fn=oe.prototype={jquery:ie,constructor:oe,selector:"",length:0,toArray:function(){return Q.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:Q.call(this)},pushStack:function(t){var e=oe.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t,e){return oe.each(this,t,e)},map:function(t){return this.pushStack(oe.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return this.pushStack(Q.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(0>t?e:0);return this.pushStack(n>=0&&e>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:J,sort:Y.sort,splice:Y.splice},oe.extend=oe.fn.extend=function(){var t,e,n,i,o,s,r=arguments[0]||{},a=1,l=arguments.length,h=!1;for("boolean"==typeof r&&(h=r,r=arguments[a]||{},a++),"object"==typeof r||oe.isFunction(r)||(r={}),a===l&&(r=this,a--);l>a;a++)if(null!=(o=arguments[a]))for(i in o)t=r[i],n=o[i],r!==n&&(h&&n&&(oe.isPlainObject(n)||(e=oe.isArray(n)))?(e?(e=!1,s=t&&oe.isArray(t)?t:[]):s=t&&oe.isPlainObject(t)?t:{},r[i]=oe.extend(h,s,n)):void 0!==n&&(r[i]=n));return r},oe.extend({expando:"jQuery"+(ie+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===oe.type(t)},isArray:Array.isArray||function(t){return"array"===oe.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return!oe.isArray(t)&&t-parseFloat(t)+1>=0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;if(!t||"object"!==oe.type(t)||t.nodeType||oe.isWindow(t))return!1;try{if(t.constructor&&!ee.call(t,"constructor")&&!ee.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(ne.ownLast)for(e in t)return ee.call(t,e);for(e in t);return void 0===e||ee.call(t,e)},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?K[te.call(t)]||"object":typeof t},globalEval:function(e){e&&oe.trim(e)&&(t.execScript||function(e){t.eval.call(t,e)})(e)},camelCase:function(t){return t.replace(re,"ms-").replace(ae,le)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e,i){var o,s=0,r=t.length,a=n(t);if(i){if(a)for(;r>s&&(o=e.apply(t[s],i),o!==!1);s++);else for(s in t)if(o=e.apply(t[s],i),o===!1)break}else if(a)for(;r>s&&(o=e.call(t[s],s,t[s]),o!==!1);s++);else for(s in t)if(o=e.call(t[s],s,t[s]),o===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(se,"")},makeArray:function(t,e){var i=e||[];return null!=t&&(n(Object(t))?oe.merge(i,"string"==typeof t?[t]:t):J.call(i,t)),i},inArray:function(t,e,n){var i;if(e){if(Z)return Z.call(e,t,n);for(i=e.length,n=n?0>n?Math.max(0,i+n):n:0;i>n;n++)if(n in e&&e[n]===t)return n}return-1},merge:function(t,e){for(var n=+e.length,i=0,o=t.length;n>i;)t[o++]=e[i++];if(n!==n)for(;void 0!==e[i];)t[o++]=e[i++];return t.length=o,t},grep:function(t,e,n){for(var i,o=[],s=0,r=t.length,a=!n;r>s;s++)i=!e(t[s],s),i!==a&&o.push(t[s]);return o},map:function(t,e,i){var o,s=0,r=t.length,a=n(t),l=[];if(a)for(;r>s;s++)o=e(t[s],s,i),null!=o&&l.push(o);else for(s in t)o=e(t[s],s,i),null!=o&&l.push(o);return G.apply([],l)},guid:1,proxy:function(t,e){var n,i,o;return"string"==typeof e&&(o=t[e],e=t,t=o),oe.isFunction(t)?(n=Q.call(arguments,2),i=function(){return t.apply(e||this,n.concat(Q.call(arguments)))},i.guid=t.guid=t.guid||oe.guid++,i):void 0},now:function(){return+new Date},support:ne}),oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){K["[object "+e+"]"]=e.toLowerCase()});var he=/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
function(t){function e(t,e,n,i){var o,s,r,a,l,h,u,p,f,g;if((e?e.ownerDocument||e:W)!==R&&D(e),e=e||R,n=n||[],a=e.nodeType,"string"!=typeof t||!t||1!==a&&9!==a&&11!==a)return n;if(!i&&$){if(11!==a&&(o=ye.exec(t)))if(r=o[1]){if(9===a){if(s=e.getElementById(r),!s||!s.parentNode)return n;if(s.id===r)return n.push(s),n}else if(e.ownerDocument&&(s=e.ownerDocument.getElementById(r))&&j(e,s)&&s.id===r)return n.push(s),n}else{if(o[2])return Z.apply(n,e.getElementsByTagName(t)),n;if((r=o[3])&&w.getElementsByClassName)return Z.apply(n,e.getElementsByClassName(r)),n}if(w.qsa&&(!I||!I.test(t))){if(p=u=H,f=e,g=1!==a&&t,1===a&&"object"!==e.nodeName.toLowerCase()){for(h=k(t),(u=e.getAttribute("id"))?p=u.replace(xe,"\\$&"):e.setAttribute("id",p),p="[id='"+p+"'] ",l=h.length;l--;)h[l]=p+d(h[l]);f=be.test(t)&&c(e.parentNode)||e,g=h.join(",")}if(g)try{return Z.apply(n,f.querySelectorAll(g)),n}catch(m){}finally{u||e.removeAttribute("id")}}}return A(t.replace(le,"$1"),e,n,i)}function n(){function t(n,i){return e.push(n+" ")>C.cacheLength&&delete t[e.shift()],t[n+" "]=i}var e=[];return t}function i(t){return t[H]=!0,t}function o(t){var e=R.createElement("div");try{return!!t(e)}catch(n){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function s(t,e){for(var n=t.split("|"),i=t.length;i--;)C.attrHandle[n[i]]=e}function r(t,e){var n=e&&t,i=n&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||U)-(~t.sourceIndex||U);if(i)return i;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function a(t){return function(e){var n=e.nodeName.toLowerCase();return"input"===n&&e.type===t}}function l(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t}}function h(t){return i(function(e){return e=+e,i(function(n,i){for(var o,s=t([],n.length,e),r=s.length;r--;)n[o=s[r]]&&(n[o]=!(i[o]=n[o]))})})}function c(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function u(){}function d(t){for(var e=0,n=t.length,i="";n>e;e++)i+=t[e].value;return i}function p(t,e,n){var i=e.dir,o=n&&"parentNode"===i,s=B++;return e.first?function(e,n,s){for(;e=e[i];)if(1===e.nodeType||o)return t(e,n,s)}:function(e,n,r){var a,l,h=[_,s];if(r){for(;e=e[i];)if((1===e.nodeType||o)&&t(e,n,r))return!0}else for(;e=e[i];)if(1===e.nodeType||o){if(l=e[H]||(e[H]={}),(a=l[i])&&a[0]===_&&a[1]===s)return h[2]=a[2];if(l[i]=h,h[2]=t(e,n,r))return!0}}}function f(t){return t.length>1?function(e,n,i){for(var o=t.length;o--;)if(!t[o](e,n,i))return!1;return!0}:t[0]}function g(t,n,i){for(var o=0,s=n.length;s>o;o++)e(t,n[o],i);return i}function m(t,e,n,i,o){for(var s,r=[],a=0,l=t.length,h=null!=e;l>a;a++)(s=t[a])&&(!n||n(s,i,o))&&(r.push(s),h&&e.push(a));return r}function v(t,e,n,o,s,r){return o&&!o[H]&&(o=v(o)),s&&!s[H]&&(s=v(s,r)),i(function(i,r,a,l){var h,c,u,d=[],p=[],f=r.length,v=i||g(e||"*",a.nodeType?[a]:a,[]),y=!t||!i&&e?v:m(v,d,t,a,l),b=n?s||(i?t:f||o)?[]:r:y;if(n&&n(y,b,a,l),o)for(h=m(b,p),o(h,[],a,l),c=h.length;c--;)(u=h[c])&&(b[p[c]]=!(y[p[c]]=u));if(i){if(s||t){if(s){for(h=[],c=b.length;c--;)(u=b[c])&&h.push(y[c]=u);s(null,b=[],h,l)}for(c=b.length;c--;)(u=b[c])&&(h=s?te(i,u):d[c])>-1&&(i[h]=!(r[h]=u))}}else b=m(b===r?b.splice(f,b.length):b),s?s(null,r,b,l):Z.apply(r,b)})}function y(t){for(var e,n,i,o=t.length,s=C.relative[t[0].type],r=s||C.relative[" "],a=s?1:0,l=p(function(t){return t===e},r,!0),h=p(function(t){return te(e,t)>-1},r,!0),c=[function(t,n,i){var o=!s&&(i||n!==L)||((e=n).nodeType?l(t,n,i):h(t,n,i));return e=null,o}];o>a;a++)if(n=C.relative[t[a].type])c=[p(f(c),n)];else{if(n=C.filter[t[a].type].apply(null,t[a].matches),n[H]){for(i=++a;o>i&&!C.relative[t[i].type];i++);return v(a>1&&f(c),a>1&&d(t.slice(0,a-1).concat({value:" "===t[a-2].type?"*":""})).replace(le,"$1"),n,i>a&&y(t.slice(a,i)),o>i&&y(t=t.slice(i)),o>i&&d(t))}c.push(n)}return f(c)}function b(t,n){var o=n.length>0,s=t.length>0,r=function(i,r,a,l,h){var c,u,d,p=0,f="0",g=i&&[],v=[],y=L,b=i||s&&C.find.TAG("*",h),x=_+=null==y?1:Math.random()||.1,w=b.length;for(h&&(L=r!==R&&r);f!==w&&null!=(c=b[f]);f++){if(s&&c){for(u=0;d=t[u++];)if(d(c,r,a)){l.push(c);break}h&&(_=x)}o&&((c=!d&&c)&&p--,i&&g.push(c))}if(p+=f,o&&f!==p){for(u=0;d=n[u++];)d(g,v,r,a);if(i){if(p>0)for(;f--;)g[f]||v[f]||(v[f]=G.call(l));v=m(v)}Z.apply(l,v),h&&!i&&v.length>0&&p+n.length>1&&e.uniqueSort(l)}return h&&(_=x,L=y),g};return o?i(r):r}var x,w,C,S,T,k,E,A,L,P,N,D,R,F,$,I,O,M,j,H="sizzle"+1*new Date,W=t.document,_=0,B=0,z=n(),q=n(),X=n(),V=function(t,e){return t===e&&(N=!0),0},U=1<<31,Y={}.hasOwnProperty,Q=[],G=Q.pop,J=Q.push,Z=Q.push,K=Q.slice,te=function(t,e){for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n;return-1},ee="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe=ie.replace("w","w#"),se="\\["+ne+"*("+ie+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+oe+"))|)"+ne+"*\\]",re=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+se+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),he=new RegExp("^"+ne+"*,"+ne+"*"),ce=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ue=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),de=new RegExp(re),pe=new RegExp("^"+oe+"$"),fe={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie.replace("w","w*")+")"),ATTR:new RegExp("^"+se),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+ee+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,xe=/'|\\/g,we=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Ce=function(t,e,n){var i="0x"+e-65536;return i!==i||n?e:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},Se=function(){D()};try{Z.apply(Q=K.call(W.childNodes),W.childNodes),Q[W.childNodes.length].nodeType}catch(Te){Z={apply:Q.length?function(t,e){J.apply(t,K.call(e))}:function(t,e){for(var n=t.length,i=0;t[n++]=e[i++];);t.length=n-1}}}w=e.support={},T=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},D=e.setDocument=function(t){var e,n,i=t?t.ownerDocument||t:W;return i!==R&&9===i.nodeType&&i.documentElement?(R=i,F=i.documentElement,n=i.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Se,!1):n.attachEvent&&n.attachEvent("onunload",Se)),$=!T(i),w.attributes=o(function(t){return t.className="i",!t.getAttribute("className")}),w.getElementsByTagName=o(function(t){return t.appendChild(i.createComment("")),!t.getElementsByTagName("*").length}),w.getElementsByClassName=ve.test(i.getElementsByClassName),w.getById=o(function(t){return F.appendChild(t).id=H,!i.getElementsByName||!i.getElementsByName(H).length}),w.getById?(C.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&$){var n=e.getElementById(t);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(t){var e=t.replace(we,Ce);return function(t){return t.getAttribute("id")===e}}):(delete C.find.ID,C.filter.ID=function(t){var e=t.replace(we,Ce);return function(t){var n="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}}),C.find.TAG=w.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):w.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,i=[],o=0,s=e.getElementsByTagName(t);if("*"===t){for(;n=s[o++];)1===n.nodeType&&i.push(n);return i}return s},C.find.CLASS=w.getElementsByClassName&&function(t,e){return $?e.getElementsByClassName(t):void 0},O=[],I=[],(w.qsa=ve.test(i.querySelectorAll))&&(o(function(t){F.appendChild(t).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\f]' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&I.push("[*^$]="+ne+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||I.push("\\["+ne+"*(?:value|"+ee+")"),t.querySelectorAll("[id~="+H+"-]").length||I.push("~="),t.querySelectorAll(":checked").length||I.push(":checked"),t.querySelectorAll("a#"+H+"+*").length||I.push(".#.+[+~]")}),o(function(t){var e=i.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&I.push("name"+ne+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||I.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),I.push(",.*:")})),(w.matchesSelector=ve.test(M=F.matches||F.webkitMatchesSelector||F.mozMatchesSelector||F.oMatchesSelector||F.msMatchesSelector))&&o(function(t){w.disconnectedMatch=M.call(t,"div"),M.call(t,"[s!='']:x"),O.push("!=",re)}),I=I.length&&new RegExp(I.join("|")),O=O.length&&new RegExp(O.join("|")),e=ve.test(F.compareDocumentPosition),j=e||ve.test(F.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,i=e&&e.parentNode;return t===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):t.compareDocumentPosition&&16&t.compareDocumentPosition(i)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},V=e?function(t,e){if(t===e)return N=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n?n:(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&n||!w.sortDetached&&e.compareDocumentPosition(t)===n?t===i||t.ownerDocument===W&&j(W,t)?-1:e===i||e.ownerDocument===W&&j(W,e)?1:P?te(P,t)-te(P,e):0:4&n?-1:1)}:function(t,e){if(t===e)return N=!0,0;var n,o=0,s=t.parentNode,a=e.parentNode,l=[t],h=[e];if(!s||!a)return t===i?-1:e===i?1:s?-1:a?1:P?te(P,t)-te(P,e):0;if(s===a)return r(t,e);for(n=t;n=n.parentNode;)l.unshift(n);for(n=e;n=n.parentNode;)h.unshift(n);for(;l[o]===h[o];)o++;return o?r(l[o],h[o]):l[o]===W?-1:h[o]===W?1:0},i):R},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==R&&D(t),n=n.replace(ue,"='$1']"),!(!w.matchesSelector||!$||O&&O.test(n)||I&&I.test(n)))try{var i=M.call(t,n);if(i||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return i}catch(o){}return e(n,R,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==R&&D(t),j(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==R&&D(t);var n=C.attrHandle[e.toLowerCase()],i=n&&Y.call(C.attrHandle,e.toLowerCase())?n(t,e,!$):void 0;return void 0!==i?i:w.attributes||!$?t.getAttribute(e):(i=t.getAttributeNode(e))&&i.specified?i.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,n=[],i=0,o=0;if(N=!w.detectDuplicates,P=!w.sortStable&&t.slice(0),t.sort(V),N){for(;e=t[o++];)e===t[o]&&(i=n.push(o));for(;i--;)t.splice(n[i],1)}return P=null,t},S=e.getText=function(t){var e,n="",i=0,o=t.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=S(t)}else if(3===o||4===o)return t.nodeValue}else for(;e=t[i++];)n+=S(e);return n},C=e.selectors={cacheLength:50,createPseudo:i,match:fe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(we,Ce),t[3]=(t[3]||t[4]||t[5]||"").replace(we,Ce),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];return fe.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&de.test(n)&&(e=k(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(we,Ce).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=z[t+" "];return e||(e=new RegExp("(^|"+ne+")"+t+"("+ne+"|$)"))&&z(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,n,i){return function(o){var s=e.attr(o,t);return null==s?"!="===n:n?(s+="","="===n?s===i:"!="===n?s!==i:"^="===n?i&&0===s.indexOf(i):"*="===n?i&&s.indexOf(i)>-1:"$="===n?i&&s.slice(-i.length)===i:"~="===n?(" "+s.replace(ae," ")+" ").indexOf(i)>-1:"|="===n?s===i||s.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(t,e,n,i,o){var s="nth"!==t.slice(0,3),r="last"!==t.slice(-4),a="of-type"===e;return 1===i&&0===o?function(t){return!!t.parentNode}:function(e,n,l){var h,c,u,d,p,f,g=s!==r?"nextSibling":"previousSibling",m=e.parentNode,v=a&&e.nodeName.toLowerCase(),y=!l&&!a;if(m){if(s){for(;g;){for(u=e;u=u[g];)if(a?u.nodeName.toLowerCase()===v:1===u.nodeType)return!1;f=g="only"===t&&!f&&"nextSibling"}return!0}if(f=[r?m.firstChild:m.lastChild],r&&y){for(c=m[H]||(m[H]={}),h=c[t]||[],p=h[0]===_&&h[1],d=h[0]===_&&h[2],u=p&&m.childNodes[p];u=++p&&u&&u[g]||(d=p=0)||f.pop();)if(1===u.nodeType&&++d&&u===e){c[t]=[_,p,d];break}}else if(y&&(h=(e[H]||(e[H]={}))[t])&&h[0]===_)d=h[1];else for(;(u=++p&&u&&u[g]||(d=p=0)||f.pop())&&((a?u.nodeName.toLowerCase()!==v:1!==u.nodeType)||!++d||(y&&((u[H]||(u[H]={}))[t]=[_,d]),u!==e)););return d-=o,d===i||d%i===0&&d/i>=0}}},PSEUDO:function(t,n){var o,s=C.pseudos[t]||C.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return s[H]?s(n):s.length>1?(o=[t,t,"",n],C.setFilters.hasOwnProperty(t.toLowerCase())?i(function(t,e){for(var i,o=s(t,n),r=o.length;r--;)i=te(t,o[r]),t[i]=!(e[i]=o[r])}):function(t){return s(t,0,o)}):s}},pseudos:{not:i(function(t){var e=[],n=[],o=E(t.replace(le,"$1"));return o[H]?i(function(t,e,n,i){for(var s,r=o(t,null,i,[]),a=t.length;a--;)(s=r[a])&&(t[a]=!(e[a]=s))}):function(t,i,s){return e[0]=t,o(e,null,s,n),e[0]=null,!n.pop()}}),has:i(function(t){return function(n){return e(t,n).length>0}}),contains:i(function(t){return t=t.replace(we,Ce),function(e){return(e.textContent||e.innerText||S(e)).indexOf(t)>-1}}),lang:i(function(t){return pe.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(we,Ce).toLowerCase(),function(e){var n;do if(n=$?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===F},focus:function(t){return t===R.activeElement&&(!R.hasFocus||R.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!C.pseudos.empty(t)},header:function(t){return me.test(t.nodeName)},input:function(t){return ge.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:h(function(){return[0]}),last:h(function(t,e){return[e-1]}),eq:h(function(t,e,n){return[0>n?n+e:n]}),even:h(function(t,e){for(var n=0;e>n;n+=2)t.push(n);return t}),odd:h(function(t,e){for(var n=1;e>n;n+=2)t.push(n);return t}),lt:h(function(t,e,n){for(var i=0>n?n+e:n;--i>=0;)t.push(i);return t}),gt:h(function(t,e,n){for(var i=0>n?n+e:n;++i<e;)t.push(i);return t})}},C.pseudos.nth=C.pseudos.eq;for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[x]=a(x);for(x in{submit:!0,reset:!0})C.pseudos[x]=l(x);return u.prototype=C.filters=C.pseudos,C.setFilters=new u,k=e.tokenize=function(t,n){var i,o,s,r,a,l,h,c=q[t+" "];if(c)return n?0:c.slice(0);for(a=t,l=[],h=C.preFilter;a;){(!i||(o=he.exec(a)))&&(o&&(a=a.slice(o[0].length)||a),l.push(s=[])),i=!1,(o=ce.exec(a))&&(i=o.shift(),s.push({value:i,type:o[0].replace(le," ")}),a=a.slice(i.length));for(r in C.filter)!(o=fe[r].exec(a))||h[r]&&!(o=h[r](o))||(i=o.shift(),s.push({value:i,type:r,matches:o}),a=a.slice(i.length));if(!i)break}return n?a.length:a?e.error(t):q(t,l).slice(0)},E=e.compile=function(t,e){var n,i=[],o=[],s=X[t+" "];if(!s){for(e||(e=k(t)),n=e.length;n--;)s=y(e[n]),s[H]?i.push(s):o.push(s);s=X(t,b(o,i)),s.selector=t}return s},A=e.select=function(t,e,n,i){var o,s,r,a,l,h="function"==typeof t&&t,u=!i&&k(t=h.selector||t);if(n=n||[],1===u.length){if(s=u[0]=u[0].slice(0),s.length>2&&"ID"===(r=s[0]).type&&w.getById&&9===e.nodeType&&$&&C.relative[s[1].type]){if(e=(C.find.ID(r.matches[0].replace(we,Ce),e)||[])[0],!e)return n;h&&(e=e.parentNode),t=t.slice(s.shift().value.length)}for(o=fe.needsContext.test(t)?0:s.length;o--&&(r=s[o],!C.relative[a=r.type]);)if((l=C.find[a])&&(i=l(r.matches[0].replace(we,Ce),be.test(s[0].type)&&c(e.parentNode)||e))){if(s.splice(o,1),t=i.length&&d(s),!t)return Z.apply(n,i),n;break}}return(h||E(t,u))(i,e,!$,n,be.test(t)&&c(e.parentNode)||e),n},w.sortStable=H.split("").sort(V).join("")===H,w.detectDuplicates=!!N,D(),w.sortDetached=o(function(t){return 1&t.compareDocumentPosition(R.createElement("div"))}),o(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||s("type|href|height|width",function(t,e,n){return n?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),w.attributes&&o(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||s("value",function(t,e,n){return n||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),o(function(t){return null==t.getAttribute("disabled")})||s(ee,function(t,e,n){var i;return n?void 0:t[e]===!0?e.toLowerCase():(i=t.getAttributeNode(e))&&i.specified?i.value:null}),e}(t);oe.find=he,oe.expr=he.selectors,oe.expr[":"]=oe.expr.pseudos,oe.unique=he.uniqueSort,oe.text=he.getText,oe.isXMLDoc=he.isXML,oe.contains=he.contains;var ce=oe.expr.match.needsContext,ue=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,de=/^.[^:#\[\.,]*$/;oe.filter=function(t,e,n){var i=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===i.nodeType?oe.find.matchesSelector(i,t)?[i]:[]:oe.find.matches(t,oe.grep(e,function(t){return 1===t.nodeType}))},oe.fn.extend({find:function(t){var e,n=[],i=this,o=i.length;if("string"!=typeof t)return this.pushStack(oe(t).filter(function(){for(e=0;o>e;e++)if(oe.contains(i[e],this))return!0}));for(e=0;o>e;e++)oe.find(t,i[e],n);return n=this.pushStack(o>1?oe.unique(n):n),n.selector=this.selector?this.selector+" "+t:t,n},filter:function(t){return this.pushStack(i(this,t||[],!1))},not:function(t){return this.pushStack(i(this,t||[],!0))},is:function(t){return!!i(this,"string"==typeof t&&ce.test(t)?oe(t):t||[],!1).length}});var pe,fe=t.document,ge=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,me=oe.fn.init=function(t,e){var n,i;if(!t)return this;if("string"==typeof t){if(n="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:ge.exec(t),!n||!n[1]&&e)return!e||e.jquery?(e||pe).find(t):this.constructor(e).find(t);if(n[1]){if(e=e instanceof oe?e[0]:e,oe.merge(this,oe.parseHTML(n[1],e&&e.nodeType?e.ownerDocument||e:fe,!0)),ue.test(n[1])&&oe.isPlainObject(e))for(n in e)oe.isFunction(this[n])?this[n](e[n]):this.attr(n,e[n]);return this}if(i=fe.getElementById(n[2]),i&&i.parentNode){if(i.id!==n[2])return pe.find(t);this.length=1,this[0]=i}return this.context=fe,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,this):oe.isFunction(t)?"undefined"!=typeof pe.ready?pe.ready(t):t(oe):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),oe.makeArray(t,this))};me.prototype=oe.fn,pe=oe(fe);var ve=/^(?:parents|prev(?:Until|All))/,ye={children:!0,contents:!0,next:!0,prev:!0};oe.extend({dir:function(t,e,n){for(var i=[],o=t[e];o&&9!==o.nodeType&&(void 0===n||1!==o.nodeType||!oe(o).is(n));)1===o.nodeType&&i.push(o),o=o[e];return i},sibling:function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n}}),oe.fn.extend({has:function(t){var e,n=oe(t,this),i=n.length;return this.filter(function(){for(e=0;i>e;e++)if(oe.contains(this,n[e]))return!0})},closest:function(t,e){for(var n,i=0,o=this.length,s=[],r=ce.test(t)||"string"!=typeof t?oe(t,e||this.context):0;o>i;i++)for(n=this[i];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(r?r.index(n)>-1:1===n.nodeType&&oe.find.matchesSelector(n,t))){s.push(n);break}return this.pushStack(s.length>1?oe.unique(s):s)},index:function(t){return t?"string"==typeof t?oe.inArray(this[0],oe(t)):oe.inArray(t.jquery?t[0]:t,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(oe.unique(oe.merge(this.get(),oe(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),oe.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return oe.dir(t,"parentNode")},parentsUntil:function(t,e,n){return oe.dir(t,"parentNode",n)},next:function(t){return o(t,"nextSibling")},prev:function(t){return o(t,"previousSibling")},nextAll:function(t){return oe.dir(t,"nextSibling")},prevAll:function(t){return oe.dir(t,"previousSibling")},nextUntil:function(t,e,n){return oe.dir(t,"nextSibling",n)},prevUntil:function(t,e,n){return oe.dir(t,"previousSibling",n)},siblings:function(t){return oe.sibling((t.parentNode||{}).firstChild,t)},children:function(t){return oe.sibling(t.firstChild)},contents:function(t){return oe.nodeName(t,"iframe")?t.contentDocument||t.contentWindow.document:oe.merge([],t.childNodes)}},function(t,e){oe.fn[t]=function(n,i){var o=oe.map(this,e,n);return"Until"!==t.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=oe.filter(i,o)),this.length>1&&(ye[t]||(o=oe.unique(o)),ve.test(t)&&(o=o.reverse())),this.pushStack(o)}});var be=/\S+/g,xe={};oe.Callbacks=function(t){t="string"==typeof t?xe[t]||s(t):oe.extend({},t);var e,n,i,o,r,a,l=[],h=!t.once&&[],c=function(s){for(n=t.memory&&s,i=!0,r=a||0,a=0,o=l.length,e=!0;l&&o>r;r++)if(l[r].apply(s[0],s[1])===!1&&t.stopOnFalse){n=!1;break}e=!1,l&&(h?h.length&&c(h.shift()):n?l=[]:u.disable())},u={add:function(){if(l){var i=l.length;!function s(e){oe.each(e,function(e,n){var i=oe.type(n);"function"===i?t.unique&&u.has(n)||l.push(n):n&&n.length&&"string"!==i&&s(n)})}(arguments),e?o=l.length:n&&(a=i,c(n))}return this},remove:function(){return l&&oe.each(arguments,function(t,n){for(var i;(i=oe.inArray(n,l,i))>-1;)l.splice(i,1),e&&(o>=i&&o--,r>=i&&r--)}),this},has:function(t){return t?oe.inArray(t,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=h=n=void 0,this},disabled:function(){return!l},lock:function(){return h=void 0,n||u.disable(),this},locked:function(){return!h},fireWith:function(t,n){return!l||i&&!h||(n=n||[],n=[t,n.slice?n.slice():n],e?h.push(n):c(n)),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!i}};return u},oe.extend({Deferred:function(t){var e=[["resolve","done",oe.Callbacks("once memory"),"resolved"],["reject","fail",oe.Callbacks("once memory"),"rejected"],["notify","progress",oe.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},then:function(){var t=arguments;return oe.Deferred(function(n){oe.each(e,function(e,s){var r=oe.isFunction(t[e])&&t[e];o[s[1]](function(){var t=r&&r.apply(this,arguments);t&&oe.isFunction(t.promise)?t.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s[0]+"With"](this===i?n.promise():this,r?[t]:arguments)})}),t=null}).promise()},promise:function(t){return null!=t?oe.extend(t,i):i}},o={};return i.pipe=i.then,oe.each(e,function(t,s){var r=s[2],a=s[3];i[s[1]]=r.add,a&&r.add(function(){n=a},e[1^t][2].disable,e[2][2].lock),o[s[0]]=function(){return o[s[0]+"With"](this===o?i:this,arguments),this},o[s[0]+"With"]=r.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(t){var e,n,i,o=0,s=Q.call(arguments),r=s.length,a=1!==r||t&&oe.isFunction(t.promise)?r:0,l=1===a?t:oe.Deferred(),h=function(t,n,i){return function(o){n[t]=this,i[t]=arguments.length>1?Q.call(arguments):o,i===e?l.notifyWith(n,i):--a||l.resolveWith(n,i)}};if(r>1)for(e=new Array(r),n=new Array(r),i=new Array(r);r>o;o++)s[o]&&oe.isFunction(s[o].promise)?s[o].promise().done(h(o,i,s)).fail(l.reject).progress(h(o,n,e)):--a;return a||l.resolveWith(i,s),l.promise()}});var we;oe.fn.ready=function(t){return oe.ready.promise().done(t),this},oe.extend({isReady:!1,readyWait:1,holdReady:function(t){t?oe.readyWait++:oe.ready(!0)},ready:function(t){if(t===!0?!--oe.readyWait:!oe.isReady){if(!fe.body)return setTimeout(oe.ready);oe.isReady=!0,t!==!0&&--oe.readyWait>0||(we.resolveWith(fe,[oe]),oe.fn.triggerHandler&&(oe(fe).triggerHandler("ready"),oe(fe).off("ready")))}}}),oe.ready.promise=function(e){if(!we)if(we=oe.Deferred(),"complete"===fe.readyState)setTimeout(oe.ready);else if(fe.addEventListener)fe.addEventListener("DOMContentLoaded",a,!1),t.addEventListener("load",a,!1);else{fe.attachEvent("onreadystatechange",a),t.attachEvent("onload",a);var n=!1;try{n=null==t.frameElement&&fe.documentElement}catch(i){}n&&n.doScroll&&!function o(){if(!oe.isReady){try{n.doScroll("left")}catch(t){return setTimeout(o,50)}r(),oe.ready()}}()}return we.promise(e)};var Ce,Se="undefined";for(Ce in oe(ne))break;ne.ownLast="0"!==Ce,ne.inlineBlockNeedsLayout=!1,oe(function(){var t,e,n,i;n=fe.getElementsByTagName("body")[0],n&&n.style&&(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),typeof e.style.zoom!==Se&&(e.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ne.inlineBlockNeedsLayout=t=3===e.offsetWidth,t&&(n.style.zoom=1)),n.removeChild(i))}),function(){var t=fe.createElement("div");if(null==ne.deleteExpando){ne.deleteExpando=!0;try{delete t.test}catch(e){ne.deleteExpando=!1}}t=null}(),oe.acceptData=function(t){var e=oe.noData[(t.nodeName+" ").toLowerCase()],n=+t.nodeType||1;return 1!==n&&9!==n?!1:!e||e!==!0&&t.getAttribute("classid")===e};var Te=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ke=/([A-Z])/g;oe.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(t){return t=t.nodeType?oe.cache[t[oe.expando]]:t[oe.expando],!!t&&!h(t)},data:function(t,e,n){return c(t,e,n)},removeData:function(t,e){return u(t,e)},_data:function(t,e,n){return c(t,e,n,!0)},_removeData:function(t,e){return u(t,e,!0)}}),oe.fn.extend({data:function(t,e){var n,i,o,s=this[0],r=s&&s.attributes;if(void 0===t){if(this.length&&(o=oe.data(s),1===s.nodeType&&!oe._data(s,"parsedAttrs"))){for(n=r.length;n--;)r[n]&&(i=r[n].name,0===i.indexOf("data-")&&(i=oe.camelCase(i.slice(5)),l(s,i,o[i])));oe._data(s,"parsedAttrs",!0)}return o}return"object"==typeof t?this.each(function(){oe.data(this,t)}):arguments.length>1?this.each(function(){oe.data(this,t,e)}):s?l(s,t,oe.data(s,t)):void 0},removeData:function(t){return this.each(function(){oe.removeData(this,t)})}}),oe.extend({queue:function(t,e,n){var i;return t?(e=(e||"fx")+"queue",i=oe._data(t,e),n&&(!i||oe.isArray(n)?i=oe._data(t,e,oe.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(t,e){e=e||"fx";var n=oe.queue(t,e),i=n.length,o=n.shift(),s=oe._queueHooks(t,e),r=function(){oe.dequeue(t,e)};"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===e&&n.unshift("inprogress"),delete s.stop,o.call(t,r,s)),!i&&s&&s.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";return oe._data(t,n)||oe._data(t,n,{empty:oe.Callbacks("once memory").add(function(){oe._removeData(t,e+"queue"),oe._removeData(t,n)})})}}),oe.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?oe.queue(this[0],t):void 0===e?this:this.each(function(){var n=oe.queue(this,t,e);oe._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&oe.dequeue(this,t)})},dequeue:function(t){return this.each(function(){oe.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var n,i=1,o=oe.Deferred(),s=this,r=this.length,a=function(){--i||o.resolveWith(s,[s])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";r--;)n=oe._data(s[r],t+"queueHooks"),n&&n.empty&&(i++,n.empty.add(a));return a(),o.promise(e)}});var Ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ae=["Top","Right","Bottom","Left"],Le=function(t,e){return t=e||t,"none"===oe.css(t,"display")||!oe.contains(t.ownerDocument,t)},Pe=oe.access=function(t,e,n,i,o,s,r){var a=0,l=t.length,h=null==n;if("object"===oe.type(n)){o=!0;for(a in n)oe.access(t,e,a,n[a],!0,s,r)}else if(void 0!==i&&(o=!0,oe.isFunction(i)||(r=!0),h&&(r?(e.call(t,i),e=null):(h=e,e=function(t,e,n){return h.call(oe(t),n)})),e))for(;l>a;a++)e(t[a],n,r?i:i.call(t[a],a,e(t[a],n)));return o?t:h?e.call(t):l?e(t[0],n):s},Ne=/^(?:checkbox|radio)$/i;!function(){var t=fe.createElement("input"),e=fe.createElement("div"),n=fe.createDocumentFragment();if(e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ne.leadingWhitespace=3===e.firstChild.nodeType,ne.tbody=!e.getElementsByTagName("tbody").length,ne.htmlSerialize=!!e.getElementsByTagName("link").length,ne.html5Clone="<:nav></:nav>"!==fe.createElement("nav").cloneNode(!0).outerHTML,t.type="checkbox",t.checked=!0,n.appendChild(t),ne.appendChecked=t.checked,e.innerHTML="<textarea>x</textarea>",ne.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,n.appendChild(e),e.innerHTML="<input type='radio' checked='checked' name='t'/>",ne.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,ne.noCloneEvent=!0,e.attachEvent&&(e.attachEvent("onclick",function(){ne.noCloneEvent=!1}),e.cloneNode(!0).click()),null==ne.deleteExpando){ne.deleteExpando=!0;try{delete e.test}catch(i){ne.deleteExpando=!1}}}(),function(){var e,n,i=fe.createElement("div");for(e in{submit:!0,change:!0,focusin:!0})n="on"+e,(ne[e+"Bubbles"]=n in t)||(i.setAttribute(n,"t"),ne[e+"Bubbles"]=i.attributes[n].expando===!1);i=null}();var De=/^(?:input|select|textarea)$/i,Re=/^key/,Fe=/^(?:mouse|pointer|contextmenu)|click/,$e=/^(?:focusinfocus|focusoutblur)$/,Ie=/^([^.]*)(?:\.(.+)|)$/;oe.event={global:{},add:function(t,e,n,i,o){var s,r,a,l,h,c,u,d,p,f,g,m=oe._data(t);if(m){for(n.handler&&(l=n,n=l.handler,o=l.selector),n.guid||(n.guid=oe.guid++),(r=m.events)||(r=m.events={}),(c=m.handle)||(c=m.handle=function(t){return typeof oe===Se||t&&oe.event.triggered===t.type?void 0:oe.event.dispatch.apply(c.elem,arguments)},c.elem=t),e=(e||"").match(be)||[""],a=e.length;a--;)s=Ie.exec(e[a])||[],p=g=s[1],f=(s[2]||"").split(".").sort(),p&&(h=oe.event.special[p]||{},p=(o?h.delegateType:h.bindType)||p,h=oe.event.special[p]||{},u=oe.extend({type:p,origType:g,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&oe.expr.match.needsContext.test(o),namespace:f.join(".")},l),(d=r[p])||(d=r[p]=[],d.delegateCount=0,h.setup&&h.setup.call(t,i,f,c)!==!1||(t.addEventListener?t.addEventListener(p,c,!1):t.attachEvent&&t.attachEvent("on"+p,c))),h.add&&(h.add.call(t,u),u.handler.guid||(u.handler.guid=n.guid)),o?d.splice(d.delegateCount++,0,u):d.push(u),oe.event.global[p]=!0);t=null}},remove:function(t,e,n,i,o){var s,r,a,l,h,c,u,d,p,f,g,m=oe.hasData(t)&&oe._data(t);if(m&&(c=m.events)){for(e=(e||"").match(be)||[""],h=e.length;h--;)if(a=Ie.exec(e[h])||[],p=g=a[1],f=(a[2]||"").split(".").sort(),p){for(u=oe.event.special[p]||{},p=(i?u.delegateType:u.bindType)||p,d=c[p]||[],a=a[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=s=d.length;s--;)r=d[s],!o&&g!==r.origType||n&&n.guid!==r.guid||a&&!a.test(r.namespace)||i&&i!==r.selector&&("**"!==i||!r.selector)||(d.splice(s,1),r.selector&&d.delegateCount--,u.remove&&u.remove.call(t,r));l&&!d.length&&(u.teardown&&u.teardown.call(t,f,m.handle)!==!1||oe.removeEvent(t,p,m.handle),delete c[p])}else for(p in c)oe.event.remove(t,p+e[h],n,i,!0);oe.isEmptyObject(c)&&(delete m.handle,oe._removeData(t,"events"))}},trigger:function(e,n,i,o){var s,r,a,l,h,c,u,d=[i||fe],p=ee.call(e,"type")?e.type:e,f=ee.call(e,"namespace")?e.namespace.split("."):[];if(a=c=i=i||fe,3!==i.nodeType&&8!==i.nodeType&&!$e.test(p+oe.event.triggered)&&(p.indexOf(".")>=0&&(f=p.split("."),p=f.shift(),f.sort()),r=p.indexOf(":")<0&&"on"+p,e=e[oe.expando]?e:new oe.Event(p,"object"==typeof e&&e),e.isTrigger=o?2:3,e.namespace=f.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=i),n=null==n?[e]:oe.makeArray(n,[e]),h=oe.event.special[p]||{},o||!h.trigger||h.trigger.apply(i,n)!==!1)){if(!o&&!h.noBubble&&!oe.isWindow(i)){for(l=h.delegateType||p,$e.test(l+p)||(a=a.parentNode);a;a=a.parentNode)d.push(a),c=a;
c===(i.ownerDocument||fe)&&d.push(c.defaultView||c.parentWindow||t)}for(u=0;(a=d[u++])&&!e.isPropagationStopped();)e.type=u>1?l:h.bindType||p,s=(oe._data(a,"events")||{})[e.type]&&oe._data(a,"handle"),s&&s.apply(a,n),s=r&&a[r],s&&s.apply&&oe.acceptData(a)&&(e.result=s.apply(a,n),e.result===!1&&e.preventDefault());if(e.type=p,!o&&!e.isDefaultPrevented()&&(!h._default||h._default.apply(d.pop(),n)===!1)&&oe.acceptData(i)&&r&&i[p]&&!oe.isWindow(i)){c=i[r],c&&(i[r]=null),oe.event.triggered=p;try{i[p]()}catch(g){}oe.event.triggered=void 0,c&&(i[r]=c)}return e.result}},dispatch:function(t){t=oe.event.fix(t);var e,n,i,o,s,r=[],a=Q.call(arguments),l=(oe._data(this,"events")||{})[t.type]||[],h=oe.event.special[t.type]||{};if(a[0]=t,t.delegateTarget=this,!h.preDispatch||h.preDispatch.call(this,t)!==!1){for(r=oe.event.handlers.call(this,t,l),e=0;(o=r[e++])&&!t.isPropagationStopped();)for(t.currentTarget=o.elem,s=0;(i=o.handlers[s++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(i.namespace))&&(t.handleObj=i,t.data=i.data,n=((oe.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,a),void 0!==n&&(t.result=n)===!1&&(t.preventDefault(),t.stopPropagation()));return h.postDispatch&&h.postDispatch.call(this,t),t.result}},handlers:function(t,e){var n,i,o,s,r=[],a=e.delegateCount,l=t.target;if(a&&l.nodeType&&(!t.button||"click"!==t.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==t.type)){for(o=[],s=0;a>s;s++)i=e[s],n=i.selector+" ",void 0===o[n]&&(o[n]=i.needsContext?oe(n,this).index(l)>=0:oe.find(n,this,null,[l]).length),o[n]&&o.push(i);o.length&&r.push({elem:l,handlers:o})}return a<e.length&&r.push({elem:this,handlers:e.slice(a)}),r},fix:function(t){if(t[oe.expando])return t;var e,n,i,o=t.type,s=t,r=this.fixHooks[o];for(r||(this.fixHooks[o]=r=Fe.test(o)?this.mouseHooks:Re.test(o)?this.keyHooks:{}),i=r.props?this.props.concat(r.props):this.props,t=new oe.Event(s),e=i.length;e--;)n=i[e],t[n]=s[n];return t.target||(t.target=s.srcElement||fe),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,r.filter?r.filter(t,s):t},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(t,e){var n,i,o,s=e.button,r=e.fromElement;return null==t.pageX&&null!=e.clientX&&(i=t.target.ownerDocument||fe,o=i.documentElement,n=i.body,t.pageX=e.clientX+(o&&o.scrollLeft||n&&n.scrollLeft||0)-(o&&o.clientLeft||n&&n.clientLeft||0),t.pageY=e.clientY+(o&&o.scrollTop||n&&n.scrollTop||0)-(o&&o.clientTop||n&&n.clientTop||0)),!t.relatedTarget&&r&&(t.relatedTarget=r===t.target?e.toElement:r),t.which||void 0===s||(t.which=1&s?1:2&s?3:4&s?2:0),t}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==f()&&this.focus)try{return this.focus(),!1}catch(t){}},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return oe.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(t){return oe.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}},simulate:function(t,e,n,i){var o=oe.extend(new oe.Event,n,{type:t,isSimulated:!0,originalEvent:{}});i?oe.event.trigger(o,null,e):oe.event.dispatch.call(e,o),o.isDefaultPrevented()&&n.preventDefault()}},oe.removeEvent=fe.removeEventListener?function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n,!1)}:function(t,e,n){var i="on"+e;t.detachEvent&&(typeof t[i]===Se&&(t[i]=null),t.detachEvent(i,n))},oe.Event=function(t,e){return this instanceof oe.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?d:p):this.type=t,e&&oe.extend(this,e),this.timeStamp=t&&t.timeStamp||oe.now(),void(this[oe.expando]=!0)):new oe.Event(t,e)},oe.Event.prototype={isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=d,t&&(t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=d,t&&(t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0)},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=d,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},oe.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){oe.event.special[t]={delegateType:e,bindType:e,handle:function(t){var n,i=this,o=t.relatedTarget,s=t.handleObj;return(!o||o!==i&&!oe.contains(i,o))&&(t.type=s.origType,n=s.handler.apply(this,arguments),t.type=e),n}}}),ne.submitBubbles||(oe.event.special.submit={setup:function(){return oe.nodeName(this,"form")?!1:void oe.event.add(this,"click._submit keypress._submit",function(t){var e=t.target,n=oe.nodeName(e,"input")||oe.nodeName(e,"button")?e.form:void 0;n&&!oe._data(n,"submitBubbles")&&(oe.event.add(n,"submit._submit",function(t){t._submit_bubble=!0}),oe._data(n,"submitBubbles",!0))})},postDispatch:function(t){t._submit_bubble&&(delete t._submit_bubble,this.parentNode&&!t.isTrigger&&oe.event.simulate("submit",this.parentNode,t,!0))},teardown:function(){return oe.nodeName(this,"form")?!1:void oe.event.remove(this,"._submit")}}),ne.changeBubbles||(oe.event.special.change={setup:function(){return De.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(oe.event.add(this,"propertychange._change",function(t){"checked"===t.originalEvent.propertyName&&(this._just_changed=!0)}),oe.event.add(this,"click._change",function(t){this._just_changed&&!t.isTrigger&&(this._just_changed=!1),oe.event.simulate("change",this,t,!0)})),!1):void oe.event.add(this,"beforeactivate._change",function(t){var e=t.target;De.test(e.nodeName)&&!oe._data(e,"changeBubbles")&&(oe.event.add(e,"change._change",function(t){!this.parentNode||t.isSimulated||t.isTrigger||oe.event.simulate("change",this.parentNode,t,!0)}),oe._data(e,"changeBubbles",!0))})},handle:function(t){var e=t.target;return this!==e||t.isSimulated||t.isTrigger||"radio"!==e.type&&"checkbox"!==e.type?t.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return oe.event.remove(this,"._change"),!De.test(this.nodeName)}}),ne.focusinBubbles||oe.each({focus:"focusin",blur:"focusout"},function(t,e){var n=function(t){oe.event.simulate(e,t.target,oe.event.fix(t),!0)};oe.event.special[e]={setup:function(){var i=this.ownerDocument||this,o=oe._data(i,e);o||i.addEventListener(t,n,!0),oe._data(i,e,(o||0)+1)},teardown:function(){var i=this.ownerDocument||this,o=oe._data(i,e)-1;o?oe._data(i,e,o):(i.removeEventListener(t,n,!0),oe._removeData(i,e))}}}),oe.fn.extend({on:function(t,e,n,i,o){var s,r;if("object"==typeof t){"string"!=typeof e&&(n=n||e,e=void 0);for(s in t)this.on(s,e,n,t[s],o);return this}if(null==n&&null==i?(i=e,n=e=void 0):null==i&&("string"==typeof e?(i=n,n=void 0):(i=n,n=e,e=void 0)),i===!1)i=p;else if(!i)return this;return 1===o&&(r=i,i=function(t){return oe().off(t),r.apply(this,arguments)},i.guid=r.guid||(r.guid=oe.guid++)),this.each(function(){oe.event.add(this,t,i,n,e)})},one:function(t,e,n,i){return this.on(t,e,n,i,1)},off:function(t,e,n){var i,o;if(t&&t.preventDefault&&t.handleObj)return i=t.handleObj,oe(t.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof t){for(o in t)this.off(o,e,t[o]);return this}return(e===!1||"function"==typeof e)&&(n=e,e=void 0),n===!1&&(n=p),this.each(function(){oe.event.remove(this,t,n,e)})},trigger:function(t,e){return this.each(function(){oe.event.trigger(t,e,this)})},triggerHandler:function(t,e){var n=this[0];return n?oe.event.trigger(t,e,n,!0):void 0}});var Oe="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Me=/ jQuery\d+="(?:null|\d+)"/g,je=new RegExp("<(?:"+Oe+")[\\s/>]","i"),He=/^\s+/,We=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,_e=/<([\w:]+)/,Be=/<tbody/i,ze=/<|&#?\w+;/,qe=/<(?:script|style|link)/i,Xe=/checked\s*(?:[^=]|=\s*.checked.)/i,Ve=/^$|\/(?:java|ecma)script/i,Ue=/^true\/(.*)/,Ye=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Qe={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ne.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Ge=g(fe),Je=Ge.appendChild(fe.createElement("div"));Qe.optgroup=Qe.option,Qe.tbody=Qe.tfoot=Qe.colgroup=Qe.caption=Qe.thead,Qe.th=Qe.td,oe.extend({clone:function(t,e,n){var i,o,s,r,a,l=oe.contains(t.ownerDocument,t);if(ne.html5Clone||oe.isXMLDoc(t)||!je.test("<"+t.nodeName+">")?s=t.cloneNode(!0):(Je.innerHTML=t.outerHTML,Je.removeChild(s=Je.firstChild)),!(ne.noCloneEvent&&ne.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||oe.isXMLDoc(t)))for(i=m(s),a=m(t),r=0;null!=(o=a[r]);++r)i[r]&&S(o,i[r]);if(e)if(n)for(a=a||m(t),i=i||m(s),r=0;null!=(o=a[r]);r++)C(o,i[r]);else C(t,s);return i=m(s,"script"),i.length>0&&w(i,!l&&m(t,"script")),i=a=o=null,s},buildFragment:function(t,e,n,i){for(var o,s,r,a,l,h,c,u=t.length,d=g(e),p=[],f=0;u>f;f++)if(s=t[f],s||0===s)if("object"===oe.type(s))oe.merge(p,s.nodeType?[s]:s);else if(ze.test(s)){for(a=a||d.appendChild(e.createElement("div")),l=(_e.exec(s)||["",""])[1].toLowerCase(),c=Qe[l]||Qe._default,a.innerHTML=c[1]+s.replace(We,"<$1></$2>")+c[2],o=c[0];o--;)a=a.lastChild;if(!ne.leadingWhitespace&&He.test(s)&&p.push(e.createTextNode(He.exec(s)[0])),!ne.tbody)for(s="table"!==l||Be.test(s)?"<table>"!==c[1]||Be.test(s)?0:a:a.firstChild,o=s&&s.childNodes.length;o--;)oe.nodeName(h=s.childNodes[o],"tbody")&&!h.childNodes.length&&s.removeChild(h);for(oe.merge(p,a.childNodes),a.textContent="";a.firstChild;)a.removeChild(a.firstChild);a=d.lastChild}else p.push(e.createTextNode(s));for(a&&d.removeChild(a),ne.appendChecked||oe.grep(m(p,"input"),v),f=0;s=p[f++];)if((!i||-1===oe.inArray(s,i))&&(r=oe.contains(s.ownerDocument,s),a=m(d.appendChild(s),"script"),r&&w(a),n))for(o=0;s=a[o++];)Ve.test(s.type||"")&&n.push(s);return a=null,d},cleanData:function(t,e){for(var n,i,o,s,r=0,a=oe.expando,l=oe.cache,h=ne.deleteExpando,c=oe.event.special;null!=(n=t[r]);r++)if((e||oe.acceptData(n))&&(o=n[a],s=o&&l[o])){if(s.events)for(i in s.events)c[i]?oe.event.remove(n,i):oe.removeEvent(n,i,s.handle);l[o]&&(delete l[o],h?delete n[a]:typeof n.removeAttribute!==Se?n.removeAttribute(a):n[a]=null,Y.push(o))}}}),oe.fn.extend({text:function(t){return Pe(this,function(t){return void 0===t?oe.text(this):this.empty().append((this[0]&&this[0].ownerDocument||fe).createTextNode(t))},null,t,arguments.length)},append:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.appendChild(t)}})},prepend:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},remove:function(t,e){for(var n,i=t?oe.filter(t,this):this,o=0;null!=(n=i[o]);o++)e||1!==n.nodeType||oe.cleanData(m(n)),n.parentNode&&(e&&oe.contains(n.ownerDocument,n)&&w(m(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var t,e=0;null!=(t=this[e]);e++){for(1===t.nodeType&&oe.cleanData(m(t,!1));t.firstChild;)t.removeChild(t.firstChild);t.options&&oe.nodeName(t,"select")&&(t.options.length=0)}return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,this.map(function(){return oe.clone(this,t,e)})},html:function(t){return Pe(this,function(t){var e=this[0]||{},n=0,i=this.length;if(void 0===t)return 1===e.nodeType?e.innerHTML.replace(Me,""):void 0;if(!("string"!=typeof t||qe.test(t)||!ne.htmlSerialize&&je.test(t)||!ne.leadingWhitespace&&He.test(t)||Qe[(_e.exec(t)||["",""])[1].toLowerCase()])){t=t.replace(We,"<$1></$2>");try{for(;i>n;n++)e=this[n]||{},1===e.nodeType&&(oe.cleanData(m(e,!1)),e.innerHTML=t);e=0}catch(o){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=arguments[0];return this.domManip(arguments,function(e){t=this.parentNode,oe.cleanData(m(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove()},detach:function(t){return this.remove(t,!0)},domManip:function(t,e){t=G.apply([],t);var n,i,o,s,r,a,l=0,h=this.length,c=this,u=h-1,d=t[0],p=oe.isFunction(d);if(p||h>1&&"string"==typeof d&&!ne.checkClone&&Xe.test(d))return this.each(function(n){var i=c.eq(n);p&&(t[0]=d.call(this,n,i.html())),i.domManip(t,e)});if(h&&(a=oe.buildFragment(t,this[0].ownerDocument,!1,this),n=a.firstChild,1===a.childNodes.length&&(a=n),n)){for(s=oe.map(m(a,"script"),b),o=s.length;h>l;l++)i=a,l!==u&&(i=oe.clone(i,!0,!0),o&&oe.merge(s,m(i,"script"))),e.call(this[l],i,l);if(o)for(r=s[s.length-1].ownerDocument,oe.map(s,x),l=0;o>l;l++)i=s[l],Ve.test(i.type||"")&&!oe._data(i,"globalEval")&&oe.contains(r,i)&&(i.src?oe._evalUrl&&oe._evalUrl(i.src):oe.globalEval((i.text||i.textContent||i.innerHTML||"").replace(Ye,"")));a=n=null}return this}}),oe.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){oe.fn[t]=function(t){for(var n,i=0,o=[],s=oe(t),r=s.length-1;r>=i;i++)n=i===r?this:this.clone(!0),oe(s[i])[e](n),J.apply(o,n.get());return this.pushStack(o)}});var Ze,Ke={};!function(){var t;ne.shrinkWrapBlocks=function(){if(null!=t)return t;t=!1;var e,n,i;return n=fe.getElementsByTagName("body")[0],n&&n.style?(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),typeof e.style.zoom!==Se&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(fe.createElement("div")).style.width="5px",t=3!==e.offsetWidth),n.removeChild(i),t):void 0}}();var tn,en,nn=/^margin/,on=new RegExp("^("+Ee+")(?!px)[a-z%]+$","i"),sn=/^(top|right|bottom|left)$/;t.getComputedStyle?(tn=function(e){return e.ownerDocument.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):t.getComputedStyle(e,null)},en=function(t,e,n){var i,o,s,r,a=t.style;return n=n||tn(t),r=n?n.getPropertyValue(e)||n[e]:void 0,n&&(""!==r||oe.contains(t.ownerDocument,t)||(r=oe.style(t,e)),on.test(r)&&nn.test(e)&&(i=a.width,o=a.minWidth,s=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=n.width,a.width=i,a.minWidth=o,a.maxWidth=s)),void 0===r?r:r+""}):fe.documentElement.currentStyle&&(tn=function(t){return t.currentStyle},en=function(t,e,n){var i,o,s,r,a=t.style;return n=n||tn(t),r=n?n[e]:void 0,null==r&&a&&a[e]&&(r=a[e]),on.test(r)&&!sn.test(e)&&(i=a.left,o=t.runtimeStyle,s=o&&o.left,s&&(o.left=t.currentStyle.left),a.left="fontSize"===e?"1em":r,r=a.pixelLeft+"px",a.left=i,s&&(o.left=s)),void 0===r?r:r+""||"auto"}),function(){function e(){var e,n,i,o;n=fe.getElementsByTagName("body")[0],n&&n.style&&(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),e.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s=r=!1,l=!0,t.getComputedStyle&&(s="1%"!==(t.getComputedStyle(e,null)||{}).top,r="4px"===(t.getComputedStyle(e,null)||{width:"4px"}).width,o=e.appendChild(fe.createElement("div")),o.style.cssText=e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",o.style.marginRight=o.style.width="0",e.style.width="1px",l=!parseFloat((t.getComputedStyle(o,null)||{}).marginRight),e.removeChild(o)),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=e.getElementsByTagName("td"),o[0].style.cssText="margin:0;border:0;padding:0;display:none",a=0===o[0].offsetHeight,a&&(o[0].style.display="",o[1].style.display="none",a=0===o[0].offsetHeight),n.removeChild(i))}var n,i,o,s,r,a,l;n=fe.createElement("div"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",o=n.getElementsByTagName("a")[0],i=o&&o.style,i&&(i.cssText="float:left;opacity:.5",ne.opacity="0.5"===i.opacity,ne.cssFloat=!!i.cssFloat,n.style.backgroundClip="content-box",n.cloneNode(!0).style.backgroundClip="",ne.clearCloneStyle="content-box"===n.style.backgroundClip,ne.boxSizing=""===i.boxSizing||""===i.MozBoxSizing||""===i.WebkitBoxSizing,oe.extend(ne,{reliableHiddenOffsets:function(){return null==a&&e(),a},boxSizingReliable:function(){return null==r&&e(),r},pixelPosition:function(){return null==s&&e(),s},reliableMarginRight:function(){return null==l&&e(),l}}))}(),oe.swap=function(t,e,n,i){var o,s,r={};for(s in e)r[s]=t.style[s],t.style[s]=e[s];o=n.apply(t,i||[]);for(s in e)t.style[s]=r[s];return o};var rn=/alpha\([^)]*\)/i,an=/opacity\s*=\s*([^)]*)/,ln=/^(none|table(?!-c[ea]).+)/,hn=new RegExp("^("+Ee+")(.*)$","i"),cn=new RegExp("^([+-])=("+Ee+")","i"),un={position:"absolute",visibility:"hidden",display:"block"},dn={letterSpacing:"0",fontWeight:"400"},pn=["Webkit","O","Moz","ms"];oe.extend({cssHooks:{opacity:{get:function(t,e){if(e){var n=en(t,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ne.cssFloat?"cssFloat":"styleFloat"},style:function(t,e,n,i){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var o,s,r,a=oe.camelCase(e),l=t.style;if(e=oe.cssProps[a]||(oe.cssProps[a]=A(l,a)),r=oe.cssHooks[e]||oe.cssHooks[a],void 0===n)return r&&"get"in r&&void 0!==(o=r.get(t,!1,i))?o:l[e];if(s=typeof n,"string"===s&&(o=cn.exec(n))&&(n=(o[1]+1)*o[2]+parseFloat(oe.css(t,e)),s="number"),null!=n&&n===n&&("number"!==s||oe.cssNumber[a]||(n+="px"),ne.clearCloneStyle||""!==n||0!==e.indexOf("background")||(l[e]="inherit"),!(r&&"set"in r&&void 0===(n=r.set(t,n,i)))))try{l[e]=n}catch(h){}}},css:function(t,e,n,i){var o,s,r,a=oe.camelCase(e);return e=oe.cssProps[a]||(oe.cssProps[a]=A(t.style,a)),r=oe.cssHooks[e]||oe.cssHooks[a],r&&"get"in r&&(s=r.get(t,!0,n)),void 0===s&&(s=en(t,e,i)),"normal"===s&&e in dn&&(s=dn[e]),""===n||n?(o=parseFloat(s),n===!0||oe.isNumeric(o)?o||0:s):s}}),oe.each(["height","width"],function(t,e){oe.cssHooks[e]={get:function(t,n,i){return n?ln.test(oe.css(t,"display"))&&0===t.offsetWidth?oe.swap(t,un,function(){return D(t,e,i)}):D(t,e,i):void 0},set:function(t,n,i){var o=i&&tn(t);return P(t,n,i?N(t,e,i,ne.boxSizing&&"border-box"===oe.css(t,"boxSizing",!1,o),o):0)}}}),ne.opacity||(oe.cssHooks.opacity={get:function(t,e){return an.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":e?"1":""},set:function(t,e){var n=t.style,i=t.currentStyle,o=oe.isNumeric(e)?"alpha(opacity="+100*e+")":"",s=i&&i.filter||n.filter||"";n.zoom=1,(e>=1||""===e)&&""===oe.trim(s.replace(rn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===e||i&&!i.filter)||(n.filter=rn.test(s)?s.replace(rn,o):s+" "+o)}}),oe.cssHooks.marginRight=E(ne.reliableMarginRight,function(t,e){return e?oe.swap(t,{display:"inline-block"},en,[t,"marginRight"]):void 0}),oe.each({margin:"",padding:"",border:"Width"},function(t,e){oe.cssHooks[t+e]={expand:function(n){for(var i=0,o={},s="string"==typeof n?n.split(" "):[n];4>i;i++)o[t+Ae[i]+e]=s[i]||s[i-2]||s[0];return o}},nn.test(t)||(oe.cssHooks[t+e].set=P)}),oe.fn.extend({css:function(t,e){return Pe(this,function(t,e,n){var i,o,s={},r=0;if(oe.isArray(e)){for(i=tn(t),o=e.length;o>r;r++)s[e[r]]=oe.css(t,e[r],!1,i);return s}return void 0!==n?oe.style(t,e,n):oe.css(t,e)},t,e,arguments.length>1)},show:function(){return L(this,!0)},hide:function(){return L(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Le(this)?oe(this).show():oe(this).hide()})}}),oe.Tween=R,R.prototype={constructor:R,init:function(t,e,n,i,o,s){this.elem=t,this.prop=n,this.easing=o||"swing",this.options=e,this.start=this.now=this.cur(),this.end=i,this.unit=s||(oe.cssNumber[n]?"":"px")},cur:function(){var t=R.propHooks[this.prop];return t&&t.get?t.get(this):R.propHooks._default.get(this)},run:function(t){var e,n=R.propHooks[this.prop];return this.pos=e=this.options.duration?oe.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):R.propHooks._default.set(this),this}},R.prototype.init.prototype=R.prototype,R.propHooks={_default:{get:function(t){var e;return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=oe.css(t.elem,t.prop,""),e&&"auto"!==e?e:0):t.elem[t.prop]},set:function(t){oe.fx.step[t.prop]?oe.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[oe.cssProps[t.prop]]||oe.cssHooks[t.prop])?oe.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now}}},R.propHooks.scrollTop=R.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},oe.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2}},oe.fx=R.prototype.init,oe.fx.step={};var fn,gn,mn=/^(?:toggle|show|hide)$/,vn=new RegExp("^(?:([+-])=|)("+Ee+")([a-z%]*)$","i"),yn=/queueHooks$/,bn=[O],xn={"*":[function(t,e){var n=this.createTween(t,e),i=n.cur(),o=vn.exec(e),s=o&&o[3]||(oe.cssNumber[t]?"":"px"),r=(oe.cssNumber[t]||"px"!==s&&+i)&&vn.exec(oe.css(n.elem,t)),a=1,l=20;if(r&&r[3]!==s){s=s||r[3],o=o||[],r=+i||1;do a=a||".5",r/=a,oe.style(n.elem,t,r+s);while(a!==(a=n.cur()/i)&&1!==a&&--l)}return o&&(r=n.start=+r||+i||0,n.unit=s,n.end=o[1]?r+(o[1]+1)*o[2]:+o[2]),n}]};oe.Animation=oe.extend(j,{tweener:function(t,e){oe.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");for(var n,i=0,o=t.length;o>i;i++)n=t[i],xn[n]=xn[n]||[],xn[n].unshift(e)},prefilter:function(t,e){e?bn.unshift(t):bn.push(t)}}),oe.speed=function(t,e,n){var i=t&&"object"==typeof t?oe.extend({},t):{complete:n||!n&&e||oe.isFunction(t)&&t,duration:t,easing:n&&e||e&&!oe.isFunction(e)&&e};return i.duration=oe.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in oe.fx.speeds?oe.fx.speeds[i.duration]:oe.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){oe.isFunction(i.old)&&i.old.call(this),i.queue&&oe.dequeue(this,i.queue)},i},oe.fn.extend({fadeTo:function(t,e,n,i){return this.filter(Le).css("opacity",0).show().end().animate({opacity:e},t,n,i)},animate:function(t,e,n,i){var o=oe.isEmptyObject(t),s=oe.speed(e,n,i),r=function(){var e=j(this,oe.extend({},t),s);(o||oe._data(this,"finish"))&&e.stop(!0)};return r.finish=r,o||s.queue===!1?this.each(r):this.queue(s.queue,r)},stop:function(t,e,n){var i=function(t){var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var e=!0,o=null!=t&&t+"queueHooks",s=oe.timers,r=oe._data(this);if(o)r[o]&&r[o].stop&&i(r[o]);else for(o in r)r[o]&&r[o].stop&&yn.test(o)&&i(r[o]);for(o=s.length;o--;)s[o].elem!==this||null!=t&&s[o].queue!==t||(s[o].anim.stop(n),e=!1,s.splice(o,1));(e||!n)&&oe.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var e,n=oe._data(this),i=n[t+"queue"],o=n[t+"queueHooks"],s=oe.timers,r=i?i.length:0;for(n.finish=!0,oe.queue(this,t,[]),o&&o.stop&&o.stop.call(this,!0),e=s.length;e--;)s[e].elem===this&&s[e].queue===t&&(s[e].anim.stop(!0),s.splice(e,1));for(e=0;r>e;e++)i[e]&&i[e].finish&&i[e].finish.call(this);delete n.finish})}}),oe.each(["toggle","show","hide"],function(t,e){var n=oe.fn[e];oe.fn[e]=function(t,i,o){return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate($(e,!0),t,i,o)}}),oe.each({slideDown:$("show"),slideUp:$("hide"),slideToggle:$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){oe.fn[t]=function(t,n,i){return this.animate(e,t,n,i)}}),oe.timers=[],oe.fx.tick=function(){var t,e=oe.timers,n=0;for(fn=oe.now();n<e.length;n++)t=e[n],t()||e[n]!==t||e.splice(n--,1);e.length||oe.fx.stop(),fn=void 0},oe.fx.timer=function(t){oe.timers.push(t),t()?oe.fx.start():oe.timers.pop()},oe.fx.interval=13,oe.fx.start=function(){gn||(gn=setInterval(oe.fx.tick,oe.fx.interval))},oe.fx.stop=function(){clearInterval(gn),gn=null},oe.fx.speeds={slow:600,fast:200,_default:400},oe.fn.delay=function(t,e){return t=oe.fx?oe.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,n){var i=setTimeout(e,t);n.stop=function(){clearTimeout(i)}})},function(){var t,e,n,i,o;e=fe.createElement("div"),e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",i=e.getElementsByTagName("a")[0],n=fe.createElement("select"),o=n.appendChild(fe.createElement("option")),t=e.getElementsByTagName("input")[0],i.style.cssText="top:1px",ne.getSetAttribute="t"!==e.className,ne.style=/top/.test(i.getAttribute("style")),ne.hrefNormalized="/a"===i.getAttribute("href"),ne.checkOn=!!t.value,ne.optSelected=o.selected,ne.enctype=!!fe.createElement("form").enctype,n.disabled=!0,ne.optDisabled=!o.disabled,t=fe.createElement("input"),t.setAttribute("value",""),ne.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),ne.radioValue="t"===t.value}();var wn=/\r/g;oe.fn.extend({val:function(t){var e,n,i,o=this[0];{if(arguments.length)return i=oe.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(o=i?t.call(this,n,oe(this).val()):t,null==o?o="":"number"==typeof o?o+="":oe.isArray(o)&&(o=oe.map(o,function(t){return null==t?"":t+""})),e=oe.valHooks[this.type]||oe.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,o,"value")||(this.value=o))});if(o)return e=oe.valHooks[o.type]||oe.valHooks[o.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(n=e.get(o,"value"))?n:(n=o.value,"string"==typeof n?n.replace(wn,""):null==n?"":n)}}}),oe.extend({valHooks:{option:{get:function(t){var e=oe.find.attr(t,"value");return null!=e?e:oe.trim(oe.text(t))}},select:{get:function(t){for(var e,n,i=t.options,o=t.selectedIndex,s="select-one"===t.type||0>o,r=s?null:[],a=s?o+1:i.length,l=0>o?a:s?o:0;a>l;l++)if(n=i[l],!(!n.selected&&l!==o||(ne.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&oe.nodeName(n.parentNode,"optgroup"))){if(e=oe(n).val(),s)return e;r.push(e)}return r},set:function(t,e){for(var n,i,o=t.options,s=oe.makeArray(e),r=o.length;r--;)if(i=o[r],oe.inArray(oe.valHooks.option.get(i),s)>=0)try{i.selected=n=!0}catch(a){i.scrollHeight}else i.selected=!1;return n||(t.selectedIndex=-1),o}}}}),oe.each(["radio","checkbox"],function(){oe.valHooks[this]={set:function(t,e){return oe.isArray(e)?t.checked=oe.inArray(oe(t).val(),e)>=0:void 0}},ne.checkOn||(oe.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var Cn,Sn,Tn=oe.expr.attrHandle,kn=/^(?:checked|selected)$/i,En=ne.getSetAttribute,An=ne.input;oe.fn.extend({attr:function(t,e){return Pe(this,oe.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){oe.removeAttr(this,t)})}}),oe.extend({attr:function(t,e,n){var i,o,s=t.nodeType;if(t&&3!==s&&8!==s&&2!==s)return typeof t.getAttribute===Se?oe.prop(t,e,n):(1===s&&oe.isXMLDoc(t)||(e=e.toLowerCase(),i=oe.attrHooks[e]||(oe.expr.match.bool.test(e)?Sn:Cn)),void 0===n?i&&"get"in i&&null!==(o=i.get(t,e))?o:(o=oe.find.attr(t,e),null==o?void 0:o):null!==n?i&&"set"in i&&void 0!==(o=i.set(t,n,e))?o:(t.setAttribute(e,n+""),n):void oe.removeAttr(t,e))},removeAttr:function(t,e){var n,i,o=0,s=e&&e.match(be);if(s&&1===t.nodeType)for(;n=s[o++];)i=oe.propFix[n]||n,oe.expr.match.bool.test(n)?An&&En||!kn.test(n)?t[i]=!1:t[oe.camelCase("default-"+n)]=t[i]=!1:oe.attr(t,n,""),t.removeAttribute(En?n:i)},attrHooks:{type:{set:function(t,e){if(!ne.radioValue&&"radio"===e&&oe.nodeName(t,"input")){var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}}}),Sn={set:function(t,e,n){return e===!1?oe.removeAttr(t,n):An&&En||!kn.test(n)?t.setAttribute(!En&&oe.propFix[n]||n,n):t[oe.camelCase("default-"+n)]=t[n]=!0,n}},oe.each(oe.expr.match.bool.source.match(/\w+/g),function(t,e){var n=Tn[e]||oe.find.attr;Tn[e]=An&&En||!kn.test(e)?function(t,e,i){var o,s;return i||(s=Tn[e],Tn[e]=o,o=null!=n(t,e,i)?e.toLowerCase():null,Tn[e]=s),o}:function(t,e,n){return n?void 0:t[oe.camelCase("default-"+e)]?e.toLowerCase():null}}),An&&En||(oe.attrHooks.value={set:function(t,e,n){return oe.nodeName(t,"input")?void(t.defaultValue=e):Cn&&Cn.set(t,e,n)}}),En||(Cn={set:function(t,e,n){var i=t.getAttributeNode(n);return i||t.setAttributeNode(i=t.ownerDocument.createAttribute(n)),i.value=e+="","value"===n||e===t.getAttribute(n)?e:void 0}},Tn.id=Tn.name=Tn.coords=function(t,e,n){var i;return n?void 0:(i=t.getAttributeNode(e))&&""!==i.value?i.value:null},oe.valHooks.button={get:function(t,e){var n=t.getAttributeNode(e);return n&&n.specified?n.value:void 0},set:Cn.set},oe.attrHooks.contenteditable={set:function(t,e,n){Cn.set(t,""===e?!1:e,n)}},oe.each(["width","height"],function(t,e){oe.attrHooks[e]={set:function(t,n){return""===n?(t.setAttribute(e,"auto"),n):void 0}}})),ne.style||(oe.attrHooks.style={get:function(t){return t.style.cssText||void 0},set:function(t,e){return t.style.cssText=e+""}});var Ln=/^(?:input|select|textarea|button|object)$/i,Pn=/^(?:a|area)$/i;oe.fn.extend({prop:function(t,e){return Pe(this,oe.prop,t,e,arguments.length>1)},removeProp:function(t){return t=oe.propFix[t]||t,this.each(function(){try{this[t]=void 0,delete this[t]}catch(e){}})}}),oe.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(t,e,n){var i,o,s,r=t.nodeType;if(t&&3!==r&&8!==r&&2!==r)return s=1!==r||!oe.isXMLDoc(t),s&&(e=oe.propFix[e]||e,o=oe.propHooks[e]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:t[e]=n:o&&"get"in o&&null!==(i=o.get(t,e))?i:t[e]},propHooks:{tabIndex:{get:function(t){var e=oe.find.attr(t,"tabindex");return e?parseInt(e,10):Ln.test(t.nodeName)||Pn.test(t.nodeName)&&t.href?0:-1}}}}),ne.hrefNormalized||oe.each(["href","src"],function(t,e){oe.propHooks[e]={get:function(t){return t.getAttribute(e,4)}}}),ne.optSelected||(oe.propHooks.selected={get:function(t){var e=t.parentNode;return e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex),null}}),oe.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){oe.propFix[this.toLowerCase()]=this}),ne.enctype||(oe.propFix.enctype="encoding");var Nn=/[\t\r\n\f]/g;oe.fn.extend({addClass:function(t){var e,n,i,o,s,r,a=0,l=this.length,h="string"==typeof t&&t;if(oe.isFunction(t))return this.each(function(e){oe(this).addClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>a;a++)if(n=this[a],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Nn," "):" ")){for(s=0;o=e[s++];)i.indexOf(" "+o+" ")<0&&(i+=o+" ");r=oe.trim(i),n.className!==r&&(n.className=r)}return this},removeClass:function(t){var e,n,i,o,s,r,a=0,l=this.length,h=0===arguments.length||"string"==typeof t&&t;if(oe.isFunction(t))return this.each(function(e){oe(this).removeClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>a;a++)if(n=this[a],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Nn," "):"")){for(s=0;o=e[s++];)for(;i.indexOf(" "+o+" ")>=0;)i=i.replace(" "+o+" "," ");r=t?oe.trim(i):"",n.className!==r&&(n.className=r)}return this},toggleClass:function(t,e){var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):this.each(oe.isFunction(t)?function(n){oe(this).toggleClass(t.call(this,n,this.className,e),e)}:function(){if("string"===n)for(var e,i=0,o=oe(this),s=t.match(be)||[];e=s[i++];)o.hasClass(e)?o.removeClass(e):o.addClass(e);
else(n===Se||"boolean"===n)&&(this.className&&oe._data(this,"__className__",this.className),this.className=this.className||t===!1?"":oe._data(this,"__className__")||"")})},hasClass:function(t){for(var e=" "+t+" ",n=0,i=this.length;i>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Nn," ").indexOf(e)>=0)return!0;return!1}}),oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){oe.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)}}),oe.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)},bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,n,i){return this.on(e,t,n,i)},undelegate:function(t,e,n){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}});var Dn=oe.now(),Rn=/\?/,Fn=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;oe.parseJSON=function(e){if(t.JSON&&t.JSON.parse)return t.JSON.parse(e+"");var n,i=null,o=oe.trim(e+"");return o&&!oe.trim(o.replace(Fn,function(t,e,o,s){return n&&e&&(i=0),0===i?t:(n=o||e,i+=!s-!o,"")}))?Function("return "+o)():oe.error("Invalid JSON: "+e)},oe.parseXML=function(e){var n,i;if(!e||"string"!=typeof e)return null;try{t.DOMParser?(i=new DOMParser,n=i.parseFromString(e,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e))}catch(o){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||oe.error("Invalid XML: "+e),n};var $n,In,On=/#.*$/,Mn=/([?&])_=[^&]*/,jn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Hn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Wn=/^(?:GET|HEAD)$/,_n=/^\/\//,Bn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,zn={},qn={},Xn="*/".concat("*");try{In=location.href}catch(Vn){In=fe.createElement("a"),In.href="",In=In.href}$n=Bn.exec(In.toLowerCase())||[],oe.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:In,type:"GET",isLocal:Hn.test($n[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":oe.parseJSON,"text xml":oe.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?_(_(t,oe.ajaxSettings),e):_(oe.ajaxSettings,t)},ajaxPrefilter:H(zn),ajaxTransport:H(qn),ajax:function(t,e){function n(t,e,n,i){var o,c,v,y,x,C=e;2!==b&&(b=2,a&&clearTimeout(a),h=void 0,r=i||"",w.readyState=t>0?4:0,o=t>=200&&300>t||304===t,n&&(y=B(u,w,n)),y=z(u,y,w,o),o?(u.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(oe.lastModified[s]=x),x=w.getResponseHeader("etag"),x&&(oe.etag[s]=x)),204===t||"HEAD"===u.type?C="nocontent":304===t?C="notmodified":(C=y.state,c=y.data,v=y.error,o=!v)):(v=C,(t||!C)&&(C="error",0>t&&(t=0))),w.status=t,w.statusText=(e||C)+"",o?f.resolveWith(d,[c,C,w]):f.rejectWith(d,[w,C,v]),w.statusCode(m),m=void 0,l&&p.trigger(o?"ajaxSuccess":"ajaxError",[w,u,o?c:v]),g.fireWith(d,[w,C]),l&&(p.trigger("ajaxComplete",[w,u]),--oe.active||oe.event.trigger("ajaxStop")))}"object"==typeof t&&(e=t,t=void 0),e=e||{};var i,o,s,r,a,l,h,c,u=oe.ajaxSetup({},e),d=u.context||u,p=u.context&&(d.nodeType||d.jquery)?oe(d):oe.event,f=oe.Deferred(),g=oe.Callbacks("once memory"),m=u.statusCode||{},v={},y={},b=0,x="canceled",w={readyState:0,getResponseHeader:function(t){var e;if(2===b){if(!c)for(c={};e=jn.exec(r);)c[e[1].toLowerCase()]=e[2];e=c[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===b?r:null},setRequestHeader:function(t,e){var n=t.toLowerCase();return b||(t=y[n]=y[n]||t,v[t]=e),this},overrideMimeType:function(t){return b||(u.mimeType=t),this},statusCode:function(t){var e;if(t)if(2>b)for(e in t)m[e]=[m[e],t[e]];else w.always(t[w.status]);return this},abort:function(t){var e=t||x;return h&&h.abort(e),n(0,e),this}};if(f.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,u.url=((t||u.url||In)+"").replace(On,"").replace(_n,$n[1]+"//"),u.type=e.method||e.type||u.method||u.type,u.dataTypes=oe.trim(u.dataType||"*").toLowerCase().match(be)||[""],null==u.crossDomain&&(i=Bn.exec(u.url.toLowerCase()),u.crossDomain=!(!i||i[1]===$n[1]&&i[2]===$n[2]&&(i[3]||("http:"===i[1]?"80":"443"))===($n[3]||("http:"===$n[1]?"80":"443")))),u.data&&u.processData&&"string"!=typeof u.data&&(u.data=oe.param(u.data,u.traditional)),W(zn,u,e,w),2===b)return w;l=oe.event&&u.global,l&&0===oe.active++&&oe.event.trigger("ajaxStart"),u.type=u.type.toUpperCase(),u.hasContent=!Wn.test(u.type),s=u.url,u.hasContent||(u.data&&(s=u.url+=(Rn.test(s)?"&":"?")+u.data,delete u.data),u.cache===!1&&(u.url=Mn.test(s)?s.replace(Mn,"$1_="+Dn++):s+(Rn.test(s)?"&":"?")+"_="+Dn++)),u.ifModified&&(oe.lastModified[s]&&w.setRequestHeader("If-Modified-Since",oe.lastModified[s]),oe.etag[s]&&w.setRequestHeader("If-None-Match",oe.etag[s])),(u.data&&u.hasContent&&u.contentType!==!1||e.contentType)&&w.setRequestHeader("Content-Type",u.contentType),w.setRequestHeader("Accept",u.dataTypes[0]&&u.accepts[u.dataTypes[0]]?u.accepts[u.dataTypes[0]]+("*"!==u.dataTypes[0]?", "+Xn+"; q=0.01":""):u.accepts["*"]);for(o in u.headers)w.setRequestHeader(o,u.headers[o]);if(u.beforeSend&&(u.beforeSend.call(d,w,u)===!1||2===b))return w.abort();x="abort";for(o in{success:1,error:1,complete:1})w[o](u[o]);if(h=W(qn,u,e,w)){w.readyState=1,l&&p.trigger("ajaxSend",[w,u]),u.async&&u.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},u.timeout));try{b=1,h.send(v,n)}catch(C){if(!(2>b))throw C;n(-1,C)}}else n(-1,"No Transport");return w},getJSON:function(t,e,n){return oe.get(t,e,n,"json")},getScript:function(t,e){return oe.get(t,void 0,e,"script")}}),oe.each(["get","post"],function(t,e){oe[e]=function(t,n,i,o){return oe.isFunction(n)&&(o=o||i,i=n,n=void 0),oe.ajax({url:t,type:e,dataType:o,data:n,success:i})}}),oe._evalUrl=function(t){return oe.ajax({url:t,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},oe.fn.extend({wrapAll:function(t){if(oe.isFunction(t))return this.each(function(e){oe(this).wrapAll(t.call(this,e))});if(this[0]){var e=oe(t,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstChild&&1===t.firstChild.nodeType;)t=t.firstChild;return t}).append(this)}return this},wrapInner:function(t){return this.each(oe.isFunction(t)?function(e){oe(this).wrapInner(t.call(this,e))}:function(){var e=oe(this),n=e.contents();n.length?n.wrapAll(t):e.append(t)})},wrap:function(t){var e=oe.isFunction(t);return this.each(function(n){oe(this).wrapAll(e?t.call(this,n):t)})},unwrap:function(){return this.parent().each(function(){oe.nodeName(this,"body")||oe(this).replaceWith(this.childNodes)}).end()}}),oe.expr.filters.hidden=function(t){return t.offsetWidth<=0&&t.offsetHeight<=0||!ne.reliableHiddenOffsets()&&"none"===(t.style&&t.style.display||oe.css(t,"display"))},oe.expr.filters.visible=function(t){return!oe.expr.filters.hidden(t)};var Un=/%20/g,Yn=/\[\]$/,Qn=/\r?\n/g,Gn=/^(?:submit|button|image|reset|file)$/i,Jn=/^(?:input|select|textarea|keygen)/i;oe.param=function(t,e){var n,i=[],o=function(t,e){e=oe.isFunction(e)?e():null==e?"":e,i[i.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=oe.ajaxSettings&&oe.ajaxSettings.traditional),oe.isArray(t)||t.jquery&&!oe.isPlainObject(t))oe.each(t,function(){o(this.name,this.value)});else for(n in t)q(n,t[n],e,o);return i.join("&").replace(Un,"+")},oe.fn.extend({serialize:function(){return oe.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=oe.prop(this,"elements");return t?oe.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!oe(this).is(":disabled")&&Jn.test(this.nodeName)&&!Gn.test(t)&&(this.checked||!Ne.test(t))}).map(function(t,e){var n=oe(this).val();return null==n?null:oe.isArray(n)?oe.map(n,function(t){return{name:e.name,value:t.replace(Qn,"\r\n")}}):{name:e.name,value:n.replace(Qn,"\r\n")}}).get()}}),oe.ajaxSettings.xhr=void 0!==t.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&X()||V()}:X;var Zn=0,Kn={},ti=oe.ajaxSettings.xhr();t.attachEvent&&t.attachEvent("onunload",function(){for(var t in Kn)Kn[t](void 0,!0)}),ne.cors=!!ti&&"withCredentials"in ti,ti=ne.ajax=!!ti,ti&&oe.ajaxTransport(function(t){if(!t.crossDomain||ne.cors){var e;return{send:function(n,i){var o,s=t.xhr(),r=++Zn;if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(o in t.xhrFields)s[o]=t.xhrFields[o];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(o in n)void 0!==n[o]&&s.setRequestHeader(o,n[o]+"");s.send(t.hasContent&&t.data||null),e=function(n,o){var a,l,h;if(e&&(o||4===s.readyState))if(delete Kn[r],e=void 0,s.onreadystatechange=oe.noop,o)4!==s.readyState&&s.abort();else{h={},a=s.status,"string"==typeof s.responseText&&(h.text=s.responseText);try{l=s.statusText}catch(c){l=""}a||!t.isLocal||t.crossDomain?1223===a&&(a=204):a=h.text?200:404}h&&i(a,l,h,s.getAllResponseHeaders())},t.async?4===s.readyState?setTimeout(e):s.onreadystatechange=Kn[r]=e:e()},abort:function(){e&&e(void 0,!0)}}}}),oe.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(t){return oe.globalEval(t),t}}}),oe.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET",t.global=!1)}),oe.ajaxTransport("script",function(t){if(t.crossDomain){var e,n=fe.head||oe("head")[0]||fe.documentElement;return{send:function(i,o){e=fe.createElement("script"),e.async=!0,t.scriptCharset&&(e.charset=t.scriptCharset),e.src=t.url,e.onload=e.onreadystatechange=function(t,n){(n||!e.readyState||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),e=null,n||o(200,"success"))},n.insertBefore(e,n.firstChild)},abort:function(){e&&e.onload(void 0,!0)}}}});var ei=[],ni=/(=)\?(?=&|$)|\?\?/;oe.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=ei.pop()||oe.expando+"_"+Dn++;return this[t]=!0,t}}),oe.ajaxPrefilter("json jsonp",function(e,n,i){var o,s,r,a=e.jsonp!==!1&&(ni.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&ni.test(e.data)&&"data");return a||"jsonp"===e.dataTypes[0]?(o=e.jsonpCallback=oe.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(ni,"$1"+o):e.jsonp!==!1&&(e.url+=(Rn.test(e.url)?"&":"?")+e.jsonp+"="+o),e.converters["script json"]=function(){return r||oe.error(o+" was not called"),r[0]},e.dataTypes[0]="json",s=t[o],t[o]=function(){r=arguments},i.always(function(){t[o]=s,e[o]&&(e.jsonpCallback=n.jsonpCallback,ei.push(o)),r&&oe.isFunction(s)&&s(r[0]),r=s=void 0}),"script"):void 0}),oe.parseHTML=function(t,e,n){if(!t||"string"!=typeof t)return null;"boolean"==typeof e&&(n=e,e=!1),e=e||fe;var i=ue.exec(t),o=!n&&[];return i?[e.createElement(i[1])]:(i=oe.buildFragment([t],e,o),o&&o.length&&oe(o).remove(),oe.merge([],i.childNodes))};var ii=oe.fn.load;oe.fn.load=function(t,e,n){if("string"!=typeof t&&ii)return ii.apply(this,arguments);var i,o,s,r=this,a=t.indexOf(" ");return a>=0&&(i=oe.trim(t.slice(a,t.length)),t=t.slice(0,a)),oe.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(s="POST"),r.length>0&&oe.ajax({url:t,type:s,dataType:"html",data:e}).done(function(t){o=arguments,r.html(i?oe("<div>").append(oe.parseHTML(t)).find(i):t)}).complete(n&&function(t,e){r.each(n,o||[t.responseText,e,t])}),this},oe.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){oe.fn[e]=function(t){return this.on(e,t)}}),oe.expr.filters.animated=function(t){return oe.grep(oe.timers,function(e){return t===e.elem}).length};var oi=t.document.documentElement;oe.offset={setOffset:function(t,e,n){var i,o,s,r,a,l,h,c=oe.css(t,"position"),u=oe(t),d={};"static"===c&&(t.style.position="relative"),a=u.offset(),s=oe.css(t,"top"),l=oe.css(t,"left"),h=("absolute"===c||"fixed"===c)&&oe.inArray("auto",[s,l])>-1,h?(i=u.position(),r=i.top,o=i.left):(r=parseFloat(s)||0,o=parseFloat(l)||0),oe.isFunction(e)&&(e=e.call(t,n,a)),null!=e.top&&(d.top=e.top-a.top+r),null!=e.left&&(d.left=e.left-a.left+o),"using"in e?e.using.call(t,d):u.css(d)}},oe.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){oe.offset.setOffset(this,t,e)});var e,n,i={top:0,left:0},o=this[0],s=o&&o.ownerDocument;if(s)return e=s.documentElement,oe.contains(e,o)?(typeof o.getBoundingClientRect!==Se&&(i=o.getBoundingClientRect()),n=U(s),{top:i.top+(n.pageYOffset||e.scrollTop)-(e.clientTop||0),left:i.left+(n.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}):i},position:function(){if(this[0]){var t,e,n={top:0,left:0},i=this[0];return"fixed"===oe.css(i,"position")?e=i.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),oe.nodeName(t[0],"html")||(n=t.offset()),n.top+=oe.css(t[0],"borderTopWidth",!0),n.left+=oe.css(t[0],"borderLeftWidth",!0)),{top:e.top-n.top-oe.css(i,"marginTop",!0),left:e.left-n.left-oe.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||oi;t&&!oe.nodeName(t,"html")&&"static"===oe.css(t,"position");)t=t.offsetParent;return t||oi})}}),oe.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var n=/Y/.test(e);oe.fn[t]=function(i){return Pe(this,function(t,i,o){var s=U(t);return void 0===o?s?e in s?s[e]:s.document.documentElement[i]:t[i]:void(s?s.scrollTo(n?oe(s).scrollLeft():o,n?o:oe(s).scrollTop()):t[i]=o)},t,i,arguments.length,null)}}),oe.each(["top","left"],function(t,e){oe.cssHooks[e]=E(ne.pixelPosition,function(t,n){return n?(n=en(t,e),on.test(n)?oe(t).position()[e]+"px":n):void 0})}),oe.each({Height:"height",Width:"width"},function(t,e){oe.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,i){oe.fn[i]=function(i,o){var s=arguments.length&&(n||"boolean"!=typeof i),r=n||(i===!0||o===!0?"margin":"border");return Pe(this,function(e,n,i){var o;return oe.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(o=e.documentElement,Math.max(e.body["scroll"+t],o["scroll"+t],e.body["offset"+t],o["offset"+t],o["client"+t])):void 0===i?oe.css(e,n,r):oe.style(e,n,i,r)},e,s?i:void 0,s,null)}})}),oe.fn.size=function(){return this.length},oe.fn.andSelf=oe.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return oe});var si=t.jQuery,ri=t.$;return oe.noConflict=function(e){return t.$===oe&&(t.$=ri),e&&t.jQuery===oe&&(t.jQuery=si),oe},typeof e===Se&&(t.jQuery=t.$=oe),oe}),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}t.fn.emulateTransitionEnd=function(e){var n=!1,i=this;t(this).one("bsTransitionEnd",function(){n=!0});var o=function(){n||t(i).trigger(t.support.transition.end)};return setTimeout(o,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),o=n.data("bs.alert");o||n.data("bs.alert",o=new i(this)),"string"==typeof e&&o[e].call(n)})}var n='[data-dismiss="alert"]',i=function(e){t(e).on("click",n,this.close)};i.VERSION="3.3.4",i.TRANSITION_DURATION=150,i.prototype.close=function(e){function n(){r.detach().trigger("closed.bs.alert").remove()}var o=t(this),s=o.attr("data-target");s||(s=o.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var r=t(s);e&&e.preventDefault(),r.length||(r=o.closest(".alert")),r.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(r.removeClass("in"),t.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",n).emulateTransitionEnd(i.TRANSITION_DURATION):n())};var o=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=o,this},t(document).on("click.bs.alert.data-api",n,i.prototype.close)}(jQuery),/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.button"),s="object"==typeof e&&e;o||i.data("bs.button",o=new n(this,s)),"toggle"==e?o.toggle():e&&o.setState(e)})}var n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.isLoading=!1};n.VERSION="3.3.4",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(e){var n="disabled",i=this.$element,o=i.is("input")?"val":"html",s=i.data();e+="Text",null==s.resetText&&i.data("resetText",i[o]()),setTimeout(t.proxy(function(){i[o](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,i.addClass(n).attr(n,n)):this.isLoading&&(this.isLoading=!1,i.removeClass(n).removeAttr(n))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var n=this.$element.find("input");"radio"==n.prop("type")&&(n.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&n.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));t&&this.$element.toggleClass("active")};var i=t.fn.button;t.fn.button=e,t.fn.button.Constructor=n,t.fn.button.noConflict=function(){return t.fn.button=i,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(n){var i=t(n.target);i.hasClass("btn")||(i=i.closest(".btn")),e.call(i,"toggle"),n.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.carousel"),s=t.extend({},n.DEFAULTS,i.data(),"object"==typeof e&&e),r="string"==typeof e?e:s.slide;o||i.data("bs.carousel",o=new n(this,s)),"number"==typeof e?o.to(e):r?o[r]():s.interval&&o.pause().cycle()})}var n=function(e,n){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};n.VERSION="3.3.4",n.TRANSITION_DURATION=600,n.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},n.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},n.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},n.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},n.prototype.getItemForDirection=function(t,e){var n=this.getItemIndex(e),i="prev"==t&&0===n||"next"==t&&n==this.$items.length-1;if(i&&!this.options.wrap)return e;var o="prev"==t?-1:1,s=(n+o)%this.$items.length;return this.$items.eq(s)},n.prototype.to=function(t){var e=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",this.$items.eq(t))},n.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){return this.sliding?void 0:this.slide("next")},n.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},n.prototype.slide=function(e,i){var o=this.$element.find(".item.active"),s=i||this.getItemForDirection(e,o),r=this.interval,a="next"==e?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],c=t.Event("slide.bs.carousel",{relatedTarget:h,direction:a});if(this.$element.trigger(c),!c.isDefaultPrevented()){if(this.sliding=!0,r&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var u=t(this.$indicators.children()[this.getItemIndex(s)]);u&&u.addClass("active")}var d=t.Event("slid.bs.carousel",{relatedTarget:h,direction:a});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,o.addClass(a),s.addClass(a),o.one("bsTransitionEnd",function(){s.removeClass([e,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(d)},0)}).emulateTransitionEnd(n.TRANSITION_DURATION)):(o.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(d)),r&&this.cycle(),this}};var i=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=n,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this};var o=function(n){var i,o=t(this),s=t(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""));if(s.hasClass("carousel")){var r=t.extend({},s.data(),o.data()),a=o.attr("data-slide-to");a&&(r.interval=!1),e.call(s,r),a&&s.data("bs.carousel").to(a),n.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var n=t(this);e.call(n,n.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){var n,i=e.attr("data-target")||(n=e.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return t(i)}function n(e){return this.each(function(){var n=t(this),o=n.data("bs.collapse"),s=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);!o&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),o||n.data("bs.collapse",o=new i(this,s)),"string"==typeof e&&o[e]()})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};i.VERSION="3.3.4",i.TRANSITION_DURATION=350,i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,o=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(o&&o.length&&(e=o.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){o&&o.length&&(n.call(o,"hide"),e||o.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(i.TRANSITION_DURATION)[r](this.$element[0][l])}}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[n](0).one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(i.TRANSITION_DURATION):o.call(this)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},i.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(n,i){var o=t(i);this.addAriaAndCollapsedClass(e(o),o)},this)).end()},i.prototype.addAriaAndCollapsedClass=function(t,e){var n=t.hasClass("in");t.attr("aria-expanded",n),e.toggleClass("collapsed",!n).attr("aria-expanded",n)};var o=t.fn.collapse;t.fn.collapse=n,t.fn.collapse.Constructor=i,t.fn.collapse.noConflict=function(){return t.fn.collapse=o,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var o=t(this);o.attr("data-target")||i.preventDefault();var s=e(o),r=s.data("bs.collapse"),a=r?"toggle":o.data();n.call(s,a)})}(jQuery),/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){e&&3===e.which||(t(o).remove(),t(s).each(function(){var i=t(this),o=n(i),s={relatedTarget:this};o.hasClass("open")&&(o.trigger(e=t.Event("hide.bs.dropdown",s)),e.isDefaultPrevented()||(i.attr("aria-expanded","false"),o.removeClass("open").trigger("hidden.bs.dropdown",s)))}))}function n(e){var n=e.attr("data-target");n||(n=e.attr("href"),n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));var i=n&&t(n);return i&&i.length?i:e.parent()}function i(e){return this.each(function(){var n=t(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new r(this)),"string"==typeof e&&i[e].call(n)})}var o=".dropdown-backdrop",s='[data-toggle="dropdown"]',r=function(e){t(e).on("click.bs.dropdown",this.toggle)};r.VERSION="3.3.4",r.prototype.toggle=function(i){var o=t(this);if(!o.is(".disabled, :disabled")){var s=n(o),r=s.hasClass("open");if(e(),!r){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);var a={relatedTarget:this};if(s.trigger(i=t.Event("show.bs.dropdown",a)),i.isDefaultPrevented())return;o.trigger("focus").attr("aria-expanded","true"),s.toggleClass("open").trigger("shown.bs.dropdown",a)}return!1}},r.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var i=t(this);if(e.preventDefault(),e.stopPropagation(),!i.is(".disabled, :disabled")){var o=n(i),r=o.hasClass("open");if(!r&&27!=e.which||r&&27==e.which)return 27==e.which&&o.find(s).trigger("focus"),i.trigger("click");var a=" li:not(.disabled):visible a",l=o.find('[role="menu"]'+a+', [role="listbox"]'+a);if(l.length){var h=l.index(e.target);38==e.which&&h>0&&h--,40==e.which&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var a=t.fn.dropdown;t.fn.dropdown=i,t.fn.dropdown.Constructor=r,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,r.prototype.toggle).on("keydown.bs.dropdown.data-api",s,r.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',r.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',r.prototype.keydown)}(jQuery),/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e,i){return this.each(function(){var o=t(this),s=o.data("bs.modal"),r=t.extend({},n.DEFAULTS,o.data(),"object"==typeof e&&e);s||o.data("bs.modal",s=new n(this,r)),"string"==typeof e?s[e](i):r.show&&s.show(i)})}var n=function(e,n){this.options=n,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};n.VERSION="3.3.4",n.TRANSITION_DURATION=300,n.BACKDROP_TRANSITION_DURATION=150,n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},n.prototype.show=function(e){var i=this,o=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var o=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),o&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});o?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(n.TRANSITION_DURATION):i.$element.trigger("focus").trigger(s)}))},n.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(n.TRANSITION_DURATION):this.hideModal())},n.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},n.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},n.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},n.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},n.prototype.backdrop=function(e){var i=this,o=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&o;if(this.$backdrop=t('<div class="modal-backdrop '+o+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},n.prototype.handleUpdate=function(){this.adjustDialog()},n.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},n.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},n.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},n.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},n.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var i=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=n,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(n){var i=t(this),o=i.attr("href"),s=t(i.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,"")),r=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},s.data(),i.data());i.is("a")&&n.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),e.call(s,r,this)})}(jQuery),/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.tooltip"),s="object"==typeof e&&e;(o||!/destroy|hide/.test(e))&&(o||i.data("bs.tooltip",o=new n(this,s)),"string"==typeof e&&o[e]())})}var n=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",t,e)};n.VERSION="3.3.4",n.TRANSITION_DURATION=150,n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},n.prototype.init=function(e,n,i){if(this.enabled=!0,this.type=e,this.$element=t(n),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),s=o.length;s--;){var r=o[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},n.prototype.getDelegateOptions=function(){var e={},n=this.getDefaults();return this._options&&t.each(this._options,function(t,i){n[t]!=i&&(e[t]=i)}),e},n.prototype.enter=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return n&&n.$tip&&n.$tip.is(":visible")?void(n.hoverState="in"):(n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show())},n.prototype.leave=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()},n.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var o=this,s=this.tip(),r=this.getUID(this.type);this.setContent(),s.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var c=this.getPosition(),u=s[0].offsetWidth,d=s[0].offsetHeight;if(h){var p=a,f=this.options.container?t(this.options.container):this.$element.parent(),g=this.getPosition(f);a="bottom"==a&&c.bottom+d>g.bottom?"top":"top"==a&&c.top-d<g.top?"bottom":"right"==a&&c.right+u>g.width?"left":"left"==a&&c.left-u<g.left?"right":a,s.removeClass(p).addClass(a)}var m=this.getCalculatedOffset(a,c,u,d);this.applyPlacement(m,a);var v=function(){var t=o.hoverState;o.$element.trigger("shown.bs."+o.type),o.hoverState=null,"out"==t&&o.leave(o)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(n.TRANSITION_DURATION):v()}},n.prototype.applyPlacement=function(e,n){var i=this.tip(),o=i[0].offsetWidth,s=i[0].offsetHeight,r=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top=e.top+r,e.left=e.left+a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var l=i[0].offsetWidth,h=i[0].offsetHeight;"top"==n&&h!=s&&(e.top=e.top+s-h);var c=this.getViewportAdjustedDelta(n,e,l,h);c.left?e.left+=c.left:e.top+=c.top;var u=/top|bottom/.test(n),d=u?2*c.left-o+l:2*c.top-s+h,p=u?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(d,i[0][p],u)},n.prototype.replaceArrow=function(t,e,n){this.arrow().css(n?"left":"top",50*(1-t/e)+"%").css(n?"top":"left","")},n.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},n.prototype.hide=function(e){function i(){"in"!=o.hoverState&&s.detach(),o.$element.removeAttr("aria-describedby").trigger("hidden.bs."+o.type),e&&e()}var o=this,s=t(this.$tip),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(n.TRANSITION_DURATION):i(),this.hoverState=null,this)},n.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(e){e=e||this.$element;var n=e[0],i="BODY"==n.tagName,o=n.getBoundingClientRect();null==o.width&&(o=t.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var s=i?{top:0,left:0}:e.offset(),r={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},a=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},o,r,a,s)},n.prototype.getCalculatedOffset=function(t,e,n,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-n/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-n/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-n}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},n.prototype.getViewportAdjustedDelta=function(t,e,n,i){var o={top:0,left:0};if(!this.$viewport)return o;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+i;a<r.top?o.top=r.top-a:l>r.top+r.height&&(o.top=r.top+r.height-l)}else{var h=e.left-s,c=e.left+s+n;h<r.left?o.left=r.left-h:c>r.width&&(o.left=r.left+r.width-c)}return o},n.prototype.getTitle=function(){var t,e=this.$element,n=this.options;return t=e.attr("data-original-title")||("function"==typeof n.title?n.title.call(e[0]):n.title)},n.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},n.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(e){var n=this;e&&(n=t(e.currentTarget).data("bs."+this.type),n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n))),n.tip().hasClass("in")?n.leave(n):n.enter(n)},n.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var i=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=n,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=i,this}}(jQuery),/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.popover"),s="object"==typeof e&&e;(o||!/destroy|hide/.test(e))&&(o||i.data("bs.popover",o=new n(this,s)),"string"==typeof e&&o[e]())})}var n=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");n.VERSION="3.3.4",n.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),n.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),n.prototype.constructor=n,n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),n=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof n?"html":"append":"text"](n),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},n.prototype.hasContent=function(){return this.getTitle()||this.getContent()},n.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var i=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=n,t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(jQuery),/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(n,i){this.$body=t(document.body),this.$scrollElement=t(t(n).is(document.body)?window:n),this.options=t.extend({},e.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function n(n){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),s="object"==typeof n&&n;o||i.data("bs.scrollspy",o=new e(this,s)),"string"==typeof n&&o[n]()})}e.VERSION="3.3.4",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,n="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(n="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),o=e.data("target")||e.attr("href"),s=/^#./.test(o)&&t(o);return s&&s.length&&s.is(":visible")&&[[s[n]().top+i,o]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,n=this.getScrollHeight(),i=this.options.offset+n-this.$scrollElement.height(),o=this.offsets,s=this.targets,r=this.activeTarget;if(this.scrollHeight!=n&&this.refresh(),e>=i)return r!=(t=s[s.length-1])&&this.activate(t);if(r&&e<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)r!=s[t]&&e>=o[t]&&(void 0===o[t+1]||e<o[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',i=t(n).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=n,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);n.call(e,e.data())})})}(jQuery),/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.tab");o||i.data("bs.tab",o=new n(this)),"string"==typeof e&&o[e]()})}var n=function(e){this.element=t(e)};n.VERSION="3.3.4",n.TRANSITION_DURATION=150,n.prototype.show=function(){var e=this.element,n=e.closest("ul:not(.dropdown-menu)"),i=e.data("target");if(i||(i=e.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var o=n.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),r=t.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(s),e.trigger(r),!r.isDefaultPrevented()&&!s.isDefaultPrevented()){var a=t(i);this.activate(e.closest("li"),n),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},n.prototype.activate=function(e,i,o){function s(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),o&&o()}var r=i.find("> .active"),a=o&&t.support.transition&&(r.length&&r.hasClass("fade")||!!i.find("> .fade").length);r.length&&a?r.one("bsTransitionEnd",s).emulateTransitionEnd(n.TRANSITION_DURATION):s(),r.removeClass("in")};var i=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=n,t.fn.tab.noConflict=function(){return t.fn.tab=i,this};var o=function(n){n.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',o).on("click.bs.tab.data-api",'[data-toggle="pill"]',o)}(jQuery),/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.affix"),s="object"==typeof e&&e;o||i.data("bs.affix",o=new n(this,s)),"string"==typeof e&&o[e]()})}var n=function(e,i){this.options=t.extend({},n.DEFAULTS,i),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};n.VERSION="3.3.4",n.RESET="affix affix-top affix-bottom",n.DEFAULTS={offset:0,target:window},n.prototype.getState=function(t,e,n,i){var o=this.$target.scrollTop(),s=this.$element.offset(),r=this.$target.height();if(null!=n&&"top"==this.affixed)return n>o?"top":!1;if("bottom"==this.affixed)return null!=n?o+this.unpin<=s.top?!1:"bottom":t-i>=o+r?!1:"bottom";var a=null==this.affixed,l=a?o:s.top,h=a?r:e;return null!=n&&n>=o?"top":null!=i&&l+h>=t-i?"bottom":!1},n.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(n.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},n.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},n.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),i=this.options.offset,o=i.top,s=i.bottom,r=t(document.body).height();"object"!=typeof i&&(s=o=i),"function"==typeof o&&(o=i.top(this.$element)),"function"==typeof s&&(s=i.bottom(this.$element));var a=this.getState(r,e,o,s);if(this.affixed!=a){null!=this.unpin&&this.$element.css("top","");var l="affix"+(a?"-"+a:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=a,this.unpin="bottom"==a?this.getPinnedOffset():null,this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==a&&this.$element.offset({top:r-e-s})}};var i=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=n,t.fn.affix.noConflict=function(){return t.fn.affix=i,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var n=t(this),i=n.data();i.offset=i.offset||{},null!=i.offsetBottom&&(i.offset.bottom=i.offsetBottom),null!=i.offsetTop&&(i.offset.top=i.offsetTop),e.call(n,i)})})}(jQuery),function(t,e){t.rails!==e&&t.error("jquery-ujs has already been loaded!");var n,i=t(document);t.rails=n={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",buttonClickSelector:"button[data-remote]:not(form button), button[data-confirm]:not(form button)",inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form",formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",requiredInputSelector:"input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",fileInputSelector:"input[type=file]",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",CSRFProtection:function(e){var n=t('meta[name="csrf-token"]').attr("content");n&&e.setRequestHeader("X-CSRF-Token",n)},refreshCSRFTokens:function(){var e=t("meta[name=csrf-token]").attr("content"),n=t("meta[name=csrf-param]").attr("content");t('form input[name="'+n+'"]').val(e)},fire:function(e,n,i){var o=t.Event(n);return e.trigger(o,i),o.result!==!1},confirm:function(t){return confirm(t)},ajax:function(e){return t.ajax(e)},href:function(t){return t.attr("href")},handleRemote:function(i){var o,s,r,a,l,h,c,u;if(n.fire(i,"ajax:before")){if(a=i.data("cross-domain"),l=a===e?null:a,h=i.data("with-credentials")||null,c=i.data("type")||t.ajaxSettings&&t.ajaxSettings.dataType,i.is("form")){o=i.attr("method"),s=i.attr("action"),r=i.serializeArray();var d=i.data("ujs:submit-button");d&&(r.push(d),i.data("ujs:submit-button",null))}else i.is(n.inputChangeSelector)?(o=i.data("method"),s=i.data("url"),r=i.serialize(),i.data("params")&&(r=r+"&"+i.data("params"))):i.is(n.buttonClickSelector)?(o=i.data("method")||"get",s=i.data("url"),r=i.serialize(),i.data("params")&&(r=r+"&"+i.data("params"))):(o=i.data("method"),s=n.href(i),r=i.data("params")||null);return u={type:o||"GET",data:r,dataType:c,beforeSend:function(t,o){return o.dataType===e&&t.setRequestHeader("accept","*/*;q=0.5, "+o.accepts.script),n.fire(i,"ajax:beforeSend",[t,o])?void i.trigger("ajax:send",t):!1},success:function(t,e,n){i.trigger("ajax:success",[t,e,n])},complete:function(t,e){i.trigger("ajax:complete",[t,e])},error:function(t,e,n){i.trigger("ajax:error",[t,e,n])},crossDomain:l},h&&(u.xhrFields={withCredentials:h}),s&&(u.url=s),n.ajax(u)}return!1},handleMethod:function(i){var o=n.href(i),s=i.data("method"),r=i.attr("target"),a=t("meta[name=csrf-token]").attr("content"),l=t("meta[name=csrf-param]").attr("content"),h=t('<form method="post" action="'+o+'"></form>'),c='<input name="_method" value="'+s+'" type="hidden" />';l!==e&&a!==e&&(c+='<input name="'+l+'" value="'+a+'" type="hidden" />'),r&&h.attr("target",r),h.hide().append(c).appendTo("body"),h.submit()},formElements:function(e,n){return e.is("form")?t(e[0].elements).filter(n):e.find(n)},disableFormElements:function(e){n.formElements(e,n.disableSelector).each(function(){n.disableFormElement(t(this))})},disableFormElement:function(t){var n,i;n=t.is("button")?"html":"val",i=t.data("disable-with"),t.data("ujs:enable-with",t[n]()),i!==e&&t[n](i),t.prop("disabled",!0)},enableFormElements:function(e){n.formElements(e,n.enableSelector).each(function(){n.enableFormElement(t(this))})},enableFormElement:function(t){var e=t.is("button")?"html":"val";t.data("ujs:enable-with")&&t[e](t.data("ujs:enable-with")),t.prop("disabled",!1)},allowAction:function(t){var e,i=t.data("confirm"),o=!1;return i?(n.fire(t,"confirm")&&(o=n.confirm(i),e=n.fire(t,"confirm:complete",[o])),o&&e):!0},blankInputs:function(e,n,i){var o,s,r=t(),a=n||"input,textarea",l=e.find(a);return l.each(function(){if(o=t(this),s=o.is("input[type=checkbox],input[type=radio]")?o.is(":checked"):o.val(),!s==!i){if(o.is("input[type=radio]")&&l.filter('input[type=radio]:checked[name="'+o.attr("name")+'"]').length)return!0;r=r.add(o)}}),r.length?r:!1},nonBlankInputs:function(t,e){return n.blankInputs(t,e,!0)},stopEverything:function(e){return t(e.target).trigger("ujs:everythingStopped"),e.stopImmediatePropagation(),!1},disableElement:function(t){var i=t.data("disable-with");t.data("ujs:enable-with",t.html()),i!==e&&t.html(i),t.bind("click.railsDisable",function(t){return n.stopEverything(t)})},enableElement:function(t){t.data("ujs:enable-with")!==e&&(t.html(t.data("ujs:enable-with")),t.removeData("ujs:enable-with")),t.unbind("click.railsDisable")}},n.fire(i,"rails:attachBindings")&&(t.ajaxPrefilter(function(t,e,i){t.crossDomain||n.CSRFProtection(i)}),t(window).on("pageshow.rails",function(){t(t.rails.enableSelector).each(function(){var e=t(this);e.data("ujs:enable-with")&&t.rails.enableFormElement(e)}),t(t.rails.linkDisableSelector).each(function(){var e=t(this);e.data("ujs:enable-with")&&t.rails.enableElement(e)})}),i.delegate(n.linkDisableSelector,"ajax:complete",function(){n.enableElement(t(this))}),i.delegate(n.buttonDisableSelector,"ajax:complete",function(){n.enableFormElement(t(this))}),i.delegate(n.linkClickSelector,"click.rails",function(i){var o=t(this),s=o.data("method"),r=o.data("params"),a=i.metaKey||i.ctrlKey;if(!n.allowAction(o))return n.stopEverything(i);if(!a&&o.is(n.linkDisableSelector)&&n.disableElement(o),o.data("remote")!==e){if(a&&(!s||"GET"===s)&&!r)return!0;var l=n.handleRemote(o);return l===!1?n.enableElement(o):l.fail(function(){n.enableElement(o)}),!1}return s?(n.handleMethod(o),!1):void 0}),i.delegate(n.buttonClickSelector,"click.rails",function(e){var i=t(this);if(!n.allowAction(i))return n.stopEverything(e);i.is(n.buttonDisableSelector)&&n.disableFormElement(i);var o=n.handleRemote(i);return o===!1?n.enableFormElement(i):o.fail(function(){n.enableFormElement(i)}),!1}),i.delegate(n.inputChangeSelector,"change.rails",function(e){var i=t(this);return n.allowAction(i)?(n.handleRemote(i),!1):n.stopEverything(e)}),i.delegate(n.formSubmitSelector,"submit.rails",function(i){var o,s,r=t(this),a=r.data("remote")!==e;if(!n.allowAction(r))return n.stopEverything(i);if(r.attr("novalidate")==e&&(o=n.blankInputs(r,n.requiredInputSelector),o&&n.fire(r,"ajax:aborted:required",[o])))return n.stopEverything(i);if(a){if(s=n.nonBlankInputs(r,n.fileInputSelector)){setTimeout(function(){n.disableFormElements(r)},13);var l=n.fire(r,"ajax:aborted:file",[s]);return l||setTimeout(function(){n.enableFormElements(r)},13),l}return n.handleRemote(r),!1}setTimeout(function(){n.disableFormElements(r)},13)}),i.delegate(n.formInputClickSelector,"click.rails",function(e){var i=t(this);if(!n.allowAction(i))return n.stopEverything(e);var o=i.attr("name"),s=o?{name:o,value:i.val()}:null;i.closest("form").data("ujs:submit-button",s)}),i.delegate(n.formSubmitSelector,"ajax:send.rails",function(e){this==e.target&&n.disableFormElements(t(this))}),i.delegate(n.formSubmitSelector,"ajax:complete.rails",function(e){this==e.target&&n.enableFormElements(t(this))}),t(function(){n.refreshCSRFTokens()}))}(jQuery),function(){var t,e,n,i,o,s,r,a,l,h,c,u,d,p,f,g,m,v,y,b,x,w,C,S,T,k,E,A,L,P,N,D,R,F,$,I,O,M,j,H,W,_,B,z,q,X,V,U,Y,Q,G,J,Z,K,te,ee,ne=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},ie=function(t,e){function n(){this.constructor=t}for(var i in e)oe.call(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},oe={}.hasOwnProperty,se=[].slice,re=function(t,e){return function(){return t.apply(e,arguments)}};F={},d=10,J=!1,j=null,y=null,D=null,_=null,ee=null,i={BEFORE_CHANGE:"page:before-change",FETCH:"page:fetch",RECEIVE:"page:receive",CHANGE:"page:change",UPDATE:"page:update",LOAD:"page:load",RESTORE:"page:restore",BEFORE_UNLOAD:"page:before-unload",EXPIRE:"page:expire"},S=function(t){var e;return t=new n(t),V(),u(),null!=j&&j.start(),J&&(e=Z(t.absolute))?(T(e),k(t,null,!1)):k(t,Q)},Z=function(t){var e;return e=F[t],e&&!e.transitionCacheDisabled?e:void 0},x=function(t){return null==t&&(t=!0),J=t},b=function(t){return null==t&&(t=!0),h?t?null!=j?j:j=new s("html"):(null!=j&&j.uninstall(),j=null):void 0},k=function(t,e,n){return null==n&&(n=!0),K(i.FETCH,{url:t.absolute}),null!=ee&&ee.abort(),ee=new XMLHttpRequest,ee.open("GET",t.withoutHashForIE10compatibility(),!0),ee.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),ee.setRequestHeader("X-XHR-Referer",_),ee.onload=function(){var n;return K(i.RECEIVE,{url:t.absolute}),(n=M())?(B(t),z(),p.apply(null,C(n)),R(),"function"==typeof e&&e(),K(i.LOAD)):document.location.href=v()||t.absolute},j&&n&&(ee.onprogress=function(){return function(t){var e;return e=t.lengthComputable?t.loaded/t.total*100:j.value+(100-j.value)/10,j.advanceTo(e)}}(this)),ee.onloadend=function(){return ee=null},ee.onerror=function(){return document.location.href=t.absolute},ee.send()},T=function(t){return null!=ee&&ee.abort(),p(t.title,t.body),H(t),K(i.RESTORE)},u=function(){var t;return t=new n(y.url),F[t.absolute]={url:t.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},g(d)},I=function(t){return null==t&&(t=d),/^[\d]+$/.test(t)?d=parseInt(t):void 0},g=function(t){var e,n,o,s,r,a;for(r=Object.keys(F),e=r.map(function(t){return F[t].cachedAt}).sort(function(t,e){return e-t}),a=[],n=0,s=r.length;s>n;n++)o=r[n],F[o].cachedAt<=e[t]&&(K(i.EXPIRE,F[o]),a.push(delete F[o]));return a},p=function(e,n,o,s){return K(i.BEFORE_UNLOAD),document.title=e,document.documentElement.replaceChild(n,document.body),null!=o&&t.update(o),G(),s&&w(),y=window.history.state,null!=j&&j.done(),K(i.CHANGE),K(i.UPDATE)},w=function(){var t,e,n,i,o,s,r,a,l,h,c,u;for(u=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),n=0,o=u.length;o>n;n++)if(c=u[n],""===(l=c.type)||"text/javascript"===l){for(e=document.createElement("script"),h=c.attributes,i=0,s=h.length;s>i;i++)t=h[i],e.setAttribute(t.name,t.value);c.hasAttribute("async")||(e.async=!1),e.appendChild(document.createTextNode(c.innerHTML)),a=c.parentNode,r=c.nextSibling,a.removeChild(c),a.insertBefore(e,r)}},U=function(t){return t.innerHTML=t.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),t},G=function(){var t,e;return t=(e=document.querySelectorAll("input[autofocus], textarea[autofocus]"))[e.length-1],t&&document.activeElement!==t?t.focus():void 0},B=function(t){return(t=new n(t)).absolute!==_?window.history.pushState({turbolinks:!0,url:t.absolute},"",t.absolute):void 0},z=function(){var t,e;return(t=ee.getResponseHeader("X-XHR-Redirected-To"))?(t=new n(t),e=t.hasNoHash()?document.location.hash:"",window.history.replaceState(window.history.state,"",t.href+e)):void 0},v=function(){var t;return null!=(t=ee.getResponseHeader("Location"))&&new n(t).crossOrigin()?t:void 0},V=function(){return _=document.location.href},X=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},q=function(){return y=window.history.state},R=function(){var t;return navigator.userAgent.match(/Firefox/)&&!(t=new n).hasNoHash()?(window.history.replaceState(y,"",t.withoutHash()),document.location.hash=t.hash):void 0},H=function(t){return window.scrollTo(t.positionX,t.positionY)},Q=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},f=function(t){var e,n,i;if(null==t||"object"!=typeof t)return t;e=new t.constructor;for(n in t)i=t[n],e[n]=f(i);return e},O=function(t){var e,n;return n=(null!=(e=document.cookie.match(new RegExp(t+"=(\\w+)")))?e[1].toUpperCase():void 0)||"",document.cookie=t+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",n},K=function(t,e){var n;return"undefined"!=typeof Prototype&&Event.fire(document,t,e,!0),n=document.createEvent("Events"),e&&(n.data=e),n.initEvent(t,!0,!0),document.dispatchEvent(n)},$=function(t){return!K(i.BEFORE_CHANGE,{url:t})},M=function(){var t,e,n,i,o,s;return e=function(){var t;return 400<=(t=ee.status)&&600>t},s=function(){var t;return null!=(t=ee.getResponseHeader("Content-Type"))&&t.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},i=function(t){var e,n,i,o,s;for(o=t.querySelector("head").childNodes,s=[],e=0,n=o.length;n>e;e++)i=o[e],null!=("function"==typeof i.getAttribute?i.getAttribute("data-turbolinks-track"):void 0)&&s.push(i.getAttribute("src")||i.getAttribute("href"));return s},t=function(t){var e;return D||(D=i(document)),e=i(t),e.length!==D.length||o(e,D).length!==D.length},o=function(t,e){var n,i,o,s,r;for(t.length>e.length&&(o=[e,t],t=o[0],e=o[1]),s=[],n=0,i=t.length;i>n;n++)r=t[n],ne.call(e,r)>=0&&s.push(r);return s},!e()&&s()&&(n=m(ee.responseText),n&&!t(n))?n:void 0},C=function(e){var n;return n=e.querySelector("title"),[null!=n?n.textContent:void 0,U(e.querySelector("body")),t.get(e).token,"runScripts"]},t={get:function(t){var e;return null==t&&(t=document),{node:e=t.querySelector('meta[name="csrf-token"]'),token:null!=e&&"function"==typeof e.getAttribute?e.getAttribute("content"):void 0}},update:function(t){var e;return e=this.get(),null!=e.token&&null!=t&&e.token!==t?e.node.setAttribute("content",t):void 0}},m=function(t){var e;return e=document.documentElement.cloneNode(),e.innerHTML=t,e.head=e.querySelector("head"),e.body=e.querySelector("body"),e},n=function(){function t(e){return this.original=null!=e?e:document.location.href,this.original.constructor===t?this.original:void this._parse()}return t.prototype.withoutHash=function(){return this.href.replace(this.hash,"").replace("#","")},t.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},t.prototype.hasNoHash=function(){return 0===this.hash.length},t.prototype.crossOrigin=function(){return this.origin!==(new t).origin},t.prototype._parse=function(){var t;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,t=this.link,this.href=t.href,this.protocol=t.protocol,this.host=t.host,this.hostname=t.hostname,this.port=t.port,this.pathname=t.pathname,this.search=t.search,this.hash=t.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},t}(),o=function(t){function e(t){return this.link=t,this.link.constructor===e?this.link:(this.original=this.link.href,this.originalElement=this.link,this.link=this.link.cloneNode(!1),void e.__super__.constructor.apply(this,arguments))}return ie(e,t),e.HTML_EXTENSIONS=["html"],e.allowExtensions=function(){var t,n,i,o;for(n=1<=arguments.length?se.call(arguments,0):[],i=0,o=n.length;o>i;i++)t=n[i],e.HTML_EXTENSIONS.push(t);return e.HTML_EXTENSIONS},e.prototype.shouldIgnore=function(){return this.crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},e.prototype._anchored=function(){return(this.hash.length>0||"#"===this.href.charAt(this.href.length-1))&&this.withoutHash()===(new n).withoutHash()},e.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+e.HTML_EXTENSIONS.join("|")+")?$","g"))},e.prototype._optOut=function(){var t,e;for(e=this.originalElement;!t&&e!==document;)t=null!=e.getAttribute("data-no-turbolink"),e=e.parentNode;return t},e.prototype._target=function(){return 0!==this.link.target.length},e}(n),e=function(){function t(t){this.event=t,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&($(this.link.absolute)||te(this.link.href),this.event.preventDefault()))}return t.installHandlerLast=function(e){return e.defaultPrevented?void 0:(document.removeEventListener("click",t.handle,!1),document.addEventListener("click",t.handle,!1))},t.handle=function(e){return new t(e)},t.prototype._extractLink=function(){var t;for(t=this.event.target;t.parentNode&&"A"!==t.nodeName;)t=t.parentNode;return"A"===t.nodeName&&0!==t.href.length?this.link=new o(t):void 0},t.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},t.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},t}(),s=function(){function t(t){this.elementSelector=t,this._trickle=re(this._trickle,this),this.value=0,this.content="",this.speed=300,this.opacity=.99,this.install()}var e;return e="turbolinks-progress-bar",t.prototype.install=function(){return this.element=document.querySelector(this.elementSelector),this.element.classList.add(e),this.styleElement=document.createElement("style"),document.head.appendChild(this.styleElement),this._updateStyle()},t.prototype.uninstall=function(){return this.element.classList.remove(e),document.head.removeChild(this.styleElement)},t.prototype.start=function(){return this.advanceTo(5)},t.prototype.advanceTo=function(t){var e;if(t>(e=this.value)&&100>=e){if(this.value=t,this._updateStyle(),100===this.value)return this._stopTrickle();if(this.value>0)return this._startTrickle()}},t.prototype.done=function(){return this.value>0?(this.advanceTo(100),this._reset()):void 0},t.prototype._reset=function(){var t;return t=this.opacity,setTimeout(function(t){return function(){return t.opacity=0,t._updateStyle()}}(this),this.speed/2),setTimeout(function(e){return function(){return e.value=0,e.opacity=t,e._withSpeed(0,function(){return e._updateStyle(!0)})}}(this),this.speed)},t.prototype._startTrickle=function(){return this.trickling?void 0:(this.trickling=!0,setTimeout(this._trickle,this.speed))},t.prototype._stopTrickle=function(){return delete this.trickling},t.prototype._trickle=function(){return this.trickling?(this.advanceTo(this.value+Math.random()/2),setTimeout(this._trickle,this.speed)):void 0},t.prototype._withSpeed=function(t,e){var n,i;return n=this.speed,this.speed=t,i=e(),this.speed=n,i},t.prototype._updateStyle=function(t){return null==t&&(t=!1),t&&this._changeContentToForceRepaint(),this.styleElement.textContent=this._createCSSRule()},t.prototype._changeContentToForceRepaint=function(){return this.content=""===this.content?" ":""},t.prototype._createCSSRule=function(){return this.elementSelector+"."+e+"::before {\n  content: '"+this.content+"';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: "+this.opacity+";\n  width: "+this.value+"%;\n  transition: width "+this.speed+"ms ease-out, opacity "+this.speed/2+"ms ease-in;\n  transform: translate3d(0,0,0);\n}"},t}(),c=function(t){return setTimeout(t,500)},L=function(){return document.addEventListener("DOMContentLoaded",function(){return K(i.CHANGE),K(i.UPDATE)},!0)},N=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(t,e){return jQuery.trim(e.responseText)?K(i.UPDATE):void 0}):void 0},P=function(t){var e,i;return(null!=(i=t.state)?i.turbolinks:void 0)?(e=F[new n(t.state.url).absolute])?(u(),T(e)):te(t.target.location.href):void 0},A=function(){return X(),q(),document.addEventListener("click",e.installHandlerLast,!0),window.addEventListener("hashchange",function(){return X(),q()},!1),c(function(){return window.addEventListener("popstate",P,!1)})},E=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),l=window.history&&window.history.pushState&&window.history.replaceState&&E,r=!navigator.userAgent.match(/CriOS\//),Y="GET"===(W=O("request_method"))||""===W,h=l&&r&&Y,a=document.addEventListener&&document.createEvent,a&&(L(),N()),h?(te=S,A()):te=function(t){return document.location.href=t},this.Turbolinks={visit:te,pagesCached:I,enableTransitionCache:x,enableProgressBar:b,allowLinkExtensions:o.allowExtensions,supported:h,EVENTS:f(i)}}.call(this),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart,n=function(t){this.canvas=t.canvas,this.ctx=t;var e=function(t,e){return t["offset"+e]?t["offset"+e]:document.defaultView.getComputedStyle(t).getPropertyValue(e)},n=this.width=e(t.canvas,"Width"),o=this.height=e(t.canvas,"Height");t.canvas.width=n,t.canvas.height=o;var n=this.width=t.canvas.width,o=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,i.retinaScale(this),this};n.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},n.types={};var i=n.helpers={},o=i.each=function(t,e,n){var i=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var o;for(o=0;o<t.length;o++)e.apply(n,[t[o],o].concat(i))}else for(var s in t)e.apply(n,[t[s],s].concat(i))},s=i.clone=function(t){var e={};return o(t,function(n,i){t.hasOwnProperty(i)&&(e[i]=n)}),e},r=i.extend=function(t){return o(Array.prototype.slice.call(arguments,1),function(e){o(e,function(n,i){e.hasOwnProperty(i)&&(t[i]=n)})}),t},a=i.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),r.apply(null,t)},l=i.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1},h=(i.where=function(t,e){var n=[];return i.each(t,function(t){e(t)&&n.push(t)}),n},i.findNextWhere=function(t,e,n){n||(n=-1);for(var i=n+1;i<t.length;i++){var o=t[i];if(e(o))return o}},i.findPreviousWhere=function(t,e,n){n||(n=t.length);for(var i=n-1;i>=0;i--){var o=t[i];if(e(o))return o}},i.inherits=function(t){var e=this,n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=n};return i.prototype=e.prototype,n.prototype=new i,n.extend=h,t&&r(n.prototype,t),n.__super__=e.prototype,n}),c=i.noop=function(){},u=i.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=i.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=i.amd="function"==typeof define&&define.amd,f=i.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=i.max=function(t){return Math.max.apply(Math,t)},m=i.min=function(t){return Math.min.apply(Math,t)},v=(i.cap=function(t,e,n){if(f(e)){if(t>e)return e}else if(f(n)&&n>t)return n;return t},i.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),y=i.radians=function(t){return t*(Math.PI/180)},b=(i.getAngleFromPoint=function(t,e){var n=e.x-t.x,i=e.y-t.y,o=Math.sqrt(n*n+i*i),s=2*Math.PI+Math.atan2(i,n);return 0>n&&0>i&&(s+=2*Math.PI),{angle:s,distance:o}},i.aliasPixel=function(t){return t%2===0?0:.5}),x=(i.splineCurve=function(t,e,n,i){var o=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),s=Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)),r=i*o/(o+s),a=i*s/(o+s);return{inner:{x:e.x-r*(n.x-t.x),y:e.y-r*(n.y-t.y)},outer:{x:e.x+a*(n.x-t.x),y:e.y+a*(n.y-t.y)}}},i.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),w=(i.calculateScaleRange=function(t,e,n,i,o){var s=2,r=Math.floor(e/(1.5*n)),a=s>=r,l=g(t),h=m(t);l===h&&(l+=.5,h>=.5&&!i?h-=.5:l+=.5);for(var c=Math.abs(l-h),u=x(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=i?0:Math.floor(h/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),y=Math.round(f/v);(y>r||r>2*y)&&!a;)if(y>r)v*=2,y=Math.round(f/v),y%1!==0&&(a=!0);else if(o&&u>=0){if(v/2%1!==0)break;v/=2,y=Math.round(f/v)}else v/=2,y=Math.round(f/v);return a&&(y=s,v=f/y),{steps:y,stepValue:v,min:p,max:p+y*v}},i.template=function(t,e){function n(t,e){var n=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):i[t]=i[t];return e?n(e):n}if(t instanceof Function)return t(e);var i={};return n(t,e)}),C=(i.generateLabels=function(t,e,n,i){var s=new Array(e);return labelTemplateString&&o(s,function(e,o){s[o]=w(t,{value:n+i*(o+1)})}),s},i.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-0.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-0.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-0.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-0.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),-(i*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n)))},easeOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin(2*(1*t-e)*Math.PI/n)+1)},easeInOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:2==(t/=.5)?1:(n||(n=.3*1.5),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),1>t?-.5*i*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n):i*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*t*t*(((e*=1.525)+1)*t-e):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-C.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*C.easeInBounce(2*t):.5*C.easeOutBounce(2*t-1)+.5}}),S=i.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),T=i.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),k=(i.animationLoop=function(t,e,n,i,o,s){var r=0,a=C[n]||C.linear,l=function(){r++;var n=r/e,h=a(n);t.call(s,h,n,r),i.call(s,h,n),e>r?s.animationFrame=S(l):o.apply(s)};S(l)},i.getRelativePosition=function(t){var e,n,i=t.originalEvent||t,o=t.currentTarget||t.srcElement,s=o.getBoundingClientRect();return i.touches?(e=i.touches[0].clientX-s.left,n=i.touches[0].clientY-s.top):(e=i.clientX-s.left,n=i.clientY-s.top),{x:e,y:n}},i.addEvent=function(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n}),E=i.removeEvent=function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=c},A=(i.bindEvents=function(t,e,n){t.events||(t.events={}),o(e,function(e){t.events[e]=function(){n.apply(t,arguments)},k(t.chart.canvas,e,t.events[e])})},i.unbindEvents=function(t,e){o(e,function(e,n){E(t.chart.canvas,n,e)})}),L=i.getMaximumWidth=function(t){var e=t.parentNode;return e.clientWidth},P=i.getMaximumHeight=function(t){var e=t.parentNode;return e.clientHeight},N=(i.getMaximumSize=i.getMaximumWidth,i.retinaScale=function(t){var e=t.ctx,n=t.canvas.width,i=t.canvas.height;window.devicePixelRatio&&(e.canvas.style.width=n+"px",e.canvas.style.height=i+"px",e.canvas.height=i*window.devicePixelRatio,e.canvas.width=n*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio))}),D=i.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},R=i.fontString=function(t,e,n){return e+" "+t+"px "+n},F=i.longestText=function(t,e,n){t.font=e;var i=0;return o(n,function(e){var n=t.measureText(e).width;i=n>i?n:i}),i},$=i.drawRoundedRectangle=function(t,e,n,i,o,s){t.beginPath(),t.moveTo(e+s,n),t.lineTo(e+i-s,n),t.quadraticCurveTo(e+i,n,e+i,n+s),t.lineTo(e+i,n+o-s),t.quadraticCurveTo(e+i,n+o,e+i-s,n+o),t.lineTo(e+s,n+o),t.quadraticCurveTo(e,n+o,e,n+o-s),t.lineTo(e,n+s),t.quadraticCurveTo(e,n,e+s,n),t.closePath()};n.instances={},n.Type=function(t,e,i){this.options=e,this.chart=i,this.id=u(),n.instances[this.id]=this,e.responsive&&this.resize(),this.initialize.call(this,t)},r(n.Type.prototype,{initialize:function(){return this},clear:function(){return D(this.chart),this},stop:function(){return T(this.animationFrame),this},resize:function(t){this.stop();var e=this.chart.canvas,n=L(this.chart.canvas),i=this.options.maintainAspectRatio?n/this.chart.aspectRatio:P(this.chart.canvas);return e.width=this.chart.width=n,e.height=this.chart.height=i,N(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?i.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return w(this.options.legendTemplate,this)},destroy:function(){this.clear(),A(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete n.instances[this.id]},showTooltip:function(t,e){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var s=function(t){var e=!1;return t.length!==this.activeElements.length?e=!0:(o(t,function(t,n){t!==this.activeElements[n]&&(e=!0)},this),e)}.call(this,t);if(s||e){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var r,a,h=this.datasets.length-1;h>=0&&(r=this.datasets[h].points||this.datasets[h].bars||this.datasets[h].segments,a=l(r,t[0]),-1===a);h--);var c=[],u=[],d=function(){var t,e,n,o,s,r=[],l=[],h=[];return i.each(this.datasets,function(e){t=e.points||e.bars||e.segments,t[a]&&t[a].hasValue()&&r.push(t[a])}),i.each(r,function(t){l.push(t.x),h.push(t.y),c.push(i.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),s=m(h),n=g(h),o=m(l),e=g(l),{x:o>this.chart.width/2?o:e,y:(s+n)/2}}.call(this,a);new n.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else o(t,function(t){var e=t.tooltipPosition();new n.Tooltip({x:Math.round(e.x),y:Math.round(e.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:w(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),n.Type.extend=function(t){var e=this,i=function(){return e.apply(this,arguments)};if(i.prototype=s(e.prototype),r(i.prototype,t),i.extend=n.Type.extend,t.name||e.prototype.name){var o=t.name||e.prototype.name,l=n.defaults[e.prototype.name]?s(n.defaults[e.prototype.name]):{};n.defaults[o]=r(l,t.defaults),n.types[o]=i,n.prototype[o]=function(t,e){var s=a(n.defaults.global,n.defaults[o],e||{});return new i(t,s,this)}}else d("Name not provided for this chart, so it hasn't been registered");return e},n.Element=function(t){r(this,t),this.initialize.apply(this,arguments),this.save()},r(n.Element.prototype,{initialize:function(){},restore:function(t){return t?o(t,function(t){this[t]=this._saved[t]},this):r(this,this._saved),this},save:function(){return this._saved=s(this),delete this._saved._saved,this},update:function(t){return o(t,function(t,e){this._saved[e]=this[e],this[e]=t},this),this},transition:function(t,e){return o(t,function(t,n){this[n]=(t-this._saved[n])*e+this._saved[n]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),n.Element.extend=h,n.Point=n.Element.extend({display:!0,inRange:function(t,e){var n=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(e-this.y,2)<Math.pow(n,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),n.Arc=n.Element.extend({inRange:function(t,e){var n=i.getAngleFromPoint(this,{x:t,y:e}),o=n.angle>=this.startAngle&&n.angle<=this.endAngle,s=n.distance>=this.innerRadius&&n.distance<=this.outerRadius;return o&&s},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,e=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*e,y:this.y+Math.sin(t)*e}},draw:function(t){var e=this.ctx;e.beginPath(),e.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),e.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),e.closePath(),e.strokeStyle=this.strokeColor,e.lineWidth=this.strokeWidth,e.fillStyle=this.fillColor,e.fill(),e.lineJoin="bevel",this.showStroke&&e.stroke()}}),n.Rectangle=n.Element.extend({draw:function(){var t=this.ctx,e=this.width/2,n=this.x-e,i=this.x+e,o=this.base-(this.base-this.y),s=this.strokeWidth/2;this.showStroke&&(n+=s,i-=s,o+=s),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(n,this.base),t.lineTo(n,o),t.lineTo(i,o),t.lineTo(i,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,e){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&e>=this.y&&e<=this.base}}),n.Tooltip=n.Element.extend({draw:function(){var t=this.chart.ctx;t.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var e=this.caretPadding=2,n=t.measureText(this.text).width+2*this.xPadding,i=this.fontSize+2*this.yPadding,o=i+this.caretHeight+e;this.x+n/2>this.chart.width?this.xAlign="left":this.x-n/2<0&&(this.xAlign="right"),this.y-o<0&&(this.yAlign="below");var s=this.x-n/2,r=this.y-o;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-e),t.lineTo(this.x+this.caretHeight,this.y-(e+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(e+this.caretHeight)),t.closePath(),t.fill();break;case"below":r=this.y+e+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+e),t.lineTo(this.x+this.caretHeight,this.y+e+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+e+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":s=this.x-n+(this.cornerRadius+this.caretHeight);break;case"right":s=this.x-(this.cornerRadius+this.caretHeight)}$(t,s,r,n,i,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,s+n/2,r+i/2)}}}),n.MultiTooltip=n.Element.extend({initialize:function(){this.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=R(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,e=F(this.ctx,this.font,this.labels)+this.fontSize+3,n=g([e,t]);this.width=n+2*this.xPadding;var i=this.height/2;this.y-i<0?this.y=i:this.y+i>this.chart.height&&(this.y=this.chart.height-i),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var e=this.y-this.height/2+this.yPadding,n=t-1;return 0===t?e+this.titleFontSize/2:e+(1.5*this.fontSize*n+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{$(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,i.each(this.labels,function(e,n){t.fillStyle=this.textColor,t.fillText(e,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(n+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(n+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[n].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(n+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),n.Scale=n.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(w(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?F(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,e=this.endPoint-this.startPoint;for(this.calculateYRange(e),this.buildYLabels(),this.calculateXLabelRotation();e>this.endPoint-this.startPoint;)e=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(e),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,e,n=this.ctx.measureText(this.xLabels[0]).width,i=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=i/2+3,this.xScalePaddingLeft=n/2>this.yLabelWidth+10?n/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var o,s=F(this.ctx,this.font,this.xLabels);this.xLabelWidth=s;for(var r=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>r&&0===this.xLabelRotation||this.xLabelWidth>r&&this.xLabelRotation<=90&&this.xLabelRotation>0;)o=Math.cos(y(this.xLabelRotation)),t=o*n,e=o*i,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=o*s;this.xLabelRotation>0&&(this.endPoint-=Math.sin(y(this.xLabelRotation))*s+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var e=this.drawingArea()/(this.min-this.max);return this.endPoint-e*(t-this.min)},calculateX:function(t){var e=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),n=e/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),i=n*t+this.xScalePaddingLeft;return this.offsetGridLines&&(i+=n/2),Math.round(i)},update:function(t){i.extend(this,t),this.fit()},draw:function(){var t=this.ctx,e=(this.endPoint-this.startPoint)/this.steps,n=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,o(this.yLabels,function(o,s){var r=this.endPoint-e*s,a=Math.round(r),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(o,n-10,r),0!==s||l||(l=!0),l&&t.beginPath(),s>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a+=i.aliasPixel(t.lineWidth),l&&(t.moveTo(n,a),t.lineTo(this.width,a),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n-5,a),t.lineTo(n,a),t.stroke(),t.closePath()},this),o(this.xLabels,function(e,n){var i=this.calculateX(n)+b(this.lineWidth),o=this.calculateX(n-(this.offsetGridLines?.5:0))+b(this.lineWidth),s=this.xLabelRotation>0,r=this.showVerticalLines;0!==n||r||(r=!0),r&&t.beginPath(),n>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),r&&(t.moveTo(o,this.endPoint),t.lineTo(o,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(o,this.endPoint),t.lineTo(o,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(i,s?this.endPoint+12:this.endPoint+8),t.rotate(-1*y(this.xLabelRotation)),t.font=this.font,t.textAlign=s?"right":"center",t.textBaseline=s?"middle":"top",t.fillText(e,0,0),t.restore()},this))}}),n.RadialScale=n.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var e=this.drawingArea/(this.max-this.min);return(t-this.min)*e},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(w(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,e,n,i,o,s,r,a,l,h,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=R(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),e=0;e<this.valuesCount;e++)t=this.getPointPosition(e,d),n=this.ctx.measureText(w(this.templateString,{value:this.labels[e]})).width+5,0===e||e===this.valuesCount/2?(i=n/2,t.x+i>p&&(p=t.x+i,o=e),t.x-i<g&&(g=t.x-i,r=e)):e<this.valuesCount/2?t.x+n>p&&(p=t.x+n,o=e):e>this.valuesCount/2&&t.x-n<g&&(g=t.x-n,r=e);l=g,h=Math.ceil(p-this.width),s=this.getIndexAngle(o),a=this.getIndexAngle(r),c=h/Math.sin(s+Math.PI/2),u=l/Math.sin(a+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,e){var n=this.width-e-this.drawingArea,i=t+this.drawingArea;this.xCenter=(i+n)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var e=2*Math.PI/this.valuesCount;return t*e-Math.PI/2},getPointPosition:function(t,e){var n=this.getIndexAngle(t);return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(o(this.yLabels,function(e,n){if(n>0){var i,o=n*(this.drawingArea/this.steps),s=this.yCenter-o;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,o,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var r=0;r<this.valuesCount;r++)i=this.getPointPosition(r,this.calculateCenterOffset(this.min+n*this.stepValue)),0===r?t.moveTo(i.x,i.y):t.lineTo(i.x,i.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var a=t.measureText(e).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-a/2-this.backdropPaddingX,s-this.fontSize/2-this.backdropPaddingY,a+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(e,this.xCenter,s)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var e=this.valuesCount-1;e>=0;e--){if(this.angleLineWidth>0){var n=this.getPointPosition(e,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(n.x,n.y),t.stroke(),t.closePath()}var i=this.getPointPosition(e,this.calculateCenterOffset(this.max)+5);t.font=R(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var s=this.labels.length,r=this.labels.length/2,a=r/2,l=a>e||e>s-a,h=e===a||e===s-a;t.textAlign=0===e?"center":e===r?"center":r>e?"left":"right",t.textBaseline=h?"middle":l?"bottom":"top",t.fillText(this.labels[e],i.x,i.y)}}}}}),i.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){o(n.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return n}):"object"==typeof module&&module.exports&&(module.exports=n),t.Chart=n,n.noConflict=function(){return t.Chart=e,n}}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Bar",defaults:i,initialize:function(t){var i=this.options;this.ScaleClass=e.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,e,n){var o=this.calculateBaseWidth(),s=this.calculateX(n)-o/2,r=this.calculateBarWidth(t);return s+r*e+e*i.barDatasetSpacing+r/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*i.barValueSpacing},calculateBarWidth:function(t){var e=this.calculateBaseWidth()-(t-1)*i.barDatasetSpacing;return e/t}}),this.datasets=[],this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),this.BarClass=e.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,bars:[]};this.datasets.push(i),n.each(e.data,function(n,o){i.bars.push(new this.BarClass({value:n,label:t.labels[o],datasetLabel:e.label,strokeColor:e.strokeColor,fillColor:e.fillColor,highlightFill:e.highlightFill||e.fillColor,highlightStroke:e.highlightStroke||e.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,e,i){n.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,i,e),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),n.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){n.each(this.datasets,function(e,i){n.each(e.bars,t,this,i)},this)},getBarsAtEvent:function(t){for(var e,i=[],o=n.getRelativePosition(t),s=function(t){i.push(t.bars[e])},r=0;r<this.datasets.length;r++)for(e=0;e<this.datasets[r].bars.length;e++)if(this.datasets[r].bars[e].inRange(o.x,o.y))return n.each(this.datasets,s),i;return i},buildScale:function(t){var e=this,i=function(){var t=[];return e.eachBars(function(e){t.push(e.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=n.calculateScaleRange(i(),t,this.fontSize,this.beginAtZero,this.integersOnly);n.extend(this,e)},xLabels:t,font:n.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&n.extend(o,{calculateYRange:n.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(o)},addData:function(t,e){n.each(t,function(t,n){this.datasets[n].bars.push(new this.BarClass({value:t,label:e,x:this.scale.calculateBarX(this.datasets.length,n,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[n].strokeColor,fillColor:this.datasets[n].fillColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),n.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){n.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=n.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear();this.chart.ctx;this.scale.draw(e),n.each(this.datasets,function(t,i){n.each(t.bars,function(t,n){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,i,n),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},e).draw())},this)},this)}})}.call(this),function(){"use strict";
var t=this,e=t.Chart,n=e.helpers,i={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Doughnut",defaults:i,initialize:function(t){this.segments=[],this.outerRadius=(n.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=e.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];n.each(this.segments,function(t){t.restore(["fillColor"])}),n.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.calculateTotal(t),n.each(t,function(t,e){this.addData(t,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.segments,function(t){t.inRange(i.x,i.y)&&e.push(t)},this),e},addData:function(t,e,n){var i=e||this.segments.length;this.segments.splice(i,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),n||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,n.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),n.each(this.activeElements,function(t){t.restore(["fillColor"])}),n.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var e=n.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},reflow:function(){n.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(n.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,n.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var e=t?t:1;this.clear(),n.each(this.segments,function(t,n){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},e),t.endAngle=t.startAngle+t.circumference,t.draw(),0===n&&(t.startAngle=1.5*Math.PI),n<this.segments.length-1&&(this.segments[n+1].startAngle=t.endAngle)},this)}}),e.types.Doughnut.extend({name:"Pie",defaults:n.merge(i,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Line",defaults:i,initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(i),n.each(e.data,function(n,o){i.points.push(new this.PointClass({value:n,label:t.labels[o],datasetLabel:e.label,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,e){n.extend(t,{x:this.scale.calculateX(e),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),n.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){n.each(this.datasets,function(e){n.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.datasets,function(t){n.each(t.points,function(t){t.inRange(i.x,i.y)&&e.push(t)})},this),e},buildScale:function(t){var i=this,o=function(){var t=[];return i.eachPoints(function(e){t.push(e.value)}),t},s={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=n.calculateScaleRange(o(),t,this.fontSize,this.beginAtZero,this.integersOnly);n.extend(this,e)},xLabels:t,font:n.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&n.extend(s,{calculateYRange:n.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new e.Scale(s)},addData:function(t,e){n.each(t,function(t,n){this.datasets[n].points.push(new this.PointClass({value:t,label:e,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[n].pointStrokeColor,fillColor:this.datasets[n].pointColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),n.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=n.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear();var i=this.chart.ctx,o=function(t){return null!==t.value},s=function(t,e,i){return n.findNextWhere(e,o,i)||t},r=function(t,e,i){return n.findPreviousWhere(e,o,i)||t};this.scale.draw(e),n.each(this.datasets,function(t){var a=n.where(t.points,o);n.each(t.points,function(t,n){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(n)},e)},this),this.options.bezierCurve&&n.each(a,function(t,e){var i=e>0&&e<a.length-1?this.options.bezierCurveTension:0;t.controlPoints=n.splineCurve(r(t,a,e),t,s(t,a,e),i),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),i.lineWidth=this.options.datasetStrokeWidth,i.strokeStyle=t.strokeColor,i.beginPath(),n.each(a,function(t,e){if(0===e)i.moveTo(t.x,t.y);else if(this.options.bezierCurve){var n=r(t,a,e);i.bezierCurveTo(n.controlPoints.outer.x,n.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else i.lineTo(t.x,t.y)},this),i.stroke(),this.options.datasetFill&&a.length>0&&(i.lineTo(a[a.length-1].x,this.scale.endPoint),i.lineTo(a[0].x,this.scale.endPoint),i.fillStyle=t.fillColor,i.closePath(),i.fill()),n.each(a,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"PolarArea",defaults:i,initialize:function(t){this.segments=[],this.SegmentArc=e.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),n.each(t,function(t,e){this.addData(t,e,!0)},this),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];n.each(this.segments,function(t){t.restore(["fillColor"])}),n.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.render()},getSegmentsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.segments,function(t){t.inRange(i.x,i.y)&&e.push(t)},this),e},addData:function(t,e,n){var i=e||this.segments.length;this.segments.splice(i,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),n||(this.reflow(),this.update())},removeData:function(t){var e=n.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,n.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var e=[];n.each(t,function(t){e.push(t.value)});var i=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:n.calculateScaleRange(e,n.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);n.extend(this.scale,i,{size:n.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),n.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){n.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),n.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),n.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var e=t||1;this.clear(),n.each(this.segments,function(t,n){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},e),t.endAngle=t.startAngle+t.circumference,0===n&&(t.startAngle=1.5*Math.PI),n<this.segments.length-1&&(this.segments[n+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers;e.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(i),n.each(e.data,function(n,o){var s;this.scale.animation||(s=this.scale.getPointPosition(o,this.scale.calculateCenterOffset(n))),i.points.push(new this.PointClass({value:n,label:t.labels[o],datasetLabel:e.label,x:this.options.animation?this.scale.xCenter:s.x,y:this.options.animation?this.scale.yCenter:s.y,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){n.each(this.datasets,function(e){n.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=n.getRelativePosition(t),i=n.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},e),o=2*Math.PI/this.scale.valuesCount,s=Math.round((i.angle-1.5*Math.PI)/o),r=[];return(s>=this.scale.valuesCount||0>s)&&(s=0),i.distance<=this.scale.drawingArea&&n.each(this.datasets,function(t){r.push(t.points[s])}),r},buildScale:function(t){this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var e=function(){var e=[];return n.each(t,function(t){t.data?e=e.concat(t.data):n.each(t.points,function(t){e.push(t.value)})}),e}(),i=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:n.calculateScaleRange(e,n.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);n.extend(this.scale,i)},addData:function(t,e){this.scale.valuesCount++,n.each(t,function(t,n){var i=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[n].points.push(new this.PointClass({value:t,label:e,x:i.x,y:i.y,strokeColor:this.datasets[n].pointStrokeColor,fillColor:this.datasets[n].pointColor}))},this),this.scale.labels.push(e),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),n.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){n.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:n.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var e=t||1,i=this.chart.ctx;this.clear(),this.scale.draw(),n.each(this.datasets,function(t){n.each(t.points,function(t,n){t.hasValue()&&t.transition(this.scale.getPointPosition(n,this.scale.calculateCenterOffset(t.value)),e)},this),i.lineWidth=this.options.datasetStrokeWidth,i.strokeStyle=t.strokeColor,i.beginPath(),n.each(t.points,function(t,e){0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)},this),i.closePath(),i.stroke(),i.fillStyle=t.fillColor,i.fill(),n.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this),/*!
 * Chart.js
 * http://chartjs.org/
 * Version: 1.0.2
 *
 * Copyright 2015 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 */
function(){"use strict";var t=this,e=t.Chart,n=function(t){this.canvas=t.canvas,this.ctx=t;var e=function(t,e){return t["offset"+e]?t["offset"+e]:document.defaultView.getComputedStyle(t).getPropertyValue(e)},n=this.width=e(t.canvas,"Width"),o=this.height=e(t.canvas,"Height");t.canvas.width=n,t.canvas.height=o;var n=this.width=t.canvas.width,o=this.height=t.canvas.height;return this.aspectRatio=this.width/this.height,i.retinaScale(this),this};n.defaults={global:{animation:!0,animationSteps:60,animationEasing:"easeOutQuart",showScale:!0,scaleOverride:!1,scaleSteps:null,scaleStepWidth:null,scaleStartValue:null,scaleLineColor:"rgba(0,0,0,.1)",scaleLineWidth:1,scaleShowLabels:!0,scaleLabel:"<%=value%>",scaleIntegersOnly:!0,scaleBeginAtZero:!1,scaleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",scaleFontSize:12,scaleFontStyle:"normal",scaleFontColor:"#666",responsive:!1,maintainAspectRatio:!0,showTooltips:!0,customTooltips:!1,tooltipEvents:["mousemove","touchstart","touchmove","mouseout"],tooltipFillColor:"rgba(0,0,0,0.8)",tooltipFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipFontSize:14,tooltipFontStyle:"normal",tooltipFontColor:"#fff",tooltipTitleFontFamily:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",tooltipTitleFontSize:14,tooltipTitleFontStyle:"bold",tooltipTitleFontColor:"#fff",tooltipYPadding:6,tooltipXPadding:6,tooltipCaretSize:8,tooltipCornerRadius:6,tooltipXOffset:10,tooltipTemplate:"<%if (label){%><%=label%>: <%}%><%= value %>",multiTooltipTemplate:"<%= value %>",multiTooltipKeyBackground:"#fff",onAnimationProgress:function(){},onAnimationComplete:function(){}}},n.types={};var i=n.helpers={},o=i.each=function(t,e,n){var i=Array.prototype.slice.call(arguments,3);if(t)if(t.length===+t.length){var o;for(o=0;o<t.length;o++)e.apply(n,[t[o],o].concat(i))}else for(var s in t)e.apply(n,[t[s],s].concat(i))},s=i.clone=function(t){var e={};return o(t,function(n,i){t.hasOwnProperty(i)&&(e[i]=n)}),e},r=i.extend=function(t){return o(Array.prototype.slice.call(arguments,1),function(e){o(e,function(n,i){e.hasOwnProperty(i)&&(t[i]=n)})}),t},a=i.merge=function(){var t=Array.prototype.slice.call(arguments,0);return t.unshift({}),r.apply(null,t)},l=i.indexOf=function(t,e){if(Array.prototype.indexOf)return t.indexOf(e);for(var n=0;n<t.length;n++)if(t[n]===e)return n;return-1},h=(i.where=function(t,e){var n=[];return i.each(t,function(t){e(t)&&n.push(t)}),n},i.findNextWhere=function(t,e,n){n||(n=-1);for(var i=n+1;i<t.length;i++){var o=t[i];if(e(o))return o}},i.findPreviousWhere=function(t,e,n){n||(n=t.length);for(var i=n-1;i>=0;i--){var o=t[i];if(e(o))return o}},i.inherits=function(t){var e=this,n=t&&t.hasOwnProperty("constructor")?t.constructor:function(){return e.apply(this,arguments)},i=function(){this.constructor=n};return i.prototype=e.prototype,n.prototype=new i,n.extend=h,t&&r(n.prototype,t),n.__super__=e.prototype,n}),c=i.noop=function(){},u=i.uid=function(){var t=0;return function(){return"chart-"+t++}}(),d=i.warn=function(t){window.console&&"function"==typeof window.console.warn&&console.warn(t)},p=i.amd="function"==typeof define&&define.amd,f=i.isNumber=function(t){return!isNaN(parseFloat(t))&&isFinite(t)},g=i.max=function(t){return Math.max.apply(Math,t)},m=i.min=function(t){return Math.min.apply(Math,t)},v=(i.cap=function(t,e,n){if(f(e)){if(t>e)return e}else if(f(n)&&n>t)return n;return t},i.getDecimalPlaces=function(t){return t%1!==0&&f(t)?t.toString().split(".")[1].length:0}),y=i.radians=function(t){return t*(Math.PI/180)},b=(i.getAngleFromPoint=function(t,e){var n=e.x-t.x,i=e.y-t.y,o=Math.sqrt(n*n+i*i),s=2*Math.PI+Math.atan2(i,n);return 0>n&&0>i&&(s+=2*Math.PI),{angle:s,distance:o}},i.aliasPixel=function(t){return t%2===0?0:.5}),x=(i.splineCurve=function(t,e,n,i){var o=Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)),s=Math.sqrt(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)),r=i*o/(o+s),a=i*s/(o+s);return{inner:{x:e.x-r*(n.x-t.x),y:e.y-r*(n.y-t.y)},outer:{x:e.x+a*(n.x-t.x),y:e.y+a*(n.y-t.y)}}},i.calculateOrderOfMagnitude=function(t){return Math.floor(Math.log(t)/Math.LN10)}),w=(i.calculateScaleRange=function(t,e,n,i,o){var s=2,r=Math.floor(e/(1.5*n)),a=s>=r,l=g(t),h=m(t);l===h&&(l+=.5,h>=.5&&!i?h-=.5:l+=.5);for(var c=Math.abs(l-h),u=x(c),d=Math.ceil(l/(1*Math.pow(10,u)))*Math.pow(10,u),p=i?0:Math.floor(h/(1*Math.pow(10,u)))*Math.pow(10,u),f=d-p,v=Math.pow(10,u),y=Math.round(f/v);(y>r||r>2*y)&&!a;)if(y>r)v*=2,y=Math.round(f/v),y%1!==0&&(a=!0);else if(o&&u>=0){if(v/2%1!==0)break;v/=2,y=Math.round(f/v)}else v/=2,y=Math.round(f/v);return a&&(y=s,v=f/y),{steps:y,stepValue:v,min:p,max:p+y*v}},i.template=function(t,e){function n(t,e){var n=/\W/.test(t)?new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+t.replace(/[\r\t\n]/g," ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g,"$1\r").replace(/\t=(.*?)%>/g,"',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'")+"');}return p.join('');"):i[t]=i[t];return e?n(e):n}if(t instanceof Function)return t(e);var i={};return n(t,e)}),C=(i.generateLabels=function(t,e,n,i){var s=new Array(e);return labelTemplateString&&o(s,function(e,o){s[o]=w(t,{value:n+i*(o+1)})}),s},i.easingEffects={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return-1*t*(t-2)},easeInOutQuad:function(t){return(t/=.5)<1?.5*t*t:-.5*(--t*(t-2)-1)},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return 1*((t=t/1-1)*t*t+1)},easeInOutCubic:function(t){return(t/=.5)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return-1*((t=t/1-1)*t*t*t-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},easeInQuint:function(t){return 1*(t/=1)*t*t*t*t},easeOutQuint:function(t){return 1*((t=t/1-1)*t*t*t*t+1)},easeInOutQuint:function(t){return(t/=.5)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},easeInSine:function(t){return-1*Math.cos(t/1*(Math.PI/2))+1},easeOutSine:function(t){return 1*Math.sin(t/1*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t/1)-1)},easeInExpo:function(t){return 0===t?1:1*Math.pow(2,10*(t/1-1))},easeOutExpo:function(t){return 1===t?1:1*(-Math.pow(2,-10*t/1)+1)},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return t>=1?t:-1*(Math.sqrt(1-(t/=1)*t)-1)},easeOutCirc:function(t){return 1*Math.sqrt(1-(t=t/1-1)*t)},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeInElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),-(i*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n)))},easeOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:1==(t/=1)?1:(n||(n=.3),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),i*Math.pow(2,-10*t)*Math.sin(2*(1*t-e)*Math.PI/n)+1)},easeInOutElastic:function(t){var e=1.70158,n=0,i=1;return 0===t?0:2==(t/=.5)?1:(n||(n=.3*1.5),i<Math.abs(1)?(i=1,e=n/4):e=n/(2*Math.PI)*Math.asin(1/i),1>t?-.5*i*Math.pow(2,10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n):i*Math.pow(2,-10*(t-=1))*Math.sin(2*(1*t-e)*Math.PI/n)*.5+1)},easeInBack:function(t){var e=1.70158;return 1*(t/=1)*t*((e+1)*t-e)},easeOutBack:function(t){var e=1.70158;return 1*((t=t/1-1)*t*((e+1)*t+e)+1)},easeInOutBack:function(t){var e=1.70158;return(t/=.5)<1?.5*t*t*(((e*=1.525)+1)*t-e):.5*((t-=2)*t*(((e*=1.525)+1)*t+e)+2)},easeInBounce:function(t){return 1-C.easeOutBounce(1-t)},easeOutBounce:function(t){return(t/=1)<1/2.75?7.5625*t*t:2/2.75>t?1*(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?1*(7.5625*(t-=2.25/2.75)*t+.9375):1*(7.5625*(t-=2.625/2.75)*t+.984375)},easeInOutBounce:function(t){return.5>t?.5*C.easeInBounce(2*t):.5*C.easeOutBounce(2*t-1)+.5}}),S=i.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)}}(),T=i.cancelAnimFrame=function(){return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(t){return window.clearTimeout(t,1e3/60)}}(),k=(i.animationLoop=function(t,e,n,i,o,s){var r=0,a=C[n]||C.linear,l=function(){r++;var n=r/e,h=a(n);t.call(s,h,n,r),i.call(s,h,n),e>r?s.animationFrame=S(l):o.apply(s)};S(l)},i.getRelativePosition=function(t){var e,n,i=t.originalEvent||t,o=t.currentTarget||t.srcElement,s=o.getBoundingClientRect();return i.touches?(e=i.touches[0].clientX-s.left,n=i.touches[0].clientY-s.top):(e=i.clientX-s.left,n=i.clientY-s.top),{x:e,y:n}},i.addEvent=function(t,e,n){t.addEventListener?t.addEventListener(e,n):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n}),E=i.removeEvent=function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=c},A=(i.bindEvents=function(t,e,n){t.events||(t.events={}),o(e,function(e){t.events[e]=function(){n.apply(t,arguments)},k(t.chart.canvas,e,t.events[e])})},i.unbindEvents=function(t,e){o(e,function(e,n){E(t.chart.canvas,n,e)})}),L=i.getMaximumWidth=function(t){var e=t.parentNode;return e.clientWidth},P=i.getMaximumHeight=function(t){var e=t.parentNode;return e.clientHeight},N=(i.getMaximumSize=i.getMaximumWidth,i.retinaScale=function(t){var e=t.ctx,n=t.canvas.width,i=t.canvas.height;window.devicePixelRatio&&(e.canvas.style.width=n+"px",e.canvas.style.height=i+"px",e.canvas.height=i*window.devicePixelRatio,e.canvas.width=n*window.devicePixelRatio,e.scale(window.devicePixelRatio,window.devicePixelRatio))}),D=i.clear=function(t){t.ctx.clearRect(0,0,t.width,t.height)},R=i.fontString=function(t,e,n){return e+" "+t+"px "+n},F=i.longestText=function(t,e,n){t.font=e;var i=0;return o(n,function(e){var n=t.measureText(e).width;i=n>i?n:i}),i},$=i.drawRoundedRectangle=function(t,e,n,i,o,s){t.beginPath(),t.moveTo(e+s,n),t.lineTo(e+i-s,n),t.quadraticCurveTo(e+i,n,e+i,n+s),t.lineTo(e+i,n+o-s),t.quadraticCurveTo(e+i,n+o,e+i-s,n+o),t.lineTo(e+s,n+o),t.quadraticCurveTo(e,n+o,e,n+o-s),t.lineTo(e,n+s),t.quadraticCurveTo(e,n,e+s,n),t.closePath()};n.instances={},n.Type=function(t,e,i){this.options=e,this.chart=i,this.id=u(),n.instances[this.id]=this,e.responsive&&this.resize(),this.initialize.call(this,t)},r(n.Type.prototype,{initialize:function(){return this},clear:function(){return D(this.chart),this},stop:function(){return T(this.animationFrame),this},resize:function(t){this.stop();var e=this.chart.canvas,n=L(this.chart.canvas),i=this.options.maintainAspectRatio?n/this.chart.aspectRatio:P(this.chart.canvas);return e.width=this.chart.width=n,e.height=this.chart.height=i,N(this.chart),"function"==typeof t&&t.apply(this,Array.prototype.slice.call(arguments,1)),this},reflow:c,render:function(t){return t&&this.reflow(),this.options.animation&&!t?i.animationLoop(this.draw,this.options.animationSteps,this.options.animationEasing,this.options.onAnimationProgress,this.options.onAnimationComplete,this):(this.draw(),this.options.onAnimationComplete.call(this)),this},generateLegend:function(){return w(this.options.legendTemplate,this)},destroy:function(){this.clear(),A(this,this.events);var t=this.chart.canvas;t.width=this.chart.width,t.height=this.chart.height,t.style.removeProperty?(t.style.removeProperty("width"),t.style.removeProperty("height")):(t.style.removeAttribute("width"),t.style.removeAttribute("height")),delete n.instances[this.id]},showTooltip:function(t,e){"undefined"==typeof this.activeElements&&(this.activeElements=[]);var s=function(t){var e=!1;return t.length!==this.activeElements.length?e=!0:(o(t,function(t,n){t!==this.activeElements[n]&&(e=!0)},this),e)}.call(this,t);if(s||e){if(this.activeElements=t,this.draw(),this.options.customTooltips&&this.options.customTooltips(!1),t.length>0)if(this.datasets&&this.datasets.length>1){for(var r,a,h=this.datasets.length-1;h>=0&&(r=this.datasets[h].points||this.datasets[h].bars||this.datasets[h].segments,a=l(r,t[0]),-1===a);h--);var c=[],u=[],d=function(){var t,e,n,o,s,r=[],l=[],h=[];return i.each(this.datasets,function(e){t=e.points||e.bars||e.segments,t[a]&&t[a].hasValue()&&r.push(t[a])}),i.each(r,function(t){l.push(t.x),h.push(t.y),c.push(i.template(this.options.multiTooltipTemplate,t)),u.push({fill:t._saved.fillColor||t.fillColor,stroke:t._saved.strokeColor||t.strokeColor})},this),s=m(h),n=g(h),o=m(l),e=g(l),{x:o>this.chart.width/2?o:e,y:(s+n)/2}}.call(this,a);new n.MultiTooltip({x:d.x,y:d.y,xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,xOffset:this.options.tooltipXOffset,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,titleTextColor:this.options.tooltipTitleFontColor,titleFontFamily:this.options.tooltipTitleFontFamily,titleFontStyle:this.options.tooltipTitleFontStyle,titleFontSize:this.options.tooltipTitleFontSize,cornerRadius:this.options.tooltipCornerRadius,labels:c,legendColors:u,legendColorBackground:this.options.multiTooltipKeyBackground,title:t[0].label,chart:this.chart,ctx:this.chart.ctx,custom:this.options.customTooltips}).draw()}else o(t,function(t){var e=t.tooltipPosition();new n.Tooltip({x:Math.round(e.x),y:Math.round(e.y),xPadding:this.options.tooltipXPadding,yPadding:this.options.tooltipYPadding,fillColor:this.options.tooltipFillColor,textColor:this.options.tooltipFontColor,fontFamily:this.options.tooltipFontFamily,fontStyle:this.options.tooltipFontStyle,fontSize:this.options.tooltipFontSize,caretHeight:this.options.tooltipCaretSize,cornerRadius:this.options.tooltipCornerRadius,text:w(this.options.tooltipTemplate,t),chart:this.chart,custom:this.options.customTooltips}).draw()},this);return this}},toBase64Image:function(){return this.chart.canvas.toDataURL.apply(this.chart.canvas,arguments)}}),n.Type.extend=function(t){var e=this,i=function(){return e.apply(this,arguments)};if(i.prototype=s(e.prototype),r(i.prototype,t),i.extend=n.Type.extend,t.name||e.prototype.name){var o=t.name||e.prototype.name,l=n.defaults[e.prototype.name]?s(n.defaults[e.prototype.name]):{};n.defaults[o]=r(l,t.defaults),n.types[o]=i,n.prototype[o]=function(t,e){var s=a(n.defaults.global,n.defaults[o],e||{});return new i(t,s,this)}}else d("Name not provided for this chart, so it hasn't been registered");return e},n.Element=function(t){r(this,t),this.initialize.apply(this,arguments),this.save()},r(n.Element.prototype,{initialize:function(){},restore:function(t){return t?o(t,function(t){this[t]=this._saved[t]},this):r(this,this._saved),this},save:function(){return this._saved=s(this),delete this._saved._saved,this},update:function(t){return o(t,function(t,e){this._saved[e]=this[e],this[e]=t},this),this},transition:function(t,e){return o(t,function(t,n){this[n]=(t-this._saved[n])*e+this._saved[n]},this),this},tooltipPosition:function(){return{x:this.x,y:this.y}},hasValue:function(){return f(this.value)}}),n.Element.extend=h,n.Point=n.Element.extend({display:!0,inRange:function(t,e){var n=this.hitDetectionRadius+this.radius;return Math.pow(t-this.x,2)+Math.pow(e-this.y,2)<Math.pow(n,2)},draw:function(){if(this.display){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.radius,0,2*Math.PI),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.stroke()}}}),n.Arc=n.Element.extend({inRange:function(t,e){var n=i.getAngleFromPoint(this,{x:t,y:e}),o=n.angle>=this.startAngle&&n.angle<=this.endAngle,s=n.distance>=this.innerRadius&&n.distance<=this.outerRadius;return o&&s},tooltipPosition:function(){var t=this.startAngle+(this.endAngle-this.startAngle)/2,e=(this.outerRadius-this.innerRadius)/2+this.innerRadius;return{x:this.x+Math.cos(t)*e,y:this.y+Math.sin(t)*e}},draw:function(){var t=this.ctx;t.beginPath(),t.arc(this.x,this.y,this.outerRadius,this.startAngle,this.endAngle),t.arc(this.x,this.y,this.innerRadius,this.endAngle,this.startAngle,!0),t.closePath(),t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.fillStyle=this.fillColor,t.fill(),t.lineJoin="bevel",this.showStroke&&t.stroke()}}),n.Rectangle=n.Element.extend({draw:function(){var t=this.ctx,e=this.width/2,n=this.x-e,i=this.x+e,o=this.base-(this.base-this.y),s=this.strokeWidth/2;this.showStroke&&(n+=s,i-=s,o+=s),t.beginPath(),t.fillStyle=this.fillColor,t.strokeStyle=this.strokeColor,t.lineWidth=this.strokeWidth,t.moveTo(n,this.base),t.lineTo(n,o),t.lineTo(i,o),t.lineTo(i,this.base),t.fill(),this.showStroke&&t.stroke()},height:function(){return this.base-this.y},inRange:function(t,e){return t>=this.x-this.width/2&&t<=this.x+this.width/2&&e>=this.y&&e<=this.base}}),n.Tooltip=n.Element.extend({draw:function(){var t=this.chart.ctx;t.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.xAlign="center",this.yAlign="above";var e=this.caretPadding=2,n=t.measureText(this.text).width+2*this.xPadding,i=this.fontSize+2*this.yPadding,o=i+this.caretHeight+e;this.x+n/2>this.chart.width?this.xAlign="left":this.x-n/2<0&&(this.xAlign="right"),this.y-o<0&&(this.yAlign="below");var s=this.x-n/2,r=this.y-o;if(t.fillStyle=this.fillColor,this.custom)this.custom(this);else{switch(this.yAlign){case"above":t.beginPath(),t.moveTo(this.x,this.y-e),t.lineTo(this.x+this.caretHeight,this.y-(e+this.caretHeight)),t.lineTo(this.x-this.caretHeight,this.y-(e+this.caretHeight)),t.closePath(),t.fill();break;case"below":r=this.y+e+this.caretHeight,t.beginPath(),t.moveTo(this.x,this.y+e),t.lineTo(this.x+this.caretHeight,this.y+e+this.caretHeight),t.lineTo(this.x-this.caretHeight,this.y+e+this.caretHeight),t.closePath(),t.fill()}switch(this.xAlign){case"left":s=this.x-n+(this.cornerRadius+this.caretHeight);break;case"right":s=this.x-(this.cornerRadius+this.caretHeight)}$(t,s,r,n,i,this.cornerRadius),t.fill(),t.fillStyle=this.textColor,t.textAlign="center",t.textBaseline="middle",t.fillText(this.text,s+n/2,r+i/2)}}}),n.MultiTooltip=n.Element.extend({initialize:function(){this.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.titleFont=R(this.titleFontSize,this.titleFontStyle,this.titleFontFamily),this.height=this.labels.length*this.fontSize+(this.labels.length-1)*(this.fontSize/2)+2*this.yPadding+1.5*this.titleFontSize,this.ctx.font=this.titleFont;var t=this.ctx.measureText(this.title).width,e=F(this.ctx,this.font,this.labels)+this.fontSize+3,n=g([e,t]);this.width=n+2*this.xPadding;var i=this.height/2;this.y-i<0?this.y=i:this.y+i>this.chart.height&&(this.y=this.chart.height-i),this.x>this.chart.width/2?this.x-=this.xOffset+this.width:this.x+=this.xOffset},getLineHeight:function(t){var e=this.y-this.height/2+this.yPadding,n=t-1;return 0===t?e+this.titleFontSize/2:e+(1.5*this.fontSize*n+this.fontSize/2)+1.5*this.titleFontSize},draw:function(){if(this.custom)this.custom(this);else{$(this.ctx,this.x,this.y-this.height/2,this.width,this.height,this.cornerRadius);var t=this.ctx;t.fillStyle=this.fillColor,t.fill(),t.closePath(),t.textAlign="left",t.textBaseline="middle",t.fillStyle=this.titleTextColor,t.font=this.titleFont,t.fillText(this.title,this.x+this.xPadding,this.getLineHeight(0)),t.font=this.font,i.each(this.labels,function(e,n){t.fillStyle=this.textColor,t.fillText(e,this.x+this.xPadding+this.fontSize+3,this.getLineHeight(n+1)),t.fillStyle=this.legendColorBackground,t.fillRect(this.x+this.xPadding,this.getLineHeight(n+1)-this.fontSize/2,this.fontSize,this.fontSize),t.fillStyle=this.legendColors[n].fill,t.fillRect(this.x+this.xPadding,this.getLineHeight(n+1)-this.fontSize/2,this.fontSize,this.fontSize)},this)}}}),n.Scale=n.Element.extend({initialize:function(){this.fit()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(w(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}));this.yLabelWidth=this.display&&this.showLabels?F(this.ctx,this.font,this.yLabels):0},addXLabel:function(t){this.xLabels.push(t),this.valuesCount++,this.fit()},removeXLabel:function(){this.xLabels.shift(),this.valuesCount--,this.fit()},fit:function(){this.startPoint=this.display?this.fontSize:0,this.endPoint=this.display?this.height-1.5*this.fontSize-5:this.height,this.startPoint+=this.padding,this.endPoint-=this.padding;var t,e=this.endPoint-this.startPoint;for(this.calculateYRange(e),this.buildYLabels(),this.calculateXLabelRotation();e>this.endPoint-this.startPoint;)e=this.endPoint-this.startPoint,t=this.yLabelWidth,this.calculateYRange(e),this.buildYLabels(),t<this.yLabelWidth&&this.calculateXLabelRotation()},calculateXLabelRotation:function(){this.ctx.font=this.font;var t,e,n=this.ctx.measureText(this.xLabels[0]).width,i=this.ctx.measureText(this.xLabels[this.xLabels.length-1]).width;if(this.xScalePaddingRight=i/2+3,this.xScalePaddingLeft=n/2>this.yLabelWidth+10?n/2:this.yLabelWidth+10,this.xLabelRotation=0,this.display){var o,s=F(this.ctx,this.font,this.xLabels);this.xLabelWidth=s;for(var r=Math.floor(this.calculateX(1)-this.calculateX(0))-6;this.xLabelWidth>r&&0===this.xLabelRotation||this.xLabelWidth>r&&this.xLabelRotation<=90&&this.xLabelRotation>0;)o=Math.cos(y(this.xLabelRotation)),t=o*n,e=o*i,t+this.fontSize/2>this.yLabelWidth+8&&(this.xScalePaddingLeft=t+this.fontSize/2),this.xScalePaddingRight=this.fontSize/2,this.xLabelRotation++,this.xLabelWidth=o*s;this.xLabelRotation>0&&(this.endPoint-=Math.sin(y(this.xLabelRotation))*s+3)}else this.xLabelWidth=0,this.xScalePaddingRight=this.padding,this.xScalePaddingLeft=this.padding},calculateYRange:c,drawingArea:function(){return this.startPoint-this.endPoint},calculateY:function(t){var e=this.drawingArea()/(this.min-this.max);return this.endPoint-e*(t-this.min)},calculateX:function(t){var e=(this.xLabelRotation>0,this.width-(this.xScalePaddingLeft+this.xScalePaddingRight)),n=e/Math.max(this.valuesCount-(this.offsetGridLines?0:1),1),i=n*t+this.xScalePaddingLeft;return this.offsetGridLines&&(i+=n/2),Math.round(i)},update:function(t){i.extend(this,t),this.fit()},draw:function(){var t=this.ctx,e=(this.endPoint-this.startPoint)/this.steps,n=Math.round(this.xScalePaddingLeft);this.display&&(t.fillStyle=this.textColor,t.font=this.font,o(this.yLabels,function(o,s){var r=this.endPoint-e*s,a=Math.round(r),l=this.showHorizontalLines;t.textAlign="right",t.textBaseline="middle",this.showLabels&&t.fillText(o,n-10,r),0!==s||l||(l=!0),l&&t.beginPath(),s>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),a+=i.aliasPixel(t.lineWidth),l&&(t.moveTo(n,a),t.lineTo(this.width,a),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(n-5,a),t.lineTo(n,a),t.stroke(),t.closePath()},this),o(this.xLabels,function(e,n){var i=this.calculateX(n)+b(this.lineWidth),o=this.calculateX(n-(this.offsetGridLines?.5:0))+b(this.lineWidth),s=this.xLabelRotation>0,r=this.showVerticalLines;0!==n||r||(r=!0),r&&t.beginPath(),n>0?(t.lineWidth=this.gridLineWidth,t.strokeStyle=this.gridLineColor):(t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor),r&&(t.moveTo(o,this.endPoint),t.lineTo(o,this.startPoint-3),t.stroke(),t.closePath()),t.lineWidth=this.lineWidth,t.strokeStyle=this.lineColor,t.beginPath(),t.moveTo(o,this.endPoint),t.lineTo(o,this.endPoint+5),t.stroke(),t.closePath(),t.save(),t.translate(i,s?this.endPoint+12:this.endPoint+8),t.rotate(-1*y(this.xLabelRotation)),t.font=this.font,t.textAlign=s?"right":"center",t.textBaseline=s?"middle":"top",t.fillText(e,0,0),t.restore()},this))}}),n.RadialScale=n.Element.extend({initialize:function(){this.size=m([this.height,this.width]),this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2},calculateCenterOffset:function(t){var e=this.drawingArea/(this.max-this.min);return(t-this.min)*e},update:function(){this.lineArc?this.drawingArea=this.display?this.size/2-(this.fontSize/2+this.backdropPaddingY):this.size/2:this.setScaleSize(),this.buildYLabels()},buildYLabels:function(){this.yLabels=[];for(var t=v(this.stepValue),e=0;e<=this.steps;e++)this.yLabels.push(w(this.templateString,{value:(this.min+e*this.stepValue).toFixed(t)}))},getCircumference:function(){return 2*Math.PI/this.valuesCount},setScaleSize:function(){var t,e,n,i,o,s,r,a,l,h,c,u,d=m([this.height/2-this.pointLabelFontSize-5,this.width/2]),p=this.width,g=0;for(this.ctx.font=R(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),e=0;e<this.valuesCount;e++)t=this.getPointPosition(e,d),n=this.ctx.measureText(w(this.templateString,{value:this.labels[e]})).width+5,0===e||e===this.valuesCount/2?(i=n/2,t.x+i>p&&(p=t.x+i,o=e),t.x-i<g&&(g=t.x-i,r=e)):e<this.valuesCount/2?t.x+n>p&&(p=t.x+n,o=e):e>this.valuesCount/2&&t.x-n<g&&(g=t.x-n,r=e);l=g,h=Math.ceil(p-this.width),s=this.getIndexAngle(o),a=this.getIndexAngle(r),c=h/Math.sin(s+Math.PI/2),u=l/Math.sin(a+Math.PI/2),c=f(c)?c:0,u=f(u)?u:0,this.drawingArea=d-(u+c)/2,this.setCenterPoint(u,c)},setCenterPoint:function(t,e){var n=this.width-e-this.drawingArea,i=t+this.drawingArea;this.xCenter=(i+n)/2,this.yCenter=this.height/2},getIndexAngle:function(t){var e=2*Math.PI/this.valuesCount;return t*e-Math.PI/2},getPointPosition:function(t,e){var n=this.getIndexAngle(t);return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter}},draw:function(){if(this.display){var t=this.ctx;if(o(this.yLabels,function(e,n){if(n>0){var i,o=n*(this.drawingArea/this.steps),s=this.yCenter-o;if(this.lineWidth>0)if(t.strokeStyle=this.lineColor,t.lineWidth=this.lineWidth,this.lineArc)t.beginPath(),t.arc(this.xCenter,this.yCenter,o,0,2*Math.PI),t.closePath(),t.stroke();else{t.beginPath();for(var r=0;r<this.valuesCount;r++)i=this.getPointPosition(r,this.calculateCenterOffset(this.min+n*this.stepValue)),0===r?t.moveTo(i.x,i.y):t.lineTo(i.x,i.y);t.closePath(),t.stroke()}if(this.showLabels){if(t.font=R(this.fontSize,this.fontStyle,this.fontFamily),this.showLabelBackdrop){var a=t.measureText(e).width;t.fillStyle=this.backdropColor,t.fillRect(this.xCenter-a/2-this.backdropPaddingX,s-this.fontSize/2-this.backdropPaddingY,a+2*this.backdropPaddingX,this.fontSize+2*this.backdropPaddingY)}t.textAlign="center",t.textBaseline="middle",t.fillStyle=this.fontColor,t.fillText(e,this.xCenter,s)}}},this),!this.lineArc){t.lineWidth=this.angleLineWidth,t.strokeStyle=this.angleLineColor;for(var e=this.valuesCount-1;e>=0;e--){if(this.angleLineWidth>0){var n=this.getPointPosition(e,this.calculateCenterOffset(this.max));t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(n.x,n.y),t.stroke(),t.closePath()}var i=this.getPointPosition(e,this.calculateCenterOffset(this.max)+5);t.font=R(this.pointLabelFontSize,this.pointLabelFontStyle,this.pointLabelFontFamily),t.fillStyle=this.pointLabelFontColor;var s=this.labels.length,r=this.labels.length/2,a=r/2,l=a>e||e>s-a,h=e===a||e===s-a;t.textAlign=0===e?"center":e===r?"center":r>e?"left":"right",t.textBaseline=h?"middle":l?"bottom":"top",t.fillText(this.labels[e],i.x,i.y)}}}}}),i.addEvent(window,"resize",function(){var t;return function(){clearTimeout(t),t=setTimeout(function(){o(n.instances,function(t){t.options.responsive&&t.resize(t.render,!0)})},50)}}()),p?define(function(){return n}):"object"==typeof module&&module.exports&&(module.exports=n),t.Chart=n,n.noConflict=function(){return t.Chart=e,n}}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleBeginAtZero:!0,scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,barShowStroke:!0,barStrokeWidth:2,barValueSpacing:5,barDatasetSpacing:1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Bar",defaults:i,initialize:function(t){var i=this.options;this.ScaleClass=e.Scale.extend({offsetGridLines:!0,calculateBarX:function(t,e,n){var o=this.calculateBaseWidth(),s=this.calculateX(n)-o/2,r=this.calculateBarWidth(t);return s+r*e+e*i.barDatasetSpacing+r/2},calculateBaseWidth:function(){return this.calculateX(1)-this.calculateX(0)-2*i.barValueSpacing},calculateBarWidth:function(t){var e=this.calculateBaseWidth()-(t-1)*i.barDatasetSpacing;return e/t}}),this.datasets=[],this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getBarsAtEvent(t):[];this.eachBars(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),this.BarClass=e.Rectangle.extend({strokeWidth:this.options.barStrokeWidth,showStroke:this.options.barShowStroke,ctx:this.chart.ctx}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,bars:[]};this.datasets.push(i),n.each(e.data,function(n,o){i.bars.push(new this.BarClass({value:n,label:t.labels[o],datasetLabel:e.label,strokeColor:e.strokeColor,fillColor:e.fillColor,highlightFill:e.highlightFill||e.fillColor,highlightStroke:e.highlightStroke||e.strokeColor}))},this)},this),this.buildScale(t.labels),this.BarClass.prototype.base=this.scale.endPoint,this.eachBars(function(t,e,i){n.extend(t,{width:this.scale.calculateBarWidth(this.datasets.length),x:this.scale.calculateBarX(this.datasets.length,i,e),y:this.scale.endPoint}),t.save()},this),this.render()},update:function(){this.scale.update(),n.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachBars(function(t){t.save()}),this.render()},eachBars:function(t){n.each(this.datasets,function(e,i){n.each(e.bars,t,this,i)},this)},getBarsAtEvent:function(t){for(var e,i=[],o=n.getRelativePosition(t),s=function(t){i.push(t.bars[e])},r=0;r<this.datasets.length;r++)for(e=0;e<this.datasets[r].bars.length;e++)if(this.datasets[r].bars[e].inRange(o.x,o.y))return n.each(this.datasets,s),i;return i},buildScale:function(t){var e=this,i=function(){var t=[];return e.eachBars(function(e){t.push(e.value)}),t},o={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=n.calculateScaleRange(i(),t,this.fontSize,this.beginAtZero,this.integersOnly);n.extend(this,e)},xLabels:t,font:n.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.barShowStroke?this.options.barStrokeWidth:0,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&n.extend(o,{calculateYRange:n.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new this.ScaleClass(o)},addData:function(t,e){n.each(t,function(t,n){this.datasets[n].bars.push(new this.BarClass({value:t,label:e,x:this.scale.calculateBarX(this.datasets.length,n,this.scale.valuesCount+1),y:this.scale.endPoint,width:this.scale.calculateBarWidth(this.datasets.length),base:this.scale.endPoint,strokeColor:this.datasets[n].strokeColor,fillColor:this.datasets[n].fillColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),n.each(this.datasets,function(t){t.bars.shift()},this),this.update()},reflow:function(){n.extend(this.BarClass.prototype,{y:this.scale.endPoint,base:this.scale.endPoint});var t=n.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear(),this.chart.ctx,this.scale.draw(e),n.each(this.datasets,function(t,i){n.each(t.bars,function(t,n){t.hasValue()&&(t.base=this.scale.endPoint,t.transition({x:this.scale.calculateBarX(this.datasets.length,i,n),y:this.scale.calculateY(t.value),width:this.scale.calculateBarWidth(this.datasets.length)},e).draw())},this)},this)}})}.call(this),function(){"use strict";
var t=this,e=t.Chart,n=e.helpers,i={segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,percentageInnerCutout:50,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Doughnut",defaults:i,initialize:function(t){this.segments=[],this.outerRadius=(n.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,this.SegmentArc=e.Arc.extend({ctx:this.chart.ctx,x:this.chart.width/2,y:this.chart.height/2}),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];n.each(this.segments,function(t){t.restore(["fillColor"])}),n.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.calculateTotal(t),n.each(t,function(t,e){this.addData(t,e,!0)},this),this.render()},getSegmentsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.segments,function(t){t.inRange(i.x,i.y)&&e.push(t)},this),e},addData:function(t,e,n){var i=e||this.segments.length;this.segments.splice(i,0,new this.SegmentArc({value:t.value,outerRadius:this.options.animateScale?0:this.outerRadius,innerRadius:this.options.animateScale?0:this.outerRadius/100*this.options.percentageInnerCutout,fillColor:t.color,highlightColor:t.highlight||t.color,showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,startAngle:1.5*Math.PI,circumference:this.options.animateRotate?0:this.calculateCircumference(t.value),label:t.label})),n||(this.reflow(),this.update())},calculateCircumference:function(t){return 2*Math.PI*(Math.abs(t)/this.total)},calculateTotal:function(t){this.total=0,n.each(t,function(t){this.total+=Math.abs(t.value)},this)},update:function(){this.calculateTotal(this.segments),n.each(this.activeElements,function(t){t.restore(["fillColor"])}),n.each(this.segments,function(t){t.save()}),this.render()},removeData:function(t){var e=n.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},reflow:function(){n.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.outerRadius=(n.min([this.chart.width,this.chart.height])-this.options.segmentStrokeWidth/2)/2,n.each(this.segments,function(t){t.update({outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout})},this)},draw:function(t){var e=t?t:1;this.clear(),n.each(this.segments,function(t,n){t.transition({circumference:this.calculateCircumference(t.value),outerRadius:this.outerRadius,innerRadius:this.outerRadius/100*this.options.percentageInnerCutout},e),t.endAngle=t.startAngle+t.circumference,t.draw(),0===n&&(t.startAngle=1.5*Math.PI),n<this.segments.length-1&&(this.segments[n+1].startAngle=t.endAngle)},this)}}),e.types.Doughnut.extend({name:"Pie",defaults:n.merge(i,{percentageInnerCutout:0})})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"Line",defaults:i,initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(t){return Math.pow(t-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(i),n.each(e.data,function(n,o){i.points.push(new this.PointClass({value:n,label:t.labels[o],datasetLabel:e.label,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this),this.buildScale(t.labels),this.eachPoints(function(t,e){n.extend(t,{x:this.scale.calculateX(e),y:this.scale.endPoint}),t.save()},this)},this),this.render()},update:function(){this.scale.update(),n.each(this.activeElements,function(t){t.restore(["fillColor","strokeColor"])}),this.eachPoints(function(t){t.save()}),this.render()},eachPoints:function(t){n.each(this.datasets,function(e){n.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.datasets,function(t){n.each(t.points,function(t){t.inRange(i.x,i.y)&&e.push(t)})},this),e},buildScale:function(t){var i=this,o=function(){var t=[];return i.eachPoints(function(e){t.push(e.value)}),t},s={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:t.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(t){var e=n.calculateScaleRange(o(),t,this.fontSize,this.beginAtZero,this.integersOnly);n.extend(this,e)},xLabels:t,font:n.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&n.extend(s,{calculateYRange:n.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new e.Scale(s)},addData:function(t,e){n.each(t,function(t,n){this.datasets[n].points.push(new this.PointClass({value:t,label:e,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[n].pointStrokeColor,fillColor:this.datasets[n].pointColor}))},this),this.scale.addXLabel(e),this.update()},removeData:function(){this.scale.removeXLabel(),n.each(this.datasets,function(t){t.points.shift()},this),this.update()},reflow:function(){var t=n.extend({height:this.chart.height,width:this.chart.width});this.scale.update(t)},draw:function(t){var e=t||1;this.clear();var i=this.chart.ctx,o=function(t){return null!==t.value},s=function(t,e,i){return n.findNextWhere(e,o,i)||t},r=function(t,e,i){return n.findPreviousWhere(e,o,i)||t};this.scale.draw(e),n.each(this.datasets,function(t){var a=n.where(t.points,o);n.each(t.points,function(t,n){t.hasValue()&&t.transition({y:this.scale.calculateY(t.value),x:this.scale.calculateX(n)},e)},this),this.options.bezierCurve&&n.each(a,function(t,e){var i=e>0&&e<a.length-1?this.options.bezierCurveTension:0;t.controlPoints=n.splineCurve(r(t,a,e),t,s(t,a,e),i),t.controlPoints.outer.y>this.scale.endPoint?t.controlPoints.outer.y=this.scale.endPoint:t.controlPoints.outer.y<this.scale.startPoint&&(t.controlPoints.outer.y=this.scale.startPoint),t.controlPoints.inner.y>this.scale.endPoint?t.controlPoints.inner.y=this.scale.endPoint:t.controlPoints.inner.y<this.scale.startPoint&&(t.controlPoints.inner.y=this.scale.startPoint)},this),i.lineWidth=this.options.datasetStrokeWidth,i.strokeStyle=t.strokeColor,i.beginPath(),n.each(a,function(t,e){if(0===e)i.moveTo(t.x,t.y);else if(this.options.bezierCurve){var n=r(t,a,e);i.bezierCurveTo(n.controlPoints.outer.x,n.controlPoints.outer.y,t.controlPoints.inner.x,t.controlPoints.inner.y,t.x,t.y)}else i.lineTo(t.x,t.y)},this),i.stroke(),this.options.datasetFill&&a.length>0&&(i.lineTo(a[a.length-1].x,this.scale.endPoint),i.lineTo(a[0].x,this.scale.endPoint),i.fillStyle=t.fillColor,i.closePath(),i.fill()),n.each(a,function(t){t.draw()})},this)}})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers,i={scaleShowLabelBackdrop:!0,scaleBackdropColor:"rgba(255,255,255,0.75)",scaleBeginAtZero:!0,scaleBackdropPaddingY:2,scaleBackdropPaddingX:2,scaleShowLine:!0,segmentShowStroke:!0,segmentStrokeColor:"#fff",segmentStrokeWidth:2,animationSteps:100,animationEasing:"easeOutBounce",animateRotate:!0,animateScale:!1,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'};e.Type.extend({name:"PolarArea",defaults:i,initialize:function(t){this.segments=[],this.SegmentArc=e.Arc.extend({showStroke:this.options.segmentShowStroke,strokeWidth:this.options.segmentStrokeWidth,strokeColor:this.options.segmentStrokeColor,ctx:this.chart.ctx,innerRadius:0,x:this.chart.width/2,y:this.chart.height/2}),this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,lineArc:!0,width:this.chart.width,height:this.chart.height,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,valuesCount:t.length}),this.updateScaleRange(t),this.scale.update(),n.each(t,function(t,e){this.addData(t,e,!0)},this),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getSegmentsAtEvent(t):[];n.each(this.segments,function(t){t.restore(["fillColor"])}),n.each(e,function(t){t.fillColor=t.highlightColor}),this.showTooltip(e)}),this.render()},getSegmentsAtEvent:function(t){var e=[],i=n.getRelativePosition(t);return n.each(this.segments,function(t){t.inRange(i.x,i.y)&&e.push(t)},this),e},addData:function(t,e,n){var i=e||this.segments.length;this.segments.splice(i,0,new this.SegmentArc({fillColor:t.color,highlightColor:t.highlight||t.color,label:t.label,value:t.value,outerRadius:this.options.animateScale?0:this.scale.calculateCenterOffset(t.value),circumference:this.options.animateRotate?0:this.scale.getCircumference(),startAngle:1.5*Math.PI})),n||(this.reflow(),this.update())},removeData:function(t){var e=n.isNumber(t)?t:this.segments.length-1;this.segments.splice(e,1),this.reflow(),this.update()},calculateTotal:function(t){this.total=0,n.each(t,function(t){this.total+=t.value},this),this.scale.valuesCount=this.segments.length},updateScaleRange:function(t){var e=[];n.each(t,function(t){e.push(t.value)});var i=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:n.calculateScaleRange(e,n.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);n.extend(this.scale,i,{size:n.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2})},update:function(){this.calculateTotal(this.segments),n.each(this.segments,function(t){t.save()}),this.reflow(),this.render()},reflow:function(){n.extend(this.SegmentArc.prototype,{x:this.chart.width/2,y:this.chart.height/2}),this.updateScaleRange(this.segments),this.scale.update(),n.extend(this.scale,{xCenter:this.chart.width/2,yCenter:this.chart.height/2}),n.each(this.segments,function(t){t.update({outerRadius:this.scale.calculateCenterOffset(t.value)})},this)},draw:function(t){var e=t||1;this.clear(),n.each(this.segments,function(t,n){t.transition({circumference:this.scale.getCircumference(),outerRadius:this.scale.calculateCenterOffset(t.value)},e),t.endAngle=t.startAngle+t.circumference,0===n&&(t.startAngle=1.5*Math.PI),n<this.segments.length-1&&(this.segments[n+1].startAngle=t.endAngle),t.draw()},this),this.scale.draw()}})}.call(this),function(){"use strict";var t=this,e=t.Chart,n=e.helpers;e.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(t){this.PointClass=e.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(t),this.options.showTooltips&&n.bindEvents(this,this.options.tooltipEvents,function(t){var e="mouseout"!==t.type?this.getPointsAtEvent(t):[];this.eachPoints(function(t){t.restore(["fillColor","strokeColor"])}),n.each(e,function(t){t.fillColor=t.highlightFill,t.strokeColor=t.highlightStroke}),this.showTooltip(e)}),n.each(t.datasets,function(e){var i={label:e.label||null,fillColor:e.fillColor,strokeColor:e.strokeColor,pointColor:e.pointColor,pointStrokeColor:e.pointStrokeColor,points:[]};this.datasets.push(i),n.each(e.data,function(n,o){var s;this.scale.animation||(s=this.scale.getPointPosition(o,this.scale.calculateCenterOffset(n))),i.points.push(new this.PointClass({value:n,label:t.labels[o],datasetLabel:e.label,x:this.options.animation?this.scale.xCenter:s.x,y:this.options.animation?this.scale.yCenter:s.y,strokeColor:e.pointStrokeColor,fillColor:e.pointColor,highlightFill:e.pointHighlightFill||e.pointColor,highlightStroke:e.pointHighlightStroke||e.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(t){n.each(this.datasets,function(e){n.each(e.points,t,this)},this)},getPointsAtEvent:function(t){var e=n.getRelativePosition(t),i=n.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},e),o=2*Math.PI/this.scale.valuesCount,s=Math.round((i.angle-1.5*Math.PI)/o),r=[];return(s>=this.scale.valuesCount||0>s)&&(s=0),i.distance<=this.scale.drawingArea&&n.each(this.datasets,function(t){r.push(t.points[s])}),r},buildScale:function(t){this.scale=new e.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:t.labels,valuesCount:t.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(t.datasets),this.scale.buildYLabels()},updateScaleRange:function(t){var e=function(){var e=[];return n.each(t,function(t){t.data?e=e.concat(t.data):n.each(t.points,function(t){e.push(t.value)})}),e}(),i=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:n.calculateScaleRange(e,n.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);n.extend(this.scale,i)},addData:function(t,e){this.scale.valuesCount++,n.each(t,function(t,n){var i=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(t));this.datasets[n].points.push(new this.PointClass({value:t,label:e,x:i.x,y:i.y,strokeColor:this.datasets[n].pointStrokeColor,fillColor:this.datasets[n].pointColor}))},this),this.scale.labels.push(e),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),n.each(this.datasets,function(t){t.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(t){t.save()}),this.reflow(),this.render()},reflow:function(){n.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:n.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(t){var e=t||1,i=this.chart.ctx;this.clear(),this.scale.draw(),n.each(this.datasets,function(t){n.each(t.points,function(t,n){t.hasValue()&&t.transition(this.scale.getPointPosition(n,this.scale.calculateCenterOffset(t.value)),e)},this),i.lineWidth=this.options.datasetStrokeWidth,i.strokeStyle=t.strokeColor,i.beginPath(),n.each(t.points,function(t,e){0===e?i.moveTo(t.x,t.y):i.lineTo(t.x,t.y)},this),i.closePath(),i.stroke(),i.fillStyle=t.fillColor,i.fill(),n.each(t.points,function(t){t.hasValue()&&t.draw()})},this)}})}.call(this),function(){}.call(this);var createChart=function(){var t={labels:["January","February","March","April","May","June"],datasets:[{label:"One",fillColor:"rgba(172,194,132,0.4)",strokeColor:"#ACC26D",pointColor:"#fff",pointStrokeColor:"#9DB86D",data:[203,156,99,251,305,247]},{label:"Two",fillColor:"rgba(151,187,205,0.2)",strokeColor:"rgba(151,187,205,1)",pointColor:"rgba(151,187,205,1)",pointStrokeColor:"#fff",data:[100,356,199,151,205,147]}]},e=document.getElementById("buyers").getContext("2d");new Chart(e).Line(t,{scaleFontColor:"black",scaleFontSize:20,responsive:!1,maintainAspectRatio:!1}),$("#overall-link").click(function(t){$("#overall-form").delay(100).fadeIn(100),$("#recent-form").fadeOut(100),$("#recent-link").removeClass("active"),$(this).addClass("active"),t.preventDefault()}),$("#recent-link").click(function(t){$("#recent-form").delay(100).fadeIn(100),$("#overall-form").fadeOut(100),$("#overall-link").removeClass("active"),$(this).addClass("active"),t.preventDefault()})};/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if($(document).ready(createChart),"undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(t){"use strict";var e=t.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(t){"use strict";function e(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var n in e)if(void 0!==t.style[n])return{end:e[n]};return!1}t.fn.emulateTransitionEnd=function(e){var n=!1,i=this;t(this).one("bsTransitionEnd",function(){n=!0});var o=function(){n||t(i).trigger(t.support.transition.end)};return setTimeout(o,e),this},t(function(){t.support.transition=e(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){return t(e.target).is(this)?e.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),o=n.data("bs.alert");o||n.data("bs.alert",o=new i(this)),"string"==typeof e&&o[e].call(n)})}var n='[data-dismiss="alert"]',i=function(e){t(e).on("click",n,this.close)};i.VERSION="3.3.4",i.TRANSITION_DURATION=150,i.prototype.close=function(e){function n(){r.detach().trigger("closed.bs.alert").remove()}var o=t(this),s=o.attr("data-target");s||(s=o.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,""));var r=t(s);e&&e.preventDefault(),r.length||(r=o.closest(".alert")),r.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(r.removeClass("in"),t.support.transition&&r.hasClass("fade")?r.one("bsTransitionEnd",n).emulateTransitionEnd(i.TRANSITION_DURATION):n())};var o=t.fn.alert;t.fn.alert=e,t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=o,this},t(document).on("click.bs.alert.data-api",n,i.prototype.close)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.button"),s="object"==typeof e&&e;o||i.data("bs.button",o=new n(this,s)),"toggle"==e?o.toggle():e&&o.setState(e)})}var n=function(e,i){this.$element=t(e),this.options=t.extend({},n.DEFAULTS,i),this.isLoading=!1};n.VERSION="3.3.4",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(e){var n="disabled",i=this.$element,o=i.is("input")?"val":"html",s=i.data();e+="Text",null==s.resetText&&i.data("resetText",i[o]()),setTimeout(t.proxy(function(){i[o](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,i.addClass(n).attr(n,n)):this.isLoading&&(this.isLoading=!1,i.removeClass(n).removeAttr(n))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var n=this.$element.find("input");"radio"==n.prop("type")&&(n.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&n.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));t&&this.$element.toggleClass("active")};var i=t.fn.button;t.fn.button=e,t.fn.button.Constructor=n,t.fn.button.noConflict=function(){return t.fn.button=i,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(n){var i=t(n.target);i.hasClass("btn")||(i=i.closest(".btn")),e.call(i,"toggle"),n.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.carousel"),s=t.extend({},n.DEFAULTS,i.data(),"object"==typeof e&&e),r="string"==typeof e?e:s.slide;o||i.data("bs.carousel",o=new n(this,s)),"number"==typeof e?o.to(e):r?o[r]():s.interval&&o.pause().cycle()})}var n=function(e,n){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=n,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};n.VERSION="3.3.4",n.TRANSITION_DURATION=600,n.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},n.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},n.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},n.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},n.prototype.getItemForDirection=function(t,e){var n=this.getItemIndex(e),i="prev"==t&&0===n||"next"==t&&n==this.$items.length-1;if(i&&!this.options.wrap)return e;var o="prev"==t?-1:1,s=(n+o)%this.$items.length;return this.$items.eq(s)},n.prototype.to=function(t){var e=this,n=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):n==t?this.pause().cycle():this.slide(t>n?"next":"prev",this.$items.eq(t))},n.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},n.prototype.next=function(){return this.sliding?void 0:this.slide("next")},n.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},n.prototype.slide=function(e,i){var o=this.$element.find(".item.active"),s=i||this.getItemForDirection(e,o),r=this.interval,a="next"==e?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],c=t.Event("slide.bs.carousel",{relatedTarget:h,direction:a});if(this.$element.trigger(c),!c.isDefaultPrevented()){if(this.sliding=!0,r&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var u=t(this.$indicators.children()[this.getItemIndex(s)]);u&&u.addClass("active")}var d=t.Event("slid.bs.carousel",{relatedTarget:h,direction:a});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(e),s[0].offsetWidth,o.addClass(a),s.addClass(a),o.one("bsTransitionEnd",function(){s.removeClass([e,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(d)},0)}).emulateTransitionEnd(n.TRANSITION_DURATION)):(o.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(d)),r&&this.cycle(),this}};var i=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=n,t.fn.carousel.noConflict=function(){return t.fn.carousel=i,this};var o=function(n){var i,o=t(this),s=t(o.attr("data-target")||(i=o.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,""));if(s.hasClass("carousel")){var r=t.extend({},s.data(),o.data()),a=o.attr("data-slide-to");a&&(r.interval=!1),e.call(s,r),a&&s.data("bs.carousel").to(a),n.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var n=t(this);e.call(n,n.data())})})}(jQuery),+function(t){"use strict";function e(e){var n,i=e.attr("data-target")||(n=e.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,"");return t(i)}function n(e){return this.each(function(){var n=t(this),o=n.data("bs.collapse"),s=t.extend({},i.DEFAULTS,n.data(),"object"==typeof e&&e);!o&&s.toggle&&/show|hide/.test(e)&&(s.toggle=!1),o||n.data("bs.collapse",o=new i(this,s)),"string"==typeof e&&o[e]()})}var i=function(e,n){this.$element=t(e),this.options=t.extend({},i.DEFAULTS,n),this.$trigger=t('[data-toggle="collapse"][href="#'+e.id+'"],[data-toggle="collapse"][data-target="#'+e.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};i.VERSION="3.3.4",i.TRANSITION_DURATION=350,i.DEFAULTS={toggle:!0},i.prototype.dimension=function(){var t=this.$element.hasClass("width");return t?"width":"height"},i.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var e,o=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(o&&o.length&&(e=o.data("bs.collapse"),e&&e.transitioning))){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){o&&o.length&&(n.call(o,"hide"),e||o.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(i.TRANSITION_DURATION)[r](this.$element[0][l])}}}},i.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var e=t.Event("hide.bs.collapse");if(this.$element.trigger(e),!e.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return t.support.transition?void this.$element[n](0).one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(i.TRANSITION_DURATION):o.call(this)}}},i.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},i.prototype.getParent=function(){return t(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(n,i){var o=t(i);this.addAriaAndCollapsedClass(e(o),o)},this)).end()},i.prototype.addAriaAndCollapsedClass=function(t,e){var n=t.hasClass("in");t.attr("aria-expanded",n),e.toggleClass("collapsed",!n).attr("aria-expanded",n)};var o=t.fn.collapse;t.fn.collapse=n,t.fn.collapse.Constructor=i,t.fn.collapse.noConflict=function(){return t.fn.collapse=o,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(i){var o=t(this);o.attr("data-target")||i.preventDefault();var s=e(o),r=s.data("bs.collapse"),a=r?"toggle":o.data();n.call(s,a)})}(jQuery),+function(t){"use strict";function e(e){e&&3===e.which||(t(o).remove(),t(s).each(function(){var i=t(this),o=n(i),s={relatedTarget:this};o.hasClass("open")&&(o.trigger(e=t.Event("hide.bs.dropdown",s)),e.isDefaultPrevented()||(i.attr("aria-expanded","false"),o.removeClass("open").trigger("hidden.bs.dropdown",s)))}))}function n(e){var n=e.attr("data-target");n||(n=e.attr("href"),n=n&&/#[A-Za-z]/.test(n)&&n.replace(/.*(?=#[^\s]*$)/,""));var i=n&&t(n);return i&&i.length?i:e.parent()}function i(e){return this.each(function(){var n=t(this),i=n.data("bs.dropdown");i||n.data("bs.dropdown",i=new r(this)),"string"==typeof e&&i[e].call(n)})}var o=".dropdown-backdrop",s='[data-toggle="dropdown"]',r=function(e){t(e).on("click.bs.dropdown",this.toggle)};r.VERSION="3.3.4",r.prototype.toggle=function(i){var o=t(this);if(!o.is(".disabled, :disabled")){var s=n(o),r=s.hasClass("open");if(e(),!r){"ontouchstart"in document.documentElement&&!s.closest(".navbar-nav").length&&t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click",e);var a={relatedTarget:this};if(s.trigger(i=t.Event("show.bs.dropdown",a)),i.isDefaultPrevented())return;o.trigger("focus").attr("aria-expanded","true"),s.toggleClass("open").trigger("shown.bs.dropdown",a)}return!1}},r.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var i=t(this);if(e.preventDefault(),e.stopPropagation(),!i.is(".disabled, :disabled")){var o=n(i),r=o.hasClass("open");if(!r&&27!=e.which||r&&27==e.which)return 27==e.which&&o.find(s).trigger("focus"),i.trigger("click");var a=" li:not(.disabled):visible a",l=o.find('[role="menu"]'+a+', [role="listbox"]'+a);if(l.length){var h=l.index(e.target);38==e.which&&h>0&&h--,40==e.which&&h<l.length-1&&h++,~h||(h=0),l.eq(h).trigger("focus")}}}};var a=t.fn.dropdown;t.fn.dropdown=i,t.fn.dropdown.Constructor=r,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=a,this},t(document).on("click.bs.dropdown.data-api",e).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",s,r.prototype.toggle).on("keydown.bs.dropdown.data-api",s,r.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',r.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',r.prototype.keydown)}(jQuery),+function(t){"use strict";function e(e,i){return this.each(function(){var o=t(this),s=o.data("bs.modal"),r=t.extend({},n.DEFAULTS,o.data(),"object"==typeof e&&e);s||o.data("bs.modal",s=new n(this,r)),"string"==typeof e?s[e](i):r.show&&s.show(i)})}var n=function(e,n){this.options=n,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};n.VERSION="3.3.4",n.TRANSITION_DURATION=300,n.BACKDROP_TRANSITION_DURATION=150,n.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},n.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},n.prototype.show=function(e){var i=this,o=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){i.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(i.$element)&&(i.ignoreBackdropClick=!0)})}),this.backdrop(function(){var o=t.support.transition&&i.$element.hasClass("fade");i.$element.parent().length||i.$element.appendTo(i.$body),i.$element.show().scrollTop(0),i.adjustDialog(),o&&i.$element[0].offsetWidth,i.$element.addClass("in").attr("aria-hidden",!1),i.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:e});o?i.$dialog.one("bsTransitionEnd",function(){i.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(n.TRANSITION_DURATION):i.$element.trigger("focus").trigger(s)}))},n.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(n.TRANSITION_DURATION):this.hideModal())},n.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},n.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},n.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},n.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},n.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},n.prototype.backdrop=function(e){var i=this,o=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&o;if(this.$backdrop=t('<div class="modal-backdrop '+o+'" />').appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;s?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){i.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(n.BACKDROP_TRANSITION_DURATION):r()}else e&&e()},n.prototype.handleUpdate=function(){this.adjustDialog()},n.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},n.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},n.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},n.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},n.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},n.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var i=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=n,t.fn.modal.noConflict=function(){return t.fn.modal=i,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(n){var i=t(this),o=i.attr("href"),s=t(i.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,"")),r=s.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},s.data(),i.data());i.is("a")&&n.preventDefault(),s.one("show.bs.modal",function(t){t.isDefaultPrevented()||s.one("hidden.bs.modal",function(){i.is(":visible")&&i.trigger("focus")})}),e.call(s,r,this)})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.tooltip"),s="object"==typeof e&&e;(o||!/destroy|hide/.test(e))&&(o||i.data("bs.tooltip",o=new n(this,s)),"string"==typeof e&&o[e]())})}var n=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.init("tooltip",t,e)};n.VERSION="3.3.4",n.TRANSITION_DURATION=150,n.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},n.prototype.init=function(e,n,i){if(this.enabled=!0,this.type=e,this.$element=t(n),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&t(this.options.viewport.selector||this.options.viewport),this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),s=o.length;s--;){var r=o[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.getOptions=function(e){return e=t.extend({},this.getDefaults(),this.$element.data(),e),e.delay&&"number"==typeof e.delay&&(e.delay={show:e.delay,hide:e.delay}),e},n.prototype.getDelegateOptions=function(){var e={},n=this.getDefaults();return this._options&&t.each(this._options,function(t,i){n[t]!=i&&(e[t]=i)}),e},n.prototype.enter=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return n&&n.$tip&&n.$tip.is(":visible")?void(n.hoverState="in"):(n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="in",n.options.delay&&n.options.delay.show?void(n.timeout=setTimeout(function(){"in"==n.hoverState&&n.show()},n.options.delay.show)):n.show())},n.prototype.leave=function(e){var n=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);return n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n)),clearTimeout(n.timeout),n.hoverState="out",n.options.delay&&n.options.delay.hide?void(n.timeout=setTimeout(function(){"out"==n.hoverState&&n.hide()},n.options.delay.hide)):n.hide()},n.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var o=this,s=this.tip(),r=this.getUID(this.type);this.setContent(),s.attr("id",r),this.$element.attr("aria-describedby",r),this.options.animation&&s.addClass("fade");var a="function"==typeof this.options.placement?this.options.placement.call(this,s[0],this.$element[0]):this.options.placement,l=/\s?auto?\s?/i,h=l.test(a);h&&(a=a.replace(l,"")||"top"),s.detach().css({top:0,left:0,display:"block"}).addClass(a).data("bs."+this.type,this),this.options.container?s.appendTo(this.options.container):s.insertAfter(this.$element);var c=this.getPosition(),u=s[0].offsetWidth,d=s[0].offsetHeight;if(h){var p=a,f=this.options.container?t(this.options.container):this.$element.parent(),g=this.getPosition(f);a="bottom"==a&&c.bottom+d>g.bottom?"top":"top"==a&&c.top-d<g.top?"bottom":"right"==a&&c.right+u>g.width?"left":"left"==a&&c.left-u<g.left?"right":a,s.removeClass(p).addClass(a)}var m=this.getCalculatedOffset(a,c,u,d);this.applyPlacement(m,a);var v=function(){var t=o.hoverState;o.$element.trigger("shown.bs."+o.type),o.hoverState=null,"out"==t&&o.leave(o)};t.support.transition&&this.$tip.hasClass("fade")?s.one("bsTransitionEnd",v).emulateTransitionEnd(n.TRANSITION_DURATION):v()}},n.prototype.applyPlacement=function(e,n){var i=this.tip(),o=i[0].offsetWidth,s=i[0].offsetHeight,r=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top=e.top+r,e.left=e.left+a,t.offset.setOffset(i[0],t.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),i.addClass("in");var l=i[0].offsetWidth,h=i[0].offsetHeight;"top"==n&&h!=s&&(e.top=e.top+s-h);var c=this.getViewportAdjustedDelta(n,e,l,h);c.left?e.left+=c.left:e.top+=c.top;var u=/top|bottom/.test(n),d=u?2*c.left-o+l:2*c.top-s+h,p=u?"offsetWidth":"offsetHeight";i.offset(e),this.replaceArrow(d,i[0][p],u)},n.prototype.replaceArrow=function(t,e,n){this.arrow().css(n?"left":"top",50*(1-t/e)+"%").css(n?"top":"left","")},n.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},n.prototype.hide=function(e){function i(){"in"!=o.hoverState&&s.detach(),o.$element.removeAttr("aria-describedby").trigger("hidden.bs."+o.type),e&&e()}var o=this,s=t(this.$tip),r=t.Event("hide.bs."+this.type);return this.$element.trigger(r),r.isDefaultPrevented()?void 0:(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",i).emulateTransitionEnd(n.TRANSITION_DURATION):i(),this.hoverState=null,this)},n.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},n.prototype.hasContent=function(){return this.getTitle()},n.prototype.getPosition=function(e){e=e||this.$element;var n=e[0],i="BODY"==n.tagName,o=n.getBoundingClientRect();null==o.width&&(o=t.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var s=i?{top:0,left:0}:e.offset(),r={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},a=i?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},o,r,a,s)},n.prototype.getCalculatedOffset=function(t,e,n,i){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-n/2}:"top"==t?{top:e.top-i,left:e.left+e.width/2-n/2}:"left"==t?{top:e.top+e.height/2-i/2,left:e.left-n}:{top:e.top+e.height/2-i/2,left:e.left+e.width}},n.prototype.getViewportAdjustedDelta=function(t,e,n,i){var o={top:0,left:0};if(!this.$viewport)return o;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+i;a<r.top?o.top=r.top-a:l>r.top+r.height&&(o.top=r.top+r.height-l)}else{var h=e.left-s,c=e.left+s+n;h<r.left?o.left=r.left-h:c>r.width&&(o.left=r.left+r.width-c)}return o},n.prototype.getTitle=function(){var t,e=this.$element,n=this.options;return t=e.attr("data-original-title")||("function"==typeof n.title?n.title.call(e[0]):n.title)},n.prototype.getUID=function(t){do t+=~~(1e6*Math.random());while(document.getElementById(t));return t},n.prototype.tip=function(){return this.$tip=this.$tip||t(this.options.template)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},n.prototype.enable=function(){this.enabled=!0},n.prototype.disable=function(){this.enabled=!1},n.prototype.toggleEnabled=function(){this.enabled=!this.enabled},n.prototype.toggle=function(e){var n=this;e&&(n=t(e.currentTarget).data("bs."+this.type),n||(n=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,n))),n.tip().hasClass("in")?n.leave(n):n.enter(n)},n.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var i=t.fn.tooltip;t.fn.tooltip=e,t.fn.tooltip.Constructor=n,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=i,this}}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.popover"),s="object"==typeof e&&e;(o||!/destroy|hide/.test(e))&&(o||i.data("bs.popover",o=new n(this,s)),"string"==typeof e&&o[e]())})}var n=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");n.VERSION="3.3.4",n.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),n.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),n.prototype.constructor=n,n.prototype.getDefaults=function(){return n.DEFAULTS},n.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),n=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof n?"html":"append":"text"](n),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},n.prototype.hasContent=function(){return this.getTitle()||this.getContent()},n.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},n.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var i=t.fn.popover;t.fn.popover=e,t.fn.popover.Constructor=n,t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(jQuery),+function(t){"use strict";function e(n,i){this.$body=t(document.body),this.$scrollElement=t(t(n).is(document.body)?window:n),this.options=t.extend({},e.DEFAULTS,i),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function n(n){return this.each(function(){var i=t(this),o=i.data("bs.scrollspy"),s="object"==typeof n&&n;o||i.data("bs.scrollspy",o=new e(this,s)),"string"==typeof n&&o[n]()})}e.VERSION="3.3.4",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,n="offset",i=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(n="position",i=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),o=e.data("target")||e.attr("href"),s=/^#./.test(o)&&t(o);return s&&s.length&&s.is(":visible")&&[[s[n]().top+i,o]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,n=this.getScrollHeight(),i=this.options.offset+n-this.$scrollElement.height(),o=this.offsets,s=this.targets,r=this.activeTarget;if(this.scrollHeight!=n&&this.refresh(),e>=i)return r!=(t=s[s.length-1])&&this.activate(t);if(r&&e<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)r!=s[t]&&e>=o[t]&&(void 0===o[t+1]||e<o[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var n=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',i=t(n).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var i=t.fn.scrollspy;t.fn.scrollspy=n,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=i,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);n.call(e,e.data())})})}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.tab");o||i.data("bs.tab",o=new n(this)),"string"==typeof e&&o[e]()})}var n=function(e){this.element=t(e)};n.VERSION="3.3.4",n.TRANSITION_DURATION=150,n.prototype.show=function(){var e=this.element,n=e.closest("ul:not(.dropdown-menu)"),i=e.data("target");if(i||(i=e.attr("href"),i=i&&i.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var o=n.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),r=t.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(s),e.trigger(r),!r.isDefaultPrevented()&&!s.isDefaultPrevented()){var a=t(i);this.activate(e.closest("li"),n),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},n.prototype.activate=function(e,i,o){function s(){r.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),a?(e[0].offsetWidth,e.addClass("in")):e.removeClass("fade"),e.parent(".dropdown-menu").length&&e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),o&&o()
}var r=i.find("> .active"),a=o&&t.support.transition&&(r.length&&r.hasClass("fade")||!!i.find("> .fade").length);r.length&&a?r.one("bsTransitionEnd",s).emulateTransitionEnd(n.TRANSITION_DURATION):s(),r.removeClass("in")};var i=t.fn.tab;t.fn.tab=e,t.fn.tab.Constructor=n,t.fn.tab.noConflict=function(){return t.fn.tab=i,this};var o=function(n){n.preventDefault(),e.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',o).on("click.bs.tab.data-api",'[data-toggle="pill"]',o)}(jQuery),+function(t){"use strict";function e(e){return this.each(function(){var i=t(this),o=i.data("bs.affix"),s="object"==typeof e&&e;o||i.data("bs.affix",o=new n(this,s)),"string"==typeof e&&o[e]()})}var n=function(e,i){this.options=t.extend({},n.DEFAULTS,i),this.$target=t(this.options.target).on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(e),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};n.VERSION="3.3.4",n.RESET="affix affix-top affix-bottom",n.DEFAULTS={offset:0,target:window},n.prototype.getState=function(t,e,n,i){var o=this.$target.scrollTop(),s=this.$element.offset(),r=this.$target.height();if(null!=n&&"top"==this.affixed)return n>o?"top":!1;if("bottom"==this.affixed)return null!=n?o+this.unpin<=s.top?!1:"bottom":t-i>=o+r?!1:"bottom";var a=null==this.affixed,l=a?o:s.top,h=a?r:e;return null!=n&&n>=o?"top":null!=i&&l+h>=t-i?"bottom":!1},n.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(n.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},n.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},n.prototype.checkPosition=function(){if(this.$element.is(":visible")){var e=this.$element.height(),i=this.options.offset,o=i.top,s=i.bottom,r=t(document.body).height();"object"!=typeof i&&(s=o=i),"function"==typeof o&&(o=i.top(this.$element)),"function"==typeof s&&(s=i.bottom(this.$element));var a=this.getState(r,e,o,s);if(this.affixed!=a){null!=this.unpin&&this.$element.css("top","");var l="affix"+(a?"-"+a:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=a,this.unpin="bottom"==a?this.getPinnedOffset():null,this.$element.removeClass(n.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==a&&this.$element.offset({top:r-e-s})}};var i=t.fn.affix;t.fn.affix=e,t.fn.affix.Constructor=n,t.fn.affix.noConflict=function(){return t.fn.affix=i,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var n=t(this),i=n.data();i.offset=i.offset||{},null!=i.offsetBottom&&(i.offset.bottom=i.offsetBottom),null!=i.offsetTop&&(i.offset.top=i.offsetTop),e.call(n,i)})})}(jQuery),/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
!function(t,e,n,i){"use strict";function o(t,e,n){return setTimeout(c(t,n),e)}function s(t,e,n){return Array.isArray(t)?(r(t,n[e],n),!0):!1}function r(t,e,n){var o;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==i)for(o=0;o<t.length;)e.call(n,t[o],o,t),o++;else for(o in t)t.hasOwnProperty(o)&&e.call(n,t[o],o,t)}function a(t,e,n){for(var o=Object.keys(e),s=0;s<o.length;)(!n||n&&t[o[s]]===i)&&(t[o[s]]=e[o[s]]),s++;return t}function l(t,e){return a(t,e,!0)}function h(t,e,n){var i,o=e.prototype;i=t.prototype=Object.create(o),i.constructor=t,i._super=o,n&&a(i,n)}function c(t,e){return function(){return t.apply(e,arguments)}}function u(t,e){return typeof t==ce?t.apply(e?e[0]||i:i,e):t}function d(t,e){return t===i?e:t}function p(t,e,n){r(v(e),function(e){t.addEventListener(e,n,!1)})}function f(t,e,n){r(v(e),function(e){t.removeEventListener(e,n,!1)})}function g(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function v(t){return t.trim().split(/\s+/g)}function y(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function b(t){return Array.prototype.slice.call(t,0)}function x(t,e,n){for(var i=[],o=[],s=0;s<t.length;){var r=e?t[s][e]:t[s];y(o,r)<0&&i.push(t[s]),o[s]=r,s++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function w(t,e){for(var n,o,s=e[0].toUpperCase()+e.slice(1),r=0;r<le.length;){if(n=le[r],o=n?n+s:e,o in t)return o;r++}return i}function C(){return fe++}function S(t){var e=t.ownerDocument;return e.defaultView||e.parentWindow}function T(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){u(t.options.enable,[t])&&n.handler(e)},this.init()}function k(t){var e,n=t.options.inputClass;return new(e=n?n:ve?H:ye?B:me?q:j)(t,E)}function E(t,e,n){var i=n.pointers.length,o=n.changedPointers.length,s=e&Te&&i-o===0,r=e&(Ee|Ae)&&i-o===0;n.isFirst=!!s,n.isFinal=!!r,s&&(t.session={}),n.eventType=e,A(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function A(t,e){var n=t.session,i=e.pointers,o=i.length;n.firstInput||(n.firstInput=N(e)),o>1&&!n.firstMultiple?n.firstMultiple=N(e):1===o&&(n.firstMultiple=!1);var s=n.firstInput,r=n.firstMultiple,a=r?r.center:s.center,l=e.center=D(i);e.timeStamp=pe(),e.deltaTime=e.timeStamp-s.timeStamp,e.angle=I(a,l),e.distance=$(a,l),L(n,e),e.offsetDirection=F(e.deltaX,e.deltaY),e.scale=r?M(r.pointers,i):1,e.rotation=r?O(r.pointers,i):0,P(n,e);var h=t.element;g(e.srcEvent.target,h)&&(h=e.srcEvent.target),e.target=h}function L(t,e){var n=e.center,i=t.offsetDelta||{},o=t.prevDelta||{},s=t.prevInput||{};(e.eventType===Te||s.eventType===Ee)&&(o=t.prevDelta={x:s.deltaX||0,y:s.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=o.x+(n.x-i.x),e.deltaY=o.y+(n.y-i.y)}function P(t,e){var n,o,s,r,a=t.lastInterval||e,l=e.timeStamp-a.timeStamp;if(e.eventType!=Ae&&(l>Se||a.velocity===i)){var h=a.deltaX-e.deltaX,c=a.deltaY-e.deltaY,u=R(l,h,c);o=u.x,s=u.y,n=de(u.x)>de(u.y)?u.x:u.y,r=F(h,c),t.lastInterval=e}else n=a.velocity,o=a.velocityX,s=a.velocityY,r=a.direction;e.velocity=n,e.velocityX=o,e.velocityY=s,e.direction=r}function N(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:ue(t.pointers[n].clientX),clientY:ue(t.pointers[n].clientY)},n++;return{timeStamp:pe(),pointers:e,center:D(e),deltaX:t.deltaX,deltaY:t.deltaY}}function D(t){var e=t.length;if(1===e)return{x:ue(t[0].clientX),y:ue(t[0].clientY)};for(var n=0,i=0,o=0;e>o;)n+=t[o].clientX,i+=t[o].clientY,o++;return{x:ue(n/e),y:ue(i/e)}}function R(t,e,n){return{x:e/t||0,y:n/t||0}}function F(t,e){return t===e?Le:de(t)>=de(e)?t>0?Pe:Ne:e>0?De:Re}function $(t,e,n){n||(n=Oe);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return Math.sqrt(i*i+o*o)}function I(t,e,n){n||(n=Oe);var i=e[n[0]]-t[n[0]],o=e[n[1]]-t[n[1]];return 180*Math.atan2(o,i)/Math.PI}function O(t,e){return I(e[1],e[0],Me)-I(t[1],t[0],Me)}function M(t,e){return $(e[0],e[1],Me)/$(t[0],t[1],Me)}function j(){this.evEl=He,this.evWin=We,this.allow=!0,this.pressed=!1,T.apply(this,arguments)}function H(){this.evEl=ze,this.evWin=qe,T.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function W(){this.evTarget=Ve,this.evWin=Ue,this.started=!1,T.apply(this,arguments)}function _(t,e){var n=b(t.touches),i=b(t.changedTouches);return e&(Ee|Ae)&&(n=x(n.concat(i),"identifier",!0)),[n,i]}function B(){this.evTarget=Qe,this.targetIds={},T.apply(this,arguments)}function z(t,e){var n=b(t.touches),i=this.targetIds;if(e&(Te|ke)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var o,s,r=b(t.changedTouches),a=[],l=this.target;if(s=n.filter(function(t){return g(t.target,l)}),e===Te)for(o=0;o<s.length;)i[s[o].identifier]=!0,o++;for(o=0;o<r.length;)i[r[o].identifier]&&a.push(r[o]),e&(Ee|Ae)&&delete i[r[o].identifier],o++;return a.length?[x(s.concat(a),"identifier",!0),a]:void 0}function q(){T.apply(this,arguments);var t=c(this.handler,this);this.touch=new B(this.manager,t),this.mouse=new j(this.manager,t)}function X(t,e){this.manager=t,this.set(e)}function V(t){if(m(t,en))return en;var e=m(t,nn),n=m(t,on);return e&&n?nn+" "+on:e||n?e?nn:on:m(t,tn)?tn:Ke}function U(t){this.id=C(),this.manager=null,this.options=l(t||{},this.defaults),this.options.enable=d(this.options.enable,!0),this.state=sn,this.simultaneous={},this.requireFail=[]}function Y(t){return t&cn?"cancel":t&ln?"end":t&an?"move":t&rn?"start":""}function Q(t){return t==Re?"down":t==De?"up":t==Pe?"left":t==Ne?"right":""}function G(t,e){var n=e.manager;return n?n.get(t):t}function J(){U.apply(this,arguments)}function Z(){J.apply(this,arguments),this.pX=null,this.pY=null}function K(){J.apply(this,arguments)}function te(){U.apply(this,arguments),this._timer=null,this._input=null}function ee(){J.apply(this,arguments)}function ne(){J.apply(this,arguments)}function ie(){U.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function oe(t,e){return e=e||{},e.recognizers=d(e.recognizers,oe.defaults.preset),new se(t,e)}function se(t,e){e=e||{},this.options=l(e,oe.defaults),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.element=t,this.input=k(this),this.touchAction=new X(this,this.options.touchAction),re(this,!0),r(e.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function re(t,e){var n=t.element;r(t.options.cssProps,function(t,i){n.style[w(n.style,i)]=e?t:""})}function ae(t,n){var i=e.createEvent("Event");i.initEvent(t,!0,!0),i.gesture=n,n.target.dispatchEvent(i)}var le=["","webkit","moz","MS","ms","o"],he=e.createElement("div"),ce="function",ue=Math.round,de=Math.abs,pe=Date.now,fe=1,ge=/mobile|tablet|ip(ad|hone|od)|android/i,me="ontouchstart"in t,ve=w(t,"PointerEvent")!==i,ye=me&&ge.test(navigator.userAgent),be="touch",xe="pen",we="mouse",Ce="kinect",Se=25,Te=1,ke=2,Ee=4,Ae=8,Le=1,Pe=2,Ne=4,De=8,Re=16,Fe=Pe|Ne,$e=De|Re,Ie=Fe|$e,Oe=["x","y"],Me=["clientX","clientY"];T.prototype={handler:function(){},init:function(){this.evEl&&p(this.element,this.evEl,this.domHandler),this.evTarget&&p(this.target,this.evTarget,this.domHandler),this.evWin&&p(S(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&f(this.element,this.evEl,this.domHandler),this.evTarget&&f(this.target,this.evTarget,this.domHandler),this.evWin&&f(S(this.element),this.evWin,this.domHandler)}};var je={mousedown:Te,mousemove:ke,mouseup:Ee},He="mousedown",We="mousemove mouseup";h(j,T,{handler:function(t){var e=je[t.type];e&Te&&0===t.button&&(this.pressed=!0),e&ke&&1!==t.which&&(e=Ee),this.pressed&&this.allow&&(e&Ee&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:we,srcEvent:t}))}});var _e={pointerdown:Te,pointermove:ke,pointerup:Ee,pointercancel:Ae,pointerout:Ae},Be={2:be,3:xe,4:we,5:Ce},ze="pointerdown",qe="pointermove pointerup pointercancel";t.MSPointerEvent&&(ze="MSPointerDown",qe="MSPointerMove MSPointerUp MSPointerCancel"),h(H,T,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),o=_e[i],s=Be[t.pointerType]||t.pointerType,r=s==be,a=y(e,t.pointerId,"pointerId");o&Te&&(0===t.button||r)?0>a&&(e.push(t),a=e.length-1):o&(Ee|Ae)&&(n=!0),0>a||(e[a]=t,this.callback(this.manager,o,{pointers:e,changedPointers:[t],pointerType:s,srcEvent:t}),n&&e.splice(a,1))}});var Xe={touchstart:Te,touchmove:ke,touchend:Ee,touchcancel:Ae},Ve="touchstart",Ue="touchstart touchmove touchend touchcancel";h(W,T,{handler:function(t){var e=Xe[t.type];if(e===Te&&(this.started=!0),this.started){var n=_.call(this,t,e);e&(Ee|Ae)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:be,srcEvent:t})}}});var Ye={touchstart:Te,touchmove:ke,touchend:Ee,touchcancel:Ae},Qe="touchstart touchmove touchend touchcancel";h(B,T,{handler:function(t){var e=Ye[t.type],n=z.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:be,srcEvent:t})}}),h(q,T,{handler:function(t,e,n){var i=n.pointerType==be,o=n.pointerType==we;if(i)this.mouse.allow=!1;else if(o&&!this.mouse.allow)return;e&(Ee|Ae)&&(this.mouse.allow=!0),this.callback(t,e,n)},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var Ge=w(he.style,"touchAction"),Je=Ge!==i,Ze="compute",Ke="auto",tn="manipulation",en="none",nn="pan-x",on="pan-y";X.prototype={set:function(t){t==Ze&&(t=this.compute()),Je&&(this.manager.element.style[Ge]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return r(this.manager.recognizers,function(e){u(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),V(t.join(" "))},preventDefaults:function(t){if(!Je){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,o=m(i,en),s=m(i,on),r=m(i,nn);return o||s&&n&Fe||r&&n&$e?this.preventSrc(e):void 0}},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var sn=1,rn=2,an=4,ln=8,hn=ln,cn=16,un=32;U.prototype={defaults:{},set:function(t){return a(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(s(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=G(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return s(t,"dropRecognizeWith",this)?this:(t=G(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(s(t,"requireFailure",this))return this;var e=this.requireFail;return t=G(t,this),-1===y(e,t)&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(s(t,"dropRequireFailure",this))return this;t=G(t,this);var e=y(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(n.options.event+(e?Y(i):""),t)}var n=this,i=this.state;ln>i&&e(!0),e(),i>=ln&&e(!0)},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=un)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(un|sn)))return!1;t++}return!0},recognize:function(t){var e=a({},t);return u(this.options.enable,[this,e])?(this.state&(hn|cn|un)&&(this.state=sn),this.state=this.process(e),void(this.state&(rn|an|ln|cn)&&this.tryEmit(e))):(this.reset(),void(this.state=un))},process:function(){},getTouchAction:function(){},reset:function(){}},h(J,U,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(rn|an),o=this.attrTest(t);return i&&(n&Ae||!o)?e|cn:i||o?n&Ee?e|ln:e&rn?e|an:rn:un}}),h(Z,J,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ie},getTouchAction:function(){var t=this.options.direction,e=[];return t&Fe&&e.push(on),t&$e&&e.push(nn),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,o=t.direction,s=t.deltaX,r=t.deltaY;return o&e.direction||(e.direction&Fe?(o=0===s?Le:0>s?Pe:Ne,n=s!=this.pX,i=Math.abs(t.deltaX)):(o=0===r?Le:0>r?De:Re,n=r!=this.pY,i=Math.abs(t.deltaY))),t.direction=o,n&&i>e.threshold&&o&e.direction},attrTest:function(t){return J.prototype.attrTest.call(this,t)&&(this.state&rn||!(this.state&rn)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=Q(t.direction);e&&this.manager.emit(this.options.event+e,t),this._super.emit.call(this,t)}}),h(K,J,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[en]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&rn)},emit:function(t){if(this._super.emit.call(this,t),1!==t.scale){var e=t.scale<1?"in":"out";this.manager.emit(this.options.event+e,t)}}}),h(te,U,{defaults:{event:"press",pointers:1,time:500,threshold:5},getTouchAction:function(){return[Ke]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(Ee|Ae)&&!s)this.reset();else if(t.eventType&Te)this.reset(),this._timer=o(function(){this.state=hn,this.tryEmit()},e.time,this);else if(t.eventType&Ee)return hn;return un},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===hn&&(t&&t.eventType&Ee?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=pe(),this.manager.emit(this.options.event,this._input)))}}),h(ee,J,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[en]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&rn)}}),h(ne,J,{defaults:{event:"swipe",threshold:10,velocity:.65,direction:Fe|$e,pointers:1},getTouchAction:function(){return Z.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Fe|$e)?e=t.velocity:n&Fe?e=t.velocityX:n&$e&&(e=t.velocityY),this._super.attrTest.call(this,t)&&n&t.direction&&t.distance>this.options.threshold&&de(e)>this.options.velocity&&t.eventType&Ee},emit:function(t){var e=Q(t.direction);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(ie,U,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:2,posThreshold:10},getTouchAction:function(){return[tn]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&Te&&0===this.count)return this.failTimeout();if(i&&s&&n){if(t.eventType!=Ee)return this.failTimeout();var r=this.pTime?t.timeStamp-this.pTime<e.interval:!0,a=!this.pCenter||$(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,a&&r?this.count+=1:this.count=1,this._input=t;var l=this.count%e.taps;if(0===l)return this.hasRequireFailures()?(this._timer=o(function(){this.state=hn,this.tryEmit()},e.interval,this),rn):hn}return un},failTimeout:function(){return this._timer=o(function(){this.state=un},this.options.interval,this),un},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==hn&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),oe.VERSION="2.0.4",oe.defaults={domEvents:!1,touchAction:Ze,enable:!0,inputTarget:null,inputClass:null,preset:[[ee,{enable:!1}],[K,{enable:!1},["rotate"]],[ne,{direction:Fe}],[Z,{direction:Fe},["swipe"]],[ie],[ie,{event:"doubletap",taps:2},["tap"]],[te]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var dn=1,pn=2;se.prototype={set:function(t){return a(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?pn:dn},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,o=e.curRecognizer;(!o||o&&o.state&hn)&&(o=e.curRecognizer=null);for(var s=0;s<i.length;)n=i[s],e.stopped===pn||o&&n!=o&&!n.canRecognizeWith(o)?n.reset():n.recognize(t),!o&&n.state&(rn|an|ln)&&(o=e.curRecognizer=n),s++}},get:function(t){if(t instanceof U)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(s(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(s(t,"remove",this))return this;var e=this.recognizers;return t=this.get(t),e.splice(y(e,t),1),this.touchAction.update(),this},on:function(t,e){var n=this.handlers;return r(v(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this},off:function(t,e){var n=this.handlers;return r(v(t),function(t){e?n[t].splice(y(n[t],e),1):delete n[t]}),this},emit:function(t,e){this.options.domEvents&&ae(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&re(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},a(oe,{INPUT_START:Te,INPUT_MOVE:ke,INPUT_END:Ee,INPUT_CANCEL:Ae,STATE_POSSIBLE:sn,STATE_BEGAN:rn,STATE_CHANGED:an,STATE_ENDED:ln,STATE_RECOGNIZED:hn,STATE_CANCELLED:cn,STATE_FAILED:un,DIRECTION_NONE:Le,DIRECTION_LEFT:Pe,DIRECTION_RIGHT:Ne,DIRECTION_UP:De,DIRECTION_DOWN:Re,DIRECTION_HORIZONTAL:Fe,DIRECTION_VERTICAL:$e,DIRECTION_ALL:Ie,Manager:se,Input:T,TouchAction:X,TouchInput:B,MouseInput:j,PointerEventInput:H,TouchMouseInput:q,SingleTouchInput:W,Recognizer:U,AttrRecognizer:J,Tap:ie,Pan:Z,Swipe:ne,Pinch:K,Rotate:ee,Press:te,on:p,off:f,each:r,merge:l,extend:a,inherit:h,bindFn:c,prefixed:w}),typeof define==ce&&define.amd?define(function(){return oe}):"undefined"!=typeof module&&module.exports?module.exports=oe:t[n]=oe}(window,document,"Hammer"),/*!
 * jQuery JavaScript Library v1.11.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-17T15:27Z
 */
function(t,e){"object"==typeof module&&"object"==typeof module.exports?module.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(t,e){function n(t){var e=t.length,n=oe.type(t);return"function"===n||oe.isWindow(t)?!1:1===t.nodeType&&e?!0:"array"===n||0===e||"number"==typeof e&&e>0&&e-1 in t}function i(t,e,n){if(oe.isFunction(e))return oe.grep(t,function(t,i){return!!e.call(t,i,t)!==n});if(e.nodeType)return oe.grep(t,function(t){return t===e!==n});if("string"==typeof e){if(de.test(e))return oe.filter(e,t,n);e=oe.filter(e,t)}return oe.grep(t,function(t){return oe.inArray(t,e)>=0!==n})}function o(t,e){do t=t[e];while(t&&1!==t.nodeType);return t}function s(t){var e=xe[t]={};return oe.each(t.match(be)||[],function(t,n){e[n]=!0}),e}function r(){fe.addEventListener?(fe.removeEventListener("DOMContentLoaded",a,!1),t.removeEventListener("load",a,!1)):(fe.detachEvent("onreadystatechange",a),t.detachEvent("onload",a))}function a(){(fe.addEventListener||"load"===event.type||"complete"===fe.readyState)&&(r(),oe.ready())}function l(t,e,n){if(void 0===n&&1===t.nodeType){var i="data-"+e.replace(ke,"-$1").toLowerCase();if(n=t.getAttribute(i),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:Te.test(n)?oe.parseJSON(n):n}catch(o){}oe.data(t,e,n)}else n=void 0}return n}function h(t){var e;for(e in t)if(("data"!==e||!oe.isEmptyObject(t[e]))&&"toJSON"!==e)return!1;return!0}function c(t,e,n,i){if(oe.acceptData(t)){var o,s,r=oe.expando,a=t.nodeType,l=a?oe.cache:t,h=a?t[r]:t[r]&&r;if(h&&l[h]&&(i||l[h].data)||void 0!==n||"string"!=typeof e)return h||(h=a?t[r]=Y.pop()||oe.guid++:r),l[h]||(l[h]=a?{}:{toJSON:oe.noop}),("object"==typeof e||"function"==typeof e)&&(i?l[h]=oe.extend(l[h],e):l[h].data=oe.extend(l[h].data,e)),s=l[h],i||(s.data||(s.data={}),s=s.data),void 0!==n&&(s[oe.camelCase(e)]=n),"string"==typeof e?(o=s[e],null==o&&(o=s[oe.camelCase(e)])):o=s,o}}function u(t,e,n){if(oe.acceptData(t)){var i,o,s=t.nodeType,r=s?oe.cache:t,a=s?t[oe.expando]:oe.expando;if(r[a]){if(e&&(i=n?r[a]:r[a].data)){oe.isArray(e)?e=e.concat(oe.map(e,oe.camelCase)):e in i?e=[e]:(e=oe.camelCase(e),e=e in i?[e]:e.split(" ")),o=e.length;for(;o--;)delete i[e[o]];if(n?!h(i):!oe.isEmptyObject(i))return}(n||(delete r[a].data,h(r[a])))&&(s?oe.cleanData([t],!0):ne.deleteExpando||r!=r.window?delete r[a]:r[a]=null)}}}function d(){return!0}function p(){return!1}function f(){try{return fe.activeElement}catch(t){}}function g(t){var e=Oe.split("|"),n=t.createDocumentFragment();if(n.createElement)for(;e.length;)n.createElement(e.pop());return n}function m(t,e){var n,i,o=0,s=typeof t.getElementsByTagName!==Se?t.getElementsByTagName(e||"*"):typeof t.querySelectorAll!==Se?t.querySelectorAll(e||"*"):void 0;if(!s)for(s=[],n=t.childNodes||t;null!=(i=n[o]);o++)!e||oe.nodeName(i,e)?s.push(i):oe.merge(s,m(i,e));return void 0===e||e&&oe.nodeName(t,e)?oe.merge([t],s):s}function v(t){Ne.test(t.type)&&(t.defaultChecked=t.checked)}function y(t,e){return oe.nodeName(t,"table")&&oe.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t}function b(t){return t.type=(null!==oe.find.attr(t,"type"))+"/"+t.type,t}function x(t){var e=Ue.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function w(t,e){for(var n,i=0;null!=(n=t[i]);i++)oe._data(n,"globalEval",!e||oe._data(e[i],"globalEval"))}function C(t,e){if(1===e.nodeType&&oe.hasData(t)){var n,i,o,s=oe._data(t),r=oe._data(e,s),a=s.events;if(a){delete r.handle,r.events={};for(n in a)for(i=0,o=a[n].length;o>i;i++)oe.event.add(e,n,a[n][i])}r.data&&(r.data=oe.extend({},r.data))}}function S(t,e){var n,i,o;if(1===e.nodeType){if(n=e.nodeName.toLowerCase(),!ne.noCloneEvent&&e[oe.expando]){o=oe._data(e);for(i in o.events)oe.removeEvent(e,i,o.handle);e.removeAttribute(oe.expando)}"script"===n&&e.text!==t.text?(b(e).text=t.text,x(e)):"object"===n?(e.parentNode&&(e.outerHTML=t.outerHTML),ne.html5Clone&&t.innerHTML&&!oe.trim(e.innerHTML)&&(e.innerHTML=t.innerHTML)):"input"===n&&Ne.test(t.type)?(e.defaultChecked=e.checked=t.checked,e.value!==t.value&&(e.value=t.value)):"option"===n?e.defaultSelected=e.selected=t.defaultSelected:("input"===n||"textarea"===n)&&(e.defaultValue=t.defaultValue)}}function T(e,n){var i,o=oe(n.createElement(e)).appendTo(n.body),s=t.getDefaultComputedStyle&&(i=t.getDefaultComputedStyle(o[0]))?i.display:oe.css(o[0],"display");return o.detach(),s}function k(t){var e=fe,n=Ke[t];return n||(n=T(t,e),"none"!==n&&n||(Ze=(Ze||oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=(Ze[0].contentWindow||Ze[0].contentDocument).document,e.write(),e.close(),n=T(t,e),Ze.detach()),Ke[t]=n),n}function E(t,e){return{get:function(){var n=t();if(null!=n)return n?void delete this.get:(this.get=e).apply(this,arguments)}}}function A(t,e){if(e in t)return e;for(var n=e.charAt(0).toUpperCase()+e.slice(1),i=e,o=pn.length;o--;)if(e=pn[o]+n,e in t)return e;return i}function L(t,e){for(var n,i,o,s=[],r=0,a=t.length;a>r;r++)i=t[r],i.style&&(s[r]=oe._data(i,"olddisplay"),n=i.style.display,e?(s[r]||"none"!==n||(i.style.display=""),""===i.style.display&&Le(i)&&(s[r]=oe._data(i,"olddisplay",k(i.nodeName)))):(o=Le(i),(n&&"none"!==n||!o)&&oe._data(i,"olddisplay",o?n:oe.css(i,"display"))));for(r=0;a>r;r++)i=t[r],i.style&&(e&&"none"!==i.style.display&&""!==i.style.display||(i.style.display=e?s[r]||"":"none"));return t}function P(t,e,n){var i=hn.exec(e);return i?Math.max(0,i[1]-(n||0))+(i[2]||"px"):e}function N(t,e,n,i,o){for(var s=n===(i?"border":"content")?4:"width"===e?1:0,r=0;4>s;s+=2)"margin"===n&&(r+=oe.css(t,n+Ae[s],!0,o)),i?("content"===n&&(r-=oe.css(t,"padding"+Ae[s],!0,o)),"margin"!==n&&(r-=oe.css(t,"border"+Ae[s]+"Width",!0,o))):(r+=oe.css(t,"padding"+Ae[s],!0,o),"padding"!==n&&(r+=oe.css(t,"border"+Ae[s]+"Width",!0,o)));return r}function D(t,e,n){var i=!0,o="width"===e?t.offsetWidth:t.offsetHeight,s=tn(t),r=ne.boxSizing&&"border-box"===oe.css(t,"boxSizing",!1,s);if(0>=o||null==o){if(o=en(t,e,s),(0>o||null==o)&&(o=t.style[e]),on.test(o))return o;i=r&&(ne.boxSizingReliable()||o===t.style[e]),o=parseFloat(o)||0}return o+N(t,e,n||(r?"border":"content"),i,s)+"px"}function R(t,e,n,i,o){return new R.prototype.init(t,e,n,i,o)}function F(){return setTimeout(function(){fn=void 0}),fn=oe.now()}function $(t,e){var n,i={height:t},o=0;for(e=e?1:0;4>o;o+=2-e)n=Ae[o],i["margin"+n]=i["padding"+n]=t;return e&&(i.opacity=i.width=t),i}function I(t,e,n){for(var i,o=(xn[e]||[]).concat(xn["*"]),s=0,r=o.length;r>s;s++)if(i=o[s].call(n,e,t))return i}function O(t,e,n){var i,o,s,r,a,l,h,c,u=this,d={},p=t.style,f=t.nodeType&&Le(t),g=oe._data(t,"fxshow");n.queue||(a=oe._queueHooks(t,"fx"),null==a.unqueued&&(a.unqueued=0,l=a.empty.fire,a.empty.fire=function(){a.unqueued||l()}),a.unqueued++,u.always(function(){u.always(function(){a.unqueued--,oe.queue(t,"fx").length||a.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],h=oe.css(t,"display"),c="none"===h?oe._data(t,"olddisplay")||k(t.nodeName):h,"inline"===c&&"none"===oe.css(t,"float")&&(ne.inlineBlockNeedsLayout&&"inline"!==k(t.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",ne.shrinkWrapBlocks()||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(i in e)if(o=e[i],mn.exec(o)){if(delete e[i],s=s||"toggle"===o,o===(f?"hide":"show")){if("show"!==o||!g||void 0===g[i])continue;f=!0}d[i]=g&&g[i]||oe.style(t,i)}else h=void 0;if(oe.isEmptyObject(d))"inline"===("none"===h?k(t.nodeName):h)&&(p.display=h);else{g?"hidden"in g&&(f=g.hidden):g=oe._data(t,"fxshow",{}),s&&(g.hidden=!f),f?oe(t).show():u.done(function(){oe(t).hide()}),u.done(function(){var e;oe._removeData(t,"fxshow");for(e in d)oe.style(t,e,d[e])});for(i in d)r=I(f?g[i]:0,i,u),i in g||(g[i]=r.start,f&&(r.end=r.start,r.start="width"===i||"height"===i?1:0))}}function M(t,e){var n,i,o,s,r;for(n in t)if(i=oe.camelCase(n),o=e[i],s=t[n],oe.isArray(s)&&(o=s[1],s=t[n]=s[0]),n!==i&&(t[i]=s,delete t[n]),r=oe.cssHooks[i],r&&"expand"in r){s=r.expand(s),delete t[i];for(n in s)n in t||(t[n]=s[n],e[n]=o)}else e[i]=o}function j(t,e,n){var i,o,s=0,r=bn.length,a=oe.Deferred().always(function(){delete l.elem}),l=function(){if(o)return!1;for(var e=fn||F(),n=Math.max(0,h.startTime+h.duration-e),i=n/h.duration||0,s=1-i,r=0,l=h.tweens.length;l>r;r++)h.tweens[r].run(s);return a.notifyWith(t,[h,s,n]),1>s&&l?n:(a.resolveWith(t,[h]),!1)},h=a.promise({elem:t,props:oe.extend({},e),opts:oe.extend(!0,{specialEasing:{}},n),originalProperties:e,originalOptions:n,startTime:fn||F(),duration:n.duration,tweens:[],createTween:function(e,n){var i=oe.Tween(t,h.opts,e,n,h.opts.specialEasing[e]||h.opts.easing);return h.tweens.push(i),i},stop:function(e){var n=0,i=e?h.tweens.length:0;if(o)return this;for(o=!0;i>n;n++)h.tweens[n].run(1);return e?a.resolveWith(t,[h,e]):a.rejectWith(t,[h,e]),this}}),c=h.props;for(M(c,h.opts.specialEasing);r>s;s++)if(i=bn[s].call(h,t,c,h.opts))return i;return oe.map(c,I,h),oe.isFunction(h.opts.start)&&h.opts.start.call(t,h),oe.fx.timer(oe.extend(l,{elem:t,anim:h,queue:h.opts.queue})),h.progress(h.opts.progress).done(h.opts.done,h.opts.complete).fail(h.opts.fail).always(h.opts.always)}function H(t){return function(e,n){"string"!=typeof e&&(n=e,e="*");var i,o=0,s=e.toLowerCase().match(be)||[];if(oe.isFunction(n))for(;i=s[o++];)"+"===i.charAt(0)?(i=i.slice(1)||"*",(t[i]=t[i]||[]).unshift(n)):(t[i]=t[i]||[]).push(n)}}function W(t,e,n,i){function o(a){var l;return s[a]=!0,oe.each(t[a]||[],function(t,a){var h=a(e,n,i);return"string"!=typeof h||r||s[h]?r?!(l=h):void 0:(e.dataTypes.unshift(h),o(h),!1)}),l}var s={},r=t===qn;return o(e.dataTypes[0])||!s["*"]&&o("*")}function _(t,e){var n,i,o=oe.ajaxSettings.flatOptions||{};for(i in e)void 0!==e[i]&&((o[i]?t:n||(n={}))[i]=e[i]);return n&&oe.extend(!0,t,n),t}function B(t,e,n){for(var i,o,s,r,a=t.contents,l=t.dataTypes;"*"===l[0];)l.shift(),void 0===o&&(o=t.mimeType||e.getResponseHeader("Content-Type"));if(o)for(r in a)if(a[r]&&a[r].test(o)){l.unshift(r);break}if(l[0]in n)s=l[0];else{for(r in n){if(!l[0]||t.converters[r+" "+l[0]]){s=r;break}i||(i=r)}s=s||i}return s?(s!==l[0]&&l.unshift(s),n[s]):void 0}function z(t,e,n,i){var o,s,r,a,l,h={},c=t.dataTypes.slice();if(c[1])for(r in t.converters)h[r.toLowerCase()]=t.converters[r];for(s=c.shift();s;)if(t.responseFields[s]&&(n[t.responseFields[s]]=e),!l&&i&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),l=s,s=c.shift())if("*"===s)s=l;else if("*"!==l&&l!==s){if(r=h[l+" "+s]||h["* "+s],!r)for(o in h)if(a=o.split(" "),a[1]===s&&(r=h[l+" "+a[0]]||h["* "+a[0]])){r===!0?r=h[o]:h[o]!==!0&&(s=a[0],c.unshift(a[1]));break}if(r!==!0)if(r&&t["throws"])e=r(e);else try{e=r(e)}catch(u){return{state:"parsererror",error:r?u:"No conversion from "+l+" to "+s}}}return{state:"success",data:e}}function q(t,e,n,i){var o;if(oe.isArray(e))oe.each(e,function(e,o){n||Yn.test(t)?i(t,o):q(t+"["+("object"==typeof o?e:"")+"]",o,n,i)});else if(n||"object"!==oe.type(e))i(t,e);else for(o in e)q(t+"["+o+"]",e[o],n,i)}function X(){try{return new t.XMLHttpRequest}catch(e){}}function V(){try{return new t.ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}function U(t){return oe.isWindow(t)?t:9===t.nodeType?t.defaultView||t.parentWindow:!1}var Y=[],Q=Y.slice,G=Y.concat,J=Y.push,Z=Y.indexOf,K={},te=K.toString,ee=K.hasOwnProperty,ne={},ie="1.11.2",oe=function(t,e){return new oe.fn.init(t,e)},se=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,re=/^-ms-/,ae=/-([\da-z])/gi,le=function(t,e){return e.toUpperCase()};oe.fn=oe.prototype={jquery:ie,constructor:oe,selector:"",length:0,toArray:function(){return Q.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:Q.call(this)},pushStack:function(t){var e=oe.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t,e){return oe.each(this,t,e)},map:function(t){return this.pushStack(oe.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return this.pushStack(Q.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,n=+t+(0>t?e:0);return this.pushStack(n>=0&&e>n?[this[n]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:J,sort:Y.sort,splice:Y.splice},oe.extend=oe.fn.extend=function(){var t,e,n,i,o,s,r=arguments[0]||{},a=1,l=arguments.length,h=!1;for("boolean"==typeof r&&(h=r,r=arguments[a]||{},a++),"object"==typeof r||oe.isFunction(r)||(r={}),a===l&&(r=this,a--);l>a;a++)if(null!=(o=arguments[a]))for(i in o)t=r[i],n=o[i],r!==n&&(h&&n&&(oe.isPlainObject(n)||(e=oe.isArray(n)))?(e?(e=!1,s=t&&oe.isArray(t)?t:[]):s=t&&oe.isPlainObject(t)?t:{},r[i]=oe.extend(h,s,n)):void 0!==n&&(r[i]=n));return r},oe.extend({expando:"jQuery"+(ie+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===oe.type(t)},isArray:Array.isArray||function(t){return"array"===oe.type(t)},isWindow:function(t){return null!=t&&t==t.window},isNumeric:function(t){return!oe.isArray(t)&&t-parseFloat(t)+1>=0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},isPlainObject:function(t){var e;if(!t||"object"!==oe.type(t)||t.nodeType||oe.isWindow(t))return!1;try{if(t.constructor&&!ee.call(t,"constructor")&&!ee.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}if(ne.ownLast)for(e in t)return ee.call(t,e);for(e in t);return void 0===e||ee.call(t,e)},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?K[te.call(t)]||"object":typeof t},globalEval:function(e){e&&oe.trim(e)&&(t.execScript||function(e){t.eval.call(t,e)})(e)},camelCase:function(t){return t.replace(re,"ms-").replace(ae,le)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e,i){var o,s=0,r=t.length,a=n(t);if(i){if(a)for(;r>s&&(o=e.apply(t[s],i),o!==!1);s++);else for(s in t)if(o=e.apply(t[s],i),o===!1)break}else if(a)for(;r>s&&(o=e.call(t[s],s,t[s]),o!==!1);s++);else for(s in t)if(o=e.call(t[s],s,t[s]),o===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(se,"")},makeArray:function(t,e){var i=e||[];return null!=t&&(n(Object(t))?oe.merge(i,"string"==typeof t?[t]:t):J.call(i,t)),i},inArray:function(t,e,n){var i;if(e){if(Z)return Z.call(e,t,n);for(i=e.length,n=n?0>n?Math.max(0,i+n):n:0;i>n;n++)if(n in e&&e[n]===t)return n}return-1},merge:function(t,e){for(var n=+e.length,i=0,o=t.length;n>i;)t[o++]=e[i++];if(n!==n)for(;void 0!==e[i];)t[o++]=e[i++];return t.length=o,t},grep:function(t,e,n){for(var i,o=[],s=0,r=t.length,a=!n;r>s;s++)i=!e(t[s],s),i!==a&&o.push(t[s]);return o},map:function(t,e,i){var o,s=0,r=t.length,a=n(t),l=[];if(a)for(;r>s;s++)o=e(t[s],s,i),null!=o&&l.push(o);else for(s in t)o=e(t[s],s,i),null!=o&&l.push(o);return G.apply([],l)},guid:1,proxy:function(t,e){var n,i,o;return"string"==typeof e&&(o=t[e],e=t,t=o),oe.isFunction(t)?(n=Q.call(arguments,2),i=function(){return t.apply(e||this,n.concat(Q.call(arguments)))},i.guid=t.guid=t.guid||oe.guid++,i):void 0},now:function(){return+new Date},support:ne}),oe.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){K["[object "+e+"]"]=e.toLowerCase()});var he=/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
function(t){function e(t,e,n,i){var o,s,r,a,l,h,u,p,f,g;if((e?e.ownerDocument||e:W)!==R&&D(e),e=e||R,n=n||[],a=e.nodeType,"string"!=typeof t||!t||1!==a&&9!==a&&11!==a)return n;if(!i&&$){if(11!==a&&(o=ye.exec(t)))if(r=o[1]){if(9===a){if(s=e.getElementById(r),!s||!s.parentNode)return n;if(s.id===r)return n.push(s),n}else if(e.ownerDocument&&(s=e.ownerDocument.getElementById(r))&&j(e,s)&&s.id===r)return n.push(s),n}else{if(o[2])return Z.apply(n,e.getElementsByTagName(t)),n;if((r=o[3])&&w.getElementsByClassName)return Z.apply(n,e.getElementsByClassName(r)),n}if(w.qsa&&(!I||!I.test(t))){if(p=u=H,f=e,g=1!==a&&t,1===a&&"object"!==e.nodeName.toLowerCase()){for(h=k(t),(u=e.getAttribute("id"))?p=u.replace(xe,"\\$&"):e.setAttribute("id",p),p="[id='"+p+"'] ",l=h.length;l--;)h[l]=p+d(h[l]);f=be.test(t)&&c(e.parentNode)||e,g=h.join(",")}if(g)try{return Z.apply(n,f.querySelectorAll(g)),n}catch(m){}finally{u||e.removeAttribute("id")}}}return A(t.replace(le,"$1"),e,n,i)}function n(){function t(n,i){return e.push(n+" ")>C.cacheLength&&delete t[e.shift()],t[n+" "]=i}var e=[];return t}function i(t){return t[H]=!0,t}function o(t){var e=R.createElement("div");try{return!!t(e)}catch(n){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function s(t,e){for(var n=t.split("|"),i=t.length;i--;)C.attrHandle[n[i]]=e}function r(t,e){var n=e&&t,i=n&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||U)-(~t.sourceIndex||U);if(i)return i;if(n)for(;n=n.nextSibling;)if(n===e)return-1;return t?1:-1}function a(t){return function(e){var n=e.nodeName.toLowerCase();return"input"===n&&e.type===t}}function l(t){return function(e){var n=e.nodeName.toLowerCase();return("input"===n||"button"===n)&&e.type===t}}function h(t){return i(function(e){return e=+e,i(function(n,i){for(var o,s=t([],n.length,e),r=s.length;r--;)n[o=s[r]]&&(n[o]=!(i[o]=n[o]))})})}function c(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function u(){}function d(t){for(var e=0,n=t.length,i="";n>e;e++)i+=t[e].value;return i}function p(t,e,n){var i=e.dir,o=n&&"parentNode"===i,s=B++;return e.first?function(e,n,s){for(;e=e[i];)if(1===e.nodeType||o)return t(e,n,s)}:function(e,n,r){var a,l,h=[_,s];if(r){for(;e=e[i];)if((1===e.nodeType||o)&&t(e,n,r))return!0}else for(;e=e[i];)if(1===e.nodeType||o){if(l=e[H]||(e[H]={}),(a=l[i])&&a[0]===_&&a[1]===s)return h[2]=a[2];if(l[i]=h,h[2]=t(e,n,r))return!0}}}function f(t){return t.length>1?function(e,n,i){for(var o=t.length;o--;)if(!t[o](e,n,i))return!1;return!0}:t[0]}function g(t,n,i){for(var o=0,s=n.length;s>o;o++)e(t,n[o],i);return i}function m(t,e,n,i,o){for(var s,r=[],a=0,l=t.length,h=null!=e;l>a;a++)(s=t[a])&&(!n||n(s,i,o))&&(r.push(s),h&&e.push(a));return r}function v(t,e,n,o,s,r){return o&&!o[H]&&(o=v(o)),s&&!s[H]&&(s=v(s,r)),i(function(i,r,a,l){var h,c,u,d=[],p=[],f=r.length,v=i||g(e||"*",a.nodeType?[a]:a,[]),y=!t||!i&&e?v:m(v,d,t,a,l),b=n?s||(i?t:f||o)?[]:r:y;if(n&&n(y,b,a,l),o)for(h=m(b,p),o(h,[],a,l),c=h.length;c--;)(u=h[c])&&(b[p[c]]=!(y[p[c]]=u));if(i){if(s||t){if(s){for(h=[],c=b.length;c--;)(u=b[c])&&h.push(y[c]=u);s(null,b=[],h,l)}for(c=b.length;c--;)(u=b[c])&&(h=s?te(i,u):d[c])>-1&&(i[h]=!(r[h]=u))}}else b=m(b===r?b.splice(f,b.length):b),s?s(null,r,b,l):Z.apply(r,b)})}function y(t){for(var e,n,i,o=t.length,s=C.relative[t[0].type],r=s||C.relative[" "],a=s?1:0,l=p(function(t){return t===e},r,!0),h=p(function(t){return te(e,t)>-1},r,!0),c=[function(t,n,i){var o=!s&&(i||n!==L)||((e=n).nodeType?l(t,n,i):h(t,n,i));return e=null,o}];o>a;a++)if(n=C.relative[t[a].type])c=[p(f(c),n)];else{if(n=C.filter[t[a].type].apply(null,t[a].matches),n[H]){for(i=++a;o>i&&!C.relative[t[i].type];i++);return v(a>1&&f(c),a>1&&d(t.slice(0,a-1).concat({value:" "===t[a-2].type?"*":""})).replace(le,"$1"),n,i>a&&y(t.slice(a,i)),o>i&&y(t=t.slice(i)),o>i&&d(t))}c.push(n)}return f(c)}function b(t,n){var o=n.length>0,s=t.length>0,r=function(i,r,a,l,h){var c,u,d,p=0,f="0",g=i&&[],v=[],y=L,b=i||s&&C.find.TAG("*",h),x=_+=null==y?1:Math.random()||.1,w=b.length;for(h&&(L=r!==R&&r);f!==w&&null!=(c=b[f]);f++){if(s&&c){for(u=0;d=t[u++];)if(d(c,r,a)){l.push(c);break}h&&(_=x)}o&&((c=!d&&c)&&p--,i&&g.push(c))}if(p+=f,o&&f!==p){for(u=0;d=n[u++];)d(g,v,r,a);if(i){if(p>0)for(;f--;)g[f]||v[f]||(v[f]=G.call(l));v=m(v)}Z.apply(l,v),h&&!i&&v.length>0&&p+n.length>1&&e.uniqueSort(l)}return h&&(_=x,L=y),g};return o?i(r):r}var x,w,C,S,T,k,E,A,L,P,N,D,R,F,$,I,O,M,j,H="sizzle"+1*new Date,W=t.document,_=0,B=0,z=n(),q=n(),X=n(),V=function(t,e){return t===e&&(N=!0),0},U=1<<31,Y={}.hasOwnProperty,Q=[],G=Q.pop,J=Q.push,Z=Q.push,K=Q.slice,te=function(t,e){for(var n=0,i=t.length;i>n;n++)if(t[n]===e)return n;return-1},ee="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ne="[\\x20\\t\\r\\n\\f]",ie="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",oe=ie.replace("w","w#"),se="\\["+ne+"*("+ie+")(?:"+ne+"*([*^$|!~]?=)"+ne+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+oe+"))|)"+ne+"*\\]",re=":("+ie+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+se+")*)|.*)\\)|)",ae=new RegExp(ne+"+","g"),le=new RegExp("^"+ne+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ne+"+$","g"),he=new RegExp("^"+ne+"*,"+ne+"*"),ce=new RegExp("^"+ne+"*([>+~]|"+ne+")"+ne+"*"),ue=new RegExp("="+ne+"*([^\\]'\"]*?)"+ne+"*\\]","g"),de=new RegExp(re),pe=new RegExp("^"+oe+"$"),fe={ID:new RegExp("^#("+ie+")"),CLASS:new RegExp("^\\.("+ie+")"),TAG:new RegExp("^("+ie.replace("w","w*")+")"),ATTR:new RegExp("^"+se),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ne+"*(even|odd|(([+-]|)(\\d*)n|)"+ne+"*(?:([+-]|)"+ne+"*(\\d+)|))"+ne+"*\\)|)","i"),bool:new RegExp("^(?:"+ee+")$","i"),needsContext:new RegExp("^"+ne+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ne+"*((?:-\\d)?\\d*)"+ne+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,me=/^h\d$/i,ve=/^[^{]+\{\s*\[native \w/,ye=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,be=/[+~]/,xe=/'|\\/g,we=new RegExp("\\\\([\\da-f]{1,6}"+ne+"?|("+ne+")|.)","ig"),Ce=function(t,e,n){var i="0x"+e-65536;return i!==i||n?e:0>i?String.fromCharCode(i+65536):String.fromCharCode(i>>10|55296,1023&i|56320)},Se=function(){D()};try{Z.apply(Q=K.call(W.childNodes),W.childNodes),Q[W.childNodes.length].nodeType}catch(Te){Z={apply:Q.length?function(t,e){J.apply(t,K.call(e))}:function(t,e){for(var n=t.length,i=0;t[n++]=e[i++];);t.length=n-1}}}w=e.support={},T=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},D=e.setDocument=function(t){var e,n,i=t?t.ownerDocument||t:W;return i!==R&&9===i.nodeType&&i.documentElement?(R=i,F=i.documentElement,n=i.defaultView,n&&n!==n.top&&(n.addEventListener?n.addEventListener("unload",Se,!1):n.attachEvent&&n.attachEvent("onunload",Se)),$=!T(i),w.attributes=o(function(t){return t.className="i",!t.getAttribute("className")}),w.getElementsByTagName=o(function(t){return t.appendChild(i.createComment("")),!t.getElementsByTagName("*").length}),w.getElementsByClassName=ve.test(i.getElementsByClassName),w.getById=o(function(t){return F.appendChild(t).id=H,!i.getElementsByName||!i.getElementsByName(H).length}),w.getById?(C.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&$){var n=e.getElementById(t);return n&&n.parentNode?[n]:[]}},C.filter.ID=function(t){var e=t.replace(we,Ce);return function(t){return t.getAttribute("id")===e}}):(delete C.find.ID,C.filter.ID=function(t){var e=t.replace(we,Ce);return function(t){var n="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return n&&n.value===e}}),C.find.TAG=w.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):w.qsa?e.querySelectorAll(t):void 0}:function(t,e){var n,i=[],o=0,s=e.getElementsByTagName(t);if("*"===t){for(;n=s[o++];)1===n.nodeType&&i.push(n);return i}return s},C.find.CLASS=w.getElementsByClassName&&function(t,e){return $?e.getElementsByClassName(t):void 0},O=[],I=[],(w.qsa=ve.test(i.querySelectorAll))&&(o(function(t){F.appendChild(t).innerHTML="<a id='"+H+"'></a><select id='"+H+"-\f]' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&I.push("[*^$]="+ne+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||I.push("\\["+ne+"*(?:value|"+ee+")"),t.querySelectorAll("[id~="+H+"-]").length||I.push("~="),t.querySelectorAll(":checked").length||I.push(":checked"),t.querySelectorAll("a#"+H+"+*").length||I.push(".#.+[+~]")}),o(function(t){var e=i.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&I.push("name"+ne+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||I.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),I.push(",.*:")})),(w.matchesSelector=ve.test(M=F.matches||F.webkitMatchesSelector||F.mozMatchesSelector||F.oMatchesSelector||F.msMatchesSelector))&&o(function(t){w.disconnectedMatch=M.call(t,"div"),M.call(t,"[s!='']:x"),O.push("!=",re)}),I=I.length&&new RegExp(I.join("|")),O=O.length&&new RegExp(O.join("|")),e=ve.test(F.compareDocumentPosition),j=e||ve.test(F.contains)?function(t,e){var n=9===t.nodeType?t.documentElement:t,i=e&&e.parentNode;return t===i||!(!i||1!==i.nodeType||!(n.contains?n.contains(i):t.compareDocumentPosition&&16&t.compareDocumentPosition(i)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},V=e?function(t,e){if(t===e)return N=!0,0;var n=!t.compareDocumentPosition-!e.compareDocumentPosition;return n?n:(n=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&n||!w.sortDetached&&e.compareDocumentPosition(t)===n?t===i||t.ownerDocument===W&&j(W,t)?-1:e===i||e.ownerDocument===W&&j(W,e)?1:P?te(P,t)-te(P,e):0:4&n?-1:1)}:function(t,e){if(t===e)return N=!0,0;var n,o=0,s=t.parentNode,a=e.parentNode,l=[t],h=[e];if(!s||!a)return t===i?-1:e===i?1:s?-1:a?1:P?te(P,t)-te(P,e):0;if(s===a)return r(t,e);for(n=t;n=n.parentNode;)l.unshift(n);for(n=e;n=n.parentNode;)h.unshift(n);for(;l[o]===h[o];)o++;return o?r(l[o],h[o]):l[o]===W?-1:h[o]===W?1:0},i):R},e.matches=function(t,n){return e(t,null,null,n)},e.matchesSelector=function(t,n){if((t.ownerDocument||t)!==R&&D(t),n=n.replace(ue,"='$1']"),!(!w.matchesSelector||!$||O&&O.test(n)||I&&I.test(n)))try{var i=M.call(t,n);if(i||w.disconnectedMatch||t.document&&11!==t.document.nodeType)return i}catch(o){}return e(n,R,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==R&&D(t),j(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==R&&D(t);var n=C.attrHandle[e.toLowerCase()],i=n&&Y.call(C.attrHandle,e.toLowerCase())?n(t,e,!$):void 0;return void 0!==i?i:w.attributes||!$?t.getAttribute(e):(i=t.getAttributeNode(e))&&i.specified?i.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,n=[],i=0,o=0;if(N=!w.detectDuplicates,P=!w.sortStable&&t.slice(0),t.sort(V),N){for(;e=t[o++];)e===t[o]&&(i=n.push(o));for(;i--;)t.splice(n[i],1)}return P=null,t},S=e.getText=function(t){var e,n="",i=0,o=t.nodeType;if(o){if(1===o||9===o||11===o){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)n+=S(t)}else if(3===o||4===o)return t.nodeValue}else for(;e=t[i++];)n+=S(e);return n},C=e.selectors={cacheLength:50,createPseudo:i,match:fe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(we,Ce),t[3]=(t[3]||t[4]||t[5]||"").replace(we,Ce),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,n=!t[6]&&t[2];return fe.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":n&&de.test(n)&&(e=k(n,!0))&&(e=n.indexOf(")",n.length-e)-n.length)&&(t[0]=t[0].slice(0,e),t[2]=n.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(we,Ce).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=z[t+" "];return e||(e=new RegExp("(^|"+ne+")"+t+"("+ne+"|$)"))&&z(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,n,i){return function(o){var s=e.attr(o,t);return null==s?"!="===n:n?(s+="","="===n?s===i:"!="===n?s!==i:"^="===n?i&&0===s.indexOf(i):"*="===n?i&&s.indexOf(i)>-1:"$="===n?i&&s.slice(-i.length)===i:"~="===n?(" "+s.replace(ae," ")+" ").indexOf(i)>-1:"|="===n?s===i||s.slice(0,i.length+1)===i+"-":!1):!0}},CHILD:function(t,e,n,i,o){var s="nth"!==t.slice(0,3),r="last"!==t.slice(-4),a="of-type"===e;return 1===i&&0===o?function(t){return!!t.parentNode}:function(e,n,l){var h,c,u,d,p,f,g=s!==r?"nextSibling":"previousSibling",m=e.parentNode,v=a&&e.nodeName.toLowerCase(),y=!l&&!a;if(m){if(s){for(;g;){for(u=e;u=u[g];)if(a?u.nodeName.toLowerCase()===v:1===u.nodeType)return!1;f=g="only"===t&&!f&&"nextSibling"}return!0}if(f=[r?m.firstChild:m.lastChild],r&&y){for(c=m[H]||(m[H]={}),h=c[t]||[],p=h[0]===_&&h[1],d=h[0]===_&&h[2],u=p&&m.childNodes[p];u=++p&&u&&u[g]||(d=p=0)||f.pop();)if(1===u.nodeType&&++d&&u===e){c[t]=[_,p,d];break}}else if(y&&(h=(e[H]||(e[H]={}))[t])&&h[0]===_)d=h[1];else for(;(u=++p&&u&&u[g]||(d=p=0)||f.pop())&&((a?u.nodeName.toLowerCase()!==v:1!==u.nodeType)||!++d||(y&&((u[H]||(u[H]={}))[t]=[_,d]),u!==e)););return d-=o,d===i||d%i===0&&d/i>=0}}},PSEUDO:function(t,n){var o,s=C.pseudos[t]||C.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return s[H]?s(n):s.length>1?(o=[t,t,"",n],C.setFilters.hasOwnProperty(t.toLowerCase())?i(function(t,e){for(var i,o=s(t,n),r=o.length;r--;)i=te(t,o[r]),t[i]=!(e[i]=o[r])}):function(t){return s(t,0,o)}):s}},pseudos:{not:i(function(t){var e=[],n=[],o=E(t.replace(le,"$1"));return o[H]?i(function(t,e,n,i){for(var s,r=o(t,null,i,[]),a=t.length;a--;)(s=r[a])&&(t[a]=!(e[a]=s))}):function(t,i,s){return e[0]=t,o(e,null,s,n),e[0]=null,!n.pop()}}),has:i(function(t){return function(n){return e(t,n).length>0}}),contains:i(function(t){return t=t.replace(we,Ce),function(e){return(e.textContent||e.innerText||S(e)).indexOf(t)>-1}}),lang:i(function(t){return pe.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(we,Ce).toLowerCase(),function(e){var n;do if(n=$?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return n=n.toLowerCase(),n===t||0===n.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var n=t.location&&t.location.hash;return n&&n.slice(1)===e.id},root:function(t){return t===F},focus:function(t){return t===R.activeElement&&(!R.hasFocus||R.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!C.pseudos.empty(t)},header:function(t){return me.test(t.nodeName)},input:function(t){return ge.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:h(function(){return[0]}),last:h(function(t,e){return[e-1]}),eq:h(function(t,e,n){return[0>n?n+e:n]}),even:h(function(t,e){for(var n=0;e>n;n+=2)t.push(n);return t}),odd:h(function(t,e){for(var n=1;e>n;n+=2)t.push(n);return t}),lt:h(function(t,e,n){for(var i=0>n?n+e:n;--i>=0;)t.push(i);return t}),gt:h(function(t,e,n){for(var i=0>n?n+e:n;++i<e;)t.push(i);return t})}},C.pseudos.nth=C.pseudos.eq;for(x in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})C.pseudos[x]=a(x);for(x in{submit:!0,reset:!0})C.pseudos[x]=l(x);return u.prototype=C.filters=C.pseudos,C.setFilters=new u,k=e.tokenize=function(t,n){var i,o,s,r,a,l,h,c=q[t+" "];if(c)return n?0:c.slice(0);for(a=t,l=[],h=C.preFilter;a;){(!i||(o=he.exec(a)))&&(o&&(a=a.slice(o[0].length)||a),l.push(s=[])),i=!1,(o=ce.exec(a))&&(i=o.shift(),s.push({value:i,type:o[0].replace(le," ")}),a=a.slice(i.length));for(r in C.filter)!(o=fe[r].exec(a))||h[r]&&!(o=h[r](o))||(i=o.shift(),s.push({value:i,type:r,matches:o}),a=a.slice(i.length));if(!i)break}return n?a.length:a?e.error(t):q(t,l).slice(0)},E=e.compile=function(t,e){var n,i=[],o=[],s=X[t+" "];if(!s){for(e||(e=k(t)),n=e.length;n--;)s=y(e[n]),s[H]?i.push(s):o.push(s);s=X(t,b(o,i)),s.selector=t}return s},A=e.select=function(t,e,n,i){var o,s,r,a,l,h="function"==typeof t&&t,u=!i&&k(t=h.selector||t);if(n=n||[],1===u.length){if(s=u[0]=u[0].slice(0),s.length>2&&"ID"===(r=s[0]).type&&w.getById&&9===e.nodeType&&$&&C.relative[s[1].type]){if(e=(C.find.ID(r.matches[0].replace(we,Ce),e)||[])[0],!e)return n;h&&(e=e.parentNode),t=t.slice(s.shift().value.length)}for(o=fe.needsContext.test(t)?0:s.length;o--&&(r=s[o],!C.relative[a=r.type]);)if((l=C.find[a])&&(i=l(r.matches[0].replace(we,Ce),be.test(s[0].type)&&c(e.parentNode)||e))){if(s.splice(o,1),t=i.length&&d(s),!t)return Z.apply(n,i),n;break}}return(h||E(t,u))(i,e,!$,n,be.test(t)&&c(e.parentNode)||e),n},w.sortStable=H.split("").sort(V).join("")===H,w.detectDuplicates=!!N,D(),w.sortDetached=o(function(t){return 1&t.compareDocumentPosition(R.createElement("div"))}),o(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||s("type|href|height|width",function(t,e,n){return n?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),w.attributes&&o(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||s("value",function(t,e,n){return n||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),o(function(t){return null==t.getAttribute("disabled")})||s(ee,function(t,e,n){var i;return n?void 0:t[e]===!0?e.toLowerCase():(i=t.getAttributeNode(e))&&i.specified?i.value:null}),e}(t);oe.find=he,oe.expr=he.selectors,oe.expr[":"]=oe.expr.pseudos,oe.unique=he.uniqueSort,oe.text=he.getText,oe.isXMLDoc=he.isXML,oe.contains=he.contains;var ce=oe.expr.match.needsContext,ue=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,de=/^.[^:#\[\.,]*$/;oe.filter=function(t,e,n){var i=e[0];return n&&(t=":not("+t+")"),1===e.length&&1===i.nodeType?oe.find.matchesSelector(i,t)?[i]:[]:oe.find.matches(t,oe.grep(e,function(t){return 1===t.nodeType}))},oe.fn.extend({find:function(t){var e,n=[],i=this,o=i.length;if("string"!=typeof t)return this.pushStack(oe(t).filter(function(){for(e=0;o>e;e++)if(oe.contains(i[e],this))return!0}));for(e=0;o>e;e++)oe.find(t,i[e],n);return n=this.pushStack(o>1?oe.unique(n):n),n.selector=this.selector?this.selector+" "+t:t,n},filter:function(t){return this.pushStack(i(this,t||[],!1))},not:function(t){return this.pushStack(i(this,t||[],!0))},is:function(t){return!!i(this,"string"==typeof t&&ce.test(t)?oe(t):t||[],!1).length}});var pe,fe=t.document,ge=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,me=oe.fn.init=function(t,e){var n,i;if(!t)return this;if("string"==typeof t){if(n="<"===t.charAt(0)&&">"===t.charAt(t.length-1)&&t.length>=3?[null,t,null]:ge.exec(t),!n||!n[1]&&e)return!e||e.jquery?(e||pe).find(t):this.constructor(e).find(t);if(n[1]){if(e=e instanceof oe?e[0]:e,oe.merge(this,oe.parseHTML(n[1],e&&e.nodeType?e.ownerDocument||e:fe,!0)),ue.test(n[1])&&oe.isPlainObject(e))for(n in e)oe.isFunction(this[n])?this[n](e[n]):this.attr(n,e[n]);return this}if(i=fe.getElementById(n[2]),i&&i.parentNode){if(i.id!==n[2])return pe.find(t);this.length=1,this[0]=i}return this.context=fe,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,this):oe.isFunction(t)?"undefined"!=typeof pe.ready?pe.ready(t):t(oe):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),oe.makeArray(t,this))};me.prototype=oe.fn,pe=oe(fe);var ve=/^(?:parents|prev(?:Until|All))/,ye={children:!0,contents:!0,next:!0,prev:!0};oe.extend({dir:function(t,e,n){for(var i=[],o=t[e];o&&9!==o.nodeType&&(void 0===n||1!==o.nodeType||!oe(o).is(n));)1===o.nodeType&&i.push(o),o=o[e];return i},sibling:function(t,e){for(var n=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&n.push(t);return n}}),oe.fn.extend({has:function(t){var e,n=oe(t,this),i=n.length;return this.filter(function(){for(e=0;i>e;e++)if(oe.contains(this,n[e]))return!0})},closest:function(t,e){for(var n,i=0,o=this.length,s=[],r=ce.test(t)||"string"!=typeof t?oe(t,e||this.context):0;o>i;i++)for(n=this[i];n&&n!==e;n=n.parentNode)if(n.nodeType<11&&(r?r.index(n)>-1:1===n.nodeType&&oe.find.matchesSelector(n,t))){s.push(n);break}return this.pushStack(s.length>1?oe.unique(s):s)},index:function(t){return t?"string"==typeof t?oe.inArray(this[0],oe(t)):oe.inArray(t.jquery?t[0]:t,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(oe.unique(oe.merge(this.get(),oe(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),oe.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return oe.dir(t,"parentNode")},parentsUntil:function(t,e,n){return oe.dir(t,"parentNode",n)},next:function(t){return o(t,"nextSibling")},prev:function(t){return o(t,"previousSibling")},nextAll:function(t){return oe.dir(t,"nextSibling")},prevAll:function(t){return oe.dir(t,"previousSibling")},nextUntil:function(t,e,n){return oe.dir(t,"nextSibling",n)},prevUntil:function(t,e,n){return oe.dir(t,"previousSibling",n)},siblings:function(t){return oe.sibling((t.parentNode||{}).firstChild,t)},children:function(t){return oe.sibling(t.firstChild)},contents:function(t){return oe.nodeName(t,"iframe")?t.contentDocument||t.contentWindow.document:oe.merge([],t.childNodes)}},function(t,e){oe.fn[t]=function(n,i){var o=oe.map(this,e,n);return"Until"!==t.slice(-5)&&(i=n),i&&"string"==typeof i&&(o=oe.filter(i,o)),this.length>1&&(ye[t]||(o=oe.unique(o)),ve.test(t)&&(o=o.reverse())),this.pushStack(o)}});var be=/\S+/g,xe={};oe.Callbacks=function(t){t="string"==typeof t?xe[t]||s(t):oe.extend({},t);var e,n,i,o,r,a,l=[],h=!t.once&&[],c=function(s){for(n=t.memory&&s,i=!0,r=a||0,a=0,o=l.length,e=!0;l&&o>r;r++)if(l[r].apply(s[0],s[1])===!1&&t.stopOnFalse){n=!1;break}e=!1,l&&(h?h.length&&c(h.shift()):n?l=[]:u.disable())},u={add:function(){if(l){var i=l.length;!function s(e){oe.each(e,function(e,n){var i=oe.type(n);"function"===i?t.unique&&u.has(n)||l.push(n):n&&n.length&&"string"!==i&&s(n)})}(arguments),e?o=l.length:n&&(a=i,c(n))}return this},remove:function(){return l&&oe.each(arguments,function(t,n){for(var i;(i=oe.inArray(n,l,i))>-1;)l.splice(i,1),e&&(o>=i&&o--,r>=i&&r--)}),this},has:function(t){return t?oe.inArray(t,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=h=n=void 0,this},disabled:function(){return!l},lock:function(){return h=void 0,n||u.disable(),this},locked:function(){return!h},fireWith:function(t,n){return!l||i&&!h||(n=n||[],n=[t,n.slice?n.slice():n],e?h.push(n):c(n)),this},fire:function(){return u.fireWith(this,arguments),this},fired:function(){return!!i}};return u},oe.extend({Deferred:function(t){var e=[["resolve","done",oe.Callbacks("once memory"),"resolved"],["reject","fail",oe.Callbacks("once memory"),"rejected"],["notify","progress",oe.Callbacks("memory")]],n="pending",i={state:function(){return n},always:function(){return o.done(arguments).fail(arguments),this},then:function(){var t=arguments;return oe.Deferred(function(n){oe.each(e,function(e,s){var r=oe.isFunction(t[e])&&t[e];o[s[1]](function(){var t=r&&r.apply(this,arguments);t&&oe.isFunction(t.promise)?t.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s[0]+"With"](this===i?n.promise():this,r?[t]:arguments)})}),t=null}).promise()},promise:function(t){return null!=t?oe.extend(t,i):i}},o={};return i.pipe=i.then,oe.each(e,function(t,s){var r=s[2],a=s[3];i[s[1]]=r.add,a&&r.add(function(){n=a},e[1^t][2].disable,e[2][2].lock),o[s[0]]=function(){return o[s[0]+"With"](this===o?i:this,arguments),this},o[s[0]+"With"]=r.fireWith}),i.promise(o),t&&t.call(o,o),o},when:function(t){var e,n,i,o=0,s=Q.call(arguments),r=s.length,a=1!==r||t&&oe.isFunction(t.promise)?r:0,l=1===a?t:oe.Deferred(),h=function(t,n,i){return function(o){n[t]=this,i[t]=arguments.length>1?Q.call(arguments):o,i===e?l.notifyWith(n,i):--a||l.resolveWith(n,i)}};if(r>1)for(e=new Array(r),n=new Array(r),i=new Array(r);r>o;o++)s[o]&&oe.isFunction(s[o].promise)?s[o].promise().done(h(o,i,s)).fail(l.reject).progress(h(o,n,e)):--a;return a||l.resolveWith(i,s),l.promise()}});var we;oe.fn.ready=function(t){return oe.ready.promise().done(t),this},oe.extend({isReady:!1,readyWait:1,holdReady:function(t){t?oe.readyWait++:oe.ready(!0)},ready:function(t){if(t===!0?!--oe.readyWait:!oe.isReady){if(!fe.body)return setTimeout(oe.ready);oe.isReady=!0,t!==!0&&--oe.readyWait>0||(we.resolveWith(fe,[oe]),oe.fn.triggerHandler&&(oe(fe).triggerHandler("ready"),oe(fe).off("ready")))}}}),oe.ready.promise=function(e){if(!we)if(we=oe.Deferred(),"complete"===fe.readyState)setTimeout(oe.ready);else if(fe.addEventListener)fe.addEventListener("DOMContentLoaded",a,!1),t.addEventListener("load",a,!1);else{fe.attachEvent("onreadystatechange",a),t.attachEvent("onload",a);var n=!1;try{n=null==t.frameElement&&fe.documentElement}catch(i){}n&&n.doScroll&&!function o(){if(!oe.isReady){try{n.doScroll("left")}catch(t){return setTimeout(o,50)}r(),oe.ready()}}()}return we.promise(e)};var Ce,Se="undefined";for(Ce in oe(ne))break;ne.ownLast="0"!==Ce,ne.inlineBlockNeedsLayout=!1,oe(function(){var t,e,n,i;n=fe.getElementsByTagName("body")[0],n&&n.style&&(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),typeof e.style.zoom!==Se&&(e.style.cssText="display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",ne.inlineBlockNeedsLayout=t=3===e.offsetWidth,t&&(n.style.zoom=1)),n.removeChild(i))}),function(){var t=fe.createElement("div");if(null==ne.deleteExpando){ne.deleteExpando=!0;try{delete t.test}catch(e){ne.deleteExpando=!1}}t=null}(),oe.acceptData=function(t){var e=oe.noData[(t.nodeName+" ").toLowerCase()],n=+t.nodeType||1;return 1!==n&&9!==n?!1:!e||e!==!0&&t.getAttribute("classid")===e};var Te=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,ke=/([A-Z])/g;oe.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(t){return t=t.nodeType?oe.cache[t[oe.expando]]:t[oe.expando],!!t&&!h(t)},data:function(t,e,n){return c(t,e,n)},removeData:function(t,e){return u(t,e)},_data:function(t,e,n){return c(t,e,n,!0)},_removeData:function(t,e){return u(t,e,!0)}}),oe.fn.extend({data:function(t,e){var n,i,o,s=this[0],r=s&&s.attributes;if(void 0===t){if(this.length&&(o=oe.data(s),1===s.nodeType&&!oe._data(s,"parsedAttrs"))){for(n=r.length;n--;)r[n]&&(i=r[n].name,0===i.indexOf("data-")&&(i=oe.camelCase(i.slice(5)),l(s,i,o[i])));oe._data(s,"parsedAttrs",!0)}return o}return"object"==typeof t?this.each(function(){oe.data(this,t)}):arguments.length>1?this.each(function(){oe.data(this,t,e)}):s?l(s,t,oe.data(s,t)):void 0},removeData:function(t){return this.each(function(){oe.removeData(this,t)})}}),oe.extend({queue:function(t,e,n){var i;return t?(e=(e||"fx")+"queue",i=oe._data(t,e),n&&(!i||oe.isArray(n)?i=oe._data(t,e,oe.makeArray(n)):i.push(n)),i||[]):void 0},dequeue:function(t,e){e=e||"fx";var n=oe.queue(t,e),i=n.length,o=n.shift(),s=oe._queueHooks(t,e),r=function(){oe.dequeue(t,e)};"inprogress"===o&&(o=n.shift(),i--),o&&("fx"===e&&n.unshift("inprogress"),delete s.stop,o.call(t,r,s)),!i&&s&&s.empty.fire()},_queueHooks:function(t,e){var n=e+"queueHooks";return oe._data(t,n)||oe._data(t,n,{empty:oe.Callbacks("once memory").add(function(){oe._removeData(t,e+"queue"),oe._removeData(t,n)})})}}),oe.fn.extend({queue:function(t,e){var n=2;return"string"!=typeof t&&(e=t,t="fx",n--),arguments.length<n?oe.queue(this[0],t):void 0===e?this:this.each(function(){var n=oe.queue(this,t,e);oe._queueHooks(this,t),"fx"===t&&"inprogress"!==n[0]&&oe.dequeue(this,t)})},dequeue:function(t){return this.each(function(){oe.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var n,i=1,o=oe.Deferred(),s=this,r=this.length,a=function(){--i||o.resolveWith(s,[s])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";r--;)n=oe._data(s[r],t+"queueHooks"),n&&n.empty&&(i++,n.empty.add(a));return a(),o.promise(e)}});var Ee=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,Ae=["Top","Right","Bottom","Left"],Le=function(t,e){return t=e||t,"none"===oe.css(t,"display")||!oe.contains(t.ownerDocument,t)},Pe=oe.access=function(t,e,n,i,o,s,r){var a=0,l=t.length,h=null==n;if("object"===oe.type(n)){o=!0;for(a in n)oe.access(t,e,a,n[a],!0,s,r)}else if(void 0!==i&&(o=!0,oe.isFunction(i)||(r=!0),h&&(r?(e.call(t,i),e=null):(h=e,e=function(t,e,n){return h.call(oe(t),n)})),e))for(;l>a;a++)e(t[a],n,r?i:i.call(t[a],a,e(t[a],n)));return o?t:h?e.call(t):l?e(t[0],n):s},Ne=/^(?:checkbox|radio)$/i;!function(){var t=fe.createElement("input"),e=fe.createElement("div"),n=fe.createDocumentFragment();if(e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",ne.leadingWhitespace=3===e.firstChild.nodeType,ne.tbody=!e.getElementsByTagName("tbody").length,ne.htmlSerialize=!!e.getElementsByTagName("link").length,ne.html5Clone="<:nav></:nav>"!==fe.createElement("nav").cloneNode(!0).outerHTML,t.type="checkbox",t.checked=!0,n.appendChild(t),ne.appendChecked=t.checked,e.innerHTML="<textarea>x</textarea>",ne.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue,n.appendChild(e),e.innerHTML="<input type='radio' checked='checked' name='t'/>",ne.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,ne.noCloneEvent=!0,e.attachEvent&&(e.attachEvent("onclick",function(){ne.noCloneEvent=!1}),e.cloneNode(!0).click()),null==ne.deleteExpando){ne.deleteExpando=!0;try{delete e.test}catch(i){ne.deleteExpando=!1}}}(),function(){var e,n,i=fe.createElement("div");for(e in{submit:!0,change:!0,focusin:!0})n="on"+e,(ne[e+"Bubbles"]=n in t)||(i.setAttribute(n,"t"),ne[e+"Bubbles"]=i.attributes[n].expando===!1);i=null}();var De=/^(?:input|select|textarea)$/i,Re=/^key/,Fe=/^(?:mouse|pointer|contextmenu)|click/,$e=/^(?:focusinfocus|focusoutblur)$/,Ie=/^([^.]*)(?:\.(.+)|)$/;oe.event={global:{},add:function(t,e,n,i,o){var s,r,a,l,h,c,u,d,p,f,g,m=oe._data(t);if(m){for(n.handler&&(l=n,n=l.handler,o=l.selector),n.guid||(n.guid=oe.guid++),(r=m.events)||(r=m.events={}),(c=m.handle)||(c=m.handle=function(t){return typeof oe===Se||t&&oe.event.triggered===t.type?void 0:oe.event.dispatch.apply(c.elem,arguments)},c.elem=t),e=(e||"").match(be)||[""],a=e.length;a--;)s=Ie.exec(e[a])||[],p=g=s[1],f=(s[2]||"").split(".").sort(),p&&(h=oe.event.special[p]||{},p=(o?h.delegateType:h.bindType)||p,h=oe.event.special[p]||{},u=oe.extend({type:p,origType:g,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&oe.expr.match.needsContext.test(o),namespace:f.join(".")},l),(d=r[p])||(d=r[p]=[],d.delegateCount=0,h.setup&&h.setup.call(t,i,f,c)!==!1||(t.addEventListener?t.addEventListener(p,c,!1):t.attachEvent&&t.attachEvent("on"+p,c))),h.add&&(h.add.call(t,u),u.handler.guid||(u.handler.guid=n.guid)),o?d.splice(d.delegateCount++,0,u):d.push(u),oe.event.global[p]=!0);t=null}},remove:function(t,e,n,i,o){var s,r,a,l,h,c,u,d,p,f,g,m=oe.hasData(t)&&oe._data(t);if(m&&(c=m.events)){for(e=(e||"").match(be)||[""],h=e.length;h--;)if(a=Ie.exec(e[h])||[],p=g=a[1],f=(a[2]||"").split(".").sort(),p){for(u=oe.event.special[p]||{},p=(i?u.delegateType:u.bindType)||p,d=c[p]||[],a=a[2]&&new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=s=d.length;s--;)r=d[s],!o&&g!==r.origType||n&&n.guid!==r.guid||a&&!a.test(r.namespace)||i&&i!==r.selector&&("**"!==i||!r.selector)||(d.splice(s,1),r.selector&&d.delegateCount--,u.remove&&u.remove.call(t,r));l&&!d.length&&(u.teardown&&u.teardown.call(t,f,m.handle)!==!1||oe.removeEvent(t,p,m.handle),delete c[p])}else for(p in c)oe.event.remove(t,p+e[h],n,i,!0);oe.isEmptyObject(c)&&(delete m.handle,oe._removeData(t,"events"))}},trigger:function(e,n,i,o){var s,r,a,l,h,c,u,d=[i||fe],p=ee.call(e,"type")?e.type:e,f=ee.call(e,"namespace")?e.namespace.split("."):[];if(a=c=i=i||fe,3!==i.nodeType&&8!==i.nodeType&&!$e.test(p+oe.event.triggered)&&(p.indexOf(".")>=0&&(f=p.split("."),p=f.shift(),f.sort()),r=p.indexOf(":")<0&&"on"+p,e=e[oe.expando]?e:new oe.Event(p,"object"==typeof e&&e),e.isTrigger=o?2:3,e.namespace=f.join("."),e.namespace_re=e.namespace?new RegExp("(^|\\.)"+f.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,e.result=void 0,e.target||(e.target=i),n=null==n?[e]:oe.makeArray(n,[e]),h=oe.event.special[p]||{},o||!h.trigger||h.trigger.apply(i,n)!==!1)){if(!o&&!h.noBubble&&!oe.isWindow(i)){for(l=h.delegateType||p,$e.test(l+p)||(a=a.parentNode);a;a=a.parentNode)d.push(a),c=a;
c===(i.ownerDocument||fe)&&d.push(c.defaultView||c.parentWindow||t)}for(u=0;(a=d[u++])&&!e.isPropagationStopped();)e.type=u>1?l:h.bindType||p,s=(oe._data(a,"events")||{})[e.type]&&oe._data(a,"handle"),s&&s.apply(a,n),s=r&&a[r],s&&s.apply&&oe.acceptData(a)&&(e.result=s.apply(a,n),e.result===!1&&e.preventDefault());if(e.type=p,!o&&!e.isDefaultPrevented()&&(!h._default||h._default.apply(d.pop(),n)===!1)&&oe.acceptData(i)&&r&&i[p]&&!oe.isWindow(i)){c=i[r],c&&(i[r]=null),oe.event.triggered=p;try{i[p]()}catch(g){}oe.event.triggered=void 0,c&&(i[r]=c)}return e.result}},dispatch:function(t){t=oe.event.fix(t);var e,n,i,o,s,r=[],a=Q.call(arguments),l=(oe._data(this,"events")||{})[t.type]||[],h=oe.event.special[t.type]||{};if(a[0]=t,t.delegateTarget=this,!h.preDispatch||h.preDispatch.call(this,t)!==!1){for(r=oe.event.handlers.call(this,t,l),e=0;(o=r[e++])&&!t.isPropagationStopped();)for(t.currentTarget=o.elem,s=0;(i=o.handlers[s++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(i.namespace))&&(t.handleObj=i,t.data=i.data,n=((oe.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,a),void 0!==n&&(t.result=n)===!1&&(t.preventDefault(),t.stopPropagation()));return h.postDispatch&&h.postDispatch.call(this,t),t.result}},handlers:function(t,e){var n,i,o,s,r=[],a=e.delegateCount,l=t.target;if(a&&l.nodeType&&(!t.button||"click"!==t.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==t.type)){for(o=[],s=0;a>s;s++)i=e[s],n=i.selector+" ",void 0===o[n]&&(o[n]=i.needsContext?oe(n,this).index(l)>=0:oe.find(n,this,null,[l]).length),o[n]&&o.push(i);o.length&&r.push({elem:l,handlers:o})}return a<e.length&&r.push({elem:this,handlers:e.slice(a)}),r},fix:function(t){if(t[oe.expando])return t;var e,n,i,o=t.type,s=t,r=this.fixHooks[o];for(r||(this.fixHooks[o]=r=Fe.test(o)?this.mouseHooks:Re.test(o)?this.keyHooks:{}),i=r.props?this.props.concat(r.props):this.props,t=new oe.Event(s),e=i.length;e--;)n=i[e],t[n]=s[n];return t.target||(t.target=s.srcElement||fe),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,r.filter?r.filter(t,s):t},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(t,e){var n,i,o,s=e.button,r=e.fromElement;return null==t.pageX&&null!=e.clientX&&(i=t.target.ownerDocument||fe,o=i.documentElement,n=i.body,t.pageX=e.clientX+(o&&o.scrollLeft||n&&n.scrollLeft||0)-(o&&o.clientLeft||n&&n.clientLeft||0),t.pageY=e.clientY+(o&&o.scrollTop||n&&n.scrollTop||0)-(o&&o.clientTop||n&&n.clientTop||0)),!t.relatedTarget&&r&&(t.relatedTarget=r===t.target?e.toElement:r),t.which||void 0===s||(t.which=1&s?1:2&s?3:4&s?2:0),t}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==f()&&this.focus)try{return this.focus(),!1}catch(t){}},delegateType:"focusin"},blur:{trigger:function(){return this===f()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return oe.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(t){return oe.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}},simulate:function(t,e,n,i){var o=oe.extend(new oe.Event,n,{type:t,isSimulated:!0,originalEvent:{}});i?oe.event.trigger(o,null,e):oe.event.dispatch.call(e,o),o.isDefaultPrevented()&&n.preventDefault()}},oe.removeEvent=fe.removeEventListener?function(t,e,n){t.removeEventListener&&t.removeEventListener(e,n,!1)}:function(t,e,n){var i="on"+e;t.detachEvent&&(typeof t[i]===Se&&(t[i]=null),t.detachEvent(i,n))},oe.Event=function(t,e){return this instanceof oe.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?d:p):this.type=t,e&&oe.extend(this,e),this.timeStamp=t&&t.timeStamp||oe.now(),void(this[oe.expando]=!0)):new oe.Event(t,e)},oe.Event.prototype={isDefaultPrevented:p,isPropagationStopped:p,isImmediatePropagationStopped:p,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=d,t&&(t.preventDefault?t.preventDefault():t.returnValue=!1)},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=d,t&&(t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0)},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=d,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},oe.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){oe.event.special[t]={delegateType:e,bindType:e,handle:function(t){var n,i=this,o=t.relatedTarget,s=t.handleObj;return(!o||o!==i&&!oe.contains(i,o))&&(t.type=s.origType,n=s.handler.apply(this,arguments),t.type=e),n}}}),ne.submitBubbles||(oe.event.special.submit={setup:function(){return oe.nodeName(this,"form")?!1:void oe.event.add(this,"click._submit keypress._submit",function(t){var e=t.target,n=oe.nodeName(e,"input")||oe.nodeName(e,"button")?e.form:void 0;n&&!oe._data(n,"submitBubbles")&&(oe.event.add(n,"submit._submit",function(t){t._submit_bubble=!0}),oe._data(n,"submitBubbles",!0))})},postDispatch:function(t){t._submit_bubble&&(delete t._submit_bubble,this.parentNode&&!t.isTrigger&&oe.event.simulate("submit",this.parentNode,t,!0))},teardown:function(){return oe.nodeName(this,"form")?!1:void oe.event.remove(this,"._submit")}}),ne.changeBubbles||(oe.event.special.change={setup:function(){return De.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(oe.event.add(this,"propertychange._change",function(t){"checked"===t.originalEvent.propertyName&&(this._just_changed=!0)}),oe.event.add(this,"click._change",function(t){this._just_changed&&!t.isTrigger&&(this._just_changed=!1),oe.event.simulate("change",this,t,!0)})),!1):void oe.event.add(this,"beforeactivate._change",function(t){var e=t.target;De.test(e.nodeName)&&!oe._data(e,"changeBubbles")&&(oe.event.add(e,"change._change",function(t){!this.parentNode||t.isSimulated||t.isTrigger||oe.event.simulate("change",this.parentNode,t,!0)}),oe._data(e,"changeBubbles",!0))})},handle:function(t){var e=t.target;return this!==e||t.isSimulated||t.isTrigger||"radio"!==e.type&&"checkbox"!==e.type?t.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return oe.event.remove(this,"._change"),!De.test(this.nodeName)}}),ne.focusinBubbles||oe.each({focus:"focusin",blur:"focusout"},function(t,e){var n=function(t){oe.event.simulate(e,t.target,oe.event.fix(t),!0)};oe.event.special[e]={setup:function(){var i=this.ownerDocument||this,o=oe._data(i,e);o||i.addEventListener(t,n,!0),oe._data(i,e,(o||0)+1)},teardown:function(){var i=this.ownerDocument||this,o=oe._data(i,e)-1;o?oe._data(i,e,o):(i.removeEventListener(t,n,!0),oe._removeData(i,e))}}}),oe.fn.extend({on:function(t,e,n,i,o){var s,r;if("object"==typeof t){"string"!=typeof e&&(n=n||e,e=void 0);for(s in t)this.on(s,e,n,t[s],o);return this}if(null==n&&null==i?(i=e,n=e=void 0):null==i&&("string"==typeof e?(i=n,n=void 0):(i=n,n=e,e=void 0)),i===!1)i=p;else if(!i)return this;return 1===o&&(r=i,i=function(t){return oe().off(t),r.apply(this,arguments)},i.guid=r.guid||(r.guid=oe.guid++)),this.each(function(){oe.event.add(this,t,i,n,e)})},one:function(t,e,n,i){return this.on(t,e,n,i,1)},off:function(t,e,n){var i,o;if(t&&t.preventDefault&&t.handleObj)return i=t.handleObj,oe(t.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof t){for(o in t)this.off(o,e,t[o]);return this}return(e===!1||"function"==typeof e)&&(n=e,e=void 0),n===!1&&(n=p),this.each(function(){oe.event.remove(this,t,n,e)})},trigger:function(t,e){return this.each(function(){oe.event.trigger(t,e,this)})},triggerHandler:function(t,e){var n=this[0];return n?oe.event.trigger(t,e,n,!0):void 0}});var Oe="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",Me=/ jQuery\d+="(?:null|\d+)"/g,je=new RegExp("<(?:"+Oe+")[\\s/>]","i"),He=/^\s+/,We=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,_e=/<([\w:]+)/,Be=/<tbody/i,ze=/<|&#?\w+;/,qe=/<(?:script|style|link)/i,Xe=/checked\s*(?:[^=]|=\s*.checked.)/i,Ve=/^$|\/(?:java|ecma)script/i,Ue=/^true\/(.*)/,Ye=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,Qe={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:ne.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},Ge=g(fe),Je=Ge.appendChild(fe.createElement("div"));Qe.optgroup=Qe.option,Qe.tbody=Qe.tfoot=Qe.colgroup=Qe.caption=Qe.thead,Qe.th=Qe.td,oe.extend({clone:function(t,e,n){var i,o,s,r,a,l=oe.contains(t.ownerDocument,t);if(ne.html5Clone||oe.isXMLDoc(t)||!je.test("<"+t.nodeName+">")?s=t.cloneNode(!0):(Je.innerHTML=t.outerHTML,Je.removeChild(s=Je.firstChild)),!(ne.noCloneEvent&&ne.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||oe.isXMLDoc(t)))for(i=m(s),a=m(t),r=0;null!=(o=a[r]);++r)i[r]&&S(o,i[r]);if(e)if(n)for(a=a||m(t),i=i||m(s),r=0;null!=(o=a[r]);r++)C(o,i[r]);else C(t,s);return i=m(s,"script"),i.length>0&&w(i,!l&&m(t,"script")),i=a=o=null,s},buildFragment:function(t,e,n,i){for(var o,s,r,a,l,h,c,u=t.length,d=g(e),p=[],f=0;u>f;f++)if(s=t[f],s||0===s)if("object"===oe.type(s))oe.merge(p,s.nodeType?[s]:s);else if(ze.test(s)){for(a=a||d.appendChild(e.createElement("div")),l=(_e.exec(s)||["",""])[1].toLowerCase(),c=Qe[l]||Qe._default,a.innerHTML=c[1]+s.replace(We,"<$1></$2>")+c[2],o=c[0];o--;)a=a.lastChild;if(!ne.leadingWhitespace&&He.test(s)&&p.push(e.createTextNode(He.exec(s)[0])),!ne.tbody)for(s="table"!==l||Be.test(s)?"<table>"!==c[1]||Be.test(s)?0:a:a.firstChild,o=s&&s.childNodes.length;o--;)oe.nodeName(h=s.childNodes[o],"tbody")&&!h.childNodes.length&&s.removeChild(h);for(oe.merge(p,a.childNodes),a.textContent="";a.firstChild;)a.removeChild(a.firstChild);a=d.lastChild}else p.push(e.createTextNode(s));for(a&&d.removeChild(a),ne.appendChecked||oe.grep(m(p,"input"),v),f=0;s=p[f++];)if((!i||-1===oe.inArray(s,i))&&(r=oe.contains(s.ownerDocument,s),a=m(d.appendChild(s),"script"),r&&w(a),n))for(o=0;s=a[o++];)Ve.test(s.type||"")&&n.push(s);return a=null,d},cleanData:function(t,e){for(var n,i,o,s,r=0,a=oe.expando,l=oe.cache,h=ne.deleteExpando,c=oe.event.special;null!=(n=t[r]);r++)if((e||oe.acceptData(n))&&(o=n[a],s=o&&l[o])){if(s.events)for(i in s.events)c[i]?oe.event.remove(n,i):oe.removeEvent(n,i,s.handle);l[o]&&(delete l[o],h?delete n[a]:typeof n.removeAttribute!==Se?n.removeAttribute(a):n[a]=null,Y.push(o))}}}),oe.fn.extend({text:function(t){return Pe(this,function(t){return void 0===t?oe.text(this):this.empty().append((this[0]&&this[0].ownerDocument||fe).createTextNode(t))},null,t,arguments.length)},append:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.appendChild(t)}})},prepend:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=y(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},remove:function(t,e){for(var n,i=t?oe.filter(t,this):this,o=0;null!=(n=i[o]);o++)e||1!==n.nodeType||oe.cleanData(m(n)),n.parentNode&&(e&&oe.contains(n.ownerDocument,n)&&w(m(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){for(var t,e=0;null!=(t=this[e]);e++){for(1===t.nodeType&&oe.cleanData(m(t,!1));t.firstChild;)t.removeChild(t.firstChild);t.options&&oe.nodeName(t,"select")&&(t.options.length=0)}return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,this.map(function(){return oe.clone(this,t,e)})},html:function(t){return Pe(this,function(t){var e=this[0]||{},n=0,i=this.length;if(void 0===t)return 1===e.nodeType?e.innerHTML.replace(Me,""):void 0;if(!("string"!=typeof t||qe.test(t)||!ne.htmlSerialize&&je.test(t)||!ne.leadingWhitespace&&He.test(t)||Qe[(_e.exec(t)||["",""])[1].toLowerCase()])){t=t.replace(We,"<$1></$2>");try{for(;i>n;n++)e=this[n]||{},1===e.nodeType&&(oe.cleanData(m(e,!1)),e.innerHTML=t);e=0}catch(o){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=arguments[0];return this.domManip(arguments,function(e){t=this.parentNode,oe.cleanData(m(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove()},detach:function(t){return this.remove(t,!0)},domManip:function(t,e){t=G.apply([],t);var n,i,o,s,r,a,l=0,h=this.length,c=this,u=h-1,d=t[0],p=oe.isFunction(d);if(p||h>1&&"string"==typeof d&&!ne.checkClone&&Xe.test(d))return this.each(function(n){var i=c.eq(n);p&&(t[0]=d.call(this,n,i.html())),i.domManip(t,e)});if(h&&(a=oe.buildFragment(t,this[0].ownerDocument,!1,this),n=a.firstChild,1===a.childNodes.length&&(a=n),n)){for(s=oe.map(m(a,"script"),b),o=s.length;h>l;l++)i=a,l!==u&&(i=oe.clone(i,!0,!0),o&&oe.merge(s,m(i,"script"))),e.call(this[l],i,l);if(o)for(r=s[s.length-1].ownerDocument,oe.map(s,x),l=0;o>l;l++)i=s[l],Ve.test(i.type||"")&&!oe._data(i,"globalEval")&&oe.contains(r,i)&&(i.src?oe._evalUrl&&oe._evalUrl(i.src):oe.globalEval((i.text||i.textContent||i.innerHTML||"").replace(Ye,"")));a=n=null}return this}}),oe.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){oe.fn[t]=function(t){for(var n,i=0,o=[],s=oe(t),r=s.length-1;r>=i;i++)n=i===r?this:this.clone(!0),oe(s[i])[e](n),J.apply(o,n.get());return this.pushStack(o)}});var Ze,Ke={};!function(){var t;ne.shrinkWrapBlocks=function(){if(null!=t)return t;t=!1;var e,n,i;return n=fe.getElementsByTagName("body")[0],n&&n.style?(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),typeof e.style.zoom!==Se&&(e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",e.appendChild(fe.createElement("div")).style.width="5px",t=3!==e.offsetWidth),n.removeChild(i),t):void 0}}();var tn,en,nn=/^margin/,on=new RegExp("^("+Ee+")(?!px)[a-z%]+$","i"),sn=/^(top|right|bottom|left)$/;t.getComputedStyle?(tn=function(e){return e.ownerDocument.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):t.getComputedStyle(e,null)},en=function(t,e,n){var i,o,s,r,a=t.style;return n=n||tn(t),r=n?n.getPropertyValue(e)||n[e]:void 0,n&&(""!==r||oe.contains(t.ownerDocument,t)||(r=oe.style(t,e)),on.test(r)&&nn.test(e)&&(i=a.width,o=a.minWidth,s=a.maxWidth,a.minWidth=a.maxWidth=a.width=r,r=n.width,a.width=i,a.minWidth=o,a.maxWidth=s)),void 0===r?r:r+""}):fe.documentElement.currentStyle&&(tn=function(t){return t.currentStyle},en=function(t,e,n){var i,o,s,r,a=t.style;return n=n||tn(t),r=n?n[e]:void 0,null==r&&a&&a[e]&&(r=a[e]),on.test(r)&&!sn.test(e)&&(i=a.left,o=t.runtimeStyle,s=o&&o.left,s&&(o.left=t.currentStyle.left),a.left="fontSize"===e?"1em":r,r=a.pixelLeft+"px",a.left=i,s&&(o.left=s)),void 0===r?r:r+""||"auto"}),function(){function e(){var e,n,i,o;n=fe.getElementsByTagName("body")[0],n&&n.style&&(e=fe.createElement("div"),i=fe.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",n.appendChild(i).appendChild(e),e.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",s=r=!1,l=!0,t.getComputedStyle&&(s="1%"!==(t.getComputedStyle(e,null)||{}).top,r="4px"===(t.getComputedStyle(e,null)||{width:"4px"}).width,o=e.appendChild(fe.createElement("div")),o.style.cssText=e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",o.style.marginRight=o.style.width="0",e.style.width="1px",l=!parseFloat((t.getComputedStyle(o,null)||{}).marginRight),e.removeChild(o)),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=e.getElementsByTagName("td"),o[0].style.cssText="margin:0;border:0;padding:0;display:none",a=0===o[0].offsetHeight,a&&(o[0].style.display="",o[1].style.display="none",a=0===o[0].offsetHeight),n.removeChild(i))}var n,i,o,s,r,a,l;n=fe.createElement("div"),n.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",o=n.getElementsByTagName("a")[0],i=o&&o.style,i&&(i.cssText="float:left;opacity:.5",ne.opacity="0.5"===i.opacity,ne.cssFloat=!!i.cssFloat,n.style.backgroundClip="content-box",n.cloneNode(!0).style.backgroundClip="",ne.clearCloneStyle="content-box"===n.style.backgroundClip,ne.boxSizing=""===i.boxSizing||""===i.MozBoxSizing||""===i.WebkitBoxSizing,oe.extend(ne,{reliableHiddenOffsets:function(){return null==a&&e(),a},boxSizingReliable:function(){return null==r&&e(),r},pixelPosition:function(){return null==s&&e(),s},reliableMarginRight:function(){return null==l&&e(),l}}))}(),oe.swap=function(t,e,n,i){var o,s,r={};for(s in e)r[s]=t.style[s],t.style[s]=e[s];o=n.apply(t,i||[]);for(s in e)t.style[s]=r[s];return o};var rn=/alpha\([^)]*\)/i,an=/opacity\s*=\s*([^)]*)/,ln=/^(none|table(?!-c[ea]).+)/,hn=new RegExp("^("+Ee+")(.*)$","i"),cn=new RegExp("^([+-])=("+Ee+")","i"),un={position:"absolute",visibility:"hidden",display:"block"},dn={letterSpacing:"0",fontWeight:"400"},pn=["Webkit","O","Moz","ms"];oe.extend({cssHooks:{opacity:{get:function(t,e){if(e){var n=en(t,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":ne.cssFloat?"cssFloat":"styleFloat"},style:function(t,e,n,i){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var o,s,r,a=oe.camelCase(e),l=t.style;if(e=oe.cssProps[a]||(oe.cssProps[a]=A(l,a)),r=oe.cssHooks[e]||oe.cssHooks[a],void 0===n)return r&&"get"in r&&void 0!==(o=r.get(t,!1,i))?o:l[e];if(s=typeof n,"string"===s&&(o=cn.exec(n))&&(n=(o[1]+1)*o[2]+parseFloat(oe.css(t,e)),s="number"),null!=n&&n===n&&("number"!==s||oe.cssNumber[a]||(n+="px"),ne.clearCloneStyle||""!==n||0!==e.indexOf("background")||(l[e]="inherit"),!(r&&"set"in r&&void 0===(n=r.set(t,n,i)))))try{l[e]=n}catch(h){}}},css:function(t,e,n,i){var o,s,r,a=oe.camelCase(e);return e=oe.cssProps[a]||(oe.cssProps[a]=A(t.style,a)),r=oe.cssHooks[e]||oe.cssHooks[a],r&&"get"in r&&(s=r.get(t,!0,n)),void 0===s&&(s=en(t,e,i)),"normal"===s&&e in dn&&(s=dn[e]),""===n||n?(o=parseFloat(s),n===!0||oe.isNumeric(o)?o||0:s):s}}),oe.each(["height","width"],function(t,e){oe.cssHooks[e]={get:function(t,n,i){return n?ln.test(oe.css(t,"display"))&&0===t.offsetWidth?oe.swap(t,un,function(){return D(t,e,i)}):D(t,e,i):void 0},set:function(t,n,i){var o=i&&tn(t);return P(t,n,i?N(t,e,i,ne.boxSizing&&"border-box"===oe.css(t,"boxSizing",!1,o),o):0)}}}),ne.opacity||(oe.cssHooks.opacity={get:function(t,e){return an.test((e&&t.currentStyle?t.currentStyle.filter:t.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":e?"1":""},set:function(t,e){var n=t.style,i=t.currentStyle,o=oe.isNumeric(e)?"alpha(opacity="+100*e+")":"",s=i&&i.filter||n.filter||"";n.zoom=1,(e>=1||""===e)&&""===oe.trim(s.replace(rn,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===e||i&&!i.filter)||(n.filter=rn.test(s)?s.replace(rn,o):s+" "+o)}}),oe.cssHooks.marginRight=E(ne.reliableMarginRight,function(t,e){return e?oe.swap(t,{display:"inline-block"},en,[t,"marginRight"]):void 0}),oe.each({margin:"",padding:"",border:"Width"},function(t,e){oe.cssHooks[t+e]={expand:function(n){for(var i=0,o={},s="string"==typeof n?n.split(" "):[n];4>i;i++)o[t+Ae[i]+e]=s[i]||s[i-2]||s[0];return o}},nn.test(t)||(oe.cssHooks[t+e].set=P)}),oe.fn.extend({css:function(t,e){return Pe(this,function(t,e,n){var i,o,s={},r=0;if(oe.isArray(e)){for(i=tn(t),o=e.length;o>r;r++)s[e[r]]=oe.css(t,e[r],!1,i);return s}return void 0!==n?oe.style(t,e,n):oe.css(t,e)},t,e,arguments.length>1)},show:function(){return L(this,!0)},hide:function(){return L(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Le(this)?oe(this).show():oe(this).hide()})}}),oe.Tween=R,R.prototype={constructor:R,init:function(t,e,n,i,o,s){this.elem=t,this.prop=n,this.easing=o||"swing",this.options=e,this.start=this.now=this.cur(),this.end=i,this.unit=s||(oe.cssNumber[n]?"":"px")},cur:function(){var t=R.propHooks[this.prop];return t&&t.get?t.get(this):R.propHooks._default.get(this)},run:function(t){var e,n=R.propHooks[this.prop];return this.pos=e=this.options.duration?oe.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):R.propHooks._default.set(this),this}},R.prototype.init.prototype=R.prototype,R.propHooks={_default:{get:function(t){var e;return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=oe.css(t.elem,t.prop,""),e&&"auto"!==e?e:0):t.elem[t.prop]},set:function(t){oe.fx.step[t.prop]?oe.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[oe.cssProps[t.prop]]||oe.cssHooks[t.prop])?oe.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now}}},R.propHooks.scrollTop=R.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},oe.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2}},oe.fx=R.prototype.init,oe.fx.step={};var fn,gn,mn=/^(?:toggle|show|hide)$/,vn=new RegExp("^(?:([+-])=|)("+Ee+")([a-z%]*)$","i"),yn=/queueHooks$/,bn=[O],xn={"*":[function(t,e){var n=this.createTween(t,e),i=n.cur(),o=vn.exec(e),s=o&&o[3]||(oe.cssNumber[t]?"":"px"),r=(oe.cssNumber[t]||"px"!==s&&+i)&&vn.exec(oe.css(n.elem,t)),a=1,l=20;if(r&&r[3]!==s){s=s||r[3],o=o||[],r=+i||1;do a=a||".5",r/=a,oe.style(n.elem,t,r+s);while(a!==(a=n.cur()/i)&&1!==a&&--l)}return o&&(r=n.start=+r||+i||0,n.unit=s,n.end=o[1]?r+(o[1]+1)*o[2]:+o[2]),n}]};oe.Animation=oe.extend(j,{tweener:function(t,e){oe.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");for(var n,i=0,o=t.length;o>i;i++)n=t[i],xn[n]=xn[n]||[],xn[n].unshift(e)},prefilter:function(t,e){e?bn.unshift(t):bn.push(t)}}),oe.speed=function(t,e,n){var i=t&&"object"==typeof t?oe.extend({},t):{complete:n||!n&&e||oe.isFunction(t)&&t,duration:t,easing:n&&e||e&&!oe.isFunction(e)&&e};return i.duration=oe.fx.off?0:"number"==typeof i.duration?i.duration:i.duration in oe.fx.speeds?oe.fx.speeds[i.duration]:oe.fx.speeds._default,(null==i.queue||i.queue===!0)&&(i.queue="fx"),i.old=i.complete,i.complete=function(){oe.isFunction(i.old)&&i.old.call(this),i.queue&&oe.dequeue(this,i.queue)},i},oe.fn.extend({fadeTo:function(t,e,n,i){return this.filter(Le).css("opacity",0).show().end().animate({opacity:e},t,n,i)},animate:function(t,e,n,i){var o=oe.isEmptyObject(t),s=oe.speed(e,n,i),r=function(){var e=j(this,oe.extend({},t),s);(o||oe._data(this,"finish"))&&e.stop(!0)};return r.finish=r,o||s.queue===!1?this.each(r):this.queue(s.queue,r)},stop:function(t,e,n){var i=function(t){var e=t.stop;delete t.stop,e(n)};return"string"!=typeof t&&(n=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var e=!0,o=null!=t&&t+"queueHooks",s=oe.timers,r=oe._data(this);if(o)r[o]&&r[o].stop&&i(r[o]);else for(o in r)r[o]&&r[o].stop&&yn.test(o)&&i(r[o]);for(o=s.length;o--;)s[o].elem!==this||null!=t&&s[o].queue!==t||(s[o].anim.stop(n),e=!1,s.splice(o,1));(e||!n)&&oe.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var e,n=oe._data(this),i=n[t+"queue"],o=n[t+"queueHooks"],s=oe.timers,r=i?i.length:0;for(n.finish=!0,oe.queue(this,t,[]),o&&o.stop&&o.stop.call(this,!0),e=s.length;e--;)s[e].elem===this&&s[e].queue===t&&(s[e].anim.stop(!0),s.splice(e,1));for(e=0;r>e;e++)i[e]&&i[e].finish&&i[e].finish.call(this);delete n.finish})}}),oe.each(["toggle","show","hide"],function(t,e){var n=oe.fn[e];oe.fn[e]=function(t,i,o){return null==t||"boolean"==typeof t?n.apply(this,arguments):this.animate($(e,!0),t,i,o)}}),oe.each({slideDown:$("show"),slideUp:$("hide"),slideToggle:$("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){oe.fn[t]=function(t,n,i){return this.animate(e,t,n,i)}}),oe.timers=[],oe.fx.tick=function(){var t,e=oe.timers,n=0;for(fn=oe.now();n<e.length;n++)t=e[n],t()||e[n]!==t||e.splice(n--,1);e.length||oe.fx.stop(),fn=void 0},oe.fx.timer=function(t){oe.timers.push(t),t()?oe.fx.start():oe.timers.pop()},oe.fx.interval=13,oe.fx.start=function(){gn||(gn=setInterval(oe.fx.tick,oe.fx.interval))},oe.fx.stop=function(){clearInterval(gn),gn=null},oe.fx.speeds={slow:600,fast:200,_default:400},oe.fn.delay=function(t,e){return t=oe.fx?oe.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,n){var i=setTimeout(e,t);n.stop=function(){clearTimeout(i)}})},function(){var t,e,n,i,o;e=fe.createElement("div"),e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",i=e.getElementsByTagName("a")[0],n=fe.createElement("select"),o=n.appendChild(fe.createElement("option")),t=e.getElementsByTagName("input")[0],i.style.cssText="top:1px",ne.getSetAttribute="t"!==e.className,ne.style=/top/.test(i.getAttribute("style")),ne.hrefNormalized="/a"===i.getAttribute("href"),ne.checkOn=!!t.value,ne.optSelected=o.selected,ne.enctype=!!fe.createElement("form").enctype,n.disabled=!0,ne.optDisabled=!o.disabled,t=fe.createElement("input"),t.setAttribute("value",""),ne.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),ne.radioValue="t"===t.value}();var wn=/\r/g;oe.fn.extend({val:function(t){var e,n,i,o=this[0];{if(arguments.length)return i=oe.isFunction(t),this.each(function(n){var o;1===this.nodeType&&(o=i?t.call(this,n,oe(this).val()):t,null==o?o="":"number"==typeof o?o+="":oe.isArray(o)&&(o=oe.map(o,function(t){return null==t?"":t+""})),e=oe.valHooks[this.type]||oe.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,o,"value")||(this.value=o))});if(o)return e=oe.valHooks[o.type]||oe.valHooks[o.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(n=e.get(o,"value"))?n:(n=o.value,"string"==typeof n?n.replace(wn,""):null==n?"":n)}}}),oe.extend({valHooks:{option:{get:function(t){var e=oe.find.attr(t,"value");return null!=e?e:oe.trim(oe.text(t))}},select:{get:function(t){for(var e,n,i=t.options,o=t.selectedIndex,s="select-one"===t.type||0>o,r=s?null:[],a=s?o+1:i.length,l=0>o?a:s?o:0;a>l;l++)if(n=i[l],!(!n.selected&&l!==o||(ne.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&oe.nodeName(n.parentNode,"optgroup"))){if(e=oe(n).val(),s)return e;r.push(e)}return r},set:function(t,e){for(var n,i,o=t.options,s=oe.makeArray(e),r=o.length;r--;)if(i=o[r],oe.inArray(oe.valHooks.option.get(i),s)>=0)try{i.selected=n=!0}catch(a){i.scrollHeight}else i.selected=!1;return n||(t.selectedIndex=-1),o}}}}),oe.each(["radio","checkbox"],function(){oe.valHooks[this]={set:function(t,e){return oe.isArray(e)?t.checked=oe.inArray(oe(t).val(),e)>=0:void 0}},ne.checkOn||(oe.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})});var Cn,Sn,Tn=oe.expr.attrHandle,kn=/^(?:checked|selected)$/i,En=ne.getSetAttribute,An=ne.input;oe.fn.extend({attr:function(t,e){return Pe(this,oe.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){oe.removeAttr(this,t)})}}),oe.extend({attr:function(t,e,n){var i,o,s=t.nodeType;if(t&&3!==s&&8!==s&&2!==s)return typeof t.getAttribute===Se?oe.prop(t,e,n):(1===s&&oe.isXMLDoc(t)||(e=e.toLowerCase(),i=oe.attrHooks[e]||(oe.expr.match.bool.test(e)?Sn:Cn)),void 0===n?i&&"get"in i&&null!==(o=i.get(t,e))?o:(o=oe.find.attr(t,e),null==o?void 0:o):null!==n?i&&"set"in i&&void 0!==(o=i.set(t,n,e))?o:(t.setAttribute(e,n+""),n):void oe.removeAttr(t,e))},removeAttr:function(t,e){var n,i,o=0,s=e&&e.match(be);if(s&&1===t.nodeType)for(;n=s[o++];)i=oe.propFix[n]||n,oe.expr.match.bool.test(n)?An&&En||!kn.test(n)?t[i]=!1:t[oe.camelCase("default-"+n)]=t[i]=!1:oe.attr(t,n,""),t.removeAttribute(En?n:i)},attrHooks:{type:{set:function(t,e){if(!ne.radioValue&&"radio"===e&&oe.nodeName(t,"input")){var n=t.value;return t.setAttribute("type",e),n&&(t.value=n),e}}}}}),Sn={set:function(t,e,n){return e===!1?oe.removeAttr(t,n):An&&En||!kn.test(n)?t.setAttribute(!En&&oe.propFix[n]||n,n):t[oe.camelCase("default-"+n)]=t[n]=!0,n}},oe.each(oe.expr.match.bool.source.match(/\w+/g),function(t,e){var n=Tn[e]||oe.find.attr;Tn[e]=An&&En||!kn.test(e)?function(t,e,i){var o,s;return i||(s=Tn[e],Tn[e]=o,o=null!=n(t,e,i)?e.toLowerCase():null,Tn[e]=s),o}:function(t,e,n){return n?void 0:t[oe.camelCase("default-"+e)]?e.toLowerCase():null}}),An&&En||(oe.attrHooks.value={set:function(t,e,n){return oe.nodeName(t,"input")?void(t.defaultValue=e):Cn&&Cn.set(t,e,n)}}),En||(Cn={set:function(t,e,n){var i=t.getAttributeNode(n);return i||t.setAttributeNode(i=t.ownerDocument.createAttribute(n)),i.value=e+="","value"===n||e===t.getAttribute(n)?e:void 0}},Tn.id=Tn.name=Tn.coords=function(t,e,n){var i;return n?void 0:(i=t.getAttributeNode(e))&&""!==i.value?i.value:null},oe.valHooks.button={get:function(t,e){var n=t.getAttributeNode(e);return n&&n.specified?n.value:void 0},set:Cn.set},oe.attrHooks.contenteditable={set:function(t,e,n){Cn.set(t,""===e?!1:e,n)}},oe.each(["width","height"],function(t,e){oe.attrHooks[e]={set:function(t,n){return""===n?(t.setAttribute(e,"auto"),n):void 0}}})),ne.style||(oe.attrHooks.style={get:function(t){return t.style.cssText||void 0},set:function(t,e){return t.style.cssText=e+""}});var Ln=/^(?:input|select|textarea|button|object)$/i,Pn=/^(?:a|area)$/i;oe.fn.extend({prop:function(t,e){return Pe(this,oe.prop,t,e,arguments.length>1)},removeProp:function(t){return t=oe.propFix[t]||t,this.each(function(){try{this[t]=void 0,delete this[t]}catch(e){}})}}),oe.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(t,e,n){var i,o,s,r=t.nodeType;if(t&&3!==r&&8!==r&&2!==r)return s=1!==r||!oe.isXMLDoc(t),s&&(e=oe.propFix[e]||e,o=oe.propHooks[e]),void 0!==n?o&&"set"in o&&void 0!==(i=o.set(t,n,e))?i:t[e]=n:o&&"get"in o&&null!==(i=o.get(t,e))?i:t[e]},propHooks:{tabIndex:{get:function(t){var e=oe.find.attr(t,"tabindex");return e?parseInt(e,10):Ln.test(t.nodeName)||Pn.test(t.nodeName)&&t.href?0:-1}}}}),ne.hrefNormalized||oe.each(["href","src"],function(t,e){oe.propHooks[e]={get:function(t){return t.getAttribute(e,4)}}}),ne.optSelected||(oe.propHooks.selected={get:function(t){var e=t.parentNode;return e&&(e.selectedIndex,e.parentNode&&e.parentNode.selectedIndex),null}}),oe.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){oe.propFix[this.toLowerCase()]=this}),ne.enctype||(oe.propFix.enctype="encoding");var Nn=/[\t\r\n\f]/g;oe.fn.extend({addClass:function(t){var e,n,i,o,s,r,a=0,l=this.length,h="string"==typeof t&&t;if(oe.isFunction(t))return this.each(function(e){oe(this).addClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>a;a++)if(n=this[a],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Nn," "):" ")){for(s=0;o=e[s++];)i.indexOf(" "+o+" ")<0&&(i+=o+" ");r=oe.trim(i),n.className!==r&&(n.className=r)}return this},removeClass:function(t){var e,n,i,o,s,r,a=0,l=this.length,h=0===arguments.length||"string"==typeof t&&t;if(oe.isFunction(t))return this.each(function(e){oe(this).removeClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(be)||[];l>a;a++)if(n=this[a],i=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(Nn," "):"")){for(s=0;o=e[s++];)for(;i.indexOf(" "+o+" ")>=0;)i=i.replace(" "+o+" "," ");r=t?oe.trim(i):"",n.className!==r&&(n.className=r)}return this},toggleClass:function(t,e){var n=typeof t;return"boolean"==typeof e&&"string"===n?e?this.addClass(t):this.removeClass(t):this.each(oe.isFunction(t)?function(n){oe(this).toggleClass(t.call(this,n,this.className,e),e)}:function(){if("string"===n)for(var e,i=0,o=oe(this),s=t.match(be)||[];e=s[i++];)o.hasClass(e)?o.removeClass(e):o.addClass(e);
else(n===Se||"boolean"===n)&&(this.className&&oe._data(this,"__className__",this.className),this.className=this.className||t===!1?"":oe._data(this,"__className__")||"")})},hasClass:function(t){for(var e=" "+t+" ",n=0,i=this.length;i>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(Nn," ").indexOf(e)>=0)return!0;return!1}}),oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){oe.fn[e]=function(t,n){return arguments.length>0?this.on(e,null,t,n):this.trigger(e)}}),oe.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)},bind:function(t,e,n){return this.on(t,null,e,n)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,n,i){return this.on(e,t,n,i)},undelegate:function(t,e,n){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",n)}});var Dn=oe.now(),Rn=/\?/,Fn=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;oe.parseJSON=function(e){if(t.JSON&&t.JSON.parse)return t.JSON.parse(e+"");var n,i=null,o=oe.trim(e+"");return o&&!oe.trim(o.replace(Fn,function(t,e,o,s){return n&&e&&(i=0),0===i?t:(n=o||e,i+=!s-!o,"")}))?Function("return "+o)():oe.error("Invalid JSON: "+e)},oe.parseXML=function(e){var n,i;if(!e||"string"!=typeof e)return null;try{t.DOMParser?(i=new DOMParser,n=i.parseFromString(e,"text/xml")):(n=new ActiveXObject("Microsoft.XMLDOM"),n.async="false",n.loadXML(e))}catch(o){n=void 0}return n&&n.documentElement&&!n.getElementsByTagName("parsererror").length||oe.error("Invalid XML: "+e),n};var $n,In,On=/#.*$/,Mn=/([?&])_=[^&]*/,jn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Hn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Wn=/^(?:GET|HEAD)$/,_n=/^\/\//,Bn=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,zn={},qn={},Xn="*/".concat("*");try{In=location.href}catch(Vn){In=fe.createElement("a"),In.href="",In=In.href}$n=Bn.exec(In.toLowerCase())||[],oe.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:In,type:"GET",isLocal:Hn.test($n[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Xn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":oe.parseJSON,"text xml":oe.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?_(_(t,oe.ajaxSettings),e):_(oe.ajaxSettings,t)},ajaxPrefilter:H(zn),ajaxTransport:H(qn),ajax:function(t,e){function n(t,e,n,i){var o,c,v,y,x,C=e;2!==b&&(b=2,a&&clearTimeout(a),h=void 0,r=i||"",w.readyState=t>0?4:0,o=t>=200&&300>t||304===t,n&&(y=B(u,w,n)),y=z(u,y,w,o),o?(u.ifModified&&(x=w.getResponseHeader("Last-Modified"),x&&(oe.lastModified[s]=x),x=w.getResponseHeader("etag"),x&&(oe.etag[s]=x)),204===t||"HEAD"===u.type?C="nocontent":304===t?C="notmodified":(C=y.state,c=y.data,v=y.error,o=!v)):(v=C,(t||!C)&&(C="error",0>t&&(t=0))),w.status=t,w.statusText=(e||C)+"",o?f.resolveWith(d,[c,C,w]):f.rejectWith(d,[w,C,v]),w.statusCode(m),m=void 0,l&&p.trigger(o?"ajaxSuccess":"ajaxError",[w,u,o?c:v]),g.fireWith(d,[w,C]),l&&(p.trigger("ajaxComplete",[w,u]),--oe.active||oe.event.trigger("ajaxStop")))}"object"==typeof t&&(e=t,t=void 0),e=e||{};var i,o,s,r,a,l,h,c,u=oe.ajaxSetup({},e),d=u.context||u,p=u.context&&(d.nodeType||d.jquery)?oe(d):oe.event,f=oe.Deferred(),g=oe.Callbacks("once memory"),m=u.statusCode||{},v={},y={},b=0,x="canceled",w={readyState:0,getResponseHeader:function(t){var e;if(2===b){if(!c)for(c={};e=jn.exec(r);)c[e[1].toLowerCase()]=e[2];e=c[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===b?r:null},setRequestHeader:function(t,e){var n=t.toLowerCase();return b||(t=y[n]=y[n]||t,v[t]=e),this},overrideMimeType:function(t){return b||(u.mimeType=t),this},statusCode:function(t){var e;if(t)if(2>b)for(e in t)m[e]=[m[e],t[e]];else w.always(t[w.status]);return this},abort:function(t){var e=t||x;return h&&h.abort(e),n(0,e),this}};if(f.promise(w).complete=g.add,w.success=w.done,w.error=w.fail,u.url=((t||u.url||In)+"").replace(On,"").replace(_n,$n[1]+"//"),u.type=e.method||e.type||u.method||u.type,u.dataTypes=oe.trim(u.dataType||"*").toLowerCase().match(be)||[""],null==u.crossDomain&&(i=Bn.exec(u.url.toLowerCase()),u.crossDomain=!(!i||i[1]===$n[1]&&i[2]===$n[2]&&(i[3]||("http:"===i[1]?"80":"443"))===($n[3]||("http:"===$n[1]?"80":"443")))),u.data&&u.processData&&"string"!=typeof u.data&&(u.data=oe.param(u.data,u.traditional)),W(zn,u,e,w),2===b)return w;l=oe.event&&u.global,l&&0===oe.active++&&oe.event.trigger("ajaxStart"),u.type=u.type.toUpperCase(),u.hasContent=!Wn.test(u.type),s=u.url,u.hasContent||(u.data&&(s=u.url+=(Rn.test(s)?"&":"?")+u.data,delete u.data),u.cache===!1&&(u.url=Mn.test(s)?s.replace(Mn,"$1_="+Dn++):s+(Rn.test(s)?"&":"?")+"_="+Dn++)),u.ifModified&&(oe.lastModified[s]&&w.setRequestHeader("If-Modified-Since",oe.lastModified[s]),oe.etag[s]&&w.setRequestHeader("If-None-Match",oe.etag[s])),(u.data&&u.hasContent&&u.contentType!==!1||e.contentType)&&w.setRequestHeader("Content-Type",u.contentType),w.setRequestHeader("Accept",u.dataTypes[0]&&u.accepts[u.dataTypes[0]]?u.accepts[u.dataTypes[0]]+("*"!==u.dataTypes[0]?", "+Xn+"; q=0.01":""):u.accepts["*"]);for(o in u.headers)w.setRequestHeader(o,u.headers[o]);if(u.beforeSend&&(u.beforeSend.call(d,w,u)===!1||2===b))return w.abort();x="abort";for(o in{success:1,error:1,complete:1})w[o](u[o]);if(h=W(qn,u,e,w)){w.readyState=1,l&&p.trigger("ajaxSend",[w,u]),u.async&&u.timeout>0&&(a=setTimeout(function(){w.abort("timeout")},u.timeout));try{b=1,h.send(v,n)}catch(C){if(!(2>b))throw C;n(-1,C)}}else n(-1,"No Transport");return w},getJSON:function(t,e,n){return oe.get(t,e,n,"json")},getScript:function(t,e){return oe.get(t,void 0,e,"script")}}),oe.each(["get","post"],function(t,e){oe[e]=function(t,n,i,o){return oe.isFunction(n)&&(o=o||i,i=n,n=void 0),oe.ajax({url:t,type:e,dataType:o,data:n,success:i})}}),oe._evalUrl=function(t){return oe.ajax({url:t,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},oe.fn.extend({wrapAll:function(t){if(oe.isFunction(t))return this.each(function(e){oe(this).wrapAll(t.call(this,e))});if(this[0]){var e=oe(t,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstChild&&1===t.firstChild.nodeType;)t=t.firstChild;return t}).append(this)}return this},wrapInner:function(t){return this.each(oe.isFunction(t)?function(e){oe(this).wrapInner(t.call(this,e))}:function(){var e=oe(this),n=e.contents();n.length?n.wrapAll(t):e.append(t)})},wrap:function(t){var e=oe.isFunction(t);return this.each(function(n){oe(this).wrapAll(e?t.call(this,n):t)})},unwrap:function(){return this.parent().each(function(){oe.nodeName(this,"body")||oe(this).replaceWith(this.childNodes)}).end()}}),oe.expr.filters.hidden=function(t){return t.offsetWidth<=0&&t.offsetHeight<=0||!ne.reliableHiddenOffsets()&&"none"===(t.style&&t.style.display||oe.css(t,"display"))},oe.expr.filters.visible=function(t){return!oe.expr.filters.hidden(t)};var Un=/%20/g,Yn=/\[\]$/,Qn=/\r?\n/g,Gn=/^(?:submit|button|image|reset|file)$/i,Jn=/^(?:input|select|textarea|keygen)/i;oe.param=function(t,e){var n,i=[],o=function(t,e){e=oe.isFunction(e)?e():null==e?"":e,i[i.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=oe.ajaxSettings&&oe.ajaxSettings.traditional),oe.isArray(t)||t.jquery&&!oe.isPlainObject(t))oe.each(t,function(){o(this.name,this.value)});else for(n in t)q(n,t[n],e,o);return i.join("&").replace(Un,"+")},oe.fn.extend({serialize:function(){return oe.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=oe.prop(this,"elements");return t?oe.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!oe(this).is(":disabled")&&Jn.test(this.nodeName)&&!Gn.test(t)&&(this.checked||!Ne.test(t))}).map(function(t,e){var n=oe(this).val();return null==n?null:oe.isArray(n)?oe.map(n,function(t){return{name:e.name,value:t.replace(Qn,"\r\n")}}):{name:e.name,value:n.replace(Qn,"\r\n")}}).get()}}),oe.ajaxSettings.xhr=void 0!==t.ActiveXObject?function(){return!this.isLocal&&/^(get|post|head|put|delete|options)$/i.test(this.type)&&X()||V()}:X;var Zn=0,Kn={},ti=oe.ajaxSettings.xhr();t.attachEvent&&t.attachEvent("onunload",function(){for(var t in Kn)Kn[t](void 0,!0)}),ne.cors=!!ti&&"withCredentials"in ti,ti=ne.ajax=!!ti,ti&&oe.ajaxTransport(function(t){if(!t.crossDomain||ne.cors){var e;return{send:function(n,i){var o,s=t.xhr(),r=++Zn;if(s.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(o in t.xhrFields)s[o]=t.xhrFields[o];t.mimeType&&s.overrideMimeType&&s.overrideMimeType(t.mimeType),t.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(o in n)void 0!==n[o]&&s.setRequestHeader(o,n[o]+"");s.send(t.hasContent&&t.data||null),e=function(n,o){var a,l,h;if(e&&(o||4===s.readyState))if(delete Kn[r],e=void 0,s.onreadystatechange=oe.noop,o)4!==s.readyState&&s.abort();else{h={},a=s.status,"string"==typeof s.responseText&&(h.text=s.responseText);try{l=s.statusText}catch(c){l=""}a||!t.isLocal||t.crossDomain?1223===a&&(a=204):a=h.text?200:404}h&&i(a,l,h,s.getAllResponseHeaders())},t.async?4===s.readyState?setTimeout(e):s.onreadystatechange=Kn[r]=e:e()},abort:function(){e&&e(void 0,!0)}}}}),oe.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(t){return oe.globalEval(t),t}}}),oe.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET",t.global=!1)}),oe.ajaxTransport("script",function(t){if(t.crossDomain){var e,n=fe.head||oe("head")[0]||fe.documentElement;return{send:function(i,o){e=fe.createElement("script"),e.async=!0,t.scriptCharset&&(e.charset=t.scriptCharset),e.src=t.url,e.onload=e.onreadystatechange=function(t,n){(n||!e.readyState||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=null,e.parentNode&&e.parentNode.removeChild(e),e=null,n||o(200,"success"))},n.insertBefore(e,n.firstChild)},abort:function(){e&&e.onload(void 0,!0)}}}});var ei=[],ni=/(=)\?(?=&|$)|\?\?/;oe.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=ei.pop()||oe.expando+"_"+Dn++;return this[t]=!0,t}}),oe.ajaxPrefilter("json jsonp",function(e,n,i){var o,s,r,a=e.jsonp!==!1&&(ni.test(e.url)?"url":"string"==typeof e.data&&!(e.contentType||"").indexOf("application/x-www-form-urlencoded")&&ni.test(e.data)&&"data");return a||"jsonp"===e.dataTypes[0]?(o=e.jsonpCallback=oe.isFunction(e.jsonpCallback)?e.jsonpCallback():e.jsonpCallback,a?e[a]=e[a].replace(ni,"$1"+o):e.jsonp!==!1&&(e.url+=(Rn.test(e.url)?"&":"?")+e.jsonp+"="+o),e.converters["script json"]=function(){return r||oe.error(o+" was not called"),r[0]},e.dataTypes[0]="json",s=t[o],t[o]=function(){r=arguments},i.always(function(){t[o]=s,e[o]&&(e.jsonpCallback=n.jsonpCallback,ei.push(o)),r&&oe.isFunction(s)&&s(r[0]),r=s=void 0}),"script"):void 0}),oe.parseHTML=function(t,e,n){if(!t||"string"!=typeof t)return null;"boolean"==typeof e&&(n=e,e=!1),e=e||fe;var i=ue.exec(t),o=!n&&[];return i?[e.createElement(i[1])]:(i=oe.buildFragment([t],e,o),o&&o.length&&oe(o).remove(),oe.merge([],i.childNodes))};var ii=oe.fn.load;oe.fn.load=function(t,e,n){if("string"!=typeof t&&ii)return ii.apply(this,arguments);var i,o,s,r=this,a=t.indexOf(" ");return a>=0&&(i=oe.trim(t.slice(a,t.length)),t=t.slice(0,a)),oe.isFunction(e)?(n=e,e=void 0):e&&"object"==typeof e&&(s="POST"),r.length>0&&oe.ajax({url:t,type:s,dataType:"html",data:e}).done(function(t){o=arguments,r.html(i?oe("<div>").append(oe.parseHTML(t)).find(i):t)}).complete(n&&function(t,e){r.each(n,o||[t.responseText,e,t])}),this},oe.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){oe.fn[e]=function(t){return this.on(e,t)}}),oe.expr.filters.animated=function(t){return oe.grep(oe.timers,function(e){return t===e.elem}).length};var oi=t.document.documentElement;oe.offset={setOffset:function(t,e,n){var i,o,s,r,a,l,h,c=oe.css(t,"position"),u=oe(t),d={};"static"===c&&(t.style.position="relative"),a=u.offset(),s=oe.css(t,"top"),l=oe.css(t,"left"),h=("absolute"===c||"fixed"===c)&&oe.inArray("auto",[s,l])>-1,h?(i=u.position(),r=i.top,o=i.left):(r=parseFloat(s)||0,o=parseFloat(l)||0),oe.isFunction(e)&&(e=e.call(t,n,a)),null!=e.top&&(d.top=e.top-a.top+r),null!=e.left&&(d.left=e.left-a.left+o),"using"in e?e.using.call(t,d):u.css(d)}},oe.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){oe.offset.setOffset(this,t,e)});var e,n,i={top:0,left:0},o=this[0],s=o&&o.ownerDocument;if(s)return e=s.documentElement,oe.contains(e,o)?(typeof o.getBoundingClientRect!==Se&&(i=o.getBoundingClientRect()),n=U(s),{top:i.top+(n.pageYOffset||e.scrollTop)-(e.clientTop||0),left:i.left+(n.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}):i},position:function(){if(this[0]){var t,e,n={top:0,left:0},i=this[0];return"fixed"===oe.css(i,"position")?e=i.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),oe.nodeName(t[0],"html")||(n=t.offset()),n.top+=oe.css(t[0],"borderTopWidth",!0),n.left+=oe.css(t[0],"borderLeftWidth",!0)),{top:e.top-n.top-oe.css(i,"marginTop",!0),left:e.left-n.left-oe.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||oi;t&&!oe.nodeName(t,"html")&&"static"===oe.css(t,"position");)t=t.offsetParent;return t||oi})}}),oe.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,e){var n=/Y/.test(e);oe.fn[t]=function(i){return Pe(this,function(t,i,o){var s=U(t);return void 0===o?s?e in s?s[e]:s.document.documentElement[i]:t[i]:void(s?s.scrollTo(n?oe(s).scrollLeft():o,n?o:oe(s).scrollTop()):t[i]=o)},t,i,arguments.length,null)}}),oe.each(["top","left"],function(t,e){oe.cssHooks[e]=E(ne.pixelPosition,function(t,n){return n?(n=en(t,e),on.test(n)?oe(t).position()[e]+"px":n):void 0})}),oe.each({Height:"height",Width:"width"},function(t,e){oe.each({padding:"inner"+t,content:e,"":"outer"+t},function(n,i){oe.fn[i]=function(i,o){var s=arguments.length&&(n||"boolean"!=typeof i),r=n||(i===!0||o===!0?"margin":"border");return Pe(this,function(e,n,i){var o;return oe.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(o=e.documentElement,Math.max(e.body["scroll"+t],o["scroll"+t],e.body["offset"+t],o["offset"+t],o["client"+t])):void 0===i?oe.css(e,n,r):oe.style(e,n,i,r)},e,s?i:void 0,s,null)}})}),oe.fn.size=function(){return this.length},oe.fn.andSelf=oe.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return oe});var si=t.jQuery,ri=t.$;return oe.noConflict=function(e){return t.$===oe&&(t.$=ri),e&&t.jQuery===oe&&(t.jQuery=si),oe},typeof e===Se&&(t.jQuery=t.$=oe),oe}),/*! 
 * Marka - v0.3.1 
 * http://fian.my.id/marka 
 * 
 * Copyright 2014 Alfiana E. Sibuea and other contributors 
 * Released under the MIT license 
 * https://github.com/fians/marka/blob/master/LICENSE 
 */
!function(t){"use strict";function e(t,e){return Array.prototype.forEach.call(t,e)}function n(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName}function i(t,e){t.setAttribute("data-color",e);var n=t.getAttribute("data-icon"),i=t.children.length,o=[];if(r[n].hasOwnProperty("invert"))switch(r[n].invert){case"last":o=[i-1];break;case"last-two":o=[i-2,i-1];break;default:o=r[n].invert}for(var s=0;i>s;s++){var a=e;-1!==o.indexOf(s)&&(a=t.getAttribute("data-bg")),t.children[s].setAttribute("style","background-color:"+a)}}function o(e){var n=e.parentNode,i="rgba(0, 0, 0, 0)";do if(i=t.getComputedStyle(n).backgroundColor,n=n.parentNode,"rgba(0, 0, 0, 0)"!==i)break;while("tagName"in n);("rgba(0, 0, 0, 0)"===i||"transparent"===i)&&(i="rgb(255, 255, 255)"),e.setAttribute("data-bg",i)}function s(t){if(this.elements=[],"string"==typeof t&&(this.elements=document.querySelectorAll(t)),n(t)&&this.elements.push(t),t instanceof Array)for(var i=0;i<t.length;i++)n(t[i])&&this.elements.push(t[i]);if(!this.elements.length)throw Error("No element is selected.");return e(this.elements,function(t){o(t),-1===t.className.indexOf("marka")&&(t.className+=" marka ")}),this}var r={circle:{block:2},"circle-o":{block:3,invert:[1]},"circle-o-filled":{block:3,invert:[1]},"circle-minus":{block:3,invert:"last"},"circle-plus":{block:3,invert:"last-two"},"circle-times":{block:3,invert:"last-two"},"circle-o-minus":{block:4,invert:[1]},"circle-o-plus":{block:4,invert:[1]},"circle-o-times":{block:4,invert:[1]},square:{block:2},"square-o":{block:3,invert:[1]},"square-o-filled":{block:3,invert:[1]},"square-minus":{block:3,invert:"last"},"square-plus":{block:3,invert:"last-two"},"square-times":{block:3,invert:"last-two"},"square-check":{block:3,invert:"last-two"},"square-o-minus":{block:4,invert:[1]},"square-o-plus":{block:4,invert:[1]},"square-o-times":{block:4,invert:[1]},"square-o-check":{block:4,invert:[1]},triangle:{block:3},asterisk:{block:3},minus:{block:1},plus:{block:2},times:{block:2},check:{block:2},sort:{block:6},"sort-half":{block:3},"signal-three-one":{block:3},"signal-three-two":{block:3},"signal-three":{block:3},"signal-five-one":{block:5},"signal-five-two":{block:5},"signal-five-three":{block:5},"signal-five-four":{block:5},"signal-five":{block:5},pause:{block:2},angle:{block:2},"angle-double":{block:4},arrow:{block:3},bars:{block:3},chevron:{block:2}};s.prototype.set=function(t){var n=this;return e(this.elements,function(e){e.setAttribute("data-icon",t);var s=e.getAttribute("data-color");s||(s="rgb(0, 0, 0)",e.setAttribute("data-color",s));var a=e.children.length;if(r[t].block>a)for(var l=0;l<r[t].block-a;l++){var h=document.createElement("i");e.appendChild(h)}o(e),i(e,s),setTimeout(function(){e.className=e.className.replace("  "," ").replace(/marka-icon-[\w-]+/,""),e.className+="marka-icon-"+t+" ","sizeValue"in n&&e.setAttribute("style","width:"+n.sizeValue+"px;height:"+n.sizeValue+"px;"),-1===e.className.indexOf("marka-set")&&setTimeout(function(){e.className+="marka-set "},200)},10)}),this},s.prototype.color=function(t){return e(this.elements,function(e){o(e),i(e,t)}),this},s.prototype.size=function(t){return this.sizeValue=t,e(this.elements,function(e){e.setAttribute("style","width:"+t+"px;height:"+t+"px;")}),this},s.prototype.rotate=function(t){return e(this.elements,function(e){e.className=e.className.replace("  "," ").replace(/marka-rotate-[\w]+/,""),e.className+="marka-rotate-"+t+" "}),this},t.Marka=s}(window),function(){}.call(this);var dmakeft=0,dtotalft=0,dmakejs=0,dtotaljs=0,m=new Marka("#icon1");m.set("circle-o").size(30);var n=new Marka("#icon2");n.set("circle-o").size(30);var o=new Marka("#icon3");o.set("square-o").size(30),$(".toggler1").addClass("active1");var setme="Free Throw",button1=document.getElementById("button1"),button2=document.getElementById("button2"),button3=document.getElementById("button3"),button4=document.getElementById("button4"),button5=document.getElementById("button5");document.getElementById("practice_makeft").value=0,document.getElementById("practice_totalft").value=0,document.getElementById("practice_percentageft").value=0,document.getElementById("practice_makejs").value=0,document.getElementById("practice_totaljs").value=0,document.getElementById("practice_percentagejs").value=0,Hammer(button1).on("tap",function(){setme="Free Throw",$(".toggler1").addClass("active1"),$(".toggler2").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")}),Hammer(button2).on("tap",function(){setme="Jump Shot",$(".toggler2").addClass("active1"),$(".toggler1").removeClass("active1"),o.set("square-o").size(30),o.color("#1a1a1a")}),Hammer(button3).on("tap",function(){if("Free Throw"===setme){dmakeft+=1,dtotalft+=1;var t=dmakeft/dtotalft*100,e=Math.round(t),n=dmakejs/dtotaljs*100,i=Math.round(n);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=e+"%",document.getElementById("practice_makeft").value=dmakeft,document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=e,setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30)}else{dmakejs+=1,dtotaljs+=1;var n=dmakejs/dtotaljs*100,i=Math.round(n);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=i+"%",document.getElementById("practice_makejs").value=dmakejs,document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=i,setTimeout(function(){m.set("circle-o")},250),m.set("circle-o-filled").size(30)}}),Hammer(button4).on("tap",function(){if("Free Throw"===setme){dtotalft+=1;var t=dmakeft/dtotalft*100,e=Math.round(t);document.getElementById("test1").innerHTML=dmakeft+"/"+dtotalft,document.getElementById("test2").innerHTML=e+"%",document.getElementById("practice_totalft").value=dtotalft,document.getElementById("practice_percentageft").value=e,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30)}else{dtotaljs+=1;var i=dmakejs/dtotaljs*100,o=Math.round(i);document.getElementById("test3").innerHTML=dmakejs+"/"+dtotaljs,document.getElementById("test4").innerHTML=o+"%",document.getElementById("practice_totaljs").value=dtotaljs,document.getElementById("practice_percentagejs").value=o,setTimeout(function(){n.set("circle-o")},300),n.set("circle-o-times").size(30)}}),Hammer(button5).on("tap",function(){"Free Throw"===setme?(dmakeft=0,dtotalft=0,ftperct=0,ftperc=0,dmakejs=0,dtotaljs=0,jsperct=0,jsperc=0,setTimeout(function(){o.set("square-check").size(30),o.color("green")},100),document.getElementById("test1").innerHTML="0",document.getElementById("test2").innerHTML="0",document.getElementById("test3").innerHTML="0",document.getElementById("test4").innerHTML="0"):(dmakejs=0,dtotaljs=0,jsperc=0,jsperct=0,dmakeft=0,dtotalft=0,ftperct=0,ftperc=0,setTimeout(function(){o.set("square-check").size(30),o.color("green")},100)),document.getElementById("test1").innerHTML="0",document.getElementById("test2").innerHTML="0",document.getElementById("test3").innerHTML="0",document.getElementById("test4").innerHTML="0"}),function(){}.call(this),function(){}.call(this),function(){}.call(this),function(){}.call(this),function(){}.call(this);