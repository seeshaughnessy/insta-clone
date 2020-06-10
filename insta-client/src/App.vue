<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: #f7f7f7;
  font-family: 'Roboto', Arial, Helvetica, sans-serif;
}

#app {
  width: 100vw;
  min-height: 100vh;
}

.form-group {
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding: 25px;

  input {
    width: 100%;
    height: 30px;
    border: 1px solid #ddd;
    margin-bottom: 15px;
    text-indent: 5px;
    background: #eee;
    outline: none;

    &.err {
      background-color: rgba(200, 0, 0, 0.3);
      border: 1px solid #af1e2d;
    }

    &:focus {
      border: 1px solid #aaa;
    }
  }

  button {
    width: 100%;
    height: 30px;
    background: #ca82b2;
    appearance: none;
    border: none;
    outline: none;
    border-radius: 5px;

    color: #171717;
    font-size: 16px;
    font-weight: 600;
  }
  .error_msg {
    margin: 15px 0px;
    padding: 10px;
    background-color: rgba(200, 0, 0, 0.3);
    color: #171717;
    font-weight: 600;
    border-radius: 8px;
  }
}
</style>
