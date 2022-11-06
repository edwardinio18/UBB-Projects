package Domain.Utilities;

import Exceptions.ADTException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

public class MyDictionary<T1, T2> implements IDictionary<T1, T2> {
	private final HashMap<T1, T2> dict;

	public MyDictionary() {
		this.dict = new HashMap<>();
	}

	@Override
	public void put(T1 key, T2 value) {
		this.dict.put(key, value);
	}

	@Override
	public T2 get(T1 key) {
		return this.dict.get(key);
	}

	@Override
	public boolean isDefined(T1 key) {
		return this.dict.containsKey(key);
	}

	@Override
	public T2 lookUp(T1 key) throws ADTException {
		if (!isDefined(key)) {
			throw new ADTException(key + " is not defined");
		}
		return this.dict.get(key);
	}
	@Override
	public void update(T1 key, T2 value) throws ADTException {
		if (!isDefined(key)) {
			throw new ADTException(key + " is not defined");
		}
		this.dict.put(key, value);
	}

	@Override
	public Collection<T2> getValues() {
		return this.dict.values();
	}

	@Override
	public void remove(T1 key) throws ADTException {
		if (!isDefined(key)) {
			throw new ADTException(key + " is not defined");
		}
		this.dict.remove(key);
	}

	@Override
	public Set<T1> keySet() {
		return this.dict.keySet();
	}

	@Override
	public String toString() {
		return this.dict.toString();
	}
}