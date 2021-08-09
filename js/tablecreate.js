
/*
File: tablecreate.js
Javascript for creating a table give the min and max column sizes with jQuery verification
Michael Batbouta, UMass Lowell Computer Science, Michael_batbouta@student.uml.edu
Copyright (c) 2021 by Wenjin. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Michael Batbouta on August 8, 2021 at 9:30 pm

references
https://stackoverflow.com/questions/17548520/dynamically-adding-a-tab-on-button-click
https://www.lidorsystems.com/support/articles/jquery/tabstrip/tab-strip-add-remove.aspx

*/

$(document).ready(function() {
//min and max functions for verification
$.validator.addMethod('lessThan', function (value, element, param) {
  return this.optional(element) || parseInt(value) <= parseInt($(param).val());
}, 'Invalid value');
$.validator.addMethod('greaterThan', function (value, element, param) {
  return this.optional(element) || parseInt(value) >= parseInt($(param).val());
}, 'Invalid value');
//function to not accept decimals
$.validator.addMethod("noDecimal", function(value, element) {
  return !(value % 1);
}, "No decimal numbers");

  $("#dynamicCheck").validate({
    rules: {
      minCol:
      {
          required: true,
          number: true,
          lessThan: '#maxCol',
          noDecimal: '#minCol'
      },
      maxCol:
      {
          required: true,
          number: true,
          greaterThan: '#minCol',
          noDecimal: '#maxCol'
      },
      minRow:
      {
          required: true,
          number: true,
          lessThan: '#maxRow',
          noDecimal: '#minRow'
      },
      maxRow:
      {
          required: true,
          number: true,
          greaterThan: '#minRow',
          noDecimal: '#maxRow'
      }
  },
  messages: {
    minCol: {lessThan: 'Must be less than max column size.'},
    maxCol: {greaterThan: 'Must be greater than min column size.'},
    minRow: {lessThan: 'Must be less than max row size.'},
    maxRow: {greaterThan: 'Must be greater than min row size.'}
  },

  });

  //how the page auto updates and checks validation each time around
  $('#minCol').change(function(e) {
    if($('#minCol').valid() && $('#maxCol').valid() && $('#minRow').valid() && $('#maxRow').valid()){
      addTable()
    }
  })
  $('#maxCol').change(function(e) {
    if($('#minCol').valid() && $('#maxCol').valid() && $('#minRow').valid() && $('#maxRow').valid()){
      addTable()
    }
  })
  $('#minRow').change(function(e) {
    if($('#minCol').valid() && $('#maxCol').valid() && $('#minRow').valid() && $('#maxRow').valid()){
      addTable()
    }
  })
  $('#maxRow').change(function(e) {
    if($('#minCol').valid() && $('#maxCol').valid() && $('#minRow').valid() && $('#maxRow').valid()){
      addTable()
    }
  })


});

//same function used in homework 3 to add the table
function addTable() {
  var myTableDiv = document.getElementById("myDynamicTable");
  var table = document.createElement('TABLE');
  let mincol = document.getElementById("minCol").value;
  let minrow = document.getElementById("minRow").value;
  let maxcol = document.getElementById("maxCol").value;
  let maxrow = document.getElementById("maxRow").value;

  myTableDiv.innerHTML = "";
  table.border = '1';

  var tableBody = document.createElement('TBODY');
  table.appendChild(tableBody);

  for (var i = minrow-1; i <= maxrow; i++) {
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    if(i == minrow-1){
      for (let j = mincol-1; j <= maxcol; j++) {
        /*do the first row different then the rest */
        if(j == mincol-1){
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode(" "));
          tr.appendChild(td);
        }
        else{
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode(j));
          tr.appendChild(td);
        }
      }
    }
    else{
      for (let j = mincol-1; j <= maxcol; j++) {
        if(j == mincol- 1){
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode(i));
          tr.appendChild(td);
        }else{
          var td = document.createElement('TD');
          td.width = '75';
          td.appendChild(document.createTextNode(i * j));
          tr.appendChild(td);
        }

      }
    }

  }
  myTableDiv.appendChild(table);
}