/**
      return Float Array which is result of sum with previous element. [1.1, 2, 3] return [1.1, 3.1, 5]
      @param a - incoming array
      @return Array<Float>
     */
    public static function sum_previous_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] + a[i - 1]]; }
        return rez;
    }
    /**
      return Float Array which is result of diff with previous element. [1.1, 2, 3] return [1.1, 0.9, 1]
      @param a - incoming array
      @return Array<Float>
     */
    public static function diff_previous_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){ rez = [for (i in 0...al) (i == 0) ? a[i] : a[i] - a[i - 1]]; }
        return rez;
    }
    /**
      return Float Array which is result of sum each element with before elements sum. [1.1, 2, 3] return [1.1, 3.1, 6.1]
      @param a - incoming array
      @return Array<Float>
     */
    public static function sum_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( rez[rez.length - 1] + a[i] );
            }rez.shift();
        }return rez;
    }
    /**
      return Float Array which is result of diff each element with before elements diff. [1.1, 2, 3] return [1.1, 0.9, 2.1]
      @param a - incoming array
      @return Array<Float>
     */
    public static function diff_before_F(a:Array<Float>):Array<Float>{
        var rez:Array<Float> = null;
        var al:Int = a.length;
        if (al > 0){
            rez = [0];
            for (i in 0...al){
                rez.push( a[i] - rez[rez.length - 1] );
            }rez.shift();
        }return rez;
    }