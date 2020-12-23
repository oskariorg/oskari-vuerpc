const getMarkerTemplate = (x, y, msg) => {
  const template = {
    size: 4,
    shape: 2,
    color: '00FF00',
    x,
    y,
    msg
  };
  return template;
}

export { getMarkerTemplate };
