import {Command, flags} from '@oclif/command';
import { join } from 'path';
import { existsSync, writeFile } from "fs";
import { MISC } from "../utils";
import https = require('https');
import CONST from '../utils/constants';

const SOL = '.sol';

export default class Add extends Command {
  static description = 'Add new opportunity to current workspace'

  static flags = {
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Add);

    if(!args.file) {
      this.log("Filename is required");
      return;
    }

    // TODO: Remove `nicktest`
    const cwd = join(process.cwd(), "nickTest");

    if ( !this.workspaceAssertion(cwd) ) {
      // Assert opportunity.yaml exists
      return;
    }

    const FILETYPE = (args.file as string).endsWith(SOL) ? '' : SOL;
    const filename = MISC.case.pascal(args.file) + FILETYPE;
    const contractDir = join(cwd, 'contracts');
    const contractPath = join(contractDir, filename);

    if(this.contractExists(contractPath, flags.force, filename)) {
      // Assert contract does not exist and --force is false
      return;
    }
    
    const file = await this.download();

    const output = this.customize(file, args.file);

    await this.writeFile(contractPath, output);

  }

  private contractExists(path:string, force:boolean, name:string){
    const existsOrForce = existsSync(path) && !force;
    if(existsOrForce) {
      this.log([`${name} already exists. Please choose another name or rerun with `,
                `-f or --force flag to overwrite existing opportunity.`].join(''))
    }
    return existsOrForce;
  }

  private workspaceAssertion(cwd: string) {
    const inWorkspace = existsSync(join(cwd, "opportunity.yaml")) ;
    if ( !inWorkspace ) {
      // Assert opportunity.yaml exists
      this.log(["File: 'opportunity.yaml' not found. Please navigate to",
                "the root directory of a valid Opportunity workspace"].join(' '));
    }
    return inWorkspace;
  }

  private writeFile(contractPath: string, output: string) : Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(contractPath, output, (err) => {
        if (err) reject(err);
        resolve(void 0);
      });
    });
  }

  private customize(contract: string, name: string) {
    const pascalName = MISC.case.pascal(name);
    const camelName = MISC.case.camel(name);
    return  contract.replace(/(MyOpportunity)/g, pascalName)
                    .replace(/(myOpportunity)/g, camelName);
  }

  private download():Promise<string> {
    return new Promise((resolve, reject) => {
      https.get(CONST.repo.opportunity.raw, (res) => {
        const output: string[] = [];
        res.on('data', (data:any) => output.push(data.toString()))
           .on('end', () => resolve(output.join('')));
      }).on('error', reject);
    });
  }
}
