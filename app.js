Vue.component('side-bar', {
    template: `
        <nav class="menu">
            <i class="bx bx-menu-alt-left" id="hamburger"></i>
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
                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="instagram">
                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="facebook">
            </div>
        </nav>      
    `
});

Vue.component('todo-item', {
    template: `
        <li class="todo-item">
            <input type="checkbox" v-bind:checked="done" v-on:change="$emit('input', $event.target.checked)" id="checkbox">
            <span>{{ title }}</span>
            <i class="fas fa-trash" v-on:click="$emit('delete')"></i>
        </li>
    `,
    props: ['title', 'done']
});

var app = new Vue ({
    el: '#vue-app',
    data: {
        newTodo: '',
        todos: [
            {"id": 0, "title": "Play games on iPad", "done": false},
            {"id": 1, "title": "Nap", "done": false},
            {"id": 2, "title": "Freak-out at midnight", "done": false}
        ]
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
        }
    }
});

// show/hide sidebar menu
const hamburger = document.querySelector('#hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click',() => {
    menu.classList.toggle('active');
});