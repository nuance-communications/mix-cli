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
* [`mix app-configs:create`](#mix-app-configscreate)
* [`mix app-configs:deploy`](#mix-app-configsdeploy)
* [`mix app-configs:destroy`](#mix-app-configsdestroy)
* [`mix app-configs:export`](#mix-app-configsexport)
* [`mix app-configs:get`](#mix-app-configsget)
* [`mix app-configs:list`](#mix-app-configslist)
* [`mix app-configs:undeploy`](#mix-app-configsundeploy)
* [`mix app-configs:upgrade`](#mix-app-configsupgrade)
* [`mix app-credentials:list`](#mix-app-credentialslist)
* [`mix applications:get`](#mix-applicationsget)
* [`mix applications:list`](#mix-applicationslist)
* [`mix auth`](#mix-auth)
* [`mix autocomplete [SHELL]`](#mix-autocomplete-shell)
* [`mix bot-configs:list`](#mix-bot-configslist)
* [`mix bot-credentials:list`](#mix-bot-credentialslist)
* [`mix bot-interfaces:export`](#mix-bot-interfacesexport)
* [`mix bot-interfaces:get`](#mix-bot-interfacesget)
* [`mix bots:list`](#mix-botslist)
* [`mix builds:destroy`](#mix-buildsdestroy)
* [`mix builds:export`](#mix-buildsexport)
* [`mix builds:get`](#mix-buildsget)
* [`mix builds:latest`](#mix-buildslatest)
* [`mix builds:list`](#mix-buildslist)
* [`mix channels:activate`](#mix-channelsactivate)
* [`mix channels:configure`](#mix-channelsconfigure)
* [`mix channels:create`](#mix-channelscreate)
* [`mix channels:deactivate`](#mix-channelsdeactivate)
* [`mix channels:rename`](#mix-channelsrename)
* [`mix data-hosts:latest`](#mix-data-hostslatest)
* [`mix data-hosts:list`](#mix-data-hostslist)
* [`mix data-types:list`](#mix-data-typeslist)
* [`mix deployment-flows:list`](#mix-deployment-flowslist)
* [`mix engine-packs:list`](#mix-engine-packslist)
* [`mix entities:configure`](#mix-entitiesconfigure)
* [`mix entities:convert`](#mix-entitiesconvert)
* [`mix entities:create`](#mix-entitiescreate)
* [`mix entities:destroy`](#mix-entitiesdestroy)
* [`mix entities:get`](#mix-entitiesget)
* [`mix entities:list`](#mix-entitieslist)
* [`mix entities:rename`](#mix-entitiesrename)
* [`mix entity-types:list`](#mix-entity-typeslist)
* [`mix env-configs:configure`](#mix-env-configsconfigure)
* [`mix env-configs:destroy`](#mix-env-configsdestroy)
* [`mix env-configs:list`](#mix-env-configslist)
* [`mix environments:list`](#mix-environmentslist)
* [`mix geographies:list`](#mix-geographieslist)
* [`mix grammars:export`](#mix-grammarsexport)
* [`mix grammars:replace`](#mix-grammarsreplace)
* [`mix help [COMMAND]`](#mix-help-command)
* [`mix init`](#mix-init)
* [`mix intents:create`](#mix-intentscreate)
* [`mix intents:destroy`](#mix-intentsdestroy)
* [`mix intents:get`](#mix-intentsget)
* [`mix intents:list`](#mix-intentslist)
* [`mix intents:rename`](#mix-intentsrename)
* [`mix jobs:cancel`](#mix-jobscancel)
* [`mix jobs:get`](#mix-jobsget)
* [`mix jobs:list`](#mix-jobslist)
* [`mix language-topics:list`](#mix-language-topicslist)
* [`mix literals:export`](#mix-literalsexport)
* [`mix literals:import`](#mix-literalsimport)
* [`mix locks:get`](#mix-locksget)
* [`mix locks:list`](#mix-lockslist)
* [`mix ontology:export`](#mix-ontologyexport)
* [`mix ontology:import`](#mix-ontologyimport)
* [`mix organizations:list`](#mix-organizationslist)
* [`mix projects:build`](#mix-projectsbuild)
* [`mix projects:configure`](#mix-projectsconfigure)
* [`mix projects:create`](#mix-projectscreate)
* [`mix projects:destroy`](#mix-projectsdestroy)
* [`mix projects:export`](#mix-projectsexport)
* [`mix projects:get`](#mix-projectsget)
* [`mix projects:list`](#mix-projectslist)
* [`mix projects:lock`](#mix-projectslock)
* [`mix projects:rename`](#mix-projectsrename)
* [`mix projects:replace`](#mix-projectsreplace)
* [`mix projects:unlock`](#mix-projectsunlock)
* [`mix samples:export`](#mix-samplesexport)
* [`mix samples:import`](#mix-samplesimport)
* [`mix system:version`](#mix-systemversion)
* [`mix voices:list`](#mix-voiceslist)

## `mix app-configs:create`

create an application configuration

```
USAGE
  $ mix app-configs:create -D <value> -M <value> -P <value> -T <value> [--json |  | --yaml] [--use-project-data-hosts]
    [--with-build-type asr|dialog|nlu] [--with-locale <value>]

FLAGS
  -D, --deployment-flow=<value>  (required) deployment flow ID
  -M, --mix-app=<value>          (required) Mix application ID
  -P, --project=<value>          (required) project ID (defaults to MIX_PROJECT)
  -T, --tag=<value>              (required) context tag
  --json                         output raw data in JSON format
  --use-project-data-hosts       use data hosts defined in project
  --with-build-type=<option>...  build types to include
                                 <options: asr|dialog|nlu>
  --with-locale=<value>...       locale code; use format 'aa-AA'
  --yaml                         output raw data in YAML format

DESCRIPTION
  create an application configuration

  Use this command to create an application configuration. The Mix Application ID
  can be looked up using the applications:list command. The deployment flow ID
  can be retrieved using the deployment-flows:list command. The context tag
  should be unique.

EXAMPLES
  Create an application configuration using latest builds from project without data hosts information

  $ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922



  Create an application configuration using latest builds from project but only for build type ASR

  and locale en-US, without data hosts information

  $ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922 --with-locale en-US --with-build-type asr



  Create an application configuration using latest builds from project including data hosts defined in project

  $ mix app-configs:create -M 233 -D 32 -T AC_20211028 -P 1922 --use-project-data-hosts
```

_See code: [src/commands/app-configs/create.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/create.ts)_

## `mix app-configs:deploy`

deploy an application configuration

```
USAGE
  $ mix app-configs:deploy -C <value> [--env-geo <value>] [--json |  | --yaml]

FLAGS
  -C, --config=<value>  (required) application configuration ID
  --env-geo=<value>...  environment-geography ID
  --json                output raw data in JSON format
  --yaml                output raw data in YAML format

DESCRIPTION
  deploy an application configuration

  Use this command to deploy an application configuration. The configuration ID
  can be retrieved using the app-configs:list command.

  A specific environment-geography can be specified using the 'env-geo' flag.
  If none is specified, the application configuration will get deployed to the
  next environment-geography defined in the deployment flow specified when
  the application configuration was created.


EXAMPLES
  Deploy an application configuration to the next environment-geography

  $ mix app-configs:deploy -C 88



  Deploy an application configuration to a specific environment-geography

  $ mix app-configs:deploy -C 88 --env-geo 233
```

_See code: [src/commands/app-configs/deploy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/deploy.ts)_

## `mix app-configs:destroy`

destroy an application configuration

```
USAGE
  $ mix app-configs:destroy -C <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -C, --config=<value>   (required) application configuration ID
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  destroy an application configuration

  Use this command to permanently delete an application configuration.
  The deletion needs to be confirmed by re-typing the application configuration
  ID when prompted. It can also be pre-confirmed by using the 'confirm' flag.

EXAMPLES
  $ mix app-configs:destroy -C 3404
```

_See code: [src/commands/app-configs/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/destroy.ts)_

## `mix app-configs:export`

export an application configuration

```
USAGE
  $ mix app-configs:export -C <value> -R <value> [-f <value>] [--overwrite]

FLAGS
  -C, --config=<value>       (required) application configuration ID
  -R, --runtime-app=<value>  (required) fully-qualified runtime application ID
  -f, --filepath=<value>     output file path (defaults to "app-config-<configid>.zip")
  --overwrite                overwrite output file if it exists

DESCRIPTION
  export an application configuration

  Use this command to export an application configuration. The configuration ID
  can be retrieved using the app-configs:list command. The runtime application ID
  can be found with the app-credentials:list command.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  Export an application configuration

  $ mix app-configs:export -C 2269 -R NMDPTRIAL_alex_smith_company_com_20190919T190532 --overwrite
```

_See code: [src/commands/app-configs/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/export.ts)_

## `mix app-configs:get`

get details about an application configuration

```
USAGE
  $ mix app-configs:get -C <value> [--columns <value> ] [--filter <value> | [--json | --csv | --yaml] | ]
    [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -C, --config=<value>  (required) application configuration ID
  --columns=<value>     only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                 output to csv format
  --filter=<value>      filter property by partial string matching, ex: name=foo
  --json                output raw data in JSON format
  --no-header           hide table header from output
  --no-truncate         do not truncate output to fit screen
  --sort=<value>        property to sort by (prepend '-' for descending)
  --yaml                output raw data in YAML format

DESCRIPTION
  get details about an application configuration

  Use this command to get details about a particular application configuration.
  The configuration ID can be retrieved using the app-configs:list command.
  Use the 'json' or 'yaml' flag to get the full details as the human-readable
  output is brief.

EXAMPLES
  $ mix app-configs:get -C 3404
```

_See code: [src/commands/app-configs/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/get.ts)_

## `mix app-configs:list`

list application configurations for a Mix application

```
USAGE
  $ mix app-configs:list -M <value> [--exclude-overrides] [--live-only] [--columns <value> |  | [--json | --csv |
    --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]
    [--with-runtime-app <value>] [--with-tag <value>]

FLAGS
  -M, --mix-app=<value>       (required) Mix application ID
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --exclude-overrides         exclude application configurations that are overridden
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --json                      output raw data in JSON format
  --live-only                 include only the application configurations that are currently deployed
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --sort=<value>              property to sort by (prepend '-' for descending)
  --with-runtime-app=<value>  filter results by fully-qualified runtime app ID
  --with-tag=<value>          filter results by context tag
  --yaml                      output raw data in YAML format

DESCRIPTION
  list application configurations for a Mix application

  Use this command to list the application configurations in an organization.
  The organization ID can be retrieved using the organizations:list command.
  A number of flags can be used to constrain the returned results. The runtime
  application IDs can be retrieved using the app-credentials:list command.

EXAMPLES
  $ mix app-configs:list -M 164 --with-runtime-app NMDPTRIAL_alex_smith_company_com_20190919T190532
```

_See code: [src/commands/app-configs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/list.ts)_

## `mix app-configs:undeploy`

undeploy an application configuration

```
USAGE
  $ mix app-configs:undeploy -C <value> [--env-geo <value>] [--json |  | --yaml]

FLAGS
  -C, --config=<value>  (required) application configuration ID
  --env-geo=<value>...  environment-geography ID
  --json                output raw data in JSON format
  --yaml                output raw data in YAML format

DESCRIPTION
  undeploy an application configuration

  Use this command to undeploy a specific application configuration.
  The configuration ID can be retrieved using the app-configs:list command.
  The environment-geographies relevant to an application configuration can be
  found in the JSON output of the app-configs:get command.

EXAMPLES
  Undeploy an application configuration to the next environment-geography

  $ mix app-configs:undeploy -C 88



  Undeploy an application configuration from a specific environment-geography

  $ mix app-configs:undeploy -C 88 --env-geo 233
```

_See code: [src/commands/app-configs/undeploy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/undeploy.ts)_

## `mix app-configs:upgrade`

update an application configuration to latest build versions

```
USAGE
  $ mix app-configs:upgrade -C <value> [--json |  | --yaml] [--use-project-data-hosts]

FLAGS
  -C, --config=<value>      (required) application configuration ID
  --json                    output raw data in JSON format
  --use-project-data-hosts  use data hosts defined in project
  --yaml                    output raw data in YAML format

DESCRIPTION
  update an application configuration to latest build versions

  Use this command to upgrade an application configuration to the latest build
  versions. The configuration ID can be retrieved using the app-configs:list command.

EXAMPLES
  Upgrade an application configuration using latest builds from project without data hosts information

  $ mix app-configs:upgrade -C 334



  Upgrade an application configuration using latest builds from project including data hosts defined in project

  $ mix app-configs:upgrade -C 334 --use-project-data-hosts
```

_See code: [src/commands/app-configs/upgrade.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-configs/upgrade.ts)_

## `mix app-credentials:list`

list application credentials for a Mix application

```
USAGE
  $ mix app-credentials:list -M <value> [--with-geo-name <value>] [--full] [--json |  | --yaml]

FLAGS
  -M, --mix-app=<value>    (required) Mix application ID
  --full                   show all application credentials details
  --json                   output raw data in JSON format
  --with-geo-name=<value>  geography name
  --yaml                   output raw data in YAML format

DESCRIPTION
  list application credentials for a Mix application

  Use this command to list the application credentials for a Mix application.
  This lets you retrieve the runtime application ID that is required in other
  commands.

EXAMPLES
  List application credentials for a Mix application

  $ mix app-credentials:list -M 22



  List application credentials for a Mix application that match a specific environment-geography

  $ mix app-credentials:list -M 22 --with-geo-name "Production US"
```

_See code: [src/commands/app-credentials/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/app-credentials/list.ts)_

## `mix applications:get`

get details about a Mix application

```
USAGE
  $ mix applications:get -M <value> [--columns <value> |  | [--json |  | --yaml] | ] [--filter <value> |  | ]
    [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -M, --mix-app=<value>  (required) Mix application ID
  --columns=<value>      only show provided columns (comma-separated)
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=<value>         property to sort by (prepend '-' for descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about a Mix application

  Use this command to get details about a particular Mix application.

EXAMPLES
  $ mix applications:get -M 94
```

_See code: [src/commands/applications/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/applications/get.ts)_

## `mix applications:list`

list Mix applications

```
USAGE
  $ mix applications:list [--limit <value>] [--offset <value>] [-O <value>] [--columns <value> |  | [--json | --csv |
    --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>] [--live-only
    --full] [--omit-overridden ] [--with-name <value>] [--with-runtime-app <value>]

FLAGS
  -O, --organization=<value>  organization ID
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --full                      show all application details (permissions allowing)
  --json                      output raw data in JSON format
  --limit=<value>             limit maximum results returned (defaults to Mix API behavior)
  --live-only                 include only the application configurations that are currently deployed
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --offset=<value>            to exclude e.g., the first 10 (sorted) results, set --offset=10
  --omit-overridden           omit application configurations that are overridden
  --sort=<value>              property to sort by (prepend '-' for descending)
  --with-name=<value>         filter results by Mix application name (case-sensitive)
  --with-runtime-app=<value>  filter results by fully-qualified runtime app ID
  --yaml                      output raw data in YAML format

DESCRIPTION
  list Mix applications

  Use this command to list Mix applications.
  A number of flags can be used to constrain the returned results.

EXAMPLES
  List Mix applications to which you have access, across all organizations

  $ mix applications:list



  List Mix applications that are part of a particular organization

  $ mix applications:list -O 64
```

_See code: [src/commands/applications/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/applications/list.ts)_

## `mix auth`

obtain Mix access token

```
USAGE
  $ mix auth [-h]

FLAGS
  -h, --help  Show CLI help.

DESCRIPTION
  obtain Mix access token

  Use this command to retrieve an access token. Once mix-cli has acquired the
  access token, it takes care of refreshing it automatically.

EXAMPLES
  $ mix auth
```

_See code: [src/commands/auth.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/auth.ts)_

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

## `mix bot-configs:list`

list application configurations for a bot

```
USAGE
  $ mix bot-configs:list -B <value> [--exclude-overrides] [--live-only] [--columns <value> |  | [--json | --csv |
    --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]
    [--with-runtime-app <value>] [--with-tag <value>]

FLAGS
  -B, --bot=<value>           (required) Bot ID
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --exclude-overrides         exclude application configurations that are overridden
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --json                      output raw data in JSON format
  --live-only                 include only the application configurations that are currently deployed
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --sort=<value>              property to sort by (prepend '-' for descending)
  --with-runtime-app=<value>  filter results by fully-qualified runtime app ID
  --with-tag=<value>          filter results by context tag
  --yaml                      output raw data in YAML format

DESCRIPTION
  list application configurations for a bot

  Use this command to list the application configurations for a bot.
  A number of flags can be used to constrain the returned results. The runtime
  bot IDs can be retrieved using the bot-credentials:list command.

  Bots are used in certain integration scenarios. A bot is a Mix application
  with configurations that include dialog builds.

  See https://docs.nuance.com/mix/apis/mix-api/v4/reference/bots/ for details.

EXAMPLES
  $ mix bot-configs:list -B 164 --with-runtime-app NMDPTRIAL_alex_smith_company_com_20190919T190532
```

_See code: [src/commands/bot-configs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/bot-configs/list.ts)_

## `mix bot-credentials:list`

list credentials for a bot

```
USAGE
  $ mix bot-credentials:list -B <value> [--with-geo-name <value>] [--full] [--json |  | --yaml]

FLAGS
  -B, --bot=<value>        (required) Bot ID
  --full                   show all bot credentials details
  --json                   output raw data in JSON format
  --with-geo-name=<value>  geography name
  --yaml                   output raw data in YAML format

DESCRIPTION
  list credentials for a bot

  Use this command to list the credentials for a bot.
  This lets you retrieve the runtime application ID that is required
  in other commands.

  Bots are used in certain integration scenarios. A bot is a Mix application
  with configurations that include dialog builds.

  See https://docs.nuance.com/mix/apis/mix-api/v4/reference/bots/ for details.

EXAMPLES
  List bot credentials for a bot

  $ mix bot-credentials:list -B 12



  List bot credentials for a bot that match a specific environment-geography

  $ mix bot-credentials:list -B 12 --with-geo-name "Production US"
```

_See code: [src/commands/bot-credentials/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/bot-credentials/list.ts)_

## `mix bot-interfaces:export`

export the interface of a bot

```
USAGE
  $ mix bot-interfaces:export -B <value> -C <value> [-f <value>] [--overwrite]

FLAGS
  -B, --bot=<value>       (required) Bot ID
  -C, --config=<value>    (required) application configuration ID
  -f, --filepath=<value>  output file path
  --overwrite             overwrite output file if it exists

DESCRIPTION
  export the interface of a bot

  Use this command to export the interface of a bot.
  The configuration ID can be retrieved using the bot-configs:list command.

  Bots are used in certain integration scenarios. A bot is a Mix application
  with configurations that include dialog builds.

  See https://docs.nuance.com/mix/apis/mix-api/v4/reference/bots/ for details.

EXAMPLES
  Export the interface of a bot

  $ mix bot-interfaces:export -B 32 -C 54
```

_See code: [src/commands/bot-interfaces/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/bot-interfaces/export.ts)_

## `mix bot-interfaces:get`

retrieve the interface of a bot

```
USAGE
  $ mix bot-interfaces:get -B <value> -C <value> [--json |  | --yaml]

FLAGS
  -B, --bot=<value>     (required) Bot ID
  -C, --config=<value>  (required) application configuration ID
  --json                output raw data in JSON format
  --yaml                output raw data in YAML format

DESCRIPTION
  retrieve the interface of a bot

  Use this command to get the interface of a bot.
  The configuration ID can be retrieved using the bot-configs:list command.

  Bots are used in certain integration scenarios. A bot is a Mix application
  with configurations that include dialog builds.

  See https://docs.nuance.com/mix/apis/mix-api/v4/reference/bots/ for details.

EXAMPLES
  Retrieve the interface of a bot

  $ mix bot-interfaces:get -B 32 -C 54
```

_See code: [src/commands/bot-interfaces/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/bot-interfaces/get.ts)_

## `mix bots:list`

list bots in an organization

```
USAGE
  $ mix bots:list -O <value> [--live-only --full] [--columns <value> |  | [--json | --csv | --yaml] | ]
    [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>] [--omit-overridden ]

FLAGS
  -O, --organization=<value>  (required) organization ID
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --full                      show all bot details
  --json                      output raw data in JSON format
  --live-only                 include only the application configurations that are currently deployed
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --omit-overridden           omit application configurations that are overridden
  --sort=<value>              property to sort by (prepend '-' for descending)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list bots in an organization

  Use this command to list bots for a specific Mix organization.
  Use flag 'full' to list all bot details, including the list of bot configs.
  Use flag 'live-only'  with flag 'full' to filter out
  bot configs that are NOT deployed.
  Use flag 'omit-overridden'  with flag 'full' to filter out
  bot configs that are overridden.
  Flags 'live-only' and 'omit-overridden' cannot be used together.
  Flags 'live-only' and 'omit-overridden' can only be used with flag 'full'.

EXAMPLES
  $ mix bots:list -O 64
```

_See code: [src/commands/bots/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/bots/list.ts)_

## `mix builds:destroy`

destroy a build

```
USAGE
  $ mix builds:destroy [--build-label <value> | --build-type asr|dialog|nlu | -P <value> | --build-version <value>]
    [-c <value>] [--json |  | --yaml]

FLAGS
  -P, --project=<value>    project ID
  -c, --confirm=<value>    skip confirmation prompt by pre-supplying value
  --build-label=<value>    build label (format is <buildType>_<projectId>_<buildVersion>)
  --build-type=<option>    build type
                           <options: asr|dialog|nlu>
  --build-version=<value>  build version
  --json                   output raw data in JSON format
  --yaml                   output raw data in YAML format

DESCRIPTION
  destroy a build

  Use this command to permanently delete a build. The build can be specified
  using the build label or the combination of project ID, build type and build
  version.

  The deletion needs to be confirmed by re-typing the build label when prompted.
  It can also be pre-confirmed by using the 'confirm' flag.

EXAMPLES
  Destroy a build

  $ mix builds:destroy -P 1922 --build-type asr --build-version 11



  Destroy a build using a build label

  $ mix builds:destroy --build-label ASR_1922_11



  Destroy a project and provide automatic confirmation

  $ mix builds:destroy --build-label ASR_1922_11 --confirm ASR_1922_11
```

_See code: [src/commands/builds/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/builds/destroy.ts)_

## `mix builds:export`

export a project build

```
USAGE
  $ mix builds:export [--build-label <value> | --build-type asr|dialog|nlu | -P <value> | --build-version <value>]
    [-f <value>] [--overwrite]

FLAGS
  -P, --project=<value>    project ID
  -f, --filepath=<value>   output file path (defaults to "build-<buildLabel>.zip")
  --build-label=<value>    build label (format is <buildType>_<projectId>_<buildVersion>)
  --build-type=<option>    build type
                           <options: asr|dialog|nlu>
  --build-version=<value>  build version
  --overwrite              overwrite output file if it exists

DESCRIPTION
  export a project build

  Use this command to export a project build. The build can be specified using
  the build label or the combination of project ID, build type and build version.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  Export a build using a build label

  $ mix builds:export --build-label ASR_29050_11



  Export a build using project ID, build type and build version

  $ mix builds:export -P 29050 --build-type asr --build-version 11 --overwrite
```

_See code: [src/commands/builds/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/builds/export.ts)_

## `mix builds:get`

get details about a build

```
USAGE
  $ mix builds:get [--build-label <value> | --build-type asr|dialog|nlu | -P <value> | --build-version <value>]
    [--columns <value> ] [--no-truncate |  | [--json | --csv | --yaml] | ]

FLAGS
  -P, --project=<value>    project ID
  --build-label=<value>    build label (format is <buildType>_<projectId>_<buildVersion>)
  --build-type=<option>    build type
                           <options: asr|dialog|nlu>
  --build-version=<value>  build version
  --columns=<value>        only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                    output to csv format
  --json                   output raw data in JSON format
  --no-truncate            do not truncate output to fit screen
  --yaml                   output raw data in YAML format

DESCRIPTION
  get details about a build

  Use this command to get details about a particular build. The build can be
  specified using the build label or the combination of project ID, build type
  and build version.

EXAMPLES
  $ mix builds:get -P 1922 --build-type nlu --build-version 1
```

_See code: [src/commands/builds/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/builds/get.ts)_

## `mix builds:latest`

list latest build of each type

```
USAGE
  $ mix builds:latest -P <value> [--columns <value> |  | --json | --yaml] [--csv |  | --no-truncate | ] [--filter
    <value> |  | ] [--no-header |  | ]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  list latest build of each type

  Use this command to list the latest version for each build type of a particular
  project.

EXAMPLES
  List latest builds

  $ mix builds:latest -P 1922
```

_See code: [src/commands/builds/latest.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/builds/latest.ts)_

## `mix builds:list`

list builds

```
USAGE
  $ mix builds:list --build-type asr|dialog|nlu -P <value> [--limit <value>] [--offset <value>] [--sort <value>]
    [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |
    |  | ]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --build-type=<option>  (required) build type
                         <options: asr|dialog|nlu>
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --limit=<value>        limit maximum results returned (defaults to Mix API behavior)
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --offset=<value>       to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>         comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  list builds

  Use this command to list all versions of a build type for a particular project.

EXAMPLES
  $ mix builds:list -P 1922 --build-type nlu
```

_See code: [src/commands/builds/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/builds/list.ts)_

## `mix channels:activate`

activate a channel

```
USAGE
  $ mix channels:activate -P <value> -C <value> [--json |  | --yaml]

FLAGS
  -C, --channel=<value>  (required) channel ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  activate a channel

  Use this command to activate a channel in a project.

EXAMPLES
  $ mix channels:activate -P 1922 \

    --channel bc40667c-e0f6-11ec-9d64-0242ac120003
```

_See code: [src/commands/channels/activate.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/channels/activate.ts)_

## `mix channels:configure`

update channel details

```
USAGE
  $ mix channels:configure -P <value> -C <value> -m <value> --color <value> [--json |  | --yaml]

FLAGS
  -C, --channel=<value>  (required) channel ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -m, --mode=<value>...  (required) channel modes (audioscript|dtmf|interactivity|richtext|tts)
  --color=<value>        (required) channel color
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  update channel details

  Configure the modalities and color of an existing channel in a Mix project.

  A note on channel modes and colors:
  For your convenience, you may enter modes and colors case-insensitively.
  In particular, you can spell any given mode/color with lowercase or capital letters,
  and with dashes ('-') in place of underscores ('_'). The value will be internally converted
  into the format the Mix API expects before the request is made. As an example, the values
  'light-pink', 'light_Pink', and 'LIGHT-PINK' are all equivalent to Mix's 'LIGHT_PINK'.

  Acceptable channel modes are:

  audioscript
  dtmf
  interactivity
  richtext
  tts

  Acceptable channel colors are:

  blue          brown         corn-flower
  cyan          green         grey
  indigo        light-green   light-grey
  light-orange  light-pink    light-purple
  orange        pink          purple
  ruby          salmon        sky
  teal          yellow

  IMPORTANT: Due to a current server-side limitation,
  the command currently requires that both the
  'mode' and 'color' flags are set.

EXAMPLES
  $ mix channels:configure -P 1922  \

    --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \

    --mode DTMF --mode TTS \

    --color SALMON
```

_See code: [src/commands/channels/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/channels/configure.ts)_

## `mix channels:create`

create a new channel

```
USAGE
  $ mix channels:create --color <value> -m <value> --name <value> -P <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -m, --mode=<value>...  (required) channel modes (audioscript|dtmf|interactivity|richtext|tts)
  --color=<value>        (required) channel color
  --json                 output raw data in JSON format
  --name=<value>         (required) channel name
  --yaml                 output raw data in YAML format

DESCRIPTION
  create a new channel

  Use this command to create a new channel in your Mix project.
  A channel defines a collection of different modalities through
  which users interact with your application. The currently available
  modalities are:

  audioscript
  dtmf
  interactivity
  richtext
  tts

  Note that, for your convenience, this command will automatically convert
  inputs to the 'mode' flag as close to the format of the above modes as possible,
  by converting upper-case letters to lower-case and removing deliminating punctuation
  ('-' and '_'). So, the modes 'audioscript', 'AUDIO-SCRIPT', and 'a_u-d_i-o----scriPT'
  are all equivalent to the server-side value of 'AUDIO_SCRIPT'.

  The same conversion is done for colours, except that dashes ('-') are replaced
  with ('_') rather than being deleted. So, 'light-pink', 'light____pink', and
  'LIGHT_PINK' are also equivalent.

  Acceptable channel colors are:

  blue          brown         corn-flower
  cyan          green         grey
  indigo        light-green   light-grey
  light-orange  light-pink    light-purple
  orange        pink          purple
  ruby          salmon        sky
  teal          yellow

  IMPORTANT: Due to a current server-side limitation,
  the command currently requires that both the
  'mode' and 'color' flags are set.

EXAMPLES
  $ mix channels:create -P 1922 --name "New IVR channel" \
      --mode tts --mode interactivity --color light-pink
```

_See code: [src/commands/channels/create.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/channels/create.ts)_

## `mix channels:deactivate`

deactivate a channel

```
USAGE
  $ mix channels:deactivate -P <value> -C <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -C, --channel=<value>  (required) channel ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  deactivate a channel

  Use this command to deactivate a channel in a project.

EXAMPLES
  $ mix channels:deactivate -P 1922 \

    --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \

    --confirm bc40667c-e0f6-11ec-9d64-0242ac120003
```

_See code: [src/commands/channels/deactivate.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/channels/deactivate.ts)_

## `mix channels:rename`

rename a channel

```
USAGE
  $ mix channels:rename -P <value> -C <value> --new-name <value> [--json |  | --yaml]

FLAGS
  -C, --channel=<value>  (required) channel ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --new-name=<value>     (required) new channel name
  --yaml                 output raw data in YAML format

DESCRIPTION
  rename a channel

  Use this command to change the name of a channel in a project.

EXAMPLES
  $ mix channels:rename -P 1922 \

    --channel bc40667c-e0f6-11ec-9d64-0242ac120003 \

    --new-name "voice channel"
```

_See code: [src/commands/channels/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/channels/rename.ts)_

## `mix data-hosts:latest`

list latest data host details

```
USAGE
  $ mix data-hosts:latest -M <value> -P <value> [-D <value>] [--columns <value> |  | [--json | --csv | --yaml] | ]
    [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -D, --deployment-flow=<value>  deployment flow ID
  -M, --mix-app=<value>          (required) Mix application ID
  -P, --project=<value>          (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>              only show provided columns (comma-separated)
  --csv                          output to csv format
  --filter=<value>               filter property by partial string matching, ex: name=foo
  --json                         output raw data in JSON format
  --no-header                    hide table header from output
  --no-truncate                  do not truncate output to fit screen
  --sort=<value>                 property to sort by (prepend '-' for descending)
  --yaml                         output raw data in YAML format

DESCRIPTION
  list latest data host details

  Use this command to retrieve the list of the data hosts
  associated with the last generated dialog build.

EXAMPLES
  $ mix data-hosts:latest -D 658 -M 34 -P 619090
```

_See code: [src/commands/data-hosts/latest.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/data-hosts/latest.ts)_

## `mix data-hosts:list`

list data host details

```
USAGE
  $ mix data-hosts:list -M <value> [--build-label <value> | -P <value> | --build-version <value>] [-D <value>]
    [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |
    |  | ] [--sort <value>]

FLAGS
  -D, --deployment-flow=<value>  deployment flow ID
  -M, --mix-app=<value>          (required) Mix application ID
  -P, --project=<value>          project ID
  --build-label=<value>          build label (format is <buildType>_<projectId>_<buildVersion>)
  --build-version=<value>        build version
  --columns=<value>              only show provided columns (comma-separated)
  --csv                          output to csv format
  --filter=<value>               filter property by partial string matching, ex: name=foo
  --json                         output raw data in JSON format
  --no-header                    hide table header from output
  --no-truncate                  do not truncate output to fit screen
  --sort=<value>                 property to sort by (prepend '-' for descending)
  --yaml                         output raw data in YAML format

DESCRIPTION
  list data host details

  Use this command to list data host details for a particular Mix Application ID
  and dialog build. The build can be specified using the build label or the
  combination of project ID and build version. The Mix Application ID can be
  retrieved using the applications:list command.

EXAMPLES
  $ mix data-hosts:list -D 66 -M 62 -P 14990 --build-version 1
```

_See code: [src/commands/data-hosts/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/data-hosts/list.ts)_

## `mix data-types:list`

list data types

```
USAGE
  $ mix data-types:list [--json |  | --yaml]

FLAGS
  --json  output raw data in JSON format
  --yaml  output raw data in YAML format

DESCRIPTION
  list data types

  Use this command to list the available data types.

EXAMPLES
  $ mix data-types:list
```

_See code: [src/commands/data-types/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/data-types/list.ts)_

## `mix deployment-flows:list`

list deployment flows

```
USAGE
  $ mix deployment-flows:list -O <value> [--limit <value>] [--offset <value>] [--sort <value>] [--columns <value> |  |
    [--json | --csv | --yaml] | ] [--no-truncate |  |  | ]

FLAGS
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --json                      output raw data in JSON format
  --limit=<value>             limit maximum results returned (defaults to Mix API behavior)
  --no-truncate               do not truncate output to fit screen
  --offset=<value>            to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>              comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list deployment flows

  Use this command to list all deployment flows for a specific organization.
  The organization ID can be retrieved by using the organizations:list command.

EXAMPLES
  $ mix deployment-flows:list -O 64
```

_See code: [src/commands/deployment-flows/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/deployment-flows/list.ts)_

## `mix engine-packs:list`

list engine packs

```
USAGE
  $ mix engine-packs:list -O <value> [--json |  | --yaml]

FLAGS
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  --json                      output raw data in JSON format
  --yaml                      output raw data in YAML format

DESCRIPTION
  list engine packs

  Use this command to list the engine packs available to a specific organization.

EXAMPLES
  $ mix engine-packs:list -O 64
```

_See code: [src/commands/engine-packs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/engine-packs/list.ts)_

## `mix entities:configure`

configure an entity

```
USAGE
  $ mix entities:configure -E <value> --entity-type base|freeform|list|regex|relational|rule-based -P <value>
    [--anaphora-type not-set|ref-moment|ref-person|ref-place|ref-thing] [--data-type
    alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|time|yes-no] [--dynamic] [--has-a
    <value>] [--is-a <value>] [-L <value>] [--no-canonicalize] [--pattern <value>] [--sensitive] [--json |  | --yaml]

FLAGS
  -E, --entity=<value>      (required) entity name
  -L, --locale=<value>      locale for regex entity
  -P, --project=<value>     (required) project ID (defaults to MIX_PROJECT)
  --anaphora-type=<option>  anaphora type
                            <options: not-set|ref-moment|ref-person|ref-place|ref-thing>
  --data-type=<option>      data type of entity
                            <options: alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|
                            time|yes-no>
  --dynamic                 make list entity dynamic
  --entity-type=<option>    (required) entity type
                            <options: base|freeform|list|regex|relational|rule-based>
  --has-a=<value>...        define hasA relationship for relational entity
  --is-a=<value>            define isA relationship for relational entity
  --json                    output raw data in JSON format
  --no-canonicalize         prevent canonicalization
  --pattern=<value>         regular expression for regex entity
  --sensitive               mask user sentitive data in logs
  --yaml                    output raw data in YAML format

DESCRIPTION
  configure an entity

  Use this command to configure an entity in a project.

  NOTE: This command cannot change the type of an entity.
  When using this command, you must provide the current type
  of the entity. Use command entities:convert to change the
  type of an entity.

  Mix supports several types of entities: freeform, list, regex,
  relational and rule-based. There are many attributes that can
  be configured for an entity and a good number of these attributes
  are common to all entity types. However, certain attributes apply
  to specific entity types only.

  Regex entities make use of regular expressions specific to a single
  locale. The 'pattern' and 'locale' flags matter only to entities
  of type "regex". It is recommended to surround the pattern
  value with quotes, especially if the escape character "\" is used
  in the pattern. See examples below.

  Relationial entities can have zero or one isA relation and
  zero or many hasA relations. One 'is-a' or 'has-a' flag must be
  set at a minimum for an entity of type "relational".

  The examples below show how to configure each type of entity.
  In each example, every allowed flag is used.
  Note that when a value is not provided for a particular flag,
  the corresponding property in the entity is not modified.


EXAMPLES
  Configure a freeform entity

  $ mix entities:configure -P 1922 -E MESSAGE --entity-type freeform \

    --sensitive --no-canonicalize --data-type not-set



  Configure a list entity

  $ mix entities:configure -P 1922 -E DRINK_SIZE --entity-type list \

    --dynamic --sensitive --no-canonicalize --anaphora-type not-set \

    --data-type not-set



  Configure a regex entity

  $ mix entities:configure -P 1922 -E PHONE_NUMBER --entity-type regex \

    --locale en-US --pattern "\d{10}" --sensitive --no-canonicalize \

    --anaphora-type not-set --data-type digits



  Configure a relational entity

  $ mix entities:configure -P 1922 --E FROM_CITY --entity-type relational \

    --is-a CITY --sensitive --no-canonicalize --anaphora-type not-set \

    --data-type not-set



  Configure a rule-based entity

  $ mix entities:configure -P 1922 -E CARD_TYPE --entity-type rule-based \

    --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set
```

_See code: [src/commands/entities/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/configure.ts)_

## `mix entities:convert`

convert an entity to a different type

```
USAGE
  $ mix entities:convert -E <value> -P <value> --to-entity-type base|freeform|list|regex|relational|rule-based
    [--has-a <value>] [--is-a <value>] [--pattern <value>] [--json |  | --yaml]

FLAGS
  -E, --entity=<value>       (required) entity name
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  --has-a=<value>...         define hasA relationship for relational entity
  --is-a=<value>             define isA relationship for relational entity
  --json                     output raw data in JSON format
  --pattern=<value>          regular expression for regex entity
  --to-entity-type=<option>  (required) new entity type
                             <options: base|freeform|list|regex|relational|rule-based>
  --yaml                     output raw data in YAML format

DESCRIPTION
  convert an entity to a different type

  Use this command to convert an entity to a different type.

  Mix supports several types of entities: freeform, list, regex,
  relational and rule-based. If converting to a regex or rule-based
  entity type, you will have to provide additional information as
  explained below.

  Regex entities make use of regular expressions specific to a single
  locale. Use the 'pattern' flag to provide the regular expression for
  the converted entity. It is recommended to surround the pattern value
  with quotes, especially if the escape character "\" is used in the
  pattern (see examples below). The regular expression provided gets
  applied to the entity across all locales in the project. If the regular
  expression for the entity is locale-dependent, then use the entities:configure
  command to update the regular expression for the relevant locales.

  Relational entities can have zero or one isA relation and
  zero or many hasA relations. One 'is-a' or 'has-a' flag must be
  set at a minimum whent converting an entity to the "relational" type.

  The examples below show how to convert an entity to each possible
  type of entity.


EXAMPLES
  Convert an entity to a freeform entity

  $ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type freeform



  Convert an entity to a list entity

  $ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type list



  Convert an entity to a regex entity

  $ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type regex \

    --pattern "\d{10}"



  Convert an entity to a relational entity

  $ mix entities:convert -P 1922 --E MY_ENTITY --to-entity-type relational

    --is-a CITY



  Convert an entity to a rule-based entity

  $ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type rule-based
```

_See code: [src/commands/entities/convert.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/convert.ts)_

## `mix entities:create`

create a new entity

```
USAGE
  $ mix entities:create --entity-type base|freeform|list|regex|relational|rule-based --name <value> -P <value>
    [--anaphora-type not-set|ref-moment|ref-person|ref-place|ref-thing] [--data-type
    alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|time|yes-no] [--dynamic] [--has-a
    <value>] [--is-a <value>] [-L <value>] [--no-canonicalize] [--pattern <value>] [--sensitive] [--json |  | --yaml]

FLAGS
  -L, --locale=<value>      locale for regex entity
  -P, --project=<value>     (required) project ID (defaults to MIX_PROJECT)
  --anaphora-type=<option>  [default: not-set] anaphora type
                            <options: not-set|ref-moment|ref-person|ref-place|ref-thing>
  --data-type=<option>      [default: not-set] data type of entity
                            <options: alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|
                            time|yes-no>
  --dynamic                 make list entity dynamic
  --entity-type=<option>    (required) entity type
                            <options: base|freeform|list|regex|relational|rule-based>
  --has-a=<value>...        define hasA relationship for relational entity
  --is-a=<value>            define isA relationship for relational entity
  --json                    output raw data in JSON format
  --name=<value>            (required) new entity name
  --no-canonicalize         prevent canonicalization
  --pattern=<value>         regular expression for regex entity
  --sensitive               mask user sentitive data in logs
  --yaml                    output raw data in YAML format

DESCRIPTION
  create a new entity

  Use this command to create a new entity in a project.

  Mix supports several types of entities: freeform, list, regex,
  relational and rule-based. There are many attributes that can
  be passed for the creation of an entity and a good number of
  these attributes are common to all entity types. However, certain
  attributes are mandatory and apply to specific entity types only.

  Regex entities make use of regular expressions specific to a single
  locale. The 'pattern' and 'locale' flags must be set when creating
  an entity of type "regex". It is recommended to surround the pattern
  value with quotes, especially if the escape character "\" is used
  in the pattern. See examples below.

  Relationial entities can have zero or one isA relation and
  zero or many hasA relations. One 'is-a' or 'has-a' flag must be
  set at a minimum when creating an entity of type "relational".

  The 'entity-type', 'name' and 'project' flags are mandatory for
  the creation of any entity type.

  The examples below show how to create each type of entity.
  In each example, every allowed or mandatory flag is used.
  Note that many flags have default values and do not need to be
  explicitly provided.


EXAMPLES
  Create a freeform entity

  $ mix entities:create -P 1922 --entity-type=freeform --name MESSAGE \

    --sensitive --no-canonicalize --data-type not-set



  Create a list entity

  $ mix entities:create -P 1922 --entity-type=list --name DRINK_SIZE \

    --dynamic --sensitive --no-canonicalize --anaphora-type not-set \

    --data-type not-set



  Create a regex entity

  $ mix entities:create -P 1922 --entity-type=regex --name PHONE_NUMBER \

    --locale en-US --pattern "\d{10}" --sensitive --no-canonicalize \

    --anaphora-type not-set --data-type digits



  Create a relational entity

  $ mix entities:create -P 1922 --entity-type=relational --name ARRIVAL_CITY \

    --is-a CITY --sensitive --no-canonicalize --anaphora-type not-set \

    --data-type not-set



  Create a rule-based entity

  $ mix entities:create -P 1922 --entity-type=rule-based --name CARD_TYPE \

    --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set
```

_See code: [src/commands/entities/create.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/create.ts)_

## `mix entities:destroy`

destroy an entity

```
USAGE
  $ mix entities:destroy -E <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -E, --entity=<value>   (required) entity name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  destroy an entity

  Use this command to permanently delete an entity from a project.

EXAMPLES
  $ mix entities:destroy -P 1922 -E CoffeeSize
```

_See code: [src/commands/entities/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/destroy.ts)_

## `mix entities:get`

get details about an entity

```
USAGE
  $ mix entities:get -E <value> -P <value> [--columns <value> --csv] [--no-truncate |  | --json | --yaml]

FLAGS
  -E, --entity=<value>   (required) entity name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about an entity

  Use this command to get details about a particular entity in a project.

  The set of properties listed in the human-readable output of this command
  varies with the type of the entity queried. However, the CSV output provides a
  column for each of the properties present in the superset of all entity type
  properties. This way, a consistent set of columns is always presented.

  Use the 'json' or 'yaml' flag to see the original data returned by the
  server.


EXAMPLES
  $ mix entities:get -P 1922 -E DrinkSize
```

_See code: [src/commands/entities/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/get.ts)_

## `mix entities:list`

list entities

```
USAGE
  $ mix entities:list -P <value> [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ]
    [--no-header |  | ] [--no-truncate |  |  | ] [--with-entity-type base|freeform|list|regex|relational|rule-based]

FLAGS
  -P, --project=<value>        (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>            only show provided columns (comma-separated)
  --csv                        output to csv format
  --filter=<value>             filter property by partial string matching, ex: name=foo
  --json                       output raw data in JSON format
  --no-header                  hide table header from output
  --no-truncate                do not truncate output to fit screen
  --with-entity-type=<option>  entity type
                               <options: base|freeform|list|regex|relational|rule-based>
  --yaml                       output raw data in YAML format

DESCRIPTION
  list entities

  Use this command to list all entities available in a specific project.

EXAMPLES
  List all entities

  $ mix entities:list -P 1922



  List all list-type entities

  $ mix entities:list -P 1922 --with-entity-type list
```

_See code: [src/commands/entities/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/list.ts)_

## `mix entities:rename`

rename an entity

```
USAGE
  $ mix entities:rename -E <value> --new-name <value> -P <value> [--json |  | --yaml]

FLAGS
  -E, --entity=<value>   (required) entity name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --new-name=<value>     (required) new entity name
  --yaml                 output raw data in YAML format

DESCRIPTION
  rename an entity

  Use this command to rename an entity in a project.

EXAMPLES
  $ mix entities:rename -P 1922 -E DrinkSize --new-name DrinkFormat
```

_See code: [src/commands/entities/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entities/rename.ts)_

## `mix entity-types:list`

list entity types

```
USAGE
  $ mix entity-types:list [--json |  | --yaml]

FLAGS
  --json  output raw data in JSON format
  --yaml  output raw data in YAML format

DESCRIPTION
  list entity types

  Use this command to list the available entity types.

EXAMPLES
  $ mix entity-types:list
```

_See code: [src/commands/entity-types/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/entity-types/list.ts)_

## `mix env-configs:configure`

configure an environment configuration

```
USAGE
  $ mix env-configs:configure -P <value> --label <value> --value <value> [--env <value> --env-geo <value>]

FLAGS
  -P, --project=<value>  (required) project ID
  --env=<value>          environment ID
  --env-geo=<value>      environment-geography ID
  --label=<value>        (required) environment configuration name
  --value=<value>        (required) environment configuration value

DESCRIPTION
  configure an environment configuration

  Environment configurations provide default values either for the project as a whole
  or for a specific environment geography. If an environment geography doest not have
  a default for a specific configuration, then the default for the project is used.

  Using this command with only the 'project' flag configures the project-level default value
  for the given configuration label. Using this command with the 'env' and 'env-geo' flags
  in addition to the 'project' flag configures the default value for the given configuration
  label targeting the specified environment geography.

  Passing an empty string as the value will unset the configuration.


EXAMPLES
  Configure an environment configuration project default

  $ mix env-configs:configure -P 1922 --label=GRAMMAR_BASE_PATH --value=https://www.example.com/grammars

  Configure an environment configuration for a specific environment geography

  $ mix env-configs:configure -P 1922 --env=1923 --env-geo=9 --label=GRAMMAR_BASE_PATH --value=https://www.example.com/grammars

  Unset an environment configuration project default

  $ mix env-configs:configure -P 1922 --label=GRAMMAR_BASE_PATH --value=""
```

_See code: [src/commands/env-configs/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/env-configs/configure.ts)_

## `mix env-configs:destroy`

destroy an environment configuration

```
USAGE
  $ mix env-configs:destroy -P <value> --label <value> [--env <value> --env-geo <value>] [-c <value>]

FLAGS
  -P, --project=<value>  (required) project ID
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --env=<value>          environment ID
  --env-geo=<value>      environment-geography ID
  --label=<value>        (required) environment configuration name

DESCRIPTION
  destroy an environment configuration

  Environment configurations provide default values either for the project as a whole
  or for a specific environment geography. If an environment geography doest not have
  a default for a specific configuration, then the default for the project is used.

  Using this command with only the 'project' flag deletes the project-level default value
  for the given configuration label. Using this command with the 'env' and 'env-geo' flags
  in addition to the 'project' flag deletes the default value for the given configuration
  label targeting the specified environment geography.



EXAMPLES
  Destroy an environment configuration project default

  $ mix env-configs:destroy -P 1922 --label GRAMMAR_BASE_PATH

  Destroy an environment configuration for a specific environment geography

  $ mix env-configs:destroy -P 1922 --env=1923 --env-geo=9 --label=GRAMMAR_BASE_PATH

  Destroy an environment configuration project default and provide automatic confirmation

  $ mix env-configs:destroy -P 1922 --label GRAMMAR_BASE_PATH --confirm GRAMMAR_BASE_PATH
```

_See code: [src/commands/env-configs/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/env-configs/destroy.ts)_

## `mix env-configs:list`

list environment configurations

```
USAGE
  $ mix env-configs:list -P <value> [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ]
    [--no-header |  | ] [--no-truncate |  |  | ]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  list environment configurations

  Use this command to list all environment configurations for a specific project.

EXAMPLES
  List environment configurations for project ID 29050

  $ mix env-configs:list -P 29050
```

_See code: [src/commands/env-configs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/env-configs/list.ts)_

## `mix environments:list`

list available environments

```
USAGE
  $ mix environments:list -O <value> [--limit <value>] [--offset <value>] [--sort <value>] [--columns <value> |  |
    [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ]

FLAGS
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --json                      output raw data in JSON format
  --limit=<value>             limit maximum results returned (defaults to Mix API behavior)
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --offset=<value>            to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>              comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list available environments

  Use this command to list all environments available to a specific organization.

EXAMPLES
  $ mix environments:list -O 64
```

_See code: [src/commands/environments/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/environments/list.ts)_

## `mix geographies:list`

list geographies

```
USAGE
  $ mix geographies:list [--limit <value>] [--offset <value>] [--sort <value>] [--columns <value> |  | [--json | --csv
    | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ]

FLAGS
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output to csv format
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --json             output raw data in JSON format
  --limit=<value>    limit maximum results returned (defaults to Mix API behavior)
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --offset=<value>   to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>     comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml             output raw data in YAML format

DESCRIPTION
  list geographies

  Use this command to list the geographies available on the platform.

EXAMPLES
  $ mix geographies:list
```

_See code: [src/commands/geographies/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/geographies/list.ts)_

## `mix grammars:export`

export the grammars for an entity

```
USAGE
  $ mix grammars:export -E <value> -P <value> [-f <value>] [--overwrite]

FLAGS
  -E, --entity=<value>    (required) entity name
  -P, --project=<value>   (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=<value>  output file path (defaults to "grammars-<projectId>-<entity>.zip")
  --overwrite             overwrite output file if it exists

DESCRIPTION
  export the grammars for an entity

  Use this command to export the rule-based GrXML grammars for an entity.
  Note that rule-based grammars are restricted to Nuance Professional Services users
  and not available to all users.

EXAMPLES
  Export the grammars for an entity to a zip file

  $ mix grammars:export -P 29050 -E DrinkSize --overwrite
```

_See code: [src/commands/grammars/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/grammars/export.ts)_

## `mix grammars:replace`

replace the GrXML grammars for an entity 

```
USAGE
  $ mix grammars:replace -E <value> -f <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -E, --entity=<value>    (required) entity name
  -P, --project=<value>   (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>   skip confirmation prompt by pre-supplying value
  -f, --filepath=<value>  (required) input file path
  --json                  output raw data in JSON format
  --yaml                  output raw data in YAML format

DESCRIPTION
  replace the GrXML grammars for an entity

  Use this command to replace the rule-based GrXML grammars for an entity.
  The GrXML files must be provided in a .zip file, in a folder identifying
  the locale for the grammar (for example, en-US/grammar.grxml).
  Note that rule-based grammars are restricted to Nuance Professional Services
  users and not available to all users.

EXAMPLES
  Replace the GrXML grammars for an entity

  $ mix grammars:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip



  Replace the GrXML grammars for an entity using pre-confirmation

  $ mix grammars:replace -P 29050 -E DrinkSize -f 29050_DrinkSize.zip -c DrinkSize
```

_See code: [src/commands/grammars/replace.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/grammars/replace.ts)_

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

## `mix init`

initialize mix-cli configuration

```
USAGE
  $ mix init

DESCRIPTION
  initialize mix-cli configuration

  Use this command to initialize the mix-cli configuration. Elements of the
  configuration can also be overridden using environment variables.

EXAMPLES
  $ mix init
```

_See code: [src/commands/init.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/init.ts)_

## `mix intents:create`

create a new intent

```
USAGE
  $ mix intents:create --name <value> -P <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --name=<value>         (required) new intent name
  --yaml                 output raw data in YAML format

DESCRIPTION
  create a new intent

  Use this command to create a new intent in a project.

EXAMPLES
  $ mix intents:create -P 1922 --name ORDER_DRINK
```

_See code: [src/commands/intents/create.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/intents/create.ts)_

## `mix intents:destroy`

destroy an intent

```
USAGE
  $ mix intents:destroy -I <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -I, --intent=<value>   (required) intent name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  destroy an intent

  Use this command to permanently delete an intent from a project.

EXAMPLES
  $ mix intents:destroy -P 1922 -I ORDER_DRINK
```

_See code: [src/commands/intents/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/intents/destroy.ts)_

## `mix intents:get`

get details about an intent

```
USAGE
  $ mix intents:get -I <value> -P <value> [--columns <value> ] [--no-truncate |  | [--json | --csv | --yaml] | ]

FLAGS
  -I, --intent=<value>   (required) intent name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about an intent

  Use this command to get details about a particular intent in a project.

EXAMPLES
  $ mix intents:get -P 1922 -I ORDER_DRINK
```

_See code: [src/commands/intents/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/intents/get.ts)_

## `mix intents:list`

list intents

```
USAGE
  $ mix intents:list -P <value> [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ]
    [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=<value>         property to sort by (prepend '-' for descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  list intents

  Use this command to list all intents available in a specific project.

EXAMPLES
  $ mix intents:list -P 1922
```

_See code: [src/commands/intents/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/intents/list.ts)_

## `mix intents:rename`

rename an intent

```
USAGE
  $ mix intents:rename -I <value> --new-name <value> -P <value> [--json |  | --yaml]

FLAGS
  -I, --intent=<value>   (required) intent name
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --new-name=<value>     (required) new intent name
  --yaml                 output raw data in YAML format

DESCRIPTION
  rename an intent

  Use this command to rename an intent in a project.

EXAMPLES
  $ mix intents:rename -P 1922 -I ORDER_DRINK --new-name ORDER_COFFEE
```

_See code: [src/commands/intents/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/intents/rename.ts)_

## `mix jobs:cancel`

cancel a job

```
USAGE
  $ mix jobs:cancel -J <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -J, --job=<value>      (required) job ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  cancel a job

  Use this command to cancel a job. Canceling a job does not necessarily
  terminate it but allows a similar job to be launched before the completion
  of the original one.

EXAMPLES
  $ mix jobs:cancel -P 1922 -J 15d4d4ce-7cc3-45f6-ab38-aad326e6fc20
```

_See code: [src/commands/jobs/cancel.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/jobs/cancel.ts)_

## `mix jobs:get`

get details about a job

```
USAGE
  $ mix jobs:get -J <value> -P <value> [--columns <value> ] [--no-header | [--json | --csv | --yaml] | ]
    [--no-truncate |  |  | ] [--watch]

FLAGS
  -J, --job=<value>      (required) job ID
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --watch                poll status of job every minute
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about a job

  Use this command to get details about a particular job.

EXAMPLES
  $ mix jobs:get -P 1922 -J 25a08872-c635-43f1-b459-5bd98a1c2576
```

_See code: [src/commands/jobs/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/jobs/get.ts)_

## `mix jobs:list`

list jobs for a project

```
USAGE
  $ mix jobs:list -P <value> [--limit <value>] [--offset <value>] [--sort <value>] [--columns <value> |  |
    [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --limit=<value>        limit maximum results returned (defaults to Mix API behavior)
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --offset=<value>       to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>         comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  list jobs for a project

  Use this command to list all jobs related to a particular project.

EXAMPLES
  $ mix jobs:list -P 1922
```

_See code: [src/commands/jobs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/jobs/list.ts)_

## `mix language-topics:list`

list language topics for an organization

```
USAGE
  $ mix language-topics:list -O <value> [--columns <value> |  | [--json |  | --yaml] | ] [--filter <value> |  | ]
    [--no-header |  | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=<value>           only show provided columns (comma-separated)
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --json                      output raw data in JSON format
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --sort=<value>              property to sort by (prepend '-' for descending)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list language topics for an organization

  Use this command to list language topics available to a specific organization.

EXAMPLES
  $ mix language-topics:list -O 64
```

_See code: [src/commands/language-topics/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/language-topics/list.ts)_

## `mix literals:export`

export entity literals

```
USAGE
  $ mix literals:export -E <value> -L <value> -P <value> [-f <value>] [--overwrite]

FLAGS
  -E, --entity-name=<value>  (required) entity name
  -L, --locale=<value>...    (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=<value>     output file path (defaults to "literals-<projectId>-<entity>-<locale>.zip")
  --overwrite                overwrite output file if it exists

DESCRIPTION
  export entity literals

  Use this command to export literal-value pairs for a specific entity.
  It is possible to specify the locale(s) for which the pairs should be exported.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  $ mix literals:export -P 29050 -E DrinkSize -L en-US --overwrite
```

_See code: [src/commands/literals/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/literals/export.ts)_

## `mix literals:import`

import entity literals, appending to existing literals by default

```
USAGE
  $ mix literals:import -E <value> -f <value> -L <value> -P <value> [-c <value>] [--json |  | --yaml] [--replace]

FLAGS
  -E, --entity-name=<value>  (required) entity name
  -L, --locale=<value>       (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>      skip confirmation prompt by pre-supplying value
  -f, --filepath=<value>     (required) input file path
  --json                     output raw data in JSON format
  --replace                  replace, rather than append, existing entity literals
  --yaml                     output raw data in YAML format

DESCRIPTION
  import entity literals, appending to existing literals by default

  Use this command to import literal-value pairs into a project. By default, the
  literal-value pairs are appended to the project in the specified locale. It is
  also possible to completely replace literal-value pairs for the specified locale
  by using the 'replace' flag.

  The import needs to be confirmed by re-typing the entity name when prompted.
  It can also be pre-confirmed by using the 'confirm' flag.

EXAMPLES
  Import entity literals by appending

  $ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx



  Import entity literals by appending using pre-confirmation

  $ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx -c DrinkSize



  Import entity literals by replacing

  $ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx --replace



  Import entity literals by replacing using pre-confirmation

  $ mix literals:import -P 29050 -E DrinkSize -L en-US -f literals.trsx -c DrinkSize --replace
```

_See code: [src/commands/literals/import.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/literals/import.ts)_

## `mix locks:get`

get details about a project lock

```
USAGE
  $ mix locks:get -P <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about a project lock

  Use this command to get details about a project lock.
  A project cannot be edited while it is locked.

EXAMPLES
  Get details about a project lock

  $ mix locks:get -P 1922"
```

_See code: [src/commands/locks/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/locks/get.ts)_

## `mix locks:list`

list project locks

```
USAGE
  $ mix locks:list [-P <value>] [-U <value>] [-O <value>] [--limit <value>] [--offset <value>] [--sort <value>]
    [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |
    |  | ]

FLAGS
  -O, --organization=<value>  organization ID (defaults to MIX_ORGANIZATION)
  -P, --project=<value>       project ID (defaults to MIX_PROJECT)
  -U, --user=<value>          user ID
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --json                      output raw data in JSON format
  --limit=<value>             limit maximum results returned (defaults to Mix API behavior)
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --offset=<value>            to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>              comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list project locks

  Use this command to get a list of all project locks.
  The list can be constrained using the project, organization
  and/or user flags.

  A project cannot be edited while it is locked.

EXAMPLES
  list project locks

  $ mix locks:list -P 249 -U 32
```

_See code: [src/commands/locks/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/locks/list.ts)_

## `mix ontology:export`

export ontology

```
USAGE
  $ mix ontology:export -L <value> -P <value> [-f <value>] [--overwrite]

FLAGS
  -L, --locale=<value>...  (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>    (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=<value>   output file path (defaults to "ontology-<projectId>-<locale>.zip")
  --overwrite              overwrite output file if it exists

DESCRIPTION
  export ontology

  Use this command to export the ontology for a particular project.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  $ mix ontology:export -P 29050 -L en-US --overwrite
```

_See code: [src/commands/ontology/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/ontology/export.ts)_

## `mix ontology:import`

import by appending to existing ontology

```
USAGE
  $ mix ontology:import -f <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -P, --project=<value>   (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>   skip confirmation prompt by pre-supplying value
  -f, --filepath=<value>  (required) input file path
  --json                  output raw data in JSON format
  --yaml                  output raw data in YAML format

DESCRIPTION
  import by appending to existing ontology

  Use this command to import an ontology into a specific project. The provided
  ontology can only be appended to the existing ontology.

  The import needs to be confirmed by re-typing the project ID when prompted.
  It can also be pre-confirmed by using the 'confirm' flag.

EXAMPLES
  Import an ontology

  $ mix ontology:import -P 29050 -f ontology.zip



  Import an ontology using pre-confirmation

  $ mix ontology:import -P 29050 -f ontology.zip -c 29050
```

_See code: [src/commands/ontology/import.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/ontology/import.ts)_

## `mix organizations:list`

list available Mix organizations

```
USAGE
  $ mix organizations:list [--all] [--full] [--limit <value>] [--offset <value>] [--sort <value>] [--columns <value> | 
    | [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ] [--no-truncate |  |  | ]
    [--with-organization-type personal|standard]

FLAGS
  --all                              show all organizations
  --columns=<value>                  only show provided columns (comma-separated)
  --csv                              output to csv format
  --filter=<value>                   filter property by partial string matching, ex: name=foo
  --full                             display all organization details, including members count
  --json                             output raw data in JSON format
  --limit=<value>                    limit maximum results returned (defaults to Mix API behavior)
  --no-header                        hide table header from output
  --no-truncate                      do not truncate output to fit screen
  --offset=<value>                   to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>                     property to sort by (prepend '-' for descending)
  --with-organization-type=<option>  organization type
                                     <options: personal|standard>
  --yaml                             output raw data in YAML format

DESCRIPTION
  list available Mix organizations

  Use this command to list the organizations you are part of.

EXAMPLES
  $ mix organizations:list
```

_See code: [src/commands/organizations/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/organizations/list.ts)_

## `mix projects:build`

build a project

```
USAGE
  $ mix projects:build -L <value> -P <value> [--build-type asr|dialog|nlu] [--notes <value>] [--nlu-model-type
    accurate|fast] [--json |  | --yaml]

FLAGS
  -L, --locale=<value>...    (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  --build-type=<option>...   [default: nlu] build type
                             <options: asr|dialog|nlu>
  --json                     output raw data in JSON format
  --nlu-model-type=<option>  [default: fast] build version
                             <options: accurate|fast>
  --notes=<value>            notes about the build
  --yaml                     output raw data in YAML format

DESCRIPTION
  build a project

  Use this command to build a project.

EXAMPLES
  Build a project to create models for nlu and asr using locale en-US

  $ mix projects:build -L en-US -P 1922 --build-type asr --build-type nlu --nlu-model-type fast --notes "Our first build"
```

_See code: [src/commands/projects/build.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/build.ts)_

## `mix projects:configure`

configure a project

```
USAGE
  $ mix projects:configure --data-pack <value> -P <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --data-pack=<value>    (required) data pack name, including version (use aa-AA@x.y.z format)
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  configure a project

  Use this command to update the data pack for a locale used in a project.
  The operation is not carried out immediately. Instead, the Mix backend returns
  a job ID that can be used to monitor progress. mix-cli outputs detailed
  information on the created job when the 'json' flag is provided.

  Note that you cannot add a new locale with this command.


EXAMPLES
  $ mix projects:configure -P 1922 --data-pack en-US@4.7.0
```

_See code: [src/commands/projects/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/configure.ts)_

## `mix projects:create`

create a new project

```
USAGE
  $ mix projects:create -c <value> -L <value> -m <value> -n <value> -O <value> -t <value> [--child-data-compliant]
    [--description <value>] [--engine-pack <value>] [--json |  | --yaml]

FLAGS
  -L, --locale=<value>...     (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  -c, --channel=<value>...    (required) channel
  -m, --modes=<value>...      (required) channel modes (audioscript|dtmf|interactivity|richtext|tts)
  -n, --name=<value>          (required) project name
  -t, --topic=<value>         (required) data pack topic, e.g. 'gen'
  --child-data-compliant      marks projects as being child-data compliant
  --description=<value>       project description (for child data compliance)
  --engine-pack=<value>       engine pack ID (UUID format)
  --json                      output raw data in JSON format
  --yaml                      output raw data in YAML format

DESCRIPTION
  create a new project

  Use this command to create a new project. Many parameters are needed to
  create a project. In particular, channels and modes go hand in hand. A 'channel'
  flag must be matched by a 'modes' flag. Use a comma-separated list (no spaces)
  of mode names to specify multiple modes for a channel.

  Given the right user permissions, it is possible to specify an engine pack using
  the 'engine-pack' flag.

  Nuance’s Child Data Policy
  Nuance’s Child Data Policy is related to online services that are subject to
  applicable child data privacy laws, such as, but not limited to, the Children’s
  Online Privacy Protection Act (COPPA) and Article 8 of GDPR. Nuance’s Child
  Data Policy prohibits providing hosted services to websites or online services
  that are primarily directed towards children under the age of 16.

  When you create a project, you are required to acknowledge whether or not the
  builds for this project will be used in an application that is deployed in a
  Nuance hosted service in connection with an online site, service, application
  or product that is primarily directed to children under 16.

  This acknowledgement must be completed for any projects that are intended
  for use in the Nuance SaaS cloud.

  To acknowledge such a project, use the 'child-data-compliant' flag and also
  provide a description of your project using the 'description' flag.

EXAMPLES
  Create a project with one channel and two modes

  $ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen -n "ACME Project"



  Create a project with two channels: one with two modes, the other with a single mode

  $ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -c Channel2 -m interactivity \

    -O 64 -t gen -n "ACME Project"



  Create a child-data-compliant project

  $ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen -n "ACME Project" \

    --child-data-compliant --description "ACME project description"



  Create a project with a specific engine-pack

  $ mix projects:create -c Channel1 -L en-US -m "dtmf,tts" -O 64 -t gen \

    -n "ACME Project" --engine-pack 995f6e23-07ff-4f89-9e42-97d0398da7fc
```

_See code: [src/commands/projects/create.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/create.ts)_

## `mix projects:destroy`

destroy a project

```
USAGE
  $ mix projects:destroy -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID
  -c, --confirm=<value>  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  destroy a project

  Use this command to permanently delete a specific project.
  Unless a backup exists, there is no way to restore a project that
  has been destroyed.

  The deletion needs to be confirmed by re-typing the project ID when prompted.
  It can also be pre-confirmed by using the 'confirm' flag.

EXAMPLES
  Destroy a project

  $ mix projects:destroy -P 1922



  Destroy a project and provide automatic confirmation

  $ mix projects:destroy -P 1922 -c 1922
```

_See code: [src/commands/projects/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/destroy.ts)_

## `mix projects:export`

export project package

```
USAGE
  $ mix projects:export -P <value> [-f <value>] [--metadata-only] [--overwrite]

FLAGS
  -P, --project=<value>   (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=<value>  output file path (defaults to "project-<projectId>.zip")
  --metadata-only         export project metadata JSON file only
  --overwrite             overwrite output file if it exists

DESCRIPTION
  export project package

  Use this command to export the project package to a zip file.

  Note that the grammar, transformation, and pronunciation files are restricted
  to Nuance Professional Services users and not available to all users.
  As such, the project package exported by regular users will not include
  these files. Regular users may end up with an incomplete project after calling
  this endpoint.

  Use the 'metadata-only' flag to export the project metadata JSON file only.

EXAMPLES
  Export the project package to a zip file

  $ mix projects:export -P 29050 --overwrite



  Export the projecte metadata JSON file only

  $ mix projects:export -P 29050 --metadata-only --overwrite
```

_See code: [src/commands/projects/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/export.ts)_

## `mix projects:get`

get details about a project

```
USAGE
  $ mix projects:get -P <value> [--columns <value>  [--table channels|data-packs|project ]] [--no-header | [--json
    | --csv | --yaml] | ] [--no-truncate |  |  | ] [--sort <value>]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --columns=<value>      only show provided columns (comma-separated) (with 'csv' flag only)
  --csv                  output to csv format (with 'table' flag only)
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=<value>         property to sort by (prepend '-' for descending)
  --table=<option>       data table to output (with 'csv' flag only)
                         <options: channels|data-packs|project>
  --yaml                 output raw data in YAML format

DESCRIPTION
  get details about a project

  Use this command to get details about a particular project.

  CSV output is available for this command but only for one section of project
  information at a time. The chosen section is specifed using the 'table' flag.

EXAMPLES
  $ mix projects:get -P 1922
```

_See code: [src/commands/projects/get.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/get.ts)_

## `mix projects:list`

list projects

```
USAGE
  $ mix projects:list [--include-features] [--exclude-channels] [-O <value>] [--limit <value>] [--offset <value>]
    [--sort <value>] [--columns <value> |  | [--json | --csv | --yaml] | ] [--filter <value> |  | ] [--no-header |  | ]
    [--no-truncate |  |  | ] [--with-name <value>]

FLAGS
  -O, --organization=<value>  organization ID (defaults to MIX_ORGANIZATION)
  --columns=<value>           only show provided columns (comma-separated)
  --csv                       output to csv format
  --exclude-channels          exclude project channels from the list
  --filter=<value>            filter property by partial string matching, ex: name=foo
  --include-features          include the list of features supported by project's engine pack
  --json                      output raw data in JSON format
  --limit=<value>             limit maximum results returned (defaults to Mix API behavior)
  --no-header                 hide table header from output
  --no-truncate               do not truncate output to fit screen
  --offset=<value>            to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=<value>              comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --with-name=<value>         filter results by project name (case sensitive)
  --yaml                      output raw data in YAML format

DESCRIPTION
  list projects

  Use this command to list projects across all organizations.
  A number of flags can be used to constrain the returned results.

EXAMPLES
  List projects to which you have access, across all organizations

  $ mix projects:list



  List projects that are part of a particular organization

  $ mix projects:list -O 64
```

_See code: [src/commands/projects/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/list.ts)_

## `mix projects:lock`

lock a project

```
USAGE
  $ mix projects:lock -P <value> --notes <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --notes=<value>        (required) project lock notes
  --yaml                 output raw data in YAML format

DESCRIPTION
  lock a project

  Use this command to lock a project.
  A project cannot be edited while it is locked.

EXAMPLES
  Lock a project with project lock notes

  $ mix projects:lock -P 1922 --notes="Project lock notes"
```

_See code: [src/commands/projects/lock.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/lock.ts)_

## `mix projects:rename`

rename a project

```
USAGE
  $ mix projects:rename --new-name <value> -P <value> [--json |  | --yaml]

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --new-name=<value>     (required) new project name
  --yaml                 output raw data in YAML format

DESCRIPTION
  rename a project

  Use this command to rename a project.

EXAMPLES
  $ mix projects:rename -P 1922 --new-name ACME
```

_See code: [src/commands/projects/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/rename.ts)_

## `mix projects:replace`

replace the content of a project

```
USAGE
  $ mix projects:replace -f <value> -P <value> [-c <value>] [--json |  | --yaml]

FLAGS
  -P, --project=<value>   (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>   skip confirmation prompt by pre-supplying value
  -f, --filepath=<value>  (required) input file path
  --json                  output raw data in JSON format
  --yaml                  output raw data in YAML format

DESCRIPTION
  replace the content of a project

  Use this command to replace the project content with the .zip file provided.

  It is recommended to use the projects:export command to create a backup of
  the project before using the projects:replace command.

  Note that the grammar, transformation, and pronunciation files are restricted
  to users with the required permissions. Attempting to replace the content of
  a project that contains grammar, transformation, and pronunciation files
  without the permissions needed to provide all the expected files may result
  in an incomplete project.

EXAMPLES
  Replace the content of a project

  $ mix projects:replace -P 29050 -f myProject.zip



  Replace the content of a project using pre-confirmation

  $ mix projects:replace -P 29050 -f myProject.zip -c 29050
```

_See code: [src/commands/projects/replace.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/replace.ts)_

## `mix projects:unlock`

unlock a project

```
USAGE
  $ mix projects:unlock -P <value>

FLAGS
  -P, --project=<value>  (required) project ID (defaults to MIX_PROJECT)

DESCRIPTION
  unlock a project

  Use this command to unlock a project.
  A project cannot be edited while it is locked.

EXAMPLES
  Unlock a project

  $ mix projects:unlock -P 1922"
```

_See code: [src/commands/projects/unlock.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/projects/unlock.ts)_

## `mix samples:export`

export sample sentences

```
USAGE
  $ mix samples:export -P <value> -I <value> -L <value> [-f <value>] [--overwrite]

FLAGS
  -I, --intent-name=<value>  (required) intent name
  -L, --locale=<value>...    (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=<value>     output file path (defaults to "samples-<projectId>-<intent>-<locale>.zip")
  --overwrite                overwrite output file if it exists

DESCRIPTION
  export sample sentences

  Use this command to export samples for an intent in the project.

EXAMPLES
  $ mix samples:export -P 29050 -I ORDER_DRINK -L en-US --overwrite
```

_See code: [src/commands/samples/export.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/samples/export.ts)_

## `mix samples:import`

import sample sentences, appending to existing samples by default

```
USAGE
  $ mix samples:import -f <value> -I <value> -L <value> -P <value> [-c <value>] [--json |  | --yaml] [--replace]

FLAGS
  -I, --intent-name=<value>  (required) intent name
  -L, --locale=<value>       (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=<value>      (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=<value>      skip confirmation prompt by pre-supplying value
  -f, --filepath=<value>     (required) input file path
  --json                     output raw data in JSON format
  --replace                  replace, rather than append, existing samples
  --yaml                     output raw data in YAML format

DESCRIPTION
  import sample sentences, appending to existing samples by default

  Use this command sample sentences into a project.  By default, the samples
  sentences are appended to the project in the specified locale. It is also
  possible to completely replace sample sentences for the specified locale
  by using the 'replace' flag.

  The import needs to be confirmed by re-typing the intent name when prompted.
  It can also be pre-confirmed by using the 'confirm' flag. Consider making
  a project backup before using this command.

EXAMPLES
  Import samples by appending

  $ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx



  Import samples by appending using pre-confirmation

  $ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx -c ORDER_DRINK



  Import samples by replacing

  $ mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx --replace



  Import samples by replacing using pre-confirmation

  $mix samples:import -P 29050 -I ORDER_DRINK -L en-US -f samples.trsx --replace -c ORDER_DRINK
```

_See code: [src/commands/samples/import.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/samples/import.ts)_

## `mix system:version`

list Mix API version and environment

```
USAGE
  $ mix system:version [--columns <value> |  | [--json | --csv | --yaml] | ] [--no-header |  | ] [--no-truncate |  |
    | ]

FLAGS
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output to csv format
  --json             output raw data in JSON format
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --yaml             output raw data in YAML format

DESCRIPTION
  list Mix API version and environment

  Use this command to list Mix APi version and environment information.

EXAMPLES
  $ mix system:version
```

_See code: [src/commands/system/version.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/system/version.ts)_

## `mix voices:list`

list voices in an organization

```
USAGE
  $ mix voices:list -O <value> [--json |  | --yaml]

FLAGS
  -O, --organization=<value>  (required) organization ID (defaults to MIX_ORGANIZATION)
  --json                      output raw data in JSON format
  --yaml                      output raw data in YAML format

DESCRIPTION
  list voices in an organization

  Use this command to list the voices in an organization.
  The organization ID can be retrieved using the organizations:list command.
  A number of flags can be used to constrain the returned results.

EXAMPLES
  $ mix voices:list -O 610
```

_See code: [src/commands/voices/list.ts](https://github.com/nuance-communications/mix-cli/blob/v0.0.0-semantically-released/src/commands/voices/list.ts)_
<!-- commandsstop -->

.
