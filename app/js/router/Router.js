/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Page = require('page');
var DefaultLayout = require('../DefaultLayout.jsx');

  function render(details){
    React.render(
      <DefaultLayout info={details}/>,
      document.getElementById('app')
    );
  };

  Page('/','/home');
  Page('/view','/view/all');

  Page('/home' , function(context){
    render({pageName: "Index"});
  });

  Page('/view',function(context){
    render({pageName: 'View', info: context.params});
  });
  Page('/view/:filter',function(context){
    render({pageName: 'View', info: context.params});
  });


  Page();