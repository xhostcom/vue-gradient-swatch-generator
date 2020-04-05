<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-dark bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
     <img src="./assets/img/Logo.webp" alt="GradGen Logo" width="100px">
     </a>
      <div>
    </div>
    <button type="button" id="editBtn" @click="editSwatch" class="navbar ml-auto btn btn-sm btn-info" >Edit</button>
    <button type="button" id="delBtn" @click="deleteSwatch" class="navbar mr-auto btn btn-sm btn-primary" >Del</button>
  </div>
</nav>
<div id="bodybg">
<div class="container text-center">
    <h2>Linear Gradient Generator</h2>
    <br />
    <h3>Pick the Color Range and Save Swatch</h3>
    <br />
    <br />
    <div class="mx-auto" style="width: 80px;">
     <b-form-input type="color" size="lg" v-model="value1" ref="value1" :value="value1" @input="setbgColor()" id="colorone" ></b-form-input>
     <b-form-input type="color" size="lg" v-model="value2" ref="value2" :value="value2" @input="setbgColor()" id="colortwo" ></b-form-input>
</div>
        <b-form-input
        id="name"
        size="lg"
        type="text"
        class="search-bar"
        placeholder="Name Your Swatch and Enter to Save"
        v-model="value3"
        ref="value3"
        :value="value3"
        @keypress="publishSwatch"
        >
        </b-form-input>
</div>
</div>
   <b-jumbotron class="text-center">
   <template v-slot:header>Grad Generator</template>
   <template v-slot:lead>
    Linear Gradient Swatch Generator, Select Two Colors and Save to Swatch.
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
export default {
  components: {
    Footer
  },
  props:
 ['value'],
 methods: {
   // Pick and Set the BG Gradient to main div
  setbgColor() {
    // Set bg and gradient values
      const bg = document.getElementById('bodybg');
      this.$emit('input', {
      value1: +this.$refs.value1.value,
      value2: +this.$refs.value2.value,
      });
      bg.style.background = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
  },
    publishSwatch(e) {
      this.$emit('input', {
      value3: +this.$refs.value3.value,
      });
      if (e.key == "Enter") {
      this.createSwatch();
      this.editSwatch();
      }
    },
  // Copy gradient, Create new elements for swatch and add to swatch
  createSwatch() {
      // Set the actual css style value/statement for the gradient
      let gradient = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
      // Set just the hex values to display/user copy
      let hexValues = `${this.value1}, ${this.value2}`;
      // Set name of swatch
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
    editSwatch(){
    let el = document.querySelectorAll('.swatch');
    for(let i=0; i < el.length; i++) {
    el[i].addEventListener('click', function () {
      el[i].setAttribute('id', 'gradient');
      let mainID = document.getElementById('bodybg');
      let smallID = document.getElementById('gradient');
      // eslint-disable-next-line no-unused-vars
      let mainSRC = mainID.src;
      let smallSRC = smallID.src;
      //let smallSRC = smallID.style.backgroundImage;
      // eslint-disable-next-line no-unused-vars
     // let mainSRC =  mainID.style.backgroundImage;
        mainSRC = smallSRC;
         alert('Clicked');

      });
      }
    }
 },
 deleteSwatch() {
   let el = document.querySelectorAll('.swatch');
    for(let i=0; i < el.length; i++) {
    el[i].addEventListener('click', function () {
     alert('Click Delete or Edit');
    });
  }
 }
}

</script>
<style>
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
    .navbar-brand {
      text-transform: uppercase;
      padding: 10px;
    }
    #editBtn {
      margin-right: 45px;
    }
    #delBtn {
      margin-left: 45px;
    }
    input#name {
      margin-top: 30px;
      border-radius: 8px 8px 0px 0px;
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
height: 380px;
background-image: linear-gradient( to right, #ee2b2b, #960ee0);
}
input#colorone,
input#colortwo {
margin:5px;
cursor: pointer;
}
</style>
