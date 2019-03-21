(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.silRatio = {})));
}(this, (function (exports) { 'use strict';

	//

	/* eslint-disable */
	var script = {
		bind: function(el, binding) {
			var getCoords = function(elem) {
				// Get the element settings
				var box = elem.getBoundingClientRect();

				// Get scroll position
				var scroll = {
					top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
					left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
				};

				// Get Client/Element position
				var client = {
					top: document.documentElement.clientTop || document.body.clientTop || 0,
					left: document.documentElement.clientLeft || document.body.clientLeft || 0
				};

				// Get position
				var position = {
					top: box.top + scroll.top - client.top,
					left: box.left + scroll.left - client.left
				};

				// Return all current positions and sizes
				return {
					top: Math.round(position.top),
					left: Math.round(position.left),
					width: Math.round(box.width),
					height: Math.round(box.height),
					scroll: scroll
				};
			};

			var createPosition = function(e) {
				// Define position and settings
				var pos = { x: 0, y: 0 };
				var coords = getCoords(el);

				// Check if there is a binding value;
				if (binding.value) {
					pos.x = e.pageX;
					pos.y = e.pageY;
				} else {
					pos.x = e.pageX - coords.left;
					pos.y = e.pageY - coords.top;
				}

				// Switch the type of the pointer.
				switch (binding.value.type) {
					case 'percentage':
						setPercentage(e, pos, coords);
						break;
					default:
						setPosition(pos);
				}
			};
			
			
			var bound = {
				min: function (a,b) {
				return (a < b ? b : a);
			},
				max: function (a,b) {
					return (a > b ? b : a);
				}
			};

			var boundingValues = function(value) {
				// Check if min value is set
				if (binding.value.min) {
					value.x = bound.min(value.x, binding.value.min);
					value.y = bound.min(value.y, binding.value.min);
				}
				// Check if min value is set for y
				if (binding.value.min_y) {
					value.y = bound.max(value.y, binding.value.min);
				}
				// Check if min value is set for x
				if (binding.value.min_x) {
					value.y = bound.max(value.x, binding.value.min);
				}
				// Check if max value is set
				if (binding.value.max) {
					value.x = bound.max(value.x, binding.value.max);
					value.y = bound.max(value.y, binding.value.max);
				}
				// Check if max value is set for y
				if (binding.value.max_y) {
					value.y = bound.max(value.y, binding.value.max);
				}
				// Check if max value is set for x
				if (binding.value.max_x) {
					value.y = bound.max(value.x, binding.value.max);
				}

				return value;
			};

			var setPosition = function(pos) {
				// Bound the values to a min max when available
				pos = boundingValues(pos);
				console.log(pos);

				// Set the props to the DOM
				setProps(pos.x + 'px', pos.y + 'px');
			};

			var setPercentage = function(e, pos, coords) {
				// Calculate the percentage based on the position
				var percentage = {
					x: Math.round((100 / coords.width) * (e.pageX - coords.left)),
					y: Math.round((100 / coords.height) * (e.pageY - coords.top))
				};

				// Bound the values to a min max when available
				percentage = boundingValues(percentage);

				// Set the props to the DOM
				setProps(percentage.x + '%', percentage.y + '%');
			};

			var setProps = function(x, y) {
				// Check if there are custom variables
				var vars = {
					x: binding.value.x_var || '--x',
					y: binding.value.x_var || '--y'
				};

				// Set the props to the DOM
				el.style.setProperty(vars.x, x);
				el.style.setProperty(vars.y, y);
			};

			if (!process.server) {
				// Create the mousemove listener
				window.addEventListener('mousemove', function(e) {
					createPosition(e, el);
					// console.log(e);
				});
			}
		}
	};

	/* script */
	            var __vue_script__ = script;
	            
	/* template */

	  /* style */
	  var __vue_inject_styles__ = undefined;
	  /* scoped */
	  var __vue_scope_id__ = undefined;
	  /* module identifier */
	  var __vue_module_identifier__ = undefined;
	  /* functional template */
	  var __vue_is_functional_template__ = undefined;
	  /* component normalizer */
	  function __vue_normalize__(
	    template, style, script$$1,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    var component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "/Users/silvandiepen/repos/_packages/sil-pointer/src/sil-pointer.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) { component.functional = true; }
	    }

	    component._scopeId = scope;

	    

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var directive = __vue_normalize__(
	    {},
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  )

	// Import vue component

	// install function executed by Vue.use()
	function install(Vue) {
		if (install.installed) { return; }
		install.installed = true;
		Vue.directive('silPointer', directive);
	}

	// Create module definition for Vue.use()
	var plugin = {
		install: install
	};

	// To auto-install when vue is found
	var GlobalVue = null;
	if (typeof window !== 'undefined') {
		GlobalVue = window.Vue;
	} else if (typeof global !== 'undefined') {
		GlobalVue = global.Vue;
	}
	if (GlobalVue) {
		GlobalVue.use(plugin);
	}

	// It's possible to expose named exports when writing components that can
	// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
	// export const RollupDemoDirective = component;

	exports.install = install;
	exports.default = directive;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
