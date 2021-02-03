

export function tokenReducer(state={}, action) {
    const { token } = action
    switch (action.type) {
        case 'ADD_TOKEN':
        
            return {
                ...state,
                   token
            }
        default: return state
    }
}