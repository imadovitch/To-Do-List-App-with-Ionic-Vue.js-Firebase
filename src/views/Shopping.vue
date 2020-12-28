<template>
    <ion-page>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button default-href="/Lists"></ion-back-button>
            </ion-buttons>

            <ion-icon :icon="ellipsisVertical" slot="end" class="text-2xl"></ion-icon>
        </ion-toolbar>

        <ion-content class="overflow-auto">
            <div class="flex flex-col justify-center items-center mt-2">
                <div class="text-center">
                    <ion-icon :icon="cart" size="large" style="color:#115E59"></ion-icon>
                </div>

                <div class="text-center">
                    <ion-card-title class="text-2xl">Shopping</ion-card-title>
                    <ion-card-subtitle>{{state.tasksShopping.length}} Tasks</ion-card-subtitle>
                </div>
            </div>

            <div>
                <ion-list>
                    <ion-list-header>
                        <ion-label>Late <span class="text-gray-600 text-base">{{state.late.length}}</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.late" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2>{{item.task}}</h2>
                                <p style="color:red">{{item.dueDate}}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option @click="doneTask(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.done"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>

                    </ion-item-sliding>
                </ion-list>
                <ion-list>
                    <ion-list-header>
                        <ion-label>Today <span class="text-gray-600 text-base">{{state.today.length}}</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.today" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                               <h2>{{item.task}}</h2>
                                <p>{{item.dueDate}}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option @click="doneTask(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.done"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>

                    </ion-item-sliding>
                </ion-list>
                <ion-list>
                    <ion-list-header>
                        <ion-label>Later <span class="text-gray-600 text-base">{{state.later.length}}</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.later" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2>{{item.task}}</h2>
                                <p>{{item.dueDate}}</p>
                            </ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option @click="doneTask(item)" color="primary" expandable>
                                <ion-checkbox :checked="item.done"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>

                    </ion-item-sliding>
                </ion-list>
                <ion-list>
                    <ion-list-header>
                        <ion-label>Done <span class="text-gray-600 text-base">{{state.done.length}}</span></ion-label>
                    </ion-list-header>
                    <ion-item-sliding v-for="item in state.done" :key="item.id">
                        <ion-item-options side="start">
                            <ion-item-option @click="deleteTask(item)" color="danger" expandable>
                                <ion-icon :icon="trash" size="large"></ion-icon>
                            </ion-item-option>
                        </ion-item-options>
                        <ion-item detail="true">
                            <ion-label>
                                <h2 style="color:#3490dc"><s>{{item.task}}</s></h2>
                                <p><s>{{item.dueDate}}</s></p>
                            </ion-label>
                        </ion-item>
                        <ion-item-options side="end">
                            <ion-item-option @click="notDoneTask(item)" color="white" expandable>
                                <ion-checkbox :checked="item.done"></ion-checkbox>
                            </ion-item-option>
                        </ion-item-options>

                    </ion-item-sliding>
                </ion-list>
            </div>
        </ion-content>

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
    </ion-page>
</template>

<script>
import {defineComponent, ref, reactive, computed , onMounted} from 'vue';
import { IonPage, IonToolbar,IonButtons,IonBackButton,IonIcon, IonContent,
IonCardTitle,IonCardSubtitle,IonListHeader,IonItemSliding,IonItemOptions,IonItemOption,
IonLabel,IonCheckbox,IonList,IonItem,IonFab,IonFabButton,IonModal } from '@ionic/vue';
import {ellipsisVertical,cart,trash,add} from 'ionicons/icons';
import NewTask from '@/components/NewTask.vue';
import {useStore} from 'vuex';
export default defineComponent({

    components:{
       IonPage,IonToolbar,IonButtons,IonBackButton,IonIcon,IonContent,
       IonCardTitle,IonCardSubtitle,IonListHeader,IonItemSliding,
       IonItemOptions,IonItemOption,IonLabel,IonCheckbox,IonList,IonItem,
       IonFab,IonFabButton,IonModal,
       NewTask  
    },

    setup(){
        const isOpenNewTask = ref(false);
        const store = useStore();
        const state = reactive({
        tasksShopping: computed(() => {
          return store.getters.tasksByCategory('Shopping')
        }),
        today: computed(() => {
            return store.getters.today(state.tasksShopping);
        }),
        late: computed(() => {
            return store.getters.late(state.tasksShopping);
        }),
        later: computed(() => {
            return store.getters.later(state.tasksShopping);
        }),
        done: computed(() => {
            return store.getters.done(state.tasksShopping);
        })
      }); 
      function getTasksShopping() {
        store.commit('getTasks');
      }
      function doneTask(item) {
        store.commit('doneTask', item)
      }
      function notDoneTask(item) {
        store.commit('notDoneTask', item)
      }
      function deleteTask(item){
        store.commit('deleteTask',item)
      }

      onMounted(() => {
          if (store.state.tasks.length == 0) {
              getTasksShopping();
          }
      })
        return{
            store,state,getTasksShopping,notDoneTask,doneTask,isOpenNewTask,deleteTask,
            ellipsisVertical,cart,trash,add
        }
    }

})
</script>

<style>

</style>