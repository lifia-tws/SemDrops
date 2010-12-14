/*
 * Class in charge of modificating a tag using the “inpuntWindow.xul” interface.
 */

function ModifiMiniwindow () 
{
	this._label;
	this.value1;
	this.value2;
	this._node;
	this._delvalue;
	this._brother;
	
	this.initialize = function (valor1,valor2,label,node,brother)
	{
		var win = window.open('inputWindow.xul','Semdrops','width=380,height=150,top=300,left=400');
		this.value1 = valor1;
		this.value2 = valor2;
		this._label = label;
		this._node = node;
		this._brother = valor2;
		this._delvalue = valor1;
	}
	
	this.acept = function (a,b)
	{
		this._label.father.modificar(core,this._label,a.value,b.value,this._node,this._delvalue,this._brother);
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
