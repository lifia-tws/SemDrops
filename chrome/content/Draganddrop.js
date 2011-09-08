const DragandDropManager =
{	
	ondrop : function (event)
	{
		if (event.screenX > 50 && event.screenX < 470)
		{	
			var yval = event.screenY;
			
			var cat = core.getcategory();
			var lin = core.getlinks();
			var att = core.getattributes();
			if (yval >= cat.position() && yval <= lin.position())
			{ 
				core.setselected(cat.label());
				lin.incrementYval();
				att.incrementYval();
				cat.add(core,event.dataTransfer.getData("text/plain"),"Attribute");
			}
			if (yval >= lin.position() && yval <= att.position())
			{
				core.setselected(lin.label());
				att.incrementYval();
				lin.add(core,"Value",event.dataTransfer.getData("text/plain"));
			}
			if (yval >= att.position())
			{
				core.setselected(att.label());
				att.add(core,"Value",event.dataTransfer.getData("text/plain"));
			}
		}
	},	
};