# Contributing

We welcome contributions to our source code! Here are the guidelines we would
like you to follow.

## Code of Conduct
Help us keep the community around `mix-cli` open and inclusive. See
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Question or Problem?
If you have questions about how to use `mix-cli`, please see the
documentation provided in [README.md](README.md), and if you don't find the answer there,
please visit our [Mix Community](https://community.mix.nuance.com) and ask your
question there.

## Issues and Bugs
If you find a bug in the source code or an issue with the documentation,
consider discussing it first in our [Mix Community](https://community.mix.nuance.com)
before submitting an issue.

## Feature Requests and New Commands
If you want to request a new feature, please do so via the [Mix
Community](https://community.mix.nuance.com). 

Before adding a new command, please reach out to us in the
[Mix Community](https://community.mix.nuance.com). We will be happy to discuss
new commands. This also allows us to ensure consistency in the command language
used for Mix.cli.

# Mix.cli Development

## oclif Framework
`mix-cli` is built on top of the [oclif](https://oclif.io/) framework. Read
the [oclif Getting Started](https://oclif.io/docs/introduction) section for
a quick introduction to the framework. The [oclif API Reference](https://oclif.io/docs/commands)
should provide everything else you need to know.

## CLI Vocabulary
`mix-cli` is a _multi-command_ CLI with its own vocabulary of _topics_
and _actions_. Topics are typically plural nouns and actions are verbs.
The topic and the action appear separated by a colon on the command line.

For instance,

``` mix organizations:list ```

is the command to retrieve the list of organizations the user is part of. Here,
"organizations" is the topic and "list" is the action. We try to keep that
vocabulary consistent.

## Code Standards
`mix-cli` is implemented in [TypeScript](https://www.typescriptlang.org). This 
was our first foray into TypeScript :)

### ESLint
We use ESLint to keep our code clean. An `.eslintrc` configuration is part of the
project.

## Testing
We use the test utilities provided with the oclif framework. Add unit tests
to cover your code changes. Run all unit tests before submitting a pull request.

## Code Instrumentation
The code errs in favor of more instrumentation by using the [debug](https://github.com/visionmedia/debug) library. The few extra lines of code turn out to be very helpful when
users share debug logs with those trying to help them.

# Submitting your Changes
In GitHub, send a pull request to nuance-communications/mix-cli:beta. If we suggest
changes, then make the required updates, re-run the test suite to ensure all
tests are still passing, commit your changes to your feature branch and push
them to your GitHub repository. This will update your pull request and we will
then merge it to the beta branch.  The beta branch allows us to pool ongoing
changes in a single update to the master branch while providing early access to
upcoming updates for those who desire so.

## Commit Messages
Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
for your commit messages. The _scope_ part is not used at this time. The
GitHub issue ID is required and must precede the description. The format is basically:

```
<type>: #nnn <description>
[optional body]
[optional footer(s)]
```

`mix-cli` uses a git hook to validate the commit message.

## Signing your Work
The sign-off is a simple line at the end of the explanation for the commit. Your
signature certifies that you wrote the contribution or otherwise have the right to pass
it on as an open-source contribution. The rules are pretty simple: if you can certify
the below (from [developercertificate.org](http://developercertificate.org/)):

```
Developer Certificate of Origin
Version 1.1
Copyright (C) 2004, 2006 The Linux Foundation and its contributors.
660 York Street, Suite 102,
San Francisco, CA 94110 USA
Everyone is permitted to copy and distribute verbatim copies of this
license document, but changing it is not allowed.
Developer's Certificate of Origin 1.1
By making a contribution to this project, I certify that:
(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or
(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or
(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.
(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```

Then you just add a line to every git commit message:

>DCO-1.1-Signed-off-by: Joe Smith [joe.smith@email.com](mailto:joe.smith@email.com)
 
Use your real name (sorry, no pseudonyms or anonymous contributions.)
If you set your `user.name` and `user.email` git configs, you can sign your
commit automatically with `git commit -s`.
