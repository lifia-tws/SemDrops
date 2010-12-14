/**
 * Set of functions that mediate the data between the class storing all the elements of
 * the window and the window model. All the functions executed by the user configuration
 * window fall on this interface which will store the data of the object.
 * 
 * Graphic representation:
 * 
 * 				Window .XUL  <------> Interface.js <-------> Window class	
 * 
 * It follows the Model View Controler logic.	
 */
var winfather = window.opener.document.TEXT_NODE; // The data from the Plugin are obtained. This is the trigger which oponed the window.
		
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
	if (!_DBConn.tableExists("userdata"))
	{
		_DBConn.executeSimpleSQL("CREATE TABLE userdata (username STRING[50] ,userwiki STRING[100])");
	}
	if (_DBConn.tableExists("userdata"))
	{
		var statement = _DBConn.createStatement("SELECT * FROM userdata");
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
	inputwiki.value += "/index.php";
	saveInDisk(inputname.value,inputwiki.value);
	window.close();
}

function saveInDisk(name, wiki)
{
	var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
	file.append("LifiaSDUDB.sqlite");  
	var storageService = Components.classes["@mozilla.org/storage/service;1"].getService(Components.interfaces.mozIStorageService);  
	var _DBConn = storageService.openDatabase(file);
	if (!_DBConn.tableExists("userdata"))
	{
		_DBConn.executeSimpleSQL("CREATE TABLE userdata (username STRING[50] ,userwiki STRING[100])");
	}
	_DBConn.executeSimpleSQL("INSERT INTO userdata VALUES('"+name+"','"+wiki+"')");
}
