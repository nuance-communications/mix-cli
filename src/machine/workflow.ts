import { assign, createMachine} from "xstate";
import AppConfigsList from '../commands/app-configs/list'
import AppConfigsGet from '../commands/app-configs/get'
import ApplicationsList from "../commands/applications/list";
import * as jq from 'node-jq'

/** Get the value from JSON response and assign it to the capture flags*/
async function capturesFlags(flagsToCapture: any, response: any) {
  for (const flag in flagsToCapture) {
    const out = await jq.run(`${flagsToCapture[flag]}`, response.data, { input: 'json', output: 'string' })
    const capturedFlag: string = JSON.parse(out as string)
    flagsToCapture[flag] = capturedFlag
    //console.log(`Re: ${flag} = ${flagsToCapture[flag]}`)
  }
  return await flagsToCapture
}

/**Retrive flags to pass them to the command */
async function getFlagsToPass(context: any, command: string) {
  const reqFlags: any = context.flagsByCommand[command].flags
  const flags = Object.keys(reqFlags).map(function (key) {
    //Check if the flag value is derived from captured flags
    if (reqFlags[key].toString().includes('${')) {
      //Remove ${} to parse captured flags
      const captureFlagsString = reqFlags[key].replace(/[{}$]+/g, '')
      const captureFlag = captureFlagsString.split('.')
      //Get the flags value from the captured flags of mentioned command
      //context['flags'][captureFlag[0]]['captures'][captureFlag[2]] - e.g., applications:list.captures.flagName
      //console.log(`Captured Flag: ${context['flags'][captureFlag[0]]['captures'][captureFlag[2]]}`)
      //[--flagName, flagValue]
      const [cmd,,flagName] = captureFlag
      //return [`--${key}`, context['flagsByCommand'][captureFlag[0]]['captures'][captureFlag[2]]]
      return [`--${key}`, context['flagsByCommand'][cmd]['captures'][flagName]]
    }
    else {
      //[--flagName, flagValue]
      return [`--${key}`, reqFlags[key]]
    }
  })
  //Create string of passed options
  const flagsToPass: Array<string> = flags.join().split(',')
  flagsToPass.push('--json')
  return await flagsToPass
}

async function listApplications(context: any, event: any) {
  const response = await ApplicationsList.run(await getFlagsToPass(context, 'applications:list'))
  //Check if there is any flags to capture for given command
  if (Object.prototype.hasOwnProperty.call(context.flagsByCommand['applications:list'], 'captures')) {
    context.flagsByCommand['applications:list'].captures = await capturesFlags(context.flagsByCommand['applications:list'].captures, response)
    //console.log(`Req. Flags: ${JSON.stringify(context.flags['applications:list'].captures, null, 2)}`)
  }
}

async function listAppConfigs(context: any, event: any) {
  const response = await AppConfigsList.run(await getFlagsToPass(context, 'app-configs:list'))
  if (Object.prototype.hasOwnProperty.call(context.flagsByCommand['app-configs:list'], 'captures')) {
    context.flagsByCommand['app-configs:list'].captures = await capturesFlags(context.flagsByCommand['app-configs:list'].captures, response)
    //console.log(`Req. Flags: ${JSON.stringify(context.flags['app-configs:list'].captures, null, 2)}`)
  }
}

async function getAppConfigs(context: any, event: any) {
  const response = await AppConfigsGet.run(await getFlagsToPass(context, 'app-configs:get'))
  if (Object.prototype.hasOwnProperty.call(context.flagsByCommand['app-configs:get'], 'captures')) {
    context.flagsByCommand['app-configs:get'].captures = await capturesFlags(context.flagsByCommand['app-configs:get'].captures, response)
    //console.log(`Req. Flags: ${JSON.stringify(context.flags['app-configs:get'].captures, null, 2)}`)
  }
}

async function complete(context: any) {
  return await console.log('Execution complete')
}

export function runAppConfigsMachine(jsonData: any) {

  //Commands list
  const commands: string[] = Object.keys(jsonData.commands)

  //flags related to command
  const flagsByCommand = jsonData.commands
  const stateMachine =
    /** @xstate-layout N4IgpgJg5mDOIC5QEMAOqC0BjA9gOwDMBLKWAYgDkBRADQBUB9AZToEE6qBtABgF1FQqHLCIAXIvgEgAHogDM3AKwA6AEwBGbgE51ANi2r9ixQA5dAGhABPROtUBfe5bSZchErGUAnAK54A6jheANYEADY4AO5kTFQAMlQAwnQ8-EggQiLikumyCOpyACzK3ADs3AqmpYrVJqqlljb5dcqFinLqBQqlclqKDk4gLtj4xKTKYUSwomQQ+GDKRHgAbjjBCwRgolgAFiPuUACSEKlSmWISeFJ5WibKcqomdrrG1aqq-Y2Iqlq6re12dSKQp6Az1RzOdD7MaeGAzOZ4BZLVbrZSbbZ7NxjAAiyFEyFO6XO2SuuXkcj+L10qjaHVKJkKbS+CGM3Fa3Gp6mqijKckUjkGeBwEDgUmGWI8Z2EFxyoDyhWZWmKfQ6QJqPQpA0hrlGHm8fkCIXCUSlWUu11s6juVJpHTk5V0pUezNU9uUKs0JkUWm4hW4eghQyhEvGk2mpplpLliE+1nkSvZ1J+pRTJgdhUD4t14zhEZJFvyTuU3vthS0RRBt1KFjjLI+7o571dhmr3szweznmIeCmOzz5rJLJ5yjTZZTmm4SnazP6Kh9SebjpeWgF9iAA */
    createMachine({
      predictableActionArguments: true,
      id: 'workflow',
      schema: {
        context: {} as {
          data: any,
          flagsByCommand: any,
          commands: any,
          commandsIndex: any
        }
      },
      context: {
        data: jsonData,
        flagsByCommand: flagsByCommand,
        commands: commands,
        commandsIndex: 0
      },
      //Initial State/Starting state
      initial: 'runWorkflow',
      states: {
        runWorkflow: {
          on: {
            //First Command
            SELECT: {
              target: `${commands[0]}`
            }
          }
        },
        //Select next command from workflow
        nextState: {
          invoke: {
            id: 'nextstate',
            src: 'selectNextState'
          },
          on: {
            //Commands List
            'APP-CONFIGS:GET': {
              target: 'app-configs:get'
            },
            'APP-CONFIGS:LIST': {
              target: 'app-configs:list'
            },
            FINISHED: {
              target: 'finish'
            }
          }
        },
        //Command State Node
        'applications:list': {
          //Action to perform when entering state
          entry: 'assignNextState',
          //Async Services 
          invoke: {
            id: 'list-applications',
            src: 'listapplications',
            onDone: {
              //Go back to select next state
              target: 'nextState',
            }
          },
        },
        'app-configs:list': {
          entry: 'assignNextState',
          invoke: {
            id: 'list-app-configs',
            //how to pass flags related to commands if the flag value is captured from another command output?
            src: 'listappconfigs',
            onDone: {
              target: 'nextState',
            }
          }
        },
        'app-configs:get': {
          entry: 'assignNextState',
          invoke: {
            id: 'get-app-configs',
            src: 'getappconfigs',
            onDone: {
              target: 'nextState'
            }
          }
        },
        finish: {
          invoke: {
            src: complete,
          }
        }
      },
      on: {
        //Events
      }
    },
      {
        //Actions
        actions: {
          assignNextState: assign((context: any) => {
            context.commandsIndex += 1
          })
        },
        //Guards
        guards: {
        },
        //Invoke Services (Actors)
        services: {
          listapplications: async (context, event) => {
            await listApplications(context, event)
          },
          listappconfigs: async (context, event) => {
            await listAppConfigs(context, event)
          },
          getappconfigs: async (context, event) => {
            await getAppConfigs(context, event)
          },
          selectNextState: (context, event) => (sendBack, onReceive) => {
            //Check if next command is last command in workflow
            if (context.commandsIndex < context.commands.length) {
              //Send back event to nextState with next command name
              sendBack(`${commands[context.commandsIndex].toUpperCase()}`)
            } else {
              sendBack('FINISHED')
            }
          }
        }
      }
    )
  return stateMachine
}