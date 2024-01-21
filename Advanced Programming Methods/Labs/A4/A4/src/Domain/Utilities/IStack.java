package Domain.Utilities;

import Exceptions.ADTException;

import java.util.List;

public interface IStack<T> {
	T pop() throws ADTException;
	void push(T element);
	T peek();
	boolean isEmpty();
	List<T> getReversed();
}