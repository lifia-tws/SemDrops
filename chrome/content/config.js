
// In this variable we can set the remote storage manager. default is wikistotage manager.

//var _remote_storage_manager = new Wikistoragemanager();
var _remote_storage_manager = new Sesamestoragemanager();

// In this variable we can set the browser interface. default is Browser class.

var _browser_interface = new Browser();

// in this variable we can set the personal annotation manager, this manager may 
// store personal data on the client. As user name or wiki url.

var _local_store_manager = new DiskStorageManager(); 


var _awarenes_manager = new AwarenessManager();

//var _value_menu = new menuValor();
var _value_menu = new menuValorSesame();

var _tags_menu = new menuEtiquetaSesame();
//var _tags_menu = new menuEtiqueta();