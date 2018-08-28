<style lang="scss" scoped>
.row {
  display: flex;

  > * {
    flex: 1;
    margin: 0.4rem;
    min-width: 0;
  }
}

.confirm {
  text-align: left;
  font-size: 82%;

  input {
    margin: 0 0.5rem 0 0.25rem;
  }
}

.disclaimer {
  font-size: 1.1rem;
  margin: 0 1rem;
  color: darken($body-color, 10%);
}

.after-action .btn {
  margin-right: 1rem;
  font-size: 1.8rem;
  padding: 1rem 4rem;
}
</style>

<template>
  <div>
    <div class="after-action" v-if="hasSigned">
      <p>
        Thanks for signing the open letter! Please consider sharing with your
        friends and family.
      </p>
      <div class="buttons">
        <share-button
            network="twitter"
            @click.native="$trackClick('after_action_twitter_button')"
            class="btn-block">
          <span>Tweet</span>
        </share-button>
        <share-button
            network="facebook"
            @click.native="$trackClick('after_action_facebook_button')"
            class="btn-block">
          <span>Share</span>
        </share-button>
        <a href="https://donate.fightforthefuture.org"
           @click="$trackClick('action_action_donate_button')"
           class="btn btn-block">
          Donate
        </a>
      </div>
    </div>
    <form @submit.prevent="submitForm()" v-else>
      <div class="row">
        <input v-model="name" placeholder="Name*" type="text" required>
        <input v-model="department" placeholder="Department*" required v-if="isOther" ref="otherDepartment">
        <select v-model="department" required v-else @change="changeDepartment()">
          <option :value="null">Department*</option>
          <option v-for="department in departments" :key="department">{{ department }}</option>
        </select>
      </div>
      <div class="row">
        <input v-model="email" placeholder="Email*" type="email" required>
        <input v-model="phone" placeholder="Phone" type="tel">
        <input v-model="zipCode" placeholder="ZIP Code*" type="tel" required="">
      </div>
      <div class="row">
        <textarea v-model="comments" placeholder="Comment"></textarea>
      </div>
      <div class="row confirm">
        <label>
          <input type="checkbox" v-model="isFirstResponder" required>
          <span>I can confirm I am an emergency first responder.*</span>
        </label>
      </div>
      <div class="row">
        <button class="btn btn-large" :disabled="isSending">
          <span v-if="isSending">Saving...</span>
          <span v-else>Sign the Open Letter</span>
        </button>
      </div>
      <div class="disclaimer">
        <a href="https://www.fightforthefuture.org">Fight for the Future</a> will email you updates, and you can unsubscribe at any time. If you enter your number (it's optional) we will follow up by SMS. Message & data rates apply. Text STOP to stop receiving messages. <a href="https://www.battleforthenet.com/privacy/">Privacy Policy</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import ShareButton from '~/components/ShareButton'

// https://actionnetwork.org/petitions/first-responders-demand-real-net-neutrality-protections
const petitionId = '1ff3b500-fe3a-401a-ae9d-b305bf616a0c'

export default {
  components: {
    ShareButton
  },

  data() {
    return {
      isSending: false,
      hasSigned: false,
      errorMessage: null,
      isOther: false,
      // form fields
      name: null,
      email: null,
      phone: null,
      zipCode: null,
      department: null,
      comments: null,
      isFirstResponder: false
    }
  },

  computed: {
    departments() {
      return [
        '911 Dispatcher',
        'EMT',
        'Firefighter',
        'HAZMAT personnel',
        'Lifeguard',
        'Paramedic',
        'Park Ranger',
        'Police',
        'Registered Nurse',
        'Search and Rescue',
        'Security Guard',
        'Ski Patrol',
        'Other'
      ]
    }
  },

  methods: {
    changeDepartment() {
      if (this.department === 'Other') {
        this.department = null
        this.isOther = true
        this.$nextTick(() => this.$refs.otherDepartment.focus())
      }
    },

    async submitForm() {
      if (this.isSending) return

      this.$trackEvent('petition_form', 'submit')
      this.isSending = true

      try {
        const { data } = await axios.post(
          `https://fv8xpw9hri.execute-api.us-east-1.amazonaws.com/v1/petitions/${petitionId}/signatures`,
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            zip_code: this.zipCode,
            comments: this.comments,
            custom: {
              first_responder: this.department
            },
            tags: [ 'net-neutrality' ],
            source: this.$route.query.source
          }
        )

        this.isSending = false
        this.hasSigned = true
      }
      catch (error) {
        this.isSending = false
        this.errorMessage = "Sorry, but that didn’t work. Can you please try again?"
      }
    }
  }
}
</script>
