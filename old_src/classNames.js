const makeBemClassNamer = function makeBemClassNamer(blockName) {
  return function bemClassNamer(element, modifier = null) {
    const elPart = !element ? '' : `__${element}`;
    const modPart = !modifier ? '' : `_${modifier}`;

    return `${blockName}${elPart}${modPart}`;
  };
};

const cn = makeBemClassNamer('Watch');

export default cn;
