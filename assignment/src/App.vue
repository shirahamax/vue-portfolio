<template>
  <div id="app">
    <v-app app>

      <!-- ナビゲーションメニュー -->
      <v-navigation-drawer
        fixed clipped app v-model="drawer" width="200px">
        <v-list dense>
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
      </v-navigation-drawer>

      <!-- トップ ツールバー -->
      <v-toolbar class="white grey--text" height="50px"
        app flat clipped-left>

        <v-toolbar-side-icon class="grey--text" @click.stop="drawer = !drawer">
        </v-toolbar-side-icon>
        <v-spacer></v-spacer>

        <!-- ロゴ -->
        <v-flex>
          <router-link to="/" class="hidden-xs-only mr-4">
            <v-toolbar-title class="black--text">mercari</v-toolbar-title>
          </router-link>
        </v-flex>

        <!-- 検索フィールド -->
        <v-flex>
          <input type="text" class="toolbar-search pa-1 grey lighten-3" placeholder="検索"
            style="max-width:400px">
        </v-flex>

        <!-- 通知一覧 -->
        <v-flex xs1>
          <notifications/>
        </v-flex>

        <!-- TODOリスト -->
        <v-flex xs1>
          <task-lists/>
        </v-flex>

        <v-spacer></v-spacer>
      </v-toolbar>

      <!-- メイン画面 -->
      <v-content app>
      <div style="height:100%">
        <router-view />
      </div>
      </v-content>

      <!-- 共有フッター -->
      <v-footer v-if="!hiddenFooter" class="grey darken-4" dark height="50px">
        <img src="./assets/img/footer-logo.png" height="20px" class="ma-2" />
        <div>&copy; {{ new Date().getFullYear() }} Mercari</div>
        <v-spacer></v-spacer>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import Notifications from '@/components/Notifications'
import TaskLists from '@/components/TaskLists'

export default {
  components: { Notifications, TaskLists },
  data () {
    return {
      drawer: false,
      hiddenFooter: false
    }
  },
  watch: {
    // ルートを監視
    '$route': 'toggleFooter'
  },
  methods: {
    // ルートのメタフィールドにフラグがあれば非表示
    toggleFooter () {
      this.hiddenFooter = !!this.$route.meta.hiddenFooter
    }
  },
  created () {
    this.toggleFooter()
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #EAEAEA;
}
a{
  text-decoration: none;
}
.toolbar-search {
  width: 100%;
  border-radius: 5px;
}
nav.v-toolbar{
  border-bottom: 1px solid #ddd!important;
}

.item-toolbar {
  z-index: 1;
}
.item-toolbar .v-tabs__container {
  height: 35px;
}
</style>
