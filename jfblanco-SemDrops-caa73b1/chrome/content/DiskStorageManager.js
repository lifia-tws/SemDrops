/**
 * This class is in charge of running the storage of all data related to the web pages and the 
 * data delivered by the user.
 * This class will be considered obsolete when teh storage is in wikis.
 */

function DiskStorageManager()
{
	this._DBConn;
	
	this.initialize = function()
									{
										var file = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile);
										file.append("LifiaSDUDB.sqlite");  
      									var storageService = Components.classes["@mozilla.org/storage/service;1"].getService(Components.interfaces.mozIStorageService);  
   										_DBConn = storageService.openDatabase(file);
									}
									
	this.createTable = function()
									{
										if (!_DBConn.tableExists("userdata"))
										{
											_DBConn.executeSimpleSQL("CREATE TABLE userdata (username STRING[50] ,userwiki STRING[100])");
										}
									}
									
	this.loadInDB = function (name,wiki)
									{
										_DBConn.executeSimpleSQL("INSERT INTO userdata VALUES('"+name+"','"+wiki+"')");
									}
									
	this.readInDB = function ()
									{
										if (_DBConn.tableExists("userdata"))
										{
											var statement = _DBConn.createStatement("SELECT * FROM userdata");
											while (statement.executeStep()) 
											{  
										      document.getElementById('username').setAttribute('value',statement.row.username);
										      document.getElementById('wikiname').setAttribute('value',statement.row.userwiki);
										    }
										}    
									}
}
