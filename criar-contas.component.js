window.criarcontasComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <label>Vencimento: </label>
        <input type="text" v-model="camposConta.data_vcto"/>
        <br/><br/>
        <label>Nome: </label>
        <select v-model="camposConta.descricao">
            <option v-for="conta in descricaoContas" value="{{ conta }}">
                {{ conta }}
            </option>
        </select>
        <br/><br/>
        <label>Valor: </label>
        <input type="text" v-model="camposConta.valor"/>
        <br/><br/>
        <label>Pago?: </label>
        <input type="checkbox" v-model="camposConta.situacao"/>
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
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }
        };
    },
    methods: {
        submit: function(){
            if(this.formType == 'insert'){
                this.$dispatch('new-bill', this.camposConta);
            }

            this.camposConta = {
                data_vcto: '',
                descricao: '',
                valor: '',
                situacao: false
            }

            this.$dispatch('change-activedview', 0);
        }
    },
    events: {
        'change-formtype': function(formType){
            this.formType = formType;
        },
        'change-bill': function(bill){
            this.camposConta = bill;
        }
    }
});
