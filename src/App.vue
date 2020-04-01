<template>
<div id="app">
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="#">
     <img src="./assets/img/Logo.webp" alt="GradGen Logo" width="100px">
     </a>
      <div>
      <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Name Your Swatch"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
    <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Swatch Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
         <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
    <button type="button" id="saveBtn" v-if="isCreated" @click="saveSwatch" :key="id" class="navbar ml-auto btn btn-sm btn-success">Save</button>
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
   <template v-slot:header>Grad Generator</template>
   <template v-slot:lead>
    Linear Gradient Swatch Generator, Select Two Colors and Save to Swatch.
   </template>
<div class="container-fluid bg-3 text-center">
  <h3>Your Gradients</h3><br>
  <div class="row">
</div>
</div>
</b-jumbotron>
<Footer />
</div>
</template>
<script>
import Footer from '@/components/Footer'
export default {
  data() {
      return {
        name: '',
        nameState: null,
        submittedNames: []
      }
  },
  components: {
    Footer
  },
  props: ['value'],
  computed: {},
  methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
        })
      },
  // Pick and Set the BG Gradient to main div
  setbgColor() {
      const bg = document.getElementById('bodybg');
      this.$emit('input', {
      value1: +this.$refs.value1.value,
      value2: +this.$refs.value2.value
      })
      bg.style.background = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
    },
  isCreated() {
    let element = document.getElementById("bg-gradient");
    if(typeof(element) == 'undefined' && element == null) {
    console.log("Is Created Works")
    }
  },
  // Copy gradient, Create new elements for swatch and add to swatch
  createSwatch() {
     // Set the actual css style value/statement for the gradient
      let gradient = `linear-gradient(to right, ${this.value1}, ${this.value2})`;
     // Set just the hex values to display/user copy
      let hexValues = `${this.value1}, ${this.value2}`;
    // Set the name of the swatch
     // Swatch elements, a col-md-3 and two divs
      let newSwatch = document.createElement('div');
      let gradDiv = document.createElement('div');
      let textDiv = document.createElement('div');
      // Create the swatch elements.
      newSwatch.classList.add("col-md-3");
      // Add the gradient div
      newSwatch.appendChild(gradDiv);
      // Set the id to gradient div
      gradDiv.setAttribute("id", "bg-gradient");
      // Add the info text div
      newSwatch.appendChild(textDiv);
      // Set the id to info div
      textDiv.setAttribute("id", "info");
      // Give newSwatch col-md-3 an id
      newSwatch.setAttribute("id", "swatch");
      // Conditional statement to check if swatch exists before insertion
      let swatch = document.querySelector('.row');
      let element = document.getElementById("bg-gradient");
      //If it isn't "undefined" and it isn't "null", then it exists.
      if(typeof(element) != 'undefined' && element != null) {
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${hexValues}</h5><p>${hexValues}</p>`;
        } else {
        // First swatch in first row.
        swatch.appendChild(newSwatch);
        gradDiv.style.backgroundImage = gradient;
        textDiv.innerHTML = `<h5>${hexValues}</h5><p>${hexValues}</p>`;
       }
    },
      saveSwatch() {
      // Set the swatch name
      //let swatchname = document.getElementById('name-input');
      let element = document.getElementById("swatch");
      if(typeof(element) != 'undefined' && element != null) {
      //this.$bvModal.show('modal-prevent-closing');
      } else {
        console.log("Nothings there yet")
      }
       // First swatch in first row.
     console.log("Save Works");
     this.createSwatch();
    },
    editSwatch() {},
    deleteSwatch() {}
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
    h4 {
    margin-top: 15px;
    text-transform: uppercase;
    color: #345678;
    }
    h1.display-3 {
      font-size:56px;
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
