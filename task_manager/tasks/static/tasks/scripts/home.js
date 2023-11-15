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
        
                    checkedCb.parent().remove();
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
                        <input type="checkbox" id="${idhtml}" class="checkbox-item">
                        <label for="${idhtml}" id="label-${idhtml}">${$("#id_title").val()}</label>
                        <br>
                        <span id="${idhtml}-info">${$("#id_description").val()}</span>
                    </li>
                    `
                )
        
                $("body").css("background-color", "white");
                addTaskForm.css("display", "none");
                
                allCb = $(".checkbox-item");
                $("#submit-tasks").css({"background-color": "#000"});
            }
        });
    })
});
