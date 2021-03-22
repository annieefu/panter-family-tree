

svg_tree = d3.selectAll("#family_tree");

// set the dimensions and margins of the graph
var treemargin = { top: 250, right: 30, bottom: 30, left: 80 },
  treewidth = 930 - treemargin.left - treemargin.right,
  treeheight = 580 - treemargin.top - treemargin.bottom;

const width = svg_tree.attr("width");
const height = svg_tree.attr("height");

const visualize = async () => {

var data = await d3.json("tree.json");



//Update tooltip
function update_tooltip(){



    tooltip.style("visibility", "visible").style("z-index", 100)
    .attr("transform", "translate(" + (d3.event.pageX-170) + "," + (d3.event.pageY-200) + ")");
 
  

  let node = d3.select(this);
  let node_id = node._groups[0][0].id
  let name = data[node_id].name
  let birth = data[node_id].birth
  let notes = data[node_id].notes
  var name_split = name.split("\\\n");
  name_line.text(name_split[0]);
  name_line2.text(name_split[1]);
  birth_line.text(birth)

  var notes_split = notes.split("\\\n");
  notes_line.text(notes_split[0])
  notes_line2.text(notes_split[1])
}


function tooltip_mouseout(){
  tooltip.style("visibility", "hidden").style("z-index", 100);
  
}

var defs = svg_tree.append("defs");

			//Radial Gradient for male nodes
			defs.append("radialGradient")
				.attr("id", "m-gradient")
				.attr("cx", "50%")	//not really needed, since 50% is the default
				.attr("cy", "50%")	//not really needed, since 50% is the default
				.attr("r", "50%")	//not really needed, since 50% is the default
				.selectAll("stop")
				.data([
						{offset: "0%", color: "#008BC6"},
						{offset: "60%", color: "#2EA1D4"},
						{offset: "90%", color: "#5BB7E3"},
						{offset: "100%", color: "#72C2EA"}
					])
				.enter().append("stop")
				.attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });

      //Radial gradient for female nodes
			defs.append("radialGradient")
      .attr("id", "f-gradient")
      .attr("cx", "50%")	//not really needed, since 50% is the default
      .attr("cy", "50%")	//not really needed, since 50% is the default
      .attr("r", "50%")	//not really needed, since 50% is the default
      .selectAll("stop")
      .data([
          {offset: "0%", color: "#9D3FBF"},
          {offset: "60%", color: "#B063CF"},
          {offset: "90%", color: "#C487DF"},
          {offset: "100%", color: "#D7AAEF"}
        ])
      .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });

function create_node(x,y, node_id){
  console.log(data[node_id].sex)

  let new_node = svg_tree.append("g")
    .attr("id", function(){return nodeid})
    .on("mouseover", update_tooltip)
    .on("mouseout", tooltip_mouseout)

  new_node.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 22)
    // .style("fill", "url(#m-gradient)")
    .style("fill", function(){
          if (data[node_id].sex == "m")
          {return "url(#m-gradient)";}
          else
          {return "url(#f-gradient";}})
    .style("z-index", 99);


  new_node.append("text")
    .attr("x", x)
    .attr("y", y-43)
    .text(data[node_id].d_name)
    .style("font-family", "Lato")
    .style("font-weight", 400)
    .style("text-anchor", "middle")
    .style("fill", "black");



    
    new_node.append("text")
    .attr("x", x)
    .attr("y", y+10)
    .style("font-family", "Lato")
    .style("font-weight", 400)
    .attr("id", nodeid)
    .style("text-anchor", "middle")
    .style("fill", "white");


}

function draw_line (node_id1, node_id2){
  let line_group = svg_tree.append("g")
  let node1= d3.selectAll("#" + node_id1)
  let node2= d3.selectAll("#" + node_id2)
  let x1 = node1._groups[0][1].getAttribute('x')

  let y = node1._groups[0][1].getAttribute('y')
  let x2 = node2._groups[0][1].getAttribute('x')


  line_group.append("line")
  .attr("x1", Number(x1)+22)
  .attr("y1", Number(y)-10)
  .attr("x2", Number(x2)-22)
  .attr("y2", Number(y)-10)
  .style("z-index", 1)
  .attr("stroke", "black")
  .attr("stroke-width", "1")


}

// FAMILY NODES
// FAMILY NODES
// FAMILY NODES

// PANTER SIDE
// PANTER SIDE
// PANTER SIDE

// GENERATION 1
//Shraga Faivel panter
create_node(160, 160, nodeid="node2");
//Nechamah Serlin
create_node(305, 160, nodeid="node1");

// GENERATION 2
//Rena Panter
create_node(188, 320, nodeid="node5");
//Elanna Panter
create_node(78, 320, nodeid="node6");
//Gideon Panter
create_node(470, 320, nodeid="node7");
//Carol Yeckes
create_node(350, 320, nodeid="node8");


// NANCY SIDE
// NANCY SIDE
// NANCY SIDE

// GENERATION 1
//Jules Waltner
create_node(710, 160, nodeid="node3");
//Francois Langevin
create_node(835, 160, nodeid="node4");


// GENERATION 2
// Nancy Waltner
create_node(600, 320, nodeid="node9");
// Audrey Waltner
create_node(875, 320, nodeid="node10");


// DRAWING MARRIAGE LINES
// DRAWING MARRIAGE LINES
// DRAWING MARRIAGE LINES

// Shraga Faivel Panter and Nechamah Serlin
draw_line("node2", "node1")
// Jules Waltner and Francois Langevin
draw_line("node3", "node4")
// Gideon Panter and Carol Yeckes
draw_line("node8", "node7")
// Gideon Panter and Nancy Waltner
draw_line("node7", "node9")


// Drawing children arrows

// Children of Shraga Faivel Panter and Nechamah Serlin
draw_arrow("node2","node1", "node5")
draw_arrow("node2","node1", "node6")
draw_arrow("node2","node1", "node7")

// Children of Jules Waltner and Francoise Langevin
draw_arrow("node3","node4", "node9")
draw_arrow("node3","node4", "node10")


function draw_arrow(left_node, right_node, child_node){

  // Define the arrowhead marker variables
  const markerBoxWidth = 20;
  const markerBoxHeight = 20;
  const refX = markerBoxWidth / 2-7;
  const refY = markerBoxHeight / 2-5;
  const markerWidth = markerBoxWidth / 2;
  const markerHeight = markerBoxHeight / 2;
  const arrowPoints = [[0, 0], [0, 10], [10, 5]];

  let left= d3.selectAll("#" + left_node)
  let right= d3.selectAll("#" + right_node)
  let child = d3.selectAll("#" + child_node)
  let avg_x = (Number(left._groups[0][1].getAttribute('x')) + Number(right._groups[0][1].getAttribute('x')))/2
  let x1 = avg_x

  let y1 = left._groups[0][1].getAttribute('y')
  let r = left._groups[0][1].getAttribute('r')

  let x2 = child._groups[0][1].getAttribute('x')
  let y2 = child._groups[0][1].getAttribute('y')

  
  // Source node position of the link must account for radius of the circle
  let linkSource = {
    x: Number(x1),
    y: Number(y1) - Number(r)-Number(10)
  };

  // Target node position of the link must account for radius + arrow width
  let linkTarget = {
    x: Number(x2),
    y: Number(y2) + Number(r) + Number(markerWidth)-Number(95)
  };

  // Define a horizontal link from the first circle to the second
  const link = d3
    .linkVertical()
    .x(d => d.x)
    .y(d => d.y)({
    source: linkSource,
    target: linkTarget
  });


  let arrow_group = svg_tree.append("g")

  // Add the arrowhead marker definition to the svg element
  arrow_group
    .append('defs')
    .append('marker')
    .attr('id', 'arrow')
    .attr('viewBox', [0, 0, markerBoxWidth, markerBoxHeight])
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth)
    .attr('markerHeight', markerBoxHeight)
    .attr('orient', 'auto-start-reverse')
    .append('path')
    .attr('d', d3.line()(arrowPoints))
    .attr('stroke', 'black');


  // Add the link with arrowhead at the end
  arrow_group
    .append('path')
    .attr('d', link)
    .attr('marker-end', 'url(#arrow)')
    .attr('stroke', 'black')
    .attr('fill', 'none');

  return arrow_group.node();
}

//TOOLTIP
//TOOLTIP
//TOOLTIP


let tooltip_width = 184;
let tooltip_height = 155;

// now add the tooltip
let tooltip = svg_tree.append("g")
  .attr("class", "tooltip")
  .attr("id", "tooltip_id")
  .attr("visibility", "hidden")
  .style("z-index", 99);

tooltip.append("rect")
  .attr("fill", "white")
  .attr("opacity", 1)
  .attr("x", 10)
  .attr("y", 10)
  .attr("id", "rectWrap")
  .style("z-index", 99)
  .attr("width", tooltip_width)
  .attr("height", tooltip_height);

let name_line = tooltip.append("text")
  .attr("fill", "black")
  .attr("font-size", "17px")
  .attr("font-weight", "600")
  .attr("font-family", "'Arial', sans-serif")
  .attr("x", 18)
  .attr("y", 36);


let name_line2 = tooltip.append("text")
.attr("fill", "black")
.attr("font-size", "17px")
.attr("font-weight", "600")
.attr("font-family", "'Arial', sans-serif")
.attr("x", 18)
.attr("y", 56);
  
let birth_line = tooltip.append("text")
  .attr("fill", "black")
  .attr("font-size", "17px")
  .attr("font-weight", "300")
  .attr("font-family", "'Arial', sans-serif")
  .attr("x", 18)
  .attr("y", 84);
 

let notes = tooltip.append("text")
.attr("fill", "black")
.attr("font-size", "14px")
.attr("font-weight", "600")
.attr("font-family", "'Arial', sans-serif")
.text("Notes:")
.attr("x", 18)
.attr("y", 110);


let notes_line = tooltip.append("text")
.attr("fill", "black")
.attr("font-size", "14px")
.attr("font-weight", "300")
.attr("font-family", "'Arial', sans-serif")
.attr("x", 18)
.attr("y", 132);


let notes_line2 = tooltip.append("text")
.attr("fill", "black")
.attr("font-size", "14px")
.attr("font-weight", "300")
.attr("font-family", "'Arial', sans-serif")
.attr("x", 18)
.attr("y", 152);

};

visualize();