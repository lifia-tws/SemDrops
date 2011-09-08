/**
 * Parceador intermediario entre todas las funciones del .XUL principal (emptysidebar.xul)
 * y la clase Core.js que es la encargada de comunicar los distintos elementos del 
 * sistema.
 */

var CANT = 2;
var CANTVAL = 1;
var ETIQUETAS = 4;
var core;
var mw;
var fatherwin;

function onLoad(event)
{
	var chromeURL = location;
	var crs = Components.classes['@mozilla.org/chrome/chrome-registry;1'].getService(Components.interfaces.nsIChromeRegistry);
	var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
	var nsIURI = ios.newURI(decodeURI(chromeURL), 'UTF-8', null);
	var fileURL = crs.convertChromeURL(nsIURI).spec; 
	mw = new Miniwindow();
	fatherwin = new WindowHierarchy()
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
   
function select(event,currentIndex)
{
	core.select(event,currentIndex);
}

function publicar(event)
{
	core.publish();
}

function refreshPageSelected(event)
{
	//core.refreshPageSelected(event);
}

function selFather(event)
{
	core.selFather();
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

function linkDrop()
{
	alert("link");
}