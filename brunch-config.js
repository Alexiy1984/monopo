// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo:  'app.js' 
  },
  stylesheets: {
    joinTo: {
      '/css/main.css': 'app/styles/main.less',
      '/css/solutions.css' : 'app/styles/bundles/solutions.bundle.less'
    }
  }
};
