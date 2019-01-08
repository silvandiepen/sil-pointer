<script>
export default {
	bind: function(el, binding) {
		const getCoords = function(elem) {
			let box = elem.getBoundingClientRect();

			let scroll = {
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop,
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft
      }
      let client = {
        top: document.documentElement.clientTop || document.body.clientTop || 0,
        left: document.documentElement.clientLeft || document.body.clientLeft || 0
      }

			let top = box.top + scroll.top - client.top;
			let left = box.left + scroll.left - client.left;

			return { top: Math.round(top), left: Math.round(left) };
		};

		const setPosition = function(e, el) {
			let pos = { x: 0, y: 0 };
  
      pos.x = e.pageX - getCoords(el).left;
			pos.y = e.pageY - getCoords(el).top;

			el.style.setProperty('--x', `${pos.x}px`);
			el.style.setProperty('--y', `${pos.y}px`);
		};
		if (!process.server) {
			window.addEventListener('mousemove', function(e) {
				setPosition(e, el);
			});
		}
	}
};
</script>
