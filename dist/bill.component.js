"use strict";

window.billComponent = Vue.extend({
    template: "\n    <nav>\n        <ul>\n            <li v-for=\"item in menu\">\n                <a v-link=\"{name: item.routerName}\">{{ item.name }}</a>\n            </li>\n        </ul>\n    </nav>\n    <router-view></router-view>\n    ",
    data: function data() {
        return {
            menu: [{ name: "Contas a Pagar", routerName: 'bill-pay.list' }, { name: "Contas a Receber", routerName: 'bill-receive' }]
        };
    }
});