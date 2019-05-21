<template>
  <div>
    <!-- タイトル表示 -->
    <v-toolbar flat height="35px" class="white item-toolbar">
      <v-layout text-xs-center align-center justify-center>
        <!-- 戻るボタン -->
        <v-flex xs4 :class="breakpoint.xs ? 'text-xs-left' : ''">
          <v-btn icon @click="pageBack">
            <span class="subheading micon-back"></span>
          </v-btn>
        </v-flex>

        <!-- 商品名 -->
        <v-flex xs4>
          <span class="headline font-weight-bold">{{ detail.name }}</span>
        </v-flex>

        <!-- ボタン群 -->
        <v-flex xs4>
          <v-btn icon class="ma-0">
            <v-icon class="grey--text">search</v-icon>
          </v-btn>
          <v-btn icon class="ma-0 grey--text">
            <span class="title micon-share"></span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar>

    <!-- メイン画面 -->
    <v-container :class="breakpoint.xs ? 'pa-0' : ''">
      <v-layout row wrap justify-center>
        <!-- 商品画像 -->
        <v-flex xs12 sm6>
          <v-carousel :cycle="false" height="100%" class="item-carousel">
            <v-carousel-item
              v-for="index in 3"
              :key="index"
              :src="detail.image"
            >
              <v-layout v-if="detail.is_sold_out" justify-start>
                <img src="@/assets/img/sold.png" width="40%" height="40%" />
              </v-layout>
            </v-carousel-item>
          </v-carousel>
          <!--
            <v-img :src="detail.image"></v-img>-->
        </v-flex>

        <!-- 商品情報 -->
        <v-flex xs12 sm6 class="white">
          <v-container :class="breakpoint.xs ? 'pt-1' : ''">
            <!-- 商品名 -->
            <v-layout class="pb-3">
              <span class="subheading">{{ detail.name }}</span>
            </v-layout>

            <!-- いいねボタン群 -->
            <v-layout align-center>
              <div class="mr-2">
                <v-btn
                  round
                  small
                  flat
                  class="grey lighten-2 grey--text text--darken-2 ma-0"
                  @click="pushLikeBtn"
                >
                  <span class="body-2 pt-1">
                    <span v-if="liked" class="pink--text micon-heart"></span>
                    <span v-else class="micon-heart_outline"></span>
                  </span>
                  <span>&nbsp;いいね！</span>
                </v-btn>
                <span>&nbsp;{{ detail.like_count }}</span>
              </div>

              <v-btn
                round
                small
                flat
                class="grey lighten-2 grey--text text--darken-2 ma-0 mr-2 "
                @click="commented = !commented"
              >
                <span class="body-2 pt-1">
                  <span
                    v-if="commented"
                    class="amber--text micon-comment"
                  ></span>
                  <span v-else class="micon-comment_outline"></span>
                </span>
                <span>&nbsp;コメント</span>
              </v-btn>

              <v-btn icon small flat class="grey lighten-2 ma-0">
                <v-icon class="subheading grey--text">
                  flag
                </v-icon>
              </v-btn>
            </v-layout>
          </v-container>

          <!-- [xsのみ] 商品説明:タイトル -->
          <v-layout v-if="breakpoint.xs" class="grey lighten-3 pt-4 pl-2">
            商品の説明
          </v-layout>

          <!-- 商品説明 -->
          <v-container>
            <v-layout row wrap justify-start align-start>
              <v-card
                max-height="250px"
                min-height="100px"
                width="100%"
                flat
                style="overflow-y: auto;"
              >
                <v-card-text class="text-xs-left pa-0">
                  {{ detail.description }}
                </v-card-text>
              </v-card>
            </v-layout>
          </v-container> </v-flex
        ><!-- //商品情報 -->
      </v-layout>

      <!-- 商品購入ボタン -->
      <v-footer height="" :app="breakpoint.xs">
        <v-layout row wrap class="secondary">
          <v-flex offset-sm6>
            <v-layout class="white--text" justify-center align-center>
              <v-flex>
                <span class="white--text headline">
                  {{ $formatPrice(detail.price) }}
                </span>
                <span>{{ detail.shipping_fee }}</span>
              </v-flex>
              <v-flex>
                <v-btn class="red white--text">
                  購入手続きへ
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-footer> </v-container
    ><!-- //メイン画面 -->
  </div>
</template>

<script>
export default {
  name: "Item",
  validate({ params }) {
    // バリデーション:数値
    return /^\d+$/.test(params.id);
  },
  data() {
    return {
      detail: {},
      liked: false,
      commented: false,
      backPagePath: ""
    };
  },
  computed: {
    breakpoint() {
      return this.$vuetify.breakpoint;
    }
  },
  created() {
    const itemId = this.$nuxt.$route.params.id;
    this.$store.dispatch("itemModule/getItemDetail", itemId).then(detail => {
      this.detail = detail;
    });
  },
  methods: {
    pushLikeBtn() {
      if (this.liked) {
        this.detail.like_count -= 1;
      } else {
        this.detail.like_count += 1;
      }
      this.liked = !this.liked;
    },
    pageBack() {
      if (!this.backPagePath) {
        // 直接アクセスしてきた場合はホーム画面に遷移
        this.$router.push("/");
      } else {
        this.$router.push(this.backPagePath);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    // メタタグにhiddenFooterを追加
    to.meta.hiddenFooter = true;
    // 戻るボタンの遷移先の保存
    next(vm => {
      if (from.name != null) {
        vm.backPagePath = from.fullPath;
      }
    });
  }
};
</script>
<style>
.item-carousel .v-carousel__controls {
  background: none;
}
</style>
