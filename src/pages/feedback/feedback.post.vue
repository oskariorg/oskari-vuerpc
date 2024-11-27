<template>
  <div>
    <h2>{{ title }}</h2>
    <p>
      Posting feedback to an Open311-based service that has been configured for the embedded map.
    </p>
    
    <DocumentationLink type="request" apiDoc="PostFeedbackRequest">
      Documentation for PostFeedbackRequest
    </DocumentationLink>
    <h3>Example for point geometry</h3>

      <CodeSnippet :runnable="true" buttonText="Add feedback with a point">
var postdata = {
  "service_code": "180",
  "description": "Kampin bussipysäkillä on roskakori täynnä",
  "first_name": "Oskari",
  "last_name": "Maanmittaushallitus",
  "lat": "6674188.748000",
  "long": "384717.640000"
};
var data = {
  "srs": "EPSG:3067",
  "payload": postdata
};
channel.postRequest('PostFeedbackRequest', [data]);
      </CodeSnippet>
      
    <h3>Example for line geometry</h3>
    <CodeSnippet :runnable="true" buttonText="Add feedback with a line">
var postdata = {
  "service_code": "180",
  "description": "Vartiosaari kaipaa suojelua",
  "first_name": "Line",
  "last_name": "POC",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [393000, 6673192],
      [393216, 6673560],
      [393712, 6673864],
      [393736, 6673592]
    ]
  }
};
var data = {
  "srs": "EPSG:3067",
  "payload": postdata
};
channel.postRequest('PostFeedbackRequest', [data]);
    </CodeSnippet>

    <h3>Example for polygon geometry</h3>
    <CodeSnippet :runnable="true" buttonText="Add feedback with a polygon">
var postdata = {
  "service_code": "180",
  "description": "Kampin bussipysäkillä on roskakori täynnä",
  "first_name": "Oskari",
  "last_name": "Maanmittaushallitus",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [382472.5, 6677324.5],
        [382328.5, 6676636.5],
        [383288.5, 6676332.5],
        [383528.5, 6677100.5],
        [382472.5, 6677324.5]
      ]
    ]
  }
};
var data = {
  "srs": "EPSG:3067",
  "payload": postdata
};
channel.postRequest('PostFeedbackRequest', [data]);
    </CodeSnippet>
  </div>
</template>
<script>
const title = 'Post users feedback data (poc)';
export default {
  name: 'PostFeedbackRequest',
  label: title,
  data() {
    return {
      title
    };
  }
};

</script>
