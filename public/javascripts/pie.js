$(function () {

    var svg = d3.select("#graph")
            .append("svg")
            .style({
                width: "100%",
                height: 500
            });

    var using_layout = function (data, x, y) {
        var colors = d3.scale.category20c(),
            pie = d3.layout.pie()
                .value(function (d) { return d.value; }),
            arc = d3.svg.arc()
                .outerRadius(150),
            slice = svg.selectAll('.slice')
                .data(pie(data))
                .enter()
                .append("g")
                .attr("transform", "translate("+x+", "+y+")");

        slice.append("path")
            .attr({d: arc,
                   fill: function (d, i) { return colors(i); },
                   title: function (d) { return d.data.label + " ("+d.data.value+")"; }
                  })
    };

    d3.json("../grocery.json", function (data) {
        using_layout(data, 300, 250);

        $("svg path").tooltip({
            container: "body",
            placement: "right"
        });
    });
});
