export default {
    data () {
        return {
            data: {
                data: {},
                activeCurrency: 'usd',
                currency: ['usd', 'eur', 'rub', 'gbp'],
            },
        }
    },
    methods: {
        fetchData() {
            fetch(`https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD`, {
                method: 'GET'
            }).then(
                response => response.json())
                .then(json => this.data = json)
        }
    },
    created() {
        this.fetchData();
    },
}