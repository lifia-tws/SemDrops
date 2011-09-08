/**
 * EL nucleo es el encargado de centralizar todos los "objetos" del plugin
 * la idea del nucleo es poder ser el mediador entre los distintos elementos que 
 * componen el plugin, nada puede acceder a otra cosa sin pasar primero por el 
 * nucleo.
 * 
 * @param {Referencia a DisckStorageManager} _localStorage
 * @param {Referencia a Browser} _browserInterface
 * @param {Referencia a WikiStorageManager} _remoteStorage
 */

/** crosspage tomara el valor de la pagina donde nosotros iremos a buscar los datos semanticos de otra wikisemantica*/
var browser;
var crossCant;
var _labelId;

function Core(_localStorage,_browserInterface,_remoteStorage,_awarenes)
{
	this._localStorage;
	this._browserInterface;
	this._menu;
	this._mouse;
	this._labels;
	this._cant;
	this._selected;
	this._confgwind;
	this._remoteStorage;
	this._awarenes;
	this._timer;
	this._treeitem;
	this._wikicurrentreader;
	
/**
 *  EL "initialize" es la primera funcion que se ejecuta a nivel de objetos, su objetivo principal es poder inizializar
 *  todas las variables del objeto CORE, una vez inicializadas procede a la carga de los elementos cargados en las 
 *  wikis de los usuarios gracias a las dos funciones "readWikiUserData()" y "loadWikiData()".
 */	
	this.initialize = function (c,a,l,_tagmenu,_valuemenu)
									{
										_localStorage.initialize();
										_localStorage.createTable();
										_localStorage.readInDB();
										_cant = 0;
										_browserInterface.initialize();
										browser = _browserInterface;
										c.initialize();
										a.initialize();
										l.initialize();
										_labels = new Array(4);
										_labels[1] = c;
										_labels[2] = l;
										_labels[3] = a;
										_menu = new Array(2);
										_menu[0] = _tagmenu;	
										_menu[1] = _valuemenu;
										_confgwind = new ConfigureWindow();
										_wikicurrentreader = new CurrentWikiReader();
										_remoteStorage.initialize(_browserInterface);
										_remoteStorage.readUserData();
										_awarenes.initialize();
										_remoteStorage.setAwarenes(_awarenes);
										_wikicurrentreader.loadWikiData(_browserInterface);
									}
									
	this.increment = function ()
								{
									_cant++;
								}
	/**
	 *  "selected" retorna el elemento seleccionado a nivel de interfaz del semdrop, estos elementos pueden ser
	 *  un tag (categoria, link, atributo), o uno de sus respectivos valores.
	 */
	this.selected = function () 
								{
									return(_selected);
								}	
	/**
	 * "setselected()" setea un nuevo elemento en el momento en que el mouse selecciona un tag o su respectivo
	 * valor en la interfaz de semdrop. 
	*/
	this.setselected = function (sel)							
								{
									_selected = sel;
								}
	/**
	 * "agregar" funciona como intermedio entre la interfaz y el objeto LABEL, cualquier tag que se quiera agregar al 
	 * semdrop pasara primero por el core quien lo deriba a su respectivo label.
	 */
	this.agregar = function ()	
								{	
									var i = _selected.getAttribute('idCont');
									_labels[i].add(this,"Value","Attribute");
								}
	/**
	 * Idem agregar solo que borra.
	 */							
	this.borrar = function ()	
								{	
									var cell = core.selected();
									var row = cell.parentNode;
									var item = row.parentNode;
									var fin = item.parentNode;
									i = fin.getAttribute('id');
									_labels[i].del(this,fin,item);
								}	
	/**
	 * Idem agregar solo que modifica.
	 */							
	this.modificar = function()
								{
									var cell = core.selected();
									var row = cell.parentNode;
									var item = row.parentNode;
									var fin = item.parentNode;
									i = fin.getAttribute('id');
									_labels[i].mod(this);
								}
	/**
	 * La funcion selFather Esta solo disponible para las categorias, entonces solo pregunto si
	 * este link es una categoria, en caso de serlo disparo la ventana.
	 */
	
	this.selFather = function()
								{
									var cell = core.selected();
									var row = cell.parentNode;
									var item = row.parentNode;
									var fin = item.parentNode;
									i = fin.getAttribute('id');
									_labels[i].selFather(this);	
								}
	
	/**
	 * "loadInWiki" se encarga de almacenar el contenido de un nuevo tag dentro de la wiki que el usuario setea como
	 * destino. para ello deriva el almacenamiento al objeto WIKISTORAGEMANAGER (_wsm)
	 */							
	this.loadInWiki = function (value,attribute,tag)
								{
								    var i = tag.getAttribute('idCont');
								    _remoteStorage.write(value,attribute,i);
								}
	
	this.setRemoteStorage = function (rms)
								{
									_remoteStorage = rms;
								}
	/**
	 * cuando el mouse de la vista selecciona un nuevo tag este dispara la funcion "select", la cual setea el nuevo
	 * elemento seleccionado.
	 */						
	this.select = function (event,currentIndex)
									{
										var t = event.target.currentIndex;
										var father = event.target.view.getItemAtIndex(t);
										var sun1 = father.childNodes[0];
										var sun2 = sun1.childNodes[0];	
										_selected = sun2;
										_browserInterface.refreshPageSelected(event,sun2);
										var i = _selected.getAttribute('menu');
										_menu[i].menu();
									}	
	/**
	 * Funcion que delega al WIKISTORAGEMANAGER el borrado de un elemento seleccionado desde la aplicacion. La linea
	 * que se encuentra comentada es porque antes los tags se almacenaban de manera local.
	 */								
	this.deleteFile = function (word,attribute,tag)
									{
										_remoteStorage.dellete(word,attribute,i);
									}
	/**
	 * Idem deleteFile pero modificando.
	 */								
	this.modifiFile = function (word,newword,secon,oldattri,tag)
									{
										_remoteStorage.modifi(word,oldattri,newword,secon,i);
									}								
	/**
	 * retorna el objeto CATEGORY que se corresponde con los datos del tag Categoria en la aplicacion.
	 */								
	this.category = function ()
									{
										return (_labels[1].getself());
									}
	/**
	 * Idem category pero con le tag link.
	 */								
	this.links = function ()
									{
										return (_labels[2].getself());
									}
	/**
	 * Idem category pero con le tag attributos.
	 */									
	this.attributes = function ()
									{
										return (_labels[3].getself());
									}
									
	this.getcategory = function ()
									{
										return (_labels[1]);
									}
									
	this.getlinks = function ()
									{
										return (_labels[2]);
									}
									
	this.getattributes = function ()
									{
										return (_labels[3]);
									}								
	/**
	 * Cuando se produce un evento de movimiento de mouse la aplicacion compara si la pagina que visualiza el semdrop
	 * es la misma a la que visualiza el navegador. en caso de no ser asi, el semdrops hace un refresh con la nueva 
	 * pagina.
	 */								
	this.comparar = function ()
									{
										if (_browserInterface.compare())
										{
											window.location.reload();
											this.onLoad();
										}
									}
	/**
	 * Retorna el objeto DISKSTORAGEMANAGER el cual se encuentra obsoleto.
	 */								
	this.getLocalStorageManager = function ()
									{
										return _localStorage;
									}
								
	/*this.refreshPageSelected = function (event)
									{
										_browserInterface.refresPageSelected(event,this);
									}*/
	/**
	 *  share y unshare son funciones obsoletas cuyo objetivo es cambiar el icono de los tags cuando pasaban a ser 
	 *  compartidos.
	 */
	/*this.share = function ()
									{
										_selected.setAttribute('src',"amsn24.png");
									}	
									
	this.unshare = function ()
									{
										_selected.setAttribute('src',"noshare.png");
									}*/
	/**
	 * Cuando un usuario pone a compartir un tag se dispara la funcion publish, la cual deriba la responsabilidad al 
	 * WIKISTORAGEMANAGER, quien publica en la wiki visualizada por el browser el valor del elemenento de mi tag.
	 */								
	this.publish = function()								
									{
										var cell = core.selected();
										var row = cell.parentNode;
										var item = row.parentNode;
										var fin = item.parentNode;
										var i = fin.getAttribute('id');
										var cont = 0;
										_remoteStorage.publish(this,i);
									}
	/**
	 * Dispara la ventana de configuracion una vez precionado el respectivo boton.
	 */								
	this.configure = function ()
									{
										_confgwind.initialize();
									}
	/**
	 * Almacena los valores de la configuracion seleciconada dentro de un archivo local.
	 */								
	this.storageconfig = function (name,wiki)
									{
										_localStorage.loadInDB(name,wiki);
									}
	/**
	 *  Esta funcion permite refrescar la pagina con el valor del elento en el cual se disparo la opcion. si es una
	 *  category semdrops refrescara la pagina con el valor de la categoria pero dentro de la wiki local del usuario
	 *  donde el tiene almacenado todas las anotaciones, si en cambio es un link o un atributo el semdrop refrescara 
	 *  la pagina en la misma wiki que el usuario esta visualizando. 
	 */
	this.navigate = function ()
									{
										var value = this.selected().getAttribute('label');
										var personalwiki = document.getElementById("wikiname").value;
										var cell = core.selected();
										var row = cell.parentNode;
										var item = row.parentNode;
										var fin = item.parentNode;
										var i = fin.getAttribute('id');
										if (i == 1)
										{
											_browserInterface.refresh(personalwiki+"/Category:"+value);
										}
										else
										{
											value = row.childNodes[1].getAttribute('label');
											personalwiki = _browserInterface.getActualUri();
											var cont = -1;
											for (i=personalwiki.length; personalwiki[i] != "/" || i == 0;i--)
											{
												cont++;	
											}
											_browserInterface.refresh(personalwiki.substring(0,personalwiki.length-cont)+value);
										}
									}
}