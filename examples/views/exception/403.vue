<template>
  <v-container class="mt-16 text-center">
    <v-row align="center">
      <v-col>
        <h1 class="display-2 primary--text">{{ $t('exception.whoops') }}, 403</h1>

        <p>{{ $t('exception.403.tip') }}</p>

        <v-btn to="/" color="primary">{{ $t('exception.backhome') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Exception403'
})
</script>
