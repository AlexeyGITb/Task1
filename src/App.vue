<template>
    <div id="app">
        <vue-snotify class="snotify centerTop"></vue-snotify>
        <nav class="navbar"></nav>
        <div class="container-fluid">
            <div class="row">

                <div class="col-sm-3 col-md-2 sidebar">
                    <ul class="nav nav-sidebar" style="position:fixed;">
                        <!-- Checkboxes -->
                        <div class="form-check">
                            <li v-for="activity in activities"><label><input type="checkbox" v-model="checkboxesArray" :value="activity.id" /><span class="label-text">{{activity.name}}</span></label></li>
                        </div>
                    </ul>
                </div>
                <!---->
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <!-- Modal -->
                    <div class="modal fade" id="Modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="text-center modal-title" id="ModalLabel">Select Trip id from list below</h5>

                                </div>
                                <div class="modal-body">
                                    <select class="form-control" v-model="tripId">
                                        <option v-for="trip in trips" :value="trip.id">{{trip.id}} — {{trip.name}}</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="sendData(); displayNotification();">Create trip</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!---->
                    <div class="container ">
                        <div class="container clearfix" style="">
                            <button type="button" class="btn btn-primary btn-lg pull-right createT" data-toggle="modal" data-target="#Modal">Create Trip</button>

                        </div>
                        <ul>
                            <!-- Trips-->
                            <li v-for="(trip,index) in trips" :key="index">
                                <div class="container  trip shadow">
                                    <div class="row">

                                        <div class="col-4 tripLeft">
                                            <img :src="trip.imageUrl" :id="'img'+trip.id" class="tripImg" alt="Responsive image"></div>

                                        <div class="col-8">
                                            <!--main -->
                                            <h3 class=" text-center border-primary border-bottom text-primary ">{{trip.name}}</h3>
                                            <p>{{trip.destination.name}} </p>
                                            <p><span class="text-primary">Pick up:</span> {{new Date(trip.pickupTime).toLocaleString()}}</p>
                                            <p><span class="text-primary">Event start:</span> {{new Date(trip.dateTrip).toLocaleString()}}</p>
                                            <p><span class="text-primary">Drop off:</span> {{new Date(trip.dropOffTime).toLocaleString()}}</p>
                                            <!---->
                                            <!--activity icons-->
                                            <ul>
                                                <li v-for="(activity,i) in trip.activityTypes" class="activityTypes">
                                                    <img class="actImg" :src="trip.activityTypes[i].picUrl">
                                                </li>
                                            </ul>
                                            <!---->
                                            <!--description-->
                                            <div class="panel-group" id="accordion">
                                                <div class="panel panel-default">

                                                    <a data-toggle="collapse" :trid="trip.id" @click="testmet" class="link" data-parent="#accordion" :href="'#trip' + index"><img class="arrow align-middle" :id="'aid' + trip.id" src="src/assets/arrow1.png"></a>
                                                    <div :id="'trip' + index" class="panel-collapse collapse in">
                                                        <div class="panel-body row">
                                                            <div class="col-12">
                                                                <p>{{trip.activityDescription}}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!---->
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'app',
        data: () => ({
            index: '',
            test: '',
            activities: [],
            trips: [],
            checkboxesArray: [],
            activ: [],
            oldTrips: [],
            tripId: '',
        }),

        methods: {
            //ser(){
            //     axios.get("http://qa.ridj-it.com/app/3218/member",{
            //                         }) .then((response) => {
            //                        console.log(response);
            //                    })
            //                    .catch((error) => {
            //                        console.log(error);
            //                    });
            //},

            testmet: function(event) {
                var test = event.target.getAttribute('trid');
                console.log(test + "next?")

                //arrow flip           
                if ($('#aid' + test).css('transform') == 'none') {
                    $('#aid' + test).css({
                        'transform': 'rotate(180deg)',
                        '-moz-transition': 'transform 0.5s',
                        '-webkit-transition': 'transform 0.5s',
                        'transition': 'transform 0.5s'
                    });
                } else {
                    $('#aid' + test).css({
                        'transform': '',
                        '-moz-transition': 'transform 0.5s',
                        '-webkit-transition': 'transform 0.5s',
                        'transition': 'transform 0.5s'
                    });
                };
                //img border
                if ($('#img' + test).css('border-bottom-left-radius') == '20px') {
                    $('#img' + test).css({
                        'border-bottom-left-radius': '0'
                    });
                } else {
                    $('#img' + test).css({
                        'border-bottom-left-radius': '20px',
                        '-moz-transition': 'border-bottom-left-radius 0.7s',
                        '-webkit-transition': 'border-bottom-left-radius 0.7s',
                        'transition': 'border-bottom-left-radius 0.7s'
                    });
                }
                
            },
            displayNotification() {
                this.$snotify.success("Trip successfully created!");
            },


            sendData() { //create new trip
                var test = {
                    tripId: this.tripId
                }
                var json = JSON.stringify(test);
                axios({
                        method: 'POST',
                        url: 'http://qa.ridj-it.com/app/trip',
                        data: json,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
            loadTrips() { //filtering thru API (currently working only with one active checkbox)
                if (this.checkboxesArray.length) {
                    const urlParams = this.checkboxesArray.map(item => {
                        return `activity=${item}`
                    }).join('&')
                    console.log(`http://qa.ridj-it.com/app/trip?${urlParams}`);
                    axios.get(`http://qa.ridj-it.com/app/trip?${urlParams}`)
                        .then(response => {
                            this.trips = response.data
                        })
                } else {
                    axios.get('http://qa.ridj-it.com/app/trip')
                        .then(response => {
                            this.trips = response.data
                        })
                }
            }
        },
        beforeMount() {
            var data = "username=qa_test@test.ru&password=1234qwer";
            axios("http://qa.ridj-it.com/login", {
                    "method": 'POST',
                    "async": true,
                    "crossDomain": true,
                    data: data,
                    headers: {
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                        "accept-language": "en-US,en;q=0.9,ru;q=0.8",
                        "content-type": "application/x-www-form-urlencoded",

                    }

                }).then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });


            this.loadTrips() //Filing checkboxes thru api
            axios.get('http://qa.ridj-it.com/app/activity').then(response => {
                this.activities = response.data
            })
        },
        watch: {
            checkboxesArray() {
                this.loadTrips();
            }
        }
    }

</script>

<style>
    @import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
    @import 'normalize.css';

    * {
        font-family: "FontAwesome";
    }

    .main {}

    .createT {
        margin-right: 9%;
        width: 160px;
    }

    p {
        font-size: 1.3em;
    }

    ul {
        margin: 0;
        padding: 0
    }

    .activityTypes {
        display: inline
    }

    li {
        list-style-type: none
    }

    body {
        background-color: #f8f8ff
    }

    .arrow {
        pointer-events: none;
        height: 20px;
        width: 20px;
        margin-left: 50%;
        padding-bottom: 2px;
    }

    .link {
        display: block
    }

    .tripImg {
        height: 240px;
        width: inherit;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
    }

    .actImg {
        width: 50px;
        height: 50px
    }

    .tripLeft {
        margin: 0;
        padding: 0;
        border-top-left-radius: 23px;
        background-color: #007bff;
        border-bottom-left-radius: 20px
    }

    .trip {
        min-height: 200px;
        width: 80%;
        margin-top: 10px;
        border-radius: 20px;
        background-color: #fff
    }

    p {
        color: #898686;
        padding: 0;
        margin: 0
    }

    label {
        position: relative;
        cursor: pointer;
        color: #898686;
        font-size: 25px;
    }

    input[type="checkbox"] {
        position: absolute;
        right: 9000px
    }

    input[type="checkbox"]+.label-text:before {
        content: "\f096";
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        -webkit-font-smoothing: antialiased;
        width: 1em;
        display: inline-block;
        margin-right: 5px
    }

    input[type="checkbox"]:checked+.label-text:before {
        content: "\f14a";
        color: #2980b9;
        animation: effect 250ms ease-in
    }

    input[type="checkbox"]:disabled+.label-text {
        color: #aaa
    }

    input[type="checkbox"]:disabled+.label-text:before {
        content: "\f0c8";
        color: #ccc
    }

    @keyframes effect {
        0% {
            transform: scale(0)
        }

        25% {
            transform: scale(1.3)
        }

        75% {
            transform: scale(1.4)
        }

        100% {
            transform: scale(1)
        }
    }

</style>

<!--
            Filtering thru js (partially working)
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
-->
