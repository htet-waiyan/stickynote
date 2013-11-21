$(function(){
	$(".note-pile").draggable({
		containment:'body',
		cursor:'pointer',
		stack:'.note-drop',
		distance:10,
		opacity:1.5,
		revert:'invalid',
		revertDuration:700,
		helper:newNote,
	});

	$(".note-drop").droppable({
		tolerance:'intersect',
		drop:handleDrop,
		over:handleOver,
		out:handleOut,
		deactivate:handleDeactivate
	});
})
function newNote(event){
		//$note=$('div').addClass('new-note');
	return '<div class="new-note"></div>';
}
function handleDragStop(event,ui){
	$helper=ui.helper;
	var pos=$helper.offset();
	console.log(ui.offset.top+" "+ui.offset.left);
	$helper.css({position:'absolute',top:ui.offset.top,left:ui.offset.left});
	$(this).append($helper);
	//$helper.css({top:pos.top,left:pos.left});
	//alert(ui.helper.css('font-size'));
}
function handleDrop(event,ui){
	var $newNote=$(ui.helper).clone(false);

	$newNote.removeClass('ui-draggable-dragging');
	$newNote.css({position:'absolute',top:0,left:0});
	$(this).append($newNote);
	$(this).addClass('add-border');
	$(this).droppable("option","disabled",true);
}
function handleOver(event,ui){
	$(this).addClass('drop-over');
}
function handleOut(event,ui){
	$(this).removeClass('drop-over');
}
function handleDeactivate(event,ui){
	$(this).removeClass('drop-over');
}