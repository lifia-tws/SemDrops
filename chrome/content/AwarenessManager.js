/**
 * The Awareness Manager is in charge of comparing the two tags hanging from a particular label
 * so that if the comparison evaluate in onlymy, idisagree, etc, the Awareness Manager can identify 
 * them and put the corresponding icon. It is in charge of comparing the current Wiki tags with the
 * personal annotations so that they can be distinguished from one another, determining which of the
 * tags are personal, which are published, which are deleted, and so on.
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
 * This function compares the categories received from the local Wiki with the ones received from the 
 * Wiki visualized  in that moment. Once the wikis are compared,   this function starts the upload 
 * within the semdrops view, determining the awarenes in case of repetition or in case the user disagrees
 * with any component.
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
 * It works in the same way as the comparecategory. The only difference is that the compare link does it on links.
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
 * The same as for compare links but working on attributes.
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
 * It uploads the users data to add them their images and it represents the last object to 
 * recieves vectors value sent to the view.
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
/**
 * The same as for loadlinkuserdata but working on categories link.
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
		var idisagree = cat[1].object.indexOf("ª");
		if (idisagree != 9)
		{
			var row = document.createElement('treerow');
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
