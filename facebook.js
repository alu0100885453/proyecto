
// Cargamos la API
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_ES/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  
// Configuramos la API
window.fbAsyncInit = function() {
  FB.init({
    appId      : '369716050096850', //Incluye aquí tu clave pública
	cookie	   : true,
    status     : true,
    xfbml      : true,
    version    : 'v2.9'
  });
}

//Redirecciones para después de iniciar sesión o salir de la aplicación
var url_after_login = "https://alu0100885453.github.io/proyecto/index.html";
var url_after_logout = "https://alu0100885453.github.io/proyecto/login.html";
  
/* Función para el botón de iniciar sesión con Facebook */
function FBBtnLogin(){
	FB.login(function(response) {
		/* Si el usuario ha iniciado sesión correctamente cargamos la página login.html nuevamente para 
		   para que el usuario sea redireccionado a la página index.html */
		if (response.authResponse) {
			window.location.reload();
			}	
		 }, 
		 {
		 /* Solicitamos poder acceder a estos permisos del perfil del usuario */
		 /* Más información en: 
			https://developers.facebook.com/docs/facebook-login/permissions/v2.2?locale=es_ES
		 */
		 scope: 'public_profile,email'
	}); 
}

/* Función para el botón de cierre de sesión en facebook, 
   lógicamente el usuario sale de nuestra aplicación */
function FBBtnLogout(){
    FB.logout(function(response) {
	/* Una vez cerrada la sesión cargamos nuevamente la página para redireccionar al usuario 
	a la página login.html */
	window.location.reload();
	}); 
}
 
 /*
 Función para la página login.html, esta función comprueba el estado del usuario, si el 
 usuario está conectado es redirigido a la página index.html, de lo contrario se le solicitará 
 que inicie sesión con su cuenta de Facebook
 */
 function FBLogin()
 {
   var status = document.getElementById("status");
	 console.log(status);
   FB.getLoginStatus(function(response) { 
   //Conectado
	   console.log('getloginstatus');
  if (response.status === 'connected') {
	  console.log('connected');
	window.location.href = url_after_login;
  } 
  //No autorizado para acceder a la aplicación
  else if (response.status === 'not_authorized'){
	  console.log('not_authorized');
	status.innerHTML = "Por favor, tienes que autenticarte con Facebook";
  } 
  //No tiene sesión abierta en Facebook
  else {
	  console.log('no session');
	status.innerHTML = "No has iniciado sesión en Facebook";
  }
 });
}

	/*Función para el resto de páginas a las cuales sólo los usuarios auténticados tendrán permisos 
	para entrar, si el usuario no está autenticado, es enviado a la página de login (login.html) */
function getStateFromUser(){

	//En este elemento html mostraremos el estado del usuario
	var status = document.getElementById("status");
	
		FB.getLoginStatus(function(response) {
		
			//Si el usuario está conectado correctamente a nuestra aplicación
			if (response.status === 'connected')
			{
					//Token para los formularios, para evitar ataques del tipo CSRF
			        var token = response.authResponse.accessToken;
					
					/*
					De esta forma podemos acceder a la información del usuario
					Más información en: 
					https://developers.facebook.com/docs/facebook-login/permissions/v2.2?locale=es_ES
					*/
					FB.api('/me', function(response) {
					
					// nombre del usuario
					name = response.name;
					// email del usuario
					email = response.email;
					// id del usuario
					id = response.id;
					
					// Incluimos un mensaje y la imagen del usuario
					status.innerHTML = name + " has iniciado sesión correctamente <img src='//graph.facebook.com/"+id+"/picture'>";
					});
			}
			// De lo contrario lo enviamos a login.html
			else if(response.status === 'not_authorized')
			{
			window.location.href = url_after_logout;
			}
			// De lo contrario lo enviamos a login.html
			else
			{
			window.location.href = url_after_logout;
			}
		});
}
