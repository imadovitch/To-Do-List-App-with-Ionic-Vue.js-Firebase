<template>
  <ion-page>

      <div class="mt-2">
          <h2 class="text-center text-2xl font-semibold">NewTask</h2>
      </div>

       <Form @submit="addTask()" class="flex flex-col justify-center h-full">

           <div>
               <ion-item>
                   <Field v-slot="{ field }" name="taskField" 
                   :rules="isRequired" v-model="task"> 
                       <ion-input v-bind="field" type="text" name="taskField"
                       placeholder="What are you planning ?"></ion-input>
                   </Field>    
               </ion-item>

               <ion-item lines="none">

                   <ErrorMessage v-slot="{message}" name="taskField">
                       <ion-text color="danger" v-if="message">{{message}}</ion-text>
                   </ErrorMessage>
               </ion-item>
           </div>

           <div>
               <ion-item>
                   <ion-icon :icon="notifications" color="primary" slot="start"></ion-icon>
                   <Field v-slot="{field}" name="duedateField" :rules="isRequired"> 
                       <ion-datetime v-bind="field" v-model="dueDate"
                       display-format="MMM DD, YYYY HH:mm"
                       display-timezone="utc"
                       value="2020-11-11T14:51:56.646+01:00" max="2025-12-31"></ion-datetime>
                   </Field>
               </ion-item>
               <ion-item lines="none">
                   <ErrorMessage v-slot="{message}" name="duedateField">
                       <ion-text color="danger" v-if="message">{{message}}</ion-text>
                   </ErrorMessage>
               </ion-item>

               <ion-item>
                   <ion-icon :icon="document" color="primary" slot="start"></ion-icon>
                   <ion-textarea v-model="note" placeholder="Enter more information here..."></ion-textarea>
               </ion-item>

               <ion-item>
                   <ion-icon :icon="grid" color="primary" slot="start"></ion-icon>
                   <ion-label>Category</ion-label>

                   <Field v-model="category" :rules="isRequired" v-slot="{field}" name="categoryField" >
                       <ion-select v-bind="field" placeholder="Select One">
                            <ion-select-option value="Work">Work</ion-select-option>
                            <ion-select-option value="Music">Music</ion-select-option>
                            <ion-select-option value="Travel">Travel</ion-select-option>
                            <ion-select-option value="Study">Study</ion-select-option>
                            <ion-select-option value="Home">Home</ion-select-option>
                            <ion-select-option value="Shopping">Shopping</ion-select-option>
                            <ion-select-option value="Sport">Sport</ion-select-option>
                       </ion-select>
                   </Field>
               </ion-item>
               <ion-item lines="none">
                   <ErrorMessage v-slot="{message}" name="categoryField">
                       <ion-text color="danger" v-if="message">{{message}}</ion-text>
                   </ErrorMessage>
               </ion-item>

           </div>

           <div class="mt-8">
               <ion-button expand="block" type="submit">Create</ion-button>
           </div>
        </Form> 


      <ion-fab vertical="top" horizontal="end" slot="fixed"
        class="cursor-pointer" @click="$emit('close-modal')">
          <ion-icon :icon="close" class="text-3xl"></ion-icon>
      </ion-fab>
  </ion-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { IonPage,IonFab,IonIcon,IonItem,IonInput,IonText,IonDatetime,IonTextarea,
IonLabel, IonButton, IonSelect,IonSelectOption } from '@ionic/vue';
import {close,notifications,document,grid} from 'ionicons/icons';
import {Form, Field, ErrorMessage } from 'vee-validate';
import firebase from '@/firebase.ts';
const db = firebase.firestore();
export default defineComponent({

    components:{
        IonPage,IonFab,IonIcon,IonItem,IonInput,IonText,IonDatetime,IonTextarea,
        IonLabel,IonButton,IonSelect,IonSelectOption,
        Form, Field, ErrorMessage
    },

    setup(){
        const task = ref('');
        const dueDate = ref('');
        const note = ref('');
        const category = ref('');
        const isRequired = (value) => {
            if (!value) {
                return 'This field is required';
            }
            return true;
        }

        function addTask() {
            
            db.collection('tasks')
              .add({
                  task: task.value,
                  note: note.value,
                  dueDate: dueDate.value,
                  category: category.value,
                  done: false
              }) 
              .then(() => {
                  task.value = "";
                  dueDate.value = "";
                  note.value = "";
                  category.value = "";

                  this.$emit('close-modal');

                  console.log('Document successfully written !');
              })
              .catch((error) => {
                  console.log("Error writing document: ",error);
              }) 
        }
        return{
            isRequired,task,dueDate,note,category,addTask,
            close,notifications,document,grid
        }
    }
})
</script>

<style>

</style>