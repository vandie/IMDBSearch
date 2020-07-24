<template>
  <router-link class="search-result" :to="`/${result.Type}/${result.imdbID}`">
    <img class="search-result__poster" :src="result.Poster" :alt="result.Title"/>
  </router-link>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    result: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .search-result {
    display: flex;
    justify-content: center;

    &__poster {
      display: block;
      width: 8rem;
    }
  }
</style>
