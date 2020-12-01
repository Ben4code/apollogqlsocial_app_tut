import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client' 
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { ApolloProvider } from '@apollo/react-hooks'

const httpLink = createHttpLink({
  uri: (process.env.NODE_ENV === "development" ? 'http://localhost:5000' : process.env.PRODUCTION_URI)
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)