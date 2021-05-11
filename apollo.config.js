module.exports = {
  client: {
    name: 'shopping-pwa',
    service: 'ExpediaInc-8789@prod',
    includes: ['./graphql/*.graphql', 'node_modules/bernie-e3-prime/graphql/context-request.graphql'],
    addTypename: false
  }
};
