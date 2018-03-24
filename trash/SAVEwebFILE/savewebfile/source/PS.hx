package;

import flixel.FlxState;
import flixel.ui.FlxButton;
import flixel.FlxG;
import flixel.math.FlxRandom;
import haxe.Http;
// import openfl.filesystem.File;
// import openfl.system.System;
import sys.FileSystem;
import sys.io.File;
import haxe.io.Bytes;
import flash.display.BitmapData;

import sys.io.FileOutput;
import openfl.utils.SystemPath;
import flixel.system.FlxAssets.FlxGraphicAsset;
import flixel.util.FlxColor;
import flixel.FlxSprite;
//test imports from source
// import assets.manager.FileLoader;
// import assets.manager.misc.FileInfo;
// import assets.manager.misc.FileType;
// import assets.manager.misc.LoaderStatus;
// import async.tests.AsyncTestCase;
// import openfl.display.BitmapData;
// import openfl.media.Sound;
// import openfl.utils.ByteArray;

class PS extends FlxState
{
	function webcall():String
    {
        var serverlink:String="https://www.wikimedia.org/static/images/wmf-logo.png";
        
        var req:Http = new Http(serverlink);
        // req.setParameter("u_","");
        req.request( true );
        
        trace(req.responseData);
        trace(Type.typeof(req.responseData));
        trace(req.responseData.length);
		trace(IMAGES_PATH);
		return req.responseData;
        // FlxG.openURL(serverlink);
    }
	
	static var IMAGES_PATH:String = SystemPath.documentsDirectory + "/xxxpng/";
	
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
		pngpath = IMAGES_PATH + "xx" + ".png";
		#else
		pngpath = "xx" + ".png";
		#end
		
		var webpng:String=webcall();
		// var fo:FileOutput = sys.io.File.write("assets/xx.png", true); //working loadgraphic
		var fo:FileOutput = sys.io.File.write(pngpath, true); //old code from mangasketcher
		fo.writeString(webpng);
		fo.close();
		trace(pngpath);
		//trying external assets section
		var filecontent:Bytes = File.getBytes(pngpath);
		#if !openfl_legacy
		var bitmapData:BitmapData = BitmapData.fromBytes (filecontent);
		#else
		var bitmapData:BitmapData = BitmapData.loadFromHaxeBytes (filecontent);
		#end
		btn.pixels=bitmapData;
		// btn.loadGraphic("assets/xx.png",false,100,100);
		btn.updateHitbox();
		
	}
	public var btn:FlxButton;
	override public function create():Void
	{
		super.create();
		this.bgColor=FlxColor.GREEN;
		btn= new FlxButton(0,0,"testwebcallbutton",save_png);
		btn.loadGraphic("assets/x.png",false,100,100);
		add(btn);
	}

	var stopthis:Bool=false;
	override public function update(elapsed:Float):Void
	{
		super.update(elapsed);
		// btn.loadGraphic("assets/xx.png",false,100,100);
		// btn.updateHitbox();
		// if (!stopthis && FileSystem.exists("assets/xx.png")) { trace("sprite added"); add(new FlxSprite(100, 100, "assets/xx.png")); stopthis=true;}
	}
}
