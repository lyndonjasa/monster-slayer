const enrivonment = {
  development: {
    apiUrl: "http://localhost:3000"
  },
  production: {
    apiUrl: "https://monster-slayer-api-staging.herokuapp.com"
  }
}

export default enrivonment[process.env.NODE_ENV];