/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.preload_images();
        this.set_picture();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      

      var orientation = "";
      if(orientationChange() == 'portrait')
        orientation = "horizontal";
      else
         orientation = "vertical";
   
      $("#picture img").panzoom();

      $( "#slider" ).slider({
        min: 3,
        step: 3,
        max: 72,
        orientation: orientation,
        slide: function( event, ui ) {
          app.set_picture(ui.value);

        }
      });

    },
    
    
    preload_images: function(){
      var images = [];
      
      for (i = 3; i <= 72; i = i + 3) { 
        offset = i.toString();
        img = app.concat_imgurl(offset);
        images.push(img);
      }
   
      //with events
      $({}).imageLoader({
          images: images,
          async: true,
      
          allcomplete: function(e, ui) {
            $("#ajax-loader").remove();
          }
      });
    },
    
    set_picture: function(offset){
      
      url = app.concat_imgurl(offset);
      $("#selected_offset").html(offset);
      
      $("#picture img").prop('src', url);
    },
    
    concat_imgurl: function(offset){
      if (offset==undefined)
        offset = 3; 
      
      offset = offset.toString();
      if (offset.length == 1)
        offset = "0"+offset;
      url = "http://prognoza.hr/aladinHR/web_uv10_SPLI_"+offset+".gif";
      return url;
    },
    
    
    
    

};


function orientationChange(e) {
    var orientation="portrait";
    if(window.orientation == -90 || window.orientation == 90) orientation = "landscape";
    return orientation;
}


$(window).on('orientationchange', function () {
  if(orientationChange() == 'portrait'){
    $( "#slider" ).slider({orientation: "horizontal"});
  } else {
    $( "#slider" ).slider({orientation: "vertical"});
  }
});
