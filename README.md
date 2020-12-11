Opp-Kit
=================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
<!-- [![Version](https://img.shields.io/npm/v/Opp-Kit.svg)](https://npmjs.org/package/Opp-Kit) -->
<!-- [![Downloads/week](https://img.shields.io/npm/dw/Opp-Kit.svg)](https://npmjs.org/package/Opp-Kit) -->
<!-- [![License](https://img.shields.io/npm/l/Opp-Kit.svg)](https://github.com//Stakedllc/opp-kit/opp/blob/master/package.json) -->

<!-- toc -->
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Installation
<!-- installation -->
```sh-session
# Manual Installation
git clone https://github.com/Stakedllc/opp-kit.git
cd opp-kit
npm i -g
```
<!-- installationstop -->
# Usage
<!-- usage -->
```sh-session
$ opp-kit COMMAND
running command...

$ opp-kit (-v|--version|version)
opp-kit/0.0.0 linux-x64 node-v14.15.1

$ opp-kit --help [COMMAND]
USAGE
  $ opp-kit COMMAND
  ...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`opp-kit add [OPPORTUNITYNAME]`](#opp-kit-add-file)
* [`opp-kit create [OPPORTUNITYNAME]`](#opp-kit-create-opportunityname)
* [`opp-kit help [COMMAND]`](#opp-kit-help-command)

## `opp-kit add [OPPORTUNITYNAME]`

```
USAGE
  $ opp-kit add [OPPORTUNITYNAME]

OPTIONS
  -f, --force      overwrite existing opportunity
  -h, --help       show CLI help
```

_See code: [src/commands/add.ts](https://github.com/Stakedllc/opp-kit/blob/v0.0.0/src/commands/add.ts)_

## `opp-kit create [OPPORTUNITYNAME]`

```
USAGE
  $ opp-kit create [OPPORTUNITYNAME]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  increased logging resolution
```

_See code: [src/commands/create.ts](https://github.com/Stakedllc/opp-kit/blob/v0.0.0/src/commands/create.ts)_

## `opp-kit help [COMMAND]`

```
USAGE
  $ opp-kit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_
<!-- commandsstop -->
