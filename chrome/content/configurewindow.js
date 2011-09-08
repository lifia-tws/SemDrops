/**
 * Esta Clase proporciona los datos sobre el cliente que esta utilizando el Semdrops
 * aqui por el momento solo se almacena el nombre del usuario asi como su wiki personal
 */

function ConfigureWindow ()
{
	this._username;
	this._wiki;
	
	this.initialize = function ()
	{
		this._username = document.getElementById("username").value;
		this._wiki = document.getElementById("wikiname").value;
		window.document.TEXT_NODE = this;
		window.open('configureWindow.xul','Semdrops','width=380,height=155,top=300,left=400');
	}
	
	this.save = function (name,wiki)
	{
		this._username = name;
		this._wiki = wiki;
		document.getElementById("username").setAttribute('value',name);
		document.getElementById("wikiname").setAttribute('value',wiki);
		core.storageconfig(name,wiki);
	}
	
	this.getName = function ()
								{
									return this._username;
								}
	this.getWiki = function ()
								{
									return this._wiki;
								}
}