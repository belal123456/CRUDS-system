let title =document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads =document.getElementById('ads');
let disc=document.getElementById('disc');
let total=document.getElementById('total');
let category=document.getElementById('category');
let count =document.getElementById('count')
let create=document.getElementById('create')
let mode = 'create' 
let tmp ;
//getTotal


function getTotal()
{
    if(price.value !='')
    {
        let result=  (Number(price.value) + Number(taxes.value) + Number(ads.value)) - Number(disc.value) ;
       total.innerHTML= result;
       total.style.background ='#040'
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02'
    }

}
//greateProduct
let dataContainer;
if(localStorage.product!=null)
{
    dataContainer=JSON.parse(localStorage.product)
}else{
    dataContainer=[];
}



create.onclick=function greateProduct()
{
    let dataInfo={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        disc:disc.value,
        total:total.innerHTML,
        category:category.value,
        count:count.value,
    }
   if(mode ==='create'){
    if(dataInfo.count>1){
        for(let i=0;i<dataInfo.count;i++){
            dataContainer.push(dataInfo);
        }
    }else{
        dataContainer.push(dataInfo)
    }
   }else{
    dataContainer[ tmp ]=dataInfo;
    document.getElementById('create').innerHTML='create';
    mode='create';  
   }
    localStorage.setItem('product', JSON.stringify(dataContainer))
    clearForm();
    
showData();

    
}
//saveDataLocalStorage
//clearForm
function clearForm()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    disc.value='';
    total.innerHTML='';
    category.value='';
    count.value='';
}
//read

function showData(){
    let cartona ='';
    for(let i = 0;i < dataContainer.length;i++){
        cartona+=` <tr>
        <td>${dataContainer[i].title}</td>
        <td>${dataContainer[i].price}</td>
        <td>${dataContainer[i].taxes}</td>
        <td>${dataContainer[i].ads}</td>
        <td>${dataContainer[i].category}</td>
        <td>${dataContainer[i].count}</td>
        
        <td>${dataContainer[i].disc}</td>
        <td>${dataContainer[i].total}</td>
        <td><button onclick="updateProduct(${i})"  class="btn btn-success">update</button></td>
        <td><button onclick=" deleteProduct(${i})" class="btn btn-danger">delete</button></td>
    </tr>`;
    
        
    }
    document.getElementById('tableBody').innerHTML=cartona;
    let btnDelete=document.getElementById('deleteALL')
    if(dataContainer.length>0){
        btnDelete.innerHTML=`<button onclick="deleteAll();"  class="btn btn-danger w-75">delete all</button>`
    }else{
        btnDelete.innerHTML='';
    }
}

showData();
//count



//delte
function deleteProduct(i){
    dataContainer.splice(i,1);
    localStorage.product= JSON.stringify(dataContainer);
    showData()
}

//delte all
function deleteAll(){
    localStorage.clear();
    dataContainer.splice(0);
    showData();
}

//update
function updateProduct(i)
{
    title.value= dataContainer[i].title;
    price.value=dataContainer[i].price;
    taxes.value=dataContainer[i].taxes;
    ads.value=dataContainer[i].ads;
    disc.value=dataContainer[i].disc;
    category.value=dataContainer[i].category;
    

    document.getElementById('create').innerHTML='update';
     mode='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth'
    })
    
}

//search
let searchMode='title';
function searchModeFun(id){
    let searchBar= document.getElementById("searhUnit");
    searchBar.focus()
if(id == 'titleId'){
    searchMode='title'
    searchBar.placeholder='search by title'
    

}else{
searchMode='cateogry'
searchBar.placeholder='search by cateogry'

}

}


function searchCarry(value){
    let cartona='';
    if(searchMode=='title'){
        for(let i=0;i<dataContainer.length;i++){
            if(dataContainer[i].title.includes(value)){
                cartona+=` <tr>
                <td>${dataContainer[i].title}</td>
                <td>${dataContainer[i].price}</td>
                <td>${dataContainer[i].taxes}</td>
                <td>${dataContainer[i].ads}</td>
                <td>${dataContainer[i].category}</td>
                <td>${dataContainer[i].count}</td>
                
                <td>${dataContainer[i].disc}</td>
                <td>${dataContainer[i].total}</td>
                <td><button onclick="updateProduct(${i})"  class="btn btn-success">update</button></td>
                <td><button onclick=" deleteProduct(${i})" class="btn btn-danger">delete</button></td>
            </tr>`;
            }
        }
    }else{
        for(let i=0;i<dataContainer.length;i++){
            if(dataContainer[i].category.includes(value)){
                cartona+=` <tr>
                <td>${dataContainer[i].title}</td>
                <td>${dataContainer[i].price}</td>
                <td>${dataContainer[i].taxes}</td>
                <td>${dataContainer[i].ads}</td>
                <td>${dataContainer[i].category}</td>
                <td>${dataContainer[i].count}</td>
                
                <td>${dataContainer[i].disc}</td>
                <td>${dataContainer[i].total}</td>
                <td><button onclick="updateProduct(${i})"  class="btn btn-success">update</button></td>
                <td><button onclick=" deleteProduct(${i})" class="btn btn-danger">delete</button></td>
            </tr>`;
            }
        }
    }
    document.getElementById('tableBody').innerHTML=cartona;
}





//cleanData




