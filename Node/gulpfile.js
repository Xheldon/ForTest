var gulp = require('gulp');
var through = require('through2');
gulp.task('default',function(){
	gulp.src('index.css').pipe(through.obj(function(file, encoding, cb){
        var fileArr = file.contents
            .toString()
            .split('url(/src/')
            .map(function(value,key){
            if(key == 0){
                return value;
            }else{
                return 'url(http://xheldon.com/' + value;
            }
        });
        file.contents = new Buffer(fileArr.join(''));
        this.push(file);
        cb();
    })).pipe(gulp.dest('a'));
});