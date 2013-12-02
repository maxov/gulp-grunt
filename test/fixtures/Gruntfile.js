module.exports = function(grunt) {

    grunt.registerTask('test', 'does blah', function() {
        console.log('test has been run')
    })

    grunt.registerTask('error', 'makes an error', function() {
        throw new Error('you should not see this error')
    })
}