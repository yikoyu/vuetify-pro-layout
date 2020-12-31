<template>
  <v-app>
    <v-container class="text-center fill-height">
      <v-row align="center">
        <v-col>
          <h1 class="display-2 primary--text">{{ $t('exception.whoops') }}, 404</h1>

          <p>{{ $t('exception.404.tip') }}</p>

          <v-btn to="/" color="primary">{{ $t('exception.backhome') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Exception404'
})
</script>
