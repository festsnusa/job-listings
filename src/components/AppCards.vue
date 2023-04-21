<template>
  <div class="cards">
    <div v-for="value in arr" :key="value.id" :class="`cards__card ${value.featured ? 'cards__card_featured' : ''}`"
      :id=value.id>
      <div class="cards__left">
        <img class="cards__image" :src="`./images/${value.logo}`" alt="logo" />
        <div class="cards__header">
          <div class="cards__box">
            <p class="cards__title">{{ value.company }}</p>
            <div class="cards__properties">
              <div class="cards__button cards__button_new" v-show="value.new">new!</div>
              <div class="cards__button cards__button_featured" v-show="value.featured">featured </div>
            </div>
          </div><a class="cards__position" href="#!" aria-label="position">{{ value.position }}</a>
          <ul class="cards__list">
            <li class="cards__item">{{ value.postedAt }}</li>
            <li class="cards__item">{{ value.contract }}</li>
            <li class="cards__item">{{ value.location }}</li>
          </ul>
        </div>
      </div>
      <hr />
      <ul class="cards__footer">
        <li class="cards__requirement" @click="add(this.connections, value.role)">{{ value.role }}</li>
        <li class="cards__requirement" @click="add(this.connections, value.level)">{{ value.level }}</li>
        <li class="cards__requirement" @click="add(this.connections, tool)" v-for="tool in value.tools" :key="tool">{{
          tool }}
        </li>
        <li class="cards__requirement" @click="add(this.connections, language)" v-for="language in value.languages"
          :key="language">
          {{ language }}
        </li>
      </ul>
    </div>
  </div>
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