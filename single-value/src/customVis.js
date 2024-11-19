
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CustomTable } from "./CustomTable";
import PaginationComponent from "./PaginationComponent";

looker.plugins.visualizations.add({
  create: function (element, config) {

  },

updateAsync: function (data, element, config, queryResponse, details, done) {

const { dimension_like: dimensionLike } = queryResponse.fields;

const dimensions = dimensionLike.map((dimension) => ({
   label: dimension.label_short ?? dimension.label,
   name: dimension.name


 }));



 const { measure_like: measureLike } = queryResponse.fields;


 const measures = measureLike.map((measure) => ({
   label: measure.label_short ?? measure.label,
   name: measure.name,
 }));



 const fieldOptions = [...dimensions, ...measures].map((dim) => ({
     [dim.label]: queryResponse.data.map(row => row[dim.name].value).join(",")
   }));

console.log(data, "data api response")

    const options = {

      textTitle: {
        type: "string",
        label: "Choose Title from Dropdown",
        display: "select",
        placeholder: "Please Select",
        values: fieldOptions,
        order: 0,
        default:"Please Select",
        section: "Style",
      },

      backgroundViz: {
        type: 'array',
        label: 'Background Color',
        display: 'colors',
        default: ['#06f', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
        order: 1,
        section: "Style",
      },

      color_title: {
        type: 'array',
        label: 'Tiles Background Color',
        display: 'colors',
        default: ['#fff','#06f', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
        order: 2,
        section: "Style",
      },




      titleColor: {
      type: "string",
      label: "Title Color",
      default: "#fff",
      display: "text",
      placeholder: "#fff",

      order: 3,
      section: "Style",
    },

      writeTitle: {
        type: "string",
        label: "Write Title Text Instead",
        default: "",
        order: 4,
        section: "Style",
      },


      fontColor: {
      type: "string",
      label: "Font Color",
      default: "#000",
      display: "text",
      placeholder: "#000",

      order: 5,
      section: "Style",
    },


    topFont: {
    type: "string",
    label: "Top Font Size",
    default: "19px",
    display: "text",
    placeholder: "19px",

    order: 6,
    section: "Style",
  },

  bottomFont: {
  type: "string",
  label: "Bottom Font Size",
  default: "24px",
  display: "text",
  placeholder: "24px",

  order: 6,
  section: "Style",
},

     //  tableBordered: {
     //   type: "boolean",
     //   label: "Hide Header",
     //   default: false,
     //   order: 5,
     //   section: "Style",
     // },

           // toolOn: {
           //   type: "boolean",
           //   label: "Turn on Tooltip for Title",
           //   default: false,
           //   order: 6,
           //     section: "Style",
           // },
           //
           // writeTooltip: {
           //   type: "string",
           //   label: "Write Tooltip Text",
           //   default: "",
           //   order: 7,
           //  section: "Style",
           // },

     fixedHeight: {
      type: "boolean",
      label: "Table Fixed Height",
      default: true,
      order: 8,
      section: "Style",
    },

    hidePag: {
     type: "boolean",
     label: "Hide Pagination",
     default: true,
     order: 9,
    section: "Style",
    },
    unsetTable: {
     type: "boolean",
     label: "Make Table Column Width Unset",
     default: true,
     order: 10,
     section: "Style",
    },

    removeScroll: {
     type: "boolean",
     label: "Remove Scroll and Auto Fit",
     default: false,
     order: 10,
     section: "Style",
    },
    // removeScroll5: {
    //  type: "boolean",
    //  label: "Remove Scroll and Fit 5",
    //  default: false,
    //  order: 10,
    //  section: "Style",
    // },
    //
    // removeScroll6: {
    //  type: "boolean",
    //  label: "Remove Scroll and Fit 6",
    //  default: false,
    //  order: 10,
    //  section: "Style",
    // },

    //
    // removeBars: {
    //  type: "boolean",
    //  label: "Center Small Table",
    //  default: false,
    //  order: 5,
    // },

    // index: {
    //  type: "boolean",
    //  label: "Show Row Index",
    //  default: true,
    //  order: 11,
    //   section: "Style",
    // },

    border: {
     type: "boolean",
     label: "Remove Border",
     default: false,
     order: 12,
      section: "Style",
    },




      bodyStyle: {
          type: "string",
          label: "Choose Font",
          display: "select",
          values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}],
          section: "Style",
          default: "'Roboto', sans-serif;",
          order: 29,
        },
        hideTitle: {
          type: "boolean",
          label: "Hide Title",
          default: false,
          order: 30,
          section: "Style",
        },

        bottomTitle: {
          type: "boolean",
          label: "Change Title to Bottom",
          default: false,
          order: 31,
          section: "Style",
        },

        // tableFontSize: {
        //    type: "string",
        //    label: "Table Font Size",
        //    default: "12px",
        //    display: "text",
        //    placeholder: "12px",
        //    section: "Style",
        //    order: 31,
        //  },

        columnsToHide: {
            type: "string",
           label: "Columns to Hide (use comma as delimiter)",
           default: "",
           display: "text",
           section: "Style",
           order: 32,
        },

        //
        // short: {
        //
        // type: "string",
        //  label: "Choose Cell Size",
        //   default: "200px",
        //   display: "text",
        //   placeholder: "200px",
        //   order: 13,
        //   section: "Style",
        // },



        // freeze: {
        //  type: "boolean",
        //  label: "Freeze First 2 Columns",
        //  default: false,
        //  order: 14,
        //   section: "Style",
        // },
        //
        // freeze3: {
        //  type: "boolean",
        //  label: "Freeze First 3 Columns",
        //  default: false,
        //  order: 15,
        //   section: "Style",
        // },
        //
        // wrapText: {
        //  type: "boolean",
        //  label: "Wrap Text",
        //  default: false,
        //  order: 16,
        //   section: "Style",
        // },




  };




 this.trigger("registerOptions", options);

    ReactDOM.render(

      <CustomTable
        data={data}
        config={config}
        queryResponse={queryResponse}
        details={details}
        done={done}
      />

      ,

      element
    );

  done()
  },
});
