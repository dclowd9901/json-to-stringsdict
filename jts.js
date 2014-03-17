#! /usr/bin/env node

var HEADER_CONST = '<?xml version="1.0" encoding="UTF-8"?>' + 
                   '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">' + 
                   '<plist version="1.0">' + 
                   '<dict>';
var FOOTER_CONST = '</dict>' + 
                   '</plist>';

var fs = require('fs');
var _  = require('lodash');

// $ jts sample.json ([FILENAME])

var JsonToStringdict = function(options) {

  var outputFilepath = options[3] || 'Localizable.stringsdict';

  return {
    initialize: function() {
      _.bindAll(this);
      fs.readFile(options[2],{encoding: 'utf8'}, this.onFileRead);
    },

    onFileRead: function(err, data) {
      if (err) throw err;
      
      var dict = JSON.parse(data);
      var output = '';

      output += HEADER_CONST;
      output += this.objectToXml(dict);
      output += FOOTER_CONST;

      this.toFile(output);
    },

    objectToXml: function(obj) {
      var layer = '';

      for (var key in obj) {
        if(_.has(obj, key)) {
          layer += '<key>' + key + '</key>';

          if (_.isObject(obj[key])) {
            layer += '<dict>';
            layer += this.objectToXml(obj[key]);
            layer += '</dict>';
          } else {
            layer += '<string>' + obj[key] + '</string>';
          }
        }
      }

      return layer;
    },

    toFile: function(content) {
      fs.writeFile(outputFilepath, content, {
        encoding: 'utf8'
      });
    }
  };
}

var jts = new JsonToStringdict(process.argv);
jts.initialize();