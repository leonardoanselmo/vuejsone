'use strict';

window.billPayCreateComponent = Vue.extend({
    template: '\n    <form name="form" @submit.prevent="submit">\n        <label>Vencimento: </label>\n        <input type="text" v-model="bill.date_due"/>\n        <br/><br/>\n        <label>Nome: </label>\n        <select v-model="bill.name">\n            <option v-for="conta in names" value="{{ conta }}">\n                {{ conta }}\n            </option>\n        </select>\n        <br/><br/>\n        <label>Valor: </label>\n        <input type="text" v-model="bill.value"/>\n        <br/><br/>\n        <label>Pago?: </label>\n        <input type="checkbox" v-model="bill.done"/>\n        <br/><br/>\n        <input type="submit" value="Enviar"/>\n    </form>    \n    ',
    data: function data() {
        return {
            formType: 'insert',
            names: ['Conta de luz', 'Conta de água', 'Conta de telefone', 'Supermercado', 'Cartão de Crédito', 'Empréstimo', 'Gasolina'],
            bill: {
                date_due: '',
                name: '',
                value: 0,
                done: false
            }
        };
    },
    created: function created() {
        if (this.$route.name == 'bill-pay.update') {
            this.formType = 'update';
            this.getBill(this.$route.params.id);
        }
    },
    methods: {
        submit: function submit() {
            var self = this;
            if (this.formType == 'insert') {
                Bill.save({}, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            } else {
                Bill.update({ id: this.bill.id }, this.bill).then(function (response) {
                    self.$dispatch('change-info');
                    self.$router.go({ name: 'bill-pay.list' });
                });
            }
        },
        getBill: function getBill(id) {
            var self = this;
            Bill.get({ id: id }).then(function (response) {
                self.bill = response.data;
            });
        }
    }
});