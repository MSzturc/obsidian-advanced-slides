import { Dictionary } from "./Dictionary";

export const suggestionData: Dictionary = [
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
        value: '<!-- element  -->',
        description: '@element',
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
        value: '<span style="font-size:small"></span>',
        description: 'small',
        offset: 30,
    },
];

export const gridData: Dictionary = [
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

export const dragData: Dictionary = [
    {
        value: '<width> <height>',
    }
];

export const dropData: Dictionary = [
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

export const flowData: Dictionary = [
    {
        value: 'row',
    },
    {
        value: 'col',
    }
];

export const bgData: Dictionary = [
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

export const padData: Dictionary = [
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

export const alignData: Dictionary = [
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

export const borderData: Dictionary = [
    {
        value: '<width> <style> <color>',
    }
];

export const animateData: Dictionary = [
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

export const opacityData: Dictionary = [
    {
        value: '<0.0...1.0>',
    }
];

export const rotateData: Dictionary = [
    {
        value: '<0...360>',
    }
];

export const filterData: Dictionary = [
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

export const fragData: Dictionary = [
    {
        value: '<index>',
    }
];

export const splitData: Dictionary = [
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

export const gapData: Dictionary = [
    {
        value: '<size>',
    }
];

export const leftData: Dictionary = [
    {
        value: '<size>',
    }
];

export const rightData: Dictionary = [
    {
        value: '<size>',
    }
];

export const wrapData: Dictionary = [
    {
        value: '<amount>',
    }
];

export const slideData: Dictionary = [
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

export const slideBgData: Dictionary = [

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

export const elementData: Dictionary = [
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