const createLogger = (logStore) => {
  let id = logStore.length;
  return (data, args) => {
    const now = new Date().toLocaleTimeString() + ': ';
    id++;

    if (!args) {
      logStore.push({ id, header: now + data });
      return;
    }
    if (args instanceof Array) {
      for (const arg of args) {
        if (typeof arg === 'function') {
          return;
        } else if (typeof args === 'object') {
          let json = JSON.stringify(args, null, '  ');
          json = json.replace(/\\"/g, '"');
          args = json;
        }
      }
    }
    logStore.push({ id, header: now + data, json: args });
  };
};

const createOnReady = (channel, expectedOskariVersion) => {
  channel.enableDebug(true);
  channel.onReady(() => {
    channel.log('Map is now listening');

    channel.isSupported(expectedOskariVersion, (blnSupported) => {
      if (blnSupported) {
        channel.log('Client is supported and Oskari version is ' + expectedOskariVersion);
      } else {
        channel.log(
          'Oskari-instance is not the one we expect (' +
            expectedOskariVersion +
            ') or client not supported'
        );
        // getInfo can be used to get the current Oskari version
        channel.getInfo((oskariInfo) => {
          channel.log('Current Oskari-instance reports version as: ', oskariInfo);
        });
      }
    });
    channel.isSupported((blnSupported) => {
      if (!blnSupported) {
        channel.log(
          'Oskari reported client version is not supported: ' +
            OskariRPC.VERSION +
            '. The client might work, but some features are not backward compatible.'
        );
      } else {
        channel.log('Client is supported by Oskari.');
      }
    });
  });
};

export { createLogger, createOnReady };
