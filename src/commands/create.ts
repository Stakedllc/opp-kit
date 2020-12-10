import {Command, flags} from '@oclif/command';
import { CONSTANTS, MISC } from "../utils";
import { spawn } from 'child_process';
import { Clone } from "nodegit";
import { join } from "path";
import { readFile, rename, writeFile } from 'fs';

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

    // TODO Sanitize opportunityName

    // TODO check for existing directory

    await this.git(args.opportunityName);

    await this.customize(args.opportunityName);

    await this.install(args.opportunityName, flags.verbose);

  }

  async git(opportunityName:string) {
    this.log(`\nCloning repo: ${CONSTANTS.repo.template}\n`);
    await Clone.clone(CONSTANTS.repo.template, opportunityName)
    this.log(`\nSuccessfully created new opportunity: ${opportunityName}\n`);
  }

  private async customize(name: string) {
    const dir = join(process.cwd(), name);
    const files = [
      'contracts/MyOpportunity.sol',
      'scripts/sample-script.js',
      'test/sample-test.js'
    ];
    const oppName = MISC.case.pascal(name);

    const promises = files.map((file, i) => new Promise((resolve, reject) => {
      const path = join(dir, file);
      readFile(path, { encoding: 'utf8' }, (err, data) => {
        if ( err ) reject(err);
        writeFile(path, data.replace(/(MyOpportunity|myOpportunity)/g, oppName), err => {
          if ( err ) reject(err);
          if ( !i ) { // rename base contract
            rename(path, join(dir, 'contracts', `${oppName}.sol`), resolve);
          } else {
            resolve();
          }
        });
      });
    }));
    await Promise.all(promises);
  }
  
  async install(opportunityName: string, verbose = false) {
    this.log("Installing project dependencies...")
    const writer = (pipeline:any) => (data:any) => {if (verbose) pipeline.write(data)};
    return new Promise((resolve, reject) => {
      const options = { cwd: join(process.cwd(), opportunityName), shell:true };
      const install = spawn( 'nvm install ; npm i', options );

      install.stdout.on('data', writer(process.stdout));
      install.stderr.on('data', writer(process.stderr));
    
      install.on('close', (code:any) => {
        if (code) {
          this.log(`child process exited with code ${code}`);
          reject(code);
        } else {
          this.log(`\nSuccessfully installed dependencies for ${opportunityName} opportunity.\n`);
          resolve();
        }
      });
    });
  }

}
