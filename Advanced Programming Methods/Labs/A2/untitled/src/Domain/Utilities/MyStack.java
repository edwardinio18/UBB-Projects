package Domain.Utilities;

import java.util.Stack;

public class MyStack<T> implements IStack<T> {
	Stack<T> stack;

	public MyStack() {
		this.stack = new Stack<>();
	}

	@Override
	public T pop() {
		return this.stack.pop();
	}

	@Override
	public void push(T e) {
		this.stack.push(e);
	}

	@Override
	public boolean isEmpty() {
		return this.stack.isEmpty();
	}

	@Override
	public int size() {
		return this.stack.size();
	}

	@Override
	public String toString(){
		return this.stack.toString();
	}
}