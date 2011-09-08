/**
 * Este conjunto de funciones trabaja como mediador entre la clase que almacena
 * todos los datos de la ventana y el modelo de la ventana en si, todas las funciones
 * que dispara la ventana de configuracion del usuario vienen a parar a esta interface
 * que luego almacena los datos sobre el objeto en si.
 * 
 * Graficamente seria:
 * 
 * 				Ventana .XUL  <------> Interface.js <-------> clase ventana	
 * 
 * persigue la logica del Model View Controler			
 */
var winfather = window.opener.document.TEXT_NODE; // Obtengo los datos del Plugin el cual es el disparador que abrio esta ventana
		
function loadconfig()
{
	loadToDisk();
	if (winfather != null){confbuttonpresed();}
}

function confbuttonpresed()
{
	var inputname = document.getElementById("inputname");
	var inputwiki = document.getElementById("inputwiki");
	inputname.value = winfather.getName();
	inputwiki.value = winfather.getWiki();
}

function loadToDisk()
{
	var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
	file.append("LifiaSDUDB.sqlite");  
	var storageService = Components.classes["@mozilla.org/storage/service;1"].getService(Components.interfaces.mozIStorageService);  
	var _DBConn = storageService.openDatabase(file);
	if (!_DBConn.tableExists("userdata2"))
	{
		_DBConn.executeSimpleSQL("CREATE TABLE userdata2 (username STRING[50] ,userwiki STRING[100], userstma STRING[50]))");
	}
	if (_DBConn.tableExists("userdata2"))
	{
		var statement = _DBConn.createStatement("SELECT * FROM userdata2");
		while (statement.executeStep()) 
		{  
	      document.getElementById('inputname').setAttribute('value',statement.row.username);
	      document.getElementById('inputwiki').setAttribute('value',statement.row.userwiki);
	    }
	}
}

function save()
{
	var inputname = document.getElementById("inputname");
	var inputwiki = document.getElementById("inputwiki");
	var inputsma  = document.getElementById("pop_up_menu").selectedItem;
	saveInDisk(inputname.value,inputwiki.value,inputsma.label);
	window.close();
}

function saveInDisk(name, wiki, sman)
{
	var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
	file.append("LifiaSDUDB.sqlite");  
	var storageService = Components.classes["@mozilla.org/storage/service;1"].getService(Components.interfaces.mozIStorageService);  
	var _DBConn = storageService.openDatabase(file);
	if (_DBConn.tableExists("UserTableData"))
	{
		_DBConn.executeSimpleSQL("INSERT INTO UserTableData VALUES('"+name+"','"+wiki+"','"+sman+"')");
	}
	window.opener.location.reload();
}