module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['less']
                },
                files: {
                    'css/styles.css': 'css/_import.less' // destination file / source file
                }
            }
        },
        watch: {
            files: ['**/*.less'], // which files to watch
            tasks: ['less', 'default']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['less', 'watch']);
};