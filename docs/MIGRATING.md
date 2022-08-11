# Migrating from v1 to v2 of mix-cli
Version 2.0.0 of mix-cli brings a few breaking changes.  Instructions on how to
adjust to these changes from version 1.x are provided below.

## Minimum version of Node.js is now v14
mix-cli will exit with an error message if used with a version of
Node.js older than v14.  This requirement was already present in the README but
was not actually enforced. As it was reported that the autocomplete plugin
requires Node.js v14, a minimum version of Node.js v14 is now enforced.

**What to do:** Install Node.js v14 or more recent to run mix-cli v2.

## Flag `--new-name` replaces flag `--name` in all rename commands
The rename commands in mix-cli v1.x made use of the `--name` flag to provide the name
to _rename to_. To remove confusion, the `--name` flag is replaced by the
`--new-name` flag in all rename commands.

**What to do:** Use `--new-name` instead of `--name` with commands `entities:rename`, `intents:rename` and `projects:rename`.

