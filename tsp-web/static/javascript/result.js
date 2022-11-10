const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
	new bootstrap.Tooltip(tooltipTriggerEl, {
		placement: () => 'bottom'
	})
})

const { data, result } = window

const moveNext = $item => {
	const position = $item.data( 'position' ) || 1
	$item.data( 'position', position + 1 )
	const stops = $item.parent().children()
	const current = stops.eq( position )
	const next = stops.eq( position + 1 )

	if ( next.length === 0 ) return
	
	const spacing = ( next.offset().left - current.offset().left )
	$item.animate( {
		left: ( spacing * position ) + 'px'
	}, 750, () => {
		moveNext( $item )
	} )
}

$('.roadline').each((_, e) => {
	const $e = $(e)
	const $img = $e.children().eq( 0 )
	$img.data( 'position', 1 )
	moveNext( $img )
})

const btn = document.querySelector( '.btn' )
btn.addEventListener( 'click', () => {
	navigator.clipboard.writeText( window.location.href )
	btn.textContent = '¡Se ha copiado el enlace al portapapeles!'
	btn.classList.remove( 'btn-secondary' )
	btn.classList.add( 'btn-success' )
} )