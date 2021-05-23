
document.addEventListener('DOMContentLoaded', function() {
 
    document.getElementsByTagName('form')[0].onsubmit = function(evt) {
      evt.preventDefault(); // Impedir que se envíe el formulario 
      checkWord(); // Revisar la palabra/sentencia
      window.scrollTo(0,150);
    }
   
    // Entrada de texto para ingresar una palabra de inmediato
    document.getElementById('terminalTextInput').focus();
   
    // Obtener el texto de la entrada 
    var textInputValue = document.getElementById('terminalTextInput').value.trim();
   
    // Obteniendo el texto del div de resultados
    var textResultsValue = document.getElementById('terminalReslutsCont').innerHTML;
   
    // Limpiar el imput
    var clearInput = function(){
      document.getElementById('terminalTextInput').value = "";
    }

    // Desplasarse hasta el final de resultados
    var scrollToBottomOfResults = function(){
      var terminalResultsDiv = document.getElementById('terminalReslutsCont');
      terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
    }

    // Desplasarse hasta el final de resultados
    scrollToBottomOfResults();
   
    // Añadir texto a resultados
    var addTextToResults = function(textToAdd){
      document.getElementById('terminalReslutsCont').innerHTML += "<p>" + textToAdd + "</p>";
      scrollToBottomOfResults();
    }
   
    var descargaPalabra = function(){
      download("Prueba", "horario.docx", "text/plain");
    }
    // Obtener lista de palabras clave y ponerla en la pantalla
    var postHelpList = function(){
      // AArray con todas las palabras de ayuda
      var helpKeyWords = [
        "- descargar (Descarga automáticamente el programa .cpp)",
        "- acerca (Muestra la información y función del programa)",
        "- autores (Muestra los participantes del proyecto)",
        "- fundador (Muestra los creadores de la terminal)",
        "- codigo (Muestra el repositorio con el código fuente de la terminal)",
        "- -------------------------Comandos Extra---------------------------",
        "- Google (Abre google con tu busqueda)",
        "- Youtube (Abre Youtube con tu busqueda)",
        "- Abrir (Abre la palabra o link deseado (.com))",
      ].join('<br>');
      addTextToResults(helpKeyWords);
    }
   
    // Abrir links en nueva ventana
    var openLinkInNewWindow = function(linkToOpen){
      window.open(linkToOpen, '_blank');
      clearInput();
    }
   
    // Respuestas
    var textReplies = function() {
      switch(textInputValueLowerCase){
        // Respuestas
        case "ayuda":
          clearInput();
          postHelpList();
          break;

        case "descargar":
          clearInput();
          descargaPalabra();
          break;

        case "hola":
          clearInput();
          addTextToResults("Hola, yo soy tu asistente... Escribe <b>ayuda</b> para ver los comandos.");
          break; 

        case "acerca":
          clearInput();
          addTextToResults("Este programa fue realizado en c++ con el fin de facilitar el registro de información universitaria para poder organizar el registro de clases en un determinado periodo de tiempo");
          break; 

        case "autores":  
          clearInput();
          addTextToResults("Este proyecto y la página web fueron realizados por Juan Camilo Forero y David Fernando Perez ");
          break;
          
        case "fundador":  
          clearInput();
          addTextToResults("La terminal fue creada por Niko y PWN Team ");
          break;

        case "codigo":  
          clearInput();
          addTextToResults("Obten esta terminal en https://github.com/PwithNiko851/Rblx/blob/master/source%2Ccode.txt");
          break;

        case "youtube":
          clearInput();
          addTextToResults("Escribe youtube + lo que desees buscar.");
          break;
     
        case "google":
          clearInput();
          addTextToResults("Escribe google + lo que desees buscar.");
          break;
   
        default:
        clearInput();
        addTextToResults("<p><i>El comando " + "<b>" + textInputValue + "</b>" + " no se encontró. Escribe <b>ayuda</b> para ver los comandos.</i></p>");
        break;
      }
    }
   
// Funcion principal para comprobar el texto digitado y asignarle la funcion correcta
var checkWord = function() {
  textInputValue = document.getElementById('terminalTextInput').value.trim(); // obtener el texto de la entrada de texto a una variable 
  textInputValueLowerCase = textInputValue.toLowerCase(); // obtener la string y convertirla en minuscula

  if (textInputValue != ""){ // revisar si el texto fue digitado
    addTextToResults("<p class='userEnteredText'>> " + textInputValue + "</p>");
    if (textInputValueLowerCase.substr(0,6) == "abrir ") { // Si los 6 caracteres = open + abrir
      openLinkInNewWindow('http://' + textInputValueLowerCase.substr(6));
      addTextToResults("<i>El enlace " + "<b>" + textInputValue.substr(6) + "</b>" + " se ha abierto ahora.</i>");
    } else if (textInputValueLowerCase.substr(0,8) == "youtube ") {
      openLinkInNewWindow('https://www.youtube.com/results?search_query=' + textInputValueLowerCase.substr(8));
      addTextToResults("<i>He buscado en Youtube " + "<b>" + textInputValue.substr(8) + "</b>" + ", se ha abierto ahora.</i>");
    } else if (textInputValueLowerCase.substr(0,7) == "google ") {
      openLinkInNewWindow('https://www.google.com/search?q=' + textInputValueLowerCase.substr(7));
      addTextToResults("<i>He buscado en Google " + "<b>" + textInputValue.substr(7) + "</b>" + ", se ha abierto ahora.</i>");
    } else{
      textReplies();
    }
  }
};

});