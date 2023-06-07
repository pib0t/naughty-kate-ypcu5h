const StyleDictionary = require('style-dictionary').extend('./tokens/core.json');

StyleDictionary.registerTransform({
  name: 'value/replace',
  type: 'value',
  matcher: function (prop) {
    return prop.attributes.type === 'dimension'; // Adjust the condition based on your token types
  },
  transformer: function (prop) {
    return prop.value.replace(
      /{([^}]+)}/g,
      (match, p1) => `{{${p1.trim()}}}`
    );
  }
});

StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function (dictionary) {
    return dictionary.allProperties.map(function (prop) {
      return `--${prop.path.join('-')}: ${prop.value};`;
    }).join('\n');
  }
});

module.exports = StyleDictionary;
