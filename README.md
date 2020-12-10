OpportunityHelper
=================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/OpportunityHelper.svg)](https://npmjs.org/package/OpportunityHelper)
[![Downloads/week](https://img.shields.io/npm/dw/OpportunityHelper.svg)](https://npmjs.org/package/OpportunityHelper)
[![License](https://img.shields.io/npm/l/OpportunityHelper.svg)](https://github.com//nick-staked/opportunity-helper/opp/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g opportunity-helper
$ OpportunityHelper COMMAND
running command...
$ OpportunityHelper (-v|--version|version)
opportunity-helper/0.0.0 linux-x64 node-v14.15.1
$ OpportunityHelper --help [COMMAND]
USAGE
  $ OpportunityHelper COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`OpportunityHelper add [OPPORTUNITYNAME]`](#opportunityhelper-add-file)
* [`OpportunityHelper create [OPPORTUNITYNAME]`](#opportunityhelper-create-opportunityname)
* [`OpportunityHelper help [COMMAND]`](#opportunityhelper-help-command)

## `OpportunityHelper add [FILE]`

```
USAGE
  $ OpportunityHelper add [FILE]

OPTIONS
  -f, --force      overwrite existing opportunity
  -h, --help       show CLI help
```

_See code: [src/commands/add.ts](https://github.com/nick-staked/opportunity-helper/blob/v0.0.0/src/commands/add.ts)_

## `OpportunityHelper create [OPPORTUNITYNAME]`

```
USAGE
  $ OpportunityHelper create [OPPORTUNITYNAME]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  increased logging resolution
```

_See code: [src/commands/create.ts](https://github.com/nick-staked/opportunity-helper/blob/v0.0.0/src/commands/create.ts)_

## `OpportunityHelper help [COMMAND]`

```
USAGE
  $ OpportunityHelper help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
