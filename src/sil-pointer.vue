<script>
export default {
	bind: function(el, binding) {
		if (!binding.value) {
			binding.value = {};
		}
		const setting = {
			box: binding.value.box || 'element',
			type: binding.value.type || 'pixel',
			min: binding.value.min || null,
			min_y: binding.value.min_y || null,
			min_x: binding.value.min_y || null,
			max: binding.value.max || null,
			max_y: binding.value.max_y || null,
			max_x: binding.value.max_y || null,
			var_y: binding.value.var_y || '--y',
			var_x: binding.value.var_x || '--x'
		};
		const getCoords = function(elem) {
			// Get the element settings
			let box = elem.getBoundingClientRect();

			// Get scroll position
			let scroll = {
				top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
				left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
			};

			// Get Client/Element position
			let client = {
				top: document.documentElement.clientTop || document.body.clientTop || 0,
				left: document.documentElement.clientLeft || document.body.clientLeft || 0
			};

			// Get position of the element
			let position = {
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

		const bound = {
			min: (a, b) => {
				return a < b ? b : a;
			},
			max: (a, b) => {
				return a > b ? b : a;
			}
		};

		const boundingValues = function(value) {
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

		const setPosition = function(e) {
			let pos = { x: 0, y: 0 };
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

		const setPercentage = function(e) {
			const coords = getCoords(el);
			// Calculate the percentage based on the position
			let percentage = {
				x: Math.round((100 / coords.element.width) * (e.pageX - coords.element.left)),
				y: Math.round((100 / coords.element.height) * (e.pageY - coords.element.top))
			};

			// Bound the values to a min max when available
			percentage = boundingValues(percentage);

			// Set the props to the DOM
			setProps(percentage.x + '%', percentage.y + '%');
		};

		const setProps = function(x, y) {
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
</script>
