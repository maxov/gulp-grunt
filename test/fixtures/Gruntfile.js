module.exports = function (grunt) {

  grunt.registerTask('test', 'does blah', function () {
    console.log('[test] you should probably see that it has tested');
  });

  grunt.registerTask('error', 'makes an error', function () {
    grunt.log.error('[test] you should see this error');
    return false;
  });

};
