function Category ()
{
	this.selff;
	this.father;
	this._position;
	this._label;
	
	this.initialize = function()
								{
									this.selff = document.getElementById('1');
									this._label = document.getElementById('cat');
									this.father = new Label();
									this._position = 250;
								}
	
	this.add = function(core,val1,val2)
						  {
							var nuevoValor = prompt(document.getElementById("cat.add.value").label,val1);
							if (nuevoValor != null)
							{			
								this.father.createNode(self,nuevoValor,core,this);
								var lin = core.getlinks();
								lin.incrementYval();
								var att = core.getattributes();
								att.incrementYval();
							}
						  }
	
	this.mod = function (core)
						  {
								var nuevoNodo = core.selected();
								var valorAborrar = nuevoNodo.getAttribute('label');
								var nuevoValor = prompt(document.getElementById("cat.mod.value").label,nuevoNodo.getAttribute('label'));
								if(nuevoValor != null)
								{
									this.father.modificar(core,this,nuevoValor,' ',nuevoNodo,valorAborrar,' ');
								}
						  }
						  
	this.modifiAttribute = function(secondvalue)
						  {
						  	/**/
						  }					  
								
	this.del = function (core,fin,item)
						  {
						  	this.father.borrar(core,fin,item,this);
						  }
						  
	this.addSecondAttribute = function (row,core)
										{
											/**/
										}	
										
	this.changeValue = function (value)
										{
											return (value += "1");
										}
										
	this.modifiSecondValue = function (core)
										{
											/**/
										}
										
	this.deleteSecondAttribute = function()
										{
											return ' ';
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
							
	this.loadNode = function (fin,value,tag,file,cont)
							{
								var resu = this.father.loadNode(fin,value,tag,file,this,cont);
								return resu;
							}						
	
	this.loadAttributeNode = function (treerow, file,cont)
							{
								return cont;
							}
	
	this.selFather = function (core)
							{
								fatherwin.initialize();
								document.TEXT_NODE = fatherwin;
							}
}