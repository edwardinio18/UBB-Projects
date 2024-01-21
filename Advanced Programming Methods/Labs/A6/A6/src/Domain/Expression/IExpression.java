package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Type.IType;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public interface IExpression {
	IType typeCheck(IDictionary<String, IType> typeEnv) throws ExpressionException, ADTException;
	IValue eval(IDictionary<String, IValue> table, IHeap heap) throws ExpressionException, ADTException;
	IExpression deepCopy();
}