
// Use the D3 library to read in samples.json
d3.json("samples.json").then((samples) => {
    //  Create the Traces
    var trace1 = {
      x: samples.sample_values,
      y: samples.otu_ids,
      type: "bar",
      orientation: 'h',
    };
  
    // Create the data array for the plot
    var data = [trace1];
  
    // Define the plot layout
    var layout = {
        title: 'Top 10 OTUs',
        font:{
          family: 'Raleway, sans-serif'
        },
        showlegend: false,
        xaxis: {
          tickangle: -45
        },
        yaxis: {
          zeroline: false,
          gridwidth: 2
        },
        bargap :0.05
      };
      
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");


      Plotly.newPlot('bar', data, layout);

    
};
