<template>
  <div class="login-page">
    <header>
      <!-- prettier-ignore -->
      <h3 class="title">INSTA<span>CLONE</span></h3>
      <h4>Log In</h4>
    </header>
    <main class="form-group">
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="emailError ? 'err' : ''"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        :class="passError ? 'err' : ''"
      />
      <button class="login-btn" @click="login">Log In</button>
      <div class="error_msg" v-if="hasErrors">{{ error }}</div>
    </main>
    <footer>
      <p>
        Don't have an account?
        <router-link class="link" to="/register">Sign Up</router-link>.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      hasErrors: false,
      emailError: false,
      passError: false,
      error: '',
    };
  },
  methods: {
    login() {
      let api_url = this.$store.state.api_url; //From store/index.js
      if (this.email == '' || this.password == '')
        // If field is blank alert
        return alert('Please fill in all fields');
      this.$http
        .post(api_url + 'user/login', {
          //Post to host/user/login with email/pass data
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.auth) {
            this.$store.commit('login', response.data.token);
          } else {
            if (response.data.emailError) {
              this.emailError = true;
            } else {
              this.emailError = false;
            }
            if (response.data.passError) {
              this.passError = true;
            } else {
              this.passError = false;
            }
            this.error = response.data.msg;
            this.hasErrors = true;
          }
        })
        .catch((err) => {
          console.error('Error: ', err);
        });
    },
  },
};
</script>
