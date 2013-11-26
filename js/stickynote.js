$(NoteHandler);

//defining sticky note app
var StickyNote={}

StickyNote.DragAndDrop={
	//draggable option
	draggableOptions:{
		containment:'body',
		cursor:'crosshair',
		stack:'.note-pile',
		revert:'invalid',
		revertDuration:500,
		zIndex:100,
		helper:'clone'
	},

	//droppable options
	droppableOptions:{
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
			StickyNote.createNoteDrop();
			StickyNote.addDeleteBtn();
			event.preventDefault();
		}
	}
}

//to create droppable area 
StickyNote.createNoteDrop=function(){
	var noteCount=$(".right-side .note-drop").length;
	console.log(noteCount);

	var $noteDrop=$("<div></div>");
		$noteDrop.addClass("note-drop");
		$noteDrop.droppable(this.DragAndDrop.droppableOptions);
		$('.right-side').append($noteDrop);
}

//to attach delete to sticky notes
StickyNote.addDeleteBtn=function(){
	var $note=$('.note-drop div');
	var $delBtn=$('<span>').text('x').addClass('close');
	$delBtn.appendTo($note);
}

//to capture mouse hover event on sticky notes
StickyNote.enterToNote=function(){
	$(document).on("mouseenter",".note-drop div",function(event){
		//console.log("mouse entering to note");
		$(this).find('span.close').css("display","inline");
	})
}

//to capture mouse leave event on sticky notes
StickyNote.leaveFromNote=function(){
	$(document).on("mouseleave",".note-drop div",function(event){
		//console.log("mouse leaving from note");
		$(this).find('span.close').css("display","none");
	})
}

//to delete sticky notes
StickyNote.deleteNote=function(){
	$(document).on('click','span.close',function(){
		//console.log('deleting');
		$(this).parents('.note-drop').remove();
	})
}

StickyNote.editNote=function(){
	$(document).on("dblclick",".note-drop div",function(){
		$(this).attr("contenteditable",true);
		$(this).children("span").hide();
	}).on("focusout",'.note-drop div',function(){
		$(this).attr("contenteditable",false);
		$(this).children("span").show();
	})
}


function NoteHandler(){
	StickyNote.createNoteDrop();

	$('.note-pile').draggable(StickyNote.DragAndDrop.draggableOptions).dblclick(function(){
		console.log('edit');
		$(this).draggable({disabled:true});
		$(this).attr("contenteditable",true);
	}).focusout(function(){
		console.log('done');
		$(this).draggable({disabled:false});
		$(this).attr("contenteditable",false);
	});

	$('.note-drop').droppable(StickyNote.DragAndDrop.droppableOptions);

	StickyNote.enterToNote();
	StickyNote.leaveFromNote();
	StickyNote.deleteNote();
	StickyNote.editNote();
}