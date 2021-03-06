const flatState = {
  state:{
      serviceFlat: 1,//服务包平台 1: windows;2:linux;3:both
      winFlatBit: ['32bit'],
      linuxFlatBit: [],
  },
  mutations:{
      change_flat(state, payload){
          state.serviceFlat = payload.status;
      },
      change_win_flat_bit(state, payload){
          state.winFlatBit = payload.winFlatBit;
      },
      change_linux_flat_bit(state, payload){
          state.linuxFlatBit = payload.linuxFlatBit;
      },
  },
  actions:{
      change_flat(context, payload){
          context.commit('change_flat', payload);
      },
      change_win_flat_bit(context, payload){
          context.commit('change_win_flat_bit', payload);
      },
      change_linux_flat_bit(context, payload){
          context.commit('change_linux_flat_bit', payload);
      },
  },
  getters: {
      serviceFlatGetter: state => {
          return state.serviceFlat;
      },
      winFlatBitGetter: state => {
          return state.winFlatBit;
      },
      linuxFlatBitGetter: state => {
          return state.linuxFlatBit;
      },
  }
}

export default flatState
