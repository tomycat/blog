(function(){
  var $tabs = $(".tab");
  $tabs.on("click", function(e){
    e.preventDefault();
	var x = e.pageX;
	var y = e.pageY;
    var $el = $(this);
	var clickY = y - $el.offset().top;
	var clickX = x - $el.offset().left;
    var box = this;

    var setX = parseInt(clickX);
    var setY = parseInt(clickY);
    $(this).find("svg").remove();
    $(this).append('<svg><circle cx="'+setX+'" cy="'+setY+'" r="'+0+'"></circle></svg>');

    setTimeout(function(){
      var c = $(box).find("circle");
      c.animate(
        {
          "r" : $(box).outerWidth()
        },
        {
          easing: "easeOutQuad",
          duration: 400,
          step : function(val){
			c.attr("r", val);
		  },
          complete:function(){
            window.location.href = $el.attr('href');
          }
        }
      );
    });
  });
})()
