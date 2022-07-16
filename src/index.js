
const formEl = document.querySelector('.search-form');

const wrapGallery = document.querySelector('.gallery');
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

var throttle = require('lodash.throttle');

import ImgAPiServer from "./components-js/api-server";

formEl.addEventListener('submit', onSearch);

var lightbox = new SimpleLightbox('.gallery a');


const imgAPiServer = new ImgAPiServer;
function onSearch(e) {
  
    e.preventDefault();

    imgAPiServer.query = e.currentTarget.elements.searchQuery.value;
    wrapGallery.innerHTML = '';
    imgAPiServer.page = 1;
   
  imgAPiServer.fetchPhoto().then(response => {
        
    if (response.length === 0) {
          
         Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
         formEl.reset()
         return 
           
       }
       
        wrapGallery.insertAdjacentHTML('beforeend', makeMarkup(response));
         smoothScroll();
    lightbox.refresh();
    
 

      
    

    })

      

}


function makeMarkup(response) {
  return  response.map(element => {
    return `
        <div class="photo-card">
 <a  class="gallery__link" href="${element.largeImageURL}">
    <img
         width="350"
          height="250"
     src="${element.webformatURL}"
     class="gallery__image"
    
     data-source="${element.largeImageURL}"
       alt="${element.tags}"
       loading="lazy"
     
        
    />
  </a> 
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${element.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${element.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${element.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${element.downloads}
    </p>
  </div>
</div>


 
  

        `
  }).join('')
 
   
}



window.addEventListener('scroll', throttle(checkPosition,300));
window.addEventListener('resize', throttle(checkPosition,300));
function checkPosition() {

  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;

  const scrolled = window.scrollY;
 
  const threshold = height - screenHeight / 4;
  
  const position = scrolled + screenHeight;
    if (position >= threshold) {
        imgAPiServer.page += 1;
    
      imgAPiServer.fetchPhoto().then(response => {
       
      wrapGallery.insertAdjacentHTML('beforeend', makeMarkup(response));
        
         
   

    
    
     
 
      
    
     
   lightbox.refresh();

      
      smoothScroll();
    })

   
  }
}

function smoothScroll() {
    const { height: cardHeight } = document
.querySelector(".photo-card")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}
