const mixins = (channel) => {
  return {
    moveMap: (x, y, zoom) => {
      channel.postRequest(
        'MapMoveRequest', [x, y, zoom]
      );
    },
    addMarker: (marker, id) => {
      // get missing id from marker if available
      if (!id) {
        id = marker.id;
      }
      channel.postRequest(
        'MapModulePlugin.AddMarkerRequest', [marker, id]
      );
    },
    displayMessage: (el, message, tout) => {
      let timeOut = 5;
      const text = el.innerText = message;
      if (tout) {
        timeOut = tout;
      }
      const escaped = el.innerText;
      el.innerHtml = escaped.replace(/\n/g, '<br />');
      el.style = 'display: block';
      setTimeout(() => {
        el.style = 'display: none';
      }, timeOut * 1000);
    },
    getMarkerTemplate: (type) => {
      const template = {
        size: 4,
        shape: 2,
        color: '00FF00'
      };
      return template;
    },
    getColor: (type) => {
      if (!type) {
        type = this.getIssueType();
      }
      if (type === 'road') {
        return '00FFFF';
      }
      return '00FF00';
    },
    getIssueType: () => {

    }
  };
}
export default mixins;
