import { BusStop, CityMap, mTSP } from './lib'

( async () => {
	const stops: BusStop[] = []
	const data: Array<[ string, number ]> = [
		[ 'Torres Henequén', 95 ],
		[ 'Bodega Aurrera (Independencia)', 85 ],
		[ 'Mi Plaza Libramiento', 75 ],
		[ 'Aztecas', 75 ],
		[ 'Plaza Las Torres', 60 ],
		[ 'Torres del Sur (Torres Libramiento)', 60 ],
		[ 'Plaza Sendero', 50 ],
		[ 'Plaza Juárez', 50 ],
		[ 'Panamericana', 45 ],
		[ 'Porvenir', 30 ],
		[ 'Rayón y Lucero', 20 ],
		[ 'Plaza del Reloj', 15 ],
		[ 'Plaza Las Misiones', 15 ],
		[ 'Carlos Amaya', 15 ],
		[ 'Plaza Pinocelli', 10 ],
		[ 'Centro', 5 ],
		[ 'CU', 0 ]
	]
	stops.push( ...data.map( i => new BusStop( { name: i[ 0 ], people: i[ 1 ] } ) ) )

	const map = new CityMap()
	for ( const bstop of stops ) map.addStop( bstop )
	await map.populateDistances()

	const model = new mTSP( map, 'CU' )
	const buses = model.run()
	let totalTime = 0
	for ( const bus of buses ) {
		totalTime += bus.getTime()
		console.log( `${ bus }` )
	}
	console.log( `----\nTotal time: ${ totalTime }` )
} )()
