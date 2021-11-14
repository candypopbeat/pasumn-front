<template>
  <div class="col-auto sidebar">
    <h1 class="alert alert-primary">PasuMn</h1>
    <i class="fab fa-studiovinari d-none d-md-block mb-4 mt-2"></i>
    <nav class="pc">
      <ul class="navbar-nav mt-4">
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
          <li v-if="menu.child.length === 0 && menu.view" class="nav-item">
            <NuxtLink :to="'/' + menu.link" class="nav-link">{{ menu.page }}</NuxtLink>
          </li>
        </template>
      </ul>
    </nav>
  </div>
</template>

<script>
import menus from '@/assets/menu.js'
export default {
  data: () => {
    return {
      menus: menus,
    }
  },
  methods: {
  },
}
</script>
