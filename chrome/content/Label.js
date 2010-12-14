function Label()
{
	this.createNode = function(tag,value,core,son)
								{
									core.increment();
									var cell = document.createElement('treecell');
									cell.setAttribute('label',value);
									cell.setAttribute('menu','1');
									
									var row = document.createElement('treerow');
									row.appendChild(cell);
									
									var sel = core.selected();
									var fin = document.getElementById(sel.getAttribute('idCont'));
									
									/*
									 * This function stores in disk the first element.
									 * Currently, wiki-storage is being used for this work and
									 * for that reason this line remains commented.
									 */
									//core.loadInDisk(value,sel);
									core.loadInWiki(value," ",sel);
									son.addSecondAttribute(row,core);
									
									var item = document.createElement('treeitem');
									item.appendChild(row);
									fin.appendChild(item);
								}
								
								
	this.createNode2 = function(tag,value,core,son,value2)
								{
									var cell = document.createElement('treecell');
									cell.setAttribute('label',value);
									cell.setAttribute('menu','1');
									
									
									var row = document.createElement('treerow');
									row.appendChild(cell);
									
									var sel = core.selected();
									var fin = document.getElementById(sel.getAttribute('idCont'));
									
									//core.loadInDisk(value,sel);
									core.loadInWiki(value,value2,sel);
									son.addSecondAttribute(row,value2,core);
									
									var item = document.createElement('treeitem');
									item.appendChild(row);
									fin.appendChild(item);
									
									core.increment();
								}
								
	this.borrar = function (core,fin,item,son)	
								{	
									var sel = core.selected();
									fin.removeChild(item);
									var attribute = son.deleteSecondAttribute();
									core.deleteFile(sel.getAttribute('wikidelobject'),attribute);
									CANT--;
								}
								
	this.modificar = function (core,son,nuevoValor,secondValue,nuevoNodo,valorAborrar,attributoAborrar)
								{
									 	nuevoNodo.setAttribute('label',nuevoValor);
										core.modifiFile(valorAborrar,nuevoValor,secondValue,attributoAborrar);
								}
	
	this.loadNode = function (fin,value,tag,file,son,cont)
							{
								var cell = document.createElement('treecell');
								cell.setAttribute('label',value);
								cell.setAttribute('menu','1');
								var row = document.createElement('treerow');
								row.appendChild(cell);
								var resu = son.loadAttributeNode(row,file,cont);
								var item = document.createElement('treeitem');
								item.appendChild(row);
								fin.appendChild(item);
								CANTVAL++;
								return resu;
							}							
}
