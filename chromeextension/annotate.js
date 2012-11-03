var lastID = null;
var startID = 0;

var handleMouseover = function (e) {
    var targetElement = e.target;
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

    var pageSource = document.documentElement.outerHTML;
    
    var newPageSource = "";

    //var newDoc = document.open("text/html", "replace");
    //newDoc.write(newPageSource);
    //newDoc.close();
  }
var handleMouseout = function (e) {
  $(e.target).removeClass('highlight');
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
      $('#annotate-overlay-layer').addClass('overlay-layer');
    } 
    else{
      $(document).off('mouseover'); 
      $('#annotate-overlay-layer').removeClass('overlay-layer');
    }
  });
});
