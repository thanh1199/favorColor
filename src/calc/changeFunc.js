
function rgb2hsv ( rgb = [0, 0, 0] ) {
    var r = rgb[0] / 255 ;
    var g = rgb[1] / 255 ;
    var b = rgb[2] / 255 ;

    var max = Math.max( r, g, b ) ;
    var min = Math.min( r, g, b ) ;
    var diff = max - min ;

    var h = 0 ;

    switch( min ) {
        case max :
            h = 0 ; break ;
        case r :
            h = (60 * ((b - g) / diff)) + 180 ; break ;
        case g :
            h = (60 * ((r - b) / diff)) + 300 ; break ;
        case b :
            h = (60 * ((g - r) / diff)) + 60 ; break ;
        default :
            h = undefined; break;
    }
    var s = max === 0 ? 0 : diff / max * 100 ;
    var v = max * 100 ;
    return [ h, s, v ] ;
}

function hsv2rgb ( hsv = [0, 0, 0] ) {
    var h = hsv[0] / 60
	var s = hsv[1] / 100
	var v = hsv[2] / 100
	if ( s === 0 ) return [Math.round(v * 255), Math.round(v * 255), Math.round(v * 255)]

	var rgb ;
	var i = parseInt( h ) ;
	var f = h - i ;
	var v1 = v * (1 - s) ;
	var v2 = v * (1 - s * f) ;
	var v3 = v * (1 - s * (1 - f)) ;

	switch ( i ) {
		case 1 : rgb = [ v2, v, v1 ]; break ;
		case 2 : rgb = [ v1, v, v3 ]; break ;
		case 3 : rgb = [ v1, v2, v ]; break ;
		case 4 : rgb = [ v3, v1, v ]; break ;
        case 5 : rgb = [ v, v1, v2 ]; break ;
        default: rgb = [ v, v3, v1 ]; break
	}
	return rgb.map( value => Math.round(value * 255)) 
}

function dec2Hex(value) {
    if (value > 255) {
      return 'FF';
    } else if (value < 0) {
      return '00';
    } else {
      return value.toString(16).padStart(2, '0').toUpperCase();
    }
}
function rgb2Hex( rgb ) {
    return '#' + dec2Hex(rgb[0]) + dec2Hex(rgb[1]) + dec2Hex(rgb[2]);
}

export { rgb2hsv, hsv2rgb, rgb2Hex }