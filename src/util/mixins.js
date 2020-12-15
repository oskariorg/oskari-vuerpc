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
    plotPlotArea: (plotAreaData, mapEl) => {
      channel.getPixelMeasuresInScale(plotAreaData, (data) => {
        channel.log('GetPixelMeasuresInScale: ', data);
        const cx = mapEl;
        const bounds = cx.getBoundingClientRect();
        const boxTop = bounds.top + (cx.offsetHeight - data.pixelMeasures[1]) / 2.0;
        const boxLeft = bounds.left + (cx.offsetWidth - data.pixelMeasures[0]) / 2.0;
        if (cx.parentElement.querySelector('#id_plot_bbox')) {
          cx.parentElement.querySelector('#id_plot_bbox').remove();
        }
        if (boxLeft > 0 && boxTop > 0) {
          const box =
          `<div id="id_plot_bbox" style="overflow: hidden; pointer-events:none; position:absolute;
          top:${boxTop - 35}px;
          left:${boxLeft}px;
          width:${data.pixelMeasures[0]}px;
          height:${data.pixelMeasures[1]}px; border:2px solid red"> </div>`;

          const parser = new DOMParser();
          const el = parser.parseFromString(box, 'text/html');
          const element = el.getElementById('id_plot_bbox');
          cx.parentElement.appendChild(element);
        }
      });
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
