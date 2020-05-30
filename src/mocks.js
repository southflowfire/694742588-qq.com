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
  }),
  TypedObjectFeed: () => ({
    edges: () => new MockList([5, 20])
  }),
  TypedObjectEdge: () => ({
    node: () => ({
      id: casual.integer(1, 100),
      isA: casual.random_value(OBJECT_TYPE)
    })
  }),
  User: () => ({
    id: casual.integer(1, 99999999),
  }),
  Article: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Article'),
  }),
  Author: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Author'),
  }),
  Journal: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Journal'),
  }),
  Research: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Research'),
  }),
  Conference: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Conference'),
  }),
  Institution: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Institution'),
  }),
  Course: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('Course'),
  }),
  QuestionAnswer: () => ({
    id: casual.integer(1, 99999999),
    isA: casual.random_value('QuestionAnswer'),
  }),
  Collection: () => ({
    id: casual.integer(1, 99999999),
  }),
  Comment: () => ({
    id: casual.integer(1, 99999999),
  }),
  MindMap: () => ({
    id: casual.integer(1, 99999999),
  }),
  Request: () => ({
    id: casual.integer(1, 99999999),
  }),
};
