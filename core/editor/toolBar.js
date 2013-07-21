
function initializeToolBar() {
    //initialize the editor theme menu
    $("#editorThemeList").menu( { position:{ my:"left top", at: "right top" } } ).hide();
    //editor theme menu functionality
    $("#editorThemeList").on( "menuselect", function( event, ui ) {
        //alert("test");
        editor.setTheme("ace/theme/" + ui.item.context.firstChild.text);
        $("#editorThemeList").hide("fade" , "fast");
    });
    
    //set button styles
    $( "#button_save" ).button({
       icons: {
           primary: "ui-icon-disk"
       },
       disabled: true,
       text: false
    })
    .click(function(){
        //save file contents
        //alert(editor.getValue());
    
        saveFileContents(editor.currentFile, editor.getValue());
    });
    
    $("#button_theme").button({
       icons: {
            primary: null,
            secondary: "ui-icon-triangle-1-s"
       },
       text: true
    })
    .click(function(e){
        //open theme dropdown menu
        $("#editorThemeList").toggle(  "fade" , "fast" );
        e.stopPropagation();
    })
    .zIndex(500);
    
    //set button styles
    $( "#button_refresh" ).button({
       icons: {
           primary: "ui-icon-refresh"
       },
       disabled: false,
       text: false
    })
    .click(function(){
        parent.refreshViewport();
    });
    
    //set button styles
    $( "#button_undo" ).button({
       icons: {
           primary: "ui-icon-arrowreturnthick-1-w"
       },
       disabled: false,
       text: false
    })
    .click(function(){
        editor.getSession().getUndoManager().undo();
    });
    
    $( "#button_help" ).button({
       icons: {
           primary: "ui-icon-help"
       },
       disabled: false,
       text: false
    })
    .click(function(){
        helpWindow=window.open('../../documentation/index/Classes.html','','width=1024,height=768,location=0,menubar=0,toolbar=1');
        helpWindow.focus();
    });
    
    $( "#button_redo" ).button({
       icons: {
           primary: "ui-icon-arrowreturnthick-1-e"
       },
       disabled: false,
       text: false
    })
    .click(function(){
        editor.getSession().getUndoManager().redo();
    });
}
