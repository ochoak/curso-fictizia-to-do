const app = new Vue({
    el: '#app',
    data : function(){
        return {
            id : 0,
            newTaskValue : '',
            tasks : []
        }
    },
    methods : {
        getUniqueId(){
            return ++this.id;
        },
        addNewtask(){
            if(this.newTaskValue){ 
                
                this.tasks = [...this.tasks, {
                    name : this.newTaskValue,
                    id : this.getUniqueId(),
                    status : ''
                }];      

                this.newTaskValue = '';
            }
        },
        markAsDone( taskToMark ){
            // const resultado = this.tasks
            //     .find( task => task.id === taskToMark.id );            
            // if(resultado.status == '')
            //     resultado.status = 'done';
            // else
            //     resultado.status = '';

            if(taskToMark.status == '')
                taskToMark.status = 'done';
            else
                taskToMark.status = '';
        },
        removeTask( taskToremove ){
            this.tasks = this.tasks
                .filter( task => task.id != taskToremove.id );
            if( this.tasks.length < 1)
                this.id = 0;
        },
        saveFile: function() {
            const data = JSON.stringify(this.tasks)
            window.localStorage.setItem('tasks', data);
            window.localStorage.setItem('id', this.id);
      } 
    },
    computed : {
        ordenatedTask(){
            return this.tasks
                .slice()
                .sort((a, b) => (a.status < b.status) ? 1 : (a.status === b.status) ? ((a.id > b.id) ? 1 : -1) : -1 )                
        }
    },
    watch : {
        ordenatedTask( ){
            this.saveFile();
        }
    },
    created() {
        this.tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]');
        this.id = JSON.parse(window.localStorage.getItem('id') || '[]');
    }
});