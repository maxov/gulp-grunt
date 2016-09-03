module.exports = function (grunt) {

  grunt.registerTask('test', 'does blah', function () {
    console.log('[test] you should probably see that it has tested');
  });

  grunt.registerTask('error', 'makes an error', function () {
    grunt.log.error('[test] you should see this error');
    return false;
  });

  grunt.registerTask('epic-error', 'should interupt build', function() {
    grunt.fail.warn('[test] I am totally failed');
    return false;
  });

};
