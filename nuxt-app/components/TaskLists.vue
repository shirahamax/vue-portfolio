<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on" @click="flag = false">
        <v-icon :class="flag ? 'red--text' : 'grey--text darken-1'"
          >done</v-icon
        >
      </v-btn>
    </template>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile :key="item.title" @click="toggle(index)">
          <v-list-tile-content>
            <v-list-tile-sub-title class="text--primary caption">{{
              item.headline
            }}</v-list-tile-sub-title>
            <v-list-tile-sub-title class="caption">{{
              item.subtitle
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < items.length" :key="index"></v-divider>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      flag: true,
      items: [
        {
          headline: "商品が発送されました。",
          subtitle: "内容を確認して、受取評価をしてください。"
        },
        {
          headline: "商品の取引メッセージがあります。",
          subtitle: "返信をお願いします。"
        }
      ]
    };
  }
};
</script>
