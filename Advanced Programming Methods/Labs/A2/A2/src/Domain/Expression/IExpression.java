package Domain.Expression;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;
import Exceptions.ADTException;
import Exceptions.ExpressionException;

public interface IExpression {
	IValue eval(IDictionary<String, IValue> symTbl) throws ExpressionException, ADTException;
	IExpression deepCopy();
}