"use strict";

window.billPayMenuComponent = Vue.extend({
    template: "\n    <nav>\n        <ul>\n            <li v-for=\"item in menu\">\n                <a v-link=\"{name: item.routeName}\">{{ item.name }}</a>\n            </li>\n        </ul>\n    </nav>\n    ",
    data: function data() {
        return {
            menu: [{ id: 0, name: "Listar contas", routeName: 'bill-pay.list' }, { id: 1, name: "Criar conta", routeName: 'bill-pay.create' }]
        };
    }
});