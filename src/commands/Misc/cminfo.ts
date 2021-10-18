import { Command, CommandOptions } from '@sapphire/framework'
import { Message, MessageEmbed } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'

@ApplyOptions<CommandOptions>({
	aliases: ['cm-info'],
	description: 'Displays an explanation for what cm/rev(cm/360) is',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-cminfo

	🖇️ **| Aliases**: \`cm-info\`
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
})
export class UserCommand extends Command {
	public async messageRun(message: Message) {
		return message.reply({
			embeds: [
				new MessageEmbed()
					.setDescription(
						'cm/rev also known as cm/360 is a universal metric used for describing mouse sensitivity across all games. The definition is: how much centimeters you need to move your mouse in order to perform a 360 degree turn in-game.\n\nTo calculate yours use the `cm` command'
					)
					.setColor('#0099ff'),
			],
		})
	}
}
