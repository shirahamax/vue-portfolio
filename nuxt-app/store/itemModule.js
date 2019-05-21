const host = "http://localhost:5000/";

export const state = () => ({
  categories: [],
  currentCatId: "1",
  items: []
});

export const mutations = {
  SET_CURRENT_CAT_ID(state, categoryId) {
    state.currentCatId = categoryId;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_ITEMS(state, items) {
    state.items = items;
  }
};

export const getters = {
  sortedItemsByCat(state) {
    const currentCatId = state.currentCatId;
    return state.items.filter(item => {
      return item.category_id === Number(currentCatId);
    });
  }
};

export const actions = {
  /**
   * 選択したカテゴリID、またはURLで指定したカテゴリーIDをバリデートし、
   * ステートに保存します。
   * @param {*} { commit, state }
   * @param {String} categoryId
   */
  setCurentCatId({ commit, state }, categoryId) {
    if (!categoryId) return;

    // バリデーション:0以上の整数の文字列型かどうか。
    const pattern = /^([1-9]\d*|0)$/;
    if (!pattern.test(categoryId) || typeof categoryId !== "string") {
      this.app.router.push("/");
      throw new Error("CategoryId shoud be [0-9]:String.");
    }

    // 現在のカテゴリに指定のIDがあるか検索
    if (
      state.categories.filter(category => {
        return category.id === String(categoryId);
      }).length === 0
    ) {
      this.app.router.push("/");
      throw new Error("Category not found::" + categoryId);
    }

    // カテゴリーのセット
    commit("SET_CURRENT_CAT_ID", categoryId);
    this.app.router.push({ path: "./", query: { categoryId: categoryId } });
  },

  /**
   * カテゴリー一覧を取得します。
   * @param {*} { commit }
   */
  async getCategories({ commit }) {
    await this.app.$axios
      .get(host + "categories")
      .then(response => {
        const categories = response.data.data;
        commit("SET_CATEGORIES", categories);
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  /**
   * 商品一覧を取得します。
   * @param {*} { commit }
   */
  async getItems({ commit }) {
    await this.app.$axios
      .get(host + "items")
      .then(response => {
        commit("SET_ITEMS", response.data.data);
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  /**
   * 指定された商品IDを取得、返却します。
   * @param {*} { commit }
   * @param {*} itemId
   * @returns
   */
  async getItemDetail({ commit }, itemId) {
    let detail = {};

    // 商品詳細の取得
    await this.app.$axios
      .get(host + "items/" + itemId)
      .then(response => {
        detail = response.data;
      })
      .catch(err => {
        throw new Error(err);
      });

    // 見つからない場合はNotFoundを表示
    if (detail == null) {
      this.app.router.replace("/notFound");
      throw new Error("Item not found. id:" + itemId);
    }
    if (detail.length == 100) {
      commit("SET_ITEMS", itemId);
    }
    return detail;
  }
};
