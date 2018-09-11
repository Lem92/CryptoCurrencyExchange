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
                  <div class="col-1-3 col-1-2-xs col-1-1-xxs" v-for="item in data">
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
                                      <div class="right" :class="getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'hour').sign ? 'green' : 'red'">
                                          {{getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'hour').value}}
                                      </div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Day change</div>
                                      <div class="right" :class="getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'day').sign ? 'green' : 'red'">
                                          {{getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'day').value}}
                                      </div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Week change</div>
                                      <div class="right" :class="getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'week').sign ? 'green' : 'red'">
                                          {{getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'week').value}}
                                      </div>
                                  </div>
                                  <div class="currency-item__row">
                                      <div class="left">Month change</div>
                                      <div class="right" :class="getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'month').sign ? 'green' : 'red'">
                                          {{getValue(item.cryptoCurrency.isPercentChange, item.json.changes, 'month').value}}
                                      </div>
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
    import Main from './mixin/main.js'
    export default {
        name: 'app',
        mixins: [
            Main,
        ],
    }
</script>
