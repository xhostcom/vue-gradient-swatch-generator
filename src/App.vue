<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
     <img src="./assets/img/Logo.webp" alt="GradGen Logo" width="100px">
     </a>
  </div>
</nav>
<div id="bodybg">
<div class="container text-center">
    <h2 class="page-title">Linear Gradient Generator</h2>
    <br />
    <h3 class="page-subtitle">Pick the Color Range and Publish Swatch</h3>
    <br />
 <div class="mx-auto" style="width: 80px;">
     <b-form-input type="color" size="lg" v-model="value1" ref="value1" @input="setbgColor()" id="colorone" ></b-form-input>
     <b-form-input type="color" size="lg" v-model="value2" ref="value2" @input="setbgColor()" id="colortwo" ></b-form-input>
</div>
<br />
    <div class="btn-group">
    <button type="button" id="pubBtn" @click="publishSwatch" class="navbar ml-auto btn btn-lg btn-success" >Publish</button>
    <button type="button" id="editBtn" @click="editSwatch" class="navbar ml-auto btn btn-lg btn-info" >Edit</button>
    <button type="button" id="saveBtn" class="navbar ml-auto btn btn-lg btn-warning" >Save</button>
    <button type="button" id="delBtn" @click="deleteSwatch" class="navbar mr-auto btn btn-lg btn-primary" >Delete</button>
    </div>
<b-form-input
    v-if="getName"
    placeholder="Name Swatch &amp; Publish or Save Edited Swatch"
    @keypress="getName"
    v-model="value3"
    ref="value3"
    id="name"
    size="lg"
    type="text"
    class="search-bar"
/>
</div>
 </div>
 <b-jumbotron class="text-center">
   <template v-slot:header>Gradient Swatch Generator</template>
   <template v-slot:lead>
    Linear Gradient Swatch Generator, Select Two Color Values and Publish.<br />
    Select Individual Swatch to Edit or Delete.
   </template>
<div class="container-fluid bg-3 text-center">
  <h3>Your Gradients</h3><br>
<div class="row gallery">
</div>
</div>
</b-jumbotron>
<Footer />
</div>
</template>
<script>
import Footer from '@/components/Footer'
import Vue from "vue";
export default {
  components: {
    Footer
 },
  data() {
    return {
      value1: null,
      value2: null,
      value3: null,
      items : [
      {
        id : 1,
        value1 : '#f99876',
        value2 : '#fff',
        name: 'Pacific Silk'
      },
      {
        id : 2,
        value1 : 'red',
        value2 : '#fff',
        name: 'Artistic Demolition'
      },
       {
        id : 3,
        value1 : 'red',
        value2 : '#fff',
        name: 'Masochistic Sunrise'
       },
       {
        id : 4,
        value1 : 'red',
        value2 : '#fff',
        name: 'Futuristic Bedlam'
       }
    ]
    }
 },
 methods: {
    resetForm() {
    this.value3 = '';
    },
    // Get the name value
    getName() {
      this.$emit('input', {
      value3: +this.value3
      });
      return this.value3;
   },
    // Get bg gradient values
    getbgColor() {
      this.$emit('input', {
      value1: +this.value1,
      value2: +this.value2,
      });
      return this.value1, this.value2;
    },
    // Set the BG Gradient to main div
    setbgColor() {
      let bg = document.getElementById('bodybg');
      bg.style.backgroundImage = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
    },
    publishSwatch() {
      let value1 = this.value1;
      let value2 = this.value2;
      let name = this.value3;
      if(value1 == undefined || value2 == undefined || name == "" || name == null) {
      Vue.swal('Please Enter Name & Color Values');
      } else {
      this.createSwatch();
      this.resetForm();
      this.handleSwatch();
      }
   },
  // Copy gradient, Create new elements for swatch and add to swatch
    createSwatch() {
      let editBtn = document.getElementById('editBtn');
      let saveBtn = document.getElementById('saveBtn');
      // Set the actual css style value/statement for the gradient
      let gradient = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
      // Set just the hex values to display/user copy
      //let value1 = this.value1;
      //let value2 = this.value2;
      let hexValues = `${this.value1}, ${this.value2}`;
      // Set the name of swatch
      let name = (`${this.value3}`);
      // Swatch elements, a col-md-3 and two divs
      let newSwatch = document.createElement('div');
      let gradDiv = document.createElement('div');
      let textDiv = document.createElement('div');
      // Get the items for insertion
      let swatch = document.querySelector('.row');
      let element = document.getElementsByTagName("bg-gradient");
      // Create the swatch elements.
      newSwatch.classList.add("col-md-3", "swatch");
      // Add the gradient div
      newSwatch.appendChild(gradDiv);
      // Set the id to gradient div
      gradDiv.classList.add("bg-gradient");
      // Add the info text div
      newSwatch.appendChild(textDiv);
      // Set the id to info div
      textDiv.setAttribute("id", "info");
      // Conditional statement to check if swatch exists before insertion, if it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(element) != 'undefined' && element != null) {
        // So Subsequent Swatches
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${name}</h5><p>${hexValues}</p>`;
        editBtn.style.display = "none";
        saveBtn.style.display = "none";
        Vue.swal('Swatch Published, Make Another!');
        } else {
        // First swatch in first row.
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${name}</h5><p>${hexValues}</p>`;
        Vue.swal('Swatch Published, Make Another!');
       }
    },
    // Handle individual swatch's on click
    handleSwatch(){
    document.querySelectorAll('.swatch').forEach(_ => {
  _.addEventListener('click', () =>
    { document.querySelectorAll('.swatch#bg-gradient').forEach(swatch => swatch.removeAttribute('id'));
    _.setAttribute('id', 'bg-gradient');
    let saveBtn = document.getElementById('saveBtn');
    let editBtn = document.getElementById('editBtn');
    saveBtn.style.display = 'block';
    editBtn.style.display = 'block';
    Vue.swal('Press Edit, Delete or Make Another Swatch!');
    });
 })
},
// Copy the handled individual swatch to main div for re-editing
// Copy individual swatch to main div for re-editing
editSwatch() {
let mainDiv = document.getElementById('bodybg');
let smallDiv = document.querySelector("#bg-gradient > .bg-gradient");
document.querySelector('#bg-gradient > .bg-gradient').setAttribute("id", "gradient");
mainDiv.style.backgroundImage = smallDiv.style.backgroundImage;
let editBtn = document.getElementById('editBtn');
let saveBtn = document.getElementById('saveBtn');
let pubBtn = document.getElementById('pubBtn');
let delBtn = document.getElementById('delBtn');
pubBtn.style.display = "none";
delBtn.style.display = "none";
Vue.swal('Reset Values and Save Edited Swatch');
document.getElementById('saveBtn').addEventListener('click', () => {
let value1 = this.value1;
let value2 = this.value2;
let name = this.value3;
if(value1 == undefined || value2 == undefined || name == "" || name == null || smallDiv.style.backgroundImage == mainDiv.style.backgroundImage) {
Vue.swal('Please Enter Name & Color Values');
} else {
// Get/Set bg, name and gradient values
let bg = document.getElementById('bodybg');
smallDiv = document.querySelector('#bg-gradient > #gradient');
let textDiv = document.querySelector('#bg-gradient > #info');
smallDiv.style.backgroundImage = bg.style.backgroundImage;
let hexValues = `${value1}, ${value2}`;
textDiv.innerHTML = `<h5>${name}</h5><p>${hexValues}</p>`;
this.resetForm();
pubBtn.style.display = "block";
delBtn.style.display = "block";
editBtn.style.display = "none";
saveBtn.style.display = "none";
Vue.swal('Swatch Edited, Make Another!');
}
});
},
 deleteSwatch() {
 let elem = document.querySelector('.swatch#bg-gradient');
 elem.parentElement.removeChild(elem);
 Vue.swal('Swatch Deleted!');
  }
 }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Shrikhand&display=swap');
@font-face {
  font-family: '';
  src: url('https://fonts.googleapis.com/css?family=Shrikhand&display=swap');
  font-weight: normal;
  font-style: normal;
}
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
#bodybg {
      height: 460px;
      min-height:460px;
   }
}
* {
 margin: 0;
 padding: 0;
 box-sizing:border-box;
}
/* Add a gray background color and some padding to the footer */
footer {
      display:flex;
      justify-content: center;
      align-items: center;
      background-color: gainsboro!important;
      padding:12px;
    }
    #editBtn,
    #saveBtn {
      display:none;
    }
    input#name {
      margin-top: 30px;
      border-radius: 8px 8px 8px 8px;
    }
    h4 {
    font-family:'Roboto';
    margin-top: 15px;
    text-transform: uppercase;
    color: #345678;
    }
    h3.page-subtitle {
    font-family:'Roboto';
    font-size: 24px;
    }
    h2.page-title {
      font-family: 'Shrikhand', cursive;
      font-size: 44px;
    }
    h1.display-3 {
      margin-top:20px;
      font-family: 'Shrikhand', cursive;
      font-size:52px;
    }
    .bg-gradient {
    height: 180px;;
    width:100%;
    }
    #info {
    padding-top:8px;
    background-color:#fff;
    height: 55px;
    width:100%;
    }
    #info p {
      font-family:'Roboto';
      text-align:left;
      padding-left:0px;
      font-size: 0.8em;
      font-weight: 700;
    }
    #info h5 {
      font-family:'Roboto';
      text-align:left;
      text-transform: capitalize;
      padding-left: 0px;
      font-size: 0.9em;
      font-weight: 700;
    }
.bg-gradient:focus,
.bg-gradient:hover,
.bg-gradient.active {
 border: solid 3px rgba(84, 112, 155, 0.7);
}
#bodybg {
padding-top: 40px;
height: 460px;
background-image: linear-gradient( to right,#0fb1d1,#0fb1d1);
}
.search-bar-2 {
  display:none;
}
input#colorone,
input#colortwo {
margin:5px;
cursor: pointer;
}
</style>
