import chalk from 'chalk'

export function highlightModeNames(message: string, options: any) {
  let highlightedMessage = message

  for (const mode of options.mode) {
    highlightedMessage = highlightedMessage.replace(mode, chalk.red(mode))
  }

  return highlightedMessage
}
