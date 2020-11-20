(()=>{
    const $stepElems = document.querySelectorAll('.step');
    const $graphicElems = document.querySelectorAll('.graphic-item');
  
    const stepElemsLength = $stepElems.length;


    $stepElems.forEach((element,key) => {
        element.setAttribute('data-index',key);
    });
 
})();