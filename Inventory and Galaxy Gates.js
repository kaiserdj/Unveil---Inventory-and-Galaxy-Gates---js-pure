// All credits to HORDES.IO - https://www.elitepvpers.com/forum/members/7814556-hordes-io.html
// Url - https://www.elitepvpers.com/forum/darkorbit/4869026-script-unveil-check-inventory-galaxy-gates-browser.html
//
// Port to pure js by ⎛⎝ Kaiserdj™ ⎠⎞ - https://www.elitepvpers.com/forum/members/3409335-kaiserdj.html

(async () => await api.injectCss(`
    #console span
    {
    white-space: pre;
    font-family: monospace;
    width: 720px;
    display: block;
    }
    
    div#header_start_btn
    {
    filter: hue-rotate(201deg) contrast(1.5);
    }
    
    #readButton
    {
    width: 180px;
    height: 38px;
    margin-top: -12px;
    padding-top: 3px;
    font-size: 28px;
    }
    
    @keyframes glow
    {
      from
           {
             text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #e60073, 0 0 4px #e60073, 0 0 5px #e60073, 0 0 6px #e60073, 0 0 7px #e60073;
           }
      to
           {
             text-shadow: 0 0 2px #fff, 0 0 3px #ff4da6, 0 0 4px #ff4da6, 0 0 5px #ff4da6, 0 0 6px #ff4da6, 0 0 7px #ff4da6, 0 0 8px #ff4da6;
           }
    }
    
    b.glow
    {
    color: white;
    animation: glow 1s ease-in-out infinite alternate;
    }
    
    div#newEl
    {
    background-color: rgb(217 121 220 / 21%);
    padding: 40px 30px;
    margin: 0px 40px;
    }
    
    div#newEl div
    {
    display: inline-block;
    position: relative;
    }
    
    div#newEl div::before
    {
    content: ""attr(extra)"";
    color: #ffffff;
    right: 0px;
    position: absolute;
    bottom: 0px;
    font-size: 8px;
    line-height: 8px;
    padding-left: 1px;
    letter-spacing: 1px;
    padding-bottom: 1px;
    background-color: #000000;
    filter: contrast(2);
    }
    
    div#newEl > div.upgrade::before
    {
    color: #5cf5f5;
    left: 2px;
    top: 2px;
    right: unset;
    bottom: unset;
    }
    
    div#newEl div p
    {
    width: 30px;
    height: 30px;
    } 
`))();

//function credits: stackoverflow@Salman A | https://stackoverflow.com/users/87015
//source: https://stackoverflow.com/questions/9461621/format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900
function nFormatter(num, digits) {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

//if login section exist...
if (DDNA && DDNA.context && DDNA.context['userID'] && DDNA.context['sessionID']) console.log("ok...")
else alert('error.DDNA');
document.getElementById('header_main_middle')
    .insertAdjacentHTML('beforeend', `
        <div id="header_start_btn">
            <div id="readButton">READ</div>
        </div>
    `)

function readAccount() {
    document.getElementsByClassName('infoContainerHeadline')[0].innerHTML = 'Script by: <b class="glow">ilya</b>'
    document.getElementById('header_start_btn').style.filter = "grayscale(1)"
    fetch("https://" + serverID + ".darkorbit.com/flashinput/galaxyGates.php?userID=" + DDNA.context['userID'] + "&action=init&sid=" + DDNA.context['sessionID'], {
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        },
        "method": "POST",
        "mode": "no-cors"
    }).then(function(response) {
        let urlExample = response.url
        if (urlExample.includes('loginError') == true && response.redirected == true) {
            console.log('Login failed...')
        } else return response.text()
    }).then(function(data) {
        let jsonString = xml2json(parseXml(data))
        let jsonObj = JSON.parse(jsonString.replace('undefined', ''))
        let textToConsole = ('============================ galaxy gates\n')
        textToConsole += ('ENERGY EXTRA:    ' + jsonObj.jumpgate.samples + '\n')
        jsonObj.jumpgate.gates.gate.forEach(gate => {
            const names = {
                1: "GATE ALPHA:    ",
                2: "GATE BETA:     ",
                3: "GATE GAMMA:    ",
                4: "GATE DELTA:    ",
                5: "GATE EPSILON:  ",
                6: "GATE ZETA:     ",
                7: "GATE KAPPA:    ",
                8: "GATE LAMBDA:   ",
                12: "GATE KRONOS:   ",
                13: "GATE HADES:    ",
                19: "PORTAL KUIPER: ",
            };
            let id = gate["@id"]
            let parts = gate["@current"]
            let maxParts = gate["@total"]
            let mounted = gate["@state"]
            let inMap = gate["@prepared"]
            let wave = gate["@currentWave"]
            let maxWave = gate["@totalWave"]
            let lifes = gate["@livesLeft"]
            let text = names[id] + ": Has " + parts + "/" + maxParts + " parts"
            if (inMap != 0) {
                text += ", plus one at map with " + lifes + "x Lifes."
            }
            textToConsole += (text + '\n')
        });
        textToConsole += ('===================================================================')
        document.getElementById('console').children[0].innerHTML = textToConsole
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        fetch("https://" + serverID + ".darkorbit.com/flashAPI/inventory.php?params=e30%3D&action=getHangarList", {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
            },
            "method": "POST"
        }).then(function(response) {
            let urlExample = response.url
            if (urlExample.includes('loginError') == true && response.redirected == true) {
                console.log('Failed 2...')
            } else return response.text()
        }).then(function(data) {
            let base64encoded = data;
            let obj = JSON.parse(atob(base64encoded))
            let hangars = obj.data.ret.hangars
            let mainHangar = 0;
            Object.keys(hangars).forEach(function(key) {
                let hangar = hangars[key]
                if (hangar.hangar_is_active) mainHangar = hangar
            });
            let hangarID = mainHangar.hangarID
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            let encodedParams2 = btoa('{"params":{"hi":"' + hangarID + '"}}')
            fetch("https://" + serverID + ".darkorbit.com/flashAPI/inventory.php?action=getHangar&params=" + encodedParams2, {
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
                },
                "method": "POST"
            }).then(function(response3) {
                return response3.text()
            }).then(function(data3) {
                let base64encoded3 = data3
                let obj3 = JSON.parse(atob(base64encoded3))
                console.log('obj3', obj3)
                let layout = document.getElementById('newEl')
                let itemLootIds = obj3.data.map.lootIds
                let itemTypes = obj3.data.map.types
                let stylesText = ''
                itemLootIds.forEach((item, index) => {
                    //hotfix 'I-Chron'
                    if (item == 'resource_collectable_isochronate') item = 'resource_blueprint_isochronate'
                    stylesText += `p.item` + index + ` {
background-image: url(https://darkorbit-22.bpsecure.com/do_img/global/items/` + (item.replace(/_/g, "/")) + `_30x30.png);
}
`
                });
                document.body.insertAdjacentHTML('beforeBegin', '<style id="lilyaStyle">' + stylesText + '</style>')
                let itemInfo = obj3.data.ret.itemInfo
                itemInfo.sort(function(a, b) {
                    return (a.L) - (b.L)
                });
                itemInfo.forEach(item => {
                    item.C = itemLootIds[item.L]
                    item.T2 = itemTypes[item.T]
                    item.URL = 'https://darkorbit-22.bpsecure.com/do_img/global/items/' + (item.C.replace(/_/g, "/")) + '_30x30.png'
                });
                let listItems = obj3.data.ret.items
                listItems.forEach(item => {
                    item.T = itemInfo[item.L].T
                });
                listItems.sort(function(a, b) {
                    return (a.L) - (b.L)
                });
                listItems.sort(function(a, b) {
                    return (itemInfo[a.L].T) - (itemInfo[b.L].T)
                });
                let lastType = 0 //hr divide by type
                listItems.forEach(item => {
                    let elem = ''
                    let para = '<p class="item' + item.L + '" width="30" height="30" title="' + itemInfo[item.L].name + '">'
                    if (item.DL || item.SL || item.LT) {
                        let extra
                        item.DL ? extra = item.DL : item.SL ? extra = item.SL : extra = item.LV + 1
                        elem += '<div class="upgrade" extra="' + extra + '">' + para + '</div>'
                    } else if (item.Q || item.CH) {
                        let extra
                        item.Q ? extra = nFormatter(item.Q, 0) : extra = item.CH.split(': ')[1]
                        elem += '<div extra="' + extra + '">' + para + '</div>'
                    } else elem += '<div>' + para + '</div>'
                    //hr divide by type
                    if (lastType != item.T) {
                        elem = '<hr>' + elem
                    }
                    lastType = item.T
                    layout.insertAdjacentHTML('beforeEnd', elem)
                });
            });
        });
    });
    document.getElementById('readButton').onclick = function() {
        console.log('Better not to read again now...')
    };
}
document.getElementById('readButton').onclick = function() {
    readAccount()
};
let serverID = document.URL.split('//')[1].split('.')[0]
let node = document.getElementsByClassName('footerContainer')[0]
let newEl = document.createElement('div')
newEl.id = 'newEl'
node.appendChild(newEl)
newEl.insertAdjacentHTML('beforeEnd', ' <div id="console"><span></span></div>')


/* 
Function parseXml and xml2json 
This work is licensed under Creative Commons GNU LGPL License.

License: http://creativecommons.org/licenses/LGPL/2.1/
Version: 0.9
Author:  Stefan Goessner/2006
Web:     http://goessner.net/ 
*/
function parseXml(xml) {
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        } catch (e) { dom = null; }
    } else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml)) // parse error ..

                window.alert(dom.parseError.reason + dom.parseError.srcText);
        } catch (e) { dom = null; }
    } else
        alert("cannot parse xml string!");
    return dom;
}

function xml2json(xml, tab) {
    var X = {
        toObj: function(xml) {
            var o = {};
            if (xml.nodeType == 1) { // element node ..
                if (xml.attributes.length) // element with attributes  ..
                    for (var i = 0; i < xml.attributes.length; i++)
                        o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                if (xml.firstChild) { // element has child nodes ..
                    var textChild = 0,
                        cdataChild = 0,
                        hasElementChild = false;
                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                        if (n.nodeType == 1) hasElementChild = true;
                        else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                        else if (n.nodeType == 4) cdataChild++; // cdata section node
                    }
                    if (hasElementChild) {
                        if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                            X.removeWhite(xml);
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 3) // text node
                                    o["#text"] = X.escape(n.nodeValue);
                                else if (n.nodeType == 4) // cdata node
                                    o["#cdata"] = X.escape(n.nodeValue);
                                else if (o[n.nodeName]) { // multiple occurence of element ..
                                    if (o[n.nodeName] instanceof Array)
                                        o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                    else
                                        o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                } else // first occurence of element..
                                    o[n.nodeName] = X.toObj(n);
                            }
                        } else { // mixed content
                            if (!xml.attributes.length)
                                o = X.escape(X.innerXml(xml));
                            else
                                o["#text"] = X.escape(X.innerXml(xml));
                        }
                    } else if (textChild) { // pure text
                        if (!xml.attributes.length)
                            o = X.escape(X.innerXml(xml));
                        else
                            o["#text"] = X.escape(X.innerXml(xml));
                    } else if (cdataChild) { // cdata
                        if (cdataChild > 1)
                            o = X.escape(X.innerXml(xml));
                        else
                            for (var n = xml.firstChild; n; n = n.nextSibling)
                                o["#cdata"] = X.escape(n.nodeValue);
                    }
                }
                if (!xml.attributes.length && !xml.firstChild) o = null;
            } else if (xml.nodeType == 9) { // document.node
                o = X.toObj(xml.documentElement);
            } else
                alert("unhandled node type: " + xml.nodeType);
            return o;
        },
        toJson: function(o, name, ind) {
            var json = name ? ("\"" + name + "\"") : "";
            if (o instanceof Array) {
                for (var i = 0, n = o.length; i < n; i++)
                    o[i] = X.toJson(o[i], "", ind + "\t");
                json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
            } else if (o == null)
                json += (name && ":") + "null";
            else if (typeof(o) == "object") {
                var arr = [];
                for (var m in o)
                    arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
            } else if (typeof(o) == "string")
                json += (name && ":") + "\"" + o.toString() + "\"";
            else
                json += (name && ":") + o.toString();
            return json;
        },
        innerXml: function(node) {
            var s = ""
            if ("innerHTML" in node)
                s = node.innerHTML;
            else {
                var asXml = function(n) {
                    var s = "";
                    if (n.nodeType == 1) {
                        s += "<" + n.nodeName;
                        for (var i = 0; i < n.attributes.length; i++)
                            s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                        if (n.firstChild) {
                            s += ">";
                            for (var c = n.firstChild; c; c = c.nextSibling)
                                s += asXml(c);
                            s += "</" + n.nodeName + ">";
                        } else
                            s += "/>";
                    } else if (n.nodeType == 3)
                        s += n.nodeValue;
                    else if (n.nodeType == 4)
                        s += "<![CDATA[" + n.nodeValue + "]]>";
                    return s;
                };
                for (var c = node.firstChild; c; c = c.nextSibling)
                    s += asXml(c);
            }
            return s;
        },
        escape: function(txt) {
            return txt.replace(/[\\]/g, "\\\\")
                .replace(/[\"]/g, '\\"')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r');
        },
        removeWhite: function(e) {
            e.normalize();
            for (var n = e.firstChild; n;) {
                if (n.nodeType == 3) { // text node
                    if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                        var nxt = n.nextSibling;
                        e.removeChild(n);
                        n = nxt;
                    } else
                        n = n.nextSibling;
                } else if (n.nodeType == 1) { // element node
                    X.removeWhite(n);
                    n = n.nextSibling;
                } else // any other node
                    n = n.nextSibling;
            }
            return e;
        }
    };
    if (xml.nodeType == 9) // document node
        xml = xml.documentElement;
    var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
    return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}