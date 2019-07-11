import { Client, Message } from 'discord.js'
import config from './BotConfig'
import R6StatsAPI from 'r6stats'
import * as fs from 'fs'
import * as path from 'path'

const client = new Client()

const api = new R6StatsAPI({
  apiKey: config.apiToken || ''
})

const SUPPORTED_RESPONDERS = ['!r6s', '!r6stats', '!r6', 'r6s', 'r6stats', 'r6']

const commands = []

loadCommands()

client.on('ready', () => {
  console.log(`Shard ${client.shard.id} online and ready to handle ${client.guilds.size} guilds!`)
})

client.on('error', e => {
  console.error(e)
})


client.on('message', messageHandler)
client.login(config.discordToken)

async function loadCommands () {
  const files = fs.readdirSync(path.join(__dirname, 'src', 'commands'))

  for (let file of files) {
    const { default: clazz } = await require(path.join(__dirname, 'src', 'commands', file))
    console.log(`Registering command ${ clazz.name }...`)
    commands.push(clazz)
  }

  console.log(`${ commands.length } command${ commands.length === 1 ? '': 's' } registered.`)
}

function messageHandler (message: Message) {

	if (message.author.bot) return

  if (!isOurCommand(message.content)) return

	let split = message.content.split(' ')
	if (split.length <= 1) return
	let command = split[1].toLowerCase()
	let args = split.slice(2)

  for (let cmd of commands) {

    let cmdInstance = new cmd({ args, message, command, api })
    if (cmdInstance.shouldInvoke()) {
      let channel = message.channel
      let name = channel.hasOwnProperty('name') ? `in #${channel.name}` : 'via DM'
      console.log(`Invoking command ${ command } ${name} with args ${args.join(',')}`)
      cmdInstance.invoke()
      break
    }
  }
}

function isOurCommand(str) {
  let split = str.split(' ')
  if (split.length === 0) return false
  let cmd = split[0].toLowerCase()
  for (let responder of SUPPORTED_RESPONDERS) {
    if (cmd === responder) {
      return true
    }
  }
}
