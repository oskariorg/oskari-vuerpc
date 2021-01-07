<template>
  <div id="ShowInfoBox">
    <button id="btnShowInfoBoxRequest" class="btn btn-primary exampleready" @click="showInfoBoxRequest">InfoBox.ShowInfoBoxRequest</button>
    <div>
      <a ref="showInfobox" id="show" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component :snippet="req"></code-component>

    <button id="btnHideInfoBoxRequest" class="btn btn-primary exampleready" @click="hideInfoBoxRequest">InfoBox.HideInfoBoxRequest</button>
    <div>
      <a ref="hideInfobox" id="hide" href="" @click="getLink">To the documentation</a>
    </div>
    <code-component snippet="var infoboxId = 'myInfoBox';
    channel.postRequest('InfoBox.HideInfoBoxRequest', [infoboxId]);
    channel.log('InfoBox.HideInfoBoxRequest posted with data', infoboxId);"></code-component>
  </div>
</template>
<script>
import { infobox } from '../../util/examplecodes.js';
export default {
  name: 'ShowInfoBox',
  label: 'Show or hide info box',
  data () {
    return {
      desc: 'Show or hide info box',
      req: infobox.req
    }
  },
  methods: {
    showInfoBoxRequest () {
      this.$root.channel.getMapPosition((data) => {
        var content = [
          {
            'html': '<div>Map position info:</div>'
          },
          {
            'html': '<div>Center: ' + parseInt(data.centerX) + ', ' + parseInt(data.centerY) + '</div>',
            'actions': [
              {
                name: 'My link 1',
                type: 'link',
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params'
                }
              },
              {
                name: 'My link 2',
                type: 'link',
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params'
                }
              }
            ]
          },
          {
            'html': '<div>Zoom level: ' + data.zoom + '</div>'
          },
          {
            'actions': [
              {
                name: 'My link 3',
                type: 'link',
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params'
                }
              },
              {
                name: 'My link 4',
                type: 'link',
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params'
                }
              },
              {
                name: 'My button 1',
                type: 'button',
                group: 1,
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params',
                  buttonInfo: 'This button has group 1 and is placed to the same row with other actions that have the same group'
                }
              },
              {
                name: 'My button 2',
                type: 'button',
                group: 1,
                action: {
                  info: 'this can include any info',
                  info2: 'action-object can have any number of params',
                  buttonInfo: 'This button has group 1 and is placed to the same row with other actions that have the same group'
                }
              }
            ]
          }
        ];
        data = [
          'myInfoBox',
          'Generic info box',
          content,
          {
            'lon': data.centerX,
            'lat': data.centerY
          },
          {
            colourScheme: {
              bgColour: '#00CCFF',
              titleColour: '#FFFFFF',
              headerColour: '#00CCFF',
              iconCls: 'icon-close-white',
              buttonBgColour: '#00CCFF',
              buttonLabelColour: '#FFFFFF',
              linkColour: '#000000'
            },
            font: 'georgia',
            positioning: 'left'
          }
        ];

        this.$root.channel.postRequest('InfoBox.ShowInfoBoxRequest', data);
        this.$root.channel.log('InfoBox.ShowInfoBoxRequest posted with data', data);
      });
    },
    hideInfoBoxRequest () {
      const infoboxId = 'myInfoBox';
      this.$root.channel.postRequest('InfoBox.HideInfoBoxRequest', [infoboxId]);
      this.$root.channel.log('InfoBox.HideInfoBoxRequest posted with data', infoboxId);
    },
    getLink (e) {
      let documentPathEnd = e.target.id === 'show' ? 'ui/infobox/request/infobox.showinfoboxrequest.md' : 'ui/infobox/request/infobox.hideinfoboxrequest.md';
      e.target.href = this.$root.documentPathRequest + documentPathEnd;
    }
  }
}
</script>
