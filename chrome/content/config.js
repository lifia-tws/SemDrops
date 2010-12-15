
// In this variable we can set the remote storage manager; by default this is the wikistorage manager.

var _remote_storage_manager = new Wikistoragemanager();

// In this variable we can set the browser interface. By default this is the Browser class.

var _browser_interface = new Browser();

// In this variable we can set the personal annotation manager. This manager may 
// store personal data of the client such as  user name or wiki url.

var _local_store_manager = new DiskStorageManager(); 

// Tag comparer.

var _awarenes_manager = new AwarenessManager();

// Pop up menu from the attribute Label.

var _tags_menu = new menuEtiqueta();

// Pop up menu from the attribute Value.

var _value_menu = new menuValor();
