
jQuery(document).ready(function () {

/*----------------------------------------------------*/
/*	Search box expand Section
/*----------------------------------------------------*/
	    
	jQuery(".search-text-box").focus(function(){
	   jQuery("ul.social").animate({ marginLeft: "-120px"}, 450, "easeInSine")
	});




/*----------------------------------------------------*/
/*	Keyframe animations enable
/*----------------------------------------------------*/

jQuery().waypoint && jQuery("body").imagesLoaded(function () {
        jQuery(".animate_afc, .animate_afl, .animate_afr, .animate_aft, .animate_afb, .animate_wfc, .animate_hfc, .animate_rfc, .animate_rfl, .animate_rfr").waypoint(function () {
            if (!jQuery(this).hasClass("animate_start")) {
                var e = jQuery(this);
                setTimeout(function () {
                    e.addClass("animate_start")
                }, 20)
            }
        }, {
            offset: "85%",
            triggerOnce: !0
        })
    });



/*----------------------------------------------------*/
/*	Flickr Feed
/*----------------------------------------------------*/

// $('ul#flickrfeed').jflickrfeed({
// 		limit: 6,
// 		qstrings: {
// 			id: '71865026@N00'
// 		},
// 		itemTemplate: '<li>'+
// 						'<a rel="prettyPhoto[pp_gal]" href="{{image}}">' +
// 							'<img src="{{image_s}}" alt="{{title}}" />' +
// 						'</a>' +
// 					  '</li>'
// 	}, function(data) {
// 		$('a[rel^="prettyPhoto"]').prettyPhoto();
// 	});



/*----------------------------------------------------*/
/*	Superfish Mainmenu Section
/*----------------------------------------------------*/

    jQuery(function () {
        jQuery('ul.sf-menu').stop().superfish();
    });



/*----------------------------------------------------*/
/*	Revolution Slider Nav Arrow Show Hide
/*----------------------------------------------------*/

    jQuery('.fullwidthbanner-container').hover(function () {
        jQuery('.tp-leftarrow').stop().animate({
            "opacity": 1
        }, 'easeIn');
        jQuery('.tp-rightarrow').stop().animate({
            "opacity": 1
        }, 'easeIn');
    }, function () {
        jQuery('.tp-leftarrow').stop().animate({
            "opacity": 0
        }, 'easeIn');
        jQuery('.tp-rightarrow').stop().animate({
            "opacity": 0
        }, 'easeIn');
    }

    );



    jQuery('.slider-wrapper').hover(function () {
        jQuery('.nivo-prevNav').stop().animate({
            "opacity": 1
        }, 'easeIn');
        jQuery('.nivo-nextNav').stop().animate({
            "opacity": 1
        }, 'easeIn');
    }, function () {
        jQuery('.nivo-prevNav').stop().animate({
            "opacity": 0
        }, 'easeIn');
        jQuery('.nivo-nextNav').stop().animate({
            "opacity": 0
        }, 'easeIn');
    }

    );




/*----------------------------------------------------*/
/*	Accordion Section
/*----------------------------------------------------*/

    jQuery('.accordionMod').each(function (index) {
        var thisBox = jQuery(this).children(),
            thisMainIndex = index + 1;
        jQuery(this).attr('id', 'accordion' + thisMainIndex);
        thisBox.each(function (i) {
            var thisIndex = i + 1,
                thisParentIndex = thisMainIndex,
                thisMain = jQuery(this).parent().attr('id'),
                thisTriggers = jQuery(this).find('.accordion-toggle'),
                thisBoxes = jQuery(this).find('.accordion-inner');
            jQuery(this).addClass('panel');
            thisBoxes.wrap('<div id=\"collapseBox' + thisParentIndex + '_' + thisIndex + '\" class=\"panel-collapse collapse\" />');
            thisTriggers.wrap('<div class=\"panel-heading\" />');
            thisTriggers.attr('data-toggle', 'collapse').attr('data-parent', '#' + thisMain).attr('data-target', '#collapseBox' + thisParentIndex + '_' + thisIndex);
        });
        jQuery('.accordion-toggle').prepend('<span class=\"icon\" />');
		jQuery("div.accordion-item:first-child .accordion-toggle").addClass("current");
		jQuery("div.accordion-item:first-child .icon").addClass("iconActive");
		jQuery("div.accordion-item:first-child .panel-collapse").addClass("in");
        jQuery('.accordionMod .accordion-toggle').click(function () {
            if (jQuery(this).parent().parent().find('.panel-collapse').is('.in')) {
                jQuery(this).removeClass('current');
                jQuery(this).find('.icon').removeClass('iconActive');
            } else {
                jQuery(this).addClass('current');
                jQuery(this).find('.icon').addClass('iconActive');
            }
            jQuery(this).parent().parent().siblings().find('.accordion-toggle').removeClass('current');
            jQuery(this).parent().parent().siblings().find('.accordion-toggle > .icon').removeClass('iconActive');
        });
    });




});



/*----------------------------------------------------*/
/*	Nivo Slider
/*----------------------------------------------------*/

jQuery(window).load(function() {
    jQuery('#nivoslider').nivoSlider({
        effect: 'random', // Specify sets like: 'fold,fade,sliceDown'
        slices: 15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed: 500, // Slide transition speed
        pauseTime: 5000, // How long each slide will show
        startSlide: 0, // Set starting Slide (0 index)
        directionNav: true, // Next & Prev navigation
        controlNav: false, // 1,2,3... navigation
        controlNavThumbs: false, // Use thumbnails for Control Nav
        pauseOnHover: true, // Stop animation while hovering
        manualAdvance: false, // Force manual transitions
        prevText: '', // Prev directionNav text
        nextText: '', // Next directionNav text
        randomStart: false, // Start on a random slide
        beforeChange: function(){}, // Triggers before a slide transition
        afterChange: function(){}, // Triggers after a slide transition
        slideshowEnd: function(){}, // Triggers after all slides have been shown
        lastSlide: function(){}, // Triggers when last slide is shown
        afterLoad: function(){} // Triggers when slider has loaded
    });
});



/*----------------------------------------------------*/
/*	Revolution Slider Triggering
/*----------------------------------------------------*/


   jQuery(document).ready(function() {
      if (jQuery.fn.cssOriginal!=undefined)
      jQuery.fn.css = jQuery.fn.cssOriginal;
      jQuery('.fullwidthbanner').revolution({
        delay: 9000,
        startwidth: 1170,
        startheight: 470,

        onHoverStop: "on",
        // Stop Banner Timet at Hover on Slide on/off
        thumbWidth: 100,
        // Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
        thumbHeight: 50,
        thumbAmount: 3,

        hideThumbs: 0,
        navigationType: "none",
        // bullet, thumb, none
        navigationArrows: "solo",
        // nexttobullets, solo (old name verticalcentered), none
        navigationStyle: "square",
        // round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom

        navigationHAlign: "center",
        // Vertical Align top,center,bottom
        navigationVAlign: "top",
        // Horizontal Align left,center,right
        navigationHOffset: 0,
        navigationVOffset: 20,

        soloArrowLeftHalign: "left",
        soloArrowLeftValign: "center",
        soloArrowLeftHOffset: 0,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: "right",
        soloArrowRightValign: "center",
        soloArrowRightHOffset: 0,
        soloArrowRightVOffset: 0,

        touchenabled: "on",
        // Enable Swipe Function : on/off


        stopAtSlide: -1,
        // Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
        stopAfterLoops: -1,
        // Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic
        hideCaptionAtLimit: 0,
        // It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
        hideAllCaptionAtLilmit: 0,
        // Hide all The Captions if Width of Browser is less then this value
        hideSliderAtLimit: 0,
        // Hide the whole slider, and stop also functions if Width of Browser is less than this value

        fullWidth: "on",

        shadow: 0 //0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)
    });




});





/*----------------------------------------------------*/
/*	Carousel Section
/*----------------------------------------------------*/

	jQuery('.portfolio-carousel').carousel({interval: false, wrap: false});


	jQuery('.client-carousel').carousel({interval: false, wrap: false});

	jQuery('.testimonials-carousel').carousel({interval: 5000, pause: "hover"});



/*----------------------------------------------------*/
/*	Hover Overlay
/*----------------------------------------------------*/

jQuery(document).ready(function () {




	jQuery('.portfolio-item').hover(function () {
			jQuery(this).find( '.portfolio-item-hover' ).animate({
				"opacity": 0.8
			}, 100, 'easeInOutCubic');


		}, function () {
			jQuery(this).find( '.portfolio-item-hover' ).animate({
				"opacity": 0
			}, 100, 'easeInOutCubic');

	});


	jQuery('.portfolio-item').hover(function () {
       jQuery(this).find(".fullscreen").stop().animate({'top' : '60%', 'opacity' : 1}, 250, 'easeOutBack');

    }, function () {
        jQuery(this).find(".fullscreen").stop().animate({'top' : '65%', 'opacity' : 0}, 150, 'easeOutBack');

    });


	jQuery('.blog-showcase ul li').each(function () {
		jQuery(this).on('hover', function () {
			jQuery(this).siblings('li').removeClass('blog-first-el').end().addClass('blog-first-el');
		});
	});


	jQuery('.blog-showcase-thumb').hover(function () {
        jQuery(this).find( '.post-item-hover' ).animate({
            "opacity": 0.8
        }, 100, 'easeInOutCubic');

    }, function () {
        jQuery(this).find( '.post-item-hover' ).animate({
            "opacity": 0
        }, 100, 'easeInOutCubic');

    });



	jQuery('.blog-showcase-thumb').hover(function () {
       jQuery(this).find(".fullscreen").stop().animate({'top' : '57%', 'opacity' : 1}, 250, 'easeOutBack');

    }, function () {
        jQuery(this).find(".fullscreen").stop().animate({'top' : '65%', 'opacity' : 0}, 150, 'easeOutBack');

    });



/* Post Image overlay */

	jQuery('.post-image').hover(function () {
        jQuery(this).find( '.img-hover' ).animate({
            "opacity": 0.8
        }, 100, 'easeInOutCubic');


    }, function () {
        jQuery(this).find( '.img-hover' ).animate({
            "opacity": 0
        }, 100, 'easeInOutCubic');

    });


	jQuery('.post-image').hover(function () {
       jQuery(this).find(".fullscreen").stop().animate({'top' : '55%', 'opacity' : 1}, 250, 'easeOutBack');

    }, function () {
        jQuery(this).find(".fullscreen").stop().animate({'top' : '65%', 'opacity' : 0}, 150, 'easeOutBack');

    });


/*Mobile device topnav opener*/

	jQuery( ".down-button" ).click(function() {
    jQuery( ".down-button .icon-current" ).toggleClass("icon-angle-up icon-angle-down");
});



/*----------------------------------------------------*/
/*	Clients section Parallax
/*----------------------------------------------------*/

	jQuery('.client').parallax("50%", 0.1);
	jQuery('.service-reasons').parallax("50%", 0.1);

	// jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({overlay_gallery: false});



/*----------------------------------------------------*/
/*	Tootltip Initialize
/*----------------------------------------------------*/



    jQuery("[data-toggle='tooltip']").tooltip();

});




/*----------------------------------------------------*/
/*	Sticky Menu
/*----------------------------------------------------*/

	jQuery(document).ready(function(){
		jQuery(".main-header").sticky({topSpacing:0});
	});



/*----------------------------------------------------*/
/*	Scroll To Top Section
/*----------------------------------------------------*/
	jQuery(document).ready(function () {

		jQuery(window).scroll(function () {
			if (jQuery(this).scrollTop() > 100) {
				jQuery('.scrollup').fadeIn();
			} else {
				jQuery('.scrollup').fadeOut();
			}
		});

		jQuery('.scrollup').click(function () {
			jQuery("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

	});



/*----------------------------------------------------*/
/*	Twitter Section
/*----------------------------------------------------*/

	// jQuery('#tweets').tweetMachine('', {
	// 	endpoint: 'statuses/user_timeline',
	// 	user_name: 'FIFOThemes',
	// 	include_retweets: true,
	// 	exclude_replies: false,
	// 	limit: 1,
	// 	autoRefresh: false
	// });





/*----------------------------------------------------*/
/*	Tabs Control Section
/*----------------------------------------------------*/


	jQuery("#horizontal-tabs").tytabs({
		tabinit: "1",
		fadespeed: "fast"
	});
	jQuery("#horizontal-tabs.two").tytabs({
		tabinit: "1",
		prefixtabs: "tab_two",
		prefixcontent: "content_two",
		fadespeed: "fast"
	});
	jQuery("#horizontal-tabs.three").tytabs({
		tabinit: "1",
		prefixtabs: "tab_three",
		prefixcontent: "content_three",
		fadespeed: "fast"
	});
	jQuery("#horizontal-tabs.four").tytabs({
		tabinit: "1",
		prefixtabs: "tab_four",
		prefixcontent: "content_four",
		fadespeed: "fast"
	});
	jQuery("#horizontal-tabs.five").tytabs({
		tabinit: "1",
		prefixtabs: "tab_five",
		prefixcontent: "content_five",
		fadespeed: "fast"
	});
	jQuery("#vertical-tabs").tytabs({
		tabinit: "1",
		prefixtabs: "tab_v",
		prefixcontent: "content_v",
		fadespeed: "fast"
	});
	jQuery("#vertical-tabs.two").tytabs({
		tabinit: "1",
		prefixtabs: "tab_v_two",
		prefixcontent: "content_v_two",
		fadespeed: "fast"
	});
	jQuery("#vertical-tabs.three").tytabs({
		tabinit: "1",
		prefixtabs: "tab_v_three",
		prefixcontent: "content_v_three",
		fadespeed: "fast"
	});
	jQuery("#vertical-tabs.four").tytabs({
		tabinit: "1",
		prefixtabs: "tab_v_four",
		prefixcontent: "content_v_four",
		fadespeed: "fast"
	});
	jQuery("#vertical-tabs.five").tytabs({
		tabinit: "1",
		prefixtabs: "tab_v_five",
		prefixcontent: "content_v_five",
		fadespeed: "fast"
	});
	jQuery(".hideit").click(function () {
		e(this).fadeOut(600)
	});
	jQuery("#toggle-view li h4").click(function () {
		var t = e(this).siblings("div.panel");
		if (t.is(":hidden")) {
			t.slideDown("200");
			e(this).siblings("span").html("-")
		} else {
			t.slideUp("200");
			e(this).siblings("span").html("+")
		}
	});
	
	jQuery(function (jQuery) {
		jQuery("#example").popover();
		jQuery("#example_left").popover({
			placement: 'left'
		});
		jQuery("#example_top").popover({
			placement: 'top'
		});
		jQuery("#example_bottom").popover({
			placement: 'bottom'
		});
	}); 



	/*----------------------------------------------------*/
	/*	Jquery Google map Section
	/*----------------------------------------------------*/
		
	//Google map
	jQuery('#maps').gMap({
		address: "Khulna Division, Bangladesh",
		zoom: 10,
		markers: [{
			latitude: 22.816694,
			longitude: 89.549904,
			html: "<h4>FIFO Themes</h4>Wordpress, HTML5/CSS Themes",
			popup: true
		}]
	});



	/*----------------------------------------------------*/
	/*	Contact Form Section
	/*----------------------------------------------------*/
$("#contact").submit(function (e) {
    e.preventDefault();
    var name = $("#name").val();
    var email = $("#email").val();
	var subject = $("#subject").val();
    var text = $("#text").val();
    var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&text=' + text;
	

    function isValidEmail(emailAddress) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(emailAddress);
    };

    if (isValidEmail(email) && (text.length > 100) && (name.length > 1)) {
        $.ajax({
            type: "POST",
            url: "ajax/process.php",
            data: dataString,
            success: function () {
                $('.success').fadeIn(1000).delay(3000).fadeOut(1000);
                $('#contact')[0].reset();
            }
        });
    } else {
        $('.error').fadeIn(1000).delay(5000).fadeOut(1000);

    }

    return false;
});
