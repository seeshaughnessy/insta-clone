<template>
  <div class="view feed">
    <article class="post" v-for="post in feed" :key="post.id">
      <header class="post-user">
        <router-link :to="'/profile/' + post.user_id">
          <img :src="post.profile_image" alt="Profile Thumbnail" class="profile-thumb" />
        </router-link>
        {{ post.display_name }}
      </header>
      <section class="post-picture">
        <img :src="post.image" :alt="post.desc" class="post-image" />
      </section>
      <footer class="post-desc">
        <p>
          <strong>{{ post.display_name }}</strong>
          {{ post.desc }}
        </p>
        <p class="timestamp">{{ timestampToDate(post.timestamp) }}</p>
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      api_url: this.$store.state.api_url
    };
  },
  computed: {
    feed() {
      return this.$store.state.feed;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
    timestampToDate(timestamp) {
      timestamp = new Number(timestamp);
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      let d = new Date(timestamp);
      // let year = d.getFullYear();
      let month = months[d.getMonth()];
      let day = d.getDate();
      return `${month} ${day}`;
    }
  }
};
</script>
