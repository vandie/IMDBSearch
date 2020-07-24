<template>
  <div class="film">
    <div class="loading" v-if="loading">Loading</div>
    <div class="film-propper" v-if="!loading && about">
      <div class="poster"><img  :src="about.Poster" :alt="about.Title"/></div>
      <h2 class="film-title">{{about.Title}} ({{about.Released}})</h2>
      <p class="plot">{{about.Plot}}</p>
      <div class="staring">
        <h3>Staring</h3>
        {{about.Actors}}
      </div>
      <div class="directed">
        <h3>Directed By</h3>
        {{about.Director}}
      </div>
      <div class="genres">
        <h3>Genres</h3>
        <div class="genre" v-for="genre in genres" :key="genre">
          {{genre}}
        </div>
      </div>
    </div>
    <router-link
      to="/"
      class="btn small-btn"
    >
      Back
    </router-link >
  </div>
</template>

<style lang="scss">
  h2 {
    padding: 0;
    margin: 2rem 0 0;
  }
  .film {
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .btn {
      margin: 2rem auto;
    }
  }
  .film-propper {
    padding: 1rem;
    display: grid;
    grid-row: auto repeat(6, 7rem) auto;
    grid-column: auto;
    text-align: center;
    grid-template-areas:
      ". . . poster poster . . ."
      ". . . title title . . ."
      ". . . plot plot . . ."
      ". . . staring staring . . ."
      ". . . directing directing . . ."
      ". . genres genres genres genres . ."
  }

  .genres {
    grid-area: genres;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h3 {
      width: 100%;
      padding: 0;
      margin: 4rem 0 0;
    }
    .genre {
      border-radius: .4rem;
      background: #a044ff;
      color: white;
      font-size: .8rem;
      padding: .5rem 1rem;
      margin: 1rem
    }
  }

  .directed {
    grid-area: directing;
  }

  .staring {
    grid-area: staring;
  }

  .plot {
    grid-area: plot;
  }

  .poster {
    grid-area: poster;
    display: flex;
    justify-content: center;
    img {
      width: 12rem;
    }
  }
  .film-title {
    grid-area: title;
    width: 100%;
  }
</style>

<script>
import request from '@/lib/request';

export default {
  name: 'Movie',
  components: {
  },
  data: () => ({
    id: '',
    about: {},
    loading: true,
  }),
  computed: {
    genres() {
      if (!this.about.Genre) return [];
      return this.about.Genre.split(', ');
    },
  },
  methods: {
    async load() {
      this.loading = true;
      this.about = await request({ i: this.id, plot: 'short' });
      this.loading = false;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.load();
  },
};
</script>
