function menuEtiqueta()
{
	this.menu = function ()
							{
								var MENU = document.getElementById('menuTagOne');
								var BOR = document.getElementById('borrar');
								var MOD = document.getElementById('modificar');
								var PUB = document.getElementById('publicar');
								var NAV = document.getElementById('navegar');
								
								var AGR = document.createElement('menuitem');
								AGR.setAttribute('id','agregar');
								AGR.setAttribute('label',document.getElementById("tag.button.add").label);
								AGR.setAttribute('oncommand','agregar()');
								
								MENU.removeChild(BOR);		
								MENU.removeChild(MOD);	
								MENU.removeChild(PUB);	
								MENU.removeChild(NAV);
								MENU.appendChild(AGR);
							}

}