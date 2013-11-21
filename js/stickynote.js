$(controller);

var draggableOptions={
	containment:'body',
	cursor:'crosshair',
	stack:'.note-pile',
	revert:'invalid',
	revertDuration:500,
	zIndex:100,
	helper:'clone'
}
var droppableOptions={
	tolerance:'touch',
	hoverClass:'drop-over',
	drop:function(event,ui){
	var $newNote=ui.helper.clone(false);
	$newNote.css({
		position:'absolute',
			top:0,
			left:0
	});
		$newNote.removeClass('ui-draggable-dragging');
		$(this).addClass("add-border");
		$(this).append($newNote);
		$(this).droppable("option","disabled",true);
		createNoteDrop();
		addDeleteBtn();
		event.preventDefault();
	},
}
function controller(){
	createNoteDrop();

	$('.note-pile').draggable(draggableOptions).dblclick(function(){
		console.log('edit');
		$(this).draggable({disabled:true});
		$(this).attr("contenteditable",true);
	}).focusout(function(){
		console.log('done');
		$(this).draggable({disabled:false});
		$(this).attr("contenteditable",false);
	});

	$('.note-drop').droppable(droppableOptions);

	enterToNote();
	leaveFromNote();
	deleteNote();
}

//creating a new note droppable area depending on number of
//already created notes
function createNoteDrop(){
	var noteCount=$(".right-side .note-drop").length;
	console.log(noteCount);

	var $noteDrop=$("<div></div>");
		$noteDrop.addClass("note-drop");
		$noteDrop.droppable(droppableOptions);
		$('.right-side').append($noteDrop);
}
function addDeleteBtn(){
	var $note=$('.note-drop div');
	var $delBtn=$('<span>').text('x').addClass('close');
	$delBtn.appendTo($note);
}

function enterToNote(){
	$(document).on("mouseenter",".note-drop div",function(event){
		//console.log("mouse entering to note");
		$(this).find('span.close').css("display","inline");
	})
}

function leaveFromNote(){
	$(document).on("mouseleave",".note-drop div",function(event){
		//console.log("mouse leaving from note");
		$(this).find('span.close').css("display","none");
	})
}

function deleteNote(){
	$(document).on('click','span.close',function(){
		//console.log('deleting');
		$(this).parents('.note-drop').remove();
	})
}