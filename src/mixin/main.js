export default {
    data () {
        return {
            data: [],
            activeCurrency: 'USD',
            currencies: ['USD', 'EUR', 'RUB', 'GBP'],
            cryptoCurrencies: [
                {
                    value: 'ETH',
                    name: 'Ethereum',
                    isPercentChange: false,
                },
                {
                    value: 'LTC',
                    name: 'Litecoin',
                    isPercentChange: false,
                },
                {
                    value: 'BTC',
                    name: 'Bitcoin',
                    isPercentChange: false,
                },
            ],
            isDropDownShow: true,
        }
    },
    methods: {
        fetchData(cryptoCurrency, activeCurrency) {
            fetch(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${cryptoCurrency.value}${activeCurrency}`, {
                method: 'GET'
            }).then(response => response.json())
                .then(json => this.data.push({json, cryptoCurrency}));
        },
        selectActiveCurrency(currency) {
            this.data = [];
            this.toggleDropdown();
            this.activeCurrency = currency;
            this.cryptoCurrencies.forEach((item) => {
                this.fetchData(item, this.activeCurrency);
            });
        },
        toggleDropdown() {
            this.isDropDownShow = !this.isDropDownShow;
        },
        getValue(isPercentChange, item, valueKey) {
            return {
                value: isPercentChange ? `${item.percent[valueKey]}%` : `${item.price[valueKey]}$`,
                sign: parseFloat(isPercentChange ? `${item.percent[valueKey]}%` : `${item.price[valueKey]}$`) > 0
            }
        },
    },
    created () {
        this.selectActiveCurrency(this.activeCurrency);
    },
}