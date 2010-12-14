/**
 * The core is in charge of centralizing the plugin objects. Its aim is to be the
 * mediator between the different elements of the plugin. Each element goes through
 * the core before gaining acces to any other element. 
 * 
 * @param {Referencia a DisckStorageManager} _localStorage
 * @param {Referencia a Browser} _browserInterface
 * @param {Referencia a WikiStorageManager} _remoteStorage
 */

/** The crosspage will take the value of the page where we will search the semantic data of another semantic wiki. */
var browser;
var crossCant;

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
	
/**
 * ”Initialize” is the first function executed at the object level. Its main goal is to initialize all
 * the variables of the core object. Once they are initialized, the upload of the uploaded elements in
 * the users´ wikis begins by means of the readWikiUserData()" y "loadWikiData()" functions.
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
										_timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
										_menu = new Array(2);
										_menu[0] = _tagmenu;	
										_menu[1] = _valuemenu;
										_confgwind = new ConfigureWindow();
										_remoteStorage.initialize(_browserInterface);
										_remoteStorage.readUserData();
										_awarenes.initialize();
										_remoteStorage.setAwarenes(_awarenes);
									}
									
	this.increment = function ()
								{
									_cant++;
								}
	/**
	 *  ”selected” returns the selected element to the semdrop interface level. These elements may be
	 *  a tag (category, link, attribute) or one of its respective values.
	 */
	this.selected = function () 
								{
									return(_selected);
								}	
	/**
	 * ”setselectes()” sets a new element when the mouse selects a tag or its respective value in the
	 * interface of the semdrop.
	*/
	this.setselected = function (sel)							
								{
									_selected = sel;
								}
	/**
	 * "agregar" works as a mediator between the interface and the object LABEL. Any tag to be added
         * to the semdrops will go first through the core, which will send it to its respective label.
	 */
	this.agregar = function ()	
								{	
									var i = _selected.getAttribute('idCont');
									_labels[i].add(this,"Value" + CANTVAL,"Attribute");
								}
	/**
	 * The same as for “agregar” just that it deletes.
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
	 * The same as for “agregar” just that it modifies.
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
	 * "loadInWiki” is in charge of storing the content of a new tag in the wiki setted by the user as destination.
	 * It derives the storing to the WIKISTIRAGEMANAGER (_wsm).
	 */							
	this.loadInWiki = function (value,attribute,tag)
								{
								    var i = tag.getAttribute('idCont');
								    _remoteStorage.write(value,attribute,i);
								}
	
	/**
	 * When the mouse selects a new tag, the select function is triggered and the new selected element is setted.
	 */						
	this.select = function (event)
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
	 * Function that delegates the deletion of a selected element from the aplication to the WIKISTORAGEMANAGER.
	 * This comment is made because in the past the tags were stored locally.
	 */								
	this.deleteFile = function (word,attribute)
									{
										_remoteStorage.dellete(word,attribute);
									}
	/**
	 * The same as for “deletefile” just that it modifies.
	 */								
	this.modifiFile = function (word,newword,secon,oldattri)
									{
										_remoteStorage.modifi(word,oldattri,newword,secon);
									}								
	/**
	 * It returns the object CATEGORY which corresponds with Category tag data in the application.
	 */								
	this.category = function ()
									{
										return (_labels[1].getself());
									}
	/**
	 * The same as for “category”, but for tag link.
	 */								
	this.links = function ()
									{
										return (_labels[2].getself());
									}
	/**
	 * The same as for “category” but for the tag Attributes.
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
	 * When the mouse is moved, the application compares whether the page visualized by the 
	 * semdrop and that visualized by the browser are the same. If the pages do not coincide,
	 * the semdrop refreshes the new page.
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
	 * It returns the obsolete DISKSTORAGEMANAGER object.
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
	 *  ”Share” and “unshare” are obsolete functions whose purpose is to change the icon of the tags whenever they were shared.
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
	 * When a user shares a tag, the “publish” function is triggered andi t derives the responsibility to the
	 * WIKISTORAGEMANAGER which, in turn, publishes on the wiki visualized by the browser the value of the 
	 * element of my tag. 
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
	 * It triggers the configuration window by pressing the respective button.
	 */								
	this.configure = function ()
									{
										_confgwind.initialize();
									}
	/**
	 * It stores the selected configuration values in a local file.
	 */								
	this.storageconfig = function (name,wiki)
									{
										_localStorage.loadInDB(name,wiki);
									}
	/**
	 * This function allows the user to refresh the page with the value of the element in which the option
	 * was triggered. If it is a semdrops category, it will refresh the page with the value of the category
	 * but within the user´s local wiki, where all the annotations are stored. If it is a link or an attribute,
	 * the semdrop will refresh the page in the Wiki visualized by the user.  
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
