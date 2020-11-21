(() => {
  const $stepElems = document.querySelectorAll(".step");
  const $graphicElems = document.querySelectorAll(".graphic-item");
  let currentItem = $graphicElems[0]; //현재 활성화된 아이템
  let ioIndex = null;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1; //타입을 숫자로 만들기 위해 * 1 처리.
  });

  const actions = {
    birdFlies(bool) {
      if (bool) {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
  };
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

  function activate(action) {
    currentItem.classList.add("visible");
    if (action) {
      actions[action](true);
    }
  }

  function inactivate(action) {
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let boundingRect = null;
    let step = null;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = $stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (currentItem) {
          inactivate(currentItem.dataset.action);
        }
        currentItem = $graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
      }
    }
  });

  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });
  activate();
})();
