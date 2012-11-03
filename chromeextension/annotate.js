var isMainDude = false;
if ("WebSocket" in window)
{
  var channel = 1;
  //var socket = new WebSocket("ws://ec2-50-112-8-217.us-west-2.compute.amazonaws.com/channel/" + channel); 
  var socket = new WebSocket("ws://128.237.121.161:9000/channel/"+channel);
  socket.onopen = function(){  
    console.log('socket open\n');
  } 

  socket.onmessage = function(htmlfileEvt){  
    if(!isMainDude) {
        //change current page to it 
        eventType = htmlfileEvt.data.eventType;
        tag = htmlfileEvt.data.tag;
        /* TAGS CHANGE */
        if(eventType == "highlight") {
          $(tag).addClass('highlight');  
        }
        else if(eventType == "dot") {
          console.log('dotlol');
          //$(tag).addClass('dot');  
        }
        else if(eventType == "draw") {
          console.log('drawlol');
          //$(tag).addClass('draw');  
        }
    }
  }

  socket.onclose = function(){  
    alert("connection closed");
  }
}
else {
  alert("WebSocket NOT supported by your Browser!");
}


var lastID = null;
var startID = 0;
var currentTypeOfInteraction = "highlight"

var handleMouseover = function (e) {
    var targetElement = e.target;
    if (currentTypeOfInteraction = "highlight") {
        $(targetElement).addClass('highlight');
        //console.log('target: ', targetElement);
        var currentID = $(targetElement).attr("id");
        //console.log('id: ', currentID);
        if (!currentID)
        {
          $(targetElement).attr("id", "annotations_"+startID);
          startID++;
        }
        lastID = $(targetElement).attr("id");
        console.log('last ID: ', lastID);  

        
        //var pageSource = document.documentElement.outerHTML;
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */

        socket.send({"tag" : tag, "type" : "highlight"});  
    }
    else if (currentTypeOfInteraction = "dot") {
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */

        socket.send({"tag" : tag, "type" : "dot"});  
    }
    else if (currentTypeOfInteraction = "draw") {
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */

        socket.send({"tag" : tag, "type" : "dot"});  
    }
  }
var handleMouseout = function (e) {
  $(e.target).removeClass('highlight');
}
var handleMouseClick = function (e) {
    console.log("FORTHELUZ");
    //var pageSource = document.documentElement.outerHTML;
    //socket.send(pageSource);  
}
$(document).ready(function(){
  //$('body').append('<div id="container"></div>');
  $('body').append('<div id="annotate_tpl" class="annotate"><textarea class="postit"></textarea><a class="annotate-close"><strong style="color:#ff0000;">x</strong> delete</a></div>');

  /* Annotate init */
  /*$('#container').annotate({tpl:'#annotate_tpl', add:'#add', 'dblclick':true, 'confirmDelete': 'Really delete?'});
  $('#save').click(function(){
      var sdata = $('#container').annotate('serialize');
      $('#container').annotate('reset');
      alert('Deleted everything! Now, for the reload.');
      $('#container').annotate('load', sdata);
  });*/

  /* Add overlay elements, and annotation bar */
  $('body').append('<div id="annotate-overlay-layer"></div>');
  $('body').append('<div id="annotation-bar" class="fixed-bottom"><input type="checkbox" id="annotate-checkbox"></div>');

  /* Track elements on mouseover when checked, remove listeners when unchecked*/
  /* Also handle overlay layer */
  $('#annotate-checkbox').change(function(){
    console.log("checkbox change\n");
    if($('#annotate-checkbox').attr('checked')){
      $(document).off('mouseover');
      $(document).on('mouseover', handleMouseover); 
      $(document).on('mouseout', handleMouseout);
      $(document).on('click', handleMouseClick);
      
      isMainDude = true;

      $('#annotate-overlay-layer').addClass('overlay-layer');
    } 
    else{
      $(document).off('mouseover'); 
      $(document).off('click');

      isMainDude = false;
      $('#annotate-overlay-layer').removeClass('overlay-layer');
    }
  });
});
