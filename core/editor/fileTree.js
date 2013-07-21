var treeDir = new Object();

function refreshDirectory()
{
    //call a refresh on the treeview
    $("#directory").jstree("refresh");
}

function initializeFileTree() {
    treeDir = $("#directory").jstree({
        "types": {
            "types": {
                "file_code_js" : {
                    "icon" : {
                        "image" : "../../media/fileicons/code16.png"
                    }                            
                },
                "file_code_fs" : {
                    "icon" : {
                        "image" : "../../media/fileicons/code16.png"
                    }                            
                },
                "file_code_vs" : {
                    "icon" : {
                        "image" : "../../media/fileicons/code16.png"
                    }                            
                },
                "file_image_bmp" : {
                    "icon" : {
                        "image" : "../../media/fileicons/image16.png"
                    }                            
                },
                "file_image_png" : {
                    "icon" : {
                        "image" : "../../media/fileicons/image16.png"
                    }                            
                },
                "file_image_gif" : {
                    "icon" : {
                        "image" : "../../media/fileicons/image16.png"
                    }                            
                },
                "folder" : {
                    "icon" : {
                        "image" : "../../media/fileicons/folder16.png"
                    }
                }
            }
        },
        
        "themes" :  { 
                "theme" : "classic", 
                "dots" : false
        },
        
        
        
        "html_data" : {
            "animation" : 0,
            "ajax" : {
                "type" : "POST",
                "async" : false,
                "url" : "../utility/fileIO.php",                        
                "data" : { "project" : projectID, "op" : 0 }
            }
        },
        
        /*
        "crrm" : {
            "move" : {
                "check_move" : function(m) {
                    //alert(m);
                }
            }
        },
        */
        
        "plugins" : [ "types", "themes", "html_data", "ui", "crrm", "dnd"]

    })
    
    
    .bind("move_node.jstree", function(event, data) {
        //cancel the action
        $.jstree.rollback(data.rlbk);
        //alert("Test");
        //alert(data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim());
        
        //if the file names are the same move up one level
        //alert(data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + " : " + data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim());

        
        //if the target is a folder then move the file/folder into that folder
        //if it is the same folder, the move it out one level
        if(data.rslt.r.attr("rel") == "folder")
        {
            //deal with the move
            //alert(data.rslt.r.attr("path") + data.rslt.r.context.text());
            //alert(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim());
            if(data.rslt.o.attr("path") == data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + "/")
            {
                moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.o.context).text().trim());
            }
            else
            {
                moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.r.context).text().trim() + "/" + $(data.rslt.o.context).text().trim());
            }                    
        }
        else
        {
            moveFile(data.rslt.o.attr("path") + $(data.rslt.o.context).text().trim(), data.rslt.r.attr("path") + $(data.rslt.o.context).text().trim());
        }

        
        
    })
    
    
    .bind("select_node.jstree", function(event, data)
          {
            var filepath = $('#directory').jstree('get_selected').attr('path') + $('#directory').jstree('get_selected').children("a").text().replace(String.fromCharCode(160), "");
            
            
            var selectedRel = $('#directory').jstree('get_selected').attr('rel');
            var selectedSlice = selectedRel.slice(0, 10);
            //if selected file is an image then display it in the inspector panel
            if(selectedSlice == "file_image")
            {
                $('#editor').css('visibility', 'hidden');
                $('#inspector').css('visibility', 'visible');
                
                $("#inspector").html("<center><img src=\"" + filepath + "\"></center>");
            }
            
            //if selected file is a code file then display it in the editor
            if($('#directory').jstree('get_selected').attr('rel').slice(0, 9) == "file_code")
            {
                $('#editor').css('visibility', 'hidden');
                $('#inspector').css('visibility', 'visible');
                $("#inspector").html("<center><img src=\"../../media/throbber.gif\"></center>");
                
                getFileContents(filepath);
                
                $('#editor').css('visibility', 'visible');
                $('#inspector').css('visibility', 'hidden');
            }
    })
    .bind("loaded.jstree", function(event, data)
          {

                //alert(data.rslt);

    });
}