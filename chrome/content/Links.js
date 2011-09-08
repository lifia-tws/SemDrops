function Links ()
{
	this.selff;
	this.father;
	this._position;
	this._label;
	this._secondValue;
	
	this.initialize = function()
								{
									this.selff = document.getElementById('2');
									this._label = document.getElementById('lin');
									this.father = new Label();
									this._position = 270;
								}
								
	
	this.add = function(core,val1,val2)
						  {
							mw.initialize(val1,val2,this,this.create);
							document.TEXT_NODE = mw;
							var att = core.getattributes();
							att.incrementYval();
						  }
	
	this.mod = function (core)
						  {
							var nuevoNodo = core.selected();
							var valorAborrar = nuevoNodo.getAttribute('label');
							var sel = core.selected();
							var padre = sel.parentNode;
							var bro = padre.childNodes[1];
							modw.initialize(valorAborrar,bro.getAttribute('label'),this,nuevoNodo);
						  	document.TEXT_NODE = modw;	
						  }
						  
	this.modifiAttribute = function(secondvalue)
						  {
						  	var sel = core.selected();
							var padre = sel.parentNode;
							var bro = padre.childNodes[1];
							bro.setAttribute("label",secondvalue);
						  }					  
								
	this.del = function (core,fin,item)
						  {
						  	this.father.borrar(core,fin,item,this);
						  }
						  
	this.deleteSecondAttribute = function()
										{
											var sel = core.selected();
											var padre = sel.parentNode;
											var bro = padre.childNodes[1];
											var delword = bro.getAttribute("wikidelobject");
											return delword;
										}					  
						  
	this.addSecondAttribute = function (row,value2,core)
										{
											var cell2 = document.createElement('treecell');
											cell2.setAttribute('label',value2);
											value2 += 'º';
											/* Esta funcion almacena en disco el valor
											 * del segundo elemento. 
											 * como ahora estamos trabajando con wiki-storage
											 * esta linea de codigo permanece comentada.
											 * 
											
												core.loadInDisk(value2,core.selected());
											
											*/
											row.appendChild(cell2);
										}	
										
	this.changeValue = function (value)
										{
											return (value += "2");
										}
										
	this.getself = function ()
 							{
 								return (this.selff);
 							}
 							
 	this.label = function ()
 							{
 								return (this._label);	
 							}						
 							
 	this.position = function ()
 							{
 								return (this._position);
 							}
 							
 	this.incrementYval = function ()
							{
								this._position += 18;
							}
							
	this.create = function (val1,val2)
							{
								this.father.createNode2(self,val1,core,this,val2);
							}
							
	this.loadNode = function (fin,value,tag,file,cont)
							{
								var resu = this.father.loadNode(fin,value,tag,file,this,cont);
								return resu;
							}
	this.loadAttributeNode = function (treerow, file,cont)
							{
								var word = '';
								cont++;
								while (file[cont] != 'º')
								{
									word += file[cont];
									cont++;
								}
								cont++;cont++;
								var cell2 = document.createElement('treecell');
								cell2.setAttribute('label',word);
								treerow.appendChild(cell2);
								return cont;
							}
	
	this.selFather = function (core)
							{
								alert(document.getElementById("mess.error.value").label);	
							}
	
}