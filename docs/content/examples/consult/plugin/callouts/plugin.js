window.RevealAdmonition = {
    id: 'callouts',
    init: function (deck) {
        console.log(deck);
        var headings = document.evaluate("//p[starts-with(., '!!!')]", document, null, XPathResult.ANY_TYPE, null );
        var replacements = [];
        if (headings) {
            var oldNode = headings.iterateNext();
            while(oldNode) {
                var rows = oldNode.textContent.split("\n");
                if (rows.length) {
                    var titles = /(?:!!!)([\w]+)(?:[\s])?(.*)/.exec(rows[0]);
                    var text = "";
                    rows.slice(1).forEach(r => {
                        text += r.replace(/^\s{4}/, "") + "\n"
                    })
                    var ihtml = marked.parse(text);
                    replacements.push({oldNode, ihtml, titles1: titles[1], titles2: titles[2]});
                }
                oldNode = headings.iterateNext();
            }
        }
        replacements.forEach(x => {
            var newNode = document.createElement('div');
            newNode.classList.add("admonition", x.titles1);
            if (x.titles2 !== '""') {
                var newNodeTitle = document.createElement('p');
                newNodeTitle.classList.add('admonition-title');
                newNodeTitle.innerText = x.titles2 || x.titles1.replace(/^\w/, (c) => c.toUpperCase());;
                newNode.appendChild(newNodeTitle);
            }
            var newNodePar = document.createElement('p');
            newNodePar.innerHTML = x.ihtml;
            newNode.appendChild(newNodePar);
            x.oldNode.parentNode.replaceChild(newNode, x.oldNode);
        }); 
    }
  }