const typeDefs = `

type Language {
  name: String!
  libraries: [Library]
}

type Link {
  name: String!
  url: String!
}

type Library {
    id: ID!
    name: String
    description: String
    tags: [String]
    snippets: [Snippet]
    language: String
    links: [Link]
}

type Snippet {
    id: ID!
    name: String!
    prefix: String!
    body: [String]
    description: String
}

# the schema allows the following query:
type Query {
  library(id: ID!): Library
  allLibraries: [Library]
  librariesByTag(tag: String!): [Library]
  languages: [Language]
  allTags: [String]
}


`;

module.exports = typeDefs;
