import { Dictionary, DictionaryMap, DictionaryRoot } from "./Dictionary";

const suggestionData: Dictionary = [
    {
        value: '<grid >\n\n</grid>',
        description: '<grid>',
        offset: 6,
    },
    {
        value: '<split >\n\n</split>',
        description: '<split>',
        offset: 7,
    },
    {
        value: '<style>\n\n\n\n</style>',
        description: '<style>',
        offset: 9,
    },
    {
        value: '<!-- slide  -->',
        description: '@slide',
        offset: 11,
    },
    {
        name: 'element',
        value: '<!-- element  -->',
        description: '@element',
        strategy: 'startsWith',
        offset: 13,
    },
    {
        value: '::: \n\n:::',
        description: '::: <name>',
        offset: 4,
    },
    {
        value: '::: block\n\n\n\n:::',
        description: '::: block',
        offset: 11,
    },
    {
        name: 'small',
        value: '<span style="font-size:small"></span>',
        description: 'small',
        strategy: 'startsWith',
        offset: 30,
    },
    {
        name: 'embed',
        value: '```slide\n{\n	slide: [[]],\n	page: 0\n}\n```',
        description: '@embed',
        strategy: 'startsWith',
        offset: 21,
    },
];

const gridData: Dictionary = [
    {
        value: 'drag=""',
        description: 'drag="<width> <height>"',
        offset: 6,
    },
    {
        value: 'drop=""',
        description: 'drop="<x> <y>"',
        offset: 6,
    },
    {
        value: 'flow=""',
        description: 'flow="<col | row>"',
        offset: 6,
    },
    {
        value: 'style=""',
        offset: 7,
    },
    {
        value: 'class=""',
        offset: 7,
    },
    {
        value: 'bg=""',
        description: 'bg="<color name | #425232 | rgb(255, 99, 71) | hsl(0, 100%, 50%)>"',
        offset: 4,
    },
    {
        value: 'pad=""',
        description: 'pad="<all sides | vertical horizontal | top right bottom left>"',
        offset: 5,
    },
    {
        value: 'align=""',
        description: 'align="<left | right | center | justify | block | top | bottom | topleft | topright | bottomleft | bottomright | stretch>"',
        offset: 7,
    },
    {
        value: 'border=""',
        description: 'border="<width> <style> <color>"',
        offset: 8,
    },
    {
        value: 'animate=""',
        description: 'animate="<type> <speed>"',
        offset: 9,
    },
    {
        value: 'opacity=""',
        description: 'opacity="<0.0...1.0>"',
        offset: 9,
    },
    {
        value: 'rotate=""',
        description: 'rotate="<0...360>"',
        offset: 8,
    },
    {
        value: 'filter=""',
        description: 'filter="<blur | bright | contrast | grayscale | hue | invert | saturate | sepia>"',
        offset: 8,
    },
    {
        value: 'frag=""',
        description: 'frag="<index>"',
        offset: 6,
    },
];

const dragData: Dictionary = [
    {
        value: '<width> <height>',
    }
];

const dropData: Dictionary = [
    {
        value: '<x> <y>',
    },
    {
        value: 'topleft',
    },
    {
        value: 'top',
    },
    {
        value: 'topright',
    },
    {
        value: 'left',
    },
    {
        value: 'center',
    },
    {
        value: 'right',
    },
    {
        value: 'bottomleft',
    },
    {
        value: 'bottom',
    },
    {
        value: 'bottomright',
    }
];

const flowData: Dictionary = [
    {
        value: 'row',
    },
    {
        value: 'col',
    }
];

const bgData: Dictionary = [
    {
        "value": "#425232",
        "description": "<#425232>"
    },
    {
        "value": "rgb(255, 99, 71)",
        "description": "<rgb(255, 99, 71)>"
    },
    {
        "value": "hsl(0, 100%, 50%)",
        "description": "<hsl(0, 100%, 50%)>"
    },
    {
        "value": "black"
    },
    {
        "value": "silver"
    },
    {
        "value": "gray"
    },
    {
        "value": "white"
    },
    {
        "value": "maroon"
    },
    {
        "value": "red"
    },
    {
        "value": "purple"
    },
    {
        "value": "fuchsia"
    },
    {
        "value": "green"
    },
    {
        "value": "lime"
    },
    {
        "value": "olive"
    },
    {
        "value": "yellow"
    },
    {
        "value": "navy"
    },
    {
        "value": "blue"
    },
    {
        "value": "teal"
    },
    {
        "value": "aqua"
    },
    {
        "value": "orange"
    },
    {
        "value": "aliceblue"
    },
    {
        "value": "antiquewhite"
    },
    {
        "value": "aquamarine"
    },
    {
        "value": "azure"
    },
    {
        "value": "beige"
    },
    {
        "value": "bisque"
    },
    {
        "value": "blanchedalmond"
    },
    {
        "value": "blueviolet"
    },
    {
        "value": "brown"
    },
    {
        "value": "burlywood"
    },
    {
        "value": "cadetblue"
    },
    {
        "value": "chartreuse"
    },
    {
        "value": "chocolate"
    },
    {
        "value": "coral"
    },
    {
        "value": "cornflowerblue"
    },
    {
        "value": "cornsilk"
    },
    {
        "value": "crimson"
    },
    {
        "value": "cyan"
    },
    {
        "value": "aqua"
    },
    {
        "value": "darkblue"
    },
    {
        "value": "darkcyan"
    },
    {
        "value": "darkgoldenrod"
    },
    {
        "value": "darkgray"
    },
    {
        "value": "darkgreen"
    },
    {
        "value": "darkgrey"
    },
    {
        "value": "darkkhaki"
    },
    {
        "value": "darkmagenta"
    },
    {
        "value": "darkolivegreen"
    },
    {
        "value": "darkorange"
    },
    {
        "value": "darkorchid"
    },
    {
        "value": "darkred"
    },
    {
        "value": "darksalmon"
    },
    {
        "value": "darkseagreen"
    },
    {
        "value": "darkslateblue"
    },
    {
        "value": "darkslategray"
    },
    {
        "value": "darkslategrey"
    },
    {
        "value": "darkturquoise"
    },
    {
        "value": "darkviolet"
    },
    {
        "value": "deeppink"
    },
    {
        "value": "deepskyblue"
    },
    {
        "value": "dimgray"
    },
    {
        "value": "dimgrey"
    },
    {
        "value": "dodgerblue"
    },
    {
        "value": "firebrick"
    },
    {
        "value": "floralwhite"
    },
    {
        "value": "forestgreen"
    },
    {
        "value": "gainsboro"
    },
    {
        "value": "ghostwhite"
    },
    {
        "value": "gold"
    },
    {
        "value": "goldenrod"
    },
    {
        "value": "greenyellow"
    },
    {
        "value": "grey"
    },
    {
        "value": "honeydew"
    },
    {
        "value": "hotpink"
    },
    {
        "value": "indianred"
    },
    {
        "value": "indigo"
    },
    {
        "value": "ivory"
    },
    {
        "value": "khaki"
    },
    {
        "value": "lavender"
    },
    {
        "value": "lavenderblush"
    },
    {
        "value": "lawngreen"
    },
    {
        "value": "lemonchiffon"
    },
    {
        "value": "lightblue"
    },
    {
        "value": "lightcoral"
    },
    {
        "value": "lightcyan"
    },
    {
        "value": "lightgoldenrodyellow"
    },
    {
        "value": "lightgray"
    },
    {
        "value": "lightgreen"
    },
    {
        "value": "lightgrey"
    },
    {
        "value": "lightpink"
    },
    {
        "value": "lightsalmon"
    },
    {
        "value": "lightseagreen"
    },
    {
        "value": "lightskyblue"
    },
    {
        "value": "lightslategray"
    },
    {
        "value": "lightslategrey"
    },
    {
        "value": "lightsteelblue"
    },
    {
        "value": "lightyellow"
    },
    {
        "value": "limegreen"
    },
    {
        "value": "linen"
    },
    {
        "value": "magenta"
    },
    {
        "value": "fuchsia"
    },
    {
        "value": "mediumaquamarine"
    },
    {
        "value": "mediumblue"
    },
    {
        "value": "mediumorchid"
    },
    {
        "value": "mediumpurple"
    },
    {
        "value": "mediumseagreen"
    },
    {
        "value": "mediumslateblue"
    },
    {
        "value": "mediumspringgreen"
    },
    {
        "value": "mediumturquoise"
    },
    {
        "value": "mediumvioletred"
    },
    {
        "value": "midnightblue"
    },
    {
        "value": "mintcream"
    },
    {
        "value": "mistyrose"
    },
    {
        "value": "moccasin"
    },
    {
        "value": "navajowhite"
    },
    {
        "value": "oldlace"
    },
    {
        "value": "olivedrab"
    },
    {
        "value": "orangered"
    },
    {
        "value": "orchid"
    },
    {
        "value": "palegoldenrod"
    },
    {
        "value": "palegreen"
    },
    {
        "value": "paleturquoise"
    },
    {
        "value": "palevioletred"
    },
    {
        "value": "papayawhip"
    },
    {
        "value": "peachpuff"
    },
    {
        "value": "peru"
    },
    {
        "value": "pink"
    },
    {
        "value": "plum"
    },
    {
        "value": "powderblue"
    },
    {
        "value": "rosybrown"
    },
    {
        "value": "royalblue"
    },
    {
        "value": "saddlebrown"
    },
    {
        "value": "salmon"
    },
    {
        "value": "sandybrown"
    },
    {
        "value": "seagreen"
    },
    {
        "value": "seashell"
    },
    {
        "value": "sienna"
    },
    {
        "value": "skyblue"
    },
    {
        "value": "slateblue"
    },
    {
        "value": "slategray"
    },
    {
        "value": "slategrey"
    },
    {
        "value": "snow"
    },
    {
        "value": "springgreen"
    },
    {
        "value": "steelblue"
    },
    {
        "value": "tan"
    },
    {
        "value": "thistle"
    },
    {
        "value": "tomato"
    },
    {
        "value": "turquoise"
    },
    {
        "value": "violet"
    },
    {
        "value": "wheat"
    },
    {
        "value": "whitesmoke"
    },
    {
        "value": "yellowgreen"
    },
    {
        "value": "rebeccapurple"
    }
];

const padData: Dictionary = [
    {
        value: '<top> <right> <bottom> <left>',
    },
    {
        value: '<top> <right & left> <bottom>',
    },
    {
        value: '<top & bottom> <right & left>',
    },
    {
        value: '<all sides>',
    }
];

const alignData: Dictionary = [
    {
        "value": "left"
    },
    {
        "value": "right"
    },
    {
        "value": "center"
    },
    {
        "value": "justify"
    },
    {
        "value": "block"
    },
    {
        "value": "top"
    },
    {
        "value": "bottom"
    },
    {
        "value": "topleft"
    },
    {
        "value": "topright"
    },
    {
        "value": "bottomleft"
    },
    {
        "value": "bottomright"
    },
    {
        "value": "stretch"
    }
];

const borderData: Dictionary = [
    {
        value: '<width> <style> <color>',
    }
];

const animateData: Dictionary = [
    {
        value: '<type> (<slower | faster>)',
    }, {
        "value": "fadeIn"
    },
    {
        "value": "fadeOut"
    },
    {
        "value": "slideRightIn"
    },
    {
        "value": "slideLeftIn"
    },
    {
        "value": "slideUpIn"
    },
    {
        "value": "slideDownIn"
    },
    {
        "value": "slideRightOut"
    },
    {
        "value": "slideLeftOut"
    },
    {
        "value": "slideUpOut"
    },
    {
        "value": "slideDownOut"
    },
    {
        "value": "scaleUp"
    },
    {
        "value": "scaleUpOut"
    },
    {
        "value": "scaleDown"
    },
    {
        "value": "scaleDownOut"
    }
];

const opacityData: Dictionary = [
    {
        value: '<0.0...1.0>',
    }
];

const rotateData: Dictionary = [
    {
        value: '<0...360>',
    }
];

const filterData: Dictionary = [
    {
        "value": "blur(10px)",
        "description": "blur"
    },
    {
        "value": "brightness(50%)",
        "description": "brightness"
    },
    {
        "value": "contrast(50%)",
        "description": "contrast"
    },
    {
        "value": "grayscale(100%)",
        "description": "grayscale"
    },
    {
        "value": "hue-rotate(90deg)",
        "description": "hue"
    },
    {
        "value": "invert(100%)",
        "description": "invert"
    },
    {
        "value": "saturate(50%)",
        "description": "saturate"
    },
    {
        "value": "sepia(50%)",
        "description": "sepia"
    }
];

const fragData: Dictionary = [
    {
        value: '<index>',
    }
];

const splitData: Dictionary = [
    {
        value: 'even ',
        description: 'even',
        offset: 5,
    },
    {
        value: 'gap=""',
        description: 'gap="<size>"',
        offset: 5,
    },
    {
        value: 'left=""',
        description: 'left="<size>"',
        offset: 6,
    },
    {
        value: 'right=""',
        description: 'right="<size>"',
        offset: 7,
    },
    {
        value: 'wrap=""',
        description: 'wrap="<amount>"',
        offset: 6,
    },
    {
        value: 'no-margin ',
        description: 'no-margin',
        offset: 10,
    },
    {
        value: 'style=""',
        offset: 7,
    },
    {
        value: 'class=""',
        offset: 7,
    },
];

const gapData: Dictionary = [
    {
        value: '<size>',
    }
];

const leftData: Dictionary = [
    {
        value: '<size>',
    }
];

const rightData: Dictionary = [
    {
        value: '<size>',
    }
];

const wrapData: Dictionary = [
    {
        value: '<amount>',
    }
];

const slideData: Dictionary = [
    {
        value: 'style=""',
        offset: 7,
    },
    {
        value: 'class=""',
        offset: 7,
    },
    {
        value: 'template="[[]]"',
        offset: 12,
    },
    {
        value: 'bg=""',
        description: 'bg="<color name | #425232 | rgb(255, 99, 71) | hsl(0, 100%, 50%)>"',
        offset: 4,
    },
    {
        value: 'bg=""',
        description: 'bg="<url | [[reference]]>"',
        offset: 4,
    },
    {
        value: 'data-background-opacity=""',
        description: 'data-background-opacity="<0.0...1.0>"',
        offset: 25,
    },
    {
        value: 'data-auto-animate ',
        offset: 18,
    },
];

const slideBgData: Dictionary = [

    {
        "value": "#425232",
        "description": "<#425232>"
    },
    {
        "value": "rgb(255, 99, 71)",
        "description": "<rgb(255, 99, 71)>"
    },
    {
        "value": "hsl(0, 100%, 50%)",
        "description": "<hsl(0, 100%, 50%)>"
    },
    {
        "value": "http://",
        "description": "<url>"
    },
    {
        "value": "[[]]",
        "description": "<[[reference]]>"
    },
    {
        "value": "black"
    },
    {
        "value": "silver"
    },
    {
        "value": "gray"
    },
    {
        "value": "white"
    },
    {
        "value": "maroon"
    },
    {
        "value": "red"
    },
    {
        "value": "purple"
    },
    {
        "value": "fuchsia"
    },
    {
        "value": "green"
    },
    {
        "value": "lime"
    },
    {
        "value": "olive"
    },
    {
        "value": "yellow"
    },
    {
        "value": "navy"
    },
    {
        "value": "blue"
    },
    {
        "value": "teal"
    },
    {
        "value": "aqua"
    },
    {
        "value": "orange"
    },
    {
        "value": "aliceblue"
    },
    {
        "value": "antiquewhite"
    },
    {
        "value": "aquamarine"
    },
    {
        "value": "azure"
    },
    {
        "value": "beige"
    },
    {
        "value": "bisque"
    },
    {
        "value": "blanchedalmond"
    },
    {
        "value": "blueviolet"
    },
    {
        "value": "brown"
    },
    {
        "value": "burlywood"
    },
    {
        "value": "cadetblue"
    },
    {
        "value": "chartreuse"
    },
    {
        "value": "chocolate"
    },
    {
        "value": "coral"
    },
    {
        "value": "cornflowerblue"
    },
    {
        "value": "cornsilk"
    },
    {
        "value": "crimson"
    },
    {
        "value": "cyan"
    },
    {
        "value": "aqua"
    },
    {
        "value": "darkblue"
    },
    {
        "value": "darkcyan"
    },
    {
        "value": "darkgoldenrod"
    },
    {
        "value": "darkgray"
    },
    {
        "value": "darkgreen"
    },
    {
        "value": "darkgrey"
    },
    {
        "value": "darkkhaki"
    },
    {
        "value": "darkmagenta"
    },
    {
        "value": "darkolivegreen"
    },
    {
        "value": "darkorange"
    },
    {
        "value": "darkorchid"
    },
    {
        "value": "darkred"
    },
    {
        "value": "darksalmon"
    },
    {
        "value": "darkseagreen"
    },
    {
        "value": "darkslateblue"
    },
    {
        "value": "darkslategray"
    },
    {
        "value": "darkslategrey"
    },
    {
        "value": "darkturquoise"
    },
    {
        "value": "darkviolet"
    },
    {
        "value": "deeppink"
    },
    {
        "value": "deepskyblue"
    },
    {
        "value": "dimgray"
    },
    {
        "value": "dimgrey"
    },
    {
        "value": "dodgerblue"
    },
    {
        "value": "firebrick"
    },
    {
        "value": "floralwhite"
    },
    {
        "value": "forestgreen"
    },
    {
        "value": "gainsboro"
    },
    {
        "value": "ghostwhite"
    },
    {
        "value": "gold"
    },
    {
        "value": "goldenrod"
    },
    {
        "value": "greenyellow"
    },
    {
        "value": "grey"
    },
    {
        "value": "honeydew"
    },
    {
        "value": "hotpink"
    },
    {
        "value": "indianred"
    },
    {
        "value": "indigo"
    },
    {
        "value": "ivory"
    },
    {
        "value": "khaki"
    },
    {
        "value": "lavender"
    },
    {
        "value": "lavenderblush"
    },
    {
        "value": "lawngreen"
    },
    {
        "value": "lemonchiffon"
    },
    {
        "value": "lightblue"
    },
    {
        "value": "lightcoral"
    },
    {
        "value": "lightcyan"
    },
    {
        "value": "lightgoldenrodyellow"
    },
    {
        "value": "lightgray"
    },
    {
        "value": "lightgreen"
    },
    {
        "value": "lightgrey"
    },
    {
        "value": "lightpink"
    },
    {
        "value": "lightsalmon"
    },
    {
        "value": "lightseagreen"
    },
    {
        "value": "lightskyblue"
    },
    {
        "value": "lightslategray"
    },
    {
        "value": "lightslategrey"
    },
    {
        "value": "lightsteelblue"
    },
    {
        "value": "lightyellow"
    },
    {
        "value": "limegreen"
    },
    {
        "value": "linen"
    },
    {
        "value": "magenta"
    },
    {
        "value": "fuchsia"
    },
    {
        "value": "mediumaquamarine"
    },
    {
        "value": "mediumblue"
    },
    {
        "value": "mediumorchid"
    },
    {
        "value": "mediumpurple"
    },
    {
        "value": "mediumseagreen"
    },
    {
        "value": "mediumslateblue"
    },
    {
        "value": "mediumspringgreen"
    },
    {
        "value": "mediumturquoise"
    },
    {
        "value": "mediumvioletred"
    },
    {
        "value": "midnightblue"
    },
    {
        "value": "mintcream"
    },
    {
        "value": "mistyrose"
    },
    {
        "value": "moccasin"
    },
    {
        "value": "navajowhite"
    },
    {
        "value": "oldlace"
    },
    {
        "value": "olivedrab"
    },
    {
        "value": "orangered"
    },
    {
        "value": "orchid"
    },
    {
        "value": "palegoldenrod"
    },
    {
        "value": "palegreen"
    },
    {
        "value": "paleturquoise"
    },
    {
        "value": "palevioletred"
    },
    {
        "value": "papayawhip"
    },
    {
        "value": "peachpuff"
    },
    {
        "value": "peru"
    },
    {
        "value": "pink"
    },
    {
        "value": "plum"
    },
    {
        "value": "powderblue"
    },
    {
        "value": "rosybrown"
    },
    {
        "value": "royalblue"
    },
    {
        "value": "saddlebrown"
    },
    {
        "value": "salmon"
    },
    {
        "value": "sandybrown"
    },
    {
        "value": "seagreen"
    },
    {
        "value": "seashell"
    },
    {
        "value": "sienna"
    },
    {
        "value": "skyblue"
    },
    {
        "value": "slateblue"
    },
    {
        "value": "slategray"
    },
    {
        "value": "slategrey"
    },
    {
        "value": "snow"
    },
    {
        "value": "springgreen"
    },
    {
        "value": "steelblue"
    },
    {
        "value": "tan"
    },
    {
        "value": "thistle"
    },
    {
        "value": "tomato"
    },
    {
        "value": "turquoise"
    },
    {
        "value": "violet"
    },
    {
        "value": "wheat"
    },
    {
        "value": "whitesmoke"
    },
    {
        "value": "yellowgreen"
    },
    {
        "value": "rebeccapurple"
    }
];

const elementData: Dictionary = [
    {
        value: 'style=""',
        offset: 7,
    },
    {
        value: 'class=""',
        offset: 7,
    },
    {
        value: 'drag=""',
        description: 'drag="<width> <height>"',
        offset: 6,
    },
    {
        value: 'drop=""',
        description: 'drop="<x> <y>"',
        offset: 6,
    },
    {
        value: 'align=""',
        description: 'align="<left | right | center | justify | block | top | bottom | topleft | topright | bottomleft | bottomright | stretch>"',
        offset: 7,
    },
    {
        value: 'bg=""',
        description: 'bg="<color name | #425232 | rgb(255, 99, 71) | hsl(0, 100%, 50%)>"',
        offset: 4,
    },
    {
        value: 'bg=""',
        description: 'bg="<url | [[reference]]>"',
        offset: 4,
    },
    {
        value: 'pad=""',
        description: 'pad="<all sides | vertical horizontal | top right bottom left>"',
        offset: 5,
    },
    {
        value: 'align=""',
        description: 'align="<left | right | center | justify | block | top | bottom | topleft | topright | bottomleft | bottomright | stretch>"',
        offset: 7,
    },
    {
        value: 'border=""',
        description: 'border="<width> <style> <color>"',
        offset: 8,
    },
    {
        value: 'animate=""',
        description: 'animate="<type> <speed>"',
        offset: 9,
    },
    {
        value: 'opacity=""',
        description: 'opacity="<0.0...1.0>"',
        offset: 9,
    },
    {
        value: 'rotate=""',
        description: 'rotate="<0...360>"',
        offset: 8,
    },
    {
        value: 'filter=""',
        description: 'filter="<blur | bright | contrast | grayscale | hue | invert | saturate | sepia>"',
        offset: 8,
    },
    {
        value: 'frag=""',
        description: 'frag="<index>"',
        offset: 6,
    },
];


const gridMap: DictionaryMap = {
    parent: gridData,
    children: [
        {
            property: "drag",
            dictionary: dragData
        },
        {
            property: "drop",
            dictionary: dropData,
            filter: true
        },
        {
            property: "flow",
            dictionary: flowData,
            filter: true
        },
        {
            property: "bg",
            dictionary: bgData,
            filter: true
        },
        {
            property: "pad",
            dictionary: padData,
        },
        {
            property: "align",
            dictionary: alignData,
            filter: true
        },
        {
            property: "border",
            dictionary: borderData
        },
        {
            property: "animate",
            dictionary: animateData,
            filter: true
        },
        {
            property: "opacity",
            dictionary: opacityData
        },
        {
            property: "rotate",
            dictionary: rotateData
        },
        {
            property: "filter",
            dictionary: filterData,
            filter: true
        },
        {
            property: "frag",
            dictionary: fragData
        },
    ]
};

const splitMap: DictionaryMap = {
    parent: splitData,
    children: [
        {
            property: "gap",
            dictionary: gapData
        },
        {
            property: "left",
            dictionary: leftData
        },
        {
            property: "right",
            dictionary: rightData
        },
        {
            property: "wrap",
            dictionary: wrapData
        },
    ]
};

const slideMap: DictionaryMap = {
    parent: slideData,
    children: [
        {
            property: "bg",
            dictionary: slideBgData,
            filter: true
        },
        {
            property: "data-background-opacity",
            dictionary: opacityData
        },
    ]
};

const elementMap: DictionaryMap = {
    parent: elementData,
    children: [
        {
            property: "bg",
            dictionary: bgData,
            filter: true
        },
        {
            property: "pad",
            dictionary: padData,
        },
        {
            property: "align",
            dictionary: alignData,
            filter: true
        },
        {
            property: "border",
            dictionary: borderData
        },
        {
            property: "animate",
            dictionary: animateData,
            filter: true
        },
        {
            property: "opacity",
            dictionary: opacityData
        },
        {
            property: "rotate",
            dictionary: rotateData
        },
        {
            property: "filter",
            dictionary: filterData,
            filter: true
        },
        {
            property: "frag",
            dictionary: fragData
        },
    ]
}

export const dict: DictionaryRoot = {
    parent: suggestionData,
    children: [
        {
            property: "grid",
            dictionary: gridMap
        },
        {
            property: "split",
            dictionary: splitMap
        },
        {
            property: "slide",
            dictionary: slideMap
        },
        {
            property: "element",
            dictionary: elementMap
        },
    ]
}