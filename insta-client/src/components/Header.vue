<template>
  <header class="header">
    <!-- prettier-ignore -->
    <h3 class="title">INSTA<span>CLONE</span></h3>
    <button class="logout-btn" @click="$store.commit('logout')">
      <i class="material-icons">login</i>
    </button>
  </header>
</template>
