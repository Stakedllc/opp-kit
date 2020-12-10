import {Command, flags} from '@oclif/command';
import { join } from 'path';
import { existsSync } from "fs";
import { MISC } from "../utils";

const SOL = '.sol';

export default class Add extends Command {
  static description = 'Add new opportunity to current workspace'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Add);

    if(!args.file) {
      this.log("Filename is required");
      return;
    }

    // TODO: Assert opportunity.yaml exists
    const temp = (args.file as string).endsWith(SOL) ? '' : SOL;
    this.log(temp);
    const filename = args.file + temp;
    this.log(filename);
    // TODO: Remove `nicktest`
    const contractDir = join(process.cwd(), 'nicktest', 'contracts', filename);
    this.log(contractDir);
    const exists = existsSync(contractDir);
    this.log(`${exists}`);
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`)
    }
  }
}
