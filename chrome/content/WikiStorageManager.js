/**
	El WSM es un almacenador en wikis el mismo se encarga de poder meter todos los 
	datos personales de un usuario dentro de una wiki que llevara el mismo nombre del
	user.
*/
var _auxdom
var auxuri;
var wikiuri;
var _browser;
var _value;
var _attribute;
var _newvalue;
var _newattribute;
var _idlabel;
var rdf;
var id;
var crosspage;
var _awarenes;
var cantidad;

function Wikistoragemanager()
{
	this._uriwiki;
	this._timer;
	
/**
 * Esta funcion inicializa el objeto wiki storage manager, obteniendo el nombre de la wiki local y la visualizada por 
 * el usuario
 */	
	this.initialize = function (browser)
									{
										cantidad = 1;
										_browser = browser;
										_timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
										_uriwiki = document.getElementById("wikiname").value+"?title="+document.getElementById("username").value;
									}
/**
 * Escribe el valor presentado dentro de la wiki, derivandole el valor a cargar y la url al objeto BROWSER
 * usa un template al igual que dellete y modifi para no repetir codigo.
 */	
	this.write = function (value,attribute,idlabel)
									{
										_value = value;
										_attribute = attribute;
										_idlabel = idlabel;
										templateWikiFunction(functionadd);
									}
	this.setAwarenes = function (_awa)
									{
										_awarenes = _awa;	
									}		
									
	/*Esta con dos ll poruqe delete es una palabra reservada por JS*/
	this.dellete = function (value,attribute,idlabel)
									{
										_value = value;
										_attribute = attribute;
										_idlabel = idlabel;
										templateWikiFunction(functiondel);
									}
									
	this.modifi = function (value,attribute,newvalue,newattribute,idlabel)
									{
										_value = value;
										_attribute = attribute;
										_newvalue = newvalue;
										_newattribute = newattribute;
										_idlabel = idlabel;
										templateWikiFunction(functionmod);
									}
	/**
	 * publica el valor del elemento seleccionado en la wiki que actualmente esta visualizando el browser.
	 * para ello obtiene el valor a cargar y se lo deriba al browser.
	 */
	this.publish = function (core,labelid)
									{
										document.onmousedown = null;
										document.onmousemove = null;
										url = _browser.getActualUri();
										var cont=0;
										for (i=url.length; url[i] != "/" || i == 0;i--)
										{
											cont++;	
										}
										url = url.substring(0,url.length - cont);
										var name = _actualUri.substring(_actualUri.length - --cont,_actualUri.length);
										_browser.refresh(url+"?title="+name+"&action=edit");
										var xmlreq = createXMLHTTPobject();
										xmlreq.onreadystatechange = function ()
										{
											if (xmlreq.readyState == 4)
											{
												_browser.publish(core,labelid);
											}
										}
										xmlreq.open("GET",url+"?title="+name+"&action=edit");
										xmlreq.send(null);
									}
	
	this.readUserData = function ()
					{
						rdf = new RDF();
						var url = document.getElementById("wikiname").getAttribute('value')+"/Special:ExportRDF/"+document.getElementById("username").getAttribute('value')+_browser.getActualUri()+"wikistorage";
						id = 1;
						$.get(url,function (){rdf.getRDFURL(url,callbackUserData);})
						 .error(function() { alert("Hubo un problema en la conexion, lo sentimos");});
					}
}

// FUNCIONES AJENAS AL OBJETO WIKISTORAGEMANAGER, EL OBJETO LAS PUEDE VER Y USAR Y NO ESTAN DISPONIBLES PARA LOS DEMAS
// OBJETOS.

/**
 * esta funcion espera un delay de 1 segundo y refresca el semdrops
 */
function returnToPage()
{
	var event = { notify : function(timer) {window.location.reload();}}
	_timer.initWithCallback(event,1000,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}
/**
 *  Esta funcion se usa dentro del template y le dice al browser que debe agregar un elemento a la wiki.
 */
function functionadd(wikidata)
{
	if(_idlabel == 1)
	{	
		_value = _value.toLowerCase();
		return (wikidata+"[[Category::"+_value+"]]");
	}
	else
		if(_idlabel == 2)
		{
			_value = _value.toLowerCase();
			_attribute = _attribute.toLowerCase();
			return (wikidata+"[["+_value+"::"+_attribute+"]]");
		}	
		else
		{
			_value = _value.toLowerCase();
			_attribute = _attribute.toLowerCase();
			return (wikidata+"[["+_value+":="+_attribute+"]]");
		}
}
/**
 * Idem funcionadd pero borra en lugar de agregar.
 */
function functiondel(wikidata)
{
	if (_idlabel == 1)
	{
		_value = _value.toLowerCase();
		wikidata = wikidata.replace("[[Category::IDisagreeª"+_value+"]]"," ");
		wikidata = wikidata.replace("[[Category::"+_value+"]]","[[Category::IDisagreeª"+_value+"]]");
	}
	else
	{
		_value = _value.toLowerCase();
		_attribute = _attribute.toLowerCase();
		wikidata = wikidata.replace("[["+_value+"::IDisagreeª"+_attribute+"]]"," ");
		wikidata = wikidata.replace("[["+_value+"::"+_attribute+"]]","[["+_value+":=IDisagreeª"+_attribute+"]]");
		wikidata = wikidata.replace("[["+_value+":=IDisagreeª"+_attribute+"]]"," ");
		wikidata = wikidata.replace("[["+_value+":="+_attribute+"]]","[["+_value+":=IDisagreeª"+_attribute+"]]");
	}
	return wikidata;
}
/**
 * Idem funcionadd pero modifica en lugar de agregar.
 */
function functionmod(wikidata)
{
	if (_idlabel == 1)
	{
		_value = _value.toLowerCase();
		_newvalue = _newvalue.toLowerCase();
		wikidata = wikidata.replace("[[Category::"+_value+"]]","[[Category::"+_newvalue+"]]");
	}
	else
	{
		_value = _value.toLowerCase();
		_newvalue = _newvalue.toLowerCase();
		_attribute = _attribute.toLowerCase();
		_newattribute = _newattribute.toLowerCase();
		wikidata = wikidata.replace("[["+_value+"::"+_attribute+"]]","[["+_newvalue+"::"+_newattribute+"]]");
		wikidata = wikidata.replace("[["+_value+":="+_attribute+"]]","[["+_newvalue+":="+_newattribute+"]]");
	}
	return (wikidata);
}

/**
 * Template method para no repetir codigo sin necesidad... la var "fun" es una 
 * function que se ejecuta para su correspondiente ya sea si se agrogo, borro 
 * o modifico un valor.
 */
var url;

function templateWikiFunction(fun)
{
	var subject = escape(_browser.getActualUri());
	url = _uriwiki+subject+"wikistorage";
	var xmlreq = createXMLHTTPobject();
	xmlreq.onreadystatechange = function ()
	{
		if (xmlreq.readyState == 4)
		{
			var dom = xmlreq.responseXML;
			var editform = dom.documentElement.getElementsByTagName("form")[0];
			createPostMessage(editform.childNodes,fun);
		}
	}
	xmlreq.open("GET",url+"&action=edit","true");
	xmlreq.send(null);
}

function createPostMessage(form,fun)
{
	var starttime = form[2].getAttribute("value");
	var edittime = form[4].getAttribute("value");
	var autosummary = form[8].getAttribute("value");
	if(form[10].childNodes[0] == null)
	{
		var nam = fun("");
	}
	else
	{
		var nam = fun(form[10].childNodes[0].data);
	}
	var save = "Save Page";
	var edittoken = form[16].getAttribute("value");
	url = url+"&action=submit";
	$.post(url,{wpSection:"",wpStarttime:starttime,wpEdittime:edittime,wpScrolltop:"0",wpAutoSummary:autosummary,oldid:"0",wpTextbox1:nam,wpSummary:"",wpSave: save, wpEditToken: edittoken},function (data){response(data);});
}

function response(data)
{
	window.location.reload();
}

function callbackUserData()
{
	var wikiname = document.getElementById("wikiname").value;
	var all = rdf.Match(null,null,null,null);
	for (var i=0;i < all.length;i++)
	{
		var word = all[i].predicate.split(wikiname+"/Special:URIResolver/Property-3A");
		if (word[0] == "")
		{
			if(word[1] == "Category")
			{
				loadCategoryTagUserData(all[i].object);
			}
			else
			{
				loadUserTagLink(word[1],all[i].object.split(wikiname+"/Special:URIResolver/")[1]);
			}	
		}	
	}
}

/**
 *  Carga el valor de los elemntos leidos en la wiki con dentro del semdrops.
 */
var path;

function loadUserTagLink(linkword, attributeword)
{
	var link = new Array(2);
	var attribute = new Array(2);
	link[0] = linkword;
	attribute[0] = attributeword;
	_awarenes.loadUserLinkData(link,attribute,0,0);
}

function loadCategoryTagUserData(cat)
{
	var triple = new Array(2);
	triple[1] = new Triples();
	triple[1].object = cat.split("Special:URIResolver/")[1];;
	_awarenes.loadCategoriesUserData(triple," ",0);
}

function delayOfCrossWikiData()
{
	var cross_cont = 0;
	crossCant=0;
	loadCrossWikiData(browser,cross_cont);
}

function loadCrossWikiData(browser,cross_cont)
{
	rdf = new RDF();
	// ESTA LINEA USA EL PRIMERO DE LOS "RELATIVE URL" PARA DESPUES HAY QUE CAMBIARLO POR LA VARIABLE CROSS_CONT
	var url = crosspage[cross_cont].object;
	var cont=-1;
	var url_firstpart='';
	var last_uri='';
	
	if (url != "about:blank")
	{
		for (var i=url.length; url[i] != "/" || i <= 0;i--)
		{
			cont++;	
		}
		for (var i=0;i<(url.length - cont);i++)
		{
			url_firstpart += url[i];
		}
		for (var j=0;j < (url.length - url_firstpart.length);j++)
		{
			if (url[j+url_firstpart.length] != " ")
			{	last_uri += url[j+url_firstpart.length];}	
		}
		var RDFurl = url_firstpart+'Special:ExportRDF/'+last_uri;
		id = 0;
		
		var xmlreq = xmlhttp = new XMLHttpRequest();
		xmlreq.onreadystatechange = function ()
		{
			if (xmlreq.readyState == 4)
			{
				rdf.getRDFURL(RDFurl,callback);
			}
		};
		xmlreq.open("GET",RDFurl,true);
		xmlreq.send(null);
	}	
}

/**
 * Carga los valores de los atributos y de los links en la vista del semdrop.
 */
function cargarAlTagAttributeAndLink(attritag,attrival,linktag,linkval)
{
	for(i=0;i < linkval.length;i++)
	{
		if (linkval[i] != '')
		{
			_awarenes.compareLinks(linktag,linkval,id,crossCant);
		}
	}
	for(i=0;i < attrival.length;i++)
	{
		if (attrival[i] != '')
		{
			_awarenes.compareAttributes(attritag,attrival,id,crossCant);
		}
	}
	if (cantidad != 0){cantidad = 0;delayOfCrossWikiData();}
}

/**
 * Esta funcion se dispara cuando se crea el RDFparser, una vez el objeto es creado dispara esta funcion con el 
 * objetivo de poder obtener todos los elementos del RDF de la wiki visualizada por en el momento.
 */
function callback()
{
	var subject = rdf.Match(null,null,null,null);
	var subject_array =rdf.Match(null,subject[3].subject,null,null);
	var atrib1;
	
	categoria(subject[3].subject,subject[3].predicate);
	
	var rdfattributeTags = new Array(subject_array.lenght);
	var rdfattributeValues = new Array(subject_array.lenght);
	var rdflinkTags = new Array(subject_array.lenght);
	var rdflinkValues = new Array(subject_array.lenght);
	
	for (i=0;i<subject_array.length;i++)
	{
		rdfattributeTags[i] = '';
		rdfattributeValues[i] = '';
		rdflinkTags[i] = '';
		rdflinkValues[i] = '';
		atrib1 = rdf.Match(null,subject_array[i].predicate,null,null);
		if (atrib1 != '') 
		{
			atrib2 = rdf.Match(null,atrib1[0].subject,'http://www.w3.org/2000/01/rdf-schema#label',null);
			if (atrib2 != '')
			{
				if (subject_array[i].object[5] != '/' && subject_array[i].object[6] != '/')
				{
					rdfattributeTags[i] = atrib2[0].object;
					rdfattributeValues[i] = subject_array[i].object;
				}
				else
				{
					var atrib3 = rdf.Match(null,subject_array[i].object,null,null);
					rdflinkTags[i] = atrib2[0].object;
					rdflinkValues[i] = atrib3[1].object;
				}
			}
		}
	}
	cargarAlTagAttributeAndLink(rdfattributeTags,rdfattributeValues,rdflinkTags,rdflinkValues);
	if(crossCant != crosspage.length)
	{
		crossCant++;
		loadCrossWikiData(browser,crossCant);
		}
}
/**
 * Idem callback pero a diferencia esta se ejecuta sobre la wiki personal del usuario.
 */

/**
 * esta funcion carga todos los elementos extraidos del RDF y se los envia al objeto AWARNESSMANAGER, el cual los 
 * compara entre si con los elementos de la wiki visualizada por el browser y se los envia a la vista para que el 
 * usuario pueda visualizarlos.
 */
function categoria(subject,predicate)
{
	var subject_array =rdf.Match(null,subject,predicate,null);
	var cat_array = new Array(subject_array.length);
	for (i=0;i<subject_array.length;i++)
	{
		var cat = rdf.Match(null,subject_array[i].object,null,null);
		var cat = rdf.Match(null,subject_array[i].object,null,null);
		if (cat != '' && cat[1].object[5] != '/' && cat[1].object[6] != '/')
		{
			_awarenes.compareCategories(cat,id,crossCant);
		}
	}
}


/**
 * como el request no es un estandar de la w3c se utiliza esta funcion para poder crear un objeto xmlhttprequest
 */

function createXMLHTTPobject() {

var xmlhttp;

if (window.XMLHttpRequest) 
{ // Mozilla, Safari,...
	xmlhttp = new XMLHttpRequest();
	if (xmlhttp.overrideMimeType) 
	{
		xmlhttp.overrideMimeType('text/xml');
	}
} 
else 
	if (window.ActiveXObject) 
	{ // IE
	try 
		{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) 
				{
				try {
						xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (e) {}
				}
	}
return xmlhttp;
}