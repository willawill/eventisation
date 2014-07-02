$(function () {
    var width = 500, height = 300, pad = 20, left_pad = 100;
    var x = d3.scale.ordinal().rangeRoundBands([left_pad, width - pad], 0.1);
    var y = d3.scale.linear().range([height - pad, pad]);
    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svg = d3.select("#restaurant")
            .append("svg")
            .attr("width", width)
            .attr("height", 400);


    d3.json("../restaurants.json", function (data) {
      data.sort(function(a, b){return b.value-a.value});
      x.domain(data.map(function (d) { return d.label; }));
      y.domain([0, d3.max(data, function (d) { return d.value; })]);
      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0, "+(height-pad) + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-1em")
            .attr("transform", function(d) {
                return "rotate(-65)"
                });

      svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate("+ (left_pad - pad) + ", 0)")
        .call(yAxis);

      svg.append("text")
        .attr("x", 350)
        .attr("y", 90)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text("# of Restaurants vs Neighborhoods");

      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) { return x(d.label); })
        .attr('width', x.rangeBand())
        .attr('y', pad)
        .transition()
        .delay(function(d) { return d.value * 5})
        .duration(500)
        .attr('y', function (d) { return y(d.value); })
        .attr('height', function (d) { return height-pad - y(d.value); });
    });
});
