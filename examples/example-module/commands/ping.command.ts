import { Message } from 'discord.js'
import { Injectable } from '../../../src/application/container'
import { ValkordCommand, CommandContext } from '../../../src/application/commands'

@Injectable()
export class PingCommand extends ValkordCommand {
  public readonly command = 'ping'
  public readonly name = 'Ping'
  public readonly group = 'Other'
  public readonly shortHelp = 'r6s ping'

  public async handle (ctx: CommandContext): Promise<Message | Message[] | void> {
    return ctx.reply('Pong!')
  }
}
