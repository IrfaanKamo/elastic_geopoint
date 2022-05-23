var elasticsearch = require("@elastic/elasticsearch");

var client = new elasticsearch.Client({
  node: "http://localhost:9200",
});

(async () => {
  try {
    const response = await client.search({
      index: 'geo_cities_point',
      body: {
        "query": {
            "bool": {
              "must": {
                "match_all": {}
              },
              "filter": {
                "geo_bounding_box": {
                  "location": {
                    "top_left": {
                      "lat": 49.0000,
                      "lon": -122.448
                    },
                    "bottom_right": {
                      "lat": 47.595124,
                      "lon": -119.270410
                    }
                  }
                }
              }
            }
          }
      }

    });
    console.log(JSON.stringify(response.body.hits.hits, 0, 2));
  } catch (e) {
    console.log("An error occurred while getting the document", e);
  }
})();