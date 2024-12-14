import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native'

type Todo = {
  id: string
  text: string
  completed: boolean
}

const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([])
  const [text, setText] = useState<string>('')

  const addTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Todo cannot be empty')
      return
    }

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
    }

    setTodo([...todo, newTodo])
    setText('')
  }

  const toggleTodo = (id: String) => {
    setTodo(
      todo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: String) => {
    setTodo(todo.filter((todo) => todo.id !== id))
  }

  const renderItem = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => toggleTodo(item.id)}>
        <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text onPress={() => deleteTodo(item.id)}>x</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Add new Task"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={addTodo}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.todoList}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {},

  todoList: {
    paddingBottom: 20,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
})

export default App
