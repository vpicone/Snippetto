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
    languages: [String]
    publisher: String
    version: String
    links: [Link]
    image: String
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
  libraryById(id: ID!): Library
  allLibraries: [Library]
  librariesByLanguage(language: String!): [Library]
  allLanguages: [Language]
}


`;

module.exports = typeDefs;
