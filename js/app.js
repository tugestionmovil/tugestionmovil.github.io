//const bootstrap = require("bootstrap");

function iniciarApp(){
const promo=[
   {
    
    id: 1,
    title: "Promo 2x1 en Hamburguesas y Refreso",
    category: "dinner",
    price: 22,
    img: "./images/comida-01.jpg",
    desc: `2 Hamburguesas doble carne con tocineta, queso cheddar y 2 serv papas firtas +1 refresco 1.5L`,
    
  },
  {
    id: 2,
    title: "Buffalo Chicken wings 10 unidades",
    category: "lunch",
    price: 13,
    img: "./images/comida-02.jpg",
    desc: `Alitas de pollo a la boraster acompañadas de nuestra salsa picante , papas firtas y ensalada de la casa`,
    
  },
  {
    id: 3,
    title: "Lasagna y Refreso 1.5L + 1 Postre de la Casa",
    category: "lunch",
    price: 6,
    img: "./images/comida-03.jpg",
    desc: `deliciosa lasagna con salsas de la casay exquisita carne, jamon, queso mozzarella y parmesano gratinado.`,
  
  }
];

const menuAjaxReq=[
  {
    
    id: 1,
    title: "Hamburguesa",
    category: "dinner",
    price: 15,
    img: "./images/comida-01.jpg",
    desc: `Hamburguesa doble carne con tocineta, queso cheddar y papas firtas con tocineta en trozos `,
    
  },
  {
    id: 2,
    title: "Buffalo Chicken wings",
    category: "lunch",
    price: 13,
    img: "./images/comida-02.jpg",
    desc: `Alitas de pollo a la boraster acompañadas de nuestra salsa picante , papas firtas y ensalada de la casa`,
    
  },
  {
    id: 3,
    title: "lasagna",
    category: "lunch",
    price: 6,
    img: "./images/comida-03.jpg",
    desc: `deliciosa lasagna con salsas de la casay exquisita carne, jamon, queso mozzarella y parmesano gratinado.`,
  
  },
  {
    id: 4,
    title: "Pasta con Camarones",
    category: "lunch",
    price: 20,
    img: "./images/comida-04.jpg",
    desc: `Exquisita pasta vermicelli con salsa roja de la casa y camarones,a compañada de tu bebida favorita `,
    
  },
  {
    id: 5,
    title: "Pizza Tentación",
    category: "dinner",
    price: 22,
    img: "./images/comida-05.jpg",
    desc: `Pizza Gourmet tamaño familiar con queso mozarella, jamon, salchichon, aceitunas negras y tocineta. Acompañada de refresco familiar `,
    
  },
  {
    id: 6,
    title: "Baby Ribs",
    category: "dinner",
    price: 18,
    img: "./images/comida-06.jpg",
    desc: `Suave rack de costillas baby rib con salsa barbeque,a compañada de papas ftitas o al vapor y ensalada`,
    
  },
  {
    id: 7,
    title: "Panqueques",
    category: "Breakfast",
    price: 10,
    img: "./images/comida-08.jpeg",
    desc: `Suave panqueca de vainilla con frutas frescas y crema batida, acompañada de tocineta, café y jugo`,
    
  }
  
]; 
let articulosPedidos=[];
let cliente={
  nombre:'',
  fecha:'',
  idPedido:'',
  pedidoFinal:[]
}
const formularioParaValidar=document.querySelector('.needs-validation');
if (formularioParaValidar){
  formularioParaValidar.addEventListener('submit',validarFormulario)

} 
  const carrusel = document.querySelector(".slider-slides");

  if (carrusel){
    mostrarCarrusel();
}

function mostrarCarrusel(){

let maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
let intervalo = null;
let step = 1;
const start = () => {
  intervalo = setInterval(function () {
    carrusel.scrollLeft = carrusel.scrollLeft + step;
    if (carrusel.scrollLeft === maxScrollLeft) {
      step = step * -1;
    } else if (carrusel.scrollLeft === 0) {
      step = step * -1;
    }
  }, 10);
};

const stop = () => {
  clearInterval(intervalo);
};

carrusel.addEventListener("mouseover", () => {
  stop();
});

carrusel.addEventListener("mouseout", () => {
  start();
});
}

const divPromociones=document.querySelector(".promociones");
if(divPromociones){ 
  mostrarPromociones(promo);
}
  const selectCategorias=document.querySelector('#categorias');
  if (selectCategorias){
  obtenerCategorias(menuAjaxReq);
  selectCategorias.addEventListener('change',seleccionarCategorias);
  }
   const contenedorResultados=document.querySelector('#resultado');
 const contenidoPedidos=document.querySelector('.pedidos');
 if(contenidoPedidos){
  obtenerOrdenes();
 }

 const menus=document.querySelector('.menus');
const menuItems=document.querySelector('.menu-items');

const modal=new bootstrap.Modal('#modal',{});
const listaItems=document.querySelector('.modal-body');


// listaItems.addEventListener('click', agregarPedido);
/*  function agregarPedido(e){
   e.preventDefault();
console.log('click en agregar al carrito');
     if(e.target.classList.contains('agregar-carrito')){
      console.log(`yo origine el evento ${e.target}`);
          const item=e.target.parentElement.parentElement.parentElement;

         leerDatosItem(item);
    }

  } */
function obtenerCategorias(menuAjaxReq){  
  const categorias=menuAjaxReq.reduce((values,item)=>{
    if(!values.includes(item.category)){
      values.push(item.category);
    }
    return values;
  } ,['all']);
  mostrarCategorias(categorias);
}


  /* async function obtenerCategorias(){
    const url='https://www.themealdb.com/api/json/v1/1/categories.php';
       try{
      const respuesta=await fetch(url);
      const resultado=await respuesta.json();
      mostrarCategorias(resultado.categories);
      console.log(resultado.categories);
    }catch(error){
      console.log(error);
    }
  } */


function mostrarCategorias(categorias=[]){
  categorias.forEach(categoria=>{
    const opcionCategoria=document.createElement('OPTION');
    //const {category}=categoria;
    opcionCategoria.value=categoria;
    opcionCategoria.textContent=categoria;
    selectCategorias.appendChild(opcionCategoria);
  
  })
  


}
imprimirMenu(menuAjaxReq);
  
  function seleccionarCategorias(e){
       const category=e.target.value;
       console.log(category);
       const menuCategory=menuAjaxReq.filter((menuItem)=>{

      if(menuItem.category===category){
        console.log('es un match');
        return menuItem;
      }

      
    });
        if(category==="all"){
      console.log('estoy en all');
      imprimirMenu(menuAjaxReq);
    }else{
      console.log('estoy en categoria');
      console.log(menuCategory);
       imprimirMenu(menuCategory);
    }


  }
 function imprimirMenu(objeto){

 
   limpiarHTML(menuItems);

    objeto.forEach(el => {
      //console.log(el);
          const{id,title,category,price,img,desc}=el;
          const menuItem=document.createElement('article');
            menuItem.classList.add('menu-item','card','p-3');
          const itemPhoto= document.createElement('img');
          itemPhoto.classList.add('item-photo','card-img-top');
           itemPhoto.src=img;
           menuItem.appendChild(itemPhoto);
        const menuItemContainer=document.createElement('div');
        menuItemContainer.classList.add('menu-item-container');
               menuItem.appendChild(menuItemContainer);
        const menuItemInfo=document.createElement('div');
        menuItemInfo.classList.add('menu-item-info');
     
                menuItemContainer.appendChild(menuItemInfo);
          const menuItemDescription=document.createElement('div');
          menuItemDescription.classList.add('menu-item-description');

        const itemTitle=document.createElement('h4');
        itemTitle.classList.add('menu-item-title','fs-13');
        itemTitle.innerHTML=` ${title}` ;
        const itemPrice=document.createElement('p');
        const itemNumbrePrice= document.createElement('span');
        itemPrice.classList.add('menu-item-price' );
        itemPrice.innerHTML='$ ' ;
       itemNumbrePrice.innerHTML=`${price}`;
       itemNumbrePrice.classList.add('fs-7');
       itemPrice.appendChild( itemNumbrePrice);
        menuItemInfo.appendChild(itemTitle);
        menuItemInfo.appendChild(itemPrice);


 


          const pDescription=document.createElement('p');
          pDescription.textContent=desc;
          
          menuItemDescription.appendChild(pDescription);      

          const divBtn=document.createElement('div');
          divBtn.classList.add('menu-item-button');
          const orderBtn=document.createElement('button');
          orderBtn.classList.add('agregar-carrito','btn','btn-danger','col','txt-center');
          orderBtn.textContent="Ordenar";
          orderBtn.type="button";
          orderBtn.dataset.id=id;
          orderBtn.onclick=function(){
            //console.log(id);
            mostrarComidaModal(id);
          }



          divBtn.appendChild(orderBtn);
      menuItemContainer.appendChild(menuItemDescription);
          menuItemContainer.appendChild(divBtn);

menuItem.appendChild(menuItemContainer);

menuItems.appendChild(menuItem);

    });

      
  }

function mostrarComidaModal(id){
  limpiarHTML(listaItems);
  console.log('mostrando comida modal');
  const comida=menuAjaxReq.find((item)=>item.id===id);
  //console.log(comida);
  const {title,img,desc,price}=comida;
  const modalTitle=document.querySelector('.modal-title');
  modalTitle.textContent=title;
  const modalBody=document.querySelector('.modal-body');
  const imgModal=document.createElement('img');
  imgModal.src=img;
  imgModal.classList.add('img-fluid');
  imgModal.alt=`plato ${title}`;
  const descModal=document.createElement('p');
  descModal.textContent=desc;
  const divPrecioCantidad=document.createElement('div');
  divPrecioCantidad.classList.add('precio-cantidad','row');
  const colPrecio=document.createElement('div');
  colPrecio.classList.add('col-8');
const parrafPrecio=document.createElement('p');
parrafPrecio.textContent="Precio: $"
const numeroPrecio=document.createElement('span');
numeroPrecio.classList.add('menu-item-price');
numeroPrecio.textContent=price;
parrafPrecio.appendChild(numeroPrecio);
colPrecio.appendChild(parrafPrecio);
const colCantidad=document.createElement('div');
  colCantidad.classList.add('col-4');
  const inputCantidad=document.createElement('input');
  inputCantidad.type="number";
  inputCantidad.min="1";
  inputCantidad.classList.add('form-control');
  inputCantidad.value=1;
  /* inputCantidad.onchange=function(){
        const cantidadItem=Number( inputCantidad.value);
const subtotalItem=Number(price*cantidadItem);

  } */
  colCantidad.appendChild(inputCantidad);

  divPrecioCantidad.appendChild(colPrecio);
  divPrecioCantidad.appendChild(colCantidad);

  const divSubtotal=document.createElement('div');
  divSubtotal.classList.add('subtotal','row');
  const parrafoSubtotal=document.createElement('p');
  parrafoSubtotal.classList.add('col-12');
  parrafoSubtotal.textContent="Subtotal: $";
  const spanSubtotal=document.createElement('span');
  spanSubtotal.classList.add('menu-item-price');

  spanSubtotal.textContent=price;
  parrafoSubtotal.appendChild(spanSubtotal);
  divSubtotal.appendChild(parrafoSubtotal);

  modalBody.appendChild(imgModal);
  modalBody.appendChild(descModal);
  modalBody.appendChild(divPrecioCantidad);
modalBody.appendChild(divPrecioCantidad);

modalBody.appendChild(divSubtotal);

  inputCantidad.onchange=function(){
    console.log('entre al cambio de la cantidad');
    limpiarHTML(divSubtotal);
     
    const cantidadItem=Number( inputCantidad.value);
const subtotalItem=Number(price*cantidadItem);
const parrafoSubtotal=document.createElement('p');
  parrafoSubtotal.classList.add('col-12');
  parrafoSubtotal.textContent="Subtotal: $";
  const spanSubtotal=document.createElement('span');
  spanSubtotal.classList.add('menu-item-price');

  spanSubtotal.textContent=subtotalItem;
  parrafoSubtotal.appendChild(spanSubtotal);
  divSubtotal.appendChild(parrafoSubtotal);
  }

/*   modalBody.innerHTML=`
  <img src="${img}" alt="${title}" class="img-fluid">
  <p>${desc}</p>
  <div class="row">
  <div class="col-8">
  <p>Precio: $ <span class="menu-item-price">${price}</span></p>
  </div>
  <div class="col-4">
  <input class="form-control" type="number" value="1"></input>
  </div>

</div>
  `; */
const modalFooter=document.querySelector('.modal-footer');
limpiarHTML(modalFooter);
const btnAddCart=document.createElement('BUTTON');
btnAddCart.classList.add('btn','btn-danger','col');
btnAddCart.id="#add-cart";
btnAddCart.textContent="Agregar a Carrito";
//btnAddCart.textContent=existeStorage(id)?'Eliminar del Carrito':'Agregar al Carrito';
btnAddCart.onclick=function(){
      const cantidadItem=Number( inputCantidad.value);
const subtotalItem=Number(price*cantidadItem);
/*   if(existeStorage(id)){
     elmimarCarrito(id);
    btnAddCart.textContent="Agregar a Carrito";
    mostrarToast('Eliminado Correctamente');
    return
  } */

  agregarCarrito({
    id:id,
    titulo:title,
    img:img,
    precio:price,
    cantidad:cantidadItem,
    subtotal:subtotalItem
   
    
  });
  btnAddCart.textContent="Eliminar del Carrito";
  mostrarToast('Agregado Correctamente');
}

modalFooter.appendChild(btnAddCart);

const btnCerrarModal=document.createElement('BUTTON');
btnCerrarModal.classList.add('btn','btn-secondary','col');
btnCerrarModal.textContent="Cerrar";
modalFooter.appendChild(btnCerrarModal);
btnCerrarModal.onclick=function(){
  modal.hide();
}



  btnAddCart.dataset.id=id;
  modal.show();
}

function agregarCarrito(infoArticulo){
 const articulosCarrito=JSON.parse(localStorage.getItem('articulosCarrito'))||[];
/*  localStorage.setItem('articulosCarrito',JSON.stringify([...articulosCarrito,infoArticulo])); */
articulosPedidos=articulosCarrito;
const existe=articulosPedidos.some(articulo=>articulo.id===infoArticulo.id);
if(existe){
  const articulos=articulosPedidos.map(articulo=>{
    if(articulo.id===infoArticulo.id){
      articulo.cantidad++;
      articulo.subtotal=Number(articulo.precio)*Number(articulo.cantidad);
      return articulo;

    }else{
      return articulo;
    }
  })
  articulosPedidos=[...articulos];
}else{
  articulosPedidos=[...articulosPedidos,infoArticulo];
}
localStorage.setItem('articulosCarrito',JSON.stringify(articulosPedidos));


  }
function mostrarPromociones(promo){
  const promoTitle=document.createElement('H2');
  promoTitle.classList.add('text-center','text-uppercase','font-weight-bold');
  promoTitle.textContent="Promociones y Eventos";
  divPromociones.appendChild(promoTitle);

  promo.forEach(el=>{
   const {id,title,img,desc,price}=el;
    const promoContenedor = document.createElement('DIV');
            promoContenedor.classList.add('col-md-4');
const promoCard = document.createElement('DIV');
            promoCard.classList.add('card', 'mb-4');
const promoImagen = document.createElement('IMG');
            promoImagen.classList.add('card-img-top','img-fluid');
            promoImagen.src = img;
const promoCardBody = document.createElement('DIV');
            promoCardBody.classList.add('card-body');

            const promoHeading = document.createElement('H5');
            promoHeading.classList.add('card-title', 'mb-3','text-center');
            promoHeading.textContent = title;

            promoCardBody.appendChild(promoHeading);
            promoCard.appendChild(promoImagen);
            promoCard.appendChild(promoCardBody)
            promoContenedor.appendChild(promoCard);
            divPromociones.appendChild(promoContenedor);

  })
  
}





function elmimarCarrito(id){
 const articulosCarrito=JSON.parse(localStorage.getItem('articulosCarrito'))||[];
 const articulosfiltrados=articulosCarrito.filter(articulo=>articulo.id!==id);
  localStorage.setItem('articulosCarrito',JSON.stringify(articulosfiltrados));
}
function existeStorage(id){
 const articulosCarrito=JSON.parse(localStorage.getItem('articulosCarrito'))||[];
 return articulosCarrito.some(articulo=>articulo.id===id);
}

function mostrarToast(mensaje){
  const toastDiv=document.querySelector('#toast');
  const toastBody=document.querySelector('.toast-body');
  const toast=new bootstrap.Toast(toastDiv);
  toastBody.textContent=mensaje;
  toast.show();
  setTimeout(() => {
    toast.hide();
  }, 1500);

}

function obtenerOrdenes(){
  const ordenes=JSON.parse(localStorage.getItem('articulosCarrito'))||[];
  //console.log(ordenes);
  if(ordenes.length){
    llenarOrden(ordenes);
     formularioDelivery();
    return

  }
const noPedidos=document.createElement('p');
noPedidos.textContent="No hay articulos agregados al carrito aún";
  noPedidos.classList.add('fs-4','font-bold','text-center','mt-5');
  contenedorResultados.appendChild(noPedidos);
 const btnVerMenu=document.createElement('A');
  btnVerMenu.classList.add('btn','btn-danger','col-12','mt-3');
  btnVerMenu.textContent="Ver Menú";
  btnVerMenu.href="index.html";
  contenedorResultados.appendChild(btnVerMenu);

}

/*****************Inicio Nueva Funcion llenarOrdenes************************** */

function llenarOrden(ordenes){
/************Tabla contendedora de pedidos************* */
let total=0;
const tablaPedidos=document.createElement('DIV');
    tablaPedidos.id='tablaPedidos';
    tablaPedidos.classList.add('col-md-6','col-sm-12' ,'order-md-1', 'mb-4');
/*****************Heading de Pedidos********************* */
   const tablaPedidosHeading=document.createElement('H4');
   tablaPedidosHeading.classList.add('d-flex' ,'justify-content-between' ,'align-items-center' ,'mb-3');
   const tablaPedidosSpan1=document.createElement('SPAN');
    tablaPedidosSpan1.classList.add('text-muted');
    tablaPedidosSpan1.textContent='Tu Orden';
    const divTotal=document.createElement('SPAN');
    divTotal.classList.add('badge' ,'badge-secondary' ,'badge-pill','bg-dark');
    //divTotal.textContent=`Total: $120`;
    tablaPedidosHeading.appendChild(tablaPedidosSpan1);
    tablaPedidosHeading.appendChild(divTotal);
    tablaPedidos.appendChild(tablaPedidosHeading);
ordenes.forEach(orden=>{
 const {imagen,titulo,precio,id,cantidad,subtotal}=orden;



    /*******************Contenido de los pedidos*********************/
    const tablaPedidosContenido=document.createElement('UL');
    tablaPedidosContenido.classList.add('pedido','list-group' ,'mb-3');
    const liLista1=document.createElement('LI');
    liLista1.classList.add('list-group-item','d-flex','justify-content-between','lh-condensed');
    const divTitulo=document.createElement('DIV');
    const pedidoItem=document.createElement('SMALL');
    pedidoItem.classList.add('my-0','fw-bold');
    pedidoItem.textContent=titulo;
    pedidoItem.id="itemTitulo";
    const liLista2=document.createElement('LI');
  
  const pedidoPrecio=document.createElement('SPAN');
  pedidoPrecio.classList.add('text-muted');
   pedidoPrecio.textContent=`$${precio}`;
   pedidoPrecio.id="itemPrecio";


   liLista2.classList.add('list-group-item','d-flex','justify-content-between','lh-condensed');
    
  const divGrupoCantidad=document.createElement('SPAN');
  divGrupoCantidad.classList.add('justify-content-end','align-items-center','d-flex');


  const minusButton = document.createElement('BUTTON');
  minusButton.classList.add('btn','minus');
  minusButton.textContent='-';

const plusButton = document.createElement('BUTTON');
plusButton.classList.add('btn','plus');
plusButton.textContent='+';
const pedidoCantidad = document.createElement('input');
pedidoCantidad.classList.add('col-2');
pedidoCantidad.type="text";
pedidoCantidad.id="itemCantidad"


  pedidoCantidad.value=cantidad;
  pedidoCantidad.setAttribute('data-id',`${id}`);

minusButton.onclick=(e)=>{
  e.preventDefault();
  const currentValue = Number(pedidoCantidad.value) || 0;
  pedidoCantidad.value = currentValue - 1;
 nuevaCantidad=parseInt(pedidoCantidad.value);
    actualizarResumenCantidad(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad);

}

plusButton.onclick=(e)=>{
  e.preventDefault();
  const currentValue = Number(pedidoCantidad.value) || 0;
  pedidoCantidad.value = currentValue + 1;
  nuevaCantidad=parseInt(pedidoCantidad.value);
    actualizarResumenCantidad(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad);

}

//const divTituloCantidad=document.createElement('DIV');
    const pedidotituloCantidad=document.createElement('SMALL');
    pedidotituloCantidad.classList.add('my-0');
    pedidotituloCantidad.textContent='';
  
   const btnEliminaItem=document.createElement('button');
  btnEliminaItem.classList.add('btn','btn-sm','btn-danger','col-md-2','mt-2');
  btnEliminaItem.textContent='Eliminar';

    btnEliminaItem.onclick=()=>{
       let result=ordenes.filter(orden=>orden.id!=id);
      actualizaStorage(result);
      window.location.href='pedidos.html';
    //eliminarItemPedido(id);
  }

divGrupoCantidad.appendChild(pedidotituloCantidad);
divGrupoCantidad.appendChild(minusButton);
divGrupoCantidad.appendChild(pedidoCantidad);
divGrupoCantidad.appendChild(plusButton);

    divTitulo.appendChild(pedidoItem);
    liLista1.appendChild(divTitulo);
    liLista1.appendChild(pedidoPrecio);
    // liLista2.appendChild(divTituloCantidad);
       liLista2.appendChild(btnEliminaItem);
    liLista2.appendChild(divGrupoCantidad);

  
    

    const liLista3=document.createElement('LI');
    liLista3.classList.add('list-group-item','d-flex','justify-content-between','lh-condensed','bg-secondary','text-white');
    const PedidoSubtotal=document.createElement('div');
    PedidoSubtotal.classList.add('text-white');

  const subtotalTexto=document.createElement('SMALL');
    subtotalTexto.classList.add('my-0');
    subtotalTexto.textContent='Subtotal:';
 const pedidoSubtotal=document.createElement('SPAN');
 pedidoSubtotal.id="itemSubtotal";
  pedidoSubtotal.classList.add('text-white');
  pedidoSubtotal.textContent=`$${Number(subtotal)}`;
  PedidoSubtotal.appendChild(subtotalTexto);
  PedidoSubtotal.appendChild(pedidoSubtotal);
  liLista3.appendChild(PedidoSubtotal);

    
    liLista3.appendChild(pedidoSubtotal);
    

    tablaPedidosContenido.appendChild(liLista1);
    tablaPedidosContenido.appendChild(liLista2);
    tablaPedidosContenido.appendChild(liLista3);
  tablaPedidos.appendChild(tablaPedidosContenido);





    contenidoPedidos.appendChild(tablaPedidos);
   

  pedidoCantidad.onchange=function(){
    nuevaCantidad=parseInt(pedidoCantidad.value);
    actualizarResumenCantidad(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad);


    console.log(orden);
    
  }


});
let sumaProductos=ordenes.reduce((total,orden)=>total+Number(orden.subtotal),0);
divTotal.textContent=`Total: $${Number(sumaProductos)}`;
    
}

/*****************Fin Nueva Funcion llenarOrdenes************************** */

/* function llenarOrden(ordenes){
  //console.log(ordenes);
  let total=0;
  ordenes.forEach(orden=>{
 const {imagen,titulo,precio,id,cantidad,subtotal}=orden;
  //console.log(titulo);
  const pedido=document.createElement('div');
  pedido.classList.add('pedido','row','border','border-2','rounded','p-2','mt-2');
  const pedidoItem=document.createElement('div');
  pedidoItem.textContent=titulo;
  pedidoItem.id="itemTitulo";
  pedidoItem.classList.add('fs-7','col-md-2','mt-2');
    const pedidoPrecio=document.createElement('div');
  pedidoPrecio.textContent=`$${precio}`;
  pedidoPrecio.id="itemPrecio";
   pedidoPrecio.classList.add('fs-7','col-md-2','mt-2');
  const pedidoCantidad=document.createElement('input');
  pedidoCantidad.classList.add('col-md-2','mt-2');
  pedidoCantidad.id="itemCantidad"
  pedidoCantidad.type='number';
  pedidoCantidad.min="0";

  pedidoCantidad.value=cantidad;
  pedidoCantidad.setAttribute('data-id',`${id}`);



 

  const btnEliminaItem=document.createElement('button');
  btnEliminaItem.classList.add('borrar-item','btn','btn-danger','col-md-2','mt-2');
  btnEliminaItem.textContent='Eliminar Item';
  //btnEliminaItem.dataset.id=`${id}`;
  btnEliminaItem.onclick=()=>{
       let result=ordenes.filter(orden=>orden.id!=id);
      actualizaStorage(result);
      window.location.href='pedidos.html';
    //eliminarItemPedido(id);
  }


 

  
  const pedidoSubtotal=document.createElement('div');
  pedidoSubtotal.textContent=`$${Number(subtotal)}`;
  pedidoSubtotal.id="itemSubtotal";
  pedidoSubtotal.classList.add('col-md-2','mt-2');
  pedidoCantidad.onchange=function(){
    nuevaCantidad=parseInt(pedidoCantidad.value);
    actualizarResumenCantidad(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad);


    console.log(orden);
    
  }
  pedido.appendChild(pedidoItem);
    pedido.appendChild(pedidoPrecio);
    pedido.appendChild(pedidoCantidad);

    pedido.appendChild(pedidoSubtotal);
     pedido.appendChild(btnEliminaItem);
    

  contenidoPedidos.appendChild(pedido);

  });
const divTotal=document.createElement('div');

let sumaProductos=ordenes.reduce((total,orden)=>total+Number(orden.subtotal),0);
divTotal.textContent=`Total sin Delivery: $${Number(sumaProductos)}`;
divTotal.classList.add('fs-5','font-bold','mb-5','justify-content-end','d-flex');
contenidoPedidos.appendChild(divTotal);
} */

function actualizarResumenCantidad(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad){
  console.log(nuevaCantidad,orden,pedidoSubtotal,divTotal,ordenes,pedidoCantidad);
      if (nuevaCantidad>0){
            orden.cantidad=nuevaCantidad;
    orden.subtotal=Number(nuevaCantidad)*Number(orden.precio);
      pedidoSubtotal.textContent=`$${orden.subtotal}`;
      let sumaProductos=ordenes.reduce((total,orden)=>total+Number(orden.subtotal),0);
      divTotal.textContent=`$${Number(sumaProductos)}`; limpiarDelivery();
      limpiarTotalesDelivery();
     
    actualizaStorage(ordenes);
    }else{
      //console.log(pedidoCantidad.dataset.id);
     let result=ordenes.filter(orden=>orden.id!=pedidoCantidad.dataset.id);
      actualizaStorage(result);
      window.location.href='pedidos.html';
    }
  }

function formularioDelivery(){
const divCol=document.createElement('div');
divCol.classList.add('col-md-6','order-md-2','form-delivery-total');
const tituloDelivery=document.createElement('h4');
tituloDelivery.classList.add('mb-3','border-bottom','border-top');
tituloDelivery.textContent='Delivery';
const tituloSmall=document.createElement('small');
tituloSmall.classList.add('text-muted');
tituloSmall.textContent=' --Seleccione una opción--';

divCol.appendChild(tituloDelivery);

divCol.appendChild(tituloSmall);

const divRow1=document.createElement('div');
divRow1.classList.add('d-block','my-3','delivery-option');
//formNeedVal.appendChild(divRow1);
const divCol11=document.createElement('div');
divCol11.classList.add('custom-control','custom-radio');
 const radioCorto=document.createElement('input');
radioCorto.type='radio';
radioCorto.name='delivery';
radioCorto.value='3';
radioCorto.classList.add=('custom-control-input');
const radioCortoLabel=document.createElement('label');
radioCortoLabel.textContent="  Delivery Corto 3%";
radioCortoLabel.classList.add('custom-control-label');
radioCorto.onclick=calcularDelivery;
//radioCortoLabel.for='delivery'
divCol11.appendChild(radioCorto);
divCol11.appendChild(radioCortoLabel);

const divCol12=document.createElement('div');
divCol12.classList.add('custom-control','custom-radio');
 const radioLargo=document.createElement('input');
radioLargo.type='radio';
radioLargo.name='delivery';
radioLargo.value='5';
radioLargo.classList.add=('custom-control-input');
const radioLargoLabel=document.createElement('label');
radioLargoLabel.textContent="  Delivery Largo 5%";
radioLargoLabel.classList.add('custom-control-label');
radioLargo.onclick=calcularDelivery;
divCol12.appendChild(radioLargo);
divCol12.appendChild(radioLargoLabel);

//radioLargoLabel.for='delivery'
const divCol13=document.createElement('div');
divCol13.classList.add('custom-control-input');
 const radioRecoger=document.createElement('input');
radioRecoger.type='radio';
radioRecoger.name='delivery';
radioRecoger.value='0';
radioRecoger.classList.add=('custom-control-input');
const radioRecogerLabel=document.createElement('label');
radioRecogerLabel.textContent="  Recoger en Sitio- S/Cargo";
radioRecogerLabel.classList.add('custom-control-label');
radioRecoger.onclick=calcularDelivery;
divCol13.appendChild(radioRecoger);
divCol13.appendChild(radioRecogerLabel);

divRow1.appendChild(divCol11);
divRow1.appendChild(divCol12);
divRow1.appendChild(divCol13);
divCol.appendChild(divRow1);

    contenedorResultados.appendChild(divCol);
}



  /* function formularioDelivery(){
    const divPedidos=document.querySelector('.pedidos');
    const principal=document.querySelector('main');
    const divFormulario=document.createElement('div');
    divFormulario.classList.add('formulario-contenedor','col-md-6' ,'order-md-2');
    const formValidacion=document.createElement('form');
    formValidacion.classList.add('needs-validation');
    formValidacion.noValidate=true;
     divFormulario.appendChild(formValidacion);

  

const contenedorDelivery=document.createElement('div');
contenedorDelivery.classList.add('contenedor-delivery','mb-5','row');
  const headingDelivery=document.createElement('h3');
  headingDelivery.classList.add('mb-3');
  headingDelivery.textContent='Datos Delivery';
  contenedorDelivery.appendChild(headingDelivery);

 //Radio button Delivery Corto: 3%
 const radioCorto=document.createElement('input');
radioCorto.type='radio';
radioCorto.name='delivery';
radioCorto.value='3';
radioCorto.classList.add=('form-check-input');
radioCorto.onclick=calcularDelivery;
const radioCortoLabel=document.createElement('label');
radioCortoLabel.textContent="  Delivery Corto 3%";
radioCortoLabel.classList.add('form-check-label','fs-7');
const radioCortoDiv=document.createElement('div');
radioCortoDiv.classList.add('form-check');
radioCortoDiv.appendChild(radioCorto);
radioCortoDiv.appendChild(radioCortoLabel);
//Radio button Delivery LArgo: 5%
 const radioLargo=document.createElement('input');
radioLargo.type='radio';
radioLargo.name='delivery';
radioLargo.value='5';
radioLargo.classList.add=('form-check-input');
radioLargo.onclick=calcularDelivery;
const radioLargoLabel=document.createElement('label');
radioLargoLabel.textContent="  Delivery Largo 5%";
radioLargoLabel.classList.add('form-check-label','fs-7');
const radioLargoDiv=document.createElement('div');
radioLargoDiv.classList.add('form-check');
radioLargoDiv.appendChild(radioLargo);
radioLargoDiv.appendChild(radioLargoLabel);

//Radio button Delivery LArgo: 5$
 const radioRecoger=document.createElement('input');
radioRecoger.type='radio';
radioRecoger.name='delivery';
radioRecoger.value='0';
radioRecoger.classList.add=('form-check-input');
radioRecoger.onclick=calcularDelivery;
const radioRecogerLabel=document.createElement('label');
radioRecogerLabel.textContent=" Recoger en Sitio - No tiene Cargo";
radioRecogerLabel.classList.add('form-check-label','fs-7');
const radioRecogerDiv=document.createElement('div');
radioRecogerDiv.classList.add('form-check');
radioRecogerDiv.appendChild(radioRecoger);
radioRecogerDiv.appendChild(radioRecogerLabel);


//Agregar al Div principal
   
   contenedorDelivery.appendChild(radioCortoDiv);
   contenedorDelivery.appendChild(radioLargoDiv);
  contenedorDelivery.appendChild(radioRecogerDiv);
   formValidacion.appendChild(contenedorDelivery);
 


  divPedidos.appendChild(divFormulario);
} */


function calcularDelivery(){

  let subtotalPedido=0;
  const ordenes=JSON.parse(localStorage.getItem('articulosCarrito'))|| [];
  console.log(ordenes);

  //Calcular el subtotal a pagar
  ordenes.forEach(articulo=>{
    subtotalPedido+=Number(articulo.cantidad)*Number(articulo.precio);
  });

//Seleccionar el radio button del delivery
  const deliverySeleccionado=document.querySelector('[name="delivery"]:checked').value;
//Calcular el delivery
const delivery=((Number(subtotalPedido)*Number(deliverySeleccionado))/100);
console.log(delivery);

//Calcular el Total a pagar

const totalPedido=Number(subtotalPedido)+Number(delivery);
console.log(totalPedido);

mostrarTotalHTML(subtotalPedido,totalPedido,delivery);
}

function mostrarTotalHTML(subtotalPedido,totalPedido,delivery){  
 console.log(Number(subtotalPedido));
  console.log(Number(delivery));
  console.log(Number(totalPedido));
  const contenedorResultados=document.querySelector('#resultado');
const divCol=document.querySelector('.form-delivery-total');
  const formNeedVal=document.createElement('form');
formNeedVal.classList.add('needs-validation');


  /****************Subtotal**************** */
const divColSubtotal=document.createElement('div');
divColSubtotal.classList.add('col-md-4','mb-3');

const labelSubtotal=document.createElement('label');
labelSubtotal.textContent='Subtotal en $';
const subtotalInput=document.createElement('input');
subtotalInput.type='text';

subtotalInput.classList.add('form-control');
subtotalInput.value=`${subtotalPedido}`;
subtotalInput.id='subtotal-pedido';
subtotalInput.readOnly=true;
subtotalInput.required=true;

/*************Delivery***************** */
const divInvalidDelivery=document.createElement('div');
divInvalidDelivery.classList.add('invalid-feedback');
divInvalidDelivery.textContent='Debe seleccionar 1 opción de Entrega';



 
const divColDelivery=document.createElement('div');
divColDelivery.classList.add('col-md-4','mb-3');
const labelDelivery=document.createElement('label');
labelDelivery.textContent='Delivery en $';
const deliverySeleccionado=document.createElement('input');
deliverySeleccionado.type='text';

deliverySeleccionado.classList.add('form-control');
deliverySeleccionado.value=`${delivery}`;
deliverySeleccionado.id='monto-delivery-pedido';
deliverySeleccionado.readOnly=true;
deliverySeleccionado.required=true;



    








const divColTotal=document.createElement('div');
divColTotal.classList.add('col-md-4','mb-3','fw-bold','text-success');
const labelTotal=document.createElement('label');
labelTotal.textContent='Total en $';
const totalPedidoInput=document.createElement('input');
totalPedidoInput.type='text';

totalPedidoInput.classList.add('form-control','fw-bold','text-success');
totalPedidoInput.value=`${totalPedido}`;
totalPedidoInput.id='monto-total-pedido';
totalPedidoInput.readOnly=true;
totalPedidoInput.required=true;



const divColNombre=document.createElement('div');
divColNombre.classList.add('col-md-6','mb-3');
const labelNombre=document.createElement('label');
labelNombre.textContent='Nombre Cliente';
const nombreCliente=document.createElement('input');
nombreCliente.type='text';
nombreCliente.classList.add('form-control');
nombreCliente.required=true;
nombreCliente.id="nombre-cliente";
nombreCliente.placeholder="Su Nombre";
const divInvalidNombre=document.createElement('div');
divInvalidNombre.classList.add('invalid-feedback');
divInvalidNombre.textContent='Favor indicar Nombre';
divColNombre.appendChild(labelNombre);
divColNombre.appendChild(nombreCliente);
divColNombre.appendChild(divInvalidNombre);


const divColTelefono=document.createElement('div');
divColTelefono.classList.add('col-md-6','mb-3');
const labelTelefono=document.createElement('label');
labelTelefono.textContent='Teléfono Cliente';
const telefonoCliente=document.createElement('input');
telefonoCliente.type='text';
telefonoCliente.classList.add('form-control');
telefonoCliente.required=true;
telefonoCliente.id="telefono-cliente";
telefonoCliente.placeholder="Su Número Telefónico";
const divInvalidTelefono=document.createElement('div');
divInvalidTelefono.classList.add('invalid-feedback');
divInvalidTelefono.textContent='Favor indicar Telefono';
divColTelefono.appendChild(labelTelefono);
divColTelefono.appendChild(telefonoCliente);
divColTelefono.appendChild(divInvalidTelefono);

const btnAgregarPedido=document.createElement('button');
btnAgregarPedido.textContent='Ordenar';
btnAgregarPedido.type='submit'
btnAgregarPedido.classList.add('btn','btn-primary','btn-lg','btn-block','colmd-12');




divColDelivery.appendChild(labelDelivery);
divColDelivery.appendChild(deliverySeleccionado);
divColDelivery.appendChild(divInvalidDelivery);
divColSubtotal.appendChild(labelSubtotal);
divColSubtotal.appendChild(subtotalInput);
divColTotal.appendChild(labelTotal);
divColTotal.appendChild(totalPedidoInput);

const totalPagar=document.querySelector('.total-pagar');
if(totalPagar){
  totalPagar.remove();
}
const divRow2=document.createElement('div');
divRow2.classList.add('row','total-pagar');
formNeedVal.appendChild(divRow2);

divRow2.appendChild(divColDelivery);
divRow2.appendChild(divColSubtotal);
divRow2.appendChild(divColTotal);
divRow2.appendChild(divColNombre);
divRow2.appendChild(divColTelefono);
 formNeedVal.appendChild(divRow2);
//divCol.appendChild(divRow2);



divRow2.appendChild(btnAgregarPedido);
divCol.appendChild(formNeedVal);
contenedorResultados.appendChild(divCol);

btnAgregarPedido.onclick=()=>{
  ordenarPedido();
}

}



/* function mostrarTotalHTML(subtotalPedido,totalPedido,delivery){
  console.log(Number(subtotalPedido));
  console.log(Number(delivery));
  console.log(Number(totalPedido));

  const divTotales=document.createElement('div');
  divTotales.classList.add('total-pagar','row','card');

  //Subtotal
     const subtotalParrafo=document.createElement('p');
   subtotalParrafo.classList.add('fs-4','fw-bold','mt-2');
   subtotalParrafo.textContent='Subtotal Pedido: $';
   
   const subtotalSpan=document.createElement('span');
   subtotalSpan.classList.add('fw-normal');
   subtotalSpan.id="subtotal-pedido"
   subtotalSpan.textContent=`${subtotalPedido}`;

   subtotalParrafo.appendChild(subtotalSpan);

//Delivery
   const deliveryParrafo=document.createElement('p');
   deliveryParrafo.classList.add('fs-4','fw-bold','mt-2');
   deliveryParrafo.textContent='Costo Delivery: $ ';
   const deliverySpan=document.createElement('span');
   deliverySpan.id="monto-delivery-pedido";
   deliverySpan.classList.add('fw-normal');
   deliverySpan.textContent=`${delivery}`;
   

   deliveryParrafo.appendChild(deliverySpan);
 
   //Total
   const totalParrafo=document.createElement('p');
   totalParrafo.classList.add('fs-4','fw-bold','mt-2');
   totalParrafo.textContent='Total a Pagar: $';
   const totalSpan=document.createElement('span');
   totalSpan.classList.add('fw-normal');
   totalSpan.textContent=`${totalPedido}`;
   totalSpan.id="monto-total-pedido"

   totalParrafo.appendChild(totalSpan);

const totalpagarDiv=document.querySelector('.total-pagar');
if(totalpagarDiv){
  totalpagarDiv.remove();
}
   divTotales.appendChild(subtotalParrafo);
  divTotales.appendChild(deliveryParrafo);
  divTotales.appendChild(totalParrafo);
const nombreClienteLabel=document.createElement('label');
nombreClienteLabel.textContent="Nombre Cliente";
nombreClienteLabel.classList.add('form-check-label','mb-3');
  const nombreCliente=document.createElement('input');
  nombreCliente.type="text";
  nombreCliente.required=true;
  nombreCliente.id="nombre-cliente";
  nombreCliente.classList.add('mb-3','form-control','col-md-6');

const telefonoClienteLabel=document.createElement('label');
telefonoClienteLabel.textContent="Telefono Cliente";
telefonoClienteLabel.classList.add('form-check-label','mb-3');
  const telefonoCliente=document.createElement('input');
  telefonoCliente.type="tel";
  telefonoCliente.required=true;
  telefonoCliente.id="telefono-cliente";
  telefonoCliente.classList.add('mb-3','form-control','col-md-6');
  


  divTotales.appendChild(nombreClienteLabel);
  divTotales.appendChild(nombreCliente);
    divTotales.appendChild(telefonoClienteLabel);
   divTotales.appendChild(telefonoCliente);
const btnAgregarPedido=document.createElement('button');
btnAgregarPedido.textContent='Ordenar';
btnAgregarPedido.classList.add('btn','btn-primary','col-12','mb-5');
divTotales.appendChild(btnAgregarPedido);
btnAgregarPedido.onclick=()=>{
  ordenarPedido();
}
   const formulario=document.querySelector('.formulario-contenedor');
   const formValidacion=document.querySelector('.needs-validation');
  formValidacion.appendChild(divTotales);

} */

  function ordenarPedido(){


const listaPedido=document.querySelectorAll('.pedido');
    console.log('ordenando pedido');
    const {pedidoFinal}=cliente;

    const ordenes=JSON.parse(localStorage.getItem('articulosCarrito'))|| [];
    
  if (ordenes.length){
let ordenCompleta= cliente.pedidoFinal=[...pedidoFinal,ordenes];
  finalizarCompra();
 // console.log(ordenCompleta); 

//let win= window.open(`https://wa.me/584127933936?text=Hola%20quiero%20ordenar%20esto%20${JSON.stringify(cliente.pedidoFinal)}`,'_blank');  
}
else{
}


  }

function finalizarCompra(){

  const deliverySeleccionado=document.querySelector('#monto-delivery-pedido').value;
const tipoDelivery=document.querySelector('[name="delivery"]:checked').value;
const subtotalOrden=document.querySelector('#subtotal-pedido').value;
const totalOrden=document.querySelector('#monto-total-pedido').value;
const clienteOrden=document.querySelector('#nombre-cliente').value;
const telefonoOrden=document.querySelector('#telefono-cliente').value;
 if((tipoDelivery==="")||(subtotalOrden==="")||(totalOrden==="")||(clienteOrden==="")||(telefonoOrden==="")){
  mostrarAlerta('Todos los campos son obligatorios');
  return
}

const ordenes=JSON.parse(localStorage.getItem('articulosCarrito'))|| [];
const  productosParaWsp =ordenes.map(articulo=>{
  
  return `-- Item ${articulo.titulo} , Cantidad: ${articulo.cantidad}, Subtotal: $${articulo.subtotal} \n`});
   //console.log('Esto es productos apra wsp ',productosParaWsp);
  const productosConFormatoAmigable = productosParaWsp.join(' \n ');
  console.log(productosConFormatoAmigable);


console.log(`Datos de la orden : \n Cliente ${clienteOrden}, \nTelefono: ${telefonoOrden},\nDelivery Seleccionado ${tipoDelivery}, \n Monto Delivery ${deliverySeleccionado}, \n SubTotal ${subtotalOrden}, \n Monto Total Orden: ${totalOrden} \n`)
    let win= window.open('https://api.whatsapp.com/send?phone=584145746771&text=Me%20interesan%20los%20siguientes%20productos: ' + ' ' + productosConFormatoAmigable +' Nombre Cliente: ' +clienteOrden+ ' Telefono Cliente: ' +telefonoOrden+' Tipo Delivery: '+tipoDelivery+' % '+' Monto Delivery: '+deliverySeleccionado+' Subotal Orden: '+subtotalOrden+' Monto Total Orden '+totalOrden,'_blank');



  }
function limpiarTotalesDelivery(){
  const totales=document.querySelector('.total-pagar');
  if (totales){
    totales.remove();
  }
  return

}
function limpiarDelivery(){
  const formularioContenedor=document.querySelector('formulario-contenedor');
  if (formularioContenedor){
    formularioContenedor.remove();
    formularioDelivery();
  }
  return

}
function validarFormulario(e){
  e.preventDefault();
 // console.log('validando formulario');

  //validar
   const deliverySeleccionado=document.querySelector('#monto-delivery-pedido').textContent;
const tipoDelivery=document.querySelector('[name="delivery"]:checked').value;
const subtotalOrden=document.querySelector('#subtotal-pedido').value;
const totalOrden=document.querySelector('#monto-total-pedido').value;
const clienteOrden=document.querySelector('#nombre-cliente').value;
const telefonoOrden=document.querySelector('#telefono-cliente').value;
/*  if((tipoDelivery==="")||(subtotalOrden==="")||(totalOrden==="")||(clienteOrden==="")||(telefonoOrden==="")){
  mostrarAlerta('Todos los campos son obligatorios');
  return
} */
  
}

function mostrarAlerta(mensaje){
   errores=document.querySelector('.error');
  if(!errores){
    const bloqueError=document.createElement('p');
    bloqueError.role='alert';
 bloqueError.classList.add('alert','alert-danger','mt-3','error');
     bloqueError.innerHTML=`<strong class="fw-bold">Error !</strong>
     <span class="text-black">${mensaje}</span>`;

   const formularioDeliveryTotal=document.querySelector('.form-delivery-total');
    formularioDeliveryTotal.appendChild(bloqueError);
     setTimeout(() => {
      bloqueError.remove();
    }, 3000);
  }
}


function actualizaStorage(objeto){
    //console.log(ordenes);

  localStorage.setItem('articulosCarrito',JSON.stringify(objeto));
}
function limpiarHTML(selector){
  while(selector.firstChild){
    selector.removeChild(selector.firstChild);
  }
}

}

document.addEventListener('DOMContentLoaded',iniciarApp);

