window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billPayMenuComponent
    },
    template: `
    <style type="text/css">        
        .red {
            color: red;
        }
        .green {
            color: green;
        }
        .gray {
            color: gray;
        }
        .minha-classe {
            background-color: beige;
        }
    </style>
    <h1>{{ title }}</h1>
    <h3 :class="{'gray': status === false, 'green': status === 0, 'red': status > 0}">
        {{ status | statusGeneral }}
    </h3>
    <menu-component></menu-component>
    <router-view></router-view>   
    
    `,
    data: function(){
        return {
            title: "Contas a receber",
        };
    },

    computed: {
        status: function () {
            var contas = this.$root.$children[0].billsPay;
            if(!contas.length){
                return false;
            }
            var count = 0;
            for (var i in contas) {
                if (!contas[i].situacao) {
                    count++;
                }
            }
            return count;
        }
    }

});
