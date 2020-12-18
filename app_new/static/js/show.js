
var w = 930;
var h = 250;
var x_len = 800;
var padding = 26;
var speed = 50;

//比例尺
var xScale;                 //将下标映射到x轴上
var yScale;                 //将score值映射到y轴上
var dataset = [];
function canvas_draw(transList, seq) {
    var rectNum = transList.length;
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var lineStart = 70;  // 50
    var lineEnd = 770;  // 750
    var linWidth = lineEnd - lineStart;
    var lineUp = 100; //50
    var lineDown = 200;  //150
    var lineHeight = lineDown - lineUp;
    // up line
    ctx.moveTo(lineStart, lineUp);
    ctx.lineTo(lineEnd, lineUp);
    // ctx.stroke();
    // ctx.closePath();
    // down line
    ctx.moveTo(lineStart, lineDown);
    ctx.lineTo(lineEnd, lineDown);
    ctx.stroke();
    // ctx.closePath();
    ctx.fillStyle = '#b2ffe9';
    ctx.fillRect(lineStart, lineUp, linWidth, lineHeight);
    // rect
    var rectWidth = parseInt(linWidth / (rectNum * 2 + 1));
    var rectHeight = 150;
    var rectX = lineStart + rectWidth;
    var rectY = lineUp - 25;  // 25为矩形高于upline的高度
    console.log("rectWidth", rectWidth);
    for (var i = 0; i < rectNum; i++) {
        //设置填充颜色
        ctx.fillStyle = '#5aff47';
        //填充一个矩形
        ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        rectX += 2 * rectWidth;
    }
    // 半圆
    //设置线宽
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#242acc';
    var r = rectWidth;
    var circleStartX = lineStart + rectWidth + (rectWidth / 2);
    var circleStartY = rectY;
    var direction = 1;    // 0为顺时针，1为逆时针
    // console.log(circleStartX, circleStartY);
    ctx.moveTo(circleStartX, circleStartY);
    ctx.arc(circleStartX - r, circleStartY, r, 0, Math.PI, direction);

    circleStartY += rectHeight;
    direction = 1;
    for (var i = 0; i < rectNum; i++) {
        // console.log(i,circleStartX, circleStartY);
        ctx.moveTo(circleStartX, circleStartY);
        ctx.arc(circleStartX + r, circleStartY, r, Math.PI, 0, direction);    // pi和0位置换
        circleStartX += 2 * r;
        circleStartY += Math.pow(-1, i + 1) * rectHeight;
        direction += Math.pow(-1, i + 1);
    }
    ctx.stroke();
    // text
    ctx.lineWidth = 1;  // 设置线宽
    ctx.strokeStyle = '#000000';
    var textStartX = lineStart + rectWidth;
    var fontHeight = 10;
    var textStartY = rectY;
    ctx.strokeText("outside", 30, lineUp - 5);
    ctx.strokeText("inside", 30, lineDown - lineHeight / 2);
    ctx.strokeStyle = '#ff414e';
    for (var i = 0; i < rectNum; i++) {
        var ind1 = transList[i][0];
        var amino1 = seq[ind1];
        var ind2 = transList[i][1];
        var amino2 = seq[ind2];
        if (i % 2 === 0) {
            ctx.strokeText(amino1 + " " + ind1, textStartX + 10, textStartY + fontHeight);
            ctx.strokeText(amino2 + " " + ind2, textStartX + 10, textStartY + rectHeight);  // +fontHeight
        } else {
            ctx.strokeText(amino2 + " " + ind2, textStartX + 10, textStartY + fontHeight);
            ctx.strokeText(amino1 + " " + ind1, textStartX + 10, textStartY + rectHeight);  // +fontHeight
        }

        textStartX += 2 * rectWidth;
    }
}


function addValueMap(valueset, numset) {
    //归一化处理
    var normalize = d3.scale.linear()
        .domain([d3.min(valueset, function (d) {
            return d;
        }), d3.max(valueset, function (d) {
            return d;
        })])
        .range([0, 1]);
    for (var i = 0; i < numset.length; i++) {
        valueset[i] = parseFloat((normalize(valueset[i])).toFixed(5));
    }
    // dataset
    for (var i = 0; i < numset.length; i++) {
        dataset.push({
            key: numset[i],
            value: parseFloat(valueset[i]),
        });
    }
    xScale = d3.scale.linear()
        .domain([0, numset.length])
        .range([105, 905]);
    yScale = d3.scale.linear()
        .domain([d3.min(valueset, function (d) {
            return d;
        }), d3.max(valueset, function (d) {
            return d;
        })])
        .range([h - padding, padding]);

    // add ValueMap
    var p = "";
    for (var i = 0; i < numset.length; i++) {
        p += xScale(numset[i]);
        p += ",";
        p += yScale(valueset[i]);
        if (i < numset.length - 1) {
            p += " ";
        }
    }
    //console.log(p);
    //折线图区域
    var xpos;
    var ypos;
    var svg = d3.select("#dataValue")
        .attr("width", w)
        .attr("height", h);
    svg.on("mouseover", function () {
        xpos = d3.mouse(svg.node())[0];
        ypos = d3.mouse(svg.node())[1];
    });
    //添加折线
    svg.append("polyline")
        .attr("points", p)
        .attr("fill", "none")
        .attr("stroke", "rgba(66,133,244,0.5)")
        .attr("stroke-width", 2);

    //Define X axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .ticks(5)//最多刻度数，连上原点
        .orient("bottom");
    //.tickFormat();//添加刻度格式
    //Define Y axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);
    //.tickFormat();
    //Create X axis

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")//设置据下边界的距离
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(105, 0)")//设置轴据左边界的距离
        .call(yAxis);

    svg.selectAll(".srect")
        .data(dataset, function (d) {
            return d.key;
        })
        .enter()
        .append("rect")
        .attr("id", function (d, i) {
            var theId = "scoreRect" + i;
            return theId;
        })
        .attr("class", "srect")
        .attr("x", function (d, i) {
            return xScale(i + 1) - x_len / dataset.length / 2;
        })
        .attr("y", function (d) {
            return padding;
        })
        .attr("height", function (d) {
            return h - padding * 2;
            //return (w-padding*2)/dataset.length;
        })
        .attr("width", function (d) {
            return x_len / dataset.length;
        })
        .attr("fill", "rgba(255,0,0,0)")
        .on("mouseover", function (d, i) {
            var tempValue = d.value;
            var tempIndex = d.key;
            // var tempExp = null;    // 亲疏水，暂时设为null

            var xPosition = xScale(tempIndex);
            var yPosition = yScale(tempValue);
            //console.log(tempValue);
            //console.log(yPosition);

            drawInteraction(tempValue, tempIndex, xPosition, yPosition);
        })
        .on("mouseout", function (d, i) {
            /* d3.select("#tooltipExp")
                .style("left", "-1000px")
                .style("top", "-1000px");
            d3.select("#sCircleExp").classed("hidden1",true);
            d3.select("#xlineExp").classed("hidden1", true);
            d3.select("#ylineExp").classed("hidden1", true); */
            d3.select("#tooltip")
                .style("left", "-1000px")
                .style("top", "-1000px");
            d3.select("#scircle").classed("hidden1", true);
            d3.select("#xline").classed("hidden1", true);
            d3.select("#yline").classed("hidden1", true);
            var tempId = "#rect" + (d.key - 1);
            d3.select(tempId)
                .transition()
                .duration(100)
                .attr("fill", "rgba(255,0,0,0)");
        });

}


function drawInteraction(tempValue, tempIndex, xPosition, yPosition) {
    // var _yPosition = yExpScale(tempExp);
    //alert(yPosition);
    //添加提示框
    var temp = tempIndex + ", " + tempValue;
    d3.select("#tooltip")
        .style("left", (xPosition + "px"))
        .style("top", (yPosition + "px"))
        .transition()
        .duration(speed)
        .select("#value")
        .text(temp);

    //添加提示圈
    d3.select("#scircle")
        .classed("hidden1", false)
        .attr("cx", xPosition)
        .attr("cy", yPosition)
        .attr("r", 3)
        .transition()
        .duration(speed)
        .attr("fill", "black");

    //添加坐标线
    d3.select("#xline")
        .classed("hidden1", false)
        .attr("x1", 105)
        .attr("y1", yPosition)
        .attr("x2", 905)
        .attr("y2", yPosition)
        .transition()
        .duration(speed)
        .attr("stroke", "rgba(255,0,0,0.3)");
    d3.select("#yline")
        .classed("hidden1", false)
        .attr("x1", xPosition)
        .attr("y1", padding)
        .attr("x2", xPosition)
        .attr("y2", h - padding)
        .transition()
        .duration(speed)
        .attr("stroke", "rgba(255,0,0,0.3)");

    //二级结构图的分割线
    // var tempId = "#rect" + (tempIndex-1);
    // d3.select(tempId)
    //     .transition()
    //     .duration(100)
    //     .attr("fill","rgba(255,0,0,0.3)");
}


function addSketchMap(secStructArr, valueset, numArr, aminoArr) {
    var currentStruct = secStructArr[0];
    var structLength = 0;

    for (var i = 0; i < numArr.length + 1; i++) {
        if (i == numArr.length) {
            d3.select("#secondStructImg")
                .append("div")
                .style("background-image", function () {
                    if (currentStruct === 1)  // 1 跨膜
                        return "url({% static 'img/element/_helix.png' %})";
                    else
                        return "url({% static 'img/element/_coil.png' %})";
                })
                .style("width", function () {
                    return x_len / numArr.length * structLength + "px";
                })
                .style("height", "10px")
                .style("background-repeat", "repeat")
                .style("float", "left");
            break;
        }
        if (currentStruct == secStructArr[i]) {
            structLength++;
        } else {
            if (i != 0) {
                d3.select("#secondStructImg")
                    .append("div")
                    .style("background-image", function () {
                        if (currentStruct === 1)
                            return "url({% static 'img/element/_helix.png' %})";
                        else
                            return "url({% static 'img/element/_coil.png' %})";
                    })
                    .style("width", function () {
                        return x_len / numArr.length * structLength + "px";
                    })
                    .style("height", "10px")
                    .style("background-repeat", "repeat")
                    .style("float", "left");
                structLength = 1;
                currentStruct = secStructArr[i];
            } else {
                structLength++;
            }
        }

        var tempId = "rect" + i;
        d3.select("#secondStruct")
            //.style("left",function(){
            //    return "'" + ((w-padding*2) / dataset.length) +"px'";
            //})
            .append("rect")
            .attr("id", tempId)
            .attr("x", function () {
                return xScale(i + 1) - x_len / numArr.length / 2;
            })
            .attr("y", 0)
            .attr("width", function () {
                return x_len / numArr.length;
            })
            .attr("height", 60)
            .attr("fill", "rgba(255,0,0,0)")
            .on("mouseover", function () {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "rgba(255,0,0,0.1)");
                var possec = parseInt(d3.select(this).attr("id").substr(4));
                // console.log(possec);

                var tempValue = valueset[possec];
                var tempIndex = numArr[possec];

                var xPosition = xScale(tempIndex);

                var yPosition = yScale(tempValue);
                drawInteraction(tempValue, tempIndex, xPosition, yPosition);

                //添加局部二级结构框
                addSecStructMapTip(possec, aminoArr);
                d3.select("#tip2")
                    .classed("hidden1", false)
                    .style("left", ((xPosition - 152) + "px"))
                    .style("top", 200 + "px")  // tip2 距离顶边高度
                    .style("background-color", "rgba(255,255,255,0.2)");
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr("fill", "rgba(255,0,0,0)");
                d3.select("#tooltip")
                    .style("left", "-1000px")
                    .style("top", "-1000px");
                d3.select("#scircle").classed("hidden1", true);
                d3.select("#xline").classed("hidden1", true);
                d3.select("#yline").classed("hidden1", true);
                d3.select("tip2")
                    .classed("hidden1", true);
                clearSecStructMapTip();
            });
    }
}


//添加二级结构局部详细图
function addSecStructMapTip(i, aminoArr) {
    var _padding = 10;
    var _height = 130;
    var _left = 135;
    //if(i>=5)
    for (var j = i - 9; j < i + 10; j++) {
        if (j < 0) continue;
        if (j >= aminoArr.length)
            break;
        //添加残基名
        d3.select("#secStruct")
            .append("p")
            .attr("id", "secStructAmino")
            .text(aminoArr[j])
            .style("left", ((_padding + _left + (j - i) * 15 + 3) + "px"))
            .style("top", ((_padding + 20) + "px"));
        //添加坐标线
        d3.select("#secStructSvg")
            .append("line")
            .attr("id", "secStructAxis")
            .attr("x1", (_padding + _left + (j - i) * 15))
            .attr("y1", (_padding + 40))
            .attr("x2", (_padding + _left + (j - i + 1) * 15))
            .attr("y2", (_padding + 40))
            .attr("stroke", "black")
            .attr("stroke-width", 1);
        if (j % 5 == 0) {
            d3.select("#secStructSvg")
                .append("line")
                .attr("id", "secStructAxis")
                .attr("x1", (_padding + _left + (j - i) * 15 + 7))
                .attr("y1", (_padding + 40))
                .attr("x2", (_padding + _left + (j - i) * 15 + 7))
                .attr("y2", (_padding + 45))
                .attr("stroke", "black")
                .attr("stroke-width", 2);
            d3.select("#secStruct")
                .append("p")
                .style("left", ((_padding + _left + (j - i) * 15) + "px"))
                .style("top", ((_padding + 50) + "px"))
                .style("position", "absolute")
                .text(j + 1);
        }
    }
}

//清除二级结构局部详细图
function clearSecStructMapTip() {
    d3.select("#secStruct")
        .text("");
    d3.select("#secStructSvg")
        .text("");
    d3.select("#tip2")
        .style("background-color", "rgba(255,255,255,0")
        .style("left", "-1000px")
        .style("top", "-1000");
}

export {canvas_draw, addValueMap, addSketchMap};