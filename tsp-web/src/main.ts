import express from 'express'
import lz from 'lz-string'
import path from 'path'

const app = express()
app.set( 'view engine', 'pug' )
app.use( '/static', express.static( path.join( __dirname, '../static' ) ) )

app.listen( 3000, () => console.log( 'ready' ) )

app.get( '/', async ( _, res ) => {
	const stops = [ 'Torres Henequén', 'Bodega Aurrera (Independencia)', 'Mi Plaza Libramiento', 'Aztecas', 'Plaza Las Torres', 'Torres del Sur (Torres Libramiento)', 'Plaza Sendero', 'Plaza Juárez', 'Panamericana', 'Porvenir', 'Rayón y Lucero', 'Plaza del Reloj', 'Plaza Las Misiones', 'Carlos Amaya', 'Plaza Pinocelli', 'Centro' ].sort()
	res.render( 'index', { stops } )
} )

app.get( '/encode', ( req, res ) => {
	const data: Record<string, number> = {}
	for ( const [ key, value ] of Object.entries( req.query ?? {} ) ) {
		if ( typeof value !== 'string' ) continue
		data[ key ] = parseInt( value ) || 0
	}

	res.send( lz.compressToBase64( JSON.stringify( data ) ) )
} )

app.get( '/result', async ( req , res ) => {
	const { key } = req.query
	if ( typeof key !== 'string' ) {
		res.sendStatus( 400 )
		return
	}
	const text = lz.decompressFromBase64( key ) ?? '{}'
	const data = JSON.parse( text.replace( /_/g, ' ' ) )
	for ( const [ key, value ] of Object.entries( data ) ) {
		data[ key ] = parseInt( value as string ) || 0
	}

	const result = await fetch( 'http://localhost:8000/test', {
		body: JSON.stringify( data ),
		credentials: 'omit',
		headers: { 'content-type': 'application/json' },
		method: 'POST',
		mode: 'no-cors'
	} ).then( r => r.json() ).catch( () => null )

	res.render( 'result', { data, result } )
} )