package Domain.Utilities;

import Exceptions.ADTException;

import java.util.List;

public interface IStack<T> {
	T pop() throws ADTException;
	void push(T e);
	boolean isEmpty();
	int size();
	List<T> getReversed();
}