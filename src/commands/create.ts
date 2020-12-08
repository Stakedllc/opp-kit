import {Command, flags} from '@oclif/command';
import { CONSTANTS } from "../utils";

export default class Create extends Command {
  static description = 'Create new opportunities.'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    // name: flags.string({char: 'n', description: 'name to print', required: true}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'opportunityName'}]

  async run() {
    const {args, flags} = this.parse(Create)

    if (!args.opportunityName) {
      this.log("Missing opportunity name argument.");
      return;
    }

    const { spawn } = require('child_process');
    await this.git(spawn, args.opportunityName);
    await this.install(spawn, args.opportunityName);

    this.log();
  }

  async git(spawn:any, opportunityName:string){
    return new Promise((resolve, reject) => {
      const git = spawn('git', ['clone', CONSTANTS.template_repo, opportunityName], {cwd: process.cwd()});
  
      git.stdout.on('data', (data:any) => {
        console.log(`stdout: ${data}`);
      });
  
      git.stderr.on('data', (data:any) => {
        // console.error(`stderr: ${data}`);
        // reject();
      });
  
      git.on('close', (code:any) => {
        if (code) {
          console.log(`child process exited with code ${code}`);
          reject();
        } else {
          this.log(`\nSuccessfully created opportunity: ${opportunityName}\n`);
          resolve();
        }
      });
    });
  }
  
  async install(spawn: any, opportunityName: string) {
    this.log("Installing dependencies...")
    return new Promise((resolve, reject) => {
      const { join } = require("path");
      const install = spawn('npm', ['i'], {
        cwd: join(process.cwd(), opportunityName)
      });

      install.stdout.on('data', (data:any) => {
        process.stdout.write(data);
      });
    
      install.stderr.on('data', (data:any) => {
        process.stderr.write(data);
      });
    
      install.on('close', (code:any) => {
        if (code) {
          console.log(`child process exited with code ${code}`);
          reject(code);
        } else {
          this.log(`\nSuccessfully installed dependencies: ${opportunityName}\n`);
          resolve();
        }
      });

    });

  }

}
