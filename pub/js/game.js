var counters = {
    total: 52,
    score: 0,
    1: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    11: 4,
    12: 4,
    13: 4
},
    last,
    max,
    rendered = 1;

function stats(resp) {
    counters.total -= 1;
    counters[resp.value] -= 1;
    var lower = 0,
        higher = 0, 
        same = 0;
    for (var i = 1; i <= 13; i++) {
        if (i < resp.value) {
            lower += counters[i];
        }
        else if (i === resp.value) {
            same += counters[i];
        }
        else if (i > resp.value) {
            higher += counters[i];
        }
    }
    $("#chance-lower").html(lower + "/" + counters.total + " (~" + Math.round(lower / counters.total * 100) + "%)");
    $("#chance-same").html(same + "/" + counters.total + " (~" + Math.round(same / counters.total * 100) + "%)");
    $("#chance-higher").html(higher + "/" + counters.total + " (~" + Math.round(higher / counters.total * 100) + "%)");
}

$(document).ready(function() {
    $.post("/start/", function(resp) {
        $("#display div").append("<img src='" + resp.path + "' class='responsive-img'/>");
        $("#display div img").on("load", function() {
            max = Math.floor($(window).width() / $("#display div img").width()) - 1;
            var i = 1;
            while (i < max) {
                $("#display div").append("<img src='/img/backs/red.png' class='responsive-img'/>");
                i += 1;
            }
        });
        last = resp.value;
        stats(resp);
    });
});

$("#higher, #lower").on("click", function() {
    var guess = $(this).data("guess");
    $.post("/guess/", function(resp) {
        if (rendered < max - 1) {
            $("#display div img").last().remove();
            $("<img src='" + resp.path + "' class='responsive-img'/>").insertAfter($("#display div img:nth-of-type(" + rendered + ")"));
            rendered += 1;
        }
        else {
            $("#display div img").first().remove();
            $("<img src='" + resp.path + "' class='responsive-img'/>").insertAfter($("#display div img:nth-of-type(" + (rendered - 1) + ")"));
        }
        if ((guess === "higher" && resp.value >= last) || (guess === "lower" && resp.value <= last)) {
            last = resp.value;
            counters.score += 1;
            $("#score").html(counters.score);
            if (counters.score === 51) {
                $("#higher, #lower").remove();
                $("#win").show();
                $("#chance-lower").html("");
                $("#chance-same").html("");
                $("#chance-higher").html("");
            }
            else {
                stats(resp);
            }
        }
        else {
            $("#higher, #lower").remove();
            $("#lost").show();
        }
    });
});

$("input[name='colour']").on("change", function() {
    var colour = $("input[name='colour']:checked+span").html().toLowerCase();
    $("img[src*='backs']").attr("src", "/img/backs/" + colour + ".png");
});