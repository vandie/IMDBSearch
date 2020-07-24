<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,500;2,600&display=swap');
#app {
  font-family: 'Roboto', sans-serif;
}

body {
  background: linear-gradient(#fd746c, #ff9068);
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

*, *::after, *::before {
  box-sizing: border-box;
}

.input {
  display: block;
  position: relative;
}

.input__label {
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  display: block;
  transition: all 0.3s ease-in-out;
  top: 1.7rem;
  position: absolute;
  pointer-events: none;
  opacity: 1;
  left: 2.2rem;
  z-index: 1;
}

.input__input {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-size: 1.2rem;
  margin: 0;
  padding: 1.5rem 2rem;
  border-radius: 0.2rem;
  background-color: #fefefe;
  border: 2px solid #efefef;
  width: 90%;
  display: block;
  transition: all 0.3s;

  &:active, &:focus, &:not(:placeholder-shown) {
    outline: 0px solid #efefef;
    border: 2px solid #efefef;
    & ~ .input__label {
      opacity: 0;
    }
  }
}

.input__input:not(.input__input--fat) {
  padding: .75rem 1rem;
  & ~ .input__label {
    top: .9rem;
    left: 1.2rem;
  }
}

input[type="submit"], button, .btn {
  border: none;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background: #AECFB7;
  font-weight: 600;
  text-transform: uppercase;
  &:hover {
    background: darken(#AECFB7, 2%);
  }

  &:active {
    background: darken(#AECFB7, 5%);
    border: 0px solid darken(#AECFB7, 5%);
  }

  &.small-btn {
  font-size: .8rem;
}
}

</style>
