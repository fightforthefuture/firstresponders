<template>
  <div>
    <section class="hero">
      <div class="container">
        <img class="logo-image" src="~/assets/images/frfnn-logo.png" alt="Logo">
        <img class="logo-text" src="~/assets/images/frfnn-text.png" alt="First Responders for Net neutrality" />

        <p class="elevator-pitch">We saw the true danger of the FCC's net neutrality repeal when Verizon was caught throttling California fire fighters. If you're a first responder who relies on the open Internet to do your job, please sign our open letter below.</p>

        <p><a href="#sign" class="btn btn-block btn-large">Sign the Open Letter</a></p>

        <ul>
          <li><a href="#intro">Verizon Throttled the SCCFD</a></li>
          <li><a href="#letter">Read the Letter</a></li>
        </ul>
      </div>
    </section>
    <section id="intro">
      <div class="container">
        <h2>VERIZON THROTTLED THE SCCFD</h2>
        <p>While Santa Clara County firefighters were fighting some of the biggest forest fires in America’s history, Verizon was throttling their internet speeds, preventing firefighters from providing crisis response and emergency services to those in need … <a href="https://arstechnica.com/tech-policy/2018/08/verizon-throttled-fire-departments-unlimited-data-during-calif-wildfire/" target="_blank">all over a $2.00 monthly fee</a>.</p>
        <p>Firefighters and other first responders deserve access to the fastest speeds on the internet, especially in times of crisis.  Because when emergency personnel can’t communicate quickly and clearly, it puts people’s lives at risk.  Net neutrality ensures that companies like Verizon are legally prevented from throttling internet speeds. <b>If you are a firefighter, EMT or other first responders, please sign this open letter calling on our elected officials in Congress to restore net neutrality.</b></p>
      </div>
    </section>

    <section id="sign">
      <div class="container">
        <h2>Sign the Letter</h2>
        <ActionNetworkForm />
      </div>
    </section>

    <section id="letter">
      <div class="container">
        <div class="letter-wrapper">
          <h2>Read the Letter</h2>
          <div class="letter-copy" v-html="letterToCongress"></div>
        </div>
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
import config from '~/config.json'
import { createMetaTags, simpleFormat } from '~/assets/js/helpers.js'
import ActionNetworkForm from '~/components/ActionNetworkForm'

export default {
  components: {
    ActionNetworkForm
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

  computed: {
    letterToCongress: () => simpleFormat(config.letterToCongress)
  }
}
</script>


