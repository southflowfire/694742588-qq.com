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
    isA: 'ARTICLE',
    title: casual.sentence,
    abstract: () => casual.text
  }),
  Author: () => ({
    id: casual.integer(1, 99999999),
    isA: 'AUTHOR',
  }),
  Journal: () => ({
    id: casual.integer(1, 99999999),
    isA: 'JOURNAL',
  }),
  Research: () => ({
    id: casual.integer(1, 99999999),
    isA: 'RESEARCH',
  }),
  Conference: () => ({
    id: casual.integer(1, 99999999),
    isA: 'CONFERENCE',
  }),
  Institution: () => ({
    id: casual.integer(1, 99999999),
    isA: 'INSTITUTION',
  }),
  Course: () => ({
    id: casual.integer(1, 99999999),
    isA: 'COURSE',
  }),
  QuestionAnswer: () => ({
    id: casual.integer(1, 99999999),
    isA: 'QUESTIONANSWER',
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
  Request: () => {
    const type = casual.random_value(OBJECT_TYPE);
    return {
      id: casual.integer(1, 99999999),
      left: () => ({
        id: casual.integer(1, 99999999),
        isA: type,
      }),
      right: () => ({
        id: casual.integer(1, 99999999),
        isA: type
      }),
      targetLog: () => ({
        id: casual.integer(1, 99999999),
        isA: type
      })
    };
  },
};
