<template>
  
    <ion-page>
        <div class="flex w-full flex-col overflow-auto">
            <div class="mt-2">
                <h1 class="text-4xl pl-5 font-semibold">Lists</h1>
            </div>

            <div class="flex w-full flex-row flex-wrap justify-around mt-2">

                <ion-card class="w-2/5">
                    <router-link :to="{name:'All'}">
                        <ion-card-header>

                            <ion-icon :icon="clipboard" color="primary" size="large"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">All</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfAllTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Work'}">
                        <ion-card-header>

                            <ion-icon :icon="briefcase" size="large" class="text-yellow-600"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Work</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfWorkTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>
                <ion-card class="w-2/5">
                    <router-link :to="{name:'Music'}">
                        <ion-card-header>

                            <ion-icon :icon="headset" size="large" class="text-red-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Music</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfMusicTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>
                <ion-card class="w-2/5">
                    <router-link :to="{name:'Travel'}">
                        <ion-card-header>

                            <ion-icon :icon="airplane" size="large" class="text-green-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Travel</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfTravelTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Study'}">
                        <ion-card-header>

                            <ion-icon :icon="book" size="large" class="text-indigo-400"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Study</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfStudyTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Home'}">
                        <ion-card-header>

                            <ion-icon :icon="home" size="large" style="color:#2DD4BF"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Home</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfHomeTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Sport'}">
                        <ion-card-header>

                            <ion-icon :icon="football" size="large" class="text-gray-900"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Sport</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfSportTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

                <ion-card class="w-2/5">
                    <router-link :to="{name:'Shopping'}">
                        <ion-card-header>

                            <ion-icon :icon="cart" size="large" style="color:#115E59"></ion-icon>

                        </ion-card-header>

                        <ion-card-content>
                            <ion-card-title class="text-2xl">Shopping</ion-card-title>
                            <ion-card-subtitle>{{state.lengthOfShoppingTasks}} Tasks</ion-card-subtitle>
                        </ion-card-content>

                    </router-link>
                </ion-card>

            </div>

            <div>
                <ion-fab @click="isOpenNewTask = true" vertical="bottom" horizontal="end" slot="fixed">
                    <ion-fab-button>
                        <ion-icon :icon="add"></ion-icon>
                    </ion-fab-button>
                </ion-fab>

                <ion-modal 
                :is-open="isOpenNewTask"
                :backdrop-dismiss="false">
                        
                    <new-task @closeModal="isOpenNewTask = false"></new-task>    
                </ion-modal>
            </div>


        </div>        
    </ion-page>

</template>

<script>

import {computed, defineComponent ,onMounted,ref,reactive} from 'vue';
import { IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,IonCardTitle,
IonCardSubtitle,IonFab,IonFabButton,IonModal} from '@ionic/vue';
import { clipboard,briefcase,headset,airplane,book,home,football,cart,add } from 'ionicons/icons'; 
import NewTask from '@/components/NewTask.vue';
import {useStore} from 'vuex';
export default defineComponent({

    components:{
       IonPage,IonCard,IonCardHeader,IonIcon,IonCardContent,
       IonCardTitle,IonCardSubtitle,IonFab,IonFabButton,IonModal,
        NewTask 
    },

    setup(){

        const isOpenNewTask = ref(false);
        const store = useStore();
        const state = reactive({
            lengthOfAllTasks: computed(() => {
                return store.state.tasks.length;
            }),
            lengthOfWorkTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Work');
            }),
            lengthOfMusicTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Music');
            }),
            lengthOfTravelTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Travel');
            }),
            lengthOfStudyTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Study');
            }),
            lengthOfHomeTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Home');
            }),
            lengthOfSportTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Sport');
            }),
            lengthOfShoppingTasks: computed(() => {
                return store.getters.lengthTasksByCategory('Shopping');
            }),


        })

        function getTasks(){
            store.commit('getTasks');
        }

        onMounted(() => {
            if (store.state.tasks.length == 0) {
                getTasks();
            }
        })
        return{
            isOpenNewTask,store,state,getTasks,
            clipboard,briefcase,headset,airplane,book,home,football,cart,add
        }
    }

})
</script>

<style>

</style>