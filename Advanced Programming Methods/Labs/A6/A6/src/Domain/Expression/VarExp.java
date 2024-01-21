package Domian.Expression;

import Domain.Expression.IExpression;
import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public class VarExp implements IExpression {
	String key;

	public VarExp(String key) {
		this.key = key;
	}

	@Override
	public IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException, ADTException {
		return typeEnv.lookUp(key);
	}

	@Override
	public IValue eval(IDictionary<String, IValue> table, IHeap heap) throws ADTException {
		return table.lookUp(key);
	}

	@Override
	public IExpression deepCopy() {
		return new VarExp(key);
	}

	@Override
	public String toString() {
		return key;
	}
}