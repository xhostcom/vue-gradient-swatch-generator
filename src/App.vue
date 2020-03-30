<template>
  <div id="app">
  <Header />
  <div id="bodybg">
  <div class="container text-center">
    <h2>Gradient Generator</h2>
    <br />
    <h3>Pick the Color Range and Save Swatch</h3>
    <br />
    <br />
    <div class="mx-auto" style="width: 80px;">
     <b-form-input  v-model="value1" type="color" @input="setbgColor" size="lg" id="colorone" ></b-form-input>
     <b-form-input  v-model="value2" type="color" @input="setbgColor" size="lg" id="colortwo" ></b-form-input>
    </div>
    <br /><br />
    <div id="showvalue"></div>
  </div>
  </div>
<div class="jumbotron">
<div class="container-fluid bg-3 text-center">
  <h3>Your Gradients</h3><br>
  <div class="row">
 </div>
  </div>
</div>
    </div>
</template>
<script>
import Header from '@/components/Header'
export default {
props: {
   value1: String,
   value2: String
  },
  components: {
  Header
  },
    data () {
    return {
      localValue1: "#rrggbb",
      localValue2: "#rrggbb"
    }
  },
  computed: {
      changeData() {
         const { localValue1, localValue2 } = this
         return {
           localValue1,
           localValue2
         }
      }
  },
  watch: {
  changeData: {
    handler: function(val) {
      console.log('value change: ', val)
    },
    deep: true
  }
},
  methods: {
      setbgColor() {}
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
height: 350px;
background: linear-gradient(rgb(85, 146, 216), rgb(70, 77, 175));
}
input#colorone,
input#colortwo {
margin:5px;
cursor: pointer;
}
.swal-text {
  text-transform: capitalize;
}



</style>
