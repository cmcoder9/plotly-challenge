var data = {};

// Use the D3 library to read in samples.json
d3.json('samples.json').then(function(data) {
  console.log(data);

  // Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// Use D3 to select the dropdown menu
function updatePlotly(){
  var dropdownMenu = d3.select('#selDataset');
  // for (var i = 0; i<data.names.length; i++) {
  //   dropdownMenu.append('option').text(data.names[i]).property('value', data.names[i]);
  // }
  data.names.forEach(name => {
    dropdownMenu.append('option').text(name).property('value', name)
  });
};
updatePlotly();

  // Create the bar chart trace
    var trace1 = {
      x: data.samples[0].sample_values.slice(0,10).reverse(),
      y: data.samples[0].otu_ids.slice(0,10).reverse().map(ids => `otu ${ids}`),
      hover_data: data.samples[0].otu_labels.slice(0,10).reverse(),
      orientation: 'h',
      type: 'bar'
    };

    // Create the data array for the plot
    var bar_data = [trace1];
  
    // Define the plot layout
    var bar_layout = {
        title: 'OTUs Occurance',
        font:{
          family: 'Raleway, sans-serif'
        },
        showlegend: false,
        xaxis: { 
          title: "OTU ID",
          tickangle: -45
        },
        yaxis: {
          title: "Frequency",
          zeroline: false,
          gridwidth: 2
        },
        bargap :0.05
      };
    
      Plotly.newPlot('bar', bar_data, bar_layout);
 //Create a bubble chart that displays each sample.
     //Setup trace for bubble chart 
      var trace2 = {
        //Use otu_ids for the x values.
        x: data.samples[0].otu_ids,

        //Use sample_values for the y values.
        y: data.samples[0].sample_values,

        //Use otu_labels for the text values.
        text: data.samples[0].otu_labels,

        mode:'markers',
        marker: {
          //Use otu_ids for the marker colors.
          color: data.samples[0].otu_ids,
          
          //Use sample_values for the marker size.
          size: data.samples[0].sample_values
        }
      };
// Create the data array for the bubble chart
var bubble_data = [trace2];

// Define the plot layout for the bubble chart
  var layout2 = {
    title: "Bacteria population for each OTU",
    xaxis: {title: "OTU ID"},
    yaxis: {title: "Frequency"}
  };  

// Use plotly to plot the bubble chart
  Plotly.newPlot("bubble", bubble_data, layout2);

//Display the sample metadata, i.e., an individual's demographic information.
// Build the demographic info table using the map function and arrow
var sampIds = data.metadata.map(item => item.id);
var ethnicityData = data.metadata.map(item => item.ethnicity);
var genderData = data.metadata.map(item => item.gender);
var ageData = data.metadata.map(item => item.age);
var locationData = data.metadata.map(item => item.location);
var bbtypeData = data.metadata.map(item => item.bbtype);
var wfreqData = data.metadata.map(item => item.wfreq);

//Display each key-value pair from the metadata JSON object somewhere on the page.
function displayPanel(){
  var panel=d3.select('#sample-metadata');
  metaList=Object.entries(data.metadata[0]);
  metaList.forEach(kvp=>{
    panel.append('p').text(`${kvp[0]}-${kvp[1]}`)
  });
};
displayPanel();
//Gauge
var wfData = [
  {
    type: "indicator",
    mode: "gauge+number+delta",
    value: wfreqData,
    title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
    delta: { reference: 400, increasing: { color: "RebeccaPurple" } },
    gauge: {
      axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
      ba: { color: "darkblue" },
      bgcolor: "white",
      borderwidth: 1,
      bordercolor: "gray",
      steps: [
        { range: [0,1], color: "#f7ffe6"},
        { range: [1,2], color: "#e6ffb3" },
        { range: [2,3], color: "#d5ff80" },
        { range: [3,4], color: "#c4ff4d" },
        { range: [4,5], color: "#b3ff1a" },
        { range: [5,6], color: "#99e600" },
        { range: [6,7], color: "#77b300" },
        { range: [7,8], color: "#558000" },
        { range: [8,9], color: "#223300"}
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: wfreqData
      }
    }
  }
];

var gLayout = {
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "lavender",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('gauge', wfData, gLayout);

});

function optionChanged(selected){
  console.log(selected);
  // displayPanel(selected);
  // updateBar(selected);
};
