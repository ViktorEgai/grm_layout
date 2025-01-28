const plugins = [
	"node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
	"node_modules/slick-carousel/slick/slick.min.js",
	"node_modules/sweetalert2/dist/sweetalert2.min.js",
	"node_modules/inputmask/dist/jquery.inputmask.min.js",
	// "node_modules/aos/dist/aos.js",
	"node_modules/fullcalendar/index.global.min.js",
	"node_modules/isotope-layout/dist/isotope.pkgd.min.js",
	"node_modules/gsap/dist/gsap.min.js",
	"node_modules/gsap/dist/ScrollTrigger.min.js",
	"node_modules/jquery-validation/dist/jquery.validate.min.js",
	"node_modules/jquery-validation/dist/localization/messages_ru.min.js",
];
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const map = require("gulp-sourcemaps");
const chalk = require("chalk");

module.exports = function libs_js(done) {
	if (plugins.length > 0) return src(plugins).pipe(map.init()).pipe(uglify()).pipe(concat("libs.min.js")).pipe(map.write("../sourcemaps")).pipe(dest("build/js/")).pipe(dest("theme/js/"));
	else {
		return done(console.log(chalk.redBright("No added JS plugins")));
	}
};
