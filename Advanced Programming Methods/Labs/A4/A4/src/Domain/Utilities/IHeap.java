package Domain.Utilities;

import Exceptions.ADTException;
import Domain.Value.IValue;

import java.util.HashMap;
import java.util.Set;

public interface IHeap {
	int getFreeValue();

	HashMap<Integer, IValue> getContent();

	void setContent(HashMap<Integer, IValue> newMap);

	int add(IValue value);

	void update(Integer position, IValue value) throws ADTException;

	IValue get(Integer position) throws ADTException;

	boolean containsKey(Integer position);

	void remove(Integer key) throws ADTException;

	Set<Integer> keySet();
}