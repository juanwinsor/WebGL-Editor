var editor;

function initializeCodeEditor() {
    //initialize editor window
    editor = ace.edit("editor");
    //editor.setTheme("ace/theme/twilight");
    editor.setTheme("ace/theme/dreamweaver");
    editor.getSession().setMode("ace/mode/javascript");
    editor.dirty = false;
    editor.getSession().on("change", function(){
        //enable save button
        $("#button_save").button( "option", "disabled", false );
        //flag document as dirty
        editor.dirty = true;
        //alert(editor.dirty);
    })
    $("#editorContainer").resizable({
        handles: 'w',
        resize: function(e, ui) {
            //refresh ace editor
            editor.resize();
            //resize directory panel
            //$("#directoryContainer").css("width", (ui.position.left - 5) + "px");
        },
        stop: function(e, ui) {
            $("#directoryContainer").css({ width: ui.position.left - 5 }); //(ui.position.left - 5) + "px");
            //resize directory panel
            //$("#directoryContainer").css("width", (ui.position.left - 5) + "px");
            //resize code editor
            //$("#editorContainer").css("width", "65%");
            //$("#editorContainer").css("height", "100%");
            $("#editorContainer").css({right: '0%', bottom: '0%'});
            //$("#editorContainer").css({width: '65%', height: '100%'});
            //$("#editor").css({right: '0%', bottom: '0%'});
            editor.resize();
        }
        
    });
}