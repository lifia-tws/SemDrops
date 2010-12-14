/**
 * Parcing which mediates between all the main .XUL functions (emptysidebar.xul) and
 * the Core.js class, in charge of communicating the different elements of the system.
 */

var CANT = 2;
var CANTVAL = 1;
var ETIQUETAS = 4;
var core;
var mw;

function onLoad(event)
{
	//document.onmousedown = refreshPageSelected;
	document.onmousemove = comparar;
	
	var chromeURL = location;
	var crs = Components.classes['@mozilla.org/chrome/chrome-registry;1'].getService(Components.interfaces.nsIChromeRegistry);
	var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
	var nsIURI = ios.newURI(decodeURI(chromeURL), 'UTF-8', null);
	var fileURL = crs.convertChromeURL(nsIURI).spec; 
	mw = new Miniwindow();
	modw = new ModifiMiniwindow();
	
	core = new Core(_local_store_manager,_browser_interface, _remote_storage_manager,_awarenes_manager);
	
	core.initialize(new Category(),new Attributes(),new Links(),_tags_menu,_value_menu);
	
	core.cargar();
	core.comparar();
}

function modificar(event)
{
	core.modificar();	
}

function agregar()
{
	core.agregar();
}

function borrar(event)
{
	core.borrar();
}
   
function select(event)
{
	core.select(event);
}

function publicar(event)
{
	core.publish();
}

function refreshPageSelected(event)
{
	//core.refreshPageSelected(event);
}

function comparar()
{
	core.comparar();
}

function configure()
{
	core.configure();
}

function navegar()
{
	core.navigate();
}
