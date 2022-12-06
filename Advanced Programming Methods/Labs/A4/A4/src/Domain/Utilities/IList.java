package Domain.Utilities;

import Exceptions.ADTException;

import java.util.List;
import java.util.function.Consumer;

public interface IList<T> {
	void add(T elem);
	T pop() throws ADTException;
	boolean isEmpty();
	List<T> getList();
}