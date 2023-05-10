<template lang="pug">
.cards
  div(v-for="value in arr" :key="value.id" :class="`cards__card ${value.featured ? 'cards__card_featured' : ''}`" :id="value.id")
    .cards__left
      img.cards__image(alt="logo" :class="`cards__image_${value.logo}`")
      .cards__header
        .cards__box
          p.cards__title {{ value.company }}
          .cards__properties
            .cards__button.cards__button_new(v-show="value.new") new!
            .cards__button.cards__button_featured(v-show="value.featured") featured
        a.cards__position(href="#!" aria-label="position") {{ value.position }}
        ul.cards__list
          li.cards__item {{ value.postedAt }}
          li.cards__item {{ value.contract }}
          li.cards__item {{ value.location }}
    hr
    ul.cards__footer
      li.cards__requirement(@click="add(this.connections, value.role)") {{ value.role }}
      li.cards__requirement(@click="add(this.connections, value.level)") {{ value.level }}
      li.cards__requirement(@click="add(this.connections, tool)" v-for="tool in value.tools" :key="tool") {{tool }}
      li.cards__requirement(@click="add(this.connections, language)" v-for="language in value.languages" :key="language") {{ language }}
</template>

<script>
import json from '@/data.json'

export default {
  name: "AppCards",
  props: ["add", "fillConnections"],
  data() {
    return {
      arr: json,
      connections: []
    }
  },
  created() {
    this.arr.forEach(e => {

      let requirements = [e.role, e.level]

      e.tools.forEach(el => requirements.push(el))
      e.languages.forEach(el => requirements.push(el))

      this.connections.push(requirements)
    })

    this.$emit('fill-connections', this.connections)

  }
}
</script>