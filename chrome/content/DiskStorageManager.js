/**
 * Esta clase se encarga de manejar todos los almacenamientos en disco de todos los 
 * datos referidos a las paginas webs y a los datos entregados por el usuario
 * cunado los usuarios se manejen con wikis la idea es eliminar esta clase.
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
										if (!_DBConn.tableExists("UserTableData"))
										{
											_DBConn.executeSimpleSQL("CREATE TABLE UserTableData (username STRING[50] ,userwiki STRING[100], userstma STRING[50])");
										}
									}
									
	this.loadInDB = function (name,wiki,sman)
									{
										_DBConn.executeSimpleSQL("INSERT INTO UserTableData VALUES('"+name+"','"+wiki+"','"+sman+"')");
									}
									
	this.readInDB = function ()
									{
										if (_DBConn.tableExists("UserTableData"))
										{
											var statement = _DBConn.createStatement("SELECT * FROM UserTableData");
											while (statement.executeStep()) 
											{  
										      document.getElementById('username').setAttribute('value',statement.row.username);
										      document.getElementById('wikiname').setAttribute('value',statement.row.userwiki);
										      if(statement.row.userstma == "Sesame")
										      {
										    	  core.setRemoteStorage(new Sesamestoragemanager());
										      }  
										      else
										      {
										    	  core.setRemoteStorage(new Wikistoragemanager());
										      }
											}
										}    
									}
}