Vue.component('side-bar', {
    template: `
        <nav class="menu">
            <i class="bx bx-menu-alt-left" id="hamburger" v-on:click="$emit('show')"></i>
            <header class="avatar">
                <div class="image"></div>  
                <h2>Carlos R.</h2>
            </header>
            <ul class="nav-links">
                <li class="nav-item"><i class="fas fa-list"></i>Tasks</li>
                <li class="nav-item"><i class="fas fa-cog"></i>Settings</li>
                <li class="nav-item"><i class="fas fa-question-circle"></i>Help</li>
            </ul>
            <div class="social-links">
                <a href="https://icons8.com/icon/118497/facebook"><img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="facebook"></a>
                <a href="https://icons8.com/icon/32323/instagram"><img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="instagram"></a>
                <a href="https://icons8.com/icon/5MQ0gPAYYx7a/twitter"><img src="https://img.icons8.com/fluent/30/000000/twitter.png"/></a>            
            </div>
        </nav>      
    `
});

Vue.component('todo-item', {
    template: `
        <li>
            <input type="checkbox" v-bind:checked="done" v-on:change="$emit('input', $event.target.checked)" id="checkbox">
            <span>{{ title }}</span>
            <i class="fas fa-trash" v-on:click="$emit('delete')"></i>
            <hr>
        </li>
    `,
    props: ['title', 'done']
});

var app = new Vue ({
    el: '#vue-app',
    data: {
        navActive: false,
        darkMode: false,
        newTodo: '',
        todos: [
            {"id": 0, "title": "Play games on iPad", "done": false},
            {"id": 1, "title": "Nap", "done": false},
            {"id": 2, "title": "Freak-out at midnight", "done": true}
        ]
    },
    mounted() {
        if(localStorage.todos) {
            this.todos = JSON.parse(localStorage.todos);
        }
    },
    watch: {
      todos: {
          handler(updatedTodos) {
              localStorage.todos = JSON.stringify(updatedTodos);
          },
          deep: true
      }
    },
    methods: {
        addTodo: function () {
            if (this.newTodo === '') {
                console.log('input is blank')
            } else {
                this.todos.unshift({
                    id: this.todos.length,
                    title: this.newTodo,
                    done: false
                });
                this.newTodo = '';
            }
        },
        deleteTodo: function (index) {
            this.todos.splice(index, 1);
        },
        changeStatus: function (index) {
            const todo = this.todos[index];
            todo.done = !todo.done;
            this.todos.sort((x,y) => x.done - y.done);
            // this.todos.sort((x, y) => (x.done > y.done) ? 1 : -1)
        },
        showNav: function () {
            this.navActive = !this.navActive;
        },
        switchTheme: function () {
            const bodyEl = document.querySelector('body');
            bodyEl.classList.toggle('dark');
            this.darkMode = !this.darkMode;
        },
        clearAll: function () {
            this.todos = [];
        }
    },
    computed: {
        completed: function () {
            return this.todos.filter(todo =>
                todo.done
            );
        },
        incomplete: function () {
            return this.todos.filter(todo =>
                !todo.done
            );
        },
        today: function () {
            return new Date().toDateString();
        }
    }
});
