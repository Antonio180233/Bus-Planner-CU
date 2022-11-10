import { Bus } from './Bus'
import type { CityMap } from './CityMap'

export class mTSP {
	protected readonly buses: Bus[] = []
	protected readonly cityMap: CityMap
	protected readonly endStop: string

	public constructor( cityMap: CityMap, endStop: string ) {
		this.cityMap = cityMap
		this.endStop = endStop
		this.cityMap.getStop( endStop ).setGoal()

		this.cityMap.assertDistances()
	}

	public getSortedByDistance() {
		const stopsWithPeople = this.cityMap.getStopsWithPeople()
		return Object.entries( this.cityMap.timeDistances )
			.filter( i => !i[ 0 ].startsWith( `${ this.endStop }-` ) && !i[ 0 ].endsWith( `-${ this.endStop }` ) )
			.sort( ( a, b ) => a[ 1 ]- b[ 1 ] )
			.map( i => i[ 0 ].split( '-' ) )
			.flat()
			.reduce( ( list, item ) => {
				if ( !list.includes( item ) ) list.push( item )
				return list
			}, [] as string[] )
			.filter( i => stopsWithPeople.has( i ) )
	}

	public getLastBus(): Bus {
		const bus = this.buses.at( -1 )
		if ( !bus || bus.isFull() ) {
			const bus = new Bus( this.cityMap )
			this.buses.push( bus )
			return bus
		}
		return bus
	}

	public haveRemainingStops(): boolean {
		return !!Object.values( this.cityMap.stops ).map( i => i.getPeople() )
			.find( i => i !== 0 )
	}

	public run(): Bus[] {
		while ( this.haveRemainingStops() ) {
			const bus = this.getLastBus()
			const start = this.getSortedByDistance().shift()
			if ( !start ) break
			const startStop = this.cityMap.getStop( start )
			bus.run( startStop )
		}

		return this.buses
	}
}
