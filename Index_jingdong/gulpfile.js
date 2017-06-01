var gulp= require('gulp');
    server= require('gulp-express'),
    less= require('gulp-less'),
    plumber=require('gulp-plumber'),
    browsersync=require('browser-sync').create(),
    reload=browsersync.reload();



var assets={
  views:'./views/**/*.jade',
  public:{
    js:'./public/js/**/*.js',
    css:'./public/css/**/*.css',
    less:'./public/less/**/*.less'
  },
  publicPath:{
    js:'./public/js',
    css:'./public/css',
    less:'./public/less'
  }
}
gulp.task('default', function() {
  server.run(['./bin/www']); //启动

  gulp.watch(assets.views, server.notify); //监视模板文件
  gulp.watch(['app.js', 'routes/**/*.js'], server.run);
  gulp.watch(assets.public.css, server.notify);
  gulp.watch(assets.public.js, server.notify);
  gulp.watch(assets.public.less,['watch_less']);
});

gulp.task('watch_less',function(){
  gulp.src([assets.public.less,'!./public/less/default-less.less'])
      .pipe(plumber())
      .pipe(less())
      .pipe(gulp.dest(assets.publicPath.css));
});
gulp.task('browser-sync',['default'],function(){
  browsersync.init({
    proxy:'localhost:3000'
  })
})

