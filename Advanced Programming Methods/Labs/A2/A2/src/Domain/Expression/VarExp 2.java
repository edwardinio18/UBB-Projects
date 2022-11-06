package Domain.Expression;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;

public class VarExp implements IExpression {
	String key;

	public VarExp(String key) {
		this.key = key;
	}

	@Override
	public IValue eval(IDictionary<String, IValue> symTbl) throws ExpressionException, ADTException {
		return symTbl.lookUp(this.key);
	}

	@Override
	public IExpression deepCopy() {
		return new VarExp(this.key);
	}

	@Override
	public String toString(){
		return this.key;
	}
}