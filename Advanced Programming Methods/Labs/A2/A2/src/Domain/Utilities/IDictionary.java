package Domain.Utilities;

import Exceptions.ADTException;

import java.util.Collection;
import java.util.HashMap;
import java.util.Set;

public interface IDictionary<T1, T2> {
	boolean isDefined(T1 key);
	void put(T1 key, T2 value);
	T2 lookUp(T1 key) throws ADTException;
	T2 get(T1 key);
	Set<T1> keySet();
	void remove(T1 key) throws ADTException;
	void update(T1 key, T2 value) throws ADTException;
	Collection<T2> getValues();
}