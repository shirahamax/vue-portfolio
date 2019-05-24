<template>
  <v-menu offset-y>

    <template v-slot:activator="{on}">
      <v-btn icon v-on="on" class="grey--text" @click="flag=false">
        <v-icon v-if="flag">notifications_active</v-icon>
        <v-icon v-else>notifications_none</v-icon>
      </v-btn>

    </template>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile :key="item.title"  @click="toggle(index)">
          <v-list-tile-content>
            <v-list-tile-sub-title class="text--primary caption">{{ item.headline }}</v-list-tile-sub-title>
            <v-list-tile-sub-title class="caption">{{ item.subtitle }}</v-list-tile-sub-title>
          </v-list-tile-content>

        </v-list-tile>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>

  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      flag: true,
      items: [
        {
          headline: '《GW半額ポイント還元！キャンペーン開催》ポイントを使ってゴールデンウィークをお得に楽しもう！最大P2,500還元',
          subtitle: '1日前'
        },
        {
          headline: '《あと2日！》Apple Payを使ってお買い物をすると、必ずP300をプレゼント！',
          subtitle: '1日前'
        },
        {
          headline: '《今だけ！》サンドイッチが¥11！お店で使えるクーポンを配信中',
          subtitle: '2日前'
        }
      ]
    }
  }
}
</script>
