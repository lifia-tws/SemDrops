/**
 * Modelo que se corresponde a la ventana de modificacion de los distintos Attributes 
 * o Links
 */

function Miniwindow () 
{
	this._label;
	this.value1;
	this.value2;
	
	this.initialize = function (valor1,valor2,label,fun)
	{
		var win = window.open('chrome://emptysidebar/content/inputWindow.xul','Semdrops','width=380,height=150,top=300,left=400');
		this.value1 = valor1;
		this.value2 = valor2;
		this._label = label;
	}
	
	this.acept = function (a,b)
	{
		this._label.create(a.value,b.value);
	}
	
	this.getValue1 = function ()
								{
									return this.value1;
								}

	this.getValue2 = function ()
								{
									return this.value2;
								}
}