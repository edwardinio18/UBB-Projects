package Domain.Expression;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

// Class for giving a value to a variable
public class ValueExp implements IExpression {
	IValue e;

	public ValueExp(IValue e) {
		this.e = e;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> tbl) {
		return this.e;
	}

	@Override
	public String toString() {
		return this.e.toString();
	}
}