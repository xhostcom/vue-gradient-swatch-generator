<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
       <img src="./assets/img/Logo.webp" alt="Logo" width="100px">
       </a>
       <span><h4>GradGen</h4></span>
     <button type="button" id="createBtn" @click="createSwatch" class="navbar ml-auto btn btn-sm btn-success">Save</button>
    <button type="button" id="editBtn" @click="editSwatch" class="navbar ml-auto btn btn-sm btn-info" >Edit</button>
    <button type="button" id="delBtn" @click="deleteSwatch" class="navbar ml-auto btn btn-sm btn-primary" >Del</button>
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
</div>
</div>
   <b-jumbotron class="text-center">
   <template v-slot:header>Grad Gen</template>

    <template v-slot:lead>
      Linear Gradient Swatch Generator, Select Colors and Save to Swatch.
    </template>
<div class="container-fluid bg-3 text-center">
  <h3>Your Gradients</h3><br>
  <div class="row">
 </div>
  </div>
</b-jumbotron>
</div>
</template>
<script>
export default {
props: ['value'],
    data () {
    return {}
  },
  computed: {},
  methods: {
    // Pick and Set the BG Gradient to main div
      setbgColor() {
        const bg = document.getElementById('bodybg');
        this.$emit('input', {
        value1: +this.$refs.value1.value,
        value2: +this.$refs.value2.value
       })
        bg.style.background = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
  },
  //  Copy gradient, Create new elements for swatch and add to swatch
  createSwatch() {
     // Set the actual css style value/statement for the gradient
      let gradient = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
     // Get just the hex values to display/user copy
      let hexValues = `${this.value1}, ${this.value2}`;
      // Swatch elements, a col-md-3 and two divs
      let newSwatch = document.createElement('div');
      let gradDiv = document.createElement('div');
      let textDiv = document.createElement('div');
      // Create the swatch elements.
      newSwatch.classList.add("col-md-3");
      // Add the gradient div
      newSwatch.appendChild(gradDiv);
      // Set the id to dradient div
      gradDiv.setAttribute("id", "bg-gradient");
      // Add the info text div
      newSwatch.appendChild(textDiv);
      // Set the id to info div
      textDiv.setAttribute("id", "info");
      // Conditional statement to check if swatch exists before insertion
      let swatch = document.querySelector('.row');
      let element = document.getElementById("bg-gradient");
      //If it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(element) != 'undefined' && element != null) {
        //alert('Element exists!');
        //let i;
        console.log("Its There")
        //swatch = document.querySelector('.row').childNodes[i];
        //for (i = 0; i < swatch[0].length; i++) {
        //swatch[i].appendChild(newSwatch);
        //gradDiv.style.backgroundImage = gradient;
        //textDiv.innerHTML = `<h5>${hexValues}</h5><p>${hexValues}</p>`;
        }
        else {
    
        //addTitle()
        console.log("Its Not There")
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${hexValues}</h5><p>${hexValues}</p>`;
      }
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
      background-color: gainsboro;
      padding:12px;
    }
    .navbar-brand {
      text-transform: uppercase;
      padding: 10px;
    }
    h4 {
    margin-top: 6px;
    text-transform: uppercase;
    color: #345678;
    }
    h1.display-3 {
      font-size:64px;
    }
    #bg-gradient {
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
      text-align:left;
      text-transform: capitalize;
      padding-left: 10px;
      font-size: 0.9em;
      font-weight: 700;
    }
#bodybg {
padding-top: 40px;
height: 380px;
background: linear-gradient( to right,#42AAF3,#42AAF3);
}
input#colorone,
input#colortwo {
margin:5px;
cursor: pointer;
}
</style>
