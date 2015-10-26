if ENV.include?("ALGOLIA_APP_ID")
  AlgoliaSearch.configuration = {
    application_id: ENV["ALGOLIA_APP_ID"],
    api_key: ENV["ALGOLIA_API_KEY"]
  }
end
