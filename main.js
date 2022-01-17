let fruit = JSON.parse(localStorage.getItem("fruit"))
? JSON.parse(localStorage.getItem("fruit"))
:
[{
  name:"Carrot",
  catergory:"vegetable",
  price:"6.99",
  img:"https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg"
},
{
  name:"Apples",
  catergory:"fruit",
  price:"3.99",
  img:"https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
},
{
  name:"Bananas",
  catergory:"fruit",
  price:"4.99",
  img:"https://5.imimg.com/data5/CI/VG/MY-59453495/yellow-banana-500x500.jpg"
},
{
  name:"Potato",
  catergory:"vegetable",
  price:"3.50",
  img:"https://www.localcrop.com.au/330-thickbox_default/potatoes-washed-1kg.jpg"
},
]


let cart = JSON.parse(localStorage.getItem("cart"))
? JSON.parse(localStorage.getItem("cart"))
:[];
  

function readFruit(fruit){
   document.querySelector("#fruit").innerHTML = "";
   document.querySelector("#badge").innerHTML = "";
   fruit.forEach((fruit,position) => {
   document.querySelector("#fruit").innerHTML +=`
    
    <div class="card" style="width: 18rem;">
    <img src="${fruit.img}" class="card-img-top">
    <div class="card-body">
    
    <h5 class="card-title">${fruit.name}</h5>
    <p class="card-text"> R ${fruit.price}</p>
    <div>
    <label class="form-label">Quantity:</label>
    <input type="number" min=1 value=1 id="addQty${position}">
    </div>
   
    <div class="content">
    <div  class="buttons">
    <button  class="  add_cart btn btn-dark" data-bs-toggle="modal" data-bs-target="#update-modal-${position}">EDIT</button>
    <button  class="  add_cart btn btn-danger" onclick="deleteFruit(${position})">DELETE</button>
    <button  class=" add_cart btn btn-danger" onclick="addToCart(${position})">ADD TO CART</button>
    </div>
    </div>
    </div>
  </div>
  
    <div class="modal fade" id="update-modal-${position}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">EDIT YOUR PURCHASE</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body1">
            <h4 class="fs-6">Name:</h4>
            <input type="text"class="in" id="update-input-${position}" value="${fruit.name} "/>
            <h4 class="fs-6">Category:</h4>
            <select name="catergory" class="in" id="update-input-catergory-${position}">
            <option value="fruit">fruit</option>
            <option value="vegetables">vegetables</option>
            </select>
            <h4 class="fs-6">Price:</h4>
            <input type="text" class="in" id="update-input-price-${position}" value="${fruit.price} "/>
           
            <h4 class="fs-6">Image:</h4>
            <input type="text" class="in" id="update-input-img-${position}" value="${fruit.img} "/>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-light" data-bs-dismiss="modal" onclick="updateFruit(${position})">Save changes</button>
          </div>
        </div>
      </div>
    </div>



   `;
    let totalQty = 0;

    cart.forEach(item =>{

      totalQty += parseInt(item.qty)

   })
   if(totalQty !=0){
     document.querySelector("#badge").innerHTML = totalQty
   }

   });
}

readFruit(fruit);

function createFruit(){
    let newfruit = document.querySelector("#add").value;
    let catergory = document.querySelector("#catergory").value;
    let img =  document.querySelector("#img").value;
    let price = document.querySelector("#price").value;
   
    try{
        if(newfruit =="") throw "Please enter a Product name..."
        fruit.forEach(individual =>{
            if(individual == newfruit)throw "That fruit name already exists..."
        })
       

        fruit.push({
            name:newfruit,
            catergory,
            img,
            price,
        });
       localStorage.setItem("fruit",JSON.stringify(fruit));
        readFruit(fruit);
    } catch(err){
        alert(err)
    }
   
}

function deleteFruit(position){
    fruit.splice(position, 1)
    localStorage.setItem("fruit",JSON.stringify (fruit));
    readFruit(fruit);
}

function updateFruit(position){
    let fruits =document.querySelector(`#update-input-${position}`).value;
    let catergory =document.querySelector(`#update-input-catergory-${position}`).value;
    let img =  document.querySelector(`#update-input-img-${position}`).value;
    let price = document.querySelector(`#update-input-price-${position}`).value;
    
    try{
        if(fruits ===""){
            throw new Error("please enter a fruit name")
        }
        fruit[position]={
            name:fruits,
            catergory,
            img,
            price,
        };
        localStorage.setItem("fruit",JSON.stringify (fruit));
        readFruit(fruit);
    }catch(error){
        alert(error)
    }
    }
  
        
  function addToCart(position){
    let qty = document.querySelector(`#addQty${position}`).value;
    let added = false;
    cart.forEach(product => {
      if(product.name == fruit[position].name) {
        product.qty = parseInt(product.qty) + parseInt(qty)
        added = true
        localStorage.setItem("cart",JSON.stringify (cart));
      }
    })


   if(!added){
     cart.push({...fruit[position], qty}) ;
     localStorage.setItem("cart",JSON.stringify (cart));
   }   

   readFruit(fruit)
 }
  


 function catergorySort(){
   let catergory = document.querySelector("#catergorySort").value;

  console.log(catergorySort);

   if( catergory == "all"){
     readFruit(fruit);
     return
   }

   let filteredProducts = fruit.filter((fruit) => {
     return fruit.catergory == catergory;
   });

   readFruit(filteredProducts);
  }

  function priceSort() {
    let direction = document.querySelector("#priceSort").value;
  
    let sortedProducts = fruit.sort((a, b) => a.price - b.price);
  
    console.log(sortedProducts);
  
    if (direction == "descending") sortedProducts.reverse();
    readFruit(sortedProducts);
  }
  
  
  function sortName() {
    let direction = document.querySelector("#sortName").value;
  
    let sortedProducts = fruit.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    if (direction == "descending") sortedProducts.reverse();
    console.log(sortedProducts);
    readFruit(fruit);
  }

