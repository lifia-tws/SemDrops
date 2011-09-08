/**
 * El Awareness Manager se encarga de comparar los dos tag's que se encuentran colgando
 * de una etiqueta en particular. la idea es si las comparaciones evaluan en onlymy, idisagree, etc
 * poder identificarlas y colocarles el icono correspondiente.
 */

function AwarenessManager()
{
	this.categoryblacklist;
	this.linkblacklist;
	this.imagesarray
	
	this.initialize = function()
								{
									categoryblacklist = '';
									linkblacklist = '';
									imagesarray = Array(10);
									for (var i =0;i<11;i++)
									{
										imagesarray[i] = "Externimages/amsn"+i+".png";
									}
								}
/**
 *  Esta funcion compara las categorias recibidas desde la wiki local con las recibidas desde la wiki visualizada en 
 *  el momento, una vez comparadas procede a la carga dentro de la vista del semdrops pudiendo asi determinar los 
 *  awarnes en caso de estar repetidos o en caso de que el usuario este en desacuerdo con algun elemento.
 */	
	this.compareCategories = function (cat,id,imageid)
	{
		var ok = 0;
		var cell1 = document.createElement('treecell');
		cell1.setAttribute('label',cat[1].object);
		if (id == 0) {cell1.setAttribute('src',imagesarray[imageid]);}
			else {cell1.setAttribute('src',"Awarnessimages/OnlyMine.png");}
		var catlabel = document.getElementById('1');
		var items_child = catlabel.childNodes;
		if (items_child.length != 0)
		{
			for (var i=0;i < items_child.length;i++)
			{
					var row_child = items_child[i].childNodes;
					var cell_child = row_child[0].childNodes;
					cell1.setAttribute('menu','1');
					if(cat[1].object.toLowerCase() == cell_child[0].getAttribute('label').toLowerCase())
					{
						cell_child[0].setAttribute('src',"Awarnessimages/WeAllAgree.png");
						ok = 1;
					}
					if (categoryblacklist.indexOf(cat[1].object.toLowerCase()) != -1)
					{
						cell1.setAttribute('src',"Awarnessimages/iDisagree.png");
					}
			}
		}
		if (ok == 0)
		{
			var row = document.createElement('treerow');
			row.appendChild(cell1);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			catlabel.appendChild(item);
			core.getlinks().incrementYval();
			core.getattributes().incrementYval();
		}
	}
/**
 * Realiza el mismo efecto que el comparecategory, la unica diferencia es que el compare link lo hace sobre links
 */	
	
	this.compareLinks = function (tag,val,id,imageid)
	{
		var ok = 0;
		var link = document.getElementById('2');
		var cell = document.createElement('treecell');
		var attribute = document.createElement('treecell');
		var items_child = link.childNodes;
		cell.setAttribute('label',tag[i]);
		if (id == 0) {cell.setAttribute('src',imagesarray[imageid]);}
			else {cell.setAttribute('src',"Awarnessimages/OnlyMine.png");}
		attribute.setAttribute('label',val[i]);
		if (items_child.length != 0)
		{
			for (var j=0;j < items_child.length;j++)
			{
				var row_child = items_child[j].childNodes;
				var cell_child = row_child[0].childNodes;
				var value = cell_child[0].getAttribute('label');
				var value2 = cell_child[1].getAttribute('label');
				cell.setAttribute('menu','1');
				if(tag[i].toLowerCase() == value.toLowerCase() && val[i].toLowerCase() == value2.toLowerCase())
				{
					cell_child[0].setAttribute('src',"Awarnessimages/WeAllAgree.png");
					ok = 1;
				}
				if (linkblacklist.indexOf(tag[i].toLowerCase()+val[i].toLowerCase()) != -1)
				{
					cell.setAttribute('src',"Awarnessimages/iDisagree.png");
				}
			}
		}
		if (ok == 0)
		{
			var row = document.createElement('treerow');
			row.appendChild(cell);
			row.appendChild(attribute);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			link.appendChild(item);
			core.getattributes().incrementYval();
		}	
	}
/**
 * idem compare links solo que lo hace sobre attributes.
 */
	
	this.compareAttributes = function (tag,val,id,imageid)
	{
		var ok = 0;
		var link = document.getElementById('3');
		var cell = document.createElement('treecell');
		var attribute = document.createElement('treecell');
		var items_child = link.childNodes;
		cell.setAttribute('label',tag[i]);
		if (id == 0) {cell.setAttribute('src',imagesarray[imageid]);}
			else {cell.setAttribute('src',"Awarnessimages/OnlyMine.png");}
		attribute.setAttribute('label',val[i]);
		if (items_child.length != 0)
		{
			for (var j=0;j < items_child.length;j++)
			{
				var row_child = items_child[j].childNodes;
				var cell_child = row_child[0].childNodes;
				var value = cell_child[0].getAttribute('label');
				var value2 = cell_child[1].getAttribute('label');
				cell.setAttribute('menu','1');
				if(tag[i].toLowerCase() == value.toLowerCase() && val[i].toLowerCase() == value2.toLowerCase())
				{
					cell_child[0].setAttribute('src',"Awarnessimages/WeAllAgree.png");
					ok = 1;
				}
				if (linkblacklist.indexOf(tag[i].toLowerCase()+val[i].toLowerCase()) != -1)
				{
					cell.setAttribute('src',"Awarnessimages/iDisagree.png");
				}
			}
		}
		if (ok == 0)
		{
			var row = document.createElement('treerow');
			row.appendChild(cell);
			row.appendChild(attribute);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			link.appendChild(item);
		}	
	}
/**
 *  Carga los datos del usuario con el fin de poder agregarles a todos sus imagenes, funciona como el ultimo objeto 
 *  que recibe un valor de vectores y se lo envia a la vista.
 */
	this.loadUserLinkData = function (tag,val,id,i)
	{
		var link = document.getElementById('2');
		var cell = document.createElement('treecell');
		var attribute = document.createElement('treecell');
		var items_child = link.childNodes;
		cell.setAttribute('wikidelobject',tag[i]);
		tag[i] = tag[i].replace(/¬/gi,"_");
		cell.setAttribute('label',tag[i]);
		cell.setAttribute('src',"Awarnessimages/OnlyMine.png");
		cell.setAttribute('menu','1');
		attribute.setAttribute('wikidelobject',val[i]);
		val[i] = val[i].replace(/¬/gi,"_");
		attribute.setAttribute('label',val[i]);
		var idisagree = val[i].indexOf("ª");
		if (idisagree != 9)
		{
			var row = document.createElement('treerow');
			row.appendChild(cell);
			row.appendChild(attribute);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			link.appendChild(item);
			core.getattributes().incrementYval();
		}
		else
		{
			linkblacklist += " " +tag[i].toLowerCase()+val[i].substring(++idisagree,val[i].length).toLowerCase();
		}
	}
	
	
	this.loadUserAttributeData = function (tag,val,id,i)
	{
		var link = document.getElementById('3');
		var cell = document.createElement('treecell');
		var attribute = document.createElement('treecell');
		var items_child = link.childNodes;
		cell.setAttribute('wikidelobject',tag[i]);
		tag[i] = tag[i].replace(/¬/gi,"_");
		cell.setAttribute('label',tag[i]);
		cell.setAttribute('src',"Awarnessimages/OnlyMine.png");
		cell.setAttribute('menu','1');
		attribute.setAttribute('wikidelobject',val[i]);
		val[i] = val[i].replace(/¬/gi,"_");
		attribute.setAttribute('label',val[i]);
		var idisagree = val[i].indexOf("ª");
		if (idisagree != 9)
		{
			var row = document.createElement('treerow');
			row.appendChild(cell);
			row.appendChild(attribute);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			link.appendChild(item);
			core.getattributes().incrementYval();
		}
		else
		{
			linkblacklist += " " +tag[i].toLowerCase()+val[i].substring(++idisagree,val[i].length).toLowerCase();
		}
	}
/**
 * Idem loadlinkuserdata solo que con el link de categorias.
 */	
	
	this.loadCategoriesUserData = function (cat,id)
	{
		var cell1 = document.createElement('treecell');
		cell1.setAttribute('wikidelobject',cat[1].object);
		cat[1].object = cat[1].object.replace(/¬/gi,"_");
		cell1.setAttribute('label',cat[1].object);		
		cell1.setAttribute('src',"Awarnessimages/OnlyMine.png");
		var catlabel = document.getElementById('1');
		cell1.setAttribute('menu','1');
		var idisagree = cat[1].object.split("-");
		if (idisagree[0] != "IDisagree")
		{
			var row = document.createElement('treerow');
			row.setAttribute('id',idisagree[2]);
			row.appendChild(cell1);
			var item = document.createElement('treeitem');
			item.appendChild(row);
			catlabel.appendChild(item);
			core.getlinks().incrementYval();
			core.getattributes().incrementYval();
		}
		else
		{
			categoryblacklist += " " + cat[1].object.substring(++idisagree,cat[1].object.length).toLowerCase();
		}
	}
}