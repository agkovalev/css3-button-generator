/*
	Author: Alexey Kovalev
	URL: http://alexeykovalev.com
	Github: @agkovalev
	License: MIT
*/
var mainApp = {

	sliders: function(options){
		var slider = {
			options: {
				selector:			"#slider",
				targetSelector:		"#demo-btn",
				cssProperty: 		"border-radius",
				cssUnits: 			"",
				sliderOptions:		{
					// disabled:boolean(false)
					animate:true,//boolean,string,integer(false)
					max: 50,//integer(100)
					min: 0, //integer(0)
					// orientation:string('horizontal')
					// range:boolean,string(false)
					step: 1,//integer(1)
					// value:integer(0)
					// values:array(null)
				}, 
			},

			setUpModuleListeners: function(){
				$(this.options.selector).on("slidecreate",	$.proxy(this.eventsHandlers.onSlideCreate, this));
				$(this.options.selector).on("slidechange",	$.proxy(this.eventsHandlers.onSlideChange, this));
				$(this.options.selector).on("slide",		$.proxy(this.eventsHandlers.onSlide, this));
				$(this.options.selector).on("slidestart",	$.proxy(this.eventsHandlers.onSlideStart, this));
				$(this.options.selector).on("slidestop",	$.proxy(this.eventsHandlers.onSlideStop, this));
			},

			eventsHandlers: {
				onSlideCreate: function( event, ui ) {
					// console.log(event);
					// console.log("onSlideCreate");
					// console.log(ui);
				},
				onSlideChange: function( event, ui ) {
					// console.log(event);
					// console.log("onSlideChange");
					// console.log(ui);
					mainApp.prepareResults.prepareCss();
					mainApp.prepareResults.prepareSass();
				},
				onSlide: function( event, ui ) {
					// console.log(event);
					// console.log("onSlide");
					// console.log(ui);
					mainApp.demo.triggerEvents.demoCssChanged({
						property:	this.options.cssProperty,
						value:		ui.value + this.options.cssUnits
					});
				},
				onSlideStart: function( event, ui ) {
					// console.log(event);
					// console.log("onSlideStart");
					// console.log(ui);
				},
				onSlideStop: function( event, ui ) {
					// console.log(event);
					// console.log("onSlideStop");
					// console.log(ui);
				}
			},

			init: function(options){
				if(undefined !== options)
					$.extend(true, this.options, options);
				console.log(this.options);
				this.setUpModuleListeners();
				$(this.options.selector).slider(this.options.sliderOptions);
			}
		};
		slider.init(options);
		return slider;
	},

	demo: {
		selector: "#demo-btn",
		$selector: undefined,

		triggerEvents:{
			demoCssChanged: function(data){
				// console.log(data);
				$(mainApp.demo.selector).trigger("demoCssChanged", data);
			},
			demoHtmlChanged: function(data){
				// console.log(data);
				$(mainApp.demo.selector).trigger("demoHtmlChanged", data);
			}
		},

		setUpModuleListeners: function(){
			$(mainApp.demo.selector).on("demoCssChanged", $.proxy(this.onDemoCssChanged, this));
			$(mainApp.demo.selector).on("demoHtmlChanged", $.proxy(this.onDemoHtmlChanged, this));
			$('#btn_text').on("keyup", this.onBtnTextChange);
		},

		onBtnTextChange: function(e){
			// console.log(e);
			mainApp.demo.$selector.text($(this).val());
		},

		onDemoCssChanged: function(e, data){
			// console.log(data);
			this.$selector.css(data.property, data.value);
			this.properties[data.property] = data.value;
			// console.log(this.properties);
		},

		onDemoHtmlChanged: function(e, data){
			console.log(data);
		},

		properties:{},

		init: function(){
			this.$selector = $(this.selector);
			this.setUpModuleListeners();
		}
		
	},

	prepareResults: {
		selectors: {
			css: "#css_out",
			sass: "#sass_out",
			less: "#less_out",
			html: "#html_out",
			haml: "#haml_out",
			jade: "#jade_out",

		},
		setUpModuleListeners: function(){
			
		},

		prepareHtml: function(dataIn, selectorOut){
			if(undefined !== dataIn && undefined !== selectorIn){
				console.log(dataIn);
				console.log(selectorOut);
			}
		},
		prepareCss: function(){
			var $field = $(this.selectors.css).find('textarea'),
				data = mainApp.demo.properties,
				textToInsert = "";
			// console.log(data);
			for (var key in data){
			    // console.log(key +':' + data[key]);
			    textToInsert += (key + ':' + data[key] + ';\n');
			}
			$field.text(textToInsert);
		},
		prepareSass: function(){
			var $field = $(this.selectors.sass).find('textarea'),
				data = mainApp.demo.properties,
				textToInsert = "";
			// console.log(data);
			for (var key in data){
				if(key === 'border-radius')
			    	textToInsert += ('+' + key + '(' + data[key] + ')\n');
			    else{
			    	textToInsert += (key + ':' + data[key] + '\n');
			    }
			}
			$field.text(textToInsert);
		}
	},

	// init modules all or partial
	init: {
		demo: function(){
			mainApp.demo.init();
		},
		sliders: function(){
			mainApp.sliders({
				selector:			'#slider-bradius',
				cssProperty: 		"border-radius",
				cssUnits: 			"px",
				targetSelector:		mainApp.demo.selector
			});
			mainApp.sliders({
				selector:			'#slider-bsize',
				cssProperty: 		"border-width",
				cssUnits: 			"px",
				targetSelector:		mainApp.demo.selector,
				sliderOptions:		{
					min: 0,
					max: 20
				}
			});
			mainApp.sliders({
				selector:			'#slider-fsize',
				cssProperty:		"font-size",
				cssUnits:			"px",
				targetSelector:		mainApp.demo.selector,
				sliderOptions:		{
					min: 10,
					max: 72
				}
			});
		},
		all: function(){
			this.sliders();
			this.demo();
		}
	}

};
(function($, app){

	app.init.all();

})(jQuery, mainApp);