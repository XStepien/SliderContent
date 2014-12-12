function SliderContent(sliderID, loopSpeed, fadeSpeed, autoSlide) {
    
    // Récupération des paramètres
    var $slider = $(sliderID);
    var $sliderContent = $('#content');
    var $sliderTabs = $('#tabs');
    
    // Fonction pour boucler sur les items
    var myTimeout;
    function looping($sliderTabs) {
        
        function loopFunction () {
                
            // On retrouve le prochain item a "clicker"
            var $nextItem = $sliderTabs.find('.activetab').parent().next('div').children('a');

            // Si il n'y a pas de prochain item on retourne au premier
            if (jQuery.type( $nextItem.data('content') ) === "undefined"){
                $nextItem = $sliderTabs.find('a').first();
            }

            // On declenche le click
            $nextItem.trigger('click');

        }
        // La boucle est lancé ici
        myTimeout = setInterval(loopFunction, loopSpeed);
        
    }
    
    // Ajoute le contenu du premier onglet
    var activeContentId = $slider.find('.activetab').data('content');
    var $activeContent = $('#featured'+activeContentId).html();
    $sliderContent.html($activeContent);
    
    // Ajoute l'écoute sur les onglets
    $slider.on('click','a', function(event){
        
        // Annulation du comportant par default
        event.preventDefault();
        
        // Récupération de l'id du contenu
        var $target = $(event.currentTarget);
        var id = '#featured'+$target.data('content');
        var $newContent = $(id).html();
        
        // On cache l'ancien contenu et on affiche le nouveau (voir avec slideUp/slideDown voir animate())
        $sliderContent.fadeOut(fadeSpeed, function(){
            $(this).html($newContent).fadeIn(fadeSpeed);
        });
        
        // A active/desactive la classe active
        $sliderTabs.find('.activetab').toggleClass('activetab');
        $target.toggleClass('activetab');
    
    })
    .on('mouseenter', function(event){
        // On arrete la boucle lorsque la souris entre dans le slider si autoSlide est true
        if (autoSlide){
            clearInterval(myTimeout);
        }
    })
    .on('mouseleave', function(event){
        // La boucle reprend une fois la souris sorti du slider si autoSlide est true
        if (autoSlide){
            looping($sliderTabs);
        }
    });
    
    // Lancement de la boucle si autoSlide est true
    if (autoSlide){
        looping($sliderTabs);
    }
      
};