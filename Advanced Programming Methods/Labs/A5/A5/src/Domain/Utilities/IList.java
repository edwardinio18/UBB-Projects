package Domain.Utilities;

import Exceptions.ADTException;
import Domain.Value.IValue;

import java.util.List;

// Interface for the list
public interface IList<T> {
	void add(T e);
	String toString();
	T pop() throws ADTException;
	boolean isEmpty();
	List<T> getList();
}