<template>
  <div class="pa-1">

    <!-- アバター -->
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
    </v-list>

    <!-- 紹介文 -->
    <div row wrap class="pa-3 text-xs-left">

      <!-- イントロ -->
      <p class="caption">
        お越しいただきありがとうございます。
        このサイトは <a href="https://twitter.com/shirahama_x" target="_blank">@shirahama_x </a>
        のポートフォリオの1つで、ショッピングサイトのデモページになります。
      </p>
      <p class="caption">
        Web管理画面制作/モバイル対応/<br>クラウド/多言語対応を得意としています。
      </p>

      <!-- トピック -->
      <h4>Topic</h4>
      <p class="caption">
        Vue cli3:vuex/vue-router, Nuxt, <br>
        Vuetify, BootsrapVue
        Firebase:Hosting/Functions/Firestore, <br>
        AWS:EC2/S3/CloudFront/Route53
        Swift
      </p>

      <!-- リンク -->
      <h4>Links</h4>
      <v-layout align-center>
        <a href="https://twitter.com/shirahama_x" target="_blank" class="mr-1">
          <img src="../assets/img/links/twitter.png" width="30px" />
        </a>
        <a href="https://github.com/shirahamax/vue-portfolio" target="_blank" class="mr-2">
          <img src="../assets/img/links/GitHub.png" width="20px" />
        </a>
        <a href="https://qiita.com/shirahama_x" target="_blank" class="mr-2">
          <img src="../assets/img/links/qiita.png" width="20px" />
        </a>
      </v-layout>

    </div>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-tile @click="$router.push('/comment')" class="mr-0 pr-0">
        <v-list-tile-title class="caption">
          このページの設計について
        </v-list-tile-title>
        <v-list-tile-action style="min-width:30px;">
          <v-icon class="body-2">chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

  </div>
</template>
