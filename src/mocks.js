const { mocks } = require("graphql-scalars");
const { MockList } = require("apollo-server");
const casual = require('casual');

const OBJECT_TYPE = {
  AUTHOR:               'AUTHOR',
  RESEARCH:             'RESEARCH',
  ARTICLE:              'ARTICLE',
  JOURNAL:              'JOURNAL',
  CONFERENCE:           'CONFERENCE',
  COURSE:               'COURSE',
  QUESTIONANSWER:       'QUESTIONANSWER',
  INSTITUTION:          'INSTITUTION'
}

module.exports = {
  ...mocks,
  Currency: () => 4200,
  DynamicFeed: () => ({
    edges: () => new MockList([8,20])
  }),
  Dynamic: () => ({
    subject: () => ({
      id: casual.integer(1, 100),
      isA: casual.random_value(OBJECT_TYPE)
    }),
    object: () => ({
      id: casual.integer(1, 100),
      isA: casual.random_value(OBJECT_TYPE)
    })
  })
};
