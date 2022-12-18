
let sliderWrap = document.querySelector('.slider-wrap');
let slider = document.querySelector('.slider');
let clonesWidth;
let sliderWidth;
let clones = [];
let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll('.slider-item')];
console.log(items);
let images = [...document.querySelectorAll('.img-div')];

images.forEach((image, idx) => {

  image.style.backgroundImage = `url(./images/${idx+1}.jpg)`;
})


items.forEach(item => {
  let clone = item.cloneNode(true);
  clone.classList.add('clone');
  slider.appendChild(clone);
  clones.push(clone);
})

function getClonesWidth(){
  let width = 0;
  clones.forEach(clone =>
    {
      width += clone.offsetWidth;
    })
  return width;
}

function getScrollPos(){
  //return window.scrollY;
  //return window.scrollX;
  return sliderWrap.scrollLeft;
}

function scrollUpdate(){
  //if(sliderWrap.stye.innerWidth > 760){
    scrollPos = getScrollPos();

    //if(scrollPos- sliderWrap.offsetWidth >= clonesWidth - 1){
    if(scrollPos >= clonesWidth - clonesWidth/2/images.length - 1){
      sliderWrap.scrollLeft = clonesWidth/2 - clonesWidth/2/images.length;
    }
    else if(scrollPos <= 1){

      sliderWrap.scrollLeft = clonesWidth/2;

     // sliderWrap.scrollLeft = clonesWidth - sliderWrap.offsetWidth - 1;
    }
  
    slider.style.transform = `translateX(${-sliderWrap.scrollLeft}px)`
  
    requestAnimationFrame(scrollUpdate)
  //}
  //else{
  //  sliderWrap.stye.overflow = 'scroll';
  //}
}

function onLoad(){
  calculateDimensions();
  //document.body.style.height = `${sliderWidth}px`
  sliderWrap.scrollLeft = 1;
  scrollUpdate();
}
function calculateDimensions(){
  sliderWidth = slider.getBoundingClientRect().width;
  clonesWidth = getClonesWidth();
  sliderWrap.addEventListener("scroll", event => {
    output.innerHTML = `sliderWidth: ${sliderWidth}<br>
    offset: ${sliderWrap.offsetWidth}<br>
    clonesWidth: ${clonesWidth}<br>
    scrollLeft: ${sliderWrap.scrollLeft}<br>
    clone-offset: ${clonesWidth - sliderWrap.offsetWidth}`;
}, { passive: true });

}
onLoad()



