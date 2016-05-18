var generators = require('yeoman-generator'),
    yosay = require('yosay'),
    chalk = require('chalk'),
    fs = require('fs'),
    replaceall = require('replaceall');

module.exports = generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(yosay("Hello, you're about to " + chalk.green("create a new Drupal beetbox project!") + ",  First answer some simple questions."));

    var prompts = [
      {
        type: 'input',
        name: 'yo_domain',
        message: 'What is the domain name for the project?',
        default: replaceall(' ', '-', this.appname) + '.local'
      }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));

  },

  writing: {
    app: function() {

      // Create Vagrantfile
      this.fs.copy(
          this.templatePath() + "/Vagrantfile",
          this.destinationPath(this.destinationRoot() + "/Vagrantfile")
      );

      // Create config.yml
      this.fs.copyTpl(
          this.templatePath() + "/.beetbox/config.yml",
          this.destinationPath(this.destinationRoot() + "/.beetbox/config.yml"),
          {
            yo_domain: this.props.yo_domain,
          }
      );

    }
  }
  
});