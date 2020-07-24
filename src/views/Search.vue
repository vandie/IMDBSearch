<template>
  <div class="search">
    <form class="search-area" v-on:submit="search">
      <div class="input search-main">
        <input
          type="text"
          id="search-main"
          v-model="searchOptions.s"
          name="search-main"
          class="input__input input__input--fat"
          placeholder=" "
          required
          minlength=3
        />
        <label for="search-main" class="input__label">Search</label>
      </div>
      <div class="select-input search-type">
        <select
          id="search-type"
          name="search-type"
          class="input__input"
          value=""
          required
          v-model="searchOptions.type">
          <option disabled value selected>Search Type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
        </select>
        <label for="search-type" class="input__label">Type</label>
      </div>
      <input type="submit" class="searchButton" value="Search" />
    </form>
    <div class="results" v-if="!loading && Array.isArray(results) && results.length">
      <SearchResult v-for="result in results" :key="result.imdbID" :result="result"/>
    </div>
    <div class="pagination" v-if="!loading && Array.isArray(results) && results.length">
      <button
      class="paginator paginator-last small-btn"
      v-if="searchOptions.page > 1"
      v-on:click="lastPage">
        Previous Page
      </button>
      <span class="pagination__text">Page {{searchOptions.page}}</span>
      <button
        class="paginator paginator-next small-btn"
        v-if="searchOptions.page < 100"
        v-on:click="nextPage">
          Next Page
        </button>
    </div>
    <div class="error" v-if="!Array.isArray(results) && results.Error">
      Couldn't find anything
    </div>
    <div class="error" v-if="loading">
      Loading...
    </div>
  </div>
</template>

<style lang="scss">
  .pagination {
    color: white;
    font-size: 1;
    display: grid;
    grid-template-columns: auto 8rem 8rem 8rem auto;
    grid-template-areas: ". previous text next .";
    text-align: center;
    column-gap: 1rem;
    margin-top: 2rem;
    align-items: center;
    .pagination__text {
      grid-area: text;
    }
    .paginator {
      &-last {
        grid-area: previous;
      }
      &-next {
        grid-area: next;
      }
    }
  }
  .error {
    color: white;
    font-size: 2rem;
    text-align: center;
    margin-top: 2rem;
  }
  .results {
    width: 46rem;
    max-width: 100%;
    display: grid;
    margin: 1rem auto;
    grid-template-columns: repeat(5, 8rem);
    grid-template-rows: auto;
    justify-content: center;
    row-gap: 1rem;
    column-gap: 1rem;
  }
  .search-area {
    transition: 210ms ease-in-out;
    grid-template-columns: auto minmax(5rem, 15rem) minmax(5rem, 15rem) auto;
    grid-template-rows: 25vh auto;
    grid-template-areas:
    ". . . ."
    ". searchMain searchMain ."
    ". field1 searchButton .";
    column-gap: 1rem;
    row-gap: 1rem;
    display: grid;
  }

  .search-area:not(:only-child){
    grid-template-rows: 5vh auto;
  }

  .search-main {
    grid-area: searchMain;
    display: block;
    input {
      display: block;
      width: 100%;
    }
  }

  .search-type {
    display: block;
    grid-area: field1;
    select {
      display: block;
      width: 100%;
    }
  }

  .searchButton {
    grid-area: searchButton;
  }
</style>

<script>
// @ is an alias to /src
import SearchResult from '@/components/SearchResult.vue';
import request from '@/lib/request';

export default {
  name: 'Search',
  components: {
    SearchResult,
  },
  data: () => ({
    loading: false,
    results: [],
    searchOptions:
      localStorage.getItem('search')
        ? JSON.parse(localStorage.getItem('search'))
        : {
          page: 1,
          s: '',
          type: '',
        },
  }),
  methods: {
    async search(e) {
      if (e) {
        e.preventDefault();
        this.searchOptions.page = 1;
      }
      this.loading = true;
      this.results = await request(this.searchOptions);
      this.loading = false;
    },
    nextPage() {
      this.searchOptions.page += 1;
      this.search();
    },
    lastPage() {
      this.searchOptions.page += 1;
      this.search();
    },
  },
  destroyed() {
    localStorage.setItem('search', JSON.stringify(this.searchOptions));
  },
  mounted() {
    if (this.searchOptions.s.length >= 3) {
      this.search();
    }
  },
};
</script>
