<script>
export default {
  bind: function(el, binding) {
    let setPosition = function(e, el) {
      const x = e.pageX - e.target.offsetLeft;
      const y = e.pageY - e.target.offsetTop;

      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    if (!process.server) {
      window.addEventListener("mousemove", function(e) {
        setPosition(e, el);
      });
    }
  }
};
</script>