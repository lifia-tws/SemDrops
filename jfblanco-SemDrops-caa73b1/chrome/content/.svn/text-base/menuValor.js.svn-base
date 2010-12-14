function menuValor ()
{
	this.menu = function ()
							{
								var MENU = document.getElementById('menuTagOne');
								var AGR = document.getElementById('agregar');
								
								var MOD = document.createElement('menuitem');
								MOD.setAttribute('id','borrar');
								MOD.setAttribute('label',document.getElementById("tag.button.del").label);
								MOD.setAttribute('oncommand','borrar(event)');
									
								var BOR = document.createElement('menuitem');
								BOR.setAttribute('id','modificar');
								BOR.setAttribute('label',document.getElementById("tag.button.cha").label);
								BOR.setAttribute('oncommand','modificar(event)');
							
								var PUB = document.createElement('menuitem');
								PUB.setAttribute('id','publicar');
								PUB.setAttribute('label',document.getElementById("tag.button.pub").label);
								PUB.setAttribute('oncommand','publicar(event)');
								
								var NAV = document.createElement('menuitem');
								NAV.setAttribute('id','navegar');
								NAV.setAttribute('label',document.getElementById("tag.button.nav").label);
								NAV.setAttribute('oncommand','navegar(event)');
								
								MENU.removeChild(AGR);		
								MENU.appendChild(MOD);
								MENU.appendChild(BOR);
								MENU.appendChild(PUB);
								MENU.appendChild(NAV);
							}

}