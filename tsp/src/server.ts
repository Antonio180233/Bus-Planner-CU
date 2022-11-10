import express from 'express'
import { BusStop, CityMap, mTSP } from './lib'
import cors from 'cors'
const app = express()
app.use( express.json() )
app.use( cors( { origin: '*' } ) )
app.use( ( _, res, next ) => {

	// Website you wish to allow to connect
	res.setHeader( 'Access-Control-Allow-Origin', '*' )

	// Request methods you wish to allow
	res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE' )

	// Request headers you wish to allow
	res.setHeader( 'Access-Control-Allow-Headers', 'X-Requested-With,content-type' )

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader( 'Access-Control-Allow-Credentials', 'true' )

	// Pass to next layer of middleware
	next()
} )
app.listen( 8000, async () => {
	console.log( 'Server started' )
} )

app.post( '/test', async ( req, res ) => {
	console.log( req.ip )
	try {
		const map = new CityMap()
		const data = req.body as Record<string, number>
		for ( const [ name, people ] of Object.entries( data ) ) {
			map.addStop( new BusStop( { name, people } ) )
		}
		map.addStop( new BusStop( { name: 'CU', people: 0 } ) )
		await map.populateDistances()
		const model = new mTSP( map, 'CU' )
		const buses = model.run()

		res.send( buses )
	} catch ( e ) {
		res.send( null )
	}
} )
