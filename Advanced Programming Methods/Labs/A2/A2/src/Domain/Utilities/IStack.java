package Domain.Utilities;

import Exceptions.ADTException;

public interface IStack<T> {
	T pop() throws ADTException;
	void push(T e);
	boolean isEmpty();
	int size();
}