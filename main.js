(() => {
  const $stepElems = document.querySelectorAll(".step");
  const $graphicElems = document.querySelectorAll(".graphic-item");

  const setDataCirculation = (nodeArray) => {
    nodeArray.forEach((node) => {
      node.forEach((element, key) => {
        element.setAttribute("data-index", key);
      });
    });
  };

  setDataCirculation([$stepElems, $graphicElems]);
})();
