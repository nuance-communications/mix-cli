mix-cli
======

`mix-cli` is a command line tool that provides access to the Mix V4 API.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@nuance-mix/mix-cli.svg)](https://npmjs.org/package/@nuance-mix/mix-cli)
[![Downloads/week](https://img.shields.io/npm/dw/@nuance-mix/mix-cli.svg)](https://npmjs.org/package/@nuance-mix/mix-cli)
[![License](https://img.shields.io/npm/l/@nuance-mix/mix-cli.svg)](https://github.com/nuance-communications/mix-cli/blob/main/LICENSE)

<!-- toc -->
* [Installing mix-cli](#installing-mix-cli)
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

# Configuring mix-cli
In order to configure `mix-cli`, you need _service credentials_ that give you
access the Mix V4 API. These credentials can be found under your user profile
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


For convenience, the overriding environment variables can be stored in a `.env`
file. `mix-cli` looks for the `.env` file in the current working directory when it
starts up.

Configuration values found in the `.env` file have precedence those
provided in the central configuration. Configuration values provided using actual
environment variables have precedence over both those in the `.env` file and those
in the central configuration.

# Retrieving the access token
With the relevant configuration in place, you first need to retrieve an access
token before using any of the other cli commands. Simply type:

```shell
mix auth
```

`mix-cli` stores the access token in file named "access-token" in the same
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
plugin, commands can be autocompleted when mix.cli is used with the bash or zsh
shell.  Type `mix autocomplete bash` or `mix autocomplete zsh`, follow the
instructions and then launch a new shell. You will then get autocompletion of
mix.cli commands by pressing the tab key.

Type `mix autocomplete --refresh-cache` to rebuild the autocompletion cache, which
is useful when upgrading to a version of mix.cli that introduces new commands.

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
Please visit the [Mix Documentation site](https://docs.mix.nuance.com?src=ghmixcli)
to learn more about Mix.

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
* [`mix applications:list`](#mix-applicationslist)
* [`mix auth`](#mix-auth)
* [`mix autocomplete [SHELL]`](#mix-autocomplete-shell)
* [`mix builds:destroy`](#mix-buildsdestroy)
* [`mix builds:export`](#mix-buildsexport)
* [`mix builds:get`](#mix-buildsget)
* [`mix builds:latest`](#mix-buildslatest)
* [`mix builds:list`](#mix-buildslist)
* [`mix data-hosts:list`](#mix-data-hostslist)
* [`mix deployment-flows:list`](#mix-deployment-flowslist)
* [`mix engine-packs:list`](#mix-engine-packslist)
* [`mix entities:configure`](#mix-entitiesconfigure)
* [`mix entities:convert`](#mix-entitiesconvert)
* [`mix entities:create`](#mix-entitiescreate)
* [`mix entities:destroy`](#mix-entitiesdestroy)
* [`mix entities:get`](#mix-entitiesget)
* [`mix entities:list`](#mix-entitieslist)
* [`mix entities:rename`](#mix-entitiesrename)
* [`mix environments:list`](#mix-environmentslist)
* [`mix geographies:list`](#mix-geographieslist)
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
* [`mix projects:rename`](#mix-projectsrename)
* [`mix projects:replace`](#mix-projectsreplace)
* [`mix samples:export`](#mix-samplesexport)
* [`mix samples:import`](#mix-samplesimport)
* [`mix system:version`](#mix-systemversion)

## `mix app-configs:create`

create an application configuration

```
USAGE
  $ mix app-configs:create

OPTIONS
  -D, --deployment-flow=deployment-flow  (required) deployment flow ID
  -M, --mix-app=mix-app                  (required) Mix application ID
  -P, --project=project                  (required) project ID (defaults to MIX_PROJECT)
  -T, --tag=tag                          (required) context tag
  --json                                 output raw data in JSON format
  --use-project-data-hosts               use data hosts defined in project
  --with-build-type=asr|dialog|nlu       build types to include
  --with-locale=with-locale              locale code; use format 'aa-AA'
  --yaml                                 output raw data in YAML format

DESCRIPTION
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

_See code: [src/commands/app-configs/create.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/create.ts)_

## `mix app-configs:deploy`

deploy an application configuration

```
USAGE
  $ mix app-configs:deploy

OPTIONS
  -C, --config=config  (required) application configuration ID
  --env-geo=env-geo    environment-geography ID
  --json               output raw data in JSON format
  --yaml               output raw data in YAML format

DESCRIPTION
  Use this command to deploy an application configuration. The configuration ID
  can be retrieved using the app-configs:list command.

  A specific environment-geography can be specified using the --env-geo flag.
  If none is specified, the application configuration will get deployed to the
  next environment-geography defined in the deployment flow specified when
  the application configuration was created.

EXAMPLES
  Deploy an application configuration to the next environment-geography
  $ mix app-configs:deploy -C 88

  Deploy an application configuration to a specific environment-geography
  $ mix app-configs:deploy -C 88 --env-geo 233
```

_See code: [src/commands/app-configs/deploy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/deploy.ts)_

## `mix app-configs:destroy`

destroy an application configuration

```
USAGE
  $ mix app-configs:destroy

OPTIONS
  -C, --config=config    (required) application configuration ID
  -c, --confirm=confirm  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to permanently delete an application configuration.
  The deletion needs to be confirmed by re-typing the application configuration
  ID when prompted. It can also be pre-confirmed by using the --confirm flag.
```

_See code: [src/commands/app-configs/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/destroy.ts)_

## `mix app-configs:export`

export an application configuration

```
USAGE
  $ mix app-configs:export

OPTIONS
  -C, --config=config            (required) application configuration ID
  -R, --runtime-app=runtime-app  (required) fully-qualified runtime application ID
  -f, --filepath=filepath        (required) output file path
  --overwrite                    overwrite output file if it exists

DESCRIPTION
  Use this command to export an application configuration. The configuration ID
  can be retrieved using the app-configs:list command. The runtime application ID
  can be found with the app-credentials:list command.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  Export an application configuration
  $ mix app-configs:export -C 2269 -R NMDPTRIAL_alex_smith_company_com_20190919T190532 -f app-config.zip
```

_See code: [src/commands/app-configs/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/export.ts)_

## `mix app-configs:get`

get details about an application configuration

```
USAGE
  $ mix app-configs:get

OPTIONS
  -C, --config=config  (required) application configuration ID
  --columns=columns    only show provided columns (comma-separated) (with --csv only)
  --csv                output to csv format
  --filter=filter      filter property by partial string matching, ex: name=foo
  --json               output raw data in JSON format
  --no-header          hide table header from output
  --no-truncate        do not truncate output to fit screen
  --sort=sort          property to sort by (prepend '-' for descending)
  --yaml               output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular application configuration.
  The configuration ID can be retrieved using the app-configs:list command.
  Use the --json or --yaml flag to get the full details as the human-readable
  output is brief.

EXAMPLE
  $ mix app-configs:get -C 3404
```

_See code: [src/commands/app-configs/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/get.ts)_

## `mix app-configs:list`

list application configurations for a Mix application

```
USAGE
  $ mix app-configs:list

OPTIONS
  -M, --mix-app=mix-app                (required) Mix application ID
  --columns=columns                    only show provided columns (comma-separated)
  --csv                                output to csv format
  --exclude-overrides                  exclude application configurations that are overridden
  --filter=filter                      filter property by partial string matching, ex: name=foo
  --json                               output raw data in JSON format
  --live-only                          include only the application configurations that are currently deployed
  --no-header                          hide table header from output
  --no-truncate                        do not truncate output to fit screen
  --sort=sort                          property to sort by (prepend '-' for descending)
  --with-runtime-app=with-runtime-app  filter results by fully-qualified runtime app ID
  --with-tag=with-tag                  filter results by context tag
  --yaml                               output raw data in YAML format

DESCRIPTION
  Use this command to list the application configurations in an organization.
  The organization ID can be retrieved using the organizations:list command.
  A number of flags can be used to constrain the returned results. The runtime
  application IDs can be retrieved using the app-credentials:list command.

EXAMPLE
  $ mix app-configs:list -M 164 --with-runtime-app NMDPTRIAL_alex_smith_company_com_20190919T190532
```

_See code: [src/commands/app-configs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/list.ts)_

## `mix app-configs:undeploy`

undeploy an application configuration

```
USAGE
  $ mix app-configs:undeploy

OPTIONS
  -C, --config=config  (required) application configuration ID
  --env-geo=env-geo    environment-geography ID
  --json               output raw data in JSON format
  --yaml               output raw data in YAML format

DESCRIPTION
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

_See code: [src/commands/app-configs/undeploy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/undeploy.ts)_

## `mix app-configs:upgrade`

update an application configuration to latest build versions

```
USAGE
  $ mix app-configs:upgrade

OPTIONS
  -C, --config=config       (required) application configuration ID
  --json                    output raw data in JSON format
  --use-project-data-hosts  use data hosts defined in project
  --yaml                    output raw data in YAML format

DESCRIPTION
  Use this command to upgrade an application configuration to the latest build
  versions. The configuration ID can be retrieved using the app-configs:list command.

EXAMPLES
  Upgrade an application configuration using latest builds from project without data hosts information
  $ mix app-configs:upgrade -C 334

  Upgrade an application configuration using latest builds from project including data hosts defined in project
  $ mix app-configs:upgrade -C 334 --use-project-data-hosts
```

_See code: [src/commands/app-configs/upgrade.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-configs/upgrade.ts)_

## `mix app-credentials:list`

list application credentials for a Mix application

```
USAGE
  $ mix app-credentials:list

OPTIONS
  -M, --mix-app=mix-app          (required) Mix application ID
  --full                         show all application credentials details
  --json                         output raw data in JSON format
  --with-geo-name=with-geo-name  geography name
  --yaml                         output raw data in YAML format

DESCRIPTION
  Use this command to list the application credentials for a Mix application.
  This lets you retrieve the Mix Application ID that is required in other
  commands.

EXAMPLES
  List application credentials for a Mix application
  $ mix app-credentials:list -M 22

  List application credentials for a Mix application that match a specific environment-geography
  $ mix app-credentials:list -M 22 --with-geo-name "Production US"
```

_See code: [src/commands/app-credentials/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/app-credentials/list.ts)_

## `mix applications:list`

list Mix applications in an organization

```
USAGE
  $ mix applications:list

OPTIONS
  -O, --organization=organization      (required) organization ID
  --columns=columns                    only show provided columns (comma-separated)
  --csv                                output to csv format
  --filter=filter                      filter property by partial string matching, ex: name=foo
  --full                               show all application details (permissions allowing)
  --json                               output raw data in JSON format
  --no-header                          hide table header from output
  --no-truncate                        do not truncate output to fit screen
  --omit-overridden                    omit application configurations that are overriden
  --sort=sort                          property to sort by (prepend '-' for descending)
  --with-runtime-app=with-runtime-app  filter results by fully-qualified runtime app ID
  --yaml                               output raw data in YAML format

DESCRIPTION
  Use this command to list Mix applications for a specific Mix organization.
  A number of flags can be used to constrain the returned results.

EXAMPLE
  $ mix applications:list -O 64
```

_See code: [src/commands/applications/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/applications/list.ts)_

## `mix auth`

obtain Mix access token

```
USAGE
  $ mix auth

OPTIONS
  -h, --help  show CLI help

DESCRIPTION
  Use this command to retrieve an access token. Once Mix.cli has acquired the
  access token, it takes care of refreshing it automatically.

EXAMPLE
  mix auth
```

_See code: [src/commands/auth.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/auth.ts)_

## `mix autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ mix autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ mix autocomplete
  $ mix autocomplete bash
  $ mix autocomplete zsh
  $ mix autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v1.3.0/src/commands/autocomplete/index.ts)_

## `mix builds:destroy`

destroy a build

```
USAGE
  $ mix builds:destroy

OPTIONS
  -P, --project=project          project ID
  -c, --confirm=confirm          skip confirmation prompt by pre-supplying value
  --build-label=build-label      build label (format is <buildType>_<projectId>_<buildVersion>
  --build-type=asr|dialog|nlu    build type
  --build-version=build-version  build version
  --json                         output raw data in JSON format
  --yaml                         output raw data in YAML format

DESCRIPTION
  Use this command to permanently delete a build. The build can be specified
  using the build label or the combination of project ID, build type and build
  version.

  The deletion needs to be confirmed by re-typing the build label when prompted.
  It can also be pre-confirmed by using the --confirm flag.

EXAMPLES
  Destroy a build
  $ mix builds:destroy -P 1922 --build-type asr --build-version 11

  Destroy a build using a build label
  $ mix builds:destroy --build-label ASR_1922_11

  Destroy a project and provide automatic confirmation
  $ mix builds:destroy --build-label ASR_1922_11 --confirm ASR_1922_11
```

_See code: [src/commands/builds/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/builds/destroy.ts)_

## `mix builds:export`

export a project build

```
USAGE
  $ mix builds:export

OPTIONS
  -P, --project=project          project ID
  -f, --filepath=filepath        (required) output file path
  --build-label=build-label      build label (format is <buildType>_<projectId>_<buildVersion>
  --build-type=asr|dialog|nlu    build type
  --build-version=build-version  build version
  --overwrite                    overwrite output file if it exists

DESCRIPTION
  Use this command to export a project build. The build can be specified using
  the build label or the combination of project ID, build type and build version.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLES
  Export a build using a build label
  $ mix builds:export --build-label ASR_29050_11 -f build.zip

  Export a build using project ID, build type and build version
  $ mix builds:export -P 29050 --build-type asr --build-version 11 -f build.zip --overwrite
```

_See code: [src/commands/builds/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/builds/export.ts)_

## `mix builds:get`

get details about a build

```
USAGE
  $ mix builds:get

OPTIONS
  -P, --project=project          project ID
  --build-label=build-label      build label (format is <buildType>_<projectId>_<buildVersion>
  --build-type=asr|dialog|nlu    build type
  --build-version=build-version  build version
  --columns=columns              only show provided columns (comma-separated) (with --csv only)
  --csv                          output to csv format
  --json                         output raw data in JSON format
  --no-truncate                  do not truncate output to fit screen
  --yaml                         output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular build. The build can be
  specified using the build label or the combination of project ID, build type
  and build version.

EXAMPLE
  mix builds:get -P 1922 --build-type nlu --build-version 1
```

_See code: [src/commands/builds/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/builds/get.ts)_

## `mix builds:latest`

list latest build of each type

```
USAGE
  $ mix builds:latest

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --columns=columns      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to list the latest version for each build type of a particular
  project.

EXAMPLES
  List latest builds
  $ mix builds:latest -P 1922
```

_See code: [src/commands/builds/latest.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/builds/latest.ts)_

## `mix builds:list`

list builds

```
USAGE
  $ mix builds:list

OPTIONS
  -P, --project=project        (required) project ID (defaults to MIX_PROJECT)
  --build-type=asr|dialog|nlu  (required) build type
  --columns=columns            only show provided columns (comma-separated)
  --csv                        output to csv format
  --filter=filter              filter property by partial string matching, ex: name=foo
  --json                       output raw data in JSON format
  --limit=limit                limit maximum results returned (defaults to Mix API behavior)
  --no-header                  hide table header from output
  --no-truncate                do not truncate output to fit screen
  --offset=offset              to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort                  comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                       output raw data in YAML format

DESCRIPTION
  Use this command to list all versions of a build type for a particular project.

EXAMPLE
  mix builds:list -P 1922 --build-type nlu
```

_See code: [src/commands/builds/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/builds/list.ts)_

## `mix data-hosts:list`

list data host details

```
USAGE
  $ mix data-hosts:list

OPTIONS
  -D, --deployment-flow=deployment-flow  deployment flow ID
  -M, --mix-app=mix-app                  (required) Mix application ID
  -P, --project=project                  project ID
  --build-label=build-label              build label (format is <buildType>_<projectId>_<buildVersion>
  --build-version=build-version          build version
  --columns=columns                      only show provided columns (comma-separated)
  --csv                                  output to csv format
  --filter=filter                        filter property by partial string matching, ex: name=foo
  --json                                 output raw data in JSON format
  --no-header                            hide table header from output
  --no-truncate                          do not truncate output to fit screen
  --sort=sort                            property to sort by (prepend '-' for descending)
  --yaml                                 output raw data in YAML format

DESCRIPTION
  Use this command to list data host details for a particular Mix Application ID
  and dialog build. The build can be specified using the build label or the
  combination of project ID and build version. The Mix Application ID can be
  retrieved using the applications:list command.

EXAMPLE
  mix data-hosts:list -D 66 -M 62 -P 14990 --build-version 1
```

_See code: [src/commands/data-hosts/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/data-hosts/list.ts)_

## `mix deployment-flows:list`

list deployment flows

```
USAGE
  $ mix deployment-flows:list

OPTIONS
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=columns                only show provided columns (comma-separated)
  --csv                            output to csv format
  --json                           output raw data in JSON format
  --limit=limit                    limit maximum results returned (defaults to Mix API behavior)
  --no-truncate                    do not truncate output to fit screen
  --offset=offset                  to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort                      comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to list all deployment flows for a specific organization.
  The organization ID can be retrieved by using the organizations:list command.

EXAMPLE
  mix deployment-flows:list -O 64
```

_See code: [src/commands/deployment-flows/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/deployment-flows/list.ts)_

## `mix engine-packs:list`

list engine packs

```
USAGE
  $ mix engine-packs:list

OPTIONS
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  --json                           output raw data in JSON format
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to list the engine packs available to a specific organization.

EXAMPLE
  mix engine-packs:list -O 64
```

_See code: [src/commands/engine-packs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/engine-packs/list.ts)_

## `mix entities:configure`

configure an entity

```
USAGE
  $ mix entities:configure

OPTIONS
  -E, --entity=entity                                                                                        (required)
                                                                                                             entity name

  -L, --locale=locale                                                                                        locale for
                                                                                                             regex
                                                                                                             entity

  -P, --project=project                                                                                      (required)
                                                                                                             project ID

  --anaphora-type=not-set|ref-moment|ref-person|ref-place|ref-thing                                          anaphora
                                                                                                             type

  --data-type=alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|time|yes-no  data type
                                                                                                             of entity

  --dynamic                                                                                                  make list
                                                                                                             entity
                                                                                                             dynamic

  --entity-type=base|freeform|list|regex|relational|rule-based                                               (required)
                                                                                                             entity type

  --has-a=has-a                                                                                              define hasA
                                                                                                             relationshi
                                                                                                             p for
                                                                                                             relational
                                                                                                             entity

  --is-a=is-a                                                                                                define isA
                                                                                                             relationshi
                                                                                                             p for
                                                                                                             relational
                                                                                                             entity

  --json                                                                                                     output raw
                                                                                                             data in
                                                                                                             JSON format

  --no-canonicalize                                                                                          prevent
                                                                                                             canonicaliz
                                                                                                             ation

  --pattern=pattern                                                                                          regular
                                                                                                             expression
                                                                                                             for regex
                                                                                                             entity

  --sensitive                                                                                                mask user
                                                                                                             sentitive
                                                                                                             data in
                                                                                                             logs

  --yaml                                                                                                     output raw
                                                                                                             data in
                                                                                                             YAML format

DESCRIPTION
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
  locale. The --pattern and --locale flags matter only to entities
  of type "regex".

  Relationial entities can have zero or one isA relation and
  zero or many hasA relations. One --is-A or --has-A flag must be
  set at a minimum for an entity of type "relational".

  The examples below show how to configure each type of entity.
  In each example, every allowed flag is used.
  Note that when a value is not provided for a particular flag,
  the corresponding property in the entity is not modified.

EXAMPLES
  Configure a freeform entity
  $ mix entities:configure -P 1922 -E MESSAGE \
    --sensitive --no-canonicalize --data-type not-set

  Configure a list entity
  $ mix entities:configure -P 1922 -E DRINK_SIZE --dynamic --sensitive \
    --no-canonicalize --anaphora-type not-set --data-type not-set

  Configure a regex entity
  $ mix entities:configure -P 1922 -E PHONE_NUMBER --locale en-US \
    --pattern \d{10} --sensitive --no-canonicalize --anaphora-type not-set \
    --data-type digits

  Configure a relational entity
  $ mix entities:configure -P 1922 --E ARRIVAL_CITY --is-a CITY \
    --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set

  Configure a rule-based entity
  $ mix entities:configure -P 1922 -E CARD_TYPE --sensitive \
     --no-canonicalize --anaphora-type not-set --data-type not-set
```

_See code: [src/commands/entities/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/configure.ts)_

## `mix entities:convert`

convert an entity to a different type

```
USAGE
  $ mix entities:convert

OPTIONS
  -E, --entity=entity                                              (required) entity name
  -P, --project=project                                            (required) project ID
  --has-a=has-a                                                    define hasA relationship for relational entity
  --is-a=is-a                                                      define isA relationship for relational entity
  --json                                                           output raw data in JSON format
  --pattern=pattern                                                regular expression for regex entity
  --to-entity-type=base|freeform|list|regex|relational|rule-based  new entity type
  --yaml                                                           output raw data in YAML format

DESCRIPTION
  Use this command to convert an entity to a different type.

  Mix supports several types of entities: freeform, list, regex,
  relational and rule-based. If converting to a regex or rule-based
  entity type, you will have to provide additional information as
  explained below.

  Regex entities make use of regular expressions specific to a single
  locale. Use the --pattern flag to provide the regular expression
  for the converted entity. The regular expression provided gets
  applied to all locales in the project. Use the entities:configure
  command to update the regular expression on a per locale basis
  if needed.

  Relational entities can have zero or one isA relation and
  zero or many hasA relations. One --is-A or --has-A flag must be
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
    --pattern \d{10}

  Convert an entity to a relational entity
  $ mix entities:convert -P 1922 --E MY_ENTITY --to-entity-type relational
    --is-a CITY

  Convert an entity to a rule-based entity
  $ mix entities:convert -P 1922 -E MY_ENTITY --to-entity-type rule-based
```

_See code: [src/commands/entities/convert.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/convert.ts)_

## `mix entities:create`

create a new entity

```
USAGE
  $ mix entities:create

OPTIONS
  -L, --locale=locale                                                                                        locale for
                                                                                                             regex
                                                                                                             entity

  -P, --project=project                                                                                      (required)
                                                                                                             project ID

  --anaphora-type=not-set|ref-moment|ref-person|ref-place|ref-thing                                          [default:
                                                                                                             not-set]
                                                                                                             anaphora
                                                                                                             type

  --data-type=alphanum|amount|boolean|date|digits|distance|no-format|not-set|number|temperature|time|yes-no  [default:
                                                                                                             not-set]
                                                                                                             data type
                                                                                                             of entity

  --dynamic                                                                                                  make list
                                                                                                             entity
                                                                                                             dynamic

  --entity-type=base|freeform|list|regex|relational|rule-based                                               (required)
                                                                                                             entity type

  --has-a=has-a                                                                                              define hasA
                                                                                                             relationshi
                                                                                                             p for
                                                                                                             relational
                                                                                                             entity

  --is-a=is-a                                                                                                define isA
                                                                                                             relationshi
                                                                                                             p for
                                                                                                             relational
                                                                                                             entity

  --json                                                                                                     output raw
                                                                                                             data in
                                                                                                             JSON format

  --name=name                                                                                                (required)
                                                                                                             new entity
                                                                                                             name

  --no-canonicalize                                                                                          prevent
                                                                                                             canonicaliz
                                                                                                             ation

  --pattern=pattern                                                                                          regular
                                                                                                             expression
                                                                                                             for regex
                                                                                                             entity

  --sensitive                                                                                                mask user
                                                                                                             sentitive
                                                                                                             data in
                                                                                                             logs

  --yaml                                                                                                     output raw
                                                                                                             data in
                                                                                                             YAML format

DESCRIPTION
  Use this command to create a new entity in a project.

  Mix supports several types of entities: freeform, list, regex,
  relational and rule-based. There are many attributes that can
  be passed for the creation of an entity and a good number of
  these attributes are common to all entity types. However, certain
  attributes are mandatory and apply to specific entity types only.

  Regex entities make use of regular expressions specific to a single
  locale. The --pattern and --locale flags must be set when creating
  an entity of type "regex".

  Relationial entities can have zero or one isA relation and
  zero or many hasA relations. One --is-A or --has-A flag must be
  set at a minimum when creating an entity of type "relational".

  The --entity-type, --name and --project flags are mandatory for
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
    --locale en-US --pattern \d{10} --sensitive --no-canonicalize \
    --anaphora-type not-set --data-type digits

  Create a relational entity
  $ mix entities:create -P 1922 --entity-type=relational --name ARRIVAL_CITY \
    --is-a CITY --sensitive --no-canonicalize --anaphora-type not-set \
    --data-type not-set

  Create a rule-based entity
  $ mix entities:create -P 1922 --entity-type=rule-based --name CARD_TYPE \
    --sensitive --no-canonicalize --anaphora-type not-set --data-type not-set
```

_See code: [src/commands/entities/create.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/create.ts)_

## `mix entities:destroy`

destroy an entity

```
USAGE
  $ mix entities:destroy

OPTIONS
  -E, --entity=entity    (required) entity name
  -P, --project=project  (required) project ID
  -c, --confirm=confirm  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to permanently delete an entity from a project.

EXAMPLE
  $ mix entities:destroy -P 1922 -E CoffeeSize
```

_See code: [src/commands/entities/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/destroy.ts)_

## `mix entities:get`

get details about an entity

```
USAGE
  $ mix entities:get

OPTIONS
  -E, --entity=entity    (required) entity name
  -P, --project=project  (required) project ID
  --columns=columns      only show provided columns (comma-separated) (with --csv only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular entity in a project.

EXAMPLE
  mix entities:get -P 1922 -E DrinkSize
```

_See code: [src/commands/entities/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/get.ts)_

## `mix entities:list`

list entities

```
USAGE
  $ mix entities:list

OPTIONS
  -P, --project=project                                              (required) project ID
  --columns=columns                                                  only show provided columns (comma-separated)
  --csv                                                              output to csv format

  --filter=filter                                                    filter property by partial string matching, ex:
                                                                     name=foo

  --json                                                             output raw data in JSON format

  --no-header                                                        hide table header from output

  --no-truncate                                                      do not truncate output to fit screen

  --with-entity-type=base|freeform|list|regex|relational|rule-based  entity type

  --yaml                                                             output raw data in YAML format

DESCRIPTION
  Use this command to list all entities available in a specific project.

EXAMPLES
  List all entities
  $ mix entities:list -P 1922

  List all list-type entities
  $ mix entities:list -P 1922 --with-entity-type list
```

_See code: [src/commands/entities/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/list.ts)_

## `mix entities:rename`

rename an entity

```
USAGE
  $ mix entities:rename

OPTIONS
  -E, --entity=entity    (required) entity name
  -P, --project=project  (required) project ID
  --json                 output raw data in JSON format
  --name=name            (required) new entity name
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to rename an entity in a project.

EXAMPLE
  $ mix entities:rename -P 1922 -E DrinkSize --name DrinkFormat
```

_See code: [src/commands/entities/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/entities/rename.ts)_

## `mix environments:list`

list available environments

```
USAGE
  $ mix environments:list

OPTIONS
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=columns                only show provided columns (comma-separated)
  --csv                            output to csv format
  --filter=filter                  filter property by partial string matching, ex: name=foo
  --json                           output raw data in JSON format
  --limit=limit                    limit maximum results returned (defaults to Mix API behavior)
  --no-header                      hide table header from output
  --no-truncate                    do not truncate output to fit screen
  --offset=offset                  to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort                      comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to list all environments available to a specific organization.

EXAMPLE
  mix environments:list -O 64
```

_See code: [src/commands/environments/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/environments/list.ts)_

## `mix geographies:list`

list geographies

```
USAGE
  $ mix geographies:list

OPTIONS
  --columns=columns  only show provided columns (comma-separated)
  --csv              output to csv format
  --filter=filter    filter property by partial string matching, ex: name=foo
  --json             output raw data in JSON format
  --limit=limit      limit maximum results returned (defaults to Mix API behavior)
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --offset=offset    to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort        comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml             output raw data in YAML format

DESCRIPTION
  Use this command to list the geographies available on the platform.

EXAMPLE
  mix geographies:list
```

_See code: [src/commands/geographies/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/geographies/list.ts)_

## `mix help [COMMAND]`

display help for mix

```
USAGE
  $ mix help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.17/src/commands/help.ts)_

## `mix init`

initialize mix.cli configuration

```
USAGE
  $ mix init

DESCRIPTION
  Use this command to initialize the Mix.cli configuration. Elements of the
  configuration can also be overridden using environment variables.

EXAMPLE
  mix init
```

_See code: [src/commands/init.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/init.ts)_

## `mix intents:create`

create a new intent

```
USAGE
  $ mix intents:create

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --name=name            (required) new intent name
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to create a new intent in a project.

EXAMPLE
  $ mix intents:create -P 1922 --name ORDER_DRINK
```

_See code: [src/commands/intents/create.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/intents/create.ts)_

## `mix intents:destroy`

destroy an intent

```
USAGE
  $ mix intents:destroy

OPTIONS
  -I, --intent=intent    (required) intent name
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to permanently delete an intent from a project.

EXAMPLE
  $ mix intents:destroy -P 1922 -I ORDER_DRINK
```

_See code: [src/commands/intents/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/intents/destroy.ts)_

## `mix intents:get`

get details about an intent

```
USAGE
  $ mix intents:get

OPTIONS
  -I, --intent=intent    (required) intent name
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --columns=columns      only show provided columns (comma-separated) (with --csv only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-truncate          do not truncate output to fit screen
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular intent in a project.

EXAMPLE
  $ mix intents:get -P 1922 -I ORDER_DRINK
```

_See code: [src/commands/intents/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/intents/get.ts)_

## `mix intents:list`

list intents

```
USAGE
  $ mix intents:list

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --columns=columns      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --sort=sort            property to sort by (prepend '-' for descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to list all intents available in a specific project.

EXAMPLE
  $ mix intents:list -P 1922
```

_See code: [src/commands/intents/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/intents/list.ts)_

## `mix intents:rename`

rename an intent

```
USAGE
  $ mix intents:rename

OPTIONS
  -I, --intent=intent    (required) intent name
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --json                 output raw data in JSON format
  --name=name            (required) new intent name
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to rename an intent in a project.

EXAMPLE
  $ mix intents:rename -P 1922 -I ORDER_DRINK --name ORDER_COFFEE
```

_See code: [src/commands/intents/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/intents/rename.ts)_

## `mix jobs:cancel`

cancel a job

```
USAGE
  $ mix jobs:cancel

OPTIONS
  -J, --job=job          (required) job ID
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to cancel a job. Canceling a job does not necessarily
  terminate it but allows a similar job to be launched before the completion
  of the original one.

EXAMPLE
  mix jobs:cancel -P 1922 -J 15d4d4ce-7cc3-45f6-ab38-aad326e6fc20
```

_See code: [src/commands/jobs/cancel.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/jobs/cancel.ts)_

## `mix jobs:get`

get details about a job

```
USAGE
  $ mix jobs:get

OPTIONS
  -J, --job=job          (required) job ID
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --columns=columns      only show provided columns (comma-separated) (with --csv only)
  --csv                  output to csv format
  --json                 output raw data in JSON format
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --watch                poll status of job every minute
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular job.

EXAMPLE
  mix jobs:get -P 1922 -J 25a08872-c635-43f1-b459-5bd98a1c2576
```

_See code: [src/commands/jobs/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/jobs/get.ts)_

## `mix jobs:list`

list jobs for a project

```
USAGE
  $ mix jobs:list

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --columns=columns      only show provided columns (comma-separated)
  --csv                  output to csv format
  --filter=filter        filter property by partial string matching, ex: name=foo
  --json                 output raw data in JSON format
  --limit=limit          limit maximum results returned (defaults to Mix API behavior)
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --offset=offset        to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort            comma-separated properties to sort by (prepend '+'/'-' for ascending/descending)
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to list all jobs related to a particular project.

EXAMPLE
  mix jobs:list -P 1922
```

_See code: [src/commands/jobs/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/jobs/list.ts)_

## `mix language-topics:list`

list language topics for an organization

```
USAGE
  $ mix language-topics:list

OPTIONS
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=columns                only show provided columns (comma-separated)
  --filter=filter                  filter property by partial string matching, ex: name=foo
  --json                           output raw data in JSON format
  --no-header                      hide table header from output
  --no-truncate                    do not truncate output to fit screen
  --sort=sort                      property to sort by (prepend '-' for descending)
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to list language topics available to a specific organization.

EXAMPLE
  mix language-topics:list -O 64
```

_See code: [src/commands/language-topics/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/language-topics/list.ts)_

## `mix literals:export`

export entity literals

```
USAGE
  $ mix literals:export

OPTIONS
  -E, --entity-name=entity-name  (required) entity name
  -L, --locale=locale            (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project          (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=filepath        (required) output file path
  --overwrite                    overwrite output file if it exists

DESCRIPTION
  Use this command to export literal-value pairs for a specific entity.
  It is possible to specify the locale(s) for which the pairs should be exported.

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLE
  $ mix literals:export -P 29050 -E DrinkSize -L en-US -f literals.zip --overwrite
```

_See code: [src/commands/literals/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/literals/export.ts)_

## `mix literals:import`

import entity literals, appending to existing literals by default

```
USAGE
  $ mix literals:import

OPTIONS
  -E, --entity-name=entity-name  (required) entity name
  -L, --locale=locale            (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project          (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm          skip confirmation prompt by pre-supplying value
  -f, --filepath=filepath        (required) input file path
  --json                         output raw data in JSON format
  --replace                      replace, rather than append, existing entity literals
  --yaml                         output raw data in YAML format

DESCRIPTION
  Use this command to import literal-value pairs into a project. By default, the
  literal-value pairs are appended to the project in the specified locale. It is
  also possible to completely replace literal-value pairs for the specified locale
  by using the --replace flag.

  The import needs to be confirmed by re-typing the entity name when prompted.
  It can also be pre-confirmed by using the --confirm flag.

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

_See code: [src/commands/literals/import.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/literals/import.ts)_

## `mix ontology:export`

export ontology

```
USAGE
  $ mix ontology:export

OPTIONS
  -L, --locale=locale      (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project    (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=filepath  (required) output file path
  --overwrite              overwrite output file if it exists

DESCRIPTION
  Use this command to export the ontology for a particular project. 

  The contents of the exported zip file depend on the role you have been granted
  on the Mix platform.

EXAMPLE
  $ mix ontology:export -P 29050 -L en-US -f ontology.zip --overwrite
```

_See code: [src/commands/ontology/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/ontology/export.ts)_

## `mix ontology:import`

import by appending to existing ontology

```
USAGE
  $ mix ontology:import

OPTIONS
  -P, --project=project    (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm    skip confirmation prompt by pre-supplying value
  -f, --filepath=filepath  (required) input file path
  --json                   output raw data in JSON format
  --yaml                   output raw data in YAML format

DESCRIPTION
  Use this command to import an ontology into a specific project. The provided
  ontology can only be appended to the existing ontology.

  The import needs to be confirmed by re-typing the project ID when prompted.
  It can also be pre-confirmed by using the --confirm flag.

EXAMPLES
  Import an ontology
  $ mix ontology:import -P 29050 -f ontology.zip

  Import an ontology using pre-confirmation
  $ mix ontology:import -P 29050 -f ontology.zip -c 29050
```

_See code: [src/commands/ontology/import.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/ontology/import.ts)_

## `mix organizations:list`

list available Mix organizations

```
USAGE
  $ mix organizations:list

OPTIONS
  --all                                       show all organizations
  --columns=columns                           only show provided columns (comma-separated)
  --csv                                       output to csv format
  --filter=filter                             filter property by partial string matching, ex: name=foo
  --full                                      display all organization details, including members count
  --json                                      output raw data in JSON format
  --limit=limit                               limit maximum results returned (defaults to Mix API behavior)
  --no-header                                 hide table header from output
  --no-truncate                               do not truncate output to fit screen
  --offset=offset                             to exclude e.g., the first 10 (sorted) results, set --offset=10
  --sort=sort                                 property to sort by (prepend '-' for descending)
  --with-organization-type=personal|standard  organization type
  --yaml                                      output raw data in YAML format

DESCRIPTION
  Use this command to list the organizations you are part of.

EXAMPLE
  mix organizations:list
```

_See code: [src/commands/organizations/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/organizations/list.ts)_

## `mix projects:build`

build a project

```
USAGE
  $ mix projects:build

OPTIONS
  -L, --locale=locale             (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project           (required) project ID (defaults to MIX_PROJECT)
  --build-type=asr|dialog|nlu     [default: nlu] build type
  --json                          output raw data in JSON format
  --nlu-model-type=accurate|fast  [default: fast] build version
  --notes=notes                   notes about the build
  --yaml                          output raw data in YAML format

DESCRIPTION
  Use this command to build a project.

EXAMPLES
  Build a project to create models for nlu and asr using locale en-US
  $ mix projects:build -L en-US -P 1922 --build-type asr --build-type nlu --nlu-model-type fast --notes "Our first 
  build"
```

_See code: [src/commands/projects/build.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/build.ts)_

## `mix projects:configure`

configure a project

```
USAGE
  $ mix projects:configure

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  --data-pack=data-pack  (required) data pack name, including version (use aa-AA@x.y.z format)
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to update the data pack for a locale used in a project.
  The operation is not carried out immediately. Instead, the Mix backend returns
  a job ID that can be used to monitor progress. mix.cli outputs detailed
  information on the created job when the --json flag is provided.

  Note that you cannot add a new locale with this command.

EXAMPLE
  $ mix projects:configure -P 1922 --data-pack en-US@4.7.0
```

_See code: [src/commands/projects/configure.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/configure.ts)_

## `mix projects:create`

create a new project

```
USAGE
  $ mix projects:create

OPTIONS
  -L, --locale=locale              (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  -c, --channel=channel            (required) channel
  -m, --modes=modes                (required) channel modes (audioscript|dtmf|interactivity|richtext|tts)
  -n, --name=name                  (required) project name
  -t, --topic=topic                (required) data pack topic, e.g. 'gen'
  --child-data-compliant           marks projects as being child-data compliant
  --description=description        project description (for child data compliance)
  --engine-pack=engine-pack        engine pack ID (UUID format)
  --json                           output raw data in JSON format
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to create a new project. Many parameters are needed to
  create a project. In particular, channels and modes go hand in hand. A --channel
  flag must be matched by a --modes flag. Use a comma-separated list (no spaces)
  of mode names to specify multiple modes for a channel.

  Given the right user permissions, it is possible to specify an engine pack using
  the --engine-pack flag.

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

  To acknowledge such a project, use the --child-data-compliant flag and also
  provide a description of your project using the --description flag.

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

_See code: [src/commands/projects/create.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/create.ts)_

## `mix projects:destroy`

destroy a project

```
USAGE
  $ mix projects:destroy

OPTIONS
  -P, --project=project  (required) project ID
  -c, --confirm=confirm  skip confirmation prompt by pre-supplying value
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to permanently delete a specific project.
  Unless a backup exists, there is no way to restore a project that
  has been destroyed.

  The deletion needs to be confirmed by re-typing the project ID when prompted.
  It can also be pre-confirmed by using the --confirm flag.

EXAMPLES
  Destroy a project
  $ mix projects:destroy -P 1922

  Destroy a project and provide automatic confirmation
  $ mix projects:destroy -P 1922 -c 1922
```

_See code: [src/commands/projects/destroy.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/destroy.ts)_

## `mix projects:export`

export project package

```
USAGE
  $ mix projects:export

OPTIONS
  -P, --project=project    (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=filepath  (required) output file path
  --metadata-only          export project metadata JSON file only
  --overwrite              overwrite output file if it exists

DESCRIPTION
  Use this command to export the project package to a zip file.

  Note that the grammar, transformation, and pronunciation files are restricted
  to Nuance Professional Services users and not available to all users.
  As such, the project package exported by regular users will not include
  these files. Regular users may end up with an incomplete project after calling
  this endpoint.

  Use the --metadata-only flag to export the project metadata JSON file only.

EXAMPLES
  Export the project package to a zip file
  $ mix projects:export -P 29050 -f project.zip --overwrite

  Export the projecte metadata JSON file only
  $ mix projects:export -P 29050 -f metadata.json --metadata-only --overwrite
```

_See code: [src/commands/projects/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/export.ts)_

## `mix projects:get`

get details about a project

```
USAGE
  $ mix projects:get

OPTIONS
  -P, --project=project                (required) project ID (defaults to MIX_PROJECT)
  --columns=columns                    only show provided columns (comma-separated) (with --csv only)
  --csv                                output to csv format (with --table only)
  --json                               output raw data in JSON format
  --no-header                          hide table header from output
  --no-truncate                        do not truncate output to fit screen
  --sort=sort                          property to sort by (prepend '-' for descending)
  --table=channels|data-packs|project  data table to output (with --csv only)
  --yaml                               output raw data in YAML format

DESCRIPTION
  Use this command to get details about a particular project.

  CSV output is available for this command but only for one section of project
  information at a time. The chosen section is specifed using the --table flag.

EXAMPLE
  mix projects:get -P 1922
```

_See code: [src/commands/projects/get.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/get.ts)_

## `mix projects:list`

list projects

```
USAGE
  $ mix projects:list

OPTIONS
  -O, --organization=organization  (required) organization ID (defaults to MIX_ORGANIZATION)
  --columns=columns                only show provided columns (comma-separated)
  --csv                            output to csv format
  --filter=filter                  filter property by partial string matching, ex: name=foo
  --json                           output raw data in JSON format
  --no-header                      hide table header from output
  --no-truncate                    do not truncate output to fit screen
  --sort=sort                      property to sort by (prepend '-' for descending)
  --yaml                           output raw data in YAML format

DESCRIPTION
  Use this command to list projects that are part of a particular organization.

EXAMPLE
  mix projects:list -O 64
```

_See code: [src/commands/projects/list.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/list.ts)_

## `mix projects:rename`

rename a project

```
USAGE
  $ mix projects:rename

OPTIONS
  -P, --project=project  (required) project ID (defaults to MIX_PROJECT)
  -n, --name=name        (required) project name
  --json                 output raw data in JSON format
  --yaml                 output raw data in YAML format

DESCRIPTION
  Use this command to rename a project.

EXAMPLE
  $ mix projects:rename -P 1922 -n ACME
```

_See code: [src/commands/projects/rename.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/rename.ts)_

## `mix projects:replace`

replace the content of a project

```
USAGE
  $ mix projects:replace

OPTIONS
  -P, --project=project    (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm    skip confirmation prompt by pre-supplying value
  -f, --filepath=filepath  (required) input file path
  --json                   output raw data in JSON format
  --yaml                   output raw data in YAML format

DESCRIPTION
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

_See code: [src/commands/projects/replace.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/projects/replace.ts)_

## `mix samples:export`

export sample sentences

```
USAGE
  $ mix samples:export

OPTIONS
  -I, --intent-name=intent-name  (required) intent name
  -L, --locale=locale            (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project          (required) project ID (defaults to MIX_PROJECT)
  -f, --filepath=filepath        (required) output file path
  --overwrite                    overwrite output file if it exists

DESCRIPTION
  Use this command to export samples for an intent in the project.

EXAMPLE
  $ mix samples:export -P 29050 -I ORDER_DRINK -L en-US -f samples.zip --overwrite
```

_See code: [src/commands/samples/export.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/samples/export.ts)_

## `mix samples:import`

import sample sentences, appending to existing samples by default

```
USAGE
  $ mix samples:import

OPTIONS
  -I, --intent-name=intent-name  (required) intent name
  -L, --locale=locale            (required) locale code; use format 'aa-AA' (defaults to MIX_LOCALE)
  -P, --project=project          (required) project ID (defaults to MIX_PROJECT)
  -c, --confirm=confirm          skip confirmation prompt by pre-supplying value
  -f, --filepath=filepath        (required) input file path
  --json                         output raw data in JSON format
  --replace                      replace, rather than append, existing samples
  --yaml                         output raw data in YAML format

DESCRIPTION
  Use this command sample sentences into a project.  By default, the samples
  sentences are appended to the project in the specified locale. It is also
  possible to completely replace sample sentences for the specified locale
  by using the --replace flag.

  The import needs to be confirmed by re-typing the intent name when prompted.
  It can also be pre-confirmed by using the --confirm flag. Consider making
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

_See code: [src/commands/samples/import.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/samples/import.ts)_

## `mix system:version`

list Mix API version and environment

```
USAGE
  $ mix system:version

OPTIONS
  --columns=columns  only show provided columns (comma-separated)
  --csv              output to csv format
  --json             output raw data in JSON format
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --yaml             output raw data in YAML format

DESCRIPTION
  Use this command to list Mix APi version and environment information.

EXAMPLE
  mix system:version
```

_See code: [src/commands/system/version.ts](https://github.com/nuance-communications/mix-cli/blob/v1.4.0-beta.10/src/commands/system/version.ts)_
<!-- commandsstop -->

.
