const cardata=[
    {
        name:'name 1',
        mobile:'Mobile 1',
        address:'add 1',
    },
    {
        name:'name 2',
        mobile:'Mobile 2',
        address:'add 2',
    },
    {
        name:'name 3',
        mobile:'Mobile 3',
        address:'add 3',
    },
    {
        name:'name 4',
        mobile:'Mobile 4',
        address:'add 4',
    },
    {
        name:'name 4',
        mobile:'Mobile 4',
        address:'add 4',
    },
    {
        name:'name 4',
        mobile:'Mobile 4',
        address:'add 4',
    },
   
]
const postcontainer=document.querySelector('.list-section');
const Postmethod=()=>{
    let flag=0;
    cardata.map((postdata)=>{
        flag++;
        
        const postelement=document.createElement('div');
        postelement.classList.add('list-class');
        if(flag==3){
            var br = document.createElement("br");
        var list = document.getElementById("list-con");
        list.appendChild(br);
        }
        postelement.innerHTML=`<li class="card-list">Name</li>
        <li class="card-list"><i class='fa fa-phone' style="color: #1abc9c;"></i> Mobile No</li>
        <li class="card-list"><i class='fa fa-map-marker' style="color: #1abc9c;"></i>address</li>`
        postcontainer.appendChild(postelement);
        })
}
Postmethod();