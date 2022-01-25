/*!
* Start Bootstrap - Freelancer v7.0.5 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//Función para cargar las Regiones al campo "select".
function cargar_region() {
    //Inicializamos el array.
    var array = ["I Region", "II Region", "III Region", "IV Region", "V Region", "VI Region", "VII Region","VIII Region","IX Region","X Region","XI Region","XII Region","Region Metropolitana","XIV Region","XV Region","XVI Region"];
    //Pasamos a la funcion addOptions(el ID del select, las regiones cargadas en el array).
    addOptions("region", array);
}


//Función para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    //Recorremos el array.
    for (provincia in array) {
        var opcion = document.createElement("option");
        opcion.text = array[provincia];
        var aux=array[provincia].split(' ').join('');
        opcion.value = aux.toLowerCase();
        selector.add(opcion);
    }
}


//Función para cargar las Ciudades al campo "select" dependiendo de la Region elegida.
// fuente de los datos: https://es.wikipedia.org/wiki/Organización_territorial_de_Chile
function cargarPueblos() {  
    //Objeto de provincias con los pueblos correspondientes.
    var listaPueblos = {
        iregion: ["Alto Hospicio", "Iquique", "Camiña", "Colchane", "Huara", "Pica", "Pozo almonte"],
        iiregion: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama","Ollagüe", "San Pedro de Atacama", "María Elena", "Tocopilla"],
        iiiregion: [ "Chañaral", "Diego de Almagro", "Caldera", "Copiapó", "Tierra Amarilla", "Alto del Carmen", "Freirina", "Huasco", "Vallenar"],
        ivregion: ["Canela", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Coquimbo", "La Higuera", "La Serena", "Paihuano", "Vicuña", "Combarbala", "Monte Patria", "Ovalle", "Punitaqui","Rio hurtado"],
        vregion: ["Calle Larga", "Los Andes", "Rinconada de los Andes", "San Esteban", "Limache", "Olmue", "Quilpue", "Villa Alemana", "Cabildo", "La Ligua", "Papudo", "Petorca", "Zapallar", "Hijuelas", "La Calera", "La cruz", "Nogales", "Quillota", "Algarrobo", "Cartagena", "El Quico", "El Tabo", "San Antonio", "Santo Domingo", "Catemu", "Llaillay", "Panquehue", "Putaendo", "San Felipe", "Santa Maria", "Casa Blanca", "Concon", "Juan Fernandez", "Puchancavi", "Quintro", "Valparaiso", "Viña del mar"],
        viregion: ["Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machali", "Malloa", "Olivar","Peumo", "Pichidegua", "Quinta de Tilcoco", "Rancagua", "Requinoa", "Rengo", "Sn Frascisco de Mostazal", "TAgua Tagua", "La estrella", "Litueche", "Marchigue", "Navidad", "Paredones", "Pichilemu","Chepica", "Chimbarongo", "Lolol", "Nancagua", "Palmillo", "Peralillo", "Placilla", "Pumanque", "San Fernando", "Santa cruz"],
        viiregion: ["Curico", "Hualañe", "Licanten","Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Colbun", "Linars", "Longavi", "Parral", "Retiro",  "San Javier", "Villa alegre", "Yerbas Buenas", "Constitucion", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Rio Claro", "San Clemente", "San rafael", "Talca"],
        viiiregion: ["Arauco", "Cañete", "Contulmo", "Curanilahue", "Lebu", "Los Alamos", "Tirua", "Alto biobio", "Antuco", "Cabrero", "Laja","Los angeles", "Mulchen", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Barbara", "Tucapel", "Yumbel", "Chiguayante", "Concepcion", "Coronel", "Florida", "Hualpen", "Hualqui", "Lota", "Penco", "San pedro de la paz", "Santa Juana", "Talcahuano", "Tome" ],
        ixregion: ["Carahue", "Cholchol", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las casas", "Perquenco", "Pitrufquen", "Pucon", "Saavedra", "Temuco", "Teodoro Schmidt", "Tolten", "Vilcun", "Villarica", "Angol", "Collipulli", "Curacautin", "Ercilla", "Lonquimay", ],
        xregion: ["Calbuco", "Cochamo", "Fresia", "Frutillar", "LLanquihue", "Los murmos", "Maullin", "Purto Montt", "Puerto varas", "Osorno", "Puerto Octay"],
        xiregion: ["Aysen", "Cisnes", "Guaitecas", "Cochrane", "OHiggins", "Tortel", "Coyhaique", "Lago Verde", "Chile chico", "Rio Ibañez"],
        xiiregion: ["Laguna Blanca", "Punta arenas", "Rio Verde", "San Gregorio", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del paine"],
        regionmetropolitana: ["Colina", "Puente Alto", "San Bernardo", "Melipilla", "Santiago", "Talagante", "OTROS"],
        xivregion: ["Futrono", "La union", "Lago Ranco", "Rio bueno", "Corral", "Lanco", "Los Lagos", "Mafil", "Mariquina", "Paillaco", "Panguipulli", "Valdivia"],
        xvregion: ["Arica", "Camarons", "General Lagos", "Putre"],
        xviregion: ["Bulnes", "Chillan", "Chillan Viejo", "El Carmen", "Pemuco", "Pinto", "Quillon", "San Ignacio", "Yungay", "Cobquecura", "Coelemu", "Ninhue", "Portezuelo", "Quirihue", "Ranquil", "Treguaco", "Coihuco", "Ñiquen", "San Carlos", "San Fabian", "San Nicolas"],

    }

    //Declaramos un array donde guardamos todos los elementos de tipo id=region e id=pueblos.
    var provincias = document.getElementById('region');
    var pueblos = document.getElementById('pueblo');
    //Tomamos como provinciaSeleccionada, el valor del id provincia (var provincias).
    var provinciaSeleccionada = region.value;

    //Se limpian los pueblos.
    pueblos.innerHTML = '<option value="">Seleccione una Ciudad...</option>'

    //Si existe provinciaSeleccionada...
    if(provinciaSeleccionada !== ""){
        //Se seleccionan los pueblos y se ordenan.
        provinciaSeleccionada = listaPueblos[provinciaSeleccionada];
        provinciaSeleccionada.sort();

        //Insertamos los pueblos mediante un FOR.
        provinciaSeleccionada.forEach(function(pueblo){
            var opcion = document.createElement('option');
            opcion.value = pueblo;
            opcion.text = pueblo;
            pueblos.add(opcion);
        });
    }
}



var Fn = {
	// Valida el rut con su cadena completa "XXXXXXXX-X"
	validaRut : function (rutCompleto) {
		rutCompleto = rutCompleto.replace("‐","-");
		if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
			return false;
		var tmp 	= rutCompleto.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
		if ( digv == 'K' ) digv = 'k' ;
		
		return (Fn.dv(rut) == digv );
	},
	dv : function(T){
		var M=0,S=1;
		for(;T;T=Math.floor(T/10))
			S=(S+T%10*(9-M++%6))%11;
		return S?S-1:'k';
	}
}


            
$().ready(function() {
    $.validator.addMethod("formAlpha", function (value, element) {
      var pattern = /^[a-z]/;
      return this.optional(element) || pattern.test(value);
    }, "El campo debe tener un valor alfanumérico (azAZ09)");
  
    $.validator.addMethod("formEmail", function (value, element) {
       var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
       return this.optional(element) || pattern.test(value);
    }, "Formato del email incorrecto");

    $.validator.addMethod("forRut", function (value, element) {
        var pattern = /^[a-z]/;
        return this.optional(element) || (Fn.validaRut(element));
      }, "Rut no Valido");
  
    $("#mi-formulario").validate({
      rules: {
        nombre: { required: true, minlength: 2, formAlpha: true},
        email: { required:true, formEmail: true},
        telefono: { requiered: true},
        rut: { required:true, minlength: 10, formRut: true},
      },
      messages: {
        name    : "El campo es obligatorio.",
        email   : "Ingrese un correo valido",
        rut     : "Rut Invalido",
        telefono: "Ingrse un Telefono Valido",
      }
    });
  });