module.exports = {
  default: {
    require: ["tests/steps/**/*.js", "tests/hooks/**/*.js"],
    format: ["summary", "html:reports/cucumber-report.html"],
    publishQuiet: true,
    timeout: 120000,
  },
};
