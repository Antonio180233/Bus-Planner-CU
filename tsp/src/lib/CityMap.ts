import { BusStop } from './BusStop'
import fs from 'fs'
import readline from 'readline'

export class CityMap {
	public goal: BusStop | null = null
	public readonly stops: Record<string, BusStop> = {}
	// timeDistances[ 'stopA-stopB' ]
	public readonly timeDistances: Record<string, number> = {}

	public addStop( stop: BusStop ) {
		this.stops[ stop.name ] = stop
	}

	public assertDistances(): void {
		const names = Object.keys( this.stops )
		for ( let i = 0; i < names.length - 1; i++ ) {
			const name1 = names[ i ] ?? ''
			for ( let j = i + 1; j < names.length; j++ ) {
				const name2 = names[ j ] ?? ''
				this.getTimeDistance( name1, name2 )
			}
		}
	}

	public getClosestStops( stop: BusStop | string ): BusStop[] {
		if ( stop instanceof BusStop ) stop = stop.name
		return Object.values( this.stops )
			.filter( i => i.name !== stop && !i.isEmpty() && !i.isGoal() )
			.sort( ( a, b ) => this.getTimeDistance( stop, a ) - this.getTimeDistance( stop, b ) )
	}

	public getGoal(): BusStop {
		if ( !this.goal ) {
			this.goal = Object.values( this.stops ).find( i => i.isGoal() )!
		}
		return this.goal
	}

	public getStop( name: BusStop | string ): BusStop {
		if ( name instanceof BusStop ) return name
		const stop = this.stops[ name ]
		if ( !stop ) throw new RangeError( `No stop named "${ name }".` )
		return stop
	}

	public getStopsKey( stop1: BusStop | string, stop2: BusStop | string ) {
		stop1 = this.getStop( stop1 )
		stop2 = this.getStop( stop2 )

		return [ stop1.name, stop2.name ].sort().join( '-' )
	}

	public getStopsWithPeople(): Set<string> {
		return new Set( Object.values( this.stops )
			.filter( i => !i.isEmpty() )
			.map( i => i.name ) )
	}

	public getTimeDistance( stop1: BusStop | string, stop2: BusStop | string ): number {
		stop1 = this.getStop( stop1 )
		stop2 = this.getStop( stop2 )

		if ( stop1.name === stop2.name ) return 0
		const key = this.getStopsKey( stop1, stop2 )
		const time = this.timeDistances[ key ]
		if ( !time ) throw new RangeError( `No time distance set between ${ stop1.name } and ${ stop2.name }.` )
		return time
	}

	public setTimeDistance( stop1: BusStop | string, stop2: BusStop | string, time: number ): void {
		const key = this.getStopsKey( stop1, stop2 )
		this.timeDistances[ key ] = time
	}

	public async populateDistances(): Promise<void> {
		const lines = readline.createInterface( {
			input: fs.createReadStream( 'distances.csv' ),
			crlfDelay: Infinity
		} )
		for await ( const line of lines ) {
			if ( line.length === 0 ) continue
			const [ stop1, stop2, time ] = line.split( ',' ).map( i => i.trim() )
				.map( i => {
					const number = parseInt( i, 10 )
					return isNaN( number ) ? i : number
				} ) as [ string, string, number ]
			if ( !this.stops[ stop1 ] || !this.stops[ stop2 ] ) continue
			this.setTimeDistance( stop1, stop2, time )
		}
	}
}
