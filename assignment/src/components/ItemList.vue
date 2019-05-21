<template>
  <div>

    <!-- カテゴリー -->
    <v-toolbar flat height="35px" class="white item-toolbar">
      <v-tabs centered show-arrows hide-slider class="white">
        <v-tab v-for="category in categories" :key="category.id" @click="sortItems(category.id)">
          <span class="caption" :class="currentCatId==category.id?'red--text font-weight-bold':''">
            {{category.name}}</span>
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <!-- 出品リストの掲載 -->
    <v-container app grid-list-md fill-height class="item-container">
      <v-layout row wrap justify-start>

        <!-- v-for -->
        <v-flex v-for="item in sortedItemsByCat" :key="item.id" xs6 sm4 md3>
          <router-link :to="{ name: 'detail', params: { id: item.id }}">
            <v-card flat class="black mt-1" style="margin:0 auto;">
              <!-- 商品画像 -->
              <v-img :src="item.image">
                <v-layout justify-start v-if="item.is_sold_out">
                  <img src="../assets/img/sold.png" width="40%" height="40%" />
                </v-layout>
              </v-img>
              <!-- 商品概要 -->
              <div class="white text-xs-left pa-2">
                <div style="height:20px;overflow:hidden;">
                  <span class="grey--text text--darken-3">
                    {{item.name}}
                  </span>
                </div>
                <v-layout align-center class="pr-1 pl-1">
                  <span class="subheading font-weight-bold">
                    {{$formatPrice(item.price)}}
                  </span>
                  <v-spacer></v-spacer>
                  <div v-if="item.like_count!==0">
                    <span class="caption micon-heart_outline pr-1"></span>
                    {{item.like_count}}
                  </div>
                </v-layout>
              </div>
            </v-card>
          </router-link>
        </v-flex>

      </v-layout>
    </v-container>

    <!-- 出品ボタン -->
    <v-btn fab fixed dark bottom right color="red" class="sell-btn"
      :style="breakpoint.xs?'bottom: -15px;right: -10px;':''"
      @click="snackbar = true">
      <div>
        <span class="caption font-weight-bold"> 出品 </span><br>
        <v-icon dark>camera_alt</v-icon>
      </div>
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      top
      :timeout="3000"
      color="white"
      class="snackbar-newitem ma-0 pa-0"
    >
      <v-icon class="body-2 red--text pl-2">
        arrow_upward
      </v-icon>
      <span class="caption black--text pr-1">
        新しい商品
    </span>
    </v-snackbar>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ItemList',
  data () {
    return {
      snackbar: false
    }
  },
  computed: {
    ...mapState('itemModule', [
      'currentCatId',
      'categories'
    ]),
    ...mapGetters('itemModule', [
      'sortedItemsByCat'
    ]),
    breakpoint () { return this.$vuetify.breakpoint }

  },
  methods: {
    sortItems (categoryId) {
      // 選択カテゴリの保存
      this.$store.dispatch('itemModule/setCurentCatId', categoryId)
    }
  },
  created () {
    // URLからcategoryIdを取得
    let catIdInUrl = this.$route.query.categoryId

    // カテゴリの取得とcategoryIdのセット
    this.$store.dispatch('itemModule/getCategories')
      .then(() => {
        this.$store.dispatch('itemModule/setCurentCatId', catIdInUrl)
      })

    // アイテムの取得
    this.$store.dispatch('itemModule/getItems')
  }
}
</script>

<style>
.item-toolbar i{
  padding-top: 5px;
}

button.sell-btn{
  width: 90px;
  height: 90px;
}
.sell-btn .material-icons{
  font-size: 40px
}
.snackbar-newitem .v-snack__content {
  width:90px;
  padding: 0px
}
.snackbar-newitem .v-snack__wrapper{
  margin:60px auto;
  min-width: 90px!important;
  width:90px;
  height: 25px;
  border-radius: 10px;
}
</style>
