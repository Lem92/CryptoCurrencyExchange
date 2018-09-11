<template>
  <div id="app">
      <section class="exchange-wrapper">
          <div class="container">
              <div class="select-wrapper">
                  <h1 class="select-header">Select currency to exhange:</h1>
                  <div class="select-block-wrap">
                      <div class="select-block select-block-header" @click="toggleDropdown">
                          {{activeCurrency}}
                      </div>
                      <ul class="select-block select-drop-down"
                          v-show="isDropDownShow"
                      >
                          <li v-for="(currency, index) in currencies"
                              v-if="currency !== activeCurrency"
                              @click="selectActiveCurrency(currency)"
                          >
                              {{currency}}
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <div class="container">
              <div class="row">
                  <div class="col-1-3" v-for="item in data">
                      <div class="currency-item" :class="item.cryptoCurrency.value">
                          <div class="header">{{item.cryptoCurrency.name}}</div>
                          <div class="currency-item__content">
                              <div class="currency-item__row price-wrap">
                                  <div class="left">Price:</div>
                                  <div class="right">{{item.json.averages.day}}</div>
                              </div>
                              <div class="currency-item__row percent-switcher">
                                  <div class="left">Percent change:</div>
                                  <div class="right">
                                      <label class="switch">
                                          <input type="checkbox" v-model="item.cryptoCurrency.isPercentChange">
                                          <span class="slider round"></span>
                                      </label>
                                  </div>
                              </div>
                              <div class="time-change-wrap">
                                  <div class="currency-item__row">
                                      <div class="left">Hour change</div>
                                      <div class="right">
                                          {{item.cryptoCurrency.isPercentChange ? item.json.changes.percent.hour : item.json.changes.price.hour}}
                                      </div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Day change</div>
                                      <div class="right">

                                      </div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Week change</div>
                                      <div class="right">$22 526.92</div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Month change</div>
                                      <div class="right">$22 526.92</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  </div>
</template>

<script>
    export default {
        name: 'app',
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
                isDropDownShow: false,
            }
        },
        methods: {
            fetchData(cryptoCurrency, activeCurrency) {
                fetch(`https://apiv2.bitcoinaverage.com/indices/global/ticker/${cryptoCurrency.value}${activeCurrency}`, {
                    method: 'GET'
                }).then(response => response.json())
                    .then(json => this.data.push({json, cryptoCurrency}));
            },
            selectActiveCurrency (currency) {
                this.toggleDropdown();
                this.activeCurrency = currency;
                const arrayPromises = [];
                this.cryptoCurrencies.forEach((item) => {
                    arrayPromises.push(this.fetchData(item, this.activeCurrency));
                });
                this.data = [];
                Promise.all(arrayPromises).then(
                    console.log('dsadsa')
                );
            },
            toggleDropdown() {
                this.isDropDownShow = !this.isDropDownShow;
            }
        },
        created () {
            this.selectActiveCurrency(this.activeCurrency);
        },
    }
</script>
