/**
 * Interface entre el modelo de ventana en miniatura para links y atributos 
 * y el controlador de los mismos. 
 * @type 
 */


var mwin;

function onSecondaryLoad()
{
	var a = document.getElementById('inputfield');
	var b = document.getElementById('inputfield2');
	
	a.value = window.opener.document.TEXT_NODE.getValue1();
	b.value = window.opener.document.TEXT_NODE.getValue2();
}

function acept()
{
	var a = document.getElementById('inputfield');
	var b = document.getElementById('inputfield2');
	window.opener.document.TEXT_NODE.acept(a,b);
	window.close();
}

function cancel()
{
	window.close();					
}
		
function changeValues()
{
	var a = document.getElementById('inputfield');
	var b = document.getElementById('inputfield2');
	var val = a.value;
	a.value = b.value;
	b.value = val;
}