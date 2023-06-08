//Cambio de cantidad de articulos ingresado por el usuario

//Seccion de los selectores let
let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userInput = document.querySelector('.input__number');
let cartNotification = document.querySelector('.header__cart--notification');
//Seccion de los selectores const
const addToCartBtn = document.querySelector('.details__button');
const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector('.cart-modal__chekout-container');


let userInputNumber = 0;

//Funcion para aumentar la cantidad de articulos ingresados

plusBtn.addEventListener('click', () => {
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});


//Funcion para disminuir la cantidad de articulos ingresados

minusBtn.addEventListener('click', () => {
    userInputNumber--;
    if(userInputNumber <= 0)userInputNumber = 0;
    userInput.value = userInputNumber;

});

//Agregar el total de productos al carrito cuando se presiona el boton de ADD TO CART

let  lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click', () => {

   
    lastValue = lastValue + userInputNumber; //Sumamos el valor anterior con el valor ya asignado

    cartNotification.innerText = lastValue;  //Muestra el valor seleccionado en el carrito
    cartNotification.style.display = 'block'; //Cambiamos le estilo display none a block para que aparezca el carrito    
    drawProductInModal();
});


//Mostrar el modal con el detalle del carrito


cartIconBtn.addEventListener('click', () => {
   cartModal.classList.toggle('show'); //Con toggle agg una clase a un elemento si este no la tiene pero si la tiene la agg y asi sucesivamente
   
   if(lastValue === 0) {
    productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    
   }else{
    drawProductInModal();
   }
   
});

//Borrar el contenido del carrito cuando se presiona el boton de borrar

function deleteProduct(){

    const deleteProductBtn = document.querySelector('.cart-modal__delete');
    deleteProductBtn.addEventListener('click', () => {
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
    });

};


// Cambiar imagenes al presionar los botones flechas


const imageContainer = document.querySelector('.gallery__image-container');
const previusGalleryBtn = document.querySelector('.gallery__previus');
const nextGalleryBtn = document.querySelector('.gallery__next');

let imageIndex = 1;

const imageUrls = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
]

nextGalleryBtn.addEventListener('click', () => {    
    changeNextImage(imageContainer);

});

previusGalleryBtn.addEventListener('click', () => {
    changePreviusImage(imageContainer);
});



//Mostra el modal de img cuando hago click en la img principal
const imagesModal = document.querySelector('.modal-gallery__background'); 
const closeModalBtn = document.querySelector('.modal-gallery__close');

imageContainer.addEventListener('click', () => {
    imagesModal.style.display = 'grid';
});
closeModalBtn.addEventListener('click', () => {
    imagesModal.style.display = 'none';

});


//Cambiar las img  principales desde los thumbnails

let thumbnails = document.querySelectorAll('.gallery__thumnail');
thumbnails = [...thumbnails];

thumbnails.forEach(thumbnail => {

    thumbnail.addEventListener('click', event => {
        let e = event.target.id;
       imageContainer.style.backgroundImage = `url('./images/image-product-${e}.jpg')`;
    ;
})
});


//Cambiar las img  principales desde los thumbnails en el modal

let modalThumbnails = document.querySelectorAll('.modal-gallery__thumnail');
const modalImageContainer = document.querySelector('.modal-gallery__image-container');
modalThumbnails = [...modalThumbnails];

modalThumbnails.forEach(modalThumbnail => {
    
    modalThumbnail.addEventListener('click', event => {
        let i = event.target.id.slice(-1);
        modalImageContainer.style.backgroundImage = `url('./images/image-product-${i}.jpg')`;
    });
});


//cambiar img desde las flachas del modal

const previusModalBtn = document.querySelector('.modal-gallery__previus');
const nextModalBtn = document.querySelector('.modal-gallery__next');


nextModalBtn.addEventListener('click', () => {    
    changeNextImage(modalImageContainer);

});

previusModalBtn.addEventListener('click', () => {
    changePreviusImage(modalImageContainer);
});




//Funcion para dibujar los productos en el modal
function drawProductInModal(){
    productContainer.innerHTML = `
    <div class="cart-modal__details-container">
    <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
    <div>
      <p class="cart-modal__product">Autumn Limited Edition...</p>
      <p class="cart-modal__price"></p>
    </div>
    <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
  </div>
 <button class="cart-modal__chekout">Checkout</button>
    `;
    deleteProduct();
    let priceModal = document.querySelector('.cart-modal__price'); //Seleccionamos nuevamente el price modal pq este que se formo arriba es distinto al generado al principodel codigo.
    priceModal.innerHTML = `$125 x${lastValue} <span>$${125 * lastValue}.00</span>`;


}

function changeNextImage(imageContainer){
    if(imageIndex === 4){
        imageIndex = 1;
    } else {
        imageIndex++;
    }
    imageContainer.style.backgroundImage = `url('./images/image-product-${imageIndex}.jpg')`;
}

function changePreviusImage(imageContainer){
    if(imageIndex === 1){
        imageIndex = 4;
    } else {
        imageIndex--;
    }
    imageContainer.style.backgroundImage = `url('./images/image-product-${imageIndex}.jpg')`;

};
