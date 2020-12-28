import { createStore } from 'vuex';

import firebase from '@/firebase'
const db = firebase.firestore();
const store = createStore({

    state:{
        tasks: Array<any>(),
        options:{
            year: "numeric", month: "short", day: "numeric",
            hour: "2-digit", minute: '2-digit',hourCycle: 'h24'
        },

        isToday: (someDate: any) => {
            const today = new Date();

            return someDate.getDate() == today.getDate() 
            && someDate.getMonth() == today.getMonth()
            && someDate.getFullYear() == today.getFullYear()
        }

    },
    getters:{

        today: (state) => {
            return (todayTasks: Array<any>) => todayTasks.filter((item: any) => {
                return state.isToday(new Date(item.dueDate)) && item.done == false;
            })
        },

        late: (state) => {
            return (lateTasks: Array<any>) => lateTasks.filter((item: any) => {
                return new Date(item.dueDate).getTime() < new Date().getTime()
                    && item.done == false;
            })
        },

        later: (state) => {
            return (laterTasks: Array<any>) => laterTasks.filter((item: any) => {
                return new Date(item.dueDate).getTime() > new Date().getTime()
                && state.isToday(new Date(item.dueDate)) == false
                && item.done == false;
            })
        },

        done: (state) => {
            return (doneTasks: Array<any>) => doneTasks.filter((item: any) => {
                return item.done == true;
            })
        },
        
        tasksByCategory: (state) => {
            return (category: any) => state.tasks.filter((item: any) => {
                return item.category == category;
            })  
        },
        lengthTasksByCategory: (state) => {
            return (category: any) => state.tasks.filter((item: any) => {
                return item.category == category;
            }).length;
        }


    },
    mutations:{

        getTasks: (state) => {

            state.tasks = [];
            db.collection('tasks')
              .onSnapshot((querySnapshot: any ) => {
                  state.tasks = [];
                  
                  querySnapshot.forEach((doc: any) => {
                    state.tasks.push({
                        id: doc.id,
                        task: doc.data().task,
                        dueDate: new Date(doc.data().dueDate).toLocaleDateString('en-US',state.options),
                        category: doc.data().category,
                        note: doc.data().note,
                        done: doc.data().done
                    });

                    console.log(doc.id, " => ", doc.data());
                  })
              })  

        },

        doneTask: (state, payload: any) => {
            if (payload.done == false) {
                
                db.collection('tasks')
                  .doc(payload.id)
                  .update({
                      done: true
                  })
                  .then(() => {
                      console.log('Task done');
                  })
                  .catch((error) => {
                    console.log(error);
                  })  
            }
        },

        notDoneTask: (state, payload: any) => {
            if (payload.done == true) {
                
                db.collection('tasks')
                  .doc(payload.id)
                  .update({
                      done: false
                  })
                  .then(() => {
                      console.log('Task not done');
                  })
                  .catch((error) => {
                    console.log(error);
                  })  
            }
        },

        deleteTask: (state, payload: any) => {

            db.collection('tasks')
               .doc(payload.id)
               .delete()
               .then(() => {
                   console.log('Task deleted');
               }) 
        }
    }
});


export default store;