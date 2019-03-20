<script>
export default {
	bind: function(el, binding) {
		const getCoords = function(elem) {
			let box = elem.getBoundingClientRect();

			let scroll = {
				top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
				left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
			};
			let client = {
				top: document.documentElement.clientTop || document.body.clientTop || 0,
				left: document.documentElement.clientLeft || document.body.clientLeft || 0
			};
			let position = {
				top: box.top + scroll.top - client.top,
				left: box.left + scroll.left - client.left
			};

			return {
				top: Math.round(position.top),
				left: Math.round(position.left),
				width: Math.round(box.width),
				height: Math.round(box.height),
				scroll: scroll
			};
		};

		const setPosition = function(e, el) {
			let pos = { x: 0, y: 0 };
			const coords = getCoords(el);

			if (binding.value) {
				pos.x = e.pageX;
				pos.y = e.pageY;
			} else {
				pos.x = e.pageX - coords.left;
				pos.y = e.pageY - coords.top;
			}
			if (binding.value.type === 'percentage') {
				let percentage = {
					x: Math.round((100 / coords.width) * (e.pageX - coords.left)),
					y: Math.round((100 / coords.height) * (e.pageY - coords.top))
				};
				if (binding.value.min) {
					if (percentage.x < binding.value.min) {
						percentage.x = binding.value.min;
					}
					if (percentage.y < binding.value.min) {
						percentage.y = binding.value.min;
					}
				}
				if (binding.value.max) {
					if (percentage.x > binding.value.max) {
						percentage.x = binding.value.max;
					}
					if (percentage.y > binding.value.max) {
						percentage.y = binding.value.max;
					}
				}
				el.style.setProperty('--x', percentage.x + '%');
				el.style.setProperty('--y', percentage.y + '%');
			} else {
				el.style.setProperty('--x', pos.x + 'px');
				el.style.setProperty('--y', pos.y + 'px');
			}
		};
		if (!process.server) {
			window.addEventListener('mousemove', function(e) {
				setPosition(e, el);
			});
		}
	}
};
</script>
