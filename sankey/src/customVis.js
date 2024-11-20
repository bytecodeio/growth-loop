import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am5flow from "@amcharts/amcharts5/flow";
import * as $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";


looker.plugins.visualizations.add({

  create: function (element, config) {},

  updateAsync: function (data, element, config, queryResponse, details, done) {


          const { measure_like: measureLike } = queryResponse.fields;
            const { dimension_like: dimensionLike } = queryResponse.fields;

            const dimensions1 = dimensionLike.map((dimension) => ({
              label: dimension.label_short ?? dimension.label,
              name: dimension.name

            }));


            const measures1 = measureLike.map((measure) => ({
              label: measure.label_short ?? measure.label,
              name: measure.name,
            }));


            const fieldOptions = [...dimensions1, ...measures1].map((dim) => ({
              [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
            }));


            const fieldOptions2 = [...dimensions1, ...measures1].map((dim) => ({
              [dim.label]: dim.label
            }));


            const configOptions  = {
              writeTitle: {
                type: "string",
                label: "Write Title",
                default: "Sankey Viz",
                placeholder: "Sankey Viz",
                order: 0,
                section: "Style",

              },

               textSize: {
               type: "string",
                label: "Title Font Size",
                default: "20px",
                display: "text",
                placeholder: "20px",
                section: "Style",
                order: 2,
              },

              align: {
                type: "string",
                label: "Title Alignment",
                display: "select",
                values: [{ "Left": "justify-content-start" } , { "Center": "justify-content-center" }, {"Right" : "justify-content-end"}],
                section: "Style",
                default: "Left",

                order: 3,
                section: "Style",

              },

              titleColor: {
                type: "string",
                label: "Title Color",
                default: "#000000",
                display: "text",
                placeholder: "#000000",

                order: 4,
                section: "Style",

              },

              bodyStyle: {
                type: "string",
                label: "Choose Font",
                display: "select",
                values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}, {"IBM Plex Sans" :  "'IBM Plex Sans'"}],
                section: "Style",
                default: "'Roboto', sans-serif;",
                order: 5,
                },

                side: {
                  type: "boolean",
                  label: "Hide Title",
                  default: false,
                  order: 6,
                  section: "Style",
                },


                weight: {
                  type: "string",
                  label: "Font Weight Title and Chart",
                  default: "500",
                  display: "text",
                  placeholder: "500",
                  section: "Style",
                  order: 7,
                },



                color1: {
                type: 'array',
                label: 'Array of Colors for Chart',
                display: 'colors',
                default: ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14', '#ffc107', '#20c997', '#0dcaf0'],
                order: 9,
                section: "Style",
                },



                opacity: {
                  type: "string",
                  label: "Fill Opacity (.1 through 1)",
                  default: ".8",
                  display: "text",
                  placeholder: ".8",
                  section: "Style",
                  order: 10,
                },

                nodeWidth: {
                  type: "string",
                  label: "Change Node Width (1 and up)",
                  default: "5",
                  display: "text",
                  placeholder: "5",
                  section: "Style",
                  order: 11,
                },

                nodeStroke: {
                  type: "boolean",
                  label: "Add Node Stroke",
                  default: false,
                  order: 12,
                  section: "Style",
                },

                nodeStrokeColor: {
                  type: "string",
                  label: "Change Node Stroke Color",
                  default: "000000",
                  display: "text",
                  placeholder: "000000",

                  order: 13,
                  section: "Style",

                },

                nodeStrokeWidth:{
                  type: "string",
                  label: "Change Node Width (1 and up)",
                  default: "1",
                  display: "text",
                  placeholder: "1",
                  section: "Style",
                  order: 14,

                },




                //
                // firstCol: {
                //   label: "Choose Dimension 1",
                //   type: "string",
                //   display: "select",
                //   default: "",
                //   values: [{ none: "None" }, ...fieldOptions],
                //
                //   order: 0,
                //   section: "Values",
                // },
                //
                // secondCol: {
                //   label: "Choose Dimension 2",
                //   type: "string",
                //   display: "select",
                //   default: "",
                //   values: [{ none: "None" }, ...fieldOptions],
                //
                //   order: 1,
                //   section: "Values",
                // },
                //
                //
                // measureCol: {
                //   label: "Choose Measure",
                //   type: "string",
                //   display: "select",
                //   default: "",
                //   values: [{ none: "None" }, ...fieldOptions],
                //
                //   order: 2,
                //   section: "Values",
                // },


            }

  const lookerVis = this;
 lookerVis.trigger("registerOptions", configOptions);

 const hasOneDimension = queryResponse.fields.dimensions.length === 2;
 const hasOneMeasure = queryResponse.fields.measures.length === 1;
 const isMeasureNumeric = queryResponse.fields.measures[0]?.is_numeric;

 if (!hasOneDimension || !hasOneMeasure) {
   this.addError({
     title: "Incompatible Data",
     message: "This chart requires two dimensions and one measure.",
   });
   return;
 }








  const dimensionName = queryResponse.fields.dimensions[0].name;
  const dimensionValues = data.map((row) => `${row[dimensionName].value}`);

  const dimensionName1 = queryResponse.fields.dimensions[1].name;
  const dimensionValues1 = data.map((row) => `${row[dimensionName1].value}`);

  const measureName = queryResponse.fields.measures[0].name;
  const measureValues = data.map((row) => row[measureName].value);


  let first = config.firstCol
  let second = config.secondCol
  let measureCol = config.measureCol



    element.innerHTML = "";
    element.innerHTML = `
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');


      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,100;1,700&display=swap');
         body{
          font-family: ${config.bodyStyle ? config.bodyStyle : "'Roboto'"};
          font-weight:${config.weight || "300"};

         }
        #chartdiv {
          padding-top:0em;
          width: 100%;
         height: 500px;


        overflow: visible;
        font-family: ${config.bodyStyle ? config.bodyStyle : "'Roboto'"};

          }

         #vis {
          height: 100%;
          width: 100%;
          margin-top: 0px;
          border: none;
          display: flex;

          position:relative;
          flex-direction: column;
         }

         .dFlex{
           display:flex;
           flex-direction:column;
           align-items:center;
           justify-content:center;
         }

         .dFlex p {
           margin:0 !important
         }

         p.textSize1{
           font-size:${config.textSize || "50px"};

           line-height:1
         }

         p.textSize2{
           font-size:${config.textSize2 || "30px"};

         }
         .abso {
            position: absolute;
            top:0;
            display:${config.side ? "block" : "none"}

        }

        foreignObject{
          overflow: visible;
        }

        .d-flex{
          display:flex
        }
        .justify-content-start{
          justify-content:flex-start
        }

        .justify-content-center{
          justify-content:center
        }

        .justify-content-end{
          justify-content:flex-end
        }

        p{

          font-family: ${config.bodyStyle ? config.bodyStyle : "'Roboto'"};
          font-weight: ${config.weight ? config.weight : "500"};
          font-size: ${config.textSize ? config.textSize : "24px"};
          color: ${config.titleColor ? config.titleColor : "#000000"};
          display:${config.side ? "none" : "flex"};
          margin:.25rem 0em;
        }



      </style>
    `;



var visContainer = document.createElement('div');




const titleClass = config.align ? `d-flex ${config.align}` : 'd-flex justify-content-start';

$('#vis').append(`<div class="${titleClass}"><p>${config.writeTitle ? config.writeTitle : "Sankey Viz"}</p></div>`);

visContainer.setAttribute("id", "chartdiv");
element.append(visContainer)

var root = am5.Root.new("chartdiv");
root._logo.dispose();

root.setThemes([
  am5themes_Animated.new(root)
]);




var series = root.container.children.push(am5flow.Sankey.new(root, {
  sourceIdField: "from",
  targetIdField: "to",
  valueField: "value",
  paddingRight: 100,
  paddingLeft: 10,
  nodeWidth: config.nodeWidth ? config.nodeWidth : 5,

}));


series.nodes.labels.template.setAll({
  fontSize: 15,
  maxWidth: 150,
  oversizedBehavior: "wrap",
  fontWeight: config.weight ? config.weight : "500",
  fontFamily: config.bodyStyle ? config.bodyStyle : '"Roboto", sans-serif',

});




const seriesData = dimensionValues.map((fromValue, index) => ({
  from: fromValue,
  to: dimensionValues1[index],
  value: measureValues[index],


}));




series.links.template.setAll({
  fillStyle: "gradient"
});

// let newColor = config.nodeStrokeColor ? am5.color(parseInt(config.nodeStrokeColor, 16)) : am5.color(0x000000);
//

//
// let originalColor = am5.color(0x000000)
//
//
// var nodeStrokeColor = config.nodeStrokeColor ? newColor  : am5.color(0x000000);
//
// console.log(nodeStrokeColor)
//
// console.log(config.nodeStroke)

series.nodes.rectangles.template.setAll({
  fillOpacity: config.opacity ? config.opacity : .8,
  stroke: config.nodeStroke ? am5.color(parseInt(config.nodeStrokeColor || '000000', 16)) : 0,
  strokeWidth: config.nodeStroke ? config.nodeStrokeWidth : 1,

  // stroke: config.nodeStroke ? config.nodeStroke : 0,
  // stroke:config.nodeStrokeColor ? am5.color(parseInt(config.nodeStrokeColor, 16)) : am5.color(0x000000);
  // stroke: am5.color(0x000000),
  // strokeWidth: 1,
  // cornerRadiusTL: 4,
  // cornerRadiusTR: 4,
  // cornerRadiusBL: 4,
  // cornerRadiusBR: 4
});


series.data.setAll(seriesData);
series.appear(1000, 100);



  // chart.events.on("hit", function(event, elements, chart) {
  //
  //     console.log("Chart background clicked");
  //
  //     console.log("event", event);
  //     console.log("elements", elements[0]);
  //     console.log("chart", chart);
  //
  //       if (!elements.length) return;
  //
  //       const { datasetIndex, index: dataIndex } = elements[0];
  //
  //
  //         const measureLinks = data[dataIndex][measureName].links ?? [];
  //         const dimensionLinks = (data[dataIndex][dimensionName].links) ?? [];
  //
  //
  //       lookerCharts.Utils.openDrillMenu({
  //         links: [...measureLinks, ...dimensionLinks],
  //         event: event.native,
  //       });
  //
  // });



  done();
},
});
