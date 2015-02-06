// ==UserScript==
// @name         Youtube Checkpoint
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       AhmadZuhdi
// @require		 http://code.jquery.com/jquery-2.1.3.min.js
// @require 	 https://raw.github.com/lodash/lodash-compat/3.1.0/lodash.min.js
// @match        https://www.youtube.com/watch*
// @grant        none
// ==/UserScript==

(function(){

    var app = {}
    
    app.data = {}
    
    app.get = {}
    
    app.init = function() {
        
        if(!localStorage) {
            
            console.log('current browser is not suppot localstorage')
         
            return false
            
        }
        
        app.start()
        
    }
    
    app.start = function() {
     
        app.youtube = document.getElementById("movie_player");
      	
        if(!localStorage.getItem('ytcp')) {
         
            console.log('cannot get localstorage')
            
            localStorage.setItem('ytcp', JSON.stringify({}))
            
        } else {
         
            console.log('localstorage available')
            
            app.data = JSON.parse(localStorage.getItem('ytcp'))
            
        }
        
        app.createGet()
        
        app.checkCurrentCheckPoint()
        
        app.createCloseListener()
        
    }
    
    app.createGet = function() {
        
        var url = window.location.search
        
        url = url.replace('?', '')
        
        _.each(url.split('&'), function(value, key){
        
            var get = value.split('=')
            
            app.get[get[0]] = get[1]
            
        })
        
    }
    
    app.checkCurrentCheckPoint = function() {
        
        if(app.data[app.get.v]){
            
         	window.location.hash = 't=' +  app.data[app.get.v]
            
        }
        
    }
    
    app.createCloseListener = function () {
        
        window.onbeforeunload = function() {
            
			app.data[app.get.v] = app.youtube.getCurrentTime()
            
         	localStorage.setItem('ytcp', JSON.stringify(app.data))
            
            // return 'test'
            	
        }
        
    }
    
    app.init()
	
})()
