var script = {
	bind: function(el, binding) {
		if (!binding.value) {
			binding.value = {};
		}
		var setting = {
			box: binding.value.box || 'element',
			type: binding.value.type || 'pixel',
			min: binding.value.min || null,
			min_y: binding.value.min_y || null,
			min_x: binding.value.min_y || null,
			max: binding.value.max || null,
			max_y: binding.value.max_y || null,
			max_x: binding.value.max_y || null,
			var_y: binding.value.var_y || '--y',
			var_x: binding.value.var_y || '--x'
		};
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

			// Get position of the element
			var position = {
				top: box.top + scroll.top - client.top,
				left: box.left + scroll.left - client.left
			};

			// Return all current positions and sizes
			return {
				element: {
					top: Math.round(position.top),
					left: Math.round(position.left),
					width: Math.round(box.width),
					height: Math.round(box.height)
				},
				viewport: {
					top: Math.round(scroll.top),
					left: Math.round(scroll.left)
				},
				scroll: scroll
			};
		};

		var bound = {
			min: function (a, b) {
				return a < b ? b : a;
			},
			max: function (a, b) {
				return a > b ? b : a;
			}
		};

		var boundingValues = function(value) {
			// Check if min value is set
			if (setting.min !== null) {
				value.x = bound.min(value.x, setting.min);
				value.y = bound.min(value.y, setting.min);
			}
			// Check if min value is set for y
			if (setting.min_y !== null) {
				value.y = bound.max(value.y, setting.min);
			}
			// Check if min value is set for x
			if (setting.min_x !== null) {
				value.y = bound.max(value.x, setting.min);
			}
			// Check if max value is set
			if (setting.max !== null) {
				value.x = bound.max(value.x, setting.max);
				value.y = bound.max(value.y, setting.max);
			}
			// Check if max value is set for y
			if (setting.max_y !== null) {
				value.y = bound.max(value.y, setting.max);
			}
			// Check if max value is set for x
			if (setting.max_x !== null) {
				value.y = bound.max(value.x, setting.max);
			}

			return value;
		};

		var setPosition = function(e) {
			var pos = { x: 0, y: 0 };
			switch (setting.box) {
				case 'element':
					pos.x = e.pageX - getCoords(el).element.left;
					pos.y = e.pageY - getCoords(el).element.top;
					break;
				case 'page':
					pos.x = e.pageX;
					pos.y = e.pageY;
					break;
				case 'viewport':
					pos.x = e.pageX - getCoords(el).viewport.left;
					pos.y = e.pageY - getCoords(el).viewport.top;
					break;
			}

			// Bound the values to a min max when available
			pos = boundingValues(pos);

			// Set the props to the DOM
			setProps(pos.x + 'px', pos.y + 'px');
		};

		var setPercentage = function(e) {
			var coords = getCoords(el);
			// Calculate the percentage based on the position
			var percentage = {
				x: Math.round((100 / coords.element.width) * (e.pageX - coords.element.left)),
				y: Math.round((100 / coords.element.height) * (e.pageY - coords.element.top))
			};

			// Bound the values to a min max when available
			percentage = boundingValues(percentage);

			// Set the props to the DOM
			setProps(percentage.x + '%', percentage.y + '%');
		};

		var setProps = function(x, y) {
			// Set the props to the DOM
			el.style.setProperty(setting.var_x, x);
			el.style.setProperty(setting.var_y, y);
		};

		if (!process.server) {
			// Create the mousemove listener
			window.addEventListener('mousemove', function(e) {
				switch (setting.type) {
					case 'percentage':
						setPercentage(e);
						break;
					case 'pixel':
						setPosition(e);
						break;
				}
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

export default directive;
export { install };
