let fruit =[{
  name:"carrot",
  catergory:"vegetable",
  price:"R6.99",
  img:"https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg"
},
{
  name:"apples",
  catergory:"fruit",
  price:"R3.99",
  img:"https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&h=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g="
},
{
  name:"c",
  catergory:"vegetable",
  price:"R6.99",
  img:"https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg"
},
{
  name:"carrot",
  catergory:"vegetable",
  price:"R6.99",
  img:"https://i.ndtvimg.com/mt/cooks/2014-11/carrots.jpg"
},
]

fruit = JSON.parse(localStorage.getItem("fruit"))
? JSON.parse(localStorage.getItem("fruit"))
:fruit;
  

function readFruit(fruit){
   document.querySelector("#fruit").innerHTML = "";

   fruit.forEach((fruit,position) => {
   document.querySelector("#fruit").innerHTML +=`
    
    <div class="card" style="width: 18rem;">
    <img src="${fruit.img}" class="card-img-top">
    <div class="card-body">
    <li>
    ${fruit.name} ${fruit.catergory} ${fruit.price}
    </li>
    <div class="content">
    <div  class="buttons">
    <button  class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#update-modal-${position}">EDIT</button>
    <button  class="btn btn-danger" onclick="deleteFruit(${position})">DELETE</button>
    </div>
    </div>
    </div>
  </div>
  
    <div class="modal fade" id="update-modal-${position}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <input type="text" id="update-input-${position}" value="${fruit.name} "/>
            <input type="text" id="update-input-price-${position}" value="${fruit.price} "/>
            <input type="text" id="update-input-img-${position}" value="${fruit.img} "/>
            <select name="catergory" id="update-input-catergory-${position}">
                <option>fruit</option>
                <option>vegetable</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-dark" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-light" data-bs-dismiss="modal" onclick="updateFruit(${position})">Save changes</button>
          </div>
        </div>
      </div>
    </div>

   `;
   });
}

readFruit(fruit);

function createFruit(){
    let newfruit = document.querySelector("#add").value;
    let catergory = document.querySelector("#catergory").value;
    let img =  document.querySelector("#img").value;
    let price = document.querySelector("#price").value;
   
    try{
        if(newfruit =="") throw "Please enter a fruit name..."
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
  
   