package Domain.Expression;

import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public class ValueExp implements IExpression {
	IValue value;

	public ValueExp(IValue value) {
		this.value = value;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTable, IHeap heap) {
		return this.value;
	}

	@Override
	public String toString() {
		return this.value.toString();
	}
}