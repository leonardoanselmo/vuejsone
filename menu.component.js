window.menuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="item in menu">
                <a v-link="{path: item.url}">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function() {
        return {
            menu: [
                {id: 0, name: "Listar contas", url: '/bills'},
                {id: 1, name: "Criar conta", url: '/bill/create'}
            ],
        };
    }
});
