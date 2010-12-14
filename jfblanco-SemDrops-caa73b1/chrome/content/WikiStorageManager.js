/**
 * In charge of storing all the user´s semantic data within the personal wiki. 
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
 * This function initializes the wiki storage manager object  and obtains the URL of the local 
 * wiki and of that visualized by the user.
 */	
	this.initialize = function (browser)
									{
										cantidad = 1;
										_browser = browser;
										_timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
										_uriwiki = document.getElementById("wikiname").value+"?title="+document.getElementById("username").value;
									}
/**
 * Writes the value presented within the wiki, deriving the value to be uploaded and the url to the 
 * browser object. It uses a template, just like “delete” and “modify” not to repeat the code.
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
									
	/* It is written with “ll” because “delete” is a word that is reserved by JS */
	this.dellete = function (value,attribute)
									{
										_value = value;
										_attribute = attribute;
										templateWikiFunction(functiondel);
									}
									
	this.modifi = function (value,attribute,newvalue,newattribute)
									{
										_value = value;
										_attribute = attribute;
										_newvalue = newvalue;
										_newattribute = newattribute;
										templateWikiFunction(functionmod);
									}
	/**
	 * t publishes the value of the element selected in the wiki visualized by the browser. For this,
	 * it obtains the values to be loaded and derives it to the browser.
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
						var url = document.getElementById("wikiname").getAttribute('value')+"/Special:ExportRDF/"+document.getElementById("username").getAttribute('value')+"-"+_browser.getActualUri()+"wikistorage";
						id = 1;
						var xmlreq = xmlhttp = new XMLHttpRequest();
						xmlreq.onreadystatechange = function ()
						{
							if (xmlreq.readyState == 4)
							{
								rdf.getRDFURL(url,callbackUserData);
							}
						};
						xmlreq.open("GET",url,true);
						xmlreq.send(null);
					}
}

/* 
 * Functions not in accord with the wikistoragemanager object. The object can see and use them 
 * but they are not available for other objects.
 */

/**
 * This function waits for 1-second-delay and then refreshes the Semdrops.
 */
function returnToPage()
{
	var event = { notify : function(timer) {window.location.reload();}}
	_timer.initWithCallback(event,1000,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
}
/**
 *  This function is used within the template and indicates the browser that it must add an element to the Wiki.
 */
function functionadd()
{
	_browser.addInUserSpace(_value,_attribute,_idlabel,auxuri,_auxdom);
}
/**
 * The same as for “functionadd” just that it delets instead of adding.
 */
function functiondel()
{
	_browser.delInUserSpace(_value,_attribute,auxuri,_auxdom);
}
/**
 * The same as for “functionadd” just that it modifies instead of adding.
 */
function functionmod()
{
	_browser.modInUserSpace(_value,_attribute,_newvalue,_newattribute,auxuri,_auxdom);
}

/**
 * Template method so that the code is not repeated unnecessarily. The “fun” variable is a function
 * that is executed according to its corresponding, when a value was added, deleted or modified.
 */

function templateWikiFunction(fun)
{
	document.onmousedown = null;
	document.onmousemove = null;
	auxuri = _browser.getActualUri();
	wikiuri = _uriwiki +"-"+ auxuri+"wikistorage" + "&action=edit";
	_auxdom = window.open(wikiuri,' ','width=1,height=1,top=1,left=1');
	var xmlreq = createXMLHTTPobject();
	xmlreq.onreadystatechange = function ()
	{
		if (xmlreq.readyState == 4)
		{
			fun();
			var event = { notify : function(timer) {returnToPage();}}
			_timer.initWithCallback(event,1000,Components.interfaces.nsITimer.TYPE_ONE_SHOT);
		}
	}
	xmlreq.open("GET",wikiuri);
	xmlreq.send(null);
}


function callbackUserData()
{
	var subject =rdf.Match(null,null,null,null);
	var subject_array = rdf.Match(null,subject[3].subject,null,null);
	
	crosspage = rdf.Match(null,subject[3].subject,"http://www.w3.org/2002/07/owl#sameAs",null);
		
	var atrib1;
	loadCategoryTagUserData(subject[3].subject,subject[3].predicate);
	
	var rdfTags = new Array(subject_array.lenght);
	var rdfValues = new Array(subject_array.lenght);
	
	var rdfTags = new Array(subject_array.lenght);
	var rdfValues = new Array(subject_array.lenght);
	
	for (i=0;i<subject_array.length;i++)
	{
		rdfTags[i] = '';
		rdfValues[i] = '';
		atrib1 = rdf.Match(null,subject_array[i].predicate,null,null);
		if (atrib1 != '') 
		{
			atrib2 = rdf.Match(null,atrib1[0].subject,'http://www.w3.org/2000/01/rdf-schema#label',null);
			if (atrib2 != '')
			{
				rdfTags[i] = atrib2[0].object;
				if (subject_array[i].object[5] != '/' && subject_array[i].object[6] != '/')
				{
					rdfValues[i] = subject_array[i].object;
				}
				else
				{
					var atrib3 = rdf.Match(null,subject_array[i].object,null,null);
					rdfValues[i] =atrib3[1].object;
				}
			}
		}
	}
	loadUserTagLink(rdfTags,rdfValues);
}

function loadCategoryTagUserData(subject,predicate)
{
	var subject_array = rdf.Match(null,subject,predicate,null);
	var cat_array = new Array(subject_array.length);
	for (i=0;i<subject_array.length;i++)
	{
		var cat = rdf.Match(null,subject_array[i].object,null,null);
		var cat = rdf.Match(null,subject_array[i].object,null,null);
		if (cat != '' && cat[1].object[5] != '/' && cat[1].object[6] != '/')
		{
			_awarenes.loadCategoriesUserData(cat,id);
		}
	}
}

var name = '';

/**
 * The loadWikiData is a function that reads the elements from the Wiki visualized by the browser,
 * uploading the data in the view of the semdrops. 
 */
function loadWikiData(browser)
{
	rdf = new RDF();
	crossCant = 10;
	var url = browser.getActualUri();
	var cont=-1;
	var url_firstpart='';
	
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
			name += url[j+url_firstpart.length];
		}
		var RDFurl = url_firstpart+'Special:ExportRDF/'+name;
		id = 0;
		
		var xmlreq = xmlhttp = new XMLHttpRequest();
		xmlreq.onreadystatechange = function ()
		{
			if (xmlreq.status != 200)
			{
				if (cantidad != 0){cantidad=0;delayOfCrossWikiData();}
			}	
			if (xmlreq.readyState == 4 && xmlreq.status == 200)
			{
				rdf.getRDFURL(RDFurl,callback);
			}
		};
		xmlreq.open("GET",RDFurl,true);
		xmlreq.send(null);
	}
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
	// This line uses the first of the “RELATIVE URLs, but it has to be changed for the cross_cont variable.
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
 * The readWikiUserData Works in the same way that the loadWikiData. The only difference is that instead 
 * of working from the Wiki visualized in that moment, it does it from the Wiki setted by the user.
 */

/**
 * It uploads the attribute and the links values in the semdrop view.
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
 *  It uploads the value of the elements read on the Wiki in the semdrops.
 */

function loadUserTagLink(tag,val)
{
	for(i=0;i < val.length;i++)
	{
		if (val[i] != '')
		{
			_awarenes.loadUserLinkData(tag,val,id,i);
		}
	}
	loadWikiData(browser);
}

/**
 * This function is triggered when the RDFparser is created. Once the object is created, this
 * function is triggered to obtain all the elements from the RDF of the Wiki visualized in that moment.
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
 * The same as for “callback” but in this case it is executed on the user´s personal Wiki.
 */

/**
 * This function uploads all the elements that have been extracted from the RDF and send them
 * to the AWARNESSMANAGER object where the elements are compared between each other and with the
 * elements of the Wiki visualized by the browser which are therefor sent to the view so that 
 * the user can visualize them.
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
 * Since the “request” is not a standard of the w3c, it is used to create an xmlhttprequest object.
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
