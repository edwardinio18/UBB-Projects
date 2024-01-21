package Domain.Expression;

import Exceptions.ExpressionException;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public class ValueExp implements IExpression {
	IValue value;

	public ValueExp(IValue value) {
		this.value = value;
	}

	@Override
	public IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException {
		return value.getType();
	}

	@Override
	public IValue eval(IDictionary<String, IValue> table, IHeap heap) {
		return this.value;
	}

	@Override
	public IExpression deepCopy() {
		return new ValueExp(value);
	}

	@Override
	public String toString() {
		return this.value.toString();
	}
}