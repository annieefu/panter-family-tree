

svg_tree = d3.selectAll("#family_tree");

// set the dimensions and margins of the graph
var treemargin = { top: 10, right: 30, bottom: 30, left: 80 },
  treewidth = 930 - treemargin.left - treemargin.right,
  treeheight = 580 - treemargin.top - treemargin.bottom;

const width = svg_tree.attr("width");
const height = svg_tree.attr("height");

const visualize = async () => {

var data = await d3.json("tree.json");



//Update tooltip
function update_tooltip(){
  tooltip.style("visibility", "visible").style("z-index", 100)
  .attr("transform", "translate(" + (d3.event.pageX-440) + "," + (d3.event.pageY-272) + ")");
  ;

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


function create_node(x, y, first_name, last_name, middle_name, nodeid) {
  console.log(nodeid)
  let new_node = svg_tree.append("g")
    .attr("id", function(){return nodeid})
    .on("mouseover", update_tooltip)
    .on("mouseout", tooltip_mouseout)

  new_node.append("circle")
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 28)
    .style("fill", "#009DE1")

  .style("z-index", 99);
    new_node.append("text")
    .attr("x", x)
    .attr("y", y-43)
    .text(first_name+" "+last_name)
    .style("font-family", "Lato")
    .style("font-weight", 400)
    .style("text-anchor", "middle")
    .style("fill", "black");
    // new_node.append("text")
    // .attr("x", x)
    // .attr("y", y+12)
    // .text(last_name)
    // .style("font-family", "Lato")
    // .style("font-weight", 400)
    // .style("text-anchor", "middle")
    // .style("fill", "white");
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
  .attr("x1", Number(x1)+28)
  .attr("y1", Number(y)-10)
  .attr("x2", Number(x2)-28)
  .attr("y2", Number(y)-10)
  .style("z-index", 1)
  .attr("stroke", "lightgrey")
  .attr("stroke-width", "2")


}

// connection lines

create_node(90, 60, first_name="Nechamah", last_name="Serlin", middle_name="",nodeid="node1");
create_node(215, 60, first_name="Shraga", last_name="Faivel", middle_name="",nodeid="node2");


create_node(490, 60, first_name="Jules", last_name="Waltner", middle_name="",nodeid="node3");
create_node(615, 60, first_name="Françoise", last_name="Langevin", middle_name="",nodeid="node4");

draw_line("node1", "node2")
draw_line("node3", "node4")

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