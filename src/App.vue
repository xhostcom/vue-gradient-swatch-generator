<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-dark bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
     <img src="./assets/img/Logo.webp" alt="GradGen Logo" width="100px">
     </a>
  </div>
</nav>
<div id="bodybg">
<div class="container text-center">
    <h2>Linear Gradient Generator</h2>
    <br />
    <h3>Pick the Color Range and Save Swatch</h3>
    <br />
 <div class="mx-auto" style="width: 80px;">
     <b-form-input type="color" size="lg" v-model="value1" ref="value1" :value="value1" @input="setbgColor()" id="colorone" ></b-form-input>
     <b-form-input type="color" size="lg" v-model="value2" ref="value2" :value="value2" @input="setbgColor()" id="colortwo" ></b-form-input>
</div>
<br />
    <div class="btn-group">
    <button type="button" id="pubBtn" @click="publishSwatch" class="navbar ml-auto btn btn-lg btn-dark" >Publish</button>
    <button type="button" id="editBtn" @click="editSwatch" class="navbar ml-auto btn btn-lg btn-success" >Edit</button>
    <button type="button" id="saveBtn" @click="saveSwatch" class="navbar ml-auto btn btn-lg btn-warning" >Save</button>
    <button type="button" id="delBtn" @click="deleteSwatch" class="navbar mr-auto btn btn-lg btn-primary" >Delete</button>
    </div>
<b-form-input
    v-if="getName"
    placeholder="Name Swatch, Enter, Publish or Save Edit"
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
    Linear Gradient Swatch Generator, Select Two Color Values and Save to Swatch.
    Select Individual Swatch to Delete or Edit.
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
      value3: null
    }
 },
 props:
 ['value'],
 methods: {
    resetForm() {
    this.value3 = '';
    },
    getName(e) {
      // Get the name value
      if (e.key === "Enter")
      this.$emit('input', {
      value3: +this.value3
      });
      return this.value3;
   },
  // Pick and Set the BG Gradient to main div
    setbgColor() {
    // Get/Set bg and gradient values
      let bg = document.getElementById('bodybg');
      this.$emit('input', {
      value1: +this.$refs.value1.value,
      value2: +this.$refs.value2.value,
      });
      bg.style.background = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
   },
    publishSwatch() {
      let value1 = this.value1;
      let value2 = this.value2;
      let name = this.value3;
      if(value1 == undefined && value2 == undefined && name == null) {
        Vue.swal('Please enter a gradient');
      }
      if(name == '') {
        Vue.swal('Please enter a name');
      }
      this.createSwatch();
      this.resetForm();
      this.handleSwatch();
      console.log('Publish Works');
      console.log(name);
   },
   // Copy gradient, Create new elements for swatch and add to swatch
    createSwatch() {
      // Set the actual css style value/statement for the gradient
      let gradient = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
      // Set just the hex values to display/user copy
      let hexValues = `${this.value1}, ${this.value2}`;
      // Set the name of swatch
      let name = (`${this.value3}`);
      // Swatch elements, a col-md-3 and two divs
      let newSwatch = document.createElement('div');
      let gradDiv = document.createElement('div');
      let textDiv = document.createElement('div');
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
      // Conditional statement to check if swatch exists before insertion
      let swatch = document.querySelector('.row');
      let element = document.getElementsByTagName("bg-gradient");
      //If it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(element) != 'undefined' && element != null) {
        // Subsequent Swatches
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${name}</h5><p>${hexValues}</p>`;
        } else {
        // First swatch in first row.
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${name}</h5><p>${hexValues}</p>`;
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
    Vue.swal('Press Edit, Delete or Make Another Swatch');
    });
 })
},
// Copy individual swatch to main div for re-editing
editSwatch() {
let mainDiv = document.getElementById('bodybg');
let smallDiv = document.querySelector("#bg-gradient > .bg-gradient");
document.querySelector('#bg-gradient > .bg-gradient').setAttribute("id", "gradient");
mainDiv.style.backgroundImage = smallDiv.style.backgroundImage;
let pubBtn = document.getElementById('pubBtn');
pubBtn.style.display = "none";
Vue.swal('Reset Values, Enter and Save Edit');
},
saveSwatch() {

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
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
#bodybg {
      height: 430px;
      min-height:430px;
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
    font-family:'Cryptofont';
    margin-top: 15px;
    text-transform: uppercase;
    color: #345678;
    }
    h1.display-3 {
      font-family:'Cryptofont';
      font-size:56px;
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
      text-align:left!important;
      padding-left:10px;
      font-size: 0.8em;
      font-weight: 700;
    }
    #info h5 {
      font-family:'Cryptofont';
      text-align:left;
      text-transform: capitalize;
      padding-left: 10px;
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
background-image: linear-gradient( to right,#1b78df,#0cd19e);
}
.search-bar-2 {
  display:none!important;
}
input#colorone,
input#colortwo {
margin:5px;
cursor: pointer;
}
</style>
