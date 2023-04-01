
// fetch('http://localhost:5500/search')
//   .then(response => response.text())
//   .then(text => {
//     try {
//       const data = JSON.parse(text);
//       // Handle valid JSON response
//       console.log(data);
//       const postcontainer = document.querySelector('.list-section');
//       const Postmethod = () => {
//         let i = 0;
//         data.map((postdata) => {
//           console.log(postdata);
//           const postelement = document.createElement('div');
//           postelement.classList.add('list-class');
//           postelement.innerHTML = `
//             <li class="card-list"><img id='image' src="/images/${data[i].image}" alt=""></li><li class="card-list">${data[i].Name}</li>
//             <li class="card-list"><i class='fa fa-phone' style="color: #1abc9c;">${data[i].Mobile}</i> </li>
//             <li class="card-list"><i class='fa fa-map-marker' style="color: #1abc9c;"></i>${data[i].address}</li>
//             <li class="card-list"><a id="link-view"  href="/description?Mobile=${data[i].Mobile}" >view more details</a></li>
//           `;
//           postcontainer.appendChild(postelement);
//           i++;
//         });
//       };
//       Postmethod();
//     } catch (err) {
//       // Handle invalid JSON response
//       console.error(err);
//     }
//   });

function search(){
    var x=document.getElementById('search-input').value;
    window.location.href=`/search?searchparams=${x}`;
}
