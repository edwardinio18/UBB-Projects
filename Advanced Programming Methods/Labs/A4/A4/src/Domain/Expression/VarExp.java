package Domain.Expression;

import Exceptions.ADTException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public class VarExp implements IExpression {
	String key;

	public VarExp(String key) {
		this.key = key;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ADTException {
		return symTable.lookUp(key);
	}

	@Override
	public String toString() {
		return key;
	}
}