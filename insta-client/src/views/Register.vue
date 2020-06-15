<template>
  <div class="register-page">
    <header>
      <!-- prettier-ignore -->
      <h3 class="title">
        INSTA
        <span>CLONE</span>
      </h3>
      <h4>Register</h4>
    </header>
    <main class="form-group">
      <img class="profile-image" :src="profile_image" alt="Profile Image" />
      <input type="text" v-model="profile_image" placeholder="Image Url" />
      <input type="text" v-model="first_name" placeholder="First Name" />
      <input type="text" v-model="last_name" placeholder="Last Name" />
      <input type="text" v-model="email" placeholder="Email" :class="hasErrors ? 'err' : ''" />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="login-btn" @click="register">Register</button>
      <div class="error_msg" v-if="hasErrors">{{ error }}</div>
    </main>
    <footer>
      <p>
        Already Registered?
        <router-link class="link" to="/login">Sign In</router-link>.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      profile_image: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      hasErrors: false,
      error: ""
    };
  },
  methods: {
    register() {
      let api_url = this.$store.state.api_url; //From store/index.js
      if (
        this.first_name == "" ||
        this.last_name == "" ||
        this.email == "" ||
        this.password == ""
      ) {
        return alert("Please fill in all fields");
      }
      this.$http
        .post(api_url + "user/register", {
          //Post to host/user/register with emal/pass data
          profile_image: this.profile_image,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password
        })
        .then(response => {
          if (response.data.auth) {
            localStorage.setItem("jwt", response.data.token); //Set token for 24hour session
            this.$router.push("/"); //Redirect to homepage
          } else {
            this.error = response.data.msg;
            this.hasErrors = true;
          }
        })
        .catch(err => {
          this.error = err;
          this.hasErrors = true;
        });
    }
  }
};
</script>
