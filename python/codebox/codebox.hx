package codebox;

import Std;
import EReg;
import StringBuf;

using StringTools;

class codebox {
	public static function main() {
		trace("codebox is ready for use");
	}

	public static inline function mirror_n(t:String, n:Int):String {
		var regstr:String = ".{1," + Std.string(n) + "}";
		var r = new EReg(regstr, "i");
		var xlist = r.split(t);
		for (x in xlist) { // reverse each part of splitted
			var ylist = x.split("");
			ylist.reverse();
			x = ylist.join("");
		}
		return xlist.join("");
	}

	public static inline function mirror(t:String):String {
		var x = t;
		for (i in 2...t.length + 1)
			x = mirror_n(x, i);
		return x;
	}

	public static inline function upanddown(t:String):String {
		var toup = false;
		var todn = false;
		var x = t.split("");
		for (i in 0...t.length) {
			if (!toup && x[i] != x[i].toUpperCase()) {
				toup = true;
				x[i] = x[i].toUpperCase();
			} else if (!todn && x[i] != x[i].toLowerCase()) {
				todn = true;
				x[i] = x[i].toLowerCase();
			}
		}
		return x.join("");
	}
}
