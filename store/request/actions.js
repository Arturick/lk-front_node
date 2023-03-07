export default {
  get_options({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('options/')
        .then((x) => {
          commit('SET_OPT_ROLES', x.data.opt_roles)
          resolve(x)
        })
    })
  },

  set_timeisout({ commit }, timeIsOut) {
    commit('SET_TIMEISOUT', timeIsOut)
  },



  get_positions({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('positions/')
        .then((x) => {
          resolve(x)
        })
    })
  },
  get_notification({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('get_notification/')
        .then((x) => {
          resolve(x)
        })
    })
  },



  get_fastinfo({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('fastinfo/')
        .then((x) => {
          resolve(x)
        })
    })
  },
  sendUpdateLogPhone({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('send-update-log', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  UpdateLogPhone({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('update-log', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  getUser({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('get-profile', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  addManager({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('add-manager', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  getManager({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('get-manager', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  deleteManager({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('delete-manager', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  get_statinfo({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('graph-info/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  find_articles({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find-by-articles', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  get_api({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('get-by-api', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  getReport({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('get-report', state)
        .then((x) => {
          resolve(x)
        })
        .catch(x => {
          reject(x);
        })
    })
  },
  getReportBuyout({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('buyout-report', state)
        .then((x) => {
          resolve(x)
        })
        .catch(x => {
          reject(x);
        })
    })
  },

  getReportDelivery({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('delivery-report', state)
        .then((x) => {
          resolve(x)
        })
        .catch(x => {
          reject(x);
        })
    })
  },

  getReportReview({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('review-report', state)
        .then((x) => {
          resolve(x)
        })
        .catch(x => {
          reject(x);
        })
    })
  },
  get_findbyart({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find-by-article', state)
        .then((x) => {
          resolve(x)
        })
        .catch(x => {
          reject(x);
        })
    })
  },
  bulk_buffer({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find/bulk/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  getManagerLink({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('get-manager-link', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  parseExcel({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('parse-excel', state, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((x) => {
          resolve(x)
        })
    })
  },

  dbupdate({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('update/')
        .then((x) => {
          resolve(x)
        })
    })
  },
  checkquery({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find/checkquery/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  checkallquery({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find-position', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  splitbydate({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('sort-buy-by-date', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  order_save({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('save', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  draft_save({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('save-draft', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  find_wb({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('find/wb/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  updateUser({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('update-profile', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  buyout_list({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('buyout', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  draft_list({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('draft', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  buyout_group({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('buyout/' + state.group, state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  draft_update({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('update-draft/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  delete({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('delete', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  delivery_group({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('delivery/' + state.group, state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  delivery_list({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('delivery', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  reviews_list({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('reviews', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  reviews_group({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('reviews/' + state.group, state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  reviews_save({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('update-review', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  sms_send({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('send-code', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  sms_check({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('register', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  auth_user({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/user/', state)
        .then((x) => {
          commit('SET_USER', x.data.data.user)
          resolve(x)
        })
    })
  },
  auth_user_save({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('update-profile', state)
        .then((x) => {
          commit('SET_USER', x.data.data.user)
          resolve(x)
        })
    })
  },

  auth_user_parent_get({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/parent/get/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  auth_user_parent_save({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/parent/save/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  auth_user_parent_del({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/parent/del/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },

  login_user({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('login', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  add_manager({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('access-manager', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  dadata_search({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('dadata/search/', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  refreshPassword({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('refresh-password', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
  sendResetCode({ commit }, state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('send-reset-code', state)
        .then((x) => {
          resolve(x)
        })
    })
  },
}

