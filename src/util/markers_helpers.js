const getMarkerTemplate = (type) => {
  const template = {
    size: 4,
    shape: 2,
    color: '00FF00'
  };
  return template;
}

const addMarker = (marker, id) => {
  // get missing id from marker if available
  if (!id) {
    id = marker.id;
  }
  // FIXME: uses global channel variable
  channel.postRequest('MapModulePlugin.AddMarkerRequest', [marker, id]);
};

export { getMarkerTemplate, addMarker };
