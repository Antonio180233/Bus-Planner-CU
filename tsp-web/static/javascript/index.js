const inputs = document.querySelectorAll( '.form-control' )

const updateTotal = () => {
	const count = [ ...inputs.values() ].reduce( ( total, input ) => {
		const value = parseInt( input.value, 10 ) || 0
		return total + value
	}, 0 )
	document.querySelector( '.total-count__value' ).textContent = count
}

inputs.forEach( input => {
	input.addEventListener( 'input', e => {
		updateTotal()
	} )
} )

document.querySelector( '.btn' ).addEventListener( 'click', async () => {
	const total = document.querySelector( '.total-count__value' ).textContent || 0
	if ( total > 1012 ) {
		alert( 'El número de estudiantes excede el máximo que se puede transportar con 23 autobuses (1012 pasajeros).' )
		return
	}
	const data = {}
	inputs.forEach( input => {
		const value = parseInt( input.value ) || 0
		data[ input.name ] = value
	} )
	const qs = Object.entries( data )
		.filter( entry => entry[ 1 ] !== 0 )
		.map( param => param.join( '=' ) )
		.join( '&' )
		.replace( / /g, '_' )
	const req = await fetch( `/encode?${ qs }` )
	const key = await req.text()
	
	window.location.href = `/result?key=${ encodeURIComponent( key ) }`
} )