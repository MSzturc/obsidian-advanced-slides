export const md = (() => {
    // Hack required since https://github.com/hakimel/reveal.js/commit/d780352b7f78e16635ce9fabf2dbb53639610f18
    // eslint-disable-next-line no-undef
    global.Reveal = {
        registerPlugin: () => {}
    };
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('reveal.js/plugin/markdown/markdown')();
})();
