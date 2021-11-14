<template>
  <div class="navSp">
    <div ref="btnToggle" class="d-flex justify-content-between w-100">
      <span @click="navToggle" class="nav_toggle">
        <i></i>
        <i></i>
        <i></i>
      </span>
      <h1 class="alert alert-primary h4 p-1 m-0">PasuMn</h1>
    </div>
    <nav ref="navSp" class="sp">
      <ul>
        <template v-for="menu in menus">
          <li v-if="menu.child.length > 0 && menu.view" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="sideNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {{ menu.page }}
            </a>
            <ul class="dropdown-menu">
              <li v-for="(sub, k) in menu.child" :key="k">
                <NuxtLink :to="'/' + menu.link + '/' + sub.link" class="dropdown-item">{{ sub.page }}</NuxtLink>
              </li>
            </ul>
          </li>
          <li @click="navToggle" v-if="menu.child.length === 0 && menu.view" class="nav-item">
            <NuxtLink :to="'/' + menu.link" class="nav-link">{{ menu.page }}</NuxtLink>
          </li>
        </template>
      </ul>
    </nav>
    <i class="fab fa-studiovinari"></i>
  </div>
</template>

<script>
import menus from '@/assets/menu.js'
export default {
  data() {
    return {
      menus: menus,
    }
  },
  methods: {
    navToggle(){
      this.$refs.btnToggle.classList.toggle('show');
      this.$refs.navSp.classList.toggle('show');
    },
  }
}
</script>
