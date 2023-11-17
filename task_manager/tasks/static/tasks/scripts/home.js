$(function() {
    var allCb = $(".checkbox-item");
    var addTaskForm = $(".task-container");

    if (allCb.length === 0)
        $("#submit-tasks").css({"background-color": "#403f3f"});
    
    $(".task-list").on("change", ".checkbox-item", function() {
        if ($(this).is(":checked")) {
            $("label[for='" + $(this).attr("id") + "'").css("text-decoration", "line-through");
            $("#" + $(this).attr("id") + "-info").css("text-decoration", "line-through");
        }
        else {
            $("label[for='" + $(this).attr("id") + "'").css("text-decoration", "none");
            $("#" + $(this).attr("id") + "-info").css("text-decoration", "none");
        }
    });

    $("#submit-tasks").on("click", function(event) {
        event.preventDefault();
        
        let checkedCb = $(".checkbox-item:checked");
        
        if (checkedCb.length > 0) {
            let arrOfIDhtml = []

            for (let i = 0; i < checkedCb.length; i++)
                arrOfIDhtml.push($(checkedCb[i]).prop("id"));

            $.ajax({
                type: "POST",
                url: "delete/",
                data: {
                    idhtml: arrOfIDhtml,
                    csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
                },
                traditional: true,
                success: function(data) {
                    let xpAmountVal = parseInt($(".xp-amount-value").text());
                    xpAmountVal += checkedCb.length;
        
                    checkedCb.parent().parent().remove();
                    $(".xp-amount-value").text(xpAmountVal);
        
                    allCb = $(".checkbox-item");
                    
                    if (allCb.length == 0)
                        $("#submit-tasks").css({"background-color": "#403f3f"});
                }
            });
        } else
            alert("There is no tasks to submit");
    });

    $("#add-task").on("click", function(event) {
        $(".add-task-name").val("")
        $(".add-task-desc").val("")
        event.stopPropagation();
        $("body").css("background-color", "grey");
        allCb.css("color", "red");
        addTaskForm.css("display", "inline");
    });
    
    $(document).on("click", function(event) {
        if (!$(event.target).closest(addTaskForm).length) {
            $("body").css("background-color", "white");
            addTaskForm.css("display", "none");
        }       
    });
    
    $(document).on("submit", "#add-task-form", function(e) {
        e.preventDefault();
        
        $.ajax({
            type: "POST",
            url: "create/",
            data: {
                title: $("#id_title").val(),
                desc: $("#id_description").val(),
                priority: $("#id_priority").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
            },
            success: function(idhtml) {
                $(".task-list").append(
                    `
                    <li>
                        <div>
                            <input type="checkbox" id="${idhtml}" class="checkbox-item">
                            <label for="${idhtml}" id="label-${idhtml}">${$("#id_title").val()}</label>
                            <br>
                            <span id="${idhtml}-info">${$("#id_description").val()}</span>
                        </div>

                        <button class="delete-submit">
                            <svg width="800px" height="800px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                                
                                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                                
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                                
                                <g id="SVGRepo_iconCarrier"> <title>delete [#1487]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-179.000000, -360.000000)" fill="#d60000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z" id="delete-[#1487]"> </path> </g> </g> </g> </g>
                                
                            </svg>
                        </button>
                    </li>
                    `
                )

                $("#id_title").val("");
                $("#id_description").val("");
                $("#id_priority").val("L");
        
                $("body").css("background-color", "white");
                addTaskForm.css("display", "none");
                
                allCb = $(".checkbox-item");
                $("#submit-tasks").css({"background-color": "#000"});
            }
        });
    });

    $(document).on("click", ".delete-submit", function(event) {
        event.preventDefault();

        let btn = $(this);
        let idhtml = $(this).siblings().eq(0).find("input").prop("id");

        $.ajax({
            type: "POST",
            url: "delete/",
            data: {
                idhtml: idhtml,
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
            },
            success: function(data) {
                btn.parent().remove();
    
                allCb = $(".checkbox-item");
                
                if (allCb.length == 0)
                    $("#submit-tasks").css({"background-color": "#403f3f"});
            }
        })
    });
});
