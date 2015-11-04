var gulp = require("gulp"),
    connect = require("gulp-connect");

gulp.task('start-server',function(){
  connect.server({
    root:"www",
    port: 9000
  });
});

gulp.task('default', ['start-server']);
