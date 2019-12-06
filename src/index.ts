export {}
import {Command, flags} from '@oclif/command'
const envoy = require('./envoy');

class Toenvoy extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to of the User'}),
    port: flags.string({char: 'n', description: 'Port number to run the'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Toenvoy)
    const name = flags.name || 'world'
    this.log(`hello ${name} `)
    var rslts = await envoy.write()
    console.info(rslts)
    var swagger = await envoy.readSwaggerAndAddContent();
    console.info(swagger)
    var  docker = await envoy.createDockerFile();
    console.info(docker)
  }
}

export = Toenvoy
