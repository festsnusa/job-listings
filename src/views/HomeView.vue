<template lang="pug">
header.header
  .header__overlay
  main.main
    .cards
      .cards__filter(v-show="requirements.length > 0" )
        .cards__filter_box
          p.cards__filter_item(v-for="requirement in requirements" :key="requirement" @click="deleteItem") {{ requirement }}
        span.cards__clear(@click="clear") Clear
      AppCards(:add="add" @fill-connections="fillConnections")
</template>

<script>
import AppCards from '@/components/AppCards.vue'
import { mapStores } from 'pinia';
import useFilterStore from '@/stores/filter'

export default {
  name: "HomeView",
  components: {
    AppCards
  },
  data() {
    return {
      requirements: [],
      connections: []
    }
  },
  computed: {
    ...mapStores(useFilterStore)
  },
  methods: {
    add(connections, value) {
      console.log(value, connections)
      if (this.requirements.includes(value)) return
      this.requirements.push(value)
      this.filter(connections)
    },
    fillConnections(values) {
      this.connections = values
    },
    deleteItem(value) {
      this.requirements = this.requirements.filter((e => e !== value.target.textContent))

      if (this.requirements.length == 0) {
        this.clear()
        return
      }
      this.filter(this.connections)
    },
    clear() {
      this.requirements = []
      const cards = document.querySelectorAll('.cards__card')

      cards.forEach(card => card.classList.remove('cards__card_invisible'))
    },
    filter(connections) {
      const cards = document.querySelectorAll('.cards__card')

      connections.forEach((connection, i) => {
        const contains = this.requirements.every(el => connection.includes(el) ? true : false)

        if (!contains) {
          cards[i].classList.add('cards__card_invisible')
        } else {
          cards[i].classList.remove('cards__card_invisible')
        }
      })


    },

  },
}
</script>

<style lang="scss">
$cyan: hsl(180, 29%, 50%);
$cyanBackground: hsl(180, 52%, 96%);
$cyanFilter: hsl(180, 31%, 95%);
$cyanGray: hsl(180, 8%, 52%);
$cyanDark: hsl(180, 14%, 20%);

/* league-spartan-regular - latin */
@font-face {
  font-family: 'League Spartan';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/league-spartan-v6-latin-regular.eot');
  /* IE9 Compat Modes */
  src: local(''),
    url('./fonts/league-spartan-v6-latin-regular.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('./fonts/league-spartan-v6-latin-regular.woff2') format('woff2'),
    /* Super Modern Browsers */
    url('./fonts/league-spartan-v6-latin-regular.woff') format('woff'),
    /* Modern Browsers */
    url('./fonts/league-spartan-v6-latin-regular.ttf') format('truetype'),
    /* Safari, Android, iOS */
    url('./fonts/league-spartan-v6-latin-regular.svg#LeagueSpartan') format('svg');
  /* Legacy iOS */
}

/* league-spartan-500 - latin */
@font-face {
  font-family: 'League Spartan';
  font-style: normal;
  font-weight: 500;
  src: url('./fonts/league-spartan-v6-latin-500.eot');
  /* IE9 Compat Modes */
  src: local(''),
    url('./fonts/league-spartan-v6-latin-500.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('./fonts/league-spartan-v6-latin-500.woff2') format('woff2'),
    /* Super Modern Browsers */
    url('./fonts/league-spartan-v6-latin-500.woff') format('woff'),
    /* Modern Browsers */
    url('./fonts/league-spartan-v6-latin-500.ttf') format('truetype'),
    /* Safari, Android, iOS */
    url('./fonts/league-spartan-v6-latin-500.svg#LeagueSpartan') format('svg');
  /* Legacy iOS */
}

/* league-spartan-700 - latin */
@font-face {
  font-family: 'League Spartan';
  font-style: normal;
  font-weight: 700;
  src: url('./fonts/league-spartan-v6-latin-700.eot');
  /* IE9 Compat Modes */
  src: local(''),
    url('./fonts/league-spartan-v6-latin-700.eot?#iefix') format('embedded-opentype'),
    /* IE6-IE8 */
    url('./fonts/league-spartan-v6-latin-700.woff2') format('woff2'),
    /* Super Modern Browsers */
    url('./fonts/league-spartan-v6-latin-700.woff') format('woff'),
    /* Modern Browsers */
    url('./fonts/league-spartan-v6-latin-700.ttf') format('truetype'),
    /* Safari, Android, iOS */
    url('./fonts/league-spartan-v6-latin-700.svg#LeagueSpartan') format('svg');
  /* Legacy iOS */
}

.header {
  background-image: url('./images/bg-header-mobile.svg');
  height: 21vh;
  background-repeat: no-repeat;
  background-size: cover;

  &__overlay {
    background-color: $cyan;
    mix-blend-mode: multiply;
    height: 21vh;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.main {
  padding: 2rem;
  background-color: $cyanBackground;
  height: 100vh;
}

.cards {

  display: grid;
  grid-template-columns: repeat(1, 100%);
  gap: 3rem;
  padding-bottom: 4rem;

  &__card {
    background: #fff;
    border-radius: 10px;
    box-shadow: 4px 4px 8px 0px rgba($cyanDark, 0.2);
    position: relative;
    padding: 2.5rem;

    &_invisible {
      display: none;
    }

    &_featured {
      background: linear-gradient(to right, $cyan 10px, #fff 10px 100%);
    }

  }

  &__clear {
    cursor: pointer;

    &:hover {
      color: $cyan;
      border-bottom: 1px solid $cyan;
    }
  }

  &__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border-radius: 10px;
    box-shadow: 4px 4px 8px 0px rgba($cyanDark, 0.2);
    position: relative;
    padding: 2.5rem;
    // display: none;

    &_active {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      align-items: center;
    }

    &_box {
      display: flex;
      gap: 2.5rem;
      flex-wrap: wrap;
      align-items: center;
    }

    &_list {
      list-style: none;
    }

    &_item {

      position: relative;
      background-color: $cyanBackground;
      padding: 0.5rem;
      color: $cyan;
      font-weight: 700;
      border-radius: 10px 0 0 10px;
      pointer-events: none;



      &:after {
        pointer-events: all;

        position: absolute;
        content: '';
        width: 2rem;
        height: 100%;
        background-color: $cyan;
        background-image: url('./images/icon-remove.svg');
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 0 10px 10px 0;
        top: 0;
        left: 95%;
        cursor: pointer;

      }

      &:hover:after {
        background-color: $cyanDark;
      }
    }
  }

  &__image {
    position: absolute;
    width: 3rem;
    top: -1.5rem;
    left: 1.5rem;

    &_photosnap {
      content: url('@/images/photosnap.svg');
    }

    &_manage {
      content: url('@/images/manage.svg');
    }

    &_account {
      content: url('@/images/account.svg');
    }

    &_myhome {
      content: url('@/images/myhome.svg');
    }

    &_loop-studios {
      content: url('@/images/loop-studios.svg');
    }

    &_faceit {
      content: url('@/images/faceit.svg');
    }

    &_shortly {
      content: url('@/images/shortly.svg');
    }

    &_insure {
      content: url('@/images/insure.svg');
    }

    &_eyecam-co {
      content: url('@/images/eyecam-co.svg');
    }

    &_the-air-filter-company {
      content: url('@/images/the-air-filter-company.svg');
    }

  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__title {
    color: $cyan;
    font-weight: 700;
  }

  &__box {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  &__properties {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__button {
    text-transform: uppercase;
    font-weight: 700;

    &_new,
    &_featured {
      color: #fff;
      padding: 0.5rem;
      border-radius: 20px;
    }

    &_new {
      background-color: $cyan;
    }

    &_featured {
      background-color: $cyanDark;
    }
  }

  &__position {
    cursor: pointer;
    font-weight: 700;
    font-size: 1.1rem;

    &:hover {
      color: $cyan;
    }
  }

  &__list {
    display: flex;
    gap: 1.5rem;
  }

  &__item {

    font-weight: 700;
    color: $cyanGray;

    &:first-child {
      list-style: none;
    }
  }

  &__footer {
    display: flex;
    gap: 1rem;
    list-style: none;
    flex-wrap: wrap;
  }

  &__requirement {
    padding: 0.7rem;
    background-color: $cyanBackground;
    color: $cyan;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      background-color: $cyan;
      color: #fff;
    }
  }
}

@media (min-width: 1024px) {}
</style>