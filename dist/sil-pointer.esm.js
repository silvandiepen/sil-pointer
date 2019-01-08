var script = {
	bind: function(el, binding) {
		var getCoords = function(elem) {
			var box = elem.getBoundingClientRect();

			var scroll = {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
      };
      var client = {
        top: document.documentElement.clientTop || document.body.clientTop || 0,
        left: document.documentElement.clientLeft || document.body.clientLeft || 0
      };
      var position = {
        top: box.top + scroll.top - client.top,
			  left: box.left + scroll.left - client.left
      };

			return { top: Math.round(position.top), left: Math.round(position.left) };
		};

		var setPosition = function(e, el) {
			var pos = { x: 0, y: 0 };
  
      if(binding.value){
        pos.x = e.pageX;
	  		pos.y = e.pageY;    
      } else {
        pos.x = e.pageX - getCoords(el).left;
	  		pos.y = e.pageY - getCoords(el).top;    
      }

			el.style.setProperty('--x', ((pos.x) + "px"));
			el.style.setProperty('--y', ((pos.y) + "px"));
		};
		if (!process.server) {
			window.addEventListener('mousemove', function(e) {
				setPosition(e, el);
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
