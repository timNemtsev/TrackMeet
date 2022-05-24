({
    loadRatingElement: function(cmp, helper){

        // load raty rating plugin.
        var ratingElement = cmp.find("starRating").getElement();

        $( ratingElement ).raty({
            starOff  : $A.get('$Resource.raty_star_off'),
            starOn   : $A.get('$Resource.raty_star_on'),
            space : true,
            click: function(score, evt) {
        
            }
        });
        $(ratingElement).raty('set', { number: cmp.get('v.numberOfStars') });
        $(ratingElement).raty('set', { hints: [1,2,3,4,5] });

    },
})