<template>
  <v-list dense>

      <!-- avatar -->
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img src="../assets/img/avatar.jpg">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>shirahama_x</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="$router.push('/')">
        <v-list-tile-action>
          HOME
        </v-list-tile-action>
      </v-list-tile>
      <v-list-tile @click="$router.push('/')">
        <v-list-tile-action>
          ACCOUNT
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

</template>
