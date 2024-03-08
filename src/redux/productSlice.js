import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: {},
    },
    reducers: {
        set(state, action) {
            state.products = action.payload
        },
        add(state, action) {
            const prod = state.products[action.payload.id]
            if (!prod) {
                state.products[action.payload.id] = action.payload
                state.products[action.payload.id].amount = 1
            } else {
                state.products[action.payload.id].amount += 1
            }
            console.log(Object.entries(state.products))
        },
        remove(state, action) {
            state.products[action.payload.id].amount -= 1
            if (state.products[action.payload.id].amount === 0) {
                delete state.products[action.payload.id]
            }
        },
        purge(state, action) {
            delete state.products[action.payload.id]
        },
    },
})

export default productSlice
