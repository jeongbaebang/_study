(() => {
  const $stepElems = document.querySelectorAll(".step");
  const $graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = $graphicElems[0]; //현재 활성화된 아이템
  let ioIndex = null;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1; //타입을 숫자로 만들기 위해 * 1 처리.
  });

  function setDataCirculation(nodeArray) {
    nodeArray.forEach((node) => {
      node.forEach((element, key) => {
        if (element.className === "step") {
          io.observe(element);
        }

        element.setAttribute("data-index", key);
      });
    });
  }

  setDataCirculation([$stepElems, $graphicElems]);

  function activate() {
    currentItem.classList.add("visible");
  }

  function inactivate() {
    currentItem.classList.remove("visible");
  }

  window.addEventListener("scroll", () => {
    let boundingRect = null;
    let step = null;
    let temp = null;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = $stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      temp += 1;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (currentItem) {
          inactivate();
        }
        currentItem = $graphicElems[step.dataset.index];
        activate();
      }
    }
  });
  activate();
})();
