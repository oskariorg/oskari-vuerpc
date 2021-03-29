const pointStyles = [{
  image: {
    shape: 2,
    size: 5,
    fill: {
      color: '#ff3300'
    },
    stroke: {
      color: '#000000'
    }
  },
  text: {
    scale: 1.3,
    fill: {
      color: 'rgba(0,0,0,1)'
    },
    stroke: {
      color: 'rgba(255,255,255,1)',
      width: 2
    },
    labelProperty: 'name',
    offsetX: 25,
    offsetY: 8
  }
}, {
  image: {
    shape: 1,
    size: 2,
    fill: {
      color: '#0033ff'
    },
    stroke: {
      color: '#00ff33'
    }
  },
  text: {
    labelProperty: null,
  }
}, {
  image: {
    shape: 3,
    size: 10,
    fill: {
      color: '#00FFFF'
    },
    stroke: {
      color: '#000000'
    }
  },
  text: {
    labelProperty: null,
  }
}];

const polygonStyles = [{
  fill: {
    color: '#FF0000'
  }
}, {
  fill: {
    color: '#00FFFF'
  }
}];

const createStyleCycler = (styles = polygonStyles) => {
  let currentStyle = 0;
  const getNextStyle = () => {
    currentStyle++;
    if (currentStyle >= styles.length) {
      currentStyle = 0;
    }
    return styles[currentStyle];
  };
  return getNextStyle;
};

export { pointStyles, polygonStyles, createStyleCycler };
