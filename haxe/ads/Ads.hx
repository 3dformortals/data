package ;

import extension.admob.AdMob;
import extension.admob.GravityMode;
// import flixel.util.FlxTimer;
import flixel.FlxG;
import Sys;



class Ads {
    var _mins:Int=0; //sec pause between show
    var _minc:Int=0; //number calls before show
    var _callcounter:Float=0;
    var _timecounter:Float=0; //ms last time of showing between
    var _tnow:Float=0; //ms last time now
    var _a:Bool=false; // statement
    var _b:Bool=false; // statement
    var _c:Bool=false; // statement
    var _cbetween:Bool=true; //user click on between
    var _canshow:Bool=true; //allow show new between
    
    public function new(bannerid:String="test"
        ,interstitialid:String="test"
        ,minpause:Int=0
        ,mincalls:Int=0
        ,gravity:String="down"
        ,testingads:Bool=false):Void
    {
        
        if (testingads) AdMob.enableTestingAds();
        AdMob.onInterstitialEvent = onInterstitialEvent;
        _mins = minpause;
        _minc = mincalls;
        var gv:GravityMode;
        if (gravity=="up"){gv=GravityMode.TOP;}
        else{gv=GravityMode.BOTTOM;}
        AdMob.initAndroid(bannerid,interstitialid,gv);
        // _timecounter=Date.now().getTime();
        
    }
    
    public function between():Void
    {
        
        if(_canshow)
        {
            var _pausesec:Float=0;
            if (_cbetween) _pausesec=_mins*3;
            else _pausesec=_mins;
            
            _callcounter+=1;
            _tnow=Date.now().getTime();
            if (_tnow>(_timecounter+_pausesec*1000)) _a=true else _a=false;
            if (FlxG.elapsed*_callcounter>_pausesec)_b=true else _b=false;
            if (_callcounter>_minc) _c=true else _c=false;
            if ((_a || _b) && _c)
            {
                // trace(_a,_b,_c);
                // _canshow=false;//чето тут криво
                _timecounter=_tnow;
                AdMob.showInterstitial(0);
            }
        // trace("--------------------------------");
        // trace(_canshow);
        // trace("fge",FlxG.elapsed);
        // trace("tc",_timecounter);
        // trace("tn",_tnow);
        // trace("cc",_callcounter);
        }
        
        // AdMob.showInterstitial();
        
        
        // AdMob.showInterstitial(_mins,_minc);
        
    }
    
    public function showbanner():Void
    {
        AdMob.showBanner();
    }
    
    public function hidebanner():Void
    {
        AdMob.hideBanner();
    }
    
    function onInterstitialEvent(event:String) {
        // trace("THE INSTERSTITIAL IS "+event);
        /*
        Note that the "event" String will be one of this:
            AdMob.LEAVING
            AdMob.FAILED
            AdMob.CLOSED
            AdMob.DISPLAYING
            AdMob.LOADED
            AdMob.LOADING
        
        So, you can do something like:
        if(event == AdMob.CLOSED) trace("The player dismissed the ad!");
        else if(event == AdMob.LEAVING) trace("The player clicked the ad :), and we're leaving to the ad destination");
        else if(event == AdMob.FAILED) trace("Failed to load the ad... the extension will retry automatically.");
        */
        if (event == AdMob.CLOSED)
        {
            _cbetween=false;
            _callcounter=0;
            _timecounter=Date.now().getTime();
            _canshow=true;
        }
        else if(event == AdMob.LEAVING)
        {
            _cbetween=true;
            _callcounter=0;
            _timecounter=Date.now().getTime();
            _canshow=true;
        }
        else if(event == AdMob.FAILED)
        {
            _cbetween=false;
            _canshow=true;
        }
        
    }
}