package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

// Class for variable expression
public class VarExp implements IExpression {
	String id;

	public VarExp(String id) {
		this.id = id;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> tbl) throws ADTException, ExpressionException {
		return tbl.lookUp(id);
	}

	@Override
	public String toString() {
		return this.id;
	}
}