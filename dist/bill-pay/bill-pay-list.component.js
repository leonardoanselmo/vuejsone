'use strict';

window.billPayListComponent = Vue.extend({
    template: '\n    <style type="text/css">\n        .pago {\n            color: green;\n        }\n        .nao-pago {\n            color: red;\n        }    \n    </style>\n    <table border="1" cellpadding="10">\n        <thead>\n            <tr>\n                <th>#</th>                \n                <th>C\xF3digo</th>\n                <th>Vencimento</th>\n                <th>Descri\xE7\xE3o</th>\n                <th>Valor</th>\n                <th>Situa\xE7\xE3o</th>\n                <th>A\xE7\xF5es</th>                \n            </tr>\n        </thead>\n        <tbody>\n            \n            <tr v-for="(index,o) in bills">                             \n                <td>{{ index + 1 }}</td>\n                <td>{{ o.id }}</td>\n                <td>{{ o.date_due }}</td>\n                <td>{{ o.name }}</td>\n                <td>{{ o.value | currency \'R$ \' 2 }}</td>\n                <td class="minha-classe" :class="{\'pago\': o.done, \'nao-pago\': !o.done}">\n                    {{ o.done | situacaoLabel }}\n                </td>\n                <td>\n                    <a v-link="{ name: \'bill-pay.update\', params: {id: o.id} }">Editar</a> |\n                    <a href="#" @click.prevent="excluirConta(o)">Excluir</a>\n                </td>\n            </tr>\n                        \n        </tbody>\n     </table>            \n    ',
    data: function data() {
        return {
            bills: []
        };
    },
    created: function created() {
        var self = this;
        Bill.query().then(function (response) {
            self.bills = response.data;
        });
    },
    methods: {
        excluirConta: function excluirConta(bill) {
            if (confirm('Deseja excluir esta conta?')) {
                var self = this;
                Bill.delete({ id: bill.id }).then(function (response) {
                    self.bills.$remove(bill);
                    self.$dispatch('change-info');
                });
            }
        }
    }
});