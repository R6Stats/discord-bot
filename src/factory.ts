import { ValkordClient } from './client'
import { Container } from './application/container'
import { Constructor } from './types'
import { CommandSignatureArgumentTypeString } from './application/commands'

export const DEFAULT_ARGUMENT_TYPES = [
  CommandSignatureArgumentTypeString,
]

export class ValkordFactory {
  public static async create <T extends ValkordClient = ValkordClient>(base: Constructor<T>): Promise<ValkordClient> {
    const container = new Container()

    const client = container.resolve<T>(base)

    container.bootModules()

    await client.setup()

    const handler = client.getCommandRegistry()

    handler.registerArgumentTypes(...DEFAULT_ARGUMENT_TYPES)

    return client
  }
}
