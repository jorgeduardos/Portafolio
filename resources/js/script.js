var scrollCurrentPos = 0;
var scrolling = false;
var currentPos = 0;
var menuOpen = false;
var isFirefox = typeof InstallTrigger !== 'undefined';
var down = 'down';

////////////////////// functions

function scrollUp(){
    if(!scrolling && scrollCurrentPos > 0 ){
        scrolling=true;
        scrollCurrentPos --;
        var scrollToElement = $('.scrollTo')[scrollCurrentPos];
        // console.log("scrollToElement = " + scrollToElement);
        console.log("scrollCurrentPos = " +  scrollCurrentPos);
        $('html, body').animate({
            scrollTop: $(scrollToElement).offset().top
        }, 900, function(){
        	if(scrollCurrentPos == 0){
            	currentPos = 0;
            }else if(scrollCurrentPos == 1){
				currentPos = 1;
            }else if(scrollCurrentPos == 2){
				currentPos = 3;
            }
            scrolling = false;
        }); 
             
    }
}   

function scrollDown(){   
    if(!scrolling && scrollCurrentPos < $('.scrollTo').length-1  ){
        scrolling=true;
        scrollCurrentPos ++;
        var scrollToElement = $('.scrollTo')[scrollCurrentPos];
        // console.log("scrollToElement = " + scrollToElement);
        console.log("scrollCurrentPos = " +  scrollCurrentPos);
        $('html, body').animate({
            scrollTop: $(scrollToElement).offset().top
        }, 900,function(){
        	$("#menuIcon i").removeClass("ion-android-menu");
			$("#menuIcon i").addClass("ion-android-close");
			$("#navBar").show( "blind", 1000);
			menuOpen = true;
        	if(scrollCurrentPos == 0){
            	currentPos = 0;
            }else if(scrollCurrentPos == 1){
				currentPos = 1;
            }else if(scrollCurrentPos == 2){
				currentPos = 3;
            }
            scrolling = false;
        }); 
		
    }
}

$(document).ready(function(){


	for( var i = 0; i < $('.scrollTo').length; i++){
	    var elm = $('.scrollTo')[i];

	    if( $(document).scrollTop() >= $(elm).offset().top ){
	        scrollCurrentPos = i;
	    }
	}

	if(!isFirefox){
		$(document).bind('DOMMouseScroll', function(e){
		   	if(currentPos == 2){
				$("html").css("overflowY", "hidden");
			}
		    else if(e.originalEvent.wheelDelta < 0) {
		        scrollDown();
		    }else {
		        scrollUp();     
		    }
		    return false;
		});

		$(document).bind('mousewheel', function(e){
			if(currentPos == 2){
				$("html").css("overflowY", "hidden");
			}
		    else if(e.originalEvent.wheelDelta < 0) {
		        scrollDown();
		    }else {
		        scrollUp();     
		    }
		    return false;
		});
	}

	//Waypoints


	var waypoints = $('#sectionWork').waypoint({
		handler: function(direction){
			if(direction == down){
				$('.item1').addClass('animated slideInLeft');
				setTimeout(function(){
					$('.item2').addClass('animated slideInRight');
				}, 300);
				setTimeout(function(){
					$('.item3').addClass('animated slideInLeft');
				}, 400);
				setTimeout(function(){
					$('.item4').addClass('animated slideInRight');
				}, 500);

			}
		}, 
		offset: 800
	})


	// animations

	$(".whoArrowDownWrap p").click(function(){
		$('html, body').animate({scrollTop: $('.myWork').offset().top}, 1000);
		currentPos = 3;
		scrollCurrentPos = 2;
	});

	$(".whoArrowRightWrap span").click(function(){
		$('#aboutMe').addClass('animated fadeInRightBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeInRightBig');
       });
	});

	$('#aboutMe .icon-container').click(function(){
       $('#aboutMe').addClass('animated fadeOutRightBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('animated fadeOutRightBig');
       });
    });


	$("#whoNav").click(function(){
		if(currentPos == 0 || currentPos == 3){
			 $('html, body').animate({scrollTop: $('.who').offset().top}, 700);
			 currentPos = 1;
			 scrollCurrentPos = 1;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				currentPos = 1;
				scrollCurrentPos = 1;
			});
		}
	});

	$("#whoNav-mob").click(function(){
		console.log("inside mob who event listener");
		if(currentPos == 0 || currentPos == 3){
			 $('html, body').animate({scrollTop: $('.who').offset().top}, 700);
			 currentPos = 1;
			 scrollCurrentPos = 1;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				currentPos = 1;
				scrollCurrentPos = 1;
			});
		}
	});

	$("#whatNav").click(function(){
		if(currentPos == 0 || currentPos == 1){
			 $('html, body').animate({scrollTop: $('.myWork').offset().top}, 1000);
			 currentPos = 3;
			 scrollCurrentPos = 2;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				 $('html, body').animate({scrollTop: $('.myWork').offset().top}, 700);
				currentPos = 3;
				scrollCurrentPos = 2;
			});
		}
	});

	$("#whatNav-mob").click(function(){
		if(currentPos == 0 || currentPos == 1){
			 $('html, body').animate({scrollTop: $('.myWork').offset().top}, 1000);
			 currentPos = 3;
			 scrollCurrentPos = 2;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				 $('html, body').animate({scrollTop: $('.myWork').offset().top}, 700);
				currentPos = 3;
				scrollCurrentPos = 2;
			});
		}
	});

	$("#aboutNav").click(function(){
		$('#aboutMe').addClass('animated fadeInRightBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeInRightBig');
       });
	});

	$("#aboutNav-mob").click(function(){
		$('#aboutMe').addClass('animated fadeInRightBig').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeInRightBig');
       });
	});


	$("#logoNav").click(function(){
		if(currentPos == 1 || currentPos == 3){
			 $('html, body').animate({scrollTop: $(".main").offset().top}, 1000);
			 currentPos = 0;
			 scrollCurrentPos = 0;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				 $('html, body').animate({scrollTop: $(".main").offset().top}, 700);
				currentPos = 0;
				scrollCurrentPos = 0;
			});
		}
	});

	$("#logoNavbar").click(function(){
		if(currentPos == 1 || currentPos == 3){
			 $('html, body').animate({scrollTop: $(".main").offset().top}, 1000);
			 currentPos = 0;
			 scrollCurrentPos = 0;
		}
		else if(currentPos == 2){
			$(".who").animate({marginLeft: 0}, 700, function(){
				$("html").css("overflowY", "visible");
				 $('html, body').animate({scrollTop: $(".main").offset().top}, 700);
				currentPos = 0;
				scrollCurrentPos = 0;
			});
		}
	});


	$(".arrowWrapper i").click(function(){
		$('html, body').animate({scrollTop: $('.who').offset().top}, 700);
		 $('#whoNav').addClass("scale");
		 scrollCurrentPos = 1;
		 currentPos = 1;
	});

	$("#menuIcon").click(function(){
		if(!menuOpen){
			$("#menuIcon i").removeClass("ion-android-menu");
			$("#menuIcon i").addClass("ion-android-close");
			$("#navBar").show( "blind", 1000);
			menuOpen = true;
		}else{
			$("#menuIcon i").removeClass("ion-android-close");
			$("#menuIcon i").addClass("ion-android-menu");
			$("#navBar").hide( "blind", 1000);
			menuOpen = false;
		}
	});

	$(".menu_icon_mobile").on("click", function(){
		if($(this).hasClass("ion-navicon-round")){
			$(this).removeClass("ion-navicon-round");
			$(this).addClass("ion-close-round").show()
			$(".mobile-nav").show("blind");
		}else{
			$(this).addClass("ion-navicon-round");
			$(this).removeClass("ion-close-round");
			$(".mobile-nav").hide("blind");
		}
	});

	screen.orientation.onchange = function (){
	    // logs 'portrait' or 'landscape'
	    console.log(screen.orientation.type.match(/\w+/)[0]);
	     $(".js--travesia-item").css("left", $(".item2").width()/2 - $(".js--travesia-item").width()/2);
	};

})