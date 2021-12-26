import { Tags } from '#lib/types/AnalyticsSchema'
import type { Point } from '@influxdata/influxdb-client'
import { Listener, ListenerOptions, PieceContext } from '@sapphire/framework'

export abstract class AnalyticsListener extends Listener {
	public tags: [Tags, string][] = []

	public constructor(
		context: PieceContext,
		options?: AnalyticsListener.Options
	) {
		super(context, {
			...options,
			enabled: Boolean(process.env.INFLUX_TOKEN),
		})
	}

	public onLoad() {
		this.initTags()
		return super.onLoad()
	}

	public writePoint(point: Point) {
		return this.container.analytics!.writeApi.writePoint(
			this.injectTags(point)
		)
	}

	public writePoints(points: Point[]) {
		points = points.map((point) => this.injectTags(point))
		return this.container.analytics!.writeApi.writePoints(points)
	}

	protected injectTags(point: Point) {
		for (const tag of this.tags) {
			point.tag(tag[0], tag[1])
		}
		return point
	}

	protected initTags() {
		this.tags.push(
			[Tags.Client, process.env.CLIENT_ID ?? ''],
			[Tags.OriginEvent, this.event.toString()]
		)
	}
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AnalyticsListener {
	export type Options = Omit<ListenerOptions, 'enabled'>
}
