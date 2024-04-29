function createStore (reducer) {
    let state
    let listeners = []
    const getState = () => state
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }
    const dispatch = (action) => {
        state = reducer(state, action)
        // updates all subscribers
        listeners.forEach((listener) => listener())
    }
    return {
        getState,
        subscribe,
        dispatch
    }
}
// App code

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
function addTodoAction(todo){
    return{
        type: ADD_GOAL,
        todo,
    }
}

function addGoalAction(goal){
    return {
        type: ADD_GOAL,
        goal,
    }
}
function removeGoalAction(id){
    return {
        type: REMOVE_GOAL,
        id,
    }
}
function todos (state = [], action) {
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.todo])
        case REMOVE_GOAL:
            return state.filter(todo => goal.id !== action.id)
        case TOGGLE_GOAL:
            return state.map(todo => todo.id !== action.id ? goal :
                Object.assign({}, goal, {complete: !todo.complete})
            )
        default:
            return state
    }
}
function goals (state = [], action){
    switch(action.type){
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(goal => goal.id !== action.id)
        default:
            return state
    }
}
function app (state = {}, action){
    return {
        goals: goals(state.goals, action)
    }
}
// DOM CODE
function generateId(){
        return Math.random().toString(36).substring(2) + (new   Date()).getTime().toString(36);
}
function addTodo(){
  const input = document.getElementById('goal')
  const name = input.value
  input.value = ''
  store.dispatch(addGoalAction({
    id: generateId(),
    name,
    complete: false,
  }))
}
function addGoal(){
  const input = document.getElementById('goal')
  const name = input.value
  input.value = ''
  store.dispatch(addGoalAction({
    id: generateId(),
    name
  }))
}
document.getElementById('goalBtn').addEventListener('click', addGoal)
function createRemoveButton (onClick){
  const removeBtn = document.createElement('button')
  removeBtn.classList.add("remove-button");
  removeBtn.innerHTML = 'Remove'
  removeBtn.addEventListener('click', onClick)
  return removeBtn
}
function addTodoToDOM (todo){
  const node = document.createElement('li')
  const textNode = document.createElement('span')
  const text = document.createTextNode(goal.name)
  const removeGoalBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(todo.id))
  })
  node.appendChild(textNode)
  node.appendChild(removeGoalBtn)
  textNode.appendChild(text)
  textNode.style.textDecoration = goal.complete ? 'line-through' : 'none'
  textNode.addEventListener('click', () => {
    store.dispatch(toggleTodoAction(goal.id))
  })
  document.getElementById('goals')
    .appendChild(node)
}
function addGoalToDOM (goal){
  const node = document.createElement('li')
  const textNode = document.createElement('span')
  const text = document.createTextNode(goal.name)
  const removeGoalBtn = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id))
  })
  node.appendChild(textNode)
  node.appendChild(removeGoalBtn)
  textNode.appendChild(text)
  textNode.style.textDecoration = goal.complete ? 'line-through' : 'none'
  textNode.addEventListener('click', () => {
    store.dispatch(toggleGoalAction(goal.id))
  })
  document.getElementById('goals')
    .appendChild(node)
}
const store = createStore(app)
const unsubscribe = store.subscribe(() => {
  const { goals } = store.getState()
  console.log('The new state is: ', store.getState())``
  document.getElementById('goals').innerHTML = ''
  goals.forEach(addGoalToDOM)
 
});
