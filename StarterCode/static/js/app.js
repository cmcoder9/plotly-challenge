var data = {};

// Use the D3 library to read in samples.json
d3.json('samples.json').then(function(data) {
  console.log(data);

// Use D3 to select the dropdown menu
var dropdownMenu = d3.select('#selDataset');

  //  Create the Traces
    var trace1 = {
      x: data.samples[0].sample_values.slice(0,10),
      y: data.samples[0].otu_ids,
      hover_data: otu_labels,
      orientation: 'h',
      type: 'bar',
      width: 130 
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
});

    
