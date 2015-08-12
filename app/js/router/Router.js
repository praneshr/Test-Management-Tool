/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Page = require('page');
var DefaultLayout = require('../DefaultLayout.jsx');

  function render(details){
    console.log('in');
    React.render(
      <DefaultLayout info={details}/>,
      document.getElementById('app')
    );
  };

  // Page('/' , function(context){
  //   render({pageName: "Index"});
  // });
  Page('/view',function(context){
    render({pageName: 'View', info: context});
  });
  Page('/view/:filter',function(context){
    render({pageName: 'View', info: context});
  });


  Page();