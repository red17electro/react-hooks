import * as React from 'react'
import {useEffect} from 'react'

function useLocalStorage(
  key,
  initialValue = '',
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [value, setValue] = React.useState(() => {
    const valueLocalStorage = window.localStorage.getItem(key)
    if (valueLocalStorage) {
      return deserialize(valueLocalStorage)
    }

    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  const prevKeyRef = React.useRef(key)

  useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(key)
    }

    prevKeyRef.current = key

    window.localStorage.setItem(key, serialize(value))
  }, [key, serialize, value])

  return [value, setValue]
}

function Greeting({initialName = {name: 'Ceballos'}}) {
  const [data, setData] = useLocalStorage('data', initialName)
  function handleChange(event) {
    setData({name: event.target.value})
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {data.name ? <strong>Hello {data.name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
