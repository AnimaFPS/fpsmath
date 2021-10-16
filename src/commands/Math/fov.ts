import { Args, Command, CommandOptions } from '@sapphire/framework'
import type { Message } from 'discord.js'
import { ApplyOptions } from '@sapphire/decorators'
import { filmToTrue } from '../../helpers/fovHelper'

@ApplyOptions<CommandOptions>({
	aliases: ['fov-scaling', 'film'],
	description:
		'Finds the true vertical and horizontal FoV that is being displayed on screen',
	detailedDescription: `
	📝 **| Command Usage**
	→ fps-fov *FoV* *GameName* *AspectRatio*
	→ fps-fov *FoV* *FILMNotation* *AspectRatio*

	🖇️ **| Aliases**: \`fov-scaling\` and \`film\`

	🔍 **| Extended Help**
	Finds the true vertical or horizontal FoV for certain aspect ratio that the game is being rendered at plus game's FoV scaling method

	⚙ **| Explained usage**
	→ **FoV**: The in-game FoV value or equivalent FoV value.
	→ **GameName**: The name of the game that is tied to the FoV. The games supported and the aliases that are compatible use the \`games\` command.
	→ **FilmNotation**: See [Kovaak's article on FILM notation](https://www.kovaak.com/film-notation/)
	→ **AspectRatio**: The aspect ratio of the monitor or game screen size. i.e. \`horizontal:vertical\`

	🔗 **| Examples**
	→ fps-fov *90* *cs* *16:9*
	→ fps-fov *103* *ow* *4:3*
	`,
	generateDashLessAliases: true,
	requiredClientPermissions: ['SEND_MESSAGES'],
})
export default class UserCommand extends Command {
	public async messageRun(message: Message, args: Args) {
		const fov = await args.pick('float')
		const film = await args.pick('film')
		const aspect = await args.pick('aspectRatio')
		const { horizontalFOV, verticalFOV } = filmToTrue(fov, film, aspect)
		return message.reply(
			`Horizontal FoV: ${parseFloat(
				horizontalFOV.toFixed(5)
			)}°\nVertical FoV: ${parseFloat(verticalFOV.toFixed(5))}°`
		)
	}
}
