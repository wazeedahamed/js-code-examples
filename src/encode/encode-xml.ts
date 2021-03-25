const XML_CHAR_MAP: { [key: string]: string } = {
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;'
}
/**
 * This function excodes XML data
 */
function encodeXMLComponent(xmldata: string) {
    return xmldata.replace(/[<>&"']/g, (m) => (XML_CHAR_MAP[m] || m));
}

console.log(encodeXMLComponent(`data"'&><><&'"data`))

/**
 * Output:
data&quot;&apos;&amp;&gt;&lt;&gt;&lt;&amp;&apos;&quot;data
 */