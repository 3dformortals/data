import Std;
import EReg;
import StringBuf;

using StringTools;

@:expose
class Codebox {
	public static function main() {
		trace("codebox is ready for use");
	}

	public inline function getMatches(ereg:EReg, input:String, index:Int = 0):Array<String> {
		var matches = [];
		while (ereg.match(input)) {
			matches.push(ereg.matched(index));
			input = ereg.matchedRight();
		}
		return matches;
	}

	public inline function mirror_n(t:String, n:Int):String {
		var regstr:String = '.{1,$n}';
		var r = new EReg(regstr, "");

		var xlist = getMatches(r, t);

		for (i in 0...xlist.length) { // reverse each part of splitted
			var ylist = xlist[i].split("");
			ylist.reverse();
			xlist[i] = ylist.join("");
		}
		return xlist.join("");
	}

	public inline function mirror(t:String):String {
		var x = t;
		for (i in 2...t.length + 1)
			x = mirror_n(x, i);
		return x;
	}

	public inline function upanddown(t:String):String {
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

	public inline function opposite(t:String):String {
		var num = "0123456789";
		var numback = "9876543210";
		var big = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var bigback = "ZYXWVUTSRQPONMLKJIHGFEDCBA";
		var small = "abcdefghijklmnopqrstuvwxyz";
		var smallback = "zyxwvutsrqponmlkjihgfedcba";
		var face = (num + small + big).split("");
		var back = (numback + smallback + bigback).split("");
		var sumdict = new Map<String, String>();
		for (i in 0...face.length) {
			sumdict.set(face[i], back[i]);
		}
		var rez = "";
		var ts = t.split("");
		for (i in 0...ts.length) {
			if (sumdict.exists(ts[i]))
				rez += sumdict[ts[i]];
			else
				rez += "_";
		}
		return rez;
	}

	public inline function mix(t:String, mode:String = "abc") {
		var x = t;
		switch (mode) {
			default:
				{
					x = opposite(x); // a
					x = mirror(x); // b
					x = upanddown(x); // c
				}
			case "cab":
				{
					x = upanddown(x); // c
					x = opposite(x); // a
					x = mirror(x); // b
				}
			case "bca":
				{
					x = mirror(x); // b
					x = upanddown(x); // c
					x = opposite(x); // a
				}
			case "cba":
				{
					x = upanddown(x); // c
					x = mirror(x); // b
					x = opposite(x); // a
				}
			case "acb":
				{
					x = opposite(x); // a
					x = upanddown(x); // c
					x = mirror(x); // b
				}
			case "bac":
				{
					x = mirror(x); // b
					x = opposite(x); // a
					x = upanddown(x); // c
				}
		}
		// little difference, and only two variants finally
		return x;
	}
}
