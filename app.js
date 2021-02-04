var data = {};

// Use the D3 library to read in samples.json
d3.json('samples.json').then(function(data) {
  console.log(data);

// Use D3 to select the dropdown menu
var dropdownMenu = d3.select('#selDataset');

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

});

    
