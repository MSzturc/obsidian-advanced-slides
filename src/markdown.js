module.exports.md = (() => {
	// Hack required since https://github.com/hakimel/reveal.js/commit/d780352b7f78e16635ce9fabf2dbb53639610f18
	global.Reveal = {
	  registerPlugin: () => {}
	};
	return require('reveal.js/plugin/markdown/markdown')();
  })();
