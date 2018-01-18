window.billPayMenuComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="item in menu">
                <a v-link="{name: item.routeName}">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
    `,
    data: function() {
        return {
            menu: [
                {id: 0, name: "Listar contas", routeName: 'bill-pay.list'},
                {id: 1, name: "Criar conta", routeName: 'bill-pay.create'}
            ],
        };
    }
});
