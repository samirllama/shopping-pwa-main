module.exports = {
  caseSensitive: false,
  defaultGroup: 'components',
  fileTypes: /(\.js$|\.jsx$|\.ts$|\.tsx$)/,
  groups: {
    node: /(fs|child_process)/,
    vendor: /((?<!uitk-)react|lodash|mobx|enzyme|sinon|cheerio)/,
    bernie: /bernie/,
    sharedUI: /@shared/,
    sources: /source/,
    stores: /store/,
    types: /(models|constants|types)/,
    uitk: /uitk/,
    utils: /util/
  },
  ignoreFiles: /(config|graphql-check)/,
  importPattern: /(import.*from|const.*require\()/,
  indentSpaces: 2,
  maxLineLength: 140,
  membersBegin: /(import \{|const \{)/
};
