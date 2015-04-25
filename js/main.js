var $mouseX = 0, $mouseY = 0;
var $xp = 0, $yp =0;

$("body").mousemove(function(e){
    $mouseX = e.pageX;
    $mouseY = e.pageY;    
});

var $loop = setInterval(function(){
// change 12 to alter damping higher is slower
$xp += (($mouseX - $xp)/12);
$yp += (($mouseY - $yp)/12);
$(".fing").css({left:$xp +'px', top:$yp +'px'});  
}, 0);

//var img = $('.fing');
//if(img.length > 0){
//    var offset = img.offset();
//    function mouse(evt){
//        var center_x = $(window).width() / 2;
//        var center_y = $(window).height() / 2;
//        var mouse_x = evt.pageX; var mouse_y = evt.pageY;
//        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
//        var degree = (radians * (180 / Math.PI) * -1) + 90; 
//        img.css('-moz-transform', 'rotate('+degree+'deg)');
//        img.css('-webkit-transform', 'rotate('+degree+'deg)');
//        img.css('-o-transform', 'rotate('+degree+'deg)');
//        img.css('-ms-transform', 'rotate('+degree+'deg)');
//    }
//    $(document).mousemove(mouse);
//}
var i = 0;

$("body").mousedown(function(e){  
   $('.clickandhold').attr("class", "shy clickandhold");
    
   flag = new Date().getTime();
   $('.fing').addClass("visible, fingclick");
   
   addCirc = setInterval(add,1000);
  function add(){
       $("#TargetArea").append("<div class='New'></div>");
       $("body").mousemove(function(e){
           $mouseX = e.pageX;
           $mouseY = e.pageY;    
       });
       $xp += (($mouseX - $xp)/12);
       $yp += (($mouseY - $yp)/12);
       $(".New").each(function(i, elm) {
       
       	$(this).append('<span class="index">' + (i + 1) + '</span>').css({left:$xp +'px', top:$yp +'px', background: Please.make_color({ golden: false, saturation: .7, value: .8}) , zIndex:  i  });  
       });
  }
  
   
    
}).mouseup(function(e){  
    
   flag2 = new Date().getTime();
   var passed = flag2 -flag;
   $('.fing').removeClass("visible, fingclick");
   $("#result").html(' Golly! You lasted<span>' +passed+ '</span> milliseconds')
   
   clearInterval(addCirc);   
   
   console.log(passed, i); //time passed in milliseconds
});