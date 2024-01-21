package Domain.Expression;

import Domain.Value.IValue;
import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.Utilities.IDictionary;
import Domain.Utilities.IHeap;
import Domain.Value.IValue;

// Interface for all expressions
public interface IExpression {
	IValue eval(IDictionary<String, IValue> tbl, IHeap heap) throws ADTException, ExpressionException;
}