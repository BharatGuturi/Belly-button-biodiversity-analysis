# Belly button biodiversity analysis
Building an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogues the microbes that colonise human navels.
I have built an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Github Link:
https://bharatguturi.github.io/Belly-button-biodiversity-analysis/

## Steps:
Here are the steps that I followed:
1.	Used D3 library to read in samples.json and add the id in a dropdown that can used to select different ID's
 
2.	Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual. used the following values from the JSON file for the charts:
a) sample_values as the values for the bar chart.
b) otu_ids as the labels for the bar chart.
c) otu_labels as the hovertext for the chart.
 
3.	Created a bubble chart that displays each sample (data from JSON)
a) otu_ids for the x values.
b) sample_values for the y values.
c) sample_values for the marker size.
d) otu_ids for the marker colors.
e) otu_labels for the text values.

4.  Displayed the sample metadata, i.e., an individual's demographic information.

5.  Displayed the washing frequency of belly button in a Gauge Chart and this will be updated whenever a new sample is selected.

6.  Updated all of the plots any time that a new sample is selected.

7.  The webpage with all the data is displayed in different charts.

References:
Hulcr, J. et al.(2012) A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable. Retrieved from: http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/



 



