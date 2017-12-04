'use strict';

app.controller('FAQCtrl', function($scope, $location, $anchorScroll, $sce, dataService) {
	// BooHoo:p
    $scope.goto = function(topic, index) {
      var newHash = topic + '_' + index;
      if ($location.hash() !== newHash) {
        // set the $location.hash to `newHash` and
        // $anchorScroll will automatically scroll to it
        $location.hash(newHash);
      } else {
        // call $anchorScroll() explicitly,
        // since $location.hash hasn't changed
        $anchorScroll();
      }
    };

    $scope.faq = {
        "General" : [
        {
            title: "Que es Monero?",
            answer: $sce.trustAsHtml("Monero es una criptomoneda que promete irrastreabilidad y privacidad. Esto se logra ofuscando y cifrando transacciones más allá del reconocimiento, mientras que le permite ver y administrar sus activos de forma discreta. También puedes probar tus transacciones a un tercero si es necesario.<br/>"),
            media:
            // {
            //     "title": "Simple",
            //     "url": $sce.trustAsResourceUrl("https://www.youtube.com/embed/TZi9xx6aiuY?ecver=1")
            // }
            {
                "title": "Video esencial de monero",
                "url": $sce.trustAsResourceUrl("https://www.youtube.com/embed/6DQb0cMvU7I?ecver=1")
            }
        },

        {
            title: "Que es minar y porque debería de estar interesado?",
            answer: $sce.trustAsHtml("Las criptomonedas alcanzan la descentralización a través de un proceso llamado minería. Cuando se crean nuevas operaciones, es necesario validarlas. Los mineros compiten entre sí para validar un grupo de transacciones (también conocido como bloque). El minero ganador cobra una recompensa por el trabajo realizado. Las recompensas del bloque encontrado son también la forma en que se generan las nuevas monedas y ayudan a regular la economía de la moneda.")
        },
        {
            title: "Como debería de empezar con la míneria?",
            answer: $sce.trustAsHtml("Puede comenzar a minar hoy mismo si tienes un ordenador que este inactivo. Monero se puede minar con CPUs, GPU's o incluso en una raspberry PI. Para comenzar con la minería necesitas encontrar el software de minería adecuado para tu hardware. <br/><br/>Lee <a href=' #/help/config_generator' >Configurador de inicio</a> para más detalles.")
        },
        {
            title: "Que es pool de mineria?",
            answer: $sce.trustAsHtml("Si estas minando a pequeña escala, se vuelve extremadamente difícil e impredecible obtener un beneficio estable de tus mineros. Un pool de minería te da la oportunidad de unirse a un grupo de mineros y compartir ganancias para un pago consistente.")
        },
        {
            title: "Que es PPLNS?",
            answer: $sce.trustAsHtml("El PPLNS es la abreviatura de pago por las últimas N acciones. Es un método para dividir las ganancias de los mineros de manera justa en función de las rondas. Por lo tanto, el PPLNS favorece a los miembros leales del pool.")
        },
        {
            title: "Es la minería rentable?",
            answer: $sce.trustAsHtml("La minería puede ser rentable dependiendo de las condiciones involucradas. El coste primario es la electricidad y el hardware. <br/> No es fácil calcular la cantidad exacta que ganarías, ya que depende de la tasa de hash total de la red, la dificultad y la suerte.")
        },
        ],
        "Ayuda para el Pool": [
        {
            title: "Como funcionan los pagos?",
            answer: $sce.trustAsHtml("A menudo te preguntarás por qué no te han pagado todavía. Esto es normal y es cómo el ciclo de pago está diseñado para funcionar. <br/><br/>Cada 2 horas se ejecuta un cheque de pago principal que paga todas las cuotas. Si todo va según lo planeado, se pagan todas las cuotas que superan los umbrales de pago establecidos. <br/><br/>En caso de que el monedero se bloquee o falle, el pool solicitará automáticamente más cheques a intervalos de 15 minutos hasta que todos los pagos se completen satisfactoriamente. Una vez que todo está pagado, el sistema vuelve al ciclo normal de 2 horas. <br/><br/><br/> Si tiene alguna pregunta no dude en ponerse en contacto.")
        },
        {
            title: "Umbrales de pago?",
            answer: $sce.trustAsHtml("El umbral de pago es la cantidad mínima que necesita ser ganada antes de que el pool te pague a tu monedero. Debido a que las transacciones en Monero tienen una tarifa minera significativa, es rentable establecer un umbral de pago más alto para tu pool. El valor mínimo para esto es 0.1 XMR. <br/><br/>Para cambiar tu umbral de pago, haz clic en la llave inglesa después de entrar a través del botón Login en la parte superior derecha. <br/><br/>Podrías también ajustar tu umbral de pago para regular tu programa de pagos, etc. diariamente/semanal, dependiendo de tu tasa de hash.")
        },
        {
            title: "Pagos a exchanges o brokers?",
            answer: $sce.trustAsHtml("Pagos directos a exchanges / brokers están soportados. La única diferencia principal cuando se usa este método es que el umbral de pago mínimo es más alto y generalmente un valor predeterminado de 5XMR.")
        },
        {
            title: "Baneo de IP?",
            answer: $sce.trustAsHtml("Tu IP queda bloqueada si envías partes no válidas al servidor de pool. Esto sucede generalmente si su tarjeta es overclocked o inestable. <br/><br/><br/> La prohibición es temporal y generalmente se elimina en unos minutos. También puedes ponerte en contacto con el administrador de tu pool y solicitar que te quiten del baneo.")
        },
        {
            title: "Como funciona la dificultad Fija / Variable",
            answer: $sce.trustAsHtml("Cuando seleccionas un puerto de pool, la dificultad inicial sólo representa tu configuración inicial. Tan pronto como tu minero empiece a enviar archivos compartidos, el servidor intentará ajustar tu dificultad para reflejar tu tasa de hash. <br/><br/>Esto te asegura que no crearás demasiadas o muy pocas peticiones a tu servidor optimizando el consumo de ancho de banda y las cargas del servidor. <br/><br/>Opcionalmente podrías establecer una dificultad fija a través de las opciones de la línea de comandos de tu minero, aunque si estableces una dificultad demasiado alta, podrías exceder el límite de 60 segundos de trabajo y perder las ganancias.")
        },
        ],
        "Minería":[
        {
            title: "Hardware?",
            answer: $sce.trustAsHtml("Monero es una criptodivisa resistente a asic, lo que significa que debe tener un costo prohibitivo para minar a monero con un FGPA/ASIC permitiendo que el hardware de escritorio mantenga su participación en el hashrate y las ganancias de la red.")
        },
        {
            title: "Software?",
            answer: $sce.trustAsHtml("Lea -- <a href='#/help/config_generator'>Configurador de inicio</a>.")
        }
        ],
        "Soporte":[
        {
            title: "Links interesantes.",
            answer: $sce.trustAsHtml("<a href='http://reddit.com/r/moneromining' target='_new'>http://reddit.com/r/moneromining/</a><br/><a href='http://monero.stackexchange.com/' target='_new'>http://monero.stackexchange.com/</a>")
        }
        ]
    }

// end
});
