<template>
  <main class="view profile">
    <section class="profile-head">
      <div class="profile-info">
        <img class="profile-image" :src="profile_image" alt />
        <strong>{{ display_name }}</strong>
      </div>
      <!-- <div class="edit-profile">
        <input type="text" v-model="profile_image" placeholder="Image Url" v-if="visible" />
        <button @click="saveInfo" v-if="visible">Save Profile</button>
        <button @click="toggleVisible" v-if="!visible">Edit Profile</button>
      </div>-->
    </section>
    <section class="posts">
      <div class="post" v-for="post in posts" :key="post._id">
        <img :src="post.image" alt="post.desc" class="post-image" />
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: "userProfile",
  data() {
    return {
      profile_image: "",
      display_name: "",
      posts: [],
      visible: false
    };
  },
  methods: {
    getProfile() {
      console.log(this.$route.params.id);
      this.$http
        .post(this.$store.state.api_url + "user/getprofile", {
          user_id: this.$route.params.id
        })
        .then(({ data }) => {
          this.profile_image = data.details.profile_image;
          this.display_name = data.details.display_name;
          this.posts = data.details.posts;
        });
    },
    toggleVisible() {
      this.visible = !this.visible;
    },
    saveInfo() {
      this.$http
        .post(this.$store.state.api_url + "user/updateprofile", {
          auth_token: localStorage.getItem("jwt"),
          profile_image: this.profile_image
        })
        .then(res => {
          console.log(res);
        });
      this.visible = true;
    }
  },
  beforeMount() {
    this.getProfile();
  }
};
</script>
