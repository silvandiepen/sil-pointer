(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.silRatio = {})));
}(this, (function (exports) { 'use strict';

	var script = {
		bind: function(el, binding) {
			var setStyle = function(el) {
				var check = {
					small: 0,
					medium: 750,
					large: 1024,
					xlarge: 1440,
					xxlarge: 1920
				};
				var ratio = binding.value;

				if (!process.server) {
					Object.keys(check).forEach(function(item) {
						if (window.innerWidth > check[item]) {
							if (el.getAttribute('ratio-' + item)) {
								ratio = el.getAttribute('ratio-' + item);
							}
						}
					});
				}

				ratio = ratio.split(':');
				var elSize = el.getBoundingClientRect();
				el.style.height = (elSize.width / ratio[0]) * ratio[1] + 'px';
				el.style.opacity = 1;
				if (el.classList.contains('ratio-hide')) {
					el.classList.remove('ratio-hide');
				}
			};
			setStyle(el);
			if (!process.server) {
				window.addEventListener('resize', function() {
					setStyle(el);
				});
			}
		},
		update: function(el, binding, vnode) {
			var setStyle = function(el) {
				var check = {
					small: 0,
					medium: 750,
					large: 1024,
					xlarge: 1440,
					xxlarge: 1920
				};
				var ratio = binding.value;

				if (!process.server) {
					Object.keys(check).forEach(function(item) {
						if (window.innerWidth > check[item]) {
							if (el.getAttribute('ratio-' + item)) {
								ratio = el.getAttribute('ratio-' + item);
							}
						}
					});
				}

				ratio = ratio.split(':');
				var elSize = el.getBoundingClientRect();
				el.style.height = (elSize.width / ratio[0]) * ratio[1] + 'px';
				el.style.opacity = 1;
				if (el.classList.contains('ratio-hide')) {
					el.classList.remove('ratio-hide');
				}
			};
			setStyle(el);
		},
		inserted: function(el, binding) {
			//added this function twice cause I couldn't call setStyle function in a method, maybe fix later
			//inserted function will call when dom is entered in the website, maybe fix later?
			var check = {
				small: 0,
				medium: 750,
				large: 1024,
				xlarge: 1440,
				xxlarge: 1920
			};
			var ratio = binding.value;

			if (!process.server) {
				Object.keys(check).forEach(function(item) {
					if (window.innerWidth > check[item]) {
						if (el.getAttribute('ratio-' + item)) {
							ratio = el.getAttribute('ratio-' + item);
						}
					}
				});
			}

			ratio = ratio.split(':');
			var elSize = el.getBoundingClientRect();
			el.style.height = (elSize.width / ratio[0]) * ratio[1] + 'px';
			el.style.opacity = 1;
			if (el.classList.contains('ratio-hide')) {
				el.classList.remove('ratio-hide');
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
	    component.__file = "/Users/silvandiepen/repos/_packages/sil-ratio/src/sil-ratio.vue";

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
		Vue.directive('silRatio', directive);
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
