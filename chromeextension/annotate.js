var isMainDude = false;
var oldRecvdTag = null;
var oldEventType = null;
var lastLink = null;

if ("WebSocket" in window)
{
  var href = document.location.href;
  var channel = href.split('&')[0];
  //var socket = new WebSocket("ws://ec2-50-112-8-217.us-west-2.compute.amazonaws.com/channel/" + channel); 
  var socket = new WebSocket("ws://128.237.121.161:9000/channel/"+channel);
  socket.onopen = function(){  
    console.log('socket open\n');
  } 

  socket.onmessage = function(htmlfileEvt){  
    if(!isMainDude) {
        //change current page to it 
        var response = JSON.parse(htmlfileEvt.data);
        eventType = response.type;
        tag = response.tag;
        console.log("in here. eventType: ",eventType,", tag: ,",tag);
        /* TAGS CHANGE */
        if (oldRecvdTag && oldEventType && oldEventType != "click") // && oldEventType != "dot" && oldEventType != "draw")
        {
          $(oldRecvdTag).removeClass(oldEventType); //'highlight');
        }
        if(eventType == "highlight") {
          $(tag).addClass('highlight');  
          console.log('highlight. tag: ',tag,'\n');
        }
        else if (eventType == "click") {
          var tag2 = tag.split('.highlight');
          tag2 = tag2.join('');
          console.log("click. tag: ",tag,'\n');
           $(tag).click();
           $(tag2).click();
        }
        else if (eventType == "redirect") {
            document.location.href = tag;
            //chrome.tabs.getCurrent(function (tab) {
                // var tabUrl = encodeURIComponent(tab.url);
                // var tabTitle = encodeURIComponent(tab.title);
            //    chrome.tabs.update(tab.id, {url: tag});
          
        }
        else if(eventType == "dot") {
          console.log('dotlol');
          //$(tag).addClass('dot');  
        }
        else if(eventType == "draw") {
          console.log('drawlol');
          //$(tag).addClass('draw');  
        }
        oldRecvdTag  = tag;
        oldEventType = eventType; 
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
var currentTypeOfInteraction = "highlight";


var handleMouseover = function (e) {
    var targetElement = e.target;
    if ($(targetElement).attr('href'))
    {
      lastLink = $(targetElement).attr('href');
    }
    if (currentTypeOfInteraction = "highlight") {
        //console.log('target: ', targetElement);
        var currentID = $(targetElement).attr("id");
        //console.log('id: ', currentID);
        if (!currentID)
        {
          //$(targetElement).attr("id", "annotations_"+startID);
          startID++;
        }
        lastID = $(targetElement).attr("id");
        console.log('last ID: ', lastID);  

        
        //var pageSource = document.documentElement.outerHTML;
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */
        socket.send(JSON.stringify({tag: tag, type: "highlight"}));
        $(targetElement).addClass('highlight');
    }
    else if (currentTypeOfInteraction = "dot") {
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */

        socket.send(JSON.stringify({tag: tag, type: "dot"}));
    }
    else if (currentTypeOfInteraction = "draw") {
        var tag = $(targetElement).getPath(); /* GET PATH SHIT */

        socket.send(JSON.stringify({tag: tag, type: "draw"}));
    }
  }
var handleMouseout = function (e) {
  if (lastLink)
  {
    lastLink = null;
  }

  if (currentTypeOfInteraction = "highlight") {
    $(e.target).removeClass('highlight');
  }
  else if (currentTypeOfInteraction = "dot") {
    console.log("dotlol2");
  }
  else if (currentTypeOfInteraction = "draw") {
    console.log("drawlol2");
  }
}
var handleMouseClick = function (e) {
    //var pageSource = document.documentElement.outerHTML;
    //socket.send(pageSource); 
    if (lastLink)
    {
      socket.send(JSON.stringify({tag: lastlink, type: "redirect"}));
      lastLink = null;
    }
    else
    {
      var tag = $(e.target).getPath(); /* GET PATH SHIT */
      socket.send(JSON.stringify({tag: tag, type: "click"}));
    }

}

var handleLinkClick = function (e) {
  console.log("link click");
  var tag = $(e.target).href;
  console.log("link: ",tag);
  socket.send(JSON.stringify({tag: tag, type: "redirect"}));
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
      $('a').on('click', handleLinkClick);    
      isMainDude = true;

      $('#annotate-overlay-layer').addClass('overlay-layer');
    } 
    else{
      $(document).off('mouseover'); 
      $(document).off('click');
      $('a').off('click', handleLinkClick);    

      isMainDude = false;
      $('#annotate-overlay-layer').removeClass('overlay-layer');
    }
  });
});
