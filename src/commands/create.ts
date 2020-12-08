import {Command, flags} from '@oclif/command';
import { CONSTANTS } from "../utils";
import { spawn } from 'child_process';
import {Clone} from "nodegit";

export default class Create extends Command {
  static description = 'Create new opportunity project.'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print', required: true}),
    // flag with no value (-f, --force)
    verbose: flags.boolean({char: 'v'}),
  }

  static args = [{name: 'opportunityName'}]

  async run() {
    const {args, flags} = this.parse(Create)

    if (!args.opportunityName) {
      this.log("\nMissing opportunity name argument.");
      return;
    }

    // TODO check for existing directory
    await this.git(args.opportunityName);
    await this.install(args.opportunityName, flags.verbose);

    this.log();
  }

  async git(opportunityName:string) {
    this.log(`\nCloning repo: ${CONSTANTS.repo.template}\n`);
    await Clone.clone(CONSTANTS.repo.template, opportunityName)
    this.log(`\nSuccessfully created new opportunity: ${opportunityName}\n`);
  }
  
  async install(opportunityName: string, verbose = false) {
    this.log("Installing project dependencies...")
    const writer = (pipeline:any) => (data:any) => {if (verbose) pipeline.write(data)};
    return new Promise((resolve, reject) => {
      const { join } = require("path");
      const install = spawn('npm', ['i'], {
        cwd: join(process.cwd(), opportunityName)
      });

      install.stdout.on('data', writer(process.stdout));
      install.stderr.on('data', writer(process.stderr));
    
      install.on('close', (code:any) => {
        if (code) {
          console.log(`child process exited with code ${code}`);
          reject(code);
        } else {
          this.log(`\nSuccessfully installed dependencies for ${opportunityName} opportunity.\n`);
          resolve();
        }
      });

    });

  }

}
