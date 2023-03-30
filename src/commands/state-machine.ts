import {interpret} from 'xstate'
import {runAppConfigsMachine} from '../machine/workflow'
import makeDebug from 'debug'
import {Command, Flags} from '@oclif/core'
import {readFileSync} from 'node:fs'

const debug = makeDebug('mix:commands:app-configs-machine')

export default class AppConfigsCreateMs extends Command { 
    static flags = {
        file: Flags.string({
            char: 'f',
            description: 'json file',
            required: true,
        })
      }

    async run() {
        const {flags} = await this.parse(AppConfigsCreateMs)

        const appConfigsService = interpret(runAppConfigsMachine(JSON.parse(readFileSync(flags.file, 'utf-8'))))
            .onTransition((state) => {
                if(state.matches({selected: 'loaded'})) {
                //console.log(`CfongiId: ${state.context.list.captures.config}`)
            }
            })
            .start()

        appConfigsService.send({type: 'SELECT'});
    }
}