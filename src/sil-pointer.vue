
<script>
export default {
	bind: function(el, binding) {
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

			// Get position
			let position = {
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

		const createPosition = function(e) {
			// Define position and settings
			let pos = { x: 0, y: 0 };
			const coords = getCoords(el);

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


		const bound = {
			min: (a, b) => {
				return (a < b ? b : a);
				},
			max: (a, b) => {
				return a > b ? b : a;
			}
		};;

		const boundingValues = function(value) {
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

		const setPosition = function(pos) {
			// Bound the values to a min max when available
			pos = boundingValues(pos);
			console.log(pos);

			// Set the props to the DOM
			setProps(pos.x + 'px', pos.y + 'px');
		};

		const setPercentage = function(e, pos, coords) {
			// Calculate the percentage based on the position
			let percentage = {
				x: Math.round((100 / coords.width) * (e.pageX - coords.left)),
				y: Math.round((100 / coords.height) * (e.pageY - coords.top))
			};

			// Bound the values to a min max when available
			percentage = boundingValues(percentage);

			// Set the props to the DOM
			setProps(percentage.x + '%', percentage.y + '%');
		};

		const setProps = function(x, y) {
			// Check if there are custom variables
			let vars = {
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
</script>
