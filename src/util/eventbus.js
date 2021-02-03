const listeners = {};

const getListeners = (eventName) => {
    let handlers = listeners[eventName];
    if (handlers) {
        return handlers;
    }
    handlers = [];
    listeners[eventName] = handlers;
    return handlers;
};

const on = (eventName, callback) => {
    const handlers = getListeners(eventName);
    handlers.push(callback);
    return callback;
};

const off = (eventName, handlerToRemove) => {
    const handlers = getListeners(eventName);
    const indexToRemove = handlers.findIndex((savedHandler) => savedHandler === handlerToRemove);
    handlers.splice(indexToRemove, 1);
};

const once = (eventName, callback) => {
    const removeAfterUse = (...args) => {
        off(eventName, removeAfterUse);
        callback(...args);
    };
    return on(eventName, removeAfterUse);
};

const notifyListeners = (eventName, data, channel) => {
    // log them for user to see on the page
    if (channel) {
        channel.log(eventName, data);
    }
    // notify listeners in app
    getListeners(eventName)
        .forEach(handler => handler(data));
};

const initChannelListeners = (channel) => {
    channel.onReady(() => {
        channel.getSupportedEvents(data => {
          Object.keys(data)
            .forEach(eventName => {
                // just to initialize empty array and know what events are being listened to
                const ignored = getListeners(eventName);
                channel.handleEvent(eventName, (data) => notifyListeners(eventName, data, channel));
            });
          channel.log('Started listening to events from RPC:', Object.keys(data));
        });
      });
};

const getEventNames = () => Object.keys(listeners);

export default {
    on,
    once,
    off,
    getEventNames,
    notify: (name, data) => notifyListeners(name, data),
    initChannelListeners
};
