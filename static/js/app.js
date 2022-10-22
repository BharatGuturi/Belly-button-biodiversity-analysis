
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let jsondata;

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    addingDropdownMenu(data);
    jsondata = data;
});

// Adding Dropdown Menu
function addingDropdownMenu(data) {
    let names = data['names'];
    let dropdownMenu = d3.select("#selDataset");
    dropdownMenu.append('option').text('select');
    names.forEach(element => {
        var options = dropdownMenu.append('option').text(element);
    });
}


// Function containing all the graphs on the page
function fetchOTUdetails(id) {
    let filterdata = jsondata['samples'].filter(x => x.id === id);
    let metaData = jsondata['metadata'].filter(x => x.id === id);
    //console.log(filterdata);
    plotOTUdetails(filterdata);
    plotBubbleChart(filterdata);
    demographicInfo(id);
    washingFreq(id);

}


//Plotting Horizontal Bar chart
function plotOTUdetails(arr) {
    let sliced_otu_ids = arr[0]['otu_ids'].slice(0, 10);
    let string_sliced_otu_ids = sliced_otu_ids.map(x => "OTU " + x).reverse();
    let sliced_otu_labels = arr[0]['otu_labels'].slice(0, 10).reverse();
    let sliced_sample_values = arr[0]['sample_values'].slice(0, 10).reverse();
    //console.log(sliced_otu_ids, sliced_otu_labels);

    let data_plot = [{
        x: sliced_sample_values,
        y: string_sliced_otu_ids,
        type: "bar",
        orientation: 'h',
        text: sliced_otu_labels
    }];

    

    Plotly.newPlot("bar", data_plot);
}


//Plotting Bubble chart
function plotBubbleChart(arr) {
    let trace1 = {
        x: arr[0]['otu_ids'],
        y: arr[0]['sample_values'],
        mode: 'markers',
        marker: {
            size: arr[0]['sample_values'],
            color: arr[0]['otu_ids']
        }
    };

    let data = [trace1];

    let layout = {
        title: 'Bubble chart for ID',

        showlegend: false,
        
        xaxis: {
            title: 'OTU_ID'
        },
    };

    

    Plotly.newPlot('bubble', data, layout);
}


//Updating demographic table
function demographicInfo(id){
    let metaData = jsondata['metadata'].filter(x => x.id == id);
    d3.selectAll("#sample-metadata>h6").remove();
    for (let x in metaData[0]) {
        d3.select("#sample-metadata")
            .append("h6")
            .text(x +": " +metaData[0][x]);
      }
      
}

// Plotting the gauge for Washing frequency
function washingFreq(id){
    let metaData_2 = jsondata['metadata'].filter(x => x.id == id);
    let value = metaData_2[0].wfreq;
    let traceGauge = {
        type: 'pie',
        showlegend: false,
        hole: 0.4,
        rotation: 90,
        values: [ 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81/9, 81],
        text: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
        direction: 'clockwise',
        textinfo: 'text',
        textposition: 'inside',
        marker: {
          colors: ['#E8F8F5','#D1F2EB','#A3E4D7','#76D7C4','#48C9B0','#1ABC9C','#17A589','#148F77','#117864','white'],
          labels: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
          hoverinfo: 'label'
        }
      }
    
     // needle
     let radius = .2;
     let degrees = value*20;
     let radians = degrees * Math.PI / 180;
     let x =  -1*radius * Math.cos(radians);
     let y = radius * Math.sin(radians);
 
     let gaugeLayout = {
       shapes: [{
         type: 'line',
         x0: 0.5,
         y0: 0.5,
         x1: 0.5+x,
         y1: 0.475+y,
         line: {
           color: 'red',
           width: 3
         }
       }],
       title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
       xaxis: {visible: false, range: [-1, 1]},
       yaxis: {visible: false, range: [-1, 1]}
     }
 
     let dataGauge = [traceGauge];
     
     Plotly.newPlot('gauge', dataGauge, gaugeLayout)

}


// Function to update the page when option is changed
function optionChanged(value) {
    fetchOTUdetails(value);
}

