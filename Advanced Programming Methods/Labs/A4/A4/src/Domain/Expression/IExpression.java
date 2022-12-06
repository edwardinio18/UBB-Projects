package Domain.Expression;

import Exceptions.ADTException;
import Exceptions.ExpressionException;
import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

public interface IExpression {
	IValue eval(IDictionary<String, IValue> symTable, IHeap heap) throws ExpressionException, ADTException;
}