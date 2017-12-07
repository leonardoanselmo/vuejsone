window.billPayCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="camposConta.date_due"/>
        <br/><br/>
        <label>Nome: </label>
        <select v-model="camposConta.name">
            <option v-for="conta in descricaoContas" value="{{ conta }}">
                {{ conta }}
            </option>
        </select>
        <br/><br/>
        <label>Valor: </label>
        <input type="text" v-model="camposConta.value"/>
        <br/><br/>
        <label>Pago?: </label>
        <input type="checkbox" v-model="camposConta.done"/>
        <br/><br/>
        <input type="submit" value="Enviar"/>
    </form>    
    `,
    data: function() {
        return {
            formType: 'insert',
            descricaoContas: [
                'Conta de luz',
                'Conta de água',
                'Conta de telefone',
                'Supermercado',
                'Cartão de Crédito',
                'Empréstimo',
                'Gasolina'
            ],
            camposConta: {
                date_due: '',
                name: '',
                value: '',
                done: false
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.$root.$children[0].billsPay.push(this.camposConta);
            }

            this.camposConta = {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }
            this.$router.go({name: 'bill.list'});
        },
        getBill: function(index){
            var bills = this.$root.$children[0].billsPay;
            this.camposConta = bills[index];
        }
    }
});
