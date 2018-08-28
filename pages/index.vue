<template>
  <div>
    <section class="hero">
      <div class="container">
        <img class="logo-image" src="~/assets/images/frfnn-logo.png" alt="Logo">
        <img class="logo-text" src="~/assets/images/frfnn-text.png" alt="First Responders for Net neutrality" />

        <p class="elevator-pitch">We saw the true danger of the FCC's net neutrality repeal when Verizon was caught throttling California fire fighters. If you're a first responder who relies on the open Internet to do your job, please sign our open letter below.</p>

        <p><a href="#sign" class="btn btn-block btn-large" @click.prevent="scrollTo('sign'); $trackClick('top_cta_button')">Sign the Open Letter</a></p>

        <ul>
          <li><a href="#intro" @click.prevent="scrollTo('intro')">Learn More</a></li>
          <li><a href="#letter" @click.prevent="scrollTo('letter')">Read the Letter</a></li>
        </ul>
      </div>
    </section>
    <section id="intro" ref="intro">
      <div class="container">
        <h2>VERIZON THROTTLED FIREFIGHTERS DURING THE WORST WILDFIRE IN CALIFORNIA HISTORY</h2>
        <p>While Santa Clara County firefighters were fighting some of the biggest forest fires in America’s history, Verizon was throttling their internet speeds, <a href="https://arstechnica.com/tech-policy/2018/08/fire-dept-rejects-verizons-customer-support-mistake-excuse-for-throttling/" target="_blank">preventing</a> firefighters from providing crisis response and emergency services to those in need.</p>
        <p>Firefighters and other first responders deserve access to the fastest speeds on the internet, especially in times of crisis.  Because when emergency personnel can’t communicate quickly and clearly, it puts people’s lives at risk.  With strong net neutrality protections in place, what Verizon did could’ve been <a href="https://www.eff.org/deeplinks/2018/08/verizons-throttling-fire-fighters-could-go-unpunished-because-fcc-repealed-open" target="_blank">prevented</a>. But since FCC Chairman (and former Verizon lawyer) Ajit Pai’s repeal, all the fire department could do was pay the company more money to get service restored.</p>
        <p><b>If you are a firefighter, EMT or other first responders, please sign this open letter calling on our elected officials in Congress to restore net neutrality.</b></p>
      </div>
    </section>

    <section id="sign" ref="sign">
      <div class="container">
        <h2>Sign the Letter</h2>
        <ActionNetworkForm />
      </div>
    </section>

    <section id="letter" ref="letter">
      <div class="container">
        <div class="letter-wrapper">
          <h2>Read the Letter</h2>
          <div class="letter-copy" v-html="letterToCongress"></div>
        </div>
      </div>
    </section>

    <section id="quotes">
      <div class="container">
        <h2 ref="quotesWidth">What people are saying:</h2>
        <p>Over a thousand first responders have signed this open letter to Congress, urging our lawmakers to listen to the voices of the people and overturn the FCC's repeal of net neutrality.  Here are just a few comments from men and women whose lives are literally being put at risk by the destruction of net neutrality:</p>
        <QuoteScroller :init-quotes-width="initQuotesWidth" :quotes="quotes" />
      </div>
    </section>

    <footer class="page-footer">
      <small>Built by:</small>
      <a href="https://www.fightforthefuture.org"><img src="~/assets/images/fftf-logo.svg" alt="Fight for the Future" class="logo"></a>
      <div class="contact-info">
        <h5>FOR PRESS INQUIRIES, PLEASE CONTACT US AT:</h5>
        <p>
          <a href="tel://+19788526457">978-852-6457</a> or <a href="mailto:press@fightforthefuture.org">press@fightforthefuture.org</a><br>
          All other inquiries, contact <a href="mailto:team@fightforthefuture.org">team@fightforthefuture.org</a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import config from '~/config.json'
import { createMetaTags, simpleFormat, smoothScrollToElement } from '~/assets/js/helpers.js'
import ActionNetworkForm from '~/components/ActionNetworkForm'
import QuoteScroller from '~/components/QuoteScroller'
import shuffle from 'lodash/shuffle'

export default {
  components: {
    ActionNetworkForm,
    QuoteScroller
  },

  head() {
    return {
      title: config.sharing.title,
      meta: createMetaTags({
        title: config.sharing.title,
        description: config.sharing.description,
        image: config.sharing.image,
        url: config.sharing.url
      })
    }
  },

  data() {
    return {
      quotes: [],
      initQuotesWidth: 550
    }
  },

  computed: {
    letterToCongress: () => simpleFormat(config.letterToCongress)
  },

  created() {
    this.fetchQuotes()
  },

  mounted() {
    this.setQuoteWidthInScroller()
    this.$nextTick(function() {
      window.addEventListener('resize', this.setQuoteWidthInScroller)
    })
  },

  methods: {
    setQuoteWidthInScroller() {
      this.initQuotesWidth = this.$refs.quotesWidth.clientWidth
    },

    scrollTo(ref) {
      smoothScrollToElement(this.$refs[ref])

      setTimeout(() => {
        location.hash = '#' + ref
      }, 500)
    },

    async fetchQuotes() {
      const { data } = await axios.get('https://data.battleforthenet.com/firstresponders/quotes.json')
      this.quotes = shuffle(data)
    }
  }
}
</script>


