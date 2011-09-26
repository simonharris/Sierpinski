

function Coord(x, y) {

	this.x = x;
	this.y = y;

	this.mult = function(n) {
		return new Coord(Math.round(n * this.x), Math.round(n * this.y));
	}

	this.add = function(that) {
		return new Coord(Math.round(this.x + that.x), Math.round(this.y + that.y));
	}

	this.getMidPoint = function(that) {

		var outx = Math.round((this.x + that.x) / 2);
		var outy = Math.round((this.y + that.y) / 2);

		return new Coord(outx, outy);
	}
}


function Sierpinski() {

	var canvas, context, canvaso, contexto;

	var vertices = [
					new Coord(100, 450),
					new Coord(500, 450),
					new Coord(300, 104)
	];

	var numBlanks = 10;
	var numPoints = 16000;

	var ctr = 0;


	/*
	 * The basic scaffolding to get a canvas up and running
	 */
	function init ()
	{
		canvaso = document.getElementById('drawonme');
		if (!canvaso) {
			alert('Error: I cannot find the canvas element!');
			return;
		}

		if (!canvaso.getContext) {
			alert('Error: no canvas.getContext!');
			return;
		}

		contexto = canvaso.getContext('2d');
		if (!contexto) {
			alert('Error: failed to getContext!');
			return;
		}
	}


	/*
	 * Finds a random coordinate within the triangle
	 *
	 * In theory this isn't necessary, but the triangle converges a lot more
	 * quickly if you start off within the triangle
	 */
	function _getRandomPoint()
	{
		var a = Math.random();
		var b = Math.random();

		if ( (a + b) > 1 ) {
			a = 1-a;
			b = 1-b;
		}
		var c = 1 - a - b;

		var newa = vertices[0].mult(a);
		var newb = vertices[1].mult(b);
		var newc = vertices[2].mult(c);

		return newa.add(newb).add(newc);
	}


	function drawPoints()
	{
		// the "seed" point
		var currentPoint = _getRandomPoint();

		_findNextPoint(currentPoint);
	}


	function _findNextPoint(currentPoint)
	{
		var newPoint = currentPoint.getMidPoint(_getRandomVertex());

		if ( ctr > numBlanks ) {
			_drawPoint(newPoint);
		}

		ctr++;

		if ( ctr < numPoints ) {
			setTimeout(function() { _findNextPoint(newPoint) }, 1);
		}
	}


	function _getRandomVertex()
	{
		var myrand = Math.floor(Math.random() * vertices.length);
		return vertices[myrand];
	}


	function _drawPoint(coords)
	{
		contexto.beginPath();
		contexto.fillStyle = "#ff9900";
		contexto.arc(coords.x, coords.y, 1, 0, Math.PI * 2, true);
		contexto.closePath();
		contexto.fill();
		//contexto.fillRect(coords.x, coords.y, 1, 1);

	}
	init();
	drawPoints();
}
