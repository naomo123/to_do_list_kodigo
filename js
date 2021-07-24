
//{
//  hora: 1,
//  turno:AM,
//  id: 3 es alta , 2 es media , 1 es baja ,
//  prioridad:"Alta",
//  tarea: "Jugar",
//  comentario: "Jugar en el pateo"
//},

var toDo =
[

]

//////////////////////////////////



var IDbuscador=0;


// botones del nav-bar
let menu__Crear;
let menu__Lista;
let Crear_Content;
let Buscar_content;
let caracter;
// aca termina botones del nav-bar

//aca empiezan botones de "POR HACER"
let Content__add;
let checkBoxes;
let prioridad="Alto";
let Content__TxtTitulo ;
let Content__TxtHora;
let Content__TxtComent;
let Content__caracteres;
let red;
var regex;

// aca terminan botones de "POR HACER"

// aca van las variables y botones del Alert__box

let alert__box__Body;
let alert__box__message;
let alert__box__button;

// aca terminan las variables del Alert__box


// variables de el evento buscar

let lista;
let Generador__Etiqueta;
//
window.onload = function()
{

menu__Crear = document.getElementById("crear");
menu__Lista = document.getElementById("Lista");
Crear_Content = document.querySelector(".Content");
Buscar_content = document.querySelector(".buscar");
Content__add = document.getElementById("add");
checkBoxes = document.querySelectorAll(".center");
Content__TxtTitulo= document.getElementById("Content__titulo") ;
Content__TxtHora= document.getElementById("Content__Hora");
Content__TxtComent= document.getElementById("comments");
Content__caracteres= document.getElementById("caracteres");
red = document.querySelectorAll(".input");
alert__box__Body = document.querySelector(".Alert");
alert__box__message = document.getElementById("Message");
alert__box__button = document.getElementById("botonAlerta");
caracter = document.getElementById("caracter");
///////////////////////////////////////////////////////////
lista = document.getElementById("list");
Generador__Etiqueta = document.getElementById("etiqueta");


regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/;

var recibir="";
var convertir="";



setInterval(function(){

  recibir = Content__TxtComent.value;
  convertir = recibir.toString();
 caracter.innerText = ceros(convertir.length,"00",convertir.length,"00",99)+"/"+"35";


},10);








for(var i = 0; i < checkBoxes.length; i++)
{
  checkBoxes[i].addEventListener('click',function()
  {
      prioridad = this.value;
  });
}


menu__Crear.addEventListener('click',()=>
{
  Crear_Content.style.display = "block";
  Buscar_content.style.display="none";
  alert__box__Body.style.display = "none";
});

menu__Lista.addEventListener('click',()=>
{
  Crear_Content.style.display = "none";
  Buscar_content.style.display="block";
  alert__box__Body.style.display = "none";
});

alert__box__button.addEventListener('click',()=>
{
  Crear_Content.style.display = "block";
  Buscar_content.style.display="none";
  alert__box__Body.style.display = "none";
});

Content__add.addEventListener('click',()=>
{
  if (Content__titulo.value!="" && Content__Hora.value !="" && Content__TxtComent.value !=0)
  {
    if (Content__Hora.value.match(regex))
    {

      if (prioridad == "Alto")
      {
        IDbuscador = 3;
      }

      if (prioridad == "Medio")
      {
        IDbuscador = 2;
      }

      if (prioridad == "Bajo")
      {
        IDbuscador = 1;
      }

red[0].classList.remove("red");
red[1].classList.remove("red");
Content__TxtComent.style.border="5px solid #45a";
  toDo.push(
  {
   hora:Content__Hora.value.substring(0,5),
   turno:Content__Hora.value.substring(6,8),
   id: IDbuscador,
   prioridad:prioridad,
   tarea: Content__titulo.value,
   comentario:Content__TxtComent.value
  });

    showMessage("Ingreso exitoso!!");
}
else
{
  turnRed();
}

}else
{
  turnRed();
}

});
/////////////////////////

lista.addEventListener("click",function()
{
    buscar(lista.options[lista.selectedIndex].value);
});




}


function showMessage(message)
{
  Crear_Content.style.display = "none";
  Buscar_content.style.display="none";
  alert__box__Body.style.display = "block";

  alert__box__message.innerText = message;
}




function turnRed()
{

  for (var i = 0; i < red.length; i++)
  {
    if (red[0].value =="")
    {
      red[0].classList.add("red");

    }

    if (!red[1].value.match(regex))
    {
      red[1].classList.add("red");

    }

  }

if (Content__TxtComent.value==0)
{
  Content__TxtComent.style.borderBottom = "5px solid red";
}
}


// aca termina toda la parte del menu y el evento add task!!!

function ceros(numeroOrg,contador,tamaño1,tamaño2,rango)
{

  var str0 = numeroOrg.toString();
  var tamaño1=str0.length;
  var str1 = contador.toString();
  var tamaño2=str1.length;


var resultado="";
if (numeroOrg<rango)
{
resultado=contador.substring(0,Math.abs(tamaño2-tamaño1))+Math.abs(numeroOrg);
}
else if (numeroOrg>=rango)
{
resultado = rango;
}
return resultado;
}


// aca empiezan las funciones para buscar






function compare( a, b ) {
  if ( a.id > b.id )
  {
    return -1;
  }
  if ( a.id< b.id ){
    return 1;
  }
  return 0;
}


function compare2( a, b )
{
  if ( a.id < b.id ){
    return -1;
  }
  if ( a.id > b.id ){
    return 1;
  }
  return 0;
}

function compare3( a, b )
{
  if ( a.hora < b.hora )
  {
    return -1;
  }
  if ( a.hora> b.hora )
  {
    return 1;
  }
  return 0;
}


function compare4( a, b )
{
  if ( a.turno < b.turno )
  {
    return -1;
  }
  if ( a.turno > b.turno )
  {
    return 1;
  }
  return 0;
}







var html;


function buscar(expresion)
{

html="";
    Generador__Etiqueta.innerHTML=html;
    if (toDo.length >0)
    {
      if (expresion=="De altas a Bajas")
      {

        toDo.sort(compare3);
		toDo.sort( compare4 );
        toDo.sort(compare);

        dibujarEtiquetas();
      }
      if (expresion=="De Bajas a Altas")
      {

        toDo.sort( compare3 );
		toDo.sort( compare4 );
        toDo.sort( compare2 );

        dibujarEtiquetas();
      }

      if (expresion=="Solo Altas")
      {

        toDo.sort( compare3 );
        toDo.sort( compare4 );
        dibujarEtiquetas2(3);
      }

      if (expresion=="Solo Medias")
      {

        toDo.sort( compare3 );
        toDo.sort( compare4 );
        dibujarEtiquetas2(2);
      }

      if (expresion=="Solo Bajas")
      {
        toDo.sort( compare3 );
        toDo.sort( compare4 );
        dibujarEtiquetas2(1);
      }

    }
    else
    {
        showMessage("0 tareas disponibles");
    }

}


function dibujarEtiquetas()
{
  for (var i = 0; i < toDo.length; i++)
  {
  html+= "<div class=buscar__etiqueta> <div class=head id="+toDo[i].prioridad+"> <b class=hora>"+toDo[i].hora+ toDo[i].turno+"</b> <b class=prioridad>"+toDo[i].prioridad+"</b></div> <div class=body__etiqueta>  <div class=tarea> <h1 class=buscar__tarea>"+toDo[i].tarea+"</h1> </div> <p class=buscar__comentario>"+toDo[i].comentario+"</p> </div> </div>";
  }
  Generador__Etiqueta.innerHTML=html;
}

function dibujarEtiquetas2(rango)
{
  for (var i = 0; i < toDo.length; i++)
  {
    if (toDo[i].id == rango)
    {

    html+= "<div class=buscar__etiqueta> <div class=head id="+toDo[i].prioridad+"> <b class=hora>"+toDo[i].hora+ toDo[i].turno+"</b> <b class=prioridad>"+toDo[i].prioridad+"</b></div> <div class=body__etiqueta>  <div class=tarea> <h1 class=buscar__tarea>"+toDo[i].tarea+"</h1> </div> <p class=buscar__comentario>"+toDo[i].comentario+"</p> </div> </div>";
    }
  }
  Generador__Etiqueta.innerHTML=html;
}



function ceros(numeroOrg,contador,tamaño1,tamaño2,rango)
{

  var str0 = numeroOrg.toString();
  var tamaño1=str0.length;
  var str1 = contador.toString();
  var tamaño2=str1.length;


var resultado="";
if (numeroOrg<rango)
{
resultado=contador.substring(0,Math.abs(tamaño2-tamaño1))+Math.abs(numeroOrg);
}
else if (numeroOrg>=rango)
{
resultado = rango;
}
return resultado;
}
