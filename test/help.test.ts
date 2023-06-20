
import {expect, test} from '@oclif/test'

describe('Help message handling', () => {
  test
    .stdout()
    .command(['help'])
  .it('provides global help', (ctx)=>{
    expect(ctx.stdout).to.include('projects')
    expect(ctx.stdout).to.include('manage projects')
    expect(ctx.stdout).to.include('auth')
    expect(ctx.stdout).to.include('obtain Mix access token')
  })

  // we use the help subcommand instead of passing in --help to the projects:list command
  // this is to workaround the weird behavior of oclif where it will not accept --help
  // during testing, even though it works fine when running the command normally
  test
    .stdout()
    .command(['help', 'projects:list'])
  .it('provides help for a specific command', (ctx)=>{
    expect(ctx.stdout).to.include('--json')
    expect(ctx.stdout).to.include('list projects')
    expect(ctx.stdout).to.include('exclude project channels from the list')
  })

  test
    .stdout()
    .command(['help', 'projects'])
  .it('provides help for a specific topic', (ctx)=>{
    expect(ctx.stdout).to.include('manage projects')
    expect(ctx.stdout).to.include('projects:list')
    expect(ctx.stdout).to.include('list projects')
  })
})
