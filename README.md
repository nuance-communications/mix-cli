mix-cli
======

`mix-cli` is a command line tool that provides access to the Mix V4 API.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@nuance-mix/mix-cli.svg)](https://npmjs.org/package/@nuance-mix/mix-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@nuance-mix/mix-cli.svg)](https://npmjs.org/package/@nuance-mix/mix-cli)
[![License](https://img.shields.io/npm/l/@nuance-mix/mix-cli.svg)](https://github.com/nuance-communications/mix-cli/blob/main/LICENSE)

<!-- toc -->
* [Installing mix-cli](#installing-mix-cli)
* [Migrating to version 2 of mix-cli](#migrating-to-version-2-of-mix-cli)
* [Configuring mix-cli](#configuring-mix-cli)
* [Retrieving the access token](#retrieving-the-access-token)
* [Choosing a command output format](#choosing-a-command-output-format)
* [Sorting and filtering](#sorting-and-filtering)
* [Autocompleting commands](#autocompleting-commands)
* [Providing defaults for often-used command arguments](#providing-defaults-for-often-used-command-arguments)
* [Using the mix-cli client code](#using-the-mix-cli-client-code)
* [Learning more about Mix](#learning-more-about-mix)
* [Contributing](#contributing)
* [Commands](#commands)
<!-- tocstop -->

# Installing mix-cli
To install `mix-cli`, simply type:

```shell
npm install -g @nuance-mix/mix-cli
```

`mix-cli` requires Node.js version 14 or more recent.

# Migrating to version 2 of mix-cli
`mix-cli` introduces a few breaking changes. See the [migration documentation](docs/MIGRATING.md)
as those changes could disrupt automated workflows.

# Configuring mix-cli
In order to configure `mix-cli`, you need _service credentials_ that give you
access to the Mix V4 API. These credentials can be found under your user profile
in the Mix.dashboard Tool.

To configure `mix-cli`, simply type:

```
mix init
```

The `init` command asks for a few pieces of configuration data. Defaults
are provided for the Mix production system in the US geography. Service
credentials are requested last.

The `mix-cli` configuration is stored under `~/.config/@nuance-mix/mix-cli/` on Unix and
macOS systems and under `%LOCALAPPDATA%\@nuance-mix\mix-cli\` on Windows systems. The
configuration is stored in a file named "config.json" that is accessible only to
the user who executed the `init` command.

## Using mix-cli with multiple Mix systems
When you run the `init` command, `mix-cli` detects the name of the Mix system by parsing
the hostname provided for the Mix API server. It suggests this name as an answer
when it prompts you for the "Mix system name".

Say you have initially run the `init` command to configure mix-cli for the "us" Mix system.
You can run the `init` command a second time to configure the "eu" system using the relevant
hostnames. `mix-cli` stores the configuration of both systems.

You can then type `mix auth --system us` to switch to and authenticate with the "us" Mix
system. Similarly, typing `mix auth --system eu` does the same but with the "eu" Mix system.
`mix-cli` remembers the last Mix system it authenticated with so using `mix auth` with the
`system` flag is only needed when switching to a different Mix system.

Finally, all `mix-cli` commands complete their human-readable output by reporting
which Mix system the command was executed against.

## Overriding the central configuration
Configuration elements can be overriden by using the following environment
variables:

 *  **MIX_API_SERVER:** the Mix V4 API server fully-qualified domain name
 *  **MIX_AUTH_SERVER**: the Mix Authentication server fully-qualified domain name
 *  **MIX_CLIENT_ID**: your service credentials client ID
 *  **MIX_CLIENT_SECRET**: your service credentials client secret
 *  **MIX_SCOPE**: OAuth scope used to access the Mix V4 API
 *  **MIX_TENANT**: your Mix tenant


It is also possible to configure these environment variables using a `.env` file.
`mix-cli` looks for the `.env` file in the current working directory when it
starts up.

Configuration values are read in the following order, where the last value
assignment wins:

 * central configuration file
 * `.env` file in current working directory
 * environment variables already set in the execution environment 

# Retrieving the access token
With the relevant configuration in place, you first need to retrieve an access
token before using any of the other cli commands. Simply type:

```shell
mix auth
```

`mix-cli` stores the access token in a file named "access-token" in the same
directory it stores its central configuration. Like the configuration file,
the access token file is only accessible to the user who executed the `auth`
command.

Access tokens expire after 15 minutes. `mix-cli` takes care of refreshing
the access token. 

# Choosing a command output format
Some commands offer up to 4 different types of output format.

- The _human-readable format_ is the default output format and simply outputs
text or tabular data.
- The "json" format provides the raw data returned by the remote server in JSON
  format.
- The "yaml" format provides the raw data returned by the remote server in YAML
  format.
- The "csv" output format provides multiple rows of comma-separated values with
  a header row and is meant to be consumed by spreadsheet applications.

Select the JSON or YAML output format to get the actual data returned the remote
server. Note that some commands can only display a subset of the data available
when "csv" output is chosen.

# Sorting and filtering
Some commands offer the ability to filter and/or sort the output data. The
filtering and sorting are done by the remote server when the functionality is
supported by the endpoint. Otherwise, filtering and sorting are performed
locally in mix-cli.

# Autocompleting commands
Thanks to the [oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete)
plugin, commands can be autocompleted when mix-cli is used with the bash or zsh
shell.  Type `mix autocomplete bash` or `mix autocomplete zsh`, follow the
instructions and then launch a new shell. You will then get autocompletion of
mix-cli commands by pressing the tab key.

Type `mix autocomplete --refresh-cache` to rebuild the autocompletion cache, which
is useful when upgrading to a version of mix-cli that introduces new commands.

Finally, type `mix autocomplete --help` to get help on using the autocomplete
setup command.

# Providing defaults for often-used command arguments
Many commands require a project ID, organization ID and/or locale. `mix-cli` will
default to the value contained in the following environment variables, if they
exist, or if they are provided in the `.env` file:

 - **MIX_LOCALE:** gets used as default for `--locale`
 - **MIX_ORGANIZATION:** gets used as default for `--organization`.
 - **MIX_PROJECT:** gets used as default for `--project`.

# Using the mix-cli client code
The client code used by `mix-cli` to communicate with the Mix V4 API can be
reused to write other applications that make use of the Mix V4 API.
You can view the [API client documentation](docs/api/index.html) and there
is a short [example](examples/api/list-organizations.js) in the `examples` directory.
Please consult the [Mix V4 API documentation](https://mix.api.nuance.com/v4/swagger-ui/?src=ghmixcli)
for additional information.

# Learning more about Mix
Please visit the [Mix product page](https://www.nuance.com/omni-channel-customer-engagement/ai-for-developers/nuance-mix.html)
and [Mix documentation site](https://docs.nuance.com/mix/) to learn more about Mix.

# Contributing
See our [Contribution Guidelines](CONTRIBUTING.md).


# Commands
<!-- commands -->
* [`mix autocomplete [SHELL]`](#mix-autocomplete-shell)
* [`mix help [COMMAND]`](#mix-help-command)

## `mix autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ mix autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  display autocomplete installation instructions

EXAMPLES
  $ mix autocomplete

  $ mix autocomplete bash

  $ mix autocomplete zsh

  $ mix autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.10/src/commands/autocomplete/index.ts)_

## `mix help [COMMAND]`

Display help for mix.

```
USAGE
  $ mix help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for mix.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.22/src/commands/help.ts)_
<!-- commandsstop -->
