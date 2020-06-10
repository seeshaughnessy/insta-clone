<template>
  <div class="register-page">
    <header>
      <h3>INSTA<span>CLONE</span></h3>
      <h4>Register</h4>
    </header>
    <main class="form-group">
      <input type="text" v-model="first_name" placeholder="First Name" />
      <input type="text" v-model="last_name" placeholder="Last Name" />
      <input
        type="text"
        v-model="email"
        placeholder="Email"
        :class="hasErrors ? 'err' : ''"
      />
      <input type="password" v-model="password" placeholder="Password" />
      <button class="login-btn" @click="register">Register</button>
      <div class="error_msg" v-if="hasErrors">
        {{ error }}
      </div>
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
  name: 'register',
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      hasErrors: false,
      error: '',
    };
  },
  methods: {
    register() {
      let api_url = this.$store.state.api_url; //From store/index.js
      if (
        this.first_name == '' ||
        this.last_name == '' ||
        this.email == '' ||
        this.password == ''
      ) {
        return alert('Please fill in all fields');
      }
      this.$http
        .post(api_url + 'user/register', {
          //Post to host/user/login with emal/pass data
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.data.auth) {
            localStorage.setItem('jwt', response.data.token); //Set token for 24hour session
            this.$router.push('/'); //Redirect to homepage
          } else {
            this.error = response.data.msg;
            this.hasErrors = true;
          }
        })
        .catch((err) => {
          this.error = err;
          this.hasErrors = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-page {
  flex: 1;
  display: flex;
  flex-flow: column;
  height: 100vh;
  box-sizing: border-box;

  header {
    padding: 15px 25px;
    h3 {
      color: #171717;
      font-size: 28px;
      text-align: center;
      font-weight: 900;
      span {
        font-weight: 300;
      }
    }

    h4 {
      color: #888;
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }
  }

  footer {
    width: calc(100%-50px);
    height: 30px;
    background-color: #eee;
    box-shadow: 0px -1px 3px 0px rgba(0, 0, 0, 0.2);
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: #888;
      margin: 0px;
      padding: 0px;
      font-size: 16px;
      text-align: center;
    }

    .link {
      color: #884371;
      text-decoration: none;
      font-weight: 600;
    }
  }
}
</style>
