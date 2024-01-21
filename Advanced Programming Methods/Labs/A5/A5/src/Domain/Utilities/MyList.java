package Domain.Utilities;

import Exceptions.ADTException;

import java.util.ArrayList;
import java.util.List;

// Class for the list
public class MyList<T> implements IList<T> {
	List<T> myList;

	public MyList() {
		this.myList = new ArrayList<>();
	}

	@Override
	public void add(T e) {
		this.myList.add(e);
	}

	@Override
	public String toString() {
		return this.myList.toString();
	}

	@Override
	public T pop() throws ADTException {
		if (myList.isEmpty())
			throw new ADTException("List is empty!");

		return this.myList.remove(0);
	}

	@Override
	public boolean isEmpty() {
		return this.myList.isEmpty();
	}

	@Override
	public List<T> getList() {
		return myList;
	}
}