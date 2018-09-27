<template>
    <div id="app">



        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <div class="form-check">
                            <li v-for="activity in activities"><label><input type="checkbox" name="check" v-model="ids" :value="activity.id" /><span class="label-text">{{activity.name}}</span></label></li>
                        </div>
                    </ul>
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">


                    <ul>
                        <li v-for="(trip,index) in trips" v-model="check":key="index">
                            <div class="container  trip shadow">
                                <div class="row">
                                    <div class="col-4 test">
                                        <img :src="trip.imageUrl" class="img-fluid  tripImg" alt="Responsive image"></div>
                                    <div class="col-8">
                                        <h3 class=" text-center border-primary border-bottom text-primary ">{{trip.name}},{{trip.id}}</h3>
                                        <p>{{trip.destination.name}} </p>
                                        <p><span class="text-primary">Pick up:</span> {{new Date(trip.pickupTime).toLocaleString()}}</p>
                                        <p><span class="text-primary">Event start:</span> {{new Date(trip.dateTrip).toLocaleString()}}</p>
                                        <p><span class="text-primary">Drop off:</span> {{new Date(trip.dropOffTime).toLocaleString()}}</p>

                                        <ul>
               <li v-for="(activity,i) in trip.activityTypes" class="activityTypes"><img class="actImg " :src="trip.activityTypes[i].picUrl"></li>
                                        </ul>
                                        <!--
                                        <img class="actImg" :src="trip.activityTypes[0].picUrl">
                                        <img class="actImg" :src="trip.activityTypes[1].picUrl">
-->
                                        <!--                                        <img class="actImg" :src="trip.activityTypes[2].picUrl"> -->
                                        <div class="panel-group" id="accordion">
                                            <div class="panel panel-default">
                                                <div class="panel-heading">
                                                    <h4 class="panel-title">
                                                        <a data-toggle="collapse" class="butt" data-parent="#accordion" @:click="bot-pannel" :href="'#trip' + index"><img class="arrow " src="src/assets/arrow.png">
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div :id="'trip' + index" class="panel-collapse collapse in">
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <p>{{trip.activityDescription}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </li>

                    </ul>

                </div>
            </div>
        </div>
    </div>

</template>

<script>


    export default {
        name: 'app',
        data: () => ({
            activities: [],
            trips:[],
            ids:[],
            activ:[],
            d:[]

        }),
//            check(){
//                 if (this.ids.length == 0)
//                return trips;
//                else {
////                   for(var i=0; this.ids.length; i++){
////                       console.log(this.ids[i]);
//                axios.get('http://qa.ridj-it.com/app/trip?activity=' + this.ids[i]).then(response => {
//                    this.temp.push(responce.data);
//                })
//                                                                                         
//                                                                                         }
//              // handle success
//    
//            this.trips =temp.data;
//                       
//                }
//                            this.temp=[];
//                }
         methods: {
           check() {
                if (this.ids.length == 0){
                axios.get('http://qa.ridj-it.com/app/trip').then(response => {
                    console.log(this.trips)
                    this.trips = response.data
                })}
                        else{                                            
                axios.get('http://qa.ridj-it.com/app/trip?activity=' + this.ids).then(response => {
                // handle success
                    var d = new Date(+milliseconds);
                return  this.trips = response.data;
                                })}
                          }
            },

        mounted() {
            axios.get('http://qa.ridj-it.com/app/activity').then(response => {  
                // handle success
                this.activities = response.data
            })
            axios.get('http://qa.ridj-it.com/app/trip').then(response => {
                // handle success
//                response.data.trips.dateTrip
                this.trips = response.data
                
            })
        }
    }
</script>

<style>
    ul{
        margin: 0;
        padding: 0;
    }
    .activityTypes{
        display: inline;
    }
    li{
         list-style-type:none;
    }
    body{
        background-color: ghostwhite;
    }
    .arrow{
        margin-left:260px;
        margin-bottom: 20px;
        height: 20px;
        width: 20px;
    }
    .butt{
        position: absolute;
        margin: -20px;
    }
    .tripImg{
    max-width: 100%;
        min-height:200px;
        border-top-left-radius: 20px;
          border-bottom-left-radius: inherit;
    }
    .tripImgO{
            max-width: 100%;
        min-height:200px;
        border-top-left-radius: 20px;
         border-bottom-left-radius: 0;
        
    }
      .actImg{
   width: 50px;
          height: 50px;
    }
    @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
    .test{
        margin: 0;
        padding: 0;
        border-top-left-radius: 23px;
        background-color: #007bff;
           border-bottom-left-radius: 20px;
    }
    .trip{
        min-height: 200px;
     width: 800px;
        margin-top: 10px;
        border-radius: 20px;
        background-color: white;
    }       
p{
    font-family: "FontAwesome";
    color: #898686;
    padding: 0;
    margin: 0;
    }

    label {
        position: relative;
        cursor: pointer;
        color: #898686;
        font-size: 20px;
    }

    input[type="checkbox"]{
        position: absolute;
        right: 9000px;
    }

    /*Check box*/
    input[type="checkbox"]+.label-text:before {
        content: "\f096";
        font-family: "FontAwesome";
        speak: none;
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        width: 1em;
        display: inline-block;
        margin-right: 5px;
    }

    input[type="checkbox"]:checked+.label-text:before {
        content: "\f14a";
        color: #2980b9;
        animation: effect 250ms ease-in;
    }

    input[type="checkbox"]:disabled+.label-text {
        color: #aaa;
    }

    input[type="checkbox"]:disabled+.label-text:before {
        content: "\f0c8";
        color: #ccc;
    }


    @keyframes effect {
        0% {
            transform: scale(0);
        }

        25% {
            transform: scale(1.3);
        }

        75% {
            transform: scale(1.4);
        }

        100% {
            transform: scale(1);
        }
    }

</style>








// },
// computed: { filter:function (activ){
// axios.get('http://qa.ridj-it.com/app/trip?activity=' + this.activ).then(response => {
// // handle success
// this.trips = response.data;
// })
// }
// },






// components: {'test', {
// data: function () {
// return {
// activ: ""
// }
// },
// method:{
// check: function(activ){
// this.id =
// axios.get('http://qa.ridj-it.com/app/trip?activity=' + this.activ).then(response => {
// // handle success
// this.trips = response.data;
// })
// }
//
// },
// template: '<li><label><input type="checkbox" name="check" :checked="check" :value="activity.id" /><span class="label-text">{{activity.name}}</span></label></li>'
//})
// }










// <li v-for="activity in activities"><label><input type="checkbox" name="check" v-model="activ" :value="activity.id" />
        // data: () => ({
        // activ: []
        // computed: {
        // filteredTrips() {
        // if (!this.activ.length)
        // return this.trips
        // return this.trips.filter(j => this.activ.includes(j.activityTypes[0].id))
        // }
        // },
