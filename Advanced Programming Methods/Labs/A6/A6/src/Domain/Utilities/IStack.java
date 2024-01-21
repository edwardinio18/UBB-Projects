package Domain.Utilities;

import Exceptions.ADTException;

import java.util.List;

// Interface for the stack
public interface IStack<T> {
	T pop() throws ADTException;
	void push(T v);
	boolean isEmpty();

	List<T> getReversed();
}