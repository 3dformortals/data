package;

import flixel.FlxState;

//случайное целое
import flixel.math.FlxRandom;
import haxe.Http;
// import openfl.filesystem.File;
// import openfl.system.System;
import sys.FileSystem;
import sys.io.FileOutput;
import openfl.utils.SystemPath;

class PlayState extends FlxState
{
	var s:String="0";
	static var IMAGES_PATH:String = SystemPath.documentsDirectory + "/mangasketcherhair/";
	function namenumber_counter():String{
		var nn:String = "";
		nn += Std.string(Date.now().getFullYear());
		if (Std.string(Date.now().getMonth() + 1).length == 1){nn += "0"; }
		nn += Std.string(Date.now().getMonth() + 1);
		if (Std.string(Date.now().getDate()).length == 1){nn += "0"; }
		nn += Std.string(Date.now().getDate());
		if (Std.string(Date.now().getHours()).length == 1){nn += "0"; }
		nn += Std.string(Date.now().getHours());
		if (Std.string(Date.now().getMinutes()).length == 1){nn += "0"; }
		nn += Std.string(Date.now().getMinutes());
		if (Std.string(Date.now().getSeconds()).length == 1){nn += "0"; }
		nn += Std.string(Date.now().getSeconds());
		return nn;
	}
	
	function save_png():Void
	{
		var pngpath:String="";
		var nn:String = namenumber_counter();
		#if mobile
		
		if (!FileSystem.exists(IMAGES_PATH)) { FileSystem.createDirectory(IMAGES_PATH); }
		pngpath = IMAGES_PATH + "msh" + nn + ".png";
		svgpath = IMAGES_PATH + "msh" + nn + ".svg";
		txtpath = IMAGES_PATH + "msh" + nn + ".txt";
		#else
		pngpath = "msh" + nn + ".png";
		svgpath = "msh" + nn + ".svg";
		txtpath = "msh" + nn + ".txt";
		#end
		var b:ByteArray = this.svgsprite.pixels.encode("png", 1);
		var fo:FileOutput = sys.io.File.write(pngpath, true);
		fo.writeString(b.toString());
		fo.close();
		
		var svg:String = "";
		svg = M.sheme.getsvgfull();
		fo = sys.io.File.write(svgpath, true);
		fo.writeString(svg);
		fo.close();
		
		var txt:String = "";
		txt = M.sheme.getarray().toString();
		fo = sys.io.File.write(txtpath, true);
		fo.writeString(txt);
		fo.close();
	}
	
	override public function create():Void
	{
		super.create();
		
	}

	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
	}
}
