
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
        default: ['#ffffff', '#06f', '#00363d', '#17494d', '#498283', '#bdd9d7', '#aecfc2', '#d1e8df', '#edf8f4', '#f5fcfc'],
        order: 1,
        section: "Style",
      },

      color_title: {
        type: 'array',
        label: 'Tiles Background Color',
        display: 'colors',
        default: ['#0d6efd', '#6610f2', '#6f42c1', '#d63384', '#dc3545', '#fd7e14', '#ffc107', '#20c997', '#0dcaf0'],
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

    hideTitle: {
      type: "boolean",
      label: "Hide Title",
      default: false,
      order: 4,
      section: "Style",
    },

      writeTitle: {
        type: "string",
        label: "Write Title Text Instead",
        default: "",
        order: 5,
        section: "Style",
      },


      fontColor: {
      type: "string",
      label: "Font Color",
      default: "#000",
      display: "text",
      placeholder: "#000",

      order: 6,
      section: "Style",
    },


    topFont: {
    type: "string",
    label: "Top Font Size",
    default: "19px",
    display: "text",
    placeholder: "19px",

    order: 7,
    section: "Style",
  },

  bottomFont: {
  type: "string",
  label: "Bottom Font Size",
  default: "24px",
  display: "text",
  placeholder: "24px",

  order: 8,
  section: "Style",
},

          topWeight: {
              type: "string",
               label: "Top Font Weight",
               default: "400",
               display: "text",
               placeholder: "400",
               section: "Style",
               order: 9,
             },

             bottomWeight: {
                 type: "string",
                  label: "Bottom Font Weight",
                  default: "500",
                  display: "text",
                  placeholder: "500",
                  section: "Style",
                  order: 10,
                },

                bodyStyle: {
                    type: "string",
                    label: "Choose Font",
                    display: "select",
                    values: [{ "Roboto": "'Roboto'" } , { "Open Sans": "'Open Sans'" }, {"Montserrat" : "'Montserrat'"}],
                    section: "Style",
                    default: "'Roboto', sans-serif;",
                    order: 11,
                  },

                  columnsToHide: {
                      type: "string",
                     label: "Columns to Hide (use comma as delimiter)",
                     default: "",
                     display: "text",
                     section: "Style",
                     order: 12,
                  },



                  bottomTitle: {
                    type: "boolean",
                    label: "Change Title to Bottom",
                    default: false,
                    order: 15,
                    section: "Style",
                  },

                  reverse: {
                    type: "boolean",
                    label: "Reverse the Bubble",
                    default: false,
                    order: 16,
                    section: "Style",
                  },




     fixedHeight: {
      type: "boolean",
      label: "Table Fixed Height",
      default: true,
      order: 17,
      section: "Style",
    },

    hidePag: {
     type: "boolean",
     label: "Hide Pagination",
     default: true,
     order: 18,
    section: "Style",
    },
    unsetTable: {
     type: "boolean",
     label: "Make Table Column Width Unset",
     default: true,
     order: 19,
     section: "Style",
    },

    removeScroll: {
     type: "boolean",
     label: "Remove Scroll and Auto Fit",
     default: false,
     order: 20,
     section: "Style",
    },


    border: {
     type: "boolean",
     label: "Remove Border",
     default: false,
     order: 21,
      section: "Style",
    },






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
