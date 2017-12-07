window.billComponent = Vue.extend({
    template: `
    <nav>
        <ul>
            <li v-for="item in menu">
                <a v-link="{name: item.routerName}">{{ item.name }}</a>
            </li>
        </ul>
    </nav>
    <router-view></router-view>
    `,
    data: function() {
        return {
            menu: [
                { name: "Contas a pagar", routerName: 'bill-pay.list'},
                { name: "Contas a receber", routerName: 'bill-receive'}
            ],
        };
    }
});
