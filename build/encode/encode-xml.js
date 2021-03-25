"use strict";
var XML_CHAR_MAP = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
};
/**
 * Encodes XML special chars
 * @param xmldata xml string to encode
 * @returns encoded xml string
 */
function encodeXMLComponent(xmldata) {
    return xmldata.replace(/[<>&"']/g, function (m) { return (XML_CHAR_MAP[m] || m); });
}
console.log(encodeXMLComponent("data\"'&><><&'\"data"));
/**
 * Output:
data&quot;&apos;&amp;&gt;&lt;&gt;&lt;&amp;&apos;&quot;data
 */ 
