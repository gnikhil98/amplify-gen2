"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, Card } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import TodoCreateForm from "@/ui-components/TodoCreateForm";
import UserCreateForm from "@/ui-components/UserCreateForm";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    const sub = client.models.Todo.observeQuery().subscribe({
      next: ({ items }) => {
        setTodos([...items]);
      },
    });

    return () => sub.unsubscribe();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      isDone: false,
    });
    client.models.User.create({
      username: "Username",
      email: "Email@gmail.com",
    });
  }

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main >
          <h1>{user?.signInDetails?.loginId}'s todos</h1>
          <Card style={{ marginBottom: "1rem" }}>
            <TodoCreateForm />
            {/* <UserCreateForm /> */}
          </Card>
          {/* <TodoCreateForm />
          <UserCreateForm /> */}
          {/* <button onClick={createTodo}>+ new</button> */}
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
              Review next steps of this tutorial.
            </a>
          </div>
          {/* <button onClick={signOut}>Sign out</button> */}
        </main>
      )}
    </Authenticator>
  );
}
