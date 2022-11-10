import type { BusStop } from './BusStop'
import type { CityMap } from './CityMap'

export interface IStopLoad {
	passengers: number
	stop: string
}

export class Bus {
	public static readonly CAPACITY = 44
	protected static counter = 1

	public readonly id: number
	public readonly stops: IStopLoad[] = []
	protected passengers = 0

	protected readonly cityMap: CityMap

	public constructor( cityMap: CityMap ) {
		this.cityMap = cityMap
		this.id = Bus.counter++
	}

	public addPassengers( stop: string, i: number ): void {
		this.passengers += i
		if ( this.passengers > Bus.CAPACITY ) throw new RangeError( `This bus is beyond full: ${ this.passengers } / ${ Bus.CAPACITY }` )
		this.stops.push( {
			passengers: i,
			stop
		} )
	}

	public availableCapacity(): number {
		return Bus.CAPACITY - this.passengers
	}

	public getTime(): number {
		let time = 0
		for ( let i = 0; i < this.stops.length - 1; i++ ) {
			const stopA = this.stops[ i ]!.stop
			const stopB = this.stops[ i + 1 ]!.stop
			time += this.cityMap.getTimeDistance( stopA, stopB )
		}
		time += this.cityMap.getTimeDistance( this.stops.at( -1 )!.stop, this.cityMap.getGoal() )

		return time
	}

	public isFull(): boolean {
		return this.passengers === Bus.CAPACITY
	}

	public run( stop: BusStop ): void {
		while ( !this.isFull() ) {
			if ( stop.isEmpty() ) {
				const closest = this.cityMap.getClosestStops( stop )
				const first = closest[ 0 ]
				if ( !first ) return
				stop = first
			}
			this.addPassengers( stop.name, stop.takePeople( this.availableCapacity() ) )
		}
	}

	public toString(): string {
		const result: string[] = [ `Bus ${ this.id }:` ]
		for ( const stop of this.stops ) {
			result.push( `\t${ stop.stop }: ${ stop.passengers } passengers` )
		}
		result.push( `\t* Total: ${ this.passengers }` )
		result.push( `\t* Time: ${ this.getTime() }` )

		return result.join( '\n' )
	}
}
