
let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
:[];
  

console.log(cart)

function readCart(cart){
    document.querySelector("#cart").innerHTML = "";

    cart.forEach((fruit, position) =>{
        document.querySelector("#cart").innerHTML +=`
        <div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${fruit.img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${fruit.name}</h5>
        <p class="card-text">Price: R ${fruit.price}</p>
        <input type="number" min=1 value=${fruit.qty} id="updateCartQty${position}" onchange ="updateCart(${position})" >
        <p>R${parseInt(fruit.qty) * parseFloat(fruit.price)} </p>
        <button class="btn btn-danger" onclick="deleteCart(${position})">REMOVE ITEM</button>
       
      </div>
    </div>
  </div>
</div>
        
        
        `; 
    }
    );
}

readCart(cart);


function updateCart(position){
    let qty = document.querySelector(`updateCartQty${position}`).value;
    cart[position] = {...cart[position], qty} ;
    localStorage.setItem("cart",JSON.stringify(cart));
    readCart(cart);
}

function deleteCart(position){
    cart.splice(position, 1)
    localStorage.setItem("cart",JSON.stringify(cart));
    readCart(cart);
}



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               