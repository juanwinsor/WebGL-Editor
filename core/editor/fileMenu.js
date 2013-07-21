

function initializeFileMenu() {
    //create a click handler to hide the menu if anything but the menu is clicked
    $(document).click(function (e){
        
        if(!$("#fileMenu").is(e.target))
        {
            var container = $("#fileMenuList");
            if (container.has(e.target).length === 0 )
            {
                container.hide("fade", "fast");
            }
        }
        
        
        //if(e.id != "button_theme")
        if(!$("#button_theme").is(this))//e.currentTarget))
        {
            var themeContainer = $("#editorThemeList");
            if (themeContainer.has(e.target).length === 0 )
            {
                themeContainer.hide("fade", "fast");
            }
        }
        
    });
    
    
    //initialize the file menu
    $("#fileMenuList").menu( { position:{ my: "left top", at: "right top" } } ).hide();
    //attach on click to file menu
    /*
    $("#fileMenu")         
    .click(function(e){             
        $("#fileMenuList").toggle("fade" , "fast");
        e.stopPropagation();
    });
    */
    $("#fileMenuList").zIndex(1000);
    //file menu functionality
    $("#fileMenuList").on("menuselect", function(event, ui){
        
        $("#fileMenuList").hide("fade" , "fast");
        
        //alert(ui.item.context.firstChild.text);
        switch(ui.item.context.firstChild.text)
        {
            case "folder": //create a new folder
                //filename dialog for creating new folders and files
                //$("#filenameDialog").zIndex(1000);
                $("#filenameDialog").dialog("open");
                $("#filenameDialog").attr("fileType", "folder");
                $("#filenameTextbox").val("");
                $("filenameTextbox").enabled = true;
                
                break;
            
            case "javascript file": //create an empty js file
                $("#filenameDialog").dialog("open");
                $("#filenameDialog").attr("fileType", "js");
                $("#filenameTextbox").val("");
                $("filenameTextbox").enabled = true;
                
                break;
            
            case "delete":
                //determine if anything is selected
                if($('#directory').jstree('get_selected').attr('rel') == "file_code" || $('#directory').jstree('get_selected').attr('rel') == "file_image")
                {
                    var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                    deleteFile(filepath);
                }
                
                if($('#directory').jstree('get_selected').attr('rel') == "folder")
                {
                    var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
                    deleteFolder(filepath);
                }
                
                
                break;
            
            case "upload image":
                $("#fileUploadDialog").dialog("open");
                break;
        }
        
        
        
    });
    
    $("#filenameDialog").dialog({
        resizable: false,
        //height: 140,
        modal: true,
        autoOpen: false,
        //show: false,                            
        buttons: {
            "Create": function(){
                switch($("#filenameDialog").attr("fileType"))
                {
                case "folder":
                    createNewFolder($("#filenameTextbox").val());
                    break;
                
                case "js":
                    createFile($("#filenameTextbox").val() + ".js");
                    break;
                }
                
                $(this).dialog("close");
            },
            Cancel: function(){
                $(this).dialog("close");
            }
            
        }
    });
    
    
    $("#fileUploadDialog").dialog({
        resizable: false,
        //height: 140,
        modal: true,
        autoOpen: false,
        //show: false,                            
        buttons: {
            "Upload": function(){                        
                $("#fileUploadForm").submit();
                $(this).dialog("close");
            },
            Cancel: function(){
                $(this).dialog("close");
            }                    
        }
    });
    
    
    
    $("#button_fileMenu").button({
        icons: {
             primary: null,
             secondary: "ui-icon-triangle-1-s"
        },
        text: true
     })
     .click(function(e){
         //open theme dropdown menu
         $("#fileMenuList").toggle(  "fade" , "fast" );
         e.stopPropagation();
     })
     .zIndex(500);
    
}