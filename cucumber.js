module.exports = {
  default: {
    features: 'tests/features/*.feature',
    require: [
      'tests/hooks/hooks.js',    
      'tests/steps/*.js',
    ],
    format: ['progress', 'html:test-results/report.html'],
    publishQuiet: true,
    timeout: 60000, 
  },
};