package Domain.Expression;

import Exceptions.ExpressionException;
import Exceptions.ADTException;

import Domain.Utilities.IDictionary;
import Domain.Value.IValue;

// Interface for all expressions
public interface IExpression {
	IValue eval(IDictionary<String, IValue> tbl) throws ADTException, ExpressionException;
}