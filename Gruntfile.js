module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      hello: {
        command: 'echo Hello World',
        stdout: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['exec:hello']);

};