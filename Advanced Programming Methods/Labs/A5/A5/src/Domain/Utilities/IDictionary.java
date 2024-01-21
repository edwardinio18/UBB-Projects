package Domain.Utilities;

import Exceptions.ADTException;

import java.util.Collection;
import java.util.Map;
import java.util.Set;

// Interface for the dictionary
public interface IDictionary<T1, T2> {
	void put(T1 key, T2 value);
	boolean containsKey(T1 key);
	T2 lookUp(T1 key) throws ADTException;
	void update(T1 key, T2 value) throws ADTException;
	Collection<T2> values();
	void remove(T1 key) throws ADTException;;
	Set<T1> keySet();
	Map<T1, T2> getContent();
}