package Domain.Utilities;

import java.util.ArrayList;
import java.util.List;

public class MyList<T> implements IList<T> {
	List<T> list;

	public MyList() {
		this.list = new ArrayList<>();
	}

	@Override
	public void add(T e) {
		this.list.add(e);
	}

	@Override
	public int size() {
		return this.list.size();
	}

	@Override
	public boolean isEmpty() {
		return this.list.isEmpty();
	}

	@Override
	public List<T> getList() {
		return this.list;
	}

	@Override
	public T get(int idx) {
		return this.list.get(idx);
	}

	@Override
	public String toString(){
		return this.list.toString();
	}
}