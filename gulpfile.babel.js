import { src, dest, watch } from "gulp"
import sass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import sourcemaps from "gulp-sourcemaps"
import rename from "gulp-rename"
import pug from "gulp-pug"
import browserSync from "browser-sync"


function serve() {
	browserSync.init({
		server: "dist"
	})
	watch("src/styles/**/*.scss", scssCompiler)
	watch("src/templates/**/*.pug", pugCompiler)
	watch("src/**/*")
		.on("change", browserSync.reload)
}

function scssCompiler(done) {
	src("src/styles/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: "compressed"
		}).on("error", err => console.error(err)))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write())
		.pipe(rename({suffix: ".min"}))
		.pipe(dest("dist/public/css"))
	done()
}

function pugCompiler(done) {
	src("src/templates/pages/*.pug")
		.pipe(pug()).on("error", err => console.log(err))
		.pipe(dest("dist"))
	done()
}

export default serve