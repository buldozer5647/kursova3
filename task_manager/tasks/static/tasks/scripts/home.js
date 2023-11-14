$(function() {
    var allCb = $(".checkbox-item");
    var addTaskForm = $(".task-container");
    
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

        if (allCb.length > 0) {
            checkedCb = $(".checkbox-item:checked");
            xpAmountVal = parseInt($(".xp-amount-value").text());
            xpAmountVal += checkedCb.length;

            checkedCb.parent().remove();
            $(".xp-amount-value").text(xpAmountVal);

            allCb = $(".checkbox-item");
            
            if (allCb.length === 0) {
                $(this).css({"background-color": "#403f3f"});
            }
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

    // $(".add-task-btn").on("click", function(event) {
    //     event.preventDefault();

    //     let taskName = $(".add-task-name").val();
    //     let taskDesc = $(".add-task-desc").val();
    //     console.log(taskName);
    //     console.log(taskDesc);
        
    //     $(".task-list").append(
    //         `
    //         <li>
    //             <input type="checkbox" id="task${allCb.length+1}" class="checkbox-item">
    //             <label for="task${allCb.length+1}" id="label${allCb.length+1}">${taskName}</label>
    //             <br>
    //             <span id="task${allCb.length+1}-info">${taskDesc}</span>
    //         </li>
    //         `
    //     )

    //     $("body").css("background-color", "white");
    //     addTaskForm.css("display", "none");
        
    //     allCb = $(".checkbox-item");
    //     $("#submit-tasks").css({"background-color": "#000"});
    // })

    $(document).on("submit", "#add-task-form", function(e) {
        e.preventDefault();

        $.ajax({
            type: "POST",
            url: "/create/",
            data: {
                title: $("#id_title").val(),
                desc: $("#id_description").val(),
                priority: $("#id_priority").val(),
                csrfmiddlewaretoken: $("input[name=csrfmiddlewaretoken]").val()
            },
            success: function() {

            }
        });
    })
});
