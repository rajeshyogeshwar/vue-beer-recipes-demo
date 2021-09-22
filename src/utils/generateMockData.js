export const getRandomChoice = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateBoxList = () => {
  let lastXMin = 0;
  let lastYMin = 0;

  let boxes = [];
  let numberOfBoxes = getRandomChoice([2, 3]);

  let colours = [
    {
      hex: "#fd09a8",
      rgba: {
        r: 253,
        g: 27,
        b: 174,
      },
    },
    {
      hex: "#d3bd45",
      rgba: {
        r: 211,
        g: 189,
        b: 69,
      },
    },
    {
      hex: "#3d5134",
      rgba: {
        r: 131,
        g: 165,
        b: 115,
      },
    },
    {
      hex: "#ffab1a",
      rgba: {
        r: 255,
        g: 171,
        b: 26,
      },
    },
  ];

  for (var i = 0; i < numberOfBoxes; i++) {
    let boxSize = getRandomNumberInRange(60, 90);

    let box = {
      label: {
        name: "L" + (i + 1),
        is_visible: true,
        colour: {
          rgba: {
            r: colours[i].rgba.r,
            g: colours[i].rgba.g,
            b: colours[i].rgba.b,
          },
          hex: colours[i].hex,
        },
      },
      soft_delete: false,
      selected: false,
      x_min: 0,
      y_min: 0,
      x_max: 0,
      y_max: 0,
      special_condition: getRandomChoice([true, false]),
    };

    // Set box dimensions and position

    if (lastXMin > 0 || lastYMin > 0) {
      if (lastXMin > 220) {
        box.x_min = getRandomNumberInRange((lastXMin - 75) * 1.4, lastXMin * 2);
      } else {
        box.x_min = getRandomNumberInRange(lastXMin * 1.4, lastXMin * 2);
      }
      lastXMin = box.x_min;

      box.y_min = getRandomNumberInRange(lastYMin * 1.4, lastYMin * 2);
      lastXMin = box.y_min;
    } else {
      box.x_min = getRandomNumberInRange(50, 150);
      box.y_min = getRandomNumberInRange(150, 220);
      lastXMin = box.x_min;
      lastYMin = box.y_min;
    }

    box.x_max = box.x_min + boxSize;
    box.y_max = box.y_min + boxSize;

    boxes.push(box);
  }

  let selectedBox = getRandomNumberInRange(0, boxes.length - 1);
  boxes[selectedBox].selected = true;
  return boxes;
};

export const getCurrentBox = (boxes) => {
  return boxes.filter((item) => item.selected === true)[0];
};
