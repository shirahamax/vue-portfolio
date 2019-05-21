<template>
  <div>
    <!-- ナビゲーションメニュー -->
    <v-navigation-drawer v-model="drawer" fixed clipped app width="200px">
      <v-list dense>
        <v-list-tile @click="$nuxt.$router.push('/')">
          <v-list-tile-action>
            HOME
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile @click="$nuxt.$router.push('/')">
          <v-list-tile-action>
            ACCOUNT
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- トップ ツールバー -->
    <v-toolbar class="white grey--text" height="50px" app flat clipped-left>
      <v-toolbar-side-icon class="grey--text" @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
      <v-spacer></v-spacer>

      <!-- ロゴ -->
      <v-flex>
        <router-link to="/" class="hidden-xs-only mr-4">
          <v-toolbar-title class="black--text">shirahamax</v-toolbar-title>
        </router-link>
      </v-flex>

      <!-- 検索フィールド -->
      <v-flex>
        <input
          type="text"
          class="toolbar-search pa-1 grey lighten-3"
          placeholder="検索"
          style="max-width:400px"
        />
      </v-flex>

      <!-- 通知一覧 -->
      <v-flex xs1>
        <Notifications />
      </v-flex>

      <!-- TODOリスト -->
      <v-flex xs1>
        <TaskLists />
      </v-flex>

      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
import Notifications from "@/components/Notifications";
import TaskLists from "@/components/TaskLists";

export default {
  components: { Notifications, TaskLists },
  data() {
    return {
      drawer: false
    };
  }
};
</script>
