package Domain.Utilities;

import java.util.List;

public interface IList<T> {
	int size();
	boolean isEmpty();
	void add(T e);
	List<T> getList();
	T get(int idx);
}