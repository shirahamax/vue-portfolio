<template>
  <div id="app">
    <v-app app>
      <!-- ヘッダー -->
      <HeaderDefault />

      <!-- メイン画面 -->
      <v-content app>
        <div style="height:100%">
          <nuxt />
        </div>
      </v-content>

      <!-- フッター -->
      <FooterDefault v-if="!hiddenFooter" />
    </v-app>
  </div>
</template>

<script>
import HeaderDefault from "@/components/HeaderDefault";
import FooterDefault from "@/components/FooterDefault";

export default {
  components: { HeaderDefault, FooterDefault },
  data() {
    return {
      hiddenFooter: false
    };
  },
  watch: {
    // ルートを監視
    $route: "toggleFooter"
  },
  created() {
    this.toggleFooter();
  },
  methods: {
    // ルートのメタフィールドにフラグがあれば非表示
    toggleFooter() {
      this.hiddenFooter = !!this.$route.meta.hiddenFooter;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eaeaea;
}
a {
  text-decoration: none;
}
.toolbar-search {
  width: 100%;
  border-radius: 5px;
}
nav.v-toolbar {
  border-bottom: 1px solid #ddd !important;
}

.item-toolbar {
  z-index: 1;
}
.item-toolbar .v-tabs__container {
  height: 35px;
}
</style>
