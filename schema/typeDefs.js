const typeDefs = `

type Language {
  name: String!
  libraries: [Library]
}

type User {
    id: ID!
    username: String!
    scores: [Score]
}

type Library {
    id: ID!
    name: String
    description: String
    snippets: [Snippet]
    language: String
    url: String
}

type Snippet {
    id: ID!
    name: String!
    prefix: String!
    body: [String]
    description: String
}

type GameSnippet {
    id: ID!
    name: String!
    prefix: String!
    body: [String]
    description: String
    completed: Boolean
    completeTime: Int
    correctlyAnswered: Boolean
}

type Score {
    id: ID!
    library: Library
    score: Int
}

type Game {
  id: ID!
  currentSnippet: Int
  user: User
  library: Library
  currentScore: Int
  completed: Boolean
  snippets: [GameSnippet]
}

# the schema allows the following query:
type Query {
  user(id: ID!): User
  allUsers: [User]
  library(id: ID!): Library
  allLibraries: [Library]
  languages: [Language]
  game(id: ID!): Game
}

# this schema allows the following mutation:
type Mutation {
  createUser (
      username: String!
  ): User,
  createGame(
    user: ID!
    library: ID!
  ) : Game,
  submitAnswer(game: ID!, snippet: ID!, answer: String!, remainingTime: Int!): Game,
  expireSnippet(game: ID!, snippet: ID!): Game
}
`;

module.exports = typeDefs;
