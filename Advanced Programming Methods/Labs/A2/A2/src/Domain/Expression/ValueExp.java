package Domain.Expression;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Exceptions.ExpressionException;

public class ValueExp implements IExpression {
	IValue val;

	public ValueExp(IValue val) {
		this.val = val;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> table) throws ExpressionException {
		return this.val;
	}

	@Override
	public IExpression deepCopy() {
		return new ValueExp(this.val);
	}

	@Override
	public String toString(){
		return this.val.toString();
	}
}