// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      'scripts/app.js': 'app/scripts/*.js',
      'scripts/solutions.js': 
        [
          'app/scripts/bundles/solutions.bundle.js',
          'app/scripts/functions/class/class-add.js',
          'app/scripts/functions/class/class-remove.js',
          'app/scripts/functions/class/class-array-toggle.js',
          'app/scripts/functions/get/get-all.js',
          'app/scripts/functions/get/get-coord.js',
          'app/scripts/functions/conditional/is-visible.js',
          'app/scripts/functions/conditional/is-nodelist.js',
          'app/scripts/functions/elem-actions/pre-anim.js',
          'app/scripts/blocks.default/main-hidden-menu/main-hidden-menu.js'
        ]
    } 
  },
  stylesheets: {
    joinTo: {
      '/css/main.css': 'app/styles/main.less',
      '/css/solutions.css' : 'app/styles/bundles/solutions.bundle.less'
    }
  }
};
