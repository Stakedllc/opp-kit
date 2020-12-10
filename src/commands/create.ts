import {Command, flags} from '@oclif/command';
import { CONSTANTS, MISC } from "../utils";
import { spawn } from 'child_process';
import { Clone } from "nodegit";
import { join } from "path";
import { readFile, rename, writeFile } from 'fs';

export default class Create extends Command {
  static description = 'Create new opportunity workspace.'

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
    this.log(`\nSuccessfully cloned template repo..`);
  }

  private async customize(name: string) {
    this.log("Customizing Template Repo..")
    const dir = join(process.cwd(), name);
    const pascalName = MISC.case.pascal(name);
    const camelName = MISC.case.camel(name);
    const kebabName = MISC.case.kebab(name);
    const generalReplacement = (data:string) => data
          .replace(/(MyOpportunity)/g, pascalName)
          .replace(/(myOpportunity)/g, camelName);
    const kebab = (data:string) => data.replace(/(opportunity-template)/g, kebabName);
    const files = [
      {path:'contracts/MyOpportunity.sol', replace: generalReplacement},
      {path:'scripts/sample-script.js', replace: generalReplacement},
      {path:'test/sample-test.js', replace: generalReplacement},
      {path:'package-lock.json', replace: kebab},
      {path:'package.json', replace: kebab}
    ];

    const promises = files.map((file, i) => new Promise((resolve, reject) => {
      const path = join(dir, file.path);
      readFile(path, { encoding: 'utf8' }, (err, data) => {
        if ( err ) reject(err);
        const output = file.replace(data);
        writeFile(path, output, err => {
          if ( err ) reject(err);
          if ( !i ) { // rename base contract
            rename(path, join(dir, 'contracts', `${pascalName}.sol`), resolve);
          } else {
            resolve();
          }
        });
      });
    }));
    await Promise.all(promises);
    this.log(`${pascalName} Opportunity Created..`)
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
