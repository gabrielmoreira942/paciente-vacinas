export default ({
    state: {
        vaccine: {},
    },
    getters: {
        getVaccine: state => state.vaccine
    },
    mutations: {
        setVaccine: (state, data) => state.vaccine = data
    },
    actions: {
        changeVaccine: ({ commit }, data) => commit("setVaccine", data)
    },
})